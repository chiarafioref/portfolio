import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { CircleAlert, LoaderCircle, Send } from 'lucide-react'
import ButtonShine from '../../components/ui/ButtonShine.tsx'
import { buttonBase, buttonVariants } from '../../components/ui/buttonStyles.ts'
import Magnetic from '../../components/ui/Magnetic.tsx'
import { StaggerGroup, StaggerItem } from '../../components/ui/Stagger.tsx'
import { profile } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { cn } from '../../lib/cn.ts'
import {
  CONTACT_LIMITS,
  contactFieldOrder,
  sanitizeContact,
  validateContact,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '../../lib/contact.ts'
import { classifySendError, sendContact, type SendErrorKind } from '../../lib/sendContact.ts'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Fuori dal componente per non chiamare Date.now() durante il render. */
const millisecondsSince = (start: number) => Date.now() - start

const emptyValues: ContactValues = { name: '', email: '', company: '', message: '' }

const controlClasses =
  'w-full rounded-xl border border-line bg-bg/50 px-4 py-3 text-base text-fg outline-none transition-colors duration-200 placeholder:text-muted/70 hover:border-accent/40 focus-visible:border-transparent focus-visible:ring-4 focus-visible:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-600 aria-invalid:focus-visible:ring-red-600/15 dark:aria-invalid:border-red-400 dark:aria-invalid:focus-visible:ring-red-400/15'

type FieldProps = {
  name: ContactField
  label: string
  optional?: boolean
  /** Testo dell'errore già nella lingua della pagina. */
  error?: string
  /** Testo sotto il campo (es. il contatore). */
  hint?: ReactNode
  children: (control: { id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined }) => ReactNode
}

function Field({ name, label, optional = false, error, hint, children }: FieldProps) {
  const { t } = useI18n()
  const id = `contact-${name}`
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> {t.contact.form.optional}</span>}
      </label>
      <div className="field-glow">
        {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? errorId : undefined })}
      </div>
      <div className="mt-1.5 flex items-start justify-between gap-4 text-xs">
        {error ? (
          <p id={errorId} className="error-in flex items-center gap-1.5 text-red-700 dark:text-red-400">
            <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint}
      </div>
    </div>
  )
}

/** Spunta di conferma: cerchio e segno che si disegnano (l'animazione è in index.css). */
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-12 text-emerald-600 dark:text-emerald-400">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="draw-circle" />
      <path d="m7.5 12.5 3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
    </svg>
  )
}

/** Form contatti: validazione live sui campi toccati, honeypot antispam e invio alla funzione serverless. */
export default function ContactForm() {
  const { t } = useI18n()
  const copy = t.contact.form
  const [values, setValues] = useState<ContactValues>(emptyValues)
  const [trap, setTrap] = useState('')
  const [touched, setTouched] = useState<ReadonlySet<ContactField>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [serverErrors, setServerErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sendError, setSendError] = useState<SendErrorKind | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const startedAt = useRef(0)

  const hasServerErrors = Object.values(serverErrors).some(Boolean)
  const sending = status === 'sending'
  const sent = status === 'sent'

  // Stesse regole del server, per mostrare gli errori subito.
  const errors = validateContact(sanitizeContact(values))
  const errorText = (code: ContactErrorCode | undefined) =>
    code ? (t.contact.errors[code]?.(CONTACT_LIMITS) ?? t.contact.sendErrors.generic) : undefined
  const visibleError = (field: ContactField) =>
    errorText(serverErrors[field] ?? (submitted || touched.has(field) ? errors[field] : undefined))

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
    // Il bottone perde il focus quando viene disabilitato: in caso di errore lo ripristino.
    if (status === 'error') submitRef.current?.focus()
  }, [status])

  const focusField = (field: ContactField) =>
    formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus()

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setServerErrors((current) => (name in current ? { ...current, [name]: undefined } : current))
  }

  const onBlur = (field: ContactField) => () => setTouched((current) => new Set(current).add(field))

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    setSubmitted(true)

    const firstInvalid = contactFieldOrder.find((field) => errors[field])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setStatus('sending')
    setSendError(null)
    try {
      await sendContact({
        ...sanitizeContact(values),
        website: trap,
        filledInMs: millisecondsSince(startedAt.current),
      })
      setStatus('sent')
    } catch (error) {
      const { kind, fieldErrors } = classifySendError(error)
      setSendError(kind)
      setServerErrors(fieldErrors ?? {})
      setStatus('error')
      const firstServerError = fieldErrors && contactFieldOrder.find((field) => fieldErrors[field])
      if (firstServerError) requestAnimationFrame(() => focusField(firstServerError))
    }
  }

  const reset = () => {
    setValues(emptyValues)
    setTouched(new Set())
    setSubmitted(false)
    setServerErrors({})
    setSendError(null)
    setStatus('idle')
    startedAt.current = Date.now()
  }

  // Form e conferma condividono la stessa cella della griglia, così la card non cambia altezza.
  return (
    <div className="grid">
      <form
        ref={formRef}
        noValidate
        inert={sent}
        aria-busy={sending}
        aria-labelledby="contact-form-title"
        onSubmit={onSubmit}
        className={cn(
          '[grid-area:1/1] transition-[opacity,transform,filter] duration-500 motion-reduce:transition-none',
          sent && 'pointer-events-none translate-y-2 opacity-0 blur-[3px] motion-reduce:translate-y-0',
        )}
      >
        <fieldset disabled={sending} className="m-0 min-w-0 border-0 p-0">
          <StaggerGroup className="space-y-5">
            <StaggerItem>
              <h2 id="contact-form-title" className="font-display text-2xl font-bold">
                {copy.title}
              </h2>
            </StaggerItem>

            <StaggerItem className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label={copy.name} error={visibleError('name')}>
                {(control) => (
                  <input
                    {...control}
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={CONTACT_LIMITS.nameMax}
                    value={values.name}
                    onChange={onChange}
                    onBlur={onBlur('name')}
                    className={controlClasses}
                  />
                )}
              </Field>

              <Field name="email" label={copy.email} error={visibleError('email')}>
                {(control) => (
                  <input
                    {...control}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={CONTACT_LIMITS.emailMax}
                    value={values.email}
                    onChange={onChange}
                    onBlur={onBlur('email')}
                    className={controlClasses}
                  />
                )}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field name="company" label={copy.company} optional error={visibleError('company')}>
                {(control) => (
                  <input
                    {...control}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={CONTACT_LIMITS.companyMax}
                    value={values.company}
                    onChange={onChange}
                    onBlur={onBlur('company')}
                    className={controlClasses}
                  />
                )}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field
                name="message"
                label={copy.message}
                error={visibleError('message')}
                hint={
                  <span aria-hidden="true" className="shrink-0 tabular-nums text-muted">
                    {values.message.length}/{CONTACT_LIMITS.messageMax}
                  </span>
                }
              >
                {(control) => (
                  <textarea
                    {...control}
                    name="message"
                    rows={6}
                    maxLength={CONTACT_LIMITS.messageMax}
                    value={values.message}
                    onChange={onChange}
                    onBlur={onBlur('message')}
                    className={cn(controlClasses, 'resize-y')}
                  />
                )}
              </Field>
            </StaggerItem>

            {status === 'error' && sendError && (
              <p
                role="alert"
                className="error-in flex items-start gap-2.5 rounded-xl border border-red-600/30 bg-red-600/8 px-4 py-3 text-sm text-red-800 backdrop-blur dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300"
              >
                <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {t.contact.sendErrors[sendError]}
                  {!hasServerErrors && (
                    <>
                      {' '}
                      {copy.fallbackIntro}{' '}
                      <a href={`mailto:${profile.email}`} className="font-semibold underline underline-offset-2">
                        {profile.email}
                      </a>
                      .
                    </>
                  )}
                </span>
              </p>
            )}

            <StaggerItem className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <Magnetic strength={0.18}>
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={sending}
                  className={cn(buttonBase, buttonVariants.primary, 'disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none')}
                >
                  <ButtonShine />
                  <span className="relative inline-flex items-center gap-2">
                    {sending ? (
                      <>
                        <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                        {copy.sending}
                      </>
                    ) : (
                      <>
                        <Send
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                        />
                        {copy.send}
                      </>
                    )}
                  </span>
                </button>
              </Magnetic>
              <p className="text-sm text-muted">{t.contact.replyLine(t.contact.responseTime)}.</p>
            </StaggerItem>
          </StaggerGroup>
        </fieldset>

        {/* Honeypot: invisibile e non raggiungibile da tastiera, lo compilano solo i bot */}
        <div inert className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            {copy.trapLabel}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(event) => setTrap(event.target.value)} />
          </label>
        </div>
      </form>

      <div
        inert={!sent}
        className={cn(
          '[grid-area:1/1] flex items-center transition-[opacity,transform] duration-500 motion-reduce:transition-none',
          sent ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0',
        )}
      >
        <div className="w-full rounded-2xl border border-emerald-600/25 bg-emerald-500/8 p-6 backdrop-blur sm:p-8 dark:border-emerald-400/25 dark:bg-emerald-400/8">
          {sent && <AnimatedCheck />}
          <h2 ref={successRef} tabIndex={-1} className="mt-4 font-display text-2xl font-bold outline-none">
            {copy.successTitle}
          </h2>
          <p className="mt-2 max-w-md text-pretty text-muted">
            {copy.successText(t.contact.responseTime)}
          </p>
          <button type="button" onClick={reset} className={cn(buttonBase, buttonVariants.ghost, 'mt-6')}>
            {copy.another}
          </button>
        </div>
      </div>

      <output className="sr-only">{sending ? copy.sending : ''}</output>
    </div>
  )
}

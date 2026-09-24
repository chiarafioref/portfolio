import type { ComponentType, SVGProps } from 'react'
import { Clock, FileText, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../components/ui/BrandIcons.tsx'
import { StaggerGroup, StaggerItem, StaggerListItem } from '../../components/ui/Stagger.tsx'
import { cv, profile } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { cn } from '../../lib/cn.ts'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

/** Riga cliccabile: la pillola con l'azione sta a destra da sm in su, sotto il testo su mobile. */
const rowClasses =
  "group/row grid items-center gap-x-3.5 gap-y-2.5 rounded-2xl border border-line bg-bg/30 p-3 transition-[border-color,background-color,box-shadow] duration-300 [grid-template-areas:'badge_text'_'._action'] [grid-template-columns:auto_minmax(0,1fr)] hover:border-accent/40 hover:bg-accent/8 hover:shadow-[0_14px_40px_-22px_var(--glow)] sm:[grid-template-areas:'badge_text_action'] sm:[grid-template-columns:auto_minmax(0,1fr)_auto]"

function IconBadge({ Icon }: { Icon: IconType }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg/50 text-accent [grid-area:badge]">
      <Icon aria-hidden="true" className="size-[18px]" />
    </span>
  )
}

/** "linkedin.com/in/nome" a partire dall'indirizzo completo. */
const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

type Channel = {
  label: string
  value: string
  action: string
  href: string
  Icon: IconType
  /** Si apre in una nuova scheda. */
  external?: boolean
  /** Nome del file scaricato: se presente il link scarica il file invece di aprirlo. */
  download?: string
  /** Riga in evidenza, con una leggera sfumatura del colore d'accento. */
  highlight?: boolean
  /** Testo per chi usa lo screen reader: cosa succede al clic. */
  hint: string
}

/** Colonna con i canali diretti: email, profili professionali, CV (se presente), zona e tempi di risposta. */
export default function DirectContacts() {
  const { t } = useI18n()
  const { direct, mail } = t.contact

  // mailto con oggetto e testo precompilati.
  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body.replace(/\n/g, '\r\n'))}`

  const channels: readonly Channel[] = [
    { label: direct.email.label, value: profile.email, action: direct.email.action, href: mailtoHref, Icon: Mail, hint: direct.email.hint },
    { label: direct.linkedin.label, value: shortUrl(profile.socials.linkedin), action: direct.linkedin.action, href: profile.socials.linkedin, Icon: LinkedinIcon, external: true, hint: t.common.newTab },
    { label: direct.github.label, value: shortUrl(profile.socials.github), action: direct.github.action, href: profile.socials.github, Icon: GithubIcon, external: true, hint: t.common.newTab },
    ...(cv
      ? [{ label: direct.cv.label, value: direct.cv.value, action: direct.cv.action, href: cv.href, Icon: FileText, download: cv.downloadName, highlight: true, hint: direct.cv.hint }]
      : []),
  ]

  return (
    <StaggerGroup className="flex h-full flex-col">
      <StaggerItem>
        <h2 className="font-display text-2xl font-bold">{direct.title}</h2>
        <p className="mt-1.5 text-sm text-muted">{direct.text}</p>
      </StaggerItem>

      <ul className="mt-5 space-y-3">
        {channels.map(({ label, value, action, href, Icon, external, download, highlight, hint }) => (
          <StaggerListItem key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(download ? { download } : {})}
              className={cn(rowClasses, highlight && 'border-accent/30 bg-linear-to-br from-accent/12 to-accent-2/12')}
            >
              <IconBadge Icon={Icon} />
              <span className="min-w-0 [grid-area:text]">
                <span className="block text-xs text-muted">{label}</span>
                <span className="block text-sm font-semibold [overflow-wrap:anywhere]">{value}</span>
              </span>
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-self-start rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-muted transition-[color,background-color,border-color,box-shadow,transform] duration-300 [grid-area:action] group-hover/row:-translate-y-px group-hover/row:border-transparent group-hover/row:bg-linear-to-r group-hover/row:from-accent group-hover/row:to-accent-2 group-hover/row:text-bg group-hover/row:shadow-[0_8px_24px_-10px_var(--glow)] group-focus-visible/row:border-transparent group-focus-visible/row:bg-linear-to-r group-focus-visible/row:from-accent group-focus-visible/row:to-accent-2 group-focus-visible/row:text-bg motion-reduce:transform-none sm:justify-self-end"
              >
                {action}
              </span>
              <span className="sr-only">({hint})</span>
            </a>
          </StaggerListItem>
        ))}
      </ul>

      <StaggerItem className="mt-auto pt-6">
        <dl className="space-y-3 border-t border-line pt-6 text-sm">
          <div className="flex items-center gap-3">
            <dt>
              <MapPin aria-hidden="true" className="size-4 text-accent" />
              <span className="sr-only">{direct.location}</span>
            </dt>
            <dd>{t.home.location}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt>
              <Clock aria-hidden="true" className="size-4 text-accent" />
              <span className="sr-only">{direct.responseTime}</span>
            </dt>
            <dd>{t.contact.replyLine(t.contact.responseTime)}</dd>
          </div>
        </dl>
      </StaggerItem>
    </StaggerGroup>
  )
}

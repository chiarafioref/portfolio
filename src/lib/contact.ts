/**
 * Regole del form contatti, condivise tra il browser (src/) e la funzione serverless (api/):
 * il server non si fida mai del controllo fatto nel browser e rifà la stessa validazione.
 */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  companyMax: 100,
  messageMin: 20,
  messageMax: 2000,
} as const

export type ContactValues = {
  name: string
  email: string
  company: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactLimits = typeof CONTACT_LIMITS

/**
 * Codice dell'errore di un campo. Il server risponde con i codici (non con frasi): il testo lo sceglie
 * il browser nella lingua di chi visita il sito (vedi src/i18n).
 */
export type ContactErrorCode =
  | 'nameRequired'
  | 'nameTooShort'
  | 'nameInvalid'
  | 'emailRequired'
  | 'emailInvalid'
  | 'companyTooLong'
  | 'messageRequired'
  | 'messageTooShort'
  | 'messageTooLong'

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>

export const contactFieldOrder: readonly ContactField[] = ['name', 'email', 'company', 'message']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LINE_BREAK = /[\r\n]/

/** Caratteri invisibili o di direzione del testo, usati per nascondere contenuti o falsare ciò che si legge. */
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g

const isControl = (code: number) => code < 32 || (code >= 127 && code < 160)

/**
 * Sanifica un testo ricevuto da un form: normalizza Unicode, toglie caratteri invisibili e di controllo.
 * Nei campi a riga singola a capo e tabulazioni diventano spazi; nel messaggio si tengono a capo e tab.
 */
function cleanText(value: string, multiline: boolean): string {
  let result = ''
  for (const char of value.normalize('NFC').replace(INVISIBLE, '')) {
    const code = char.codePointAt(0) ?? 0
    if (code === 13) continue // CR: i "\r\n" di Windows diventano un semplice "\n"
    if (code === 10 || code === 9) result += multiline ? char : ' '
    else if (!isControl(code)) result += char
  }
  return multiline ? result.replace(/\n{3,}/g, '\n\n').trim() : result.replace(/ {2,}/g, ' ').trim()
}

/** Versione "pulita" dei valori del form: da usare sia prima dell'invio sia sul server, prima di validare. */
export function sanitizeContact(values: ContactValues): ContactValues {
  return {
    name: cleanText(values.name, false),
    email: cleanText(values.email, false),
    company: cleanText(values.company, false),
    message: cleanText(values.message, true),
  }
}

/** Restituisce il codice dell'errore di ogni campo non valido (oggetto vuoto = tutto a posto). */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const company = values.company.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'nameRequired'
  else if (name.length < CONTACT_LIMITS.nameMin) errors.name = 'nameTooShort'
  else if (name.length > CONTACT_LIMITS.nameMax || LINE_BREAK.test(name)) errors.name = 'nameInvalid'

  if (!email) errors.email = 'emailRequired'
  else if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.emailMax || LINE_BREAK.test(email))
    errors.email = 'emailInvalid'

  if (company.length > CONTACT_LIMITS.companyMax || LINE_BREAK.test(company)) errors.company = 'companyTooLong'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < CONTACT_LIMITS.messageMin) errors.message = 'messageTooShort'
  else if (message.length > CONTACT_LIMITS.messageMax) errors.message = 'messageTooLong'

  return errors
}

/** Corpo della richiesta inviata a /api/contact. */
export type ContactPayload = ContactValues & {
  /** Campo trappola per i bot: le persone non lo vedono, quindi resta vuoto. */
  website: string
  /** Millisecondi trascorsi da quando il form è visibile all'invio: troppo pochi = un bot. */
  filledInMs: number
}

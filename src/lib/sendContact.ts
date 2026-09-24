import type { ContactErrors, ContactPayload } from './contact.ts'

const TIMEOUT_MS = 15_000

/** Errore HTTP restituito dalla funzione serverless. */
class ContactRequestError extends Error {
  readonly status: number
  readonly fieldErrors: ContactErrors | undefined

  constructor(status: number, fieldErrors?: ContactErrors) {
    super(`Invio non riuscito (${status})`)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/** Invia il messaggio alla funzione serverless. Lancia un errore se l'invio non riesce. */
export async function sendContact(payload: ContactPayload): Promise<void> {
  // Solo per l'anteprima: nessun invio reale (la variabile è impostata solo dalla build di anteprima).
  if (import.meta.env.VITE_CONTACT_DEMO === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 1400))
    return
  }

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact'
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'same-origin',
      signal: controller.signal,
    })
    if (!response.ok) {
      const data: unknown = await response.json().catch(() => null)
      const fieldErrors =
        response.status === 422 && data && typeof data === 'object' && 'errors' in data
          ? ((data as { errors: ContactErrors }).errors ?? undefined)
          : undefined
      throw new ContactRequestError(response.status, fieldErrors)
    }
  } finally {
    clearTimeout(timer)
  }
}

/** Che cosa è andato storto nell'invio: il testo corrispondente lo sceglie l'interfaccia, nella lingua della pagina. */
export type SendErrorKind = 'validation' | 'rateLimited' | 'timeout' | 'offline' | 'generic'

/** Classifica un errore di invio. */
export function classifySendError(error: unknown): { kind: SendErrorKind; fieldErrors?: ContactErrors } {
  if (error instanceof ContactRequestError) {
    if (error.status === 422 && error.fieldErrors) return { kind: 'validation', fieldErrors: error.fieldErrors }
    if (error.status === 429) return { kind: 'rateLimited' }
  }
  if (error instanceof DOMException && error.name === 'AbortError') return { kind: 'timeout' }
  if (!navigator.onLine || error instanceof TypeError) return { kind: 'offline' }
  return { kind: 'generic' }
}

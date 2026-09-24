/**
 * Funzione serverless (Vercel): riceve il form contatti e inoltra il messaggio via email con Resend.
 * Variabili d'ambiente: vedi .env.example.
 */
import { sanitizeContact, validateContact, type ContactPayload } from '../src/lib/contact.ts'
import { checkRateLimit, clientIp, header, isAllowedOrigin } from './_security.ts'

type Request = {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}

type Response = {
  status(code: number): Response
  json(body: unknown): void
  end(): void
  setHeader(name: string, value: string): void
}

// Accesso tipizzato a process.env senza dipendere da @types/node.
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {}

/** Sotto questa soglia il form è stato compilato da un bot. */
const MIN_FILL_TIME_MS = 2500
const MAX_BODY_CHARS = 8000
/** Oltre questo numero di link il messaggio è trattato come spam. */
const MAX_LINKS = 2

const FIELDS = ['name', 'email', 'company', 'message'] as const

const parseBody = (body: unknown): Record<string, unknown> | null => {
  if (typeof body === 'string') {
    if (body.length > MAX_BODY_CHARS) return null
    try {
      return parseBody(JSON.parse(body))
    } catch {
      return null
    }
  }
  return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
}

const countLinks = (text: string) => (text.match(/https?:\/\/|www\./gi) ?? []).length

export default async function handler(request: Request, response: Response) {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')

  // 1. Origine (CORS): sono ammesse solo richieste dal sito stesso.
  const origin = header(request.headers, 'origin')
  if (origin) {
    response.setHeader('Vary', 'Origin')
    if (isAllowedOrigin(origin, env)) {
      response.setHeader('Access-Control-Allow-Origin', origin)
      response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      response.setHeader('Access-Control-Max-Age', '86400')
    }
  }

  if (request.method === 'OPTIONS') {
    if (origin && isAllowedOrigin(origin, env)) return response.status(204).end()
    return response.status(403).json({ ok: false, error: 'Origine non consentita.' })
  }
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS')
    return response.status(405).json({ ok: false, error: 'Metodo non consentito.' })
  }
  if (!origin || !isAllowedOrigin(origin, env)) {
    return response.status(403).json({ ok: false, error: 'Origine non consentita.' })
  }

  // 2. Tipo di contenuto.
  if (!header(request.headers, 'content-type').toLowerCase().startsWith('application/json')) {
    return response.status(415).json({ ok: false, error: 'Formato non supportato.' })
  }

  // 3. Limite di frequenza per IP.
  const limit = checkRateLimit(clientIp(request.headers), Date.now())
  if (limit.limited) {
    response.setHeader('Retry-After', String(limit.retryAfterSeconds))
    return response.status(429).json({ ok: false, error: 'Troppe richieste. Riprova tra qualche minuto.' })
  }

  // 4. Corpo: un oggetto JSON di dimensione limitata, con campi di tipo stringa.
  const body = parseBody(request.body)
  if (!body) return response.status(400).json({ ok: false, error: 'Richiesta non valida.' })
  if (JSON.stringify(body).length > MAX_BODY_CHARS) {
    return response.status(413).json({ ok: false, error: 'Richiesta troppo grande.' })
  }
  for (const field of [...FIELDS, 'website'] as const) {
    if (body[field] !== undefined && typeof body[field] !== 'string') {
      return response.status(400).json({ ok: false, error: 'Richiesta non valida.' })
    }
  }

  // 5. Antibot (honeypot + tempo di compilazione): risponde "ok" senza inviare, per non segnalare il blocco.
  const payload = body as Partial<ContactPayload>
  const filledInMs = typeof payload.filledInMs === 'number' && Number.isFinite(payload.filledInMs) ? payload.filledInMs : 0
  if ((payload.website ?? '') !== '' || filledInMs < MIN_FILL_TIME_MS) {
    return response.status(200).json({ ok: true })
  }

  // 6. Sanificazione e validazione, con le stesse regole del browser. Le chiavi sconosciute vengono ignorate.
  const values = sanitizeContact({
    name: payload.name ?? '',
    email: payload.email ?? '',
    company: payload.company ?? '',
    message: payload.message ?? '',
  })
  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) return response.status(422).json({ ok: false, errors })

  // 7. Troppi link: probabile spam, scartato in silenzio.
  if (countLinks(`${values.company} ${values.message}`) > MAX_LINKS) {
    return response.status(200).json({ ok: true })
  }

  const apiKey = env.RESEND_API_KEY
  const to = env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Contatti: RESEND_API_KEY o CONTACT_TO_EMAIL non configurate.')
    return response.status(500).json({ ok: false, error: 'Servizio non configurato.' })
  }

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: values.email,
        subject: `Portfolio: messaggio da ${values.name}`,
        // Solo testo, niente HTML: il contenuto inviato dall'utente non viene mai interpretato.
        text: [
          `Nome: ${values.name}`,
          `Email: ${values.email}`,
          `Azienda: ${values.company || 'non indicata'}`,
          '',
          values.message,
        ].join('\n'),
      }),
    })

    if (!result.ok) {
      console.error('Contatti: Resend ha risposto', result.status, await result.text())
      return response.status(502).json({ ok: false, error: 'Invio non riuscito.' })
    }
    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contatti: errore di rete verso Resend', error)
    return response.status(502).json({ ok: false, error: 'Invio non riuscito.' })
  }
}

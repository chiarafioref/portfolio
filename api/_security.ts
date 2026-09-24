// Controllo dell'origine (CORS) e limite di frequenza. Il prefisso "_" evita che Vercel lo esponga come endpoint.
type Env = Record<string, string | undefined>
type Headers = Record<string, string | string[] | undefined>

/** Primo valore di un header HTTP (i nomi sono già in minuscolo in Node). */
export const header = (headers: Headers, name: string): string => {
  const value = headers[name]
  return (Array.isArray(value) ? value[0] : value) ?? ''
}

/** Ammette il dominio Vercel, quelli in ALLOWED_ORIGINS e, fuori dalla produzione, localhost. */
export function isAllowedOrigin(origin: string, env: Env): boolean {
  const allowed = new Set<string>()
  for (const entry of (env.ALLOWED_ORIGINS ?? '').split(',')) {
    const value = entry.trim().replace(/\/$/, '')
    if (value) allowed.add(value)
  }
  if (env.VERCEL_PROJECT_PRODUCTION_URL) allowed.add(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`)
  if (env.VERCEL_ENV !== 'production' && env.VERCEL_URL) allowed.add(`https://${env.VERCEL_URL}`)
  if (allowed.has(origin)) return true
  return env.VERCEL_ENV !== 'production' && /^http:\/\/localhost:\d{2,5}$/.test(origin)
}

/** IP del visitatore. Vercel imposta x-real-ip: gli altri header possono essere falsificati dal client. */
export function clientIp(headers: Headers): string {
  return header(headers, 'x-real-ip') || header(headers, 'x-forwarded-for').split(',')[0]?.trim() || 'sconosciuto'
}

const WINDOW_MS = 10 * 60_000
const MAX_REQUESTS = 5
const MAX_TRACKED_IPS = 1000
const recentRequests = new Map<string, number[]>()

/**
 * Massimo 5 richieste ogni 10 minuti per IP. I contatori stanno in memoria, quindi valgono per singola
 * istanza serverless: per un limite globale servirebbe uno store esterno (es. Upstash Redis).
 */
export function checkRateLimit(key: string, now: number): { limited: boolean; retryAfterSeconds: number } {
  const recent = (recentRequests.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    recentRequests.set(key, recent)
    return { limited: true, retryAfterSeconds: Math.ceil((recent[0]! + WINDOW_MS - now) / 1000) }
  }

  recent.push(now)
  recentRequests.delete(key) // rimetto la chiave "in coda": le più vecchie vengono eliminate per prime
  recentRequests.set(key, recent)
  if (recentRequests.size > MAX_TRACKED_IPS) {
    const oldest = recentRequests.keys().next().value
    if (oldest !== undefined) recentRequests.delete(oldest)
  }
  return { limited: false, retryAfterSeconds: 0 }
}

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import handler from '../api/contact.ts'

const ORIGIN = 'https://portfolio.example.com'

const validBody = {
  name: 'Mario Rossi',
  email: 'mario.rossi@example.com',
  company: 'Acme',
  message: 'Buongiorno, vorrei proporle un colloquio conoscitivo.',
  website: '',
  filledInMs: 8000,
}

type MockResponse = { statusCode: number; body: unknown; headers: Record<string, string> }

let ipCounter = 0

/** Esegue l'handler con una richiesta simulata. Ogni chiamata usa un IP diverso, per non toccare il rate limit. */
async function call({
  method = 'POST',
  origin = ORIGIN,
  contentType = 'application/json',
  body = validBody as unknown,
  ip = `10.0.0.${++ipCounter}`,
} = {}): Promise<MockResponse> {
  const result: MockResponse = { statusCode: 200, body: undefined, headers: {} }
  const response = {
    status(code: number) {
      result.statusCode = code
      return response
    },
    json(data: unknown) {
      result.body = data
    },
    end() {},
    setHeader(name: string, value: string) {
      result.headers[name] = value
    },
  }
  const headers: Record<string, string> = { 'content-type': contentType, 'x-real-ip': ip }
  if (origin) headers.origin = origin
  await handler({ method, headers, body }, response)
  return result
}

const fetchMock = vi.fn()

beforeEach(() => {
  vi.stubEnv('VERCEL_ENV', 'production')
  vi.stubEnv('ALLOWED_ORIGINS', ORIGIN)
  vi.stubEnv('RESEND_API_KEY', 'test-key')
  vi.stubEnv('CONTACT_TO_EMAIL', 'inbox@example.com')
  vi.stubEnv('CONTACT_FROM_EMAIL', '')
  fetchMock.mockReset().mockResolvedValue(new Response('{}', { status: 200 }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('api/contact', () => {
  it('invia l’email con un messaggio valido', async () => {
    const res = await call()
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledOnce()

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    const payload = JSON.parse(init.body as string)
    expect(url).toBe('https://api.resend.com/emails')
    expect(payload.to).toEqual(['inbox@example.com'])
    expect(payload.reply_to).toBe(validBody.email)
    expect(payload.from).toContain('onboarding@resend.dev')
    expect(payload.html).toBeUndefined()
  })

  it('rifiuta le origini non autorizzate', async () => {
    expect((await call({ origin: 'https://evil.example.com' })).statusCode).toBe(403)
    expect((await call({ origin: '' })).statusCode).toBe(403)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accetta gli indirizzi Vercel del deploy corrente anche in produzione', async () => {
    vi.stubEnv('VERCEL_URL', 'chiarafiore-abc123.vercel.app')
    vi.stubEnv('VERCEL_BRANCH_URL', 'chiarafiore-git-main.vercel.app')
    expect((await call({ origin: 'https://chiarafiore-abc123.vercel.app' })).statusCode).toBe(200)
    expect((await call({ origin: 'https://chiarafiore-git-main.vercel.app' })).statusCode).toBe(200)
    expect((await call({ origin: 'https://altro-progetto.vercel.app' })).statusCode).toBe(403)
  })

  it('non accetta localhost in produzione', async () => {
    expect((await call({ origin: 'http://localhost:5173' })).statusCode).toBe(403)
  })

  it('accetta localhost fuori dalla produzione', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    expect((await call({ origin: 'http://localhost:5173' })).statusCode).toBe(200)
  })

  it('risponde al preflight CORS solo per le origini autorizzate', async () => {
    const ok = await call({ method: 'OPTIONS' })
    expect(ok.statusCode).toBe(204)
    expect(ok.headers['Access-Control-Allow-Origin']).toBe(ORIGIN)
    expect((await call({ method: 'OPTIONS', origin: 'https://evil.example.com' })).statusCode).toBe(403)
  })

  it('accetta solo POST e JSON', async () => {
    expect((await call({ method: 'GET' })).statusCode).toBe(405)
    expect((await call({ contentType: 'text/plain' })).statusCode).toBe(415)
  })

  it('rifiuta corpi malformati o con tipi inattesi', async () => {
    expect((await call({ body: 'non è json' })).statusCode).toBe(400)
    expect((await call({ body: [validBody] })).statusCode).toBe(400)
    expect((await call({ body: { ...validBody, name: 42 } })).statusCode).toBe(400)
  })

  it('rifiuta corpi troppo grandi', async () => {
    expect((await call({ body: { ...validBody, extra: 'x'.repeat(9000) } })).statusCode).toBe(413)
  })

  it('restituisce i codici di errore dei campi non validi', async () => {
    const res = await call({ body: { ...validBody, email: 'non-valida', message: 'corto' } })
    expect(res.statusCode).toBe(422)
    expect(res.body).toEqual({ ok: false, errors: { email: 'emailInvalid', message: 'messageTooShort' } })
  })

  it.each([
    ['honeypot compilato', { website: 'https://spam.example.com' }],
    ['form inviato troppo in fretta', { filledInMs: 300 }],
    ['troppi link nel messaggio', { message: 'Visita http://a.example http://b.example http://c.example ora' }],
  ])('scarta in silenzio lo spam: %s', async (_, override) => {
    const res = await call({ body: { ...validBody, ...override } })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('limita le richieste ripetute dallo stesso IP', async () => {
    const ip = '192.168.1.1'
    for (let i = 0; i < 5; i++) expect((await call({ ip })).statusCode).toBe(200)
    const blocked = await call({ ip })
    expect(blocked.statusCode).toBe(429)
    expect(Number(blocked.headers['Retry-After'])).toBeGreaterThan(0)
  })

  it('non espone dettagli interni se il servizio non è configurato', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await call()
    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({ ok: false, error: 'Servizio non configurato.' })
  })

  it('risponde 502 se Resend fallisce', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fetchMock.mockResolvedValue(new Response('errore', { status: 500 }))
    expect((await call()).statusCode).toBe(502)
    fetchMock.mockRejectedValue(new TypeError('network'))
    expect((await call()).statusCode).toBe(502)
  })
})

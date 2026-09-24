# Chiara Fiore — Portfolio

Sito personale bilingue (IT/EN) in cui presento profilo, competenze e progetti come Junior Full-Stack Developer.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, Motion, React Router
- **Backend:** funzione serverless su Vercel (`api/contact.ts`) che invia i messaggi del form tramite [Resend](https://resend.com)
- **Qualità:** TypeScript in modalità strict, oxlint, test con Vitest

## Funzionalità

- **Due lingue** con URL dedicati (`/about` e `/en/about`), testi tipizzati: una traduzione mancante è un errore di compilazione.
- **Tema chiaro/scuro** con transizione circolare (View Transitions API) e senza flash al caricamento.
- **Accessibilità:** skip link, navigazione da tastiera, tab ARIA, focus gestito nel form, rispetto di `prefers-reduced-motion`.
- **Form contatti sicuro:** stessa validazione e sanificazione su client e server, controllo dell'origine (CORS), rate limit per IP, honeypot antispam, email inviata solo in formato testo.
- **Header di sicurezza:** Content-Security-Policy restrittiva (l'unico script inline è autorizzato tramite hash), HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Robustezza:** un error boundary mostra un messaggio con il pulsante di ricarica se una pagina non si carica, per esempio dopo un nuovo deploy.
- **Performance:** pagine secondarie caricate in lazy loading, immagini WebP, animazioni basate su `transform`/`opacity`.

## Struttura

```
api/            funzione serverless del form contatti
tests/          test della funzione serverless (i test delle utility stanno accanto al codice)
src/
  components/   componenti UI e di layout riutilizzabili
  sections/     sezioni delle singole pagine
  pages/        pagine (rotte)
  data/         dati del profilo e dei progetti
  i18n/         traduzioni e gestione della lingua
  lib/          validazione del form e chiamata all'API
```

## Avvio in locale

```bash
pnpm install
pnpm dev
```

Altri comandi: `pnpm test`, `pnpm build`, `pnpm lint`, `pnpm typecheck`.

Il form contatti chiama `/api/contact`, che è disponibile solo su Vercel (o con `vercel dev`). Per provarlo in locale senza backend, imposta `VITE_CONTACT_DEMO=true` in un file `.env.local`.

## Deploy

Il progetto è pensato per Vercel. Le variabili d'ambiente necessarie sono elencate in [`.env.example`](.env.example).

Il CV scaricabile è opzionale: si attiva mettendo il PDF in `public/` e impostandone il percorso in `cv` ([src/data/profile.ts](src/data/profile.ts)). Finché è `null`, i pulsanti di download restano nascosti.

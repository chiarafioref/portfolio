/**
 * Lingue del sito e regole degli indirizzi.
 * L'italiano vive alla radice (/, /about, /portfolio, /contact); l'inglese sotto /en (/en, /en/about, ...).
 * La lingua si ricava sempre dall'indirizzo: nessuno stato da tenere sincronizzato.
 */
export type Lang = 'it' | 'en'

const DEFAULT_LANG: Lang = 'it'

const EN_PREFIX = '/en'

export function langFromPath(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : DEFAULT_LANG
}

/** "/en/about" → "/about"; gli indirizzi italiani restano invariati. */
export function stripLang(pathname: string): string {
  if (langFromPath(pathname) !== 'en') return pathname
  return pathname.slice(EN_PREFIX.length) || '/'
}

/** Indirizzo di una pagina nella lingua richiesta: localizePath('/about', 'en') → '/en/about'. */
export function localizePath(to: string, lang: Lang): string {
  const base = stripLang(to)
  if (lang === DEFAULT_LANG) return base
  return base === '/' ? EN_PREFIX : `${EN_PREFIX}${base}`
}

const STORAGE_KEY = 'lang'

/** Lingua scelta in passato con l'interruttore (se il browser permette di ricordarla). */
export function readSavedLang(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'it' || value === 'en' ? value : null
  } catch {
    return null
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage non disponibile (es. navigazione privata): la scelta vale solo per questa visita.
  }
}

/** Formatta una data ISO ("2025-10-08") nella lingua della pagina: "8 ottobre 2025" / "October 8, 2025". */
export function formatDate(iso: string, lang: Lang): string {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

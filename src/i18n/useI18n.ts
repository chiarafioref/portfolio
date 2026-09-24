import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { langFromPath, localizePath, type Lang } from './config.ts'
import { dictionaries } from './dictionaries.ts'

/**
 * Lingua corrente (ricavata dall'indirizzo), testi della pagina e funzione per costruire link nella stessa lingua.
 * Uso: `const { t, path } = useI18n()` → `<Link to={path('/about')}>{t.nav.about}</Link>`.
 */
export function useI18n() {
  const { pathname } = useLocation()
  const lang: Lang = langFromPath(pathname)

  return useMemo(
    () => ({
      lang,
      t: dictionaries[lang],
      /** Indirizzo di una pagina (scritto in italiano, es. '/about') nella lingua corrente. */
      path: (to: string) => localizePath(to, lang),
    }),
    [lang],
  )
}

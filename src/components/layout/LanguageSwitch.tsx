import { Link, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { localizePath, saveLang, stripLang, type Lang } from '../../i18n/config.ts'
import { useI18n } from '../../i18n/useI18n.ts'

const options: readonly { lang: Lang; code: string }[] = [
  { lang: 'it', code: 'IT' },
  { lang: 'en', code: 'EN' },
]

const itemClasses =
  'relative isolate grid h-7 min-w-9 place-items-center rounded-full px-2 text-xs font-semibold leading-none tracking-wide max-[360px]:min-w-8 max-[360px]:px-1.5'

/** Selettore IT | EN: l'altra lingua è un vero link (/en/...), indicizzabile; la scelta viene salvata. */
export default function LanguageSwitch() {
  const { lang: current, t } = useI18n()
  const { pathname, search } = useLocation()
  const base = stripLang(pathname)
  const names: Record<Lang, string> = { it: t.nav.languageIt, en: t.nav.languageEn }

  return (
    <ul
      aria-label={t.nav.language}
      className="mr-0.5 flex items-center rounded-full border border-line bg-bg/40 p-0.5 backdrop-blur"
    >
      {options.map(({ lang, code }) => (
        <li key={lang}>
          {lang === current ? (
            <span aria-current="true" lang={lang} className={`${itemClasses} text-bg`}>
              <motion.span
                aria-hidden="true"
                layoutId="language-pill"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-accent to-accent-2 shadow-[0_4px_14px_-4px_var(--glow)]"
              />
              <span aria-hidden="true">{code}</span>
              <span className="sr-only">{names[lang]}</span>
            </span>
          ) : (
            <Link
              to={`${localizePath(base, lang)}${search}`}
              lang={lang}
              hrefLang={lang}
              onClick={() => saveLang(lang)}
              className={`${itemClasses} text-muted transition-colors hover:text-fg`}
            >
              <span aria-hidden="true">{code}</span>
              <span className="sr-only">{names[lang]}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

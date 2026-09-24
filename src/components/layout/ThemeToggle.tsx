import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n.ts'

type Theme = 'light' | 'dark'

/** Il tema iniziale è già applicato a <html> dallo script inline di index.html. */
function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const { t } = useI18n()
  const [theme, setTheme] = useState<Theme>(readTheme)

  const apply = (next: Theme) => {
    document.documentElement.dataset.theme = next
    // Colore della barra del browser sul telefono: segue il tema.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#060810' : '#f7f8fb')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage non disponibile (es. navigazione privata): il tema vale solo per la sessione.
    }
    setTheme(next)
  }

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Senza View Transitions (o con movimento ridotto) il cambio è immediato.
    if (reduceMotion || typeof document.startViewTransition !== 'function') {
      apply(next)
      return
    }

    // Il nuovo tema si "allarga" a cerchio partendo dal bottone.
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushSync(() => apply(next))
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })
      .catch(() => {
        // transizione annullata: il tema è comunque già cambiato.
      })
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ rotate: 14 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
      className="relative grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-accent/10 hover:text-fg"
    >
      <Sun
        aria-hidden="true"
        className={`absolute size-5 transition-all duration-500 ${
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-5 transition-all duration-500 ${
          theme === 'light' ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'
        }`}
      />
    </motion.button>
  )
}

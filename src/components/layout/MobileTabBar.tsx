import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { motion } from 'motion/react'
import { navLinks } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { cn } from '../../lib/cn.ts'

/** Barra di navigazione in basso, solo su mobile (su desktop i link stanno nella Navbar). */
export default function MobileTabBar() {
  const { t, path } = useI18n()
  const [typing, setTyping] = useState(false)

  // Nascosta mentre un campo del form ha il focus, per non coprirlo insieme alla tastiera.
  useEffect(() => {
    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement && target.matches('input, textarea, select')
    const onFocusIn = (event: FocusEvent) => setTyping(isField(event.target))
    const onFocusOut = () => setTyping(false)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <motion.nav
      aria-label={t.nav.tabs}
      inert={typing}
      initial={{ y: 110, opacity: 0 }}
      animate={typing ? { y: 110, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 130, damping: 20, delay: typing ? 0 : 0.3 }}
      // Più stretta dello schermo e staccata dai lati: Safari iOS 26 tratta le barre fisse quasi a tutta larghezza in
      // fondo alla pagina come barre di sistema e riempie la zona sotto la barra dell'indirizzo con una banda di colore.
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-max -translate-x-1/2 md:hidden"
    >
      <ul className="grid grid-cols-4 gap-0.5 rounded-full border border-line bg-bg/60 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
        {navLinks.map(({ to, key }) => (
          <li key={to}>
            <NavLink
              to={path(to)}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative isolate flex min-h-11 items-center justify-center rounded-full px-2.5 text-xs font-medium transition-colors',
                  isActive ? 'text-fg' : 'text-muted active:text-fg'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="tab-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/12 ring-1 ring-accent/25"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {t.nav[key]}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

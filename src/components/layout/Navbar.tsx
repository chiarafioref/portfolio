import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { navLinks, profile } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { cn } from '../../lib/cn.ts'
import LanguageSwitch from './LanguageSwitch.tsx'
import ThemeToggle from './ThemeToggle.tsx'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Navbar() {
  const { t, path } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Barra di avanzamento della lettura + compattazione della navbar dopo pochi pixel di scroll.
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
      className="absolute inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:fixed"
    >
      <nav
        aria-label={t.nav.label}
        className={cn(
          'relative flex w-full max-w-4xl items-center justify-between rounded-full border border-line bg-surface px-3 py-2 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 ease-out max-[360px]:px-2',
          // Versione compatta dopo lo scroll, solo su desktop (su mobile la barra scorre via con la pagina).
          scrolled &&
            'md:max-w-3xl md:border-accent/25 md:bg-bg/85 md:py-1.5 md:shadow-2xl md:shadow-black/25 md:backdrop-blur-2xl'
        )}
      >
        <Link
          to={path('/')}
          className="group whitespace-nowrap rounded-full px-3 py-1.5 font-display text-lg font-extrabold tracking-tight max-[360px]:px-1.5 max-[360px]:text-base"
        >
          <span>
            {profile.name}
            <span className="inline-block text-accent transition-transform duration-500 ease-out group-hover:scale-150 group-hover:rotate-[360deg]">
              .
            </span>
            {profile.surname}
          </span>
        </Link>

        {/* Su desktop i link stanno qui; su mobile c'è la barra in basso (MobileTabBar). */}
        <ul className="hidden items-center gap-1 md:flex" onPointerLeave={() => setHovered(null)}>
          {navLinks.map(({ to, key }, index) => (
            <motion.li
              key={to}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + index * 0.07, ease: EASE }}
              onPointerEnter={() => setHovered(to)}
            >
              <NavLink
                to={path(to)}
                end={to === '/'}
                onFocus={() => setHovered(to)}
                onBlur={() => setHovered(null)}
                className={({ isActive }) =>
                  cn(
                    'relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Evidenziazione che scorre da un link all'altro seguendo il mouse */}
                    {hovered === to && !isActive && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/8"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent/12 ring-1 ring-accent/25"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {t.nav[key]}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
        >
          <LanguageSwitch />
          <ThemeToggle />
        </motion.div>

        {/* Progresso di lettura */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="pointer-events-none absolute inset-x-8 -bottom-px max-md:hidden h-[2px] origin-left rounded-full bg-linear-to-r from-accent to-accent-2"
        />
      </nav>
    </motion.header>
  )
}

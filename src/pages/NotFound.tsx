import type { PointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useLocation } from 'react-router'
import CodeCurtain from '../components/backgrounds/CodeCurtain.tsx'
import ButtonLink from '../components/ui/ButtonLink.tsx'
import Magnetic from '../components/ui/Magnetic.tsx'
import { StaggerGroup, StaggerItem } from '../components/ui/Stagger.tsx'
import { fullName } from '../data/profile.ts'
import { useI18n } from '../i18n/useI18n.ts'

const EASE = [0.22, 1, 0.36, 1] as const
const DIGITS = ['4', '0', '4'] as const

const shortPath = (pathname: string) => (pathname.length > 48 ? `${pathname.slice(0, 47)}…` : pathname)

/** Pagina 404: il numero si inclina seguendo il mouse, con CodeCurtain sullo sfondo. */
export default function NotFound() {
  const { t, path } = useI18n()
  const { pathname } = useLocation()
  const copy = t.notFound
  const reduceMotion = useReducedMotion()

  // Posizione del mouse normalizzata (-1…1) → rotazione con molla.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-10, 10]), { stiffness: 110, damping: 16 })
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [8, -8]), { stiffness: 110, damping: 16 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center"
    >
      <title>{`${copy.title} | ${fullName}`}</title>
      <meta name="robots" content="noindex" />

      {/* Sfondo animato + velo centrale per la leggibilità del testo */}
      <CodeCurtain className="absolute inset-x-0 top-0 -z-20 h-[78%] w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_52%_at_50%_54%,var(--bg),transparent)] opacity-90 sm:bg-[radial-gradient(ellipse_55%_50%_at_50%_52%,var(--bg),transparent)] sm:opacity-80"
      />

      <StaggerGroup className="relative flex w-full max-w-2xl flex-col items-center">
        <StaggerItem className="relative">
          {/* Alone che respira dietro le cifre */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] -inset-y-[10%] -z-10 animate-glow-breathe rounded-full motion-reduce:animate-none"
            style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
          />
          <motion.p
            aria-hidden="true"
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className="flex select-none justify-center font-display text-[7.5rem] font-extrabold leading-[1.05] tracking-tighter sm:text-[11rem] md:text-[13rem]"
          >
            {DIGITS.map((digit, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 70, rotateX: -75, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.95, delay: 0.25 + index * 0.13, ease: EASE }}
                className="inline-block"
              >
                <motion.span
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 5.5, delay: 1.4 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ animationDelay: `${-index * 2.2}s` }}
                  className="inline-block animate-shimmer bg-linear-to-r from-accent via-accent-2 to-accent bg-[length:250%_auto] bg-clip-text px-[0.02em] pb-[0.06em] text-transparent motion-reduce:animate-none"
                >
                  {digit}
                </motion.span>
              </motion.span>
            ))}
          </motion.p>
        </StaggerItem>

        <StaggerItem>
          <h1 className="text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {copy.heading}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted">{copy.text}</p>
        </StaggerItem>

        {/* Richiesta fallita in stile terminale */}
        <StaggerItem className="mt-6 flex w-full min-w-0 justify-center">
          <p className="inline-flex max-w-full min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-xs backdrop-blur sm:text-sm">
            <span className="font-semibold text-accent">GET</span>
            <span className="min-w-0 truncate text-fg">{shortPath(pathname)}</span>
            <span aria-hidden="true" className="text-muted">
              →
            </span>
            <span className="font-semibold text-amber-700 dark:text-amber-400">404</span>
            <span
              aria-hidden="true"
              className="-ml-1 h-4 w-[7px] animate-pulse rounded-[1px] bg-accent/70 motion-reduce:animate-none"
            />
          </p>
        </StaggerItem>

        <StaggerItem className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <Magnetic>
            <ButtonLink to={path('/')}>
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
              {copy.back}
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink variant="ghost" to={path('/portfolio')}>
              {copy.projects}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </Magnetic>
        </StaggerItem>
      </StaggerGroup>
    </section>
  )
}

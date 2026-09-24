import type { ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'
import KeepTogether from '../ui/KeepTogether.tsx'
import Reveal from '../ui/Reveal.tsx'

type PageShellProps = {
  kicker?: string
  title: string
  /** Un paragrafo, oppure più paragrafi (uno per elemento). */
  intro?: string | readonly string[]
  /** Contenuto più largo (max-w-6xl invece di max-w-5xl), per le pagine con elementi affiancati. */
  wide?: boolean
  children?: ReactNode
}

/** Struttura comune delle pagine interne: spazio per la navbar flottante, titolo e introduzione. */
export default function PageShell({ kicker, title, intro, wide = false, children }: PageShellProps) {
  return (
    <section className={cn('mx-auto px-5 pb-24 pt-32 sm:px-8 lg:pt-40', wide ? 'max-w-6xl' : 'max-w-5xl')}>
      <Reveal>
        {kicker && (
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">{kicker}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <KeepTogether>{title}</KeepTogether>
        </h1>
        {intro && (
          <div className="mt-5 max-w-3xl space-y-4 text-pretty text-lg leading-relaxed text-muted">
            {(typeof intro === 'string' ? [intro] : intro).map((paragraph) => (
              <p key={paragraph}>
                <KeepTogether>{paragraph}</KeepTogether>
              </p>
            ))}
          </div>
        )}
      </Reveal>
      {children}
    </section>
  )
}

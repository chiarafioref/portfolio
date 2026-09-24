import type { LucideIcon } from 'lucide-react'
import { Database, PanelsTopLeft, Server, Sparkles } from 'lucide-react'
import Reveal from '../../components/ui/Reveal.tsx'
import TiltCard from '../../components/ui/TiltCard.tsx'
import { useI18n } from '../../i18n/useI18n.ts'

/** Stesso ordine di home.pillars in i18n. */
const pillarIcons: readonly LucideIcon[] = [PanelsTopLeft, Server, Database, Sparkles]

function IconMedallion({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative grid size-[4.5rem] place-items-center">
      {/* Bagliore in hover */}
      <span
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-accent/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Anello che pulsa piano */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping-ring rounded-full border border-accent/25 motion-reduce:hidden"
      />
      {/* Anello fisso */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-accent/30 transition-transform duration-500 ease-out group-hover:scale-110"
      />
      {/* Disco */}
      <span
        aria-hidden="true"
        className="absolute inset-2 rounded-full bg-linear-to-br from-accent/25 to-accent-2/25 ring-1 ring-inset ring-accent/30 transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className="relative size-7 text-accent transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
      />
    </div>
  )
}

export default function Pillars() {
  const { t } = useI18n()
  const { pillars, pillarsKicker, pillarsTitle } = t.home

  return (
    <section aria-labelledby="competenze-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal inView className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {pillarsKicker}
        </p>
        <h2
          id="competenze-title"
          className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {pillarsTitle}
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ title, text, tags }, index) => (
          <li key={title}>
            <Reveal inView delay={index * 0.1} className="h-full">
              <TiltCard>
                <div className="flex h-full flex-col items-center p-8 text-center">
                  <IconMedallion icon={pillarIcons[index] ?? Sparkles} />
                  {/* Altezza di due righe: allinea i testi anche quando un titolo va a capo */}
                  <h3 className="mt-6 flex items-center font-display text-lg font-bold lg:min-h-14">{title}</h3>
                  <p className="mt-3 max-w-[30ch] text-pretty text-sm leading-relaxed text-muted">{text}</p>

                  {/* Tag ancorati al fondo della card */}
                  <div className="mt-auto w-full pt-8">
                    <ul className="flex min-h-[4.75rem] flex-wrap content-start justify-center gap-2 border-t border-line pt-5">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium leading-none text-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-fg"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

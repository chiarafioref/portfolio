import type { LucideIcon } from 'lucide-react'
import { Check, Database, PanelsTopLeft, Server, Sparkles } from 'lucide-react'
import Reveal from '../../components/ui/Reveal.tsx'
import SpotlightCard from '../../components/ui/SpotlightCard.tsx'
import { useI18n } from '../../i18n/useI18n.ts'

const icons: readonly LucideIcon[] = [PanelsTopLeft, Server, Database, Sparkles]

/** Apertura del Profilo: competenze tecniche (front-end, back-end, database, integrazione dell'IA). */
export default function Strengths() {
  const { t } = useI18n()
  const { skills, skillsKicker, skillsTitle, skillsIntro } = t.about

  return (
    <section aria-labelledby="competenze-title" className="mt-20">
      <Reveal inView>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">{skillsKicker}</p>
        <h2
          id="competenze-title"
          className="mt-3 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {skillsTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          {skillsIntro}
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {skills.map(({ title, text, items }, index) => {
          const Icon = icons[index] ?? PanelsTopLeft
          return (
            <li key={title}>
              <Reveal inView delay={(index % 2) * 0.1} className="h-full">
                <SpotlightCard className="p-7">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/20 text-accent ring-1 ring-inset ring-accent/25 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    >
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight">{title}</h3>
                  </div>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted md:min-h-[2.9rem]">{text}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check aria-hidden="true" strokeWidth={2.5} className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

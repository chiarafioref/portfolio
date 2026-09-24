import { Check, SquareTerminal, Sparkles } from 'lucide-react'
import Reveal from '../../components/ui/Reveal.tsx'
import SpotlightCard from '../../components/ui/SpotlightCard.tsx'
import { useI18n } from '../../i18n/useI18n.ts'
import KeepTogether from '../../components/ui/KeepTogether.tsx'

/** "Come lavoro con l'IA": strumento che accelera, non sostituisce. */
export default function AiApproach() {
  const { t } = useI18n()
  const { ai } = t.about
  const columns = [
    { title: ai.withTitle, caption: ai.withCaption, icon: Sparkles, items: ai.with, highlight: true },
    { title: ai.withoutTitle, caption: ai.withoutCaption, icon: SquareTerminal, items: ai.without, highlight: false },
  ]

  return (
    <section aria-labelledby="ia-title" className="mt-24">
      <Reveal inView>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {ai.kicker}
        </p>
        <h2
          id="ia-title"
          className="mt-3 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {ai.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          <KeepTogether>{ai.intro}</KeepTogether>
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {columns.map(({ title, caption, icon: Icon, items, highlight }, index) => (
          <li key={title}>
            <Reveal inView delay={index * 0.1} className="h-full">
              <SpotlightCard highlight={highlight} className="p-7">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/20 text-accent ring-1 ring-inset ring-accent/25 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight">{title}</h3>
                    <p className="mt-0.5 text-sm text-muted">{caption}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
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
        ))}
      </ul>
    </section>
  )
}

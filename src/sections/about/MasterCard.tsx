import { useState } from 'react'
import { CalendarRange, Check, GraduationCap } from 'lucide-react'
import CredentialMedallion from '../../components/ui/CredentialMedallion.tsx'
import TiltCard from '../../components/ui/TiltCard.tsx'
import { master } from '../../data/profile.ts'
import { formatDate } from '../../i18n/config.ts'
import { useI18n } from '../../i18n/useI18n.ts'

/** Card del Master, in evidenza: stato, date e programma. Nessun titolo finale finché non c'è. */
export default function MasterCard() {
  const { lang, t } = useI18n()
  const copy = t.about.master
  const [now] = useState(() => Date.now())
  const done = now >= new Date(`${master.end}T23:59:59`).getTime()

  return (
    <TiltCard>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/12 via-transparent to-accent-2/12"
      />
      <div className="relative grid gap-8 p-7 sm:p-9 lg:grid-cols-[auto_1fr_19rem] lg:items-center lg:gap-10">
        <CredentialMedallion icon={GraduationCap} />

        {/* Titolo, stato, date */}
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold text-muted">{master.issuer}</p>
          <h3 className="mt-1 text-balance font-display text-2xl font-bold leading-snug sm:text-3xl">
            {master.name}
          </h3>

          <p className="mt-4 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium backdrop-blur">
              <span className="relative flex size-2">
                {!done && (
                  <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-emerald-500 opacity-70 motion-reduce:hidden" />
                )}
                <span
                  className={`relative inline-flex size-2 rounded-full ${done ? 'bg-accent' : 'bg-emerald-500'}`}
                />
              </span>
              {done ? copy.done : copy.inProgress}
            </span>
          </p>

          <dl className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
            <div className="flex items-center gap-2">
              <CalendarRange aria-hidden="true" className="size-4 text-accent" />
              <dt className="sr-only">{copy.period}</dt>
              <dd>
                {formatDate(master.start, lang)} – {formatDate(master.end, lang)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Programma */}
        <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted lg:text-left">
            {copy.programme}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {copy.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <Check aria-hidden="true" strokeWidth={2.5} className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  )
}

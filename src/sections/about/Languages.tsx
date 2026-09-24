import Reveal from '../../components/ui/Reveal.tsx'
import { useI18n } from '../../i18n/useI18n.ts'

/** Lingue: una riga compatta sotto la formazione. */
export default function Languages() {
  const { t } = useI18n()
  const { languages } = t.about

  return (
    <Reveal inView className="mt-10">
      <section
        aria-label={languages.title}
        className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface px-6 py-4 text-sm backdrop-blur"
      >
        <h2 className="font-display font-semibold">{languages.title}</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {languages.list.map(({ name, level }) => (
            <li key={name} className="text-muted">
              <span className="font-medium text-fg">{name}</span> · {level}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  )
}

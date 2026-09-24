import Reveal from '../../components/ui/Reveal.tsx'
import { useI18n } from '../../i18n/useI18n.ts'
import Certification from './Certification.tsx'
import MasterCard from './MasterCard.tsx'

/** Formazione e certificazioni: il Master in primo piano, sopra la certificazione Oracle. */
export default function Education() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="formazione-title" className="mt-24">
      <Reveal inView>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {t.about.education.kicker}
        </p>
        <h2
          id="formazione-title"
          className="mt-3 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {t.about.education.title}
        </h2>
      </Reveal>

      <div className="mt-10 space-y-4">
        <Reveal inView delay={0.05}>
          <MasterCard />
        </Reveal>
        <Reveal inView delay={0.1}>
          <Certification />
        </Reveal>
      </div>
    </section>
  )
}

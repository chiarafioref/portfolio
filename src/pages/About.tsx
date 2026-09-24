import { ArrowRight, Mail } from 'lucide-react'
import PageShell from '../components/layout/PageShell.tsx'
import ButtonLink from '../components/ui/ButtonLink.tsx'
import Magnetic from '../components/ui/Magnetic.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import { fullName, profile } from '../data/profile.ts'
import { useI18n } from '../i18n/useI18n.ts'
import AiApproach from '../sections/about/AiApproach.tsx'
import Education from '../sections/about/Education.tsx'
import Languages from '../sections/about/Languages.tsx'
import Strengths from '../sections/about/Strengths.tsx'
import KeepTogether from '../components/ui/KeepTogether.tsx'

export default function About() {
  const { t, path } = useI18n()
  const { about } = t

  return (
    <PageShell kicker={t.nav.about} title={profile.role} intro={about.bio}>
      <title>{`${t.nav.about} | ${fullName}`}</title>
      <Strengths />
      <AiApproach />
      <Education />
      <Languages />

      <Reveal inView className="mt-24">
        <div className="rounded-3xl border border-line bg-surface px-6 py-10 text-center backdrop-blur sm:px-10">
          <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {about.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-muted">
            <KeepTogether>{about.cta.text}</KeepTogether>
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <Magnetic>
              <ButtonLink to={path('/portfolio')}>
                {about.cta.projects}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink variant="ghost" href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" className="size-4" />
                {about.cta.write}
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </PageShell>
  )
}

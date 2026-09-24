import { ArrowUpRight, Check } from 'lucide-react'
import ButtonLink from '../../components/ui/ButtonLink.tsx'
import { GithubIcon } from '../../components/ui/BrandIcons.tsx'
import Magnetic from '../../components/ui/Magnetic.tsx'
import Reveal from '../../components/ui/Reveal.tsx'
import type { Project } from '../../data/projects.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import PhoneStage from './PhoneStage.tsx'

/** Scheda progetto: descrizione e tecnologie, anteprima sui telefoni e link a demo e codice. */
export default function ProjectShowcase({ project }: { project: Project }) {
  const { t } = useI18n()
  const copy = t.projects[project.slug]
  const titleId = `${project.slug}-title`

  return (
    <section aria-labelledby={titleId} className="mt-16">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-18">
        <Reveal inView>
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {t.portfolio.featured}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-emerald-500 opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t.portfolio.online}
            </span>
          </div>

          <h2
            id={titleId}
            className="mt-3.5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span className="inline-block bg-linear-to-r from-accent to-accent-2 bg-clip-text pb-[0.12em] text-transparent">
              {project.name}
            </span>
          </h2>
          <p className="mt-1.5 font-display text-lg font-semibold text-muted">{copy.tagline}</p>
          <p className="mt-4 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-muted">{copy.description}</p>

          <ul className="mt-6 grid max-w-xl gap-x-6 gap-y-2.5 text-sm leading-snug sm:grid-cols-2">
            {copy.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check aria-hidden="true" strokeWidth={2.5} className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <ul aria-label={t.portfolio.technologies} className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-300 hover:border-accent/40 hover:text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-muted">
            <b className="font-semibold text-fg">{t.portfolio.roleLabel}</b> {t.portfolio.role}
          </p>
        </Reveal>

        <PhoneStage project={project} />
      </div>

      <Reveal inView className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Magnetic>
          <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {t.portfolio.open(project.name)}
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only"> {t.common.opensInNewTab}</span>
          </ButtonLink>
        </Magnetic>
        <Magnetic>
          <ButtonLink variant="ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-4" />
            {t.portfolio.code}
            <span className="sr-only"> {t.common.opensInNewTab}</span>
          </ButtonLink>
        </Magnetic>
      </Reveal>
    </section>
  )
}

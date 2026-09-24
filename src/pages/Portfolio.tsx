import PageShell from '../components/layout/PageShell.tsx'
import { fullName } from '../data/profile.ts'
import { projects } from '../data/projects.ts'
import { useI18n } from '../i18n/useI18n.ts'
import ProjectShowcase from '../sections/portfolio/ProjectShowcase.tsx'

export default function Portfolio() {
  const { t } = useI18n()

  return (
    <PageShell
      wide
      kicker={t.nav.portfolio}
      title={t.portfolio.title}
      intro={t.portfolio.intro}
    >
      <title>{`${t.nav.portfolio} | ${fullName}`}</title>
      {projects.map((project) => (
        <ProjectShowcase key={project.slug} project={project} />
      ))}
    </PageShell>
  )
}

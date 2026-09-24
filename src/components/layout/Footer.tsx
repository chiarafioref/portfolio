import { Link } from 'react-router'
import { fullName, navLinks, profile } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons.tsx'

const socials = [
  { href: profile.socials.github, label: 'GitHub', Icon: GithubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
]

export default function Footer() {
  const { t, path } = useI18n()

  return (
    <footer className="border-t border-line max-md:pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {fullName}
        </p>

        <nav aria-label={t.footer.label} className="max-md:hidden">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map(({ to, key }) => (
              <li key={to}>
                <Link to={path(to)} className="text-muted transition-colors hover:text-fg">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (${t.common.newTab})`}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-fg"
              >
                <Icon className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

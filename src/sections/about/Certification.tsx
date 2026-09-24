import { BadgeCheck, CalendarCheck, CalendarClock, Check, ExternalLink } from 'lucide-react'
import ButtonLink from '../../components/ui/ButtonLink.tsx'
import CredentialMedallion from '../../components/ui/CredentialMedallion.tsx'
import TiltCard from '../../components/ui/TiltCard.tsx'
import { certification } from '../../data/profile.ts'
import { formatDate } from '../../i18n/config.ts'
import { useI18n } from '../../i18n/useI18n.ts'

/** Certificazione Oracle come card in evidenza, con link di verifica al badge pubblico. */
export default function Certification() {
  const { lang, t } = useI18n()
  const copy = t.about.certification

  return (
    <TiltCard>
      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[auto_1fr_19rem] lg:items-center lg:gap-10">
        <CredentialMedallion icon={BadgeCheck} />

        {/* Titolo, date, verifica */}
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold text-muted">{certification.issuer}</p>
          <h3 className="mt-1 text-balance font-display text-xl font-bold leading-snug sm:text-2xl">
            {certification.name}
          </h3>

          <dl className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
            <div className="flex items-center gap-2">
              <CalendarCheck aria-hidden="true" className="size-4 text-accent" />
              <dt className="sr-only">{copy.issuedLabel}</dt>
              <dd>{copy.issued(formatDate(certification.issued, lang))}</dd>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock aria-hidden="true" className="size-4 text-accent" />
              <dt className="sr-only">{copy.validLabel}</dt>
              <dd>{copy.valid(formatDate(certification.expires, lang))}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <ButtonLink variant="ghost" href={certification.verifyUrl} target="_blank" rel="noopener noreferrer">
              {copy.verify}
              <ExternalLink aria-hidden="true" className="size-4" />
              <span className="sr-only">{t.common.opensInNewTab}</span>
            </ButtonLink>
          </div>
        </div>

        {/* Argomenti coperti */}
        <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted lg:text-left">
            {copy.topicsTitle}
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

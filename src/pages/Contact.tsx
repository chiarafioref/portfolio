import PageShell from '../components/layout/PageShell.tsx'
import { fullName } from '../data/profile.ts'
import { useI18n } from '../i18n/useI18n.ts'
import Reveal from '../components/ui/Reveal.tsx'
import TiltCard from '../components/ui/TiltCard.tsx'
import ContactForm from '../sections/contact/ContactForm.tsx'
import DirectContacts from '../sections/contact/DirectContacts.tsx'

export default function Contact() {
  const { t } = useI18n()

  return (
    <PageShell
      wide
      kicker={t.nav.contact}
      title={t.contact.title}
      intro={t.contact.intro}
    >
      <title>{`${t.nav.contact} | ${fullName}`}</title>
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
        <Reveal inView className="h-full">
          <TiltCard maxTilt={2.5} steadyOnFocus>
            <div className="p-6 sm:p-8">
              <ContactForm />
            </div>
          </TiltCard>
        </Reveal>
        <Reveal inView delay={0.12} className="h-full">
          <TiltCard maxTilt={3.5}>
            <div className="h-full p-6 sm:p-8">
              <DirectContacts />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </PageShell>
  )
}

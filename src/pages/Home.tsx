import { useI18n } from '../i18n/useI18n.ts'
import Hero from '../sections/home/Hero.tsx'
import Pillars from '../sections/home/Pillars.tsx'

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <title>{t.home.title}</title>
      <Hero />
      <Pillars />
    </>
  )
}

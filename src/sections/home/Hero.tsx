import { motion } from 'motion/react'
import { ArrowRight, Download, GraduationCap, MapPin } from 'lucide-react'
import AnimatedHeading from '../../components/ui/AnimatedHeading.tsx'
import ButtonLink from '../../components/ui/ButtonLink.tsx'
import HeroVisual from '../../components/ui/HeroVisual.tsx'
import Magnetic from '../../components/ui/Magnetic.tsx'
import Marquee from '../../components/ui/Marquee.tsx'
import Reveal from '../../components/ui/Reveal.tsx'
import { cv, fullName, profile } from '../../data/profile.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import KeepTogether from '../../components/ui/KeepTogether.tsx'

function StackCaption({ children }: { children: string }) {
  return (
    <p className="mx-auto mb-3 max-w-6xl px-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:px-8">
      {children}
    </p>
  )
}

export default function Hero() {
  const { t, path } = useI18n()
  const { home } = t
  const headline = [{ text: home.headline[0] }, { text: home.headline[1], gradient: true }]

  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* Alone dietro al titolo, solo sotto lg (su desktop c'è HeroVisual) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-[26rem] w-[26rem] max-w-[85vw] animate-glow-breathe rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_32%,transparent),color-mix(in_oklab,var(--accent-2)_15%,transparent)_60%,transparent)] blur-3xl motion-reduce:animate-none lg:hidden"
      />

      <div className="mx-auto grid max-w-3xl items-center gap-12 px-5 pb-16 pt-32 text-center sm:px-8 lg:max-w-6xl lg:grid-cols-[1.35fr_0.65fr] lg:gap-10 lg:pb-24 lg:pt-44 lg:text-left">
        <div>
          <Reveal delay={0.08}>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:text-sm sm:tracking-[0.18em]">
              {fullName} <span className="text-accent">/</span> <KeepTogether>{profile.role}</KeepTogether>
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-4 text-balance font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight sm:text-6xl lg:text-[3.5rem] xl:text-[3.75rem]"
          >
            <AnimatedHeading segments={headline} delay={0.15} />
          </h1>

          <Reveal delay={0.55}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted lg:mx-0">
              <KeepTogether>{home.intro}</KeepTogether>
            </p>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:justify-start">
              <Magnetic>
                <ButtonLink to={path('/portfolio')}>
                  {home.seeProjects}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </Magnetic>
              {cv && (
                <Magnetic>
                  <ButtonLink variant="ghost" href={cv.href} download={cv.downloadName}>
                    <Download aria-hidden="true" className="size-4" />
                    {home.downloadCv}
                  </ButtonLink>
                </Magnetic>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.85}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted lg:justify-start">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-accent" />
                {home.location}
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap aria-hidden="true" className="size-4 text-accent" />
                {profile.education}
              </li>
            </ul>
          </Reveal>
        </div>

        <HeroVisual className="hidden justify-self-center lg:block lg:justify-self-end" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="space-y-6 pb-6"
      >
        <div>
          <StackCaption>{home.stackFrontend}</StackCaption>
          <Marquee items={home.frontendSkills} label={home.stackFrontend} repeat={2} duration={60} />
        </div>
        <div>
          <StackCaption>{home.stackBackend}</StackCaption>
          <Marquee
            items={home.backendSkills}
            label={home.stackBackend}
            reverse
            repeat={2}
            duration={55}
            variant="accent"
          />
        </div>
      </motion.div>
    </section>
  )
}

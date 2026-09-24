import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn.ts'
import type { Project } from '../../data/projects.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import PhoneFrame, { PhoneScreen } from './PhoneFrame.tsx'

const AUTOPLAY_MS = 4200

type PhoneStageProps = {
  project: Pick<Project, 'slug' | 'name' | 'sideScreens' | 'tour'>
}

/**
 * Tre telefoni con le schermate del progetto. Il centrale si sfoglia con dei tab accessibili da tastiera
 * e scorre in automatico, fermandosi con hover, focus, click o prefers-reduced-motion.
 */
export default function PhoneStage({ project }: PhoneStageProps) {
  const { t } = useI18n()
  const screens = t.projects[project.slug].screens
  const { sideScreens, tour } = project
  const [current, setCurrent] = useState(0)
  const [userPicked, setUserPicked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduceMotion = useReducedMotion()
  const inView = useInView(stageRef, { margin: '0px 0px -10% 0px' })

  const autoplay = !reduceMotion && inView && !userPicked && !hovering && !focused

  useEffect(() => {
    if (!autoplay) return
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % tour.length), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [autoplay, tour.length])

  const select = useCallback(
    (index: number, focus = false) => {
      setCurrent(index)
      setUserPicked(true)
      if (focus) tabRefs.current[index]?.focus()
    },
    [],
  )

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = tour.length - 1
    const next =
      event.key === 'ArrowRight' ? (current === last ? 0 : current + 1)
      : event.key === 'ArrowLeft' ? (current === 0 ? last : current - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    select(next, true)
  }

  // Parallasse: aggiorna due variabili CSS senza ri-renderizzare. Solo con il mouse.
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (reduceMotion || event.pointerType !== 'mouse' || !stage) return
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3))
    stage.style.setProperty('--my', (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3))
  }

  const onPointerLeave = () => {
    setHovering(false)
    stageRef.current?.style.setProperty('--mx', '0')
    stageRef.current?.style.setProperty('--my', '0')
  }

  return (
    <figure aria-label={t.portfolio.screensOf(project.name)} className="m-0 min-w-0">
      <div
        ref={stageRef}
        className="phone-stage"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div aria-hidden="true" className="phone-halo" />

        <div className="ph-pos ph-left">
          <div className="ph-float">
            <div className="ph-entry">
              <PhoneFrame>
                <PhoneScreen screen={sideScreens.left} alt={screens[sideScreens.left.id].alt} />
              </PhoneFrame>
            </div>
          </div>
        </div>

        <div className="ph-pos ph-right">
          <div className="ph-float">
            <div className="ph-entry">
              <PhoneFrame>
                <PhoneScreen screen={sideScreens.right} alt={screens[sideScreens.right.id].alt} />
              </PhoneFrame>
            </div>
          </div>
        </div>

        <div className="ph-pos ph-center">
          <div className="ph-float">
            <div className="ph-entry">
              <PhoneFrame>
                {tour.map((screen, index) => (
                  <div
                    key={screen.id}
                    id={`${project.slug}-panel-${screen.id}`}
                    role="tabpanel"
                    aria-labelledby={`${project.slug}-tab-${screen.id}`}
                    inert={index !== current}
                    className={cn('phone-slide', index === current && 'is-on')}
                  >
                    <PhoneScreen screen={screen} alt={screens[screen.id].alt} eager={index === 0} />
                  </div>
                ))}
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label={t.portfolio.browseScreens(project.name)}
        className="mt-6 flex flex-wrap justify-center gap-1.5"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {tour.map((screen, index) => {
          const selected = index === current
          return (
            <button
              key={screen.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              id={`${project.slug}-tab-${screen.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${project.slug}-panel-${screen.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onTabKeyDown}
              className={cn(
                'rounded-full border px-3.5 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-300',
                selected
                  ? 'border-accent/30 bg-accent/12 text-fg'
                  : 'border-transparent text-muted hover:bg-fg/7 hover:text-fg',
              )}
            >
              {screens[screen.id].label}
            </button>
          )
        })}
      </div>

      <figcaption className="mt-2.5 text-center text-xs text-muted">
        {t.portfolio.caption}
      </figcaption>
    </figure>
  )
}

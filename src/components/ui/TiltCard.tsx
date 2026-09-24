import { useRef, type FocusEvent, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '../../lib/cn.ts'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Inclinazione massima in gradi. */
  maxTilt?: number
  /** Ferma l'inclinazione finché un elemento interno ha il focus: utile per i form, che restano fermi mentre si scrive. */
  steadyOnFocus?: boolean
}

/** Card con inclinazione 3D e spotlight che seguono il mouse, e bordo luminoso (.border-beam) in hover/focus. */
export default function TiltCard({ children, className, maxTilt = 7, steadyOnFocus = false }: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const steady = useRef(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20, mass: 0.4 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20, mass: 0.4 })

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element || event.pointerType !== 'mouse') return
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--my', `${event.clientY - rect.top}px`)
    if (reduceMotion || steady.current) return
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set(-(px - 0.5) * 2 * maxTilt)
    rotateX.set((py - 0.5) * 2 * maxTilt)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleFocus = () => {
    if (!steadyOnFocus) return
    steady.current = true
    handleLeave()
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) steady.current = false
  }

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        style={{ rotateX: springX, rotateY: springY }}
        className={cn(
          'group border-beam relative h-full rounded-3xl transition-shadow duration-500 hover:shadow-[0_24px_70px_-28px_var(--glow)]',
          className
        )}
      >
        <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface backdrop-blur">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(320px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 65%)',
            }}
          />
          <div className="relative h-full">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}

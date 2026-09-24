import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '../../lib/cn.ts'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** 0 = nessun effetto, 1 = l'elemento segue il cursore 1:1. */
  strength?: number
}

/**
 * L'elemento si sposta leggermente verso il cursore (solo mouse, non con prefers-reduced-motion).
 * Margine negativo + padding allargano l'area di attrazione oltre i bordi.
 */
export default function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 })

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn('-m-3 inline-block p-3', className)}
    >
      {children}
    </motion.div>
  )
}

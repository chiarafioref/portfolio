import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Ritardo in secondi. */
  delay?: number
  /** Se true l'animazione parte quando l'elemento entra nel viewport; altrimenti subito. */
  inView?: boolean
}

const hidden = { opacity: 0, y: 18, filter: 'blur(6px)' }
const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }

/** Entrata fade + slide + blur. Rispetta prefers-reduced-motion tramite <MotionConfig>. */
export default function Reveal({ children, className, delay = 0, inView = false }: RevealProps) {
  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }

  if (inView) {
    return (
      <motion.div
        className={className}
        initial={hidden}
        whileInView={shown}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div className={className} initial={hidden} animate={shown} transition={transition}>
      {children}
    </motion.div>
  )
}

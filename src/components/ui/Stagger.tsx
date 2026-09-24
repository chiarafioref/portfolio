import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

type StaggerProps = { children: ReactNode; className?: string }

/**
 * Entrata a cascata: i figli StaggerItem / StaggerListItem compaiono uno dopo l'altro (fade + slide leggero)
 * quando il gruppo entra nello schermo. Con prefers-reduced-motion resta solo la dissolvenza (vedi MotionConfig).
 */
export function StaggerGroup({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

/** Come StaggerItem, ma è un <li> (da mettere dentro una <ul>). */
export function StaggerListItem({ children, className }: StaggerProps) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  )
}

import { motion } from 'motion/react'
import { cn } from '../../lib/cn.ts'

type HeadingSegment = {
  text: string
  /** Se true la porzione di testo è colorata con il gradiente animato. */
  gradient?: boolean
}

type AnimatedHeadingProps = {
  segments: readonly HeadingSegment[]
  className?: string
  /** Ritardo iniziale in secondi. */
  delay?: number
}

const gradientClass =
  'bg-linear-to-r from-accent via-accent-2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer motion-reduce:animate-none'

/** Titolo che entra parola per parola; gli spazi reali tra le parole lo mantengono leggibile per SEO e screen reader. */
export default function AnimatedHeading({ segments, className, delay = 0 }: AnimatedHeadingProps) {
  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, gradient: segment.gradient }))
  )

  return (
    <span className={className}>
      {words.map(({ word, gradient }, index) => (
        <span key={`${word}-${index}`}>
          {/* Padding interno + margine negativo: la maschera non taglia le lettere discendenti (g, p, y) */}
          <span className="inline-block overflow-hidden align-bottom -mb-[0.24em]">
            <motion.span
              className={cn('inline-block pb-[0.24em]', gradient && gradientClass)}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: delay + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}

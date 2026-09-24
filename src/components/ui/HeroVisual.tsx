import { useId } from 'react'
import { Database, PanelsTopLeft, Server, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn.ts'

const EASE = [0.22, 1, 0.36, 1] as const

/** Un nodo della costellazione: icona, etichetta, posizione (in % del riquadro) e diametro (in rem, fisso). */
type Node = {
  icon: typeof Server
  label: string
  x: number
  y: number
  size: number
  accent?: boolean
}

const NODES: readonly Node[] = [
  { icon: PanelsTopLeft, label: 'React', x: 16, y: 14, size: 5.5 },
  { icon: Server, label: 'Node.js', x: 74, y: 46, size: 6.5 },
  { icon: Database, label: 'Supabase', x: 28, y: 80, size: 5.5 },
  { icon: Sparkles, label: 'IA', x: 90, y: 18, size: 4.3, accent: true },
] as const

/** Percorsi che collegano i nodi (stesso riquadro 0-100, in percentuale). */
const LINKS = [
  'M16,14 C 38,22 54,30 74,46',
  'M74,46 C 56,60 44,68 28,80',
  'M74,46 C 82,34 86,26 90,18',
] as const

/**
 * Grafo decorativo dello stack: i nodi entrano in sequenza, i collegamenti si disegnano e un impulso
 * li percorre. Con prefers-reduced-motion il grafo resta completo ma fermo.
 */
export default function HeroVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const id = useId()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.7, ease: EASE }}
      className={cn('relative aspect-square w-full max-w-[22rem]', className)}
    >
      {/* Alone dietro alla costellazione */}
      <div
        aria-hidden="true"
        className="absolute inset-[6%] -z-10 animate-glow-breathe rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_28%,transparent),color-mix(in_oklab,var(--accent-2)_13%,transparent)_60%,transparent)] blur-3xl motion-reduce:animate-none"
      />

      {/* Stelline decorative */}
      {[
        { x: 6, y: 52, delay: 0 },
        { x: 52, y: 8, delay: 0.6 },
        { x: 58, y: 92, delay: 1.1 },
        { x: 96, y: 62, delay: 1.7 },
      ].map((star, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{ left: `${star.x}%`, top: `${star.y}%`, animationDelay: `${star.delay}s` }}
          className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping-soft rounded-full bg-accent/70 motion-reduce:hidden"
        />
      ))}

      {/* Collegamenti tra i nodi, percorsi da un impulso */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-link`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
          </linearGradient>
          <radialGradient id={`${id}-pulse`}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.3" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {LINKS.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={`url(#${id}-link)`}
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.55"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 1.1 + index * 0.25, ease: EASE }}
          />
        ))}

        {!reduceMotion &&
          LINKS.map((d, index) => (
            <circle key={`${d}-pulse`} r="1.6" fill={`url(#${id}-pulse)`}>
              <animateMotion
                dur="2.6s"
                begin={`${2.1 + index * 0.6}s`}
                repeatCount="indefinite"
                path={d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.08;0.85;1"
                dur="2.6s"
                begin={`${2.1 + index * 0.6}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </svg>

      {/* Nodi: icona + etichetta */}
      {NODES.map(({ icon: Icon, label, x, y, size, accent }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.85 + index * 0.22, ease: EASE }}
          style={{ left: `${x}%`, top: `${y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div
            style={{ width: `${size}rem`, animationDelay: `${-index * 1.6}s` }}
            className="relative aspect-square animate-float motion-reduce:animate-none"
          >
            {index === 1 && (
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 animate-ping-ring rounded-full bg-accent/25 motion-reduce:hidden"
              />
            )}
            <div
              className={cn(
                'flex size-full flex-col items-center justify-center gap-1 rounded-full border shadow-lg shadow-black/10 backdrop-blur-xl',
                accent ? 'border-accent-2/40 bg-linear-to-br from-accent/15 to-accent-2/15' : 'border-line bg-surface'
              )}
            >
              <Icon aria-hidden="true" className="size-[34%] text-accent" strokeWidth={1.8} />
              <span className="text-[0.55rem] font-semibold tracking-tight text-muted sm:text-[0.62rem]">
                {label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

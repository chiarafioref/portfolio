import type { PointerEvent, ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** Sfondo con leggera sfumatura del colore d'accento, per mettere la card in evidenza. */
  highlight?: boolean
}

/**
 * Card con "spotlight" che segue il cursore.
 * La posizione viene scritta come CSS variable sull'elemento (nessun re-render React).
 */
export default function SpotlightCard({ children, className, highlight = false }: SpotlightCardProps) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    element.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border p-6 backdrop-blur transition-colors duration-300 hover:border-accent/30',
        highlight ? 'border-accent/30 bg-linear-to-br from-accent/12 to-accent-2/12' : 'border-line bg-surface',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 20%, transparent), transparent 65%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

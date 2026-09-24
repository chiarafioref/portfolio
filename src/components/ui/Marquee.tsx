import { cn } from '../../lib/cn.ts'

type MarqueeProps = {
  items: readonly string[]
  /** Nome accessibile della lista (letto dai lettori di schermo). */
  label: string
  /** Scorre da sinistra a destra invece che da destra a sinistra. */
  reverse?: boolean
  /** Quante volte la lista viene ripetuta in ciascuna metà: serve a riempire schermi larghi. */
  repeat?: number
  /** Durata di un giro completo, in secondi. */
  duration?: number
  variant?: 'default' | 'accent'
  className?: string
}

function Chip({ label, variant }: { label: string; variant: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium text-fg backdrop-blur',
        variant === 'accent' ? 'border-accent/30 bg-accent/10' : 'border-line bg-surface'
      )}
    >
      {label}
    </span>
  )
}

/**
 * Nastro a scorrimento infinito: il contenuto è duplicato per chiudere il ciclo senza salti,
 * e solo la prima copia è letta dagli screen reader. Con prefers-reduced-motion diventa una lista statica.
 */
export default function Marquee({
  items,
  label,
  reverse = false,
  repeat = 2,
  duration = 45,
  variant = 'default',
  className,
}: MarqueeProps) {
  const copies = Array.from({ length: repeat * 2 }, (_, copy) => copy)

  return (
    <div
      className={cn(
        'group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]',
        className
      )}
    >
      <ul
        aria-label={label}
        style={{ animationDuration: `${duration}s` }}
        className={cn(
          'flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        {copies.flatMap((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item}`}
              aria-hidden={copy > 0 ? true : undefined}
              className={cn('pr-3', copy > 0 && 'motion-reduce:hidden')}
            >
              <Chip label={item} variant={variant} />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

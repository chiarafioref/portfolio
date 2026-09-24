/** Stili condivisi da ButtonLink e dai bottoni veri e propri (es. l'invio del form). */
export const buttonBase =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-[box-shadow,background-color,border-color] duration-300 select-none'

export const buttonVariants = {
  primary:
    'bg-linear-to-r from-accent to-accent-2 text-bg shadow-[0_8px_30px_-8px_var(--glow)] hover:shadow-[0_12px_44px_-6px_var(--glow)]',
  ghost:
    'border border-line bg-surface text-fg backdrop-blur hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_10px_34px_-14px_var(--glow)]',
} as const

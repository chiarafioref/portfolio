/** Sfondo globale: gradienti radiali in lento movimento (solo transform, niente blur) e griglia sottile. */
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Su mobile i gradienti sfumano verso --bg ai bordi, in continuità con le barre del browser */}
      <div className="absolute inset-0 max-md:[mask-image:linear-gradient(to_bottom,transparent,#000_6rem,#000_calc(100%_-_8rem),transparent)]">
        <div
          className="absolute -left-[20vmax] -top-[25vmax] size-[75vmax] animate-drift-a motion-reduce:animate-none"
          style={{ background: 'radial-gradient(closest-side, var(--aurora-1), transparent)' }}
        />
        <div
          className="absolute -right-[25vmax] top-[10vmax] size-[70vmax] animate-drift-b motion-reduce:animate-none"
          style={{ background: 'radial-gradient(closest-side, var(--aurora-2), transparent)' }}
        />
        <div
          className="absolute -bottom-[30vmax] left-[15vmax] size-[65vmax] animate-drift-c motion-reduce:animate-none"
          style={{ background: 'radial-gradient(closest-side, var(--aurora-3), transparent)' }}
        />
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000,transparent)]" />
      </div>
    </div>
  )
}

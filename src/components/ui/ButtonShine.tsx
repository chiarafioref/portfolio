/** Riflesso luminoso che attraversa un bottone primario al passaggio del mouse (il bottone deve avere la classe `group`). */
export default function ButtonShine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:translate-x-[500%] group-hover:opacity-100 motion-reduce:hidden"
    />
  )
}

import type { LucideIcon } from 'lucide-react'

/** Medaglione con anello che pulsa piano: usato dalle card di formazione e certificazioni. */
export default function CredentialMedallion({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative mx-auto grid size-28 place-items-center lg:mx-0">
      <span
        aria-hidden="true"
        className="absolute -inset-4 rounded-full bg-accent/25 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping-ring rounded-full border border-accent/25 motion-reduce:hidden"
      />
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-accent/30" />
      <span
        aria-hidden="true"
        className="absolute inset-3 rounded-full bg-linear-to-br from-accent/25 to-accent-2/25 ring-1 ring-inset ring-accent/30"
      />
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="relative size-12 text-accent transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6"
      />
    </div>
  )
}

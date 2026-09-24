import { Fragment } from 'react'

const COMPOUND = /(\p{L}+(?:-\p{L}+)+)/u

/** Impedisce di andare a capo dentro le parole con il trattino (es. "Full-Stack"). */
export default function KeepTogether({ children }: { children: string }) {
  return (
    <>
      {children.split(COMPOUND).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  )
}

import type { ReactNode } from 'react'
import type { ProjectScreen } from '../../data/projects.ts'

type PhoneScreenProps = {
  screen: ProjectScreen
  /** Descrizione dello screenshot per chi non lo vede (dipende dalla lingua, quindi arriva da fuori). */
  alt: string
  /** Le immagini non visibili si caricano solo quando servono. */
  eager?: boolean
}

/** Screenshot + barra di stato (ora e batteria) disegnata sopra, con il colore dell'header dell'app. */
export function PhoneScreen({ screen, alt, eager = false }: PhoneScreenProps) {
  return (
    <div className="phone-shot" style={{ backgroundColor: screen.bar, color: screen.dark ? '#f3f4f8' : '#111827' }}>
      <div aria-hidden="true" className="phone-sb">
        <span>9:41</span>
        <span className="phone-bat">
          <i />
          <i />
        </span>
      </div>
      <img
        src={screen.src}
        alt={alt}
        width={780}
        height={1612}
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        draggable={false}
      />
    </div>
  )
}

/** Cornice del telefono: bordo, isola dinamica e riflesso. Le dimensioni seguono la variabile --pw del contenitore. */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div aria-hidden="true" className="phone-island" />
        <div aria-hidden="true" className="phone-glare" />
        {children}
      </div>
    </div>
  )
}

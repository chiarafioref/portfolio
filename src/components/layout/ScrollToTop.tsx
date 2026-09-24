import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Riporta la pagina in cima a ogni cambio di rotta (React Router non lo fa da solo). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

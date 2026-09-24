import { Component, type ReactNode } from 'react'

type ErrorBoundaryProps = { children: ReactNode; fallback: ReactNode }

/** Mostra `fallback` invece di una pagina bianca se il render fallisce (es. chunk non più disponibile dopo un deploy). */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

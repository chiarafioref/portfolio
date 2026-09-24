import assistente from '../assets/portfolio/mywallet-assistente.webp'
import budget from '../assets/portfolio/mywallet-budget.webp'
import dashboard from '../assets/portfolio/mywallet-dashboard.webp'
import dashboardScuro from '../assets/portfolio/mywallet-dashboard-scuro.webp'
import reportMensile from '../assets/portfolio/mywallet-report-mensile.webp'
import statisticheScuro from '../assets/portfolio/mywallet-statistiche-scuro.webp'
import viaggio from '../assets/portfolio/mywallet-viaggio.webp'

/** Schermate disponibili: i loro testi (etichetta e descrizione) stanno in src/i18n. */
export type ScreenId = 'budget' | 'statistiche' | 'dashboard' | 'assistente' | 'gruppo' | 'report' | 'scuro'

/** Progetti disponibili: i loro testi (slogan, descrizione, punti di forza) stanno in src/i18n. */
type ProjectSlug = 'mywallet'

/** Una schermata mostrata dentro un telefono. */
export type ProjectScreen = {
  id: ScreenId
  src: string
  /** Colore della barra di stato disegnata sopra lo screenshot: coincide con l'header dell'app. */
  bar: string
  /** true per gli screenshot in tema scuro (testo chiaro nella barra di stato). */
  dark: boolean
}

export type Project = {
  slug: ProjectSlug
  name: string
  stack: readonly string[]
  liveUrl: string
  repoUrl: string
  /** Telefono sinistro e destro: fissi. */
  sideScreens: { left: ProjectScreen; right: ProjectScreen }
  /** Telefono centrale: si sfoglia con il selettore. */
  tour: readonly ProjectScreen[]
}

// Screenshot dell'app reale con dati dimostrativi.
const LIGHT_BAR = '#fefefe'
const DARK_BAR = '#121925'

const myWallet: Project = {
  slug: 'mywallet',
  name: 'MyWallet',
  stack: ['Vanilla JavaScript', 'Supabase Auth', 'PostgreSQL + RLS', 'Realtime', 'Edge Functions', 'Mistral AI'],
  liveUrl: 'https://chiarafioref.github.io/MyWallet/',
  repoUrl: 'https://github.com/chiarafioref/MyWallet',
  sideScreens: {
    left: { id: 'budget', src: budget, bar: LIGHT_BAR, dark: false },
    right: { id: 'statistiche', src: statisticheScuro, bar: DARK_BAR, dark: true },
  },
  tour: [
    { id: 'dashboard', src: dashboard, bar: LIGHT_BAR, dark: false },
    { id: 'assistente', src: assistente, bar: LIGHT_BAR, dark: false },
    { id: 'gruppo', src: viaggio, bar: '#85878d', dark: false },
    { id: 'report', src: reportMensile, bar: LIGHT_BAR, dark: false },
    { id: 'scuro', src: dashboardScuro, bar: DARK_BAR, dark: true },
  ],
}

/** Progetti mostrati nella pagina Portfolio, in ordine. */
export const projects: readonly Project[] = [myWallet]

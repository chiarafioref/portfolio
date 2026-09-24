import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { MotionConfig } from 'motion/react'
import MainLayout from './layouts/MainLayout.tsx'
import Home from './pages/Home.tsx'

// Le pagine secondarie vengono caricate solo quando servono.
const About = lazy(() => import('./pages/About.tsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

/**
 * Le pagine sono le stesse in entrambe le lingue: cambia solo l'indirizzo (italiano alla radice, inglese sotto /en).
 * La lingua si ricava dall'indirizzo (vedi i18n/useI18n.ts), quindi non servono rotte o componenti diversi.
 */
const pages = (
  <>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="portfolio" element={<Portfolio />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </>
)

export default function App() {
  return (
    // reducedMotion="user": con prefers-reduced-motion attivo, motion disattiva le animazioni di movimento.
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<MainLayout />}>
          {pages}
          <Route path="en">{pages}</Route>
        </Route>
      </Routes>
    </MotionConfig>
  )
}

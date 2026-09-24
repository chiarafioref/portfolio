import { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import AuroraBackground from '../components/backgrounds/AuroraBackground.tsx'
import ErrorBoundary from '../components/layout/ErrorBoundary.tsx'
import Footer from '../components/layout/Footer.tsx'
import MobileTabBar from '../components/layout/MobileTabBar.tsx'
import Navbar from '../components/layout/Navbar.tsx'
import ScrollToTop from '../components/layout/ScrollToTop.tsx'
import { buttonBase, buttonVariants } from '../components/ui/buttonStyles.ts'
import { readSavedLang } from '../i18n/config.ts'
import { useI18n } from '../i18n/useI18n.ts'
import { cn } from '../lib/cn.ts'

export default function MainLayout() {
  const { pathname } = useLocation()
  const { lang, t } = useI18n()

  // Solo all'apertura della home: se in passato è stato scelto l'inglese, reindirizza a /en.
  const [startedAtRoot] = useState(() => pathname === '/')
  const redirectToEnglish = startedAtRoot && pathname === '/' && readSavedLang() === 'en'

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  if (redirectToEnglish) return <Navigate to="/en" replace />

  return (
    <>
      <a
        href="#contenuto"
        className="sr-only rounded-full bg-accent text-sm font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:px-4 focus:py-2"
      >
        {t.nav.skip}
      </a>

      <AuroraBackground />
      <Navbar />

      <main id="contenuto" tabIndex={-1} className="min-h-dvh">
        {/* key = pathname: ripete l'animazione di entrata e azzera l'ErrorBoundary a ogni cambio di rotta */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ErrorBoundary
            fallback={
              <section role="alert" className="mx-auto max-w-xl px-5 pb-24 pt-40 text-center">
                <h1 className="font-display text-3xl font-extrabold tracking-tight">{t.common.errorTitle}</h1>
                <p className="mt-3 text-muted">{t.common.errorText}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className={cn(buttonBase, buttonVariants.primary, 'mt-8')}
                >
                  {t.common.reload}
                </button>
              </section>
            }
          >
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </main>

      <MobileTabBar />
      <Footer />
      <ScrollToTop />
    </>
  )
}

import { useEffect } from 'react'
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './components/AppShell'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import About from './pages/About'
import Manifesto from './pages/Manifesto'
import Pricing from './pages/Pricing'
import Downloads from './pages/Downloads'
import Congratulations from './pages/Congratulations'
import DeployCheck from './pages/DeployCheck'
import Login from './pages/Login'
import AppHome from './pages/AppHome'
import AppPlaceholder from './pages/AppPlaceholder'
import NotFound from './pages/NotFound'

function RevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.is-visible)')

      if (!elements.length) {
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (!entry.isIntersecting) {
              return
            }

            const delay = entry.target.style.getPropertyValue('--reveal-delay') || `${index * 60}ms`
            entry.target.style.transitionDelay = delay
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.1 },
      )

      elements.forEach((element) => observer.observe(element))
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <RevealObserver />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/congratulations" element={<Congratulations />} />
            <Route path="/deploy-check" element={<DeployCheck />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/app"
            element={(
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            )}
          >
            <Route index element={<AppHome />} />
            <Route
              path="account"
              element={(
                <AppPlaceholder
                  title="Account"
                  description="Profile controls, Google linking, and session management will land here in Phase 10."
                />
              )}
            />
            <Route
              path="billing"
              element={(
                <AppPlaceholder
                  title="Billing"
                  description="Provider-aware billing controls and hosted checkout wiring arrive in Phase 10."
                />
              )}
            />
            <Route
              path="usage"
              element={(
                <AppPlaceholder
                  title="Usage"
                  description="Usage history, word consumption, and limits become first-class views in Phase 10."
                />
              )}
            />
            <Route
              path="preferences"
              element={(
                <AppPlaceholder
                  title="Preferences"
                  description="Desktop sync, typing behavior, and notification settings will be connected next phase."
                />
              )}
            />
            <Route
              path="sessions"
              element={(
                <AppPlaceholder
                  title="Sessions"
                  description="Trusted devices and recent sign-in activity stay protected here for the Phase 10 account work."
                />
              )}
            />
            <Route
              path="*"
              element={(
                <AppPlaceholder
                  title="App route"
                  description="This protected route is reserved for upcoming product wiring."
                />
              )}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

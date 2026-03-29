import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Manifesto from './pages/Manifesto'
import Pricing from './pages/Pricing'
import Downloads from './pages/Downloads'
import Congratulations from './pages/Congratulations'
import NotFound from './pages/NotFound'

/* Attaches IntersectionObserver on every route change to pick up new .reveal elements */
function RevealObserver() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Small delay to let React paint the new page
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.is-visible)')
      if (!els.length) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              // Stagger items inside the same parent
              const delay = entry.target.style.getPropertyValue('--reveal-delay') || `${i * 60}ms`
              entry.target.style.transitionDelay = delay
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      els.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 50)
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RevealObserver />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import './Header.css'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const auth = useAuth()
  const primaryAppLink = auth.isAuthenticated ? '/app' : '/login'
  const primaryAppLabel = auth.isAuthenticated ? 'Open app' : 'Log in'

  return (
    <>
      <header className="site-header">
        <div className="container site-header__row">
          {/* Left: Logo */}
          <Link className="brand" to="/" aria-label="TypeTalk home" onClick={() => setMobileOpen(false)}>
            <span className="brand__mark" aria-hidden="true"><Logo size={24} /></span>
            <span className="brand__text">TypeTalk</span>
          </Link>

          {/* Center: Nav (absolutely centered) */}
          <nav className="site-header__nav" aria-label="Main navigation">
            <NavLink to="/manifesto" onClick={() => setMobileOpen(false)}>Manifesto</NavLink>
            <NavLink to="/pricing" onClick={() => setMobileOpen(false)}>Pricing</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
          </nav>

          {/* Right: CTA + Mobile toggle */}
          <div className="site-header__right">
            <Link to={primaryAppLink} className="header-link" onClick={() => setMobileOpen(false)}>
              {primaryAppLabel}
            </Link>
            <Link to="/downloads" className="header-cta">
              Download for free
            </Link>
            <button
              className="header-hamburger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Navigation menu">
          <nav className="mobile-drawer__nav">
            <NavLink to="/manifesto" onClick={() => setMobileOpen(false)}>Manifesto</NavLink>
            <NavLink to="/pricing" onClick={() => setMobileOpen(false)}>Pricing</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
            <Link to={primaryAppLink} className="mobile-drawer__secondary" onClick={() => setMobileOpen(false)}>
              {primaryAppLabel}
            </Link>
            <Link to="/downloads" className="mobile-drawer__cta" onClick={() => setMobileOpen(false)}>
              Download for free
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

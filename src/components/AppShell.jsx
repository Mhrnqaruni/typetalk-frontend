import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import './AppShell.css'

const navigation = [
  { to: '/app', label: 'Overview', title: 'Overview' },
  { to: '/app/account', label: 'Account', title: 'Account' },
  { to: '/app/billing', label: 'Billing', title: 'Billing' },
  { to: '/app/usage', label: 'Usage', title: 'Usage' },
  { to: '/app/preferences', label: 'Preferences', title: 'Preferences' },
  { to: '/app/sessions', label: 'Sessions', title: 'Sessions' },
]

function buildInitials(user) {
  const source = user?.display_name || user?.primary_email || 'TT'

  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function AppShell() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const activePage = navigation.find((item) => (
    location.pathname === item.to
    || location.pathname.startsWith(`${item.to}/`)
  ))

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await auth.logout()
      navigate('/login', { replace: true })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <Link className="app-shell__brand" to="/app" aria-label="TypeTalk app">
          <span className="brand__mark" aria-hidden="true"><Logo size={24} /></span>
          <span className="brand__text">TypeTalk</span>
        </Link>

        <p className="app-shell__subtitle">Authenticated workspace</p>

        <nav className="app-shell__nav" aria-label="App navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/app'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="app-shell__account">
          <div className="app-shell__avatar">{buildInitials(auth.user)}</div>
          <div>
            <p className="app-shell__user-name">{auth.user?.display_name || 'TypeTalk user'}</p>
            <p className="app-shell__user-email">{auth.user?.primary_email}</p>
          </div>
        </div>

        <button
          type="button"
          className="app-shell__logout"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out…' : 'Log out'}
        </button>
      </aside>

      <div className="app-shell__content">
        <header className="app-shell__topbar">
          <div>
            <p className="app-shell__eyebrow">Phase 9 app shell</p>
            <h1>{activePage?.title ?? 'TypeTalk app'}</h1>
          </div>
          <p className="app-shell__topbar-copy">
            Browser auth is live through dedicated `/v1/web-auth/*` endpoints, with the refresh
            token kept in a secure `HttpOnly` cookie on the backend origin.
          </p>
        </header>

        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

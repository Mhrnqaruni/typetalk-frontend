import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isBootstrapping) {
    return (
      <div className="app-route-loading">
        <div className="app-route-loading__card">
          <p>Restoring your session…</p>
        </div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?next=${encodeURIComponent(nextPath)}`} replace />
  }

  return children ?? <Outlet />
}

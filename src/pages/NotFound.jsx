import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__sub">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="notfound__cta">Go home</Link>
    </div>
  )
}

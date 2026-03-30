import { useAuth } from '../context/AuthContext'
import './AppHome.css'

export default function AppHome() {
  const auth = useAuth()

  return (
    <section className="app-home">
      <article className="app-home__hero">
        <p className="app-home__eyebrow">Authenticated route ready</p>
        <h2>Welcome back, {auth.user?.display_name || auth.user?.primary_email}.</h2>
        <p>
          Phase 9 establishes the browser-safe auth layer, secure refresh-cookie session bootstrap,
          and the protected app route tree that Phase 10 will wire into real account and billing data.
        </p>
      </article>

      <div className="app-home__grid">
        <article className="app-home__card">
          <h3>Current user</h3>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{auth.user?.primary_email}</dd>
            </div>
            <div>
              <dt>User id</dt>
              <dd>{auth.user?.id}</dd>
            </div>
          </dl>
        </article>

        <article className="app-home__card">
          <h3>Session bootstrap</h3>
          <dl>
            <div>
              <dt>Session id</dt>
              <dd>{auth.session?.id}</dd>
            </div>
            <div>
              <dt>Expires at</dt>
              <dd>{auth.session?.expires_at}</dd>
            </div>
          </dl>
        </article>

        <article className="app-home__card">
          <h3>Workspace</h3>
          <dl>
            <div>
              <dt>Organization id</dt>
              <dd>{auth.organizationId}</dd>
            </div>
            <div>
              <dt>Token storage</dt>
              <dd>Access token in memory only</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}

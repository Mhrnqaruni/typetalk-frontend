export default function AppPlaceholder({ title, description }) {
  return (
    <section className="app-placeholder">
      <p className="app-home__eyebrow">Protected placeholder</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <dl>
        <div>
          <dt>Phase status</dt>
          <dd>Route and auth shell are live.</dd>
        </div>
        <div>
          <dt>Next phase</dt>
          <dd>Real data wiring and browser account controls land in Phase 10.</dd>
        </div>
      </dl>
    </section>
  )
}

import './Manifesto.css'

export default function Manifesto() {
  return (
    <div className="manifesto-page">
      <div className="container manifesto-container">
        <h1 className="manifesto-title">The keyboard was a mistake</h1>

        {/* Opening quote block */}
        <blockquote className="manifesto-quote-block">
          <p>For 150 years, we've been forcing thoughts through our fingertips.</p>
          <p>The keyboard wasn't built for humans.</p>
          <p>It was built for machines – and we adapted to it.</p>
          <p>That era is over.</p>
        </blockquote>

        {/* Voice is our default */}
        <section className="manifesto-section">
          <h2 className="manifesto-heading">Voice is our default</h2>
          <p>It's the only <em>natural</em> way we communicate.</p>
          <p>From birth, we don't learn to type.</p>
          <p>We learn to speak.</p>
          <p>Talking is instinctive. Effortless. Human.</p>
          <p>Typing is none of those things.</p>
        </section>

        {/* Pull quote */}
        <blockquote className="manifesto-pull-quote">
          <p>
            <mark className="manifesto-mark manifesto-mark--blue">Typeless</mark>{' '}
            turns your raw, unfiltered voice into beautifully polished writing – in real time.
          </p>
        </blockquote>

        {/* Continue */}
        <section className="manifesto-section">
          <p>You speak faster than you type.</p>
          <p>You think faster when you speak.</p>
          <p>And when you remove the friction, your thoughts flow freely.</p>
          <p>You become more creative. More inspired. More fluent in your own ideas.</p>
        </section>

        <section className="manifesto-section">
          <p className="manifesto-emphasis">
            This isn't a tool. It's a{' '}
            <mark className="manifesto-mark manifesto-mark--blue">turning point</mark>
            .
          </p>
        </section>

        <section className="manifesto-section">
          <p>The keyboard is a relic.</p>
          <p>Your voice is your default.</p>
          <p>
            Typeless lets you{' '}
            <mark className="manifesto-mark manifesto-mark--blue">liberate</mark>{' '}
            it.
          </p>
        </section>

        {/* Closing quote */}
        <blockquote className="manifesto-pull-quote manifesto-pull-quote--closing">
          <p>
            Welcome to the{' '}
            <mark className="manifesto-mark manifesto-mark--blue">end of typing.</mark>
          </p>
          <p>Welcome to Typeless.</p>
        </blockquote>
      </div>
    </div>
  )
}

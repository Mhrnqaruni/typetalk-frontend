import './About.css'

const CDN = 'https://typeless-static.com/webpage/assets'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Title */}
        <section className="about-hero">
          <h1 className="about-hero__title">The voice OS company</h1>
        </section>

        {/* Real mountain banner image */}
        <div className="about-image-wrap">
          <div className="about-image">
            <img
              src={`${CDN}/about/aboutBanner.webp`}
              alt="Mountain landscape"
              className="about-image__photo"
              loading="eager"
            />
          </div>
        </div>

        {/* Content + sidebar */}
        <div className="about-body">
          <div className="about-text">
            <p>
              We're Stanford University alumni and serial entrepreneurs on a mission to
              make AI useful, accessible, and magical in everyday work. As product-obsessed
              builders, we're rethinking how humans interact with technology – starting with
              one of its most fundamental layers: the keyboard.
            </p>
            <p>
              Typeless is the smartest AI voice dictation app ever built. Just press, speak,
              and watch your thoughts turn into beautifully polished text – instantly.
              Whether you're messaging, writing, or working with AI, Typeless makes it feel
              effortless – like talking to a close friend.
            </p>
            <p>Less typing. Less friction. More clarity, creativity, and headspace. More human.</p>
            <p>We're building a voice-first future for how people live and work.</p>
          </div>

          <div className="about-sidebar">
            {/* Company card */}
            <div className="about-card">
              <h2 className="about-card__title">Company</h2>
              <p className="about-card__name">Simply CA LLC</p>
              <p className="about-card__detail">California, United States</p>
              <p className="about-card__line">
                Founded by <strong>Stanford University alumni</strong>.
              </p>
              <p className="about-card__line">
                Backed by{' '}
                <strong className="startx-badge">Start<em>X</em></strong>{' '}
                (the premier startup accelerator for Stanford students, professors, and alumni).
              </p>
              <p className="about-card__line">
                For inquiries:{' '}
                <a href="mailto:hello@typeless.com" className="about-card__email">
                  hello@typeless.com
                </a>
              </p>
            </div>

            {/* Founder card */}
            <div className="about-card">
              <h2 className="about-card__title">Founder &amp; CEO</h2>
              <div className="about-founder">
                <div className="about-founder__info">
                  <p className="about-founder__name">Huang Song</p>
                  <div className="about-founder__socials">
                    <a href="#" className="about-founder__social" aria-label="X (Twitter)">
                      <XIcon />
                    </a>
                    <a href="#" className="about-founder__social" aria-label="LinkedIn">
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
                <img
                  src={`${CDN}/about/HuangSong.webp`}
                  alt="Huang Song"
                  className="about-founder__avatar-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './Pricing.css'

function CheckIcon({ gray }) {
  return (
    <span className={`status${gray ? ' status--gray' : ''}`} aria-hidden="true" />
  )
}

function DashIcon() {
  return <span className="status status--dash" aria-hidden="true" />
}

const FAQ_ITEMS = [
  {
    q: 'How do I upgrade?',
    a: 'Open billing settings and switch from the free plan to Pro. Your workspace stays intact.',
  },
  {
    q: 'Is there a free trial or free plan available?',
    a: 'Yes. The free plan includes the weekly word allowance and the core assistant features shown above.',
  },
  {
    q: 'How do I cancel my paid plan?',
    a: 'You can cancel from billing settings at any time. Access continues until the current billing period ends.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'Major credit and debit cards are typically supported for self-serve subscriptions.',
  },
  {
    q: 'Does Typeless offer team plans?',
    a: 'Yes. Team support is reflected by the Pro-only management features and can be expanded further.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <button
        className="faq-item__button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="faq-item__question">{q}</span>
        <span className="faq-item__chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="faq-item__answer">{a}</div>
      )}
    </div>
  )
}

export default function Pricing() {
  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <h1 className="pricing-hero__title">Go Pro and save 1 day per week</h1>
        </div>
      </section>

      {/* Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="pricing__grid">
            {/* Pro */}
            <article className="plan plan--pro">
              <div className="plan__head">
                <h2 className="plan__title">Pro</h2>
                <span className="plan__badge">Most popular</span>
              </div>
              <p className="plan__eyebrow">For power users</p>
              <div className="price">
                <span className="price__amount">$12</span>
                <span className="price__currency">USD</span>
              </div>
              <p className="plan__meta">/ member / month, billed yearly</p>
              <p className="plan__submeta"><strong>$30</strong> when billed monthly</p>
              <button className="plan__cta plan__cta--primary" type="button">Get started</button>
              <p className="plan__label">Everything in Free, plus:</p>
              <ul className="list">
                <li><CheckIcon /><span>Unlimited words</span></li>
                <li><CheckIcon /><span>Team member management</span></li>
                <li><CheckIcon /><span>Prioritized feature requests</span></li>
                <li><CheckIcon /><span>Early access to new features</span></li>
              </ul>
            </article>

            {/* Free */}
            <article className="plan">
              <div className="plan__head">
                <h2 className="plan__title">Free</h2>
              </div>
              <p className="plan__eyebrow">For beginners</p>
              <div className="price">
                <span className="price__amount">$0</span>
                <span className="price__currency">USD</span>
              </div>
              <p className="plan__meta">/ member / month</p>
              <button className="plan__cta plan__cta--outline" type="button">
                Create account
              </button>
              <ul className="list">
                <li><CheckIcon gray /><span>8,000 words per week</span></li>
                <li><CheckIcon gray /><span>Voice-to-perfect-text</span></li>
                <li><CheckIcon gray /><span>Translate</span></li>
                <li><CheckIcon gray /><span>Ask anything</span></li>
                <li><CheckIcon gray /><span>Personalized writing style and tone</span></li>
                <li><CheckIcon gray /><span>Personal dictionary</span></li>
                <li><CheckIcon gray /><span>Support for 100+ languages</span></li>
                <li><CheckIcon gray /><span>Different tones for each app</span></li>
                <li><CheckIcon gray /><span>Whisper mode</span></li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="comparison">
        <div className="container">
          <h2 className="title">Plans &amp; features</h2>
          <div className="comparison__scroller">
            <table className="table" aria-label="Plans and features comparison">
              <colgroup><col /><col /><col /></colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th className="pro-head">Pro</th>
                  <th>Free</th>
                </tr>
              </thead>
              <tbody>
                <tr className="section"><th scope="rowgroup">Effortless voice typing</th><td className="pro"></td><td></td></tr>
                <tr><th scope="row">Word limit</th><td className="pro">Unlimited</td><td className="muted">8,000 per week</td></tr>
                <tr><th scope="row">Voice-to-perfect-text</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Translate</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Ask anything</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Personalized writing style and tone</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Personal dictionary</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Support for 100+ languages</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Different tones for each app</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Whisper mode</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Team member management</th><td className="pro"><CheckIcon /></td><td><DashIcon /></td></tr>
                <tr><th scope="row">Prioritized feature requests</th><td className="pro"><CheckIcon /></td><td><DashIcon /></td></tr>
                <tr><th scope="row">Early access to new features</th><td className="pro"><CheckIcon /></td><td><DashIcon /></td></tr>

                <tr className="section"><th scope="rowgroup">Device &amp; platform</th><td className="pro"></td><td></td></tr>
                <tr><th scope="row">Desktop (macOS)</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Desktop (Windows)</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Mobile (iOS)</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Mobile (Android)</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>

                <tr className="section"><th scope="rowgroup">Security features</th><td className="pro"></td><td></td></tr>
                <tr><th scope="row">Zero cloud data retention</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Never trained on your data</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">On-device history storage</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">Dictation history control</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">HIPAA compliant</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
                <tr><th scope="row">GDPR compliant</th><td className="pro"><CheckIcon /></td><td><CheckIcon gray /></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="faq__panel">
            <div className="faq__inner">
              <h2 className="faq__title" id="faq-title">FAQ</h2>
              {FAQ_ITEMS.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

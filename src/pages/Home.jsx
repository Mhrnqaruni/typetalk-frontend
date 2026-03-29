import { Link } from 'react-router-dom'
import { Monitor, Smartphone } from 'lucide-react'
import AppMarquee from '../components/AppMarquee'
import './Home.css'

const CDN = 'https://typeless-static.com/webpage/assets'

/* ── Waveform animation icon ── */
function WaveformIcon({ size = 'md' }) {
  const heights = [8, 12, 16, 10, 14, 16, 12, 8]
  return (
    <span className={`waveform waveform--${size}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className="waveform__bar"
          style={{ height: h, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </span>
  )
}

/* ── Platform buttons ── */
function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  )
}

function AndroidIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.523 15.341a1.144 1.144 0 01-1.143-1.143 1.144 1.144 0 011.143-1.143 1.144 1.144 0 011.143 1.143 1.144 1.144 0 01-1.143 1.143m-11.046 0a1.144 1.144 0 01-1.143-1.143 1.144 1.144 0 011.143-1.143 1.144 1.144 0 011.143 1.143 1.144 1.144 0 01-1.143 1.143m11.405-6.02l2.29-3.963a.476.476 0 00-.174-.651.476.476 0 00-.651.174l-2.321 4.021A10.9 10.9 0 0012 8.333c-1.5 0-2.932.302-4.226.832L5.453 5.144a.476.476 0 00-.651-.174.476.476 0 00-.174.651l2.29 3.963A11.12 11.12 0 001 19.5h22a11.12 11.12 0 00-5.118-10.179"/>
    </svg>
  )
}

export default function Home() {
  return (
    <div className="home">

      {/* ─────────────── HERO ─────────────── */}
      <section className="home-hero reveal">
        <div className="container">
          <h1 className="home-hero__title">
            <span className="home-hero__black">Speak,</span>{' '}
            <span className="home-hero__gray">don't type</span>
          </h1>
          <p className="home-hero__sub">
            Speak naturally, and Typeless will{' '}
            <strong>turn your words into polished messages, emails, and documents</strong>{' '}
            that read like you carefully typed them – in real time.{' '}
            <strong>4x faster than</strong> typing.
          </p>
          <Link to="/downloads" className="home-hero__cta">
            Download for free
          </Link>
        </div>
      </section>

      {/* ─────────────── SPEED COMPARISON ─────────────── */}
      <section className="speed-section">
        <div className="container">
          <div className="speed-grid reveal">
            {/* QWERTY card */}
            <div className="speed-card speed-card--qwerty">
              <div className="speed-card__label">QWERTY keyboard</div>
              <div className="speed-card__wpm">
                <span className="speed-card__num">45</span>
                <span className="speed-card__unit">wpm</span>
              </div>
              <div className="speed-card__mockup">
                <div className="keyboard-mock">
                  <div className="keyboard-mock__input">
                    <span className="keyboard-mock__cursor" />
                  </div>
                  <div className="keyboard-mock__keys">
                    {Array(18).fill(0).map((_, i) => <div key={i} className="keyboard-mock__key" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Typeless card — real background image */}
            <div
              className="speed-card speed-card--typeless"
              style={{
                backgroundImage: `url(${CDN}/homepage/SpeedDemoBg1.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="speed-card__overlay" />
              <div className="speed-card__content">
                <div className="speed-card__header-row">
                  <div>
                    <div className="speed-card__label speed-card__label--light">Typeless voice keyboard</div>
                    <div className="speed-card__wpm">
                      <span className="speed-card__num">220</span>
                      <span className="speed-card__unit">wpm</span>
                    </div>
                  </div>
                  <div className="speed-card__save">
                    <div className="speed-card__label speed-card__label--light">Save</div>
                    <div className="speed-card__wpm speed-card__wpm--right">
                      <span className="speed-card__num speed-card__num--save">1 day</span>
                      <span className="speed-card__unit">/week</span>
                    </div>
                  </div>
                </div>
                <div className="voice-mock">
                  <div className="voice-mock__input" />
                  <button className="voice-mock__btn" type="button" aria-label="Start dictation">
                    <WaveformIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── WORKS EVERYWHERE ─────────────── */}
      <section className="works-section">
        <div className="container">
          <h2 className="works-title reveal">
            <span className="works-title--gray">Works </span>
            <span>everywhere</span>
            <br />
            <span className="works-title--gray">you </span>
            <span>write</span>
          </h2>

          <div className="reveal">
            <AppMarquee />
          </div>

          <div className="works-bottom reveal">
            <p className="works-desc">
              Typeless works across all apps you use on Mac, Windows, iOS, and Android.
              Speak naturally, and your words instantly become perfect writing wherever you work.
            </p>
            <div className="platform-btns">
              <Link to="/downloads" className="platform-btn">
                <AppleIcon /> macOS
              </Link>
              <Link to="/downloads" className="platform-btn">
                <WindowsIcon /> Windows
              </Link>
              <Link to="/downloads" className="platform-btn">
                <AppleIcon /> iOS
              </Link>
              <Link to="/downloads" className="platform-btn">
                <AndroidIcon /> Android
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── DICTATE ─────────────── */}
      <section className="feature-section">
        <div className="container">
          <h2 className="feature-section__title reveal">Dictate</h2>

          <FeatureRow
            title="Removes filler words"
            desc='Automatically removes filler words like "um," "uh," and "you know," making your transcriptions clear and professional.'
            bg="linear-gradient(135deg, #e8f0fe 0%, #dbeafe 50%, #f0f9ff 100%)"
          >
            <DictateDemo
              inputText={<>
                <mark className="mark-red">Um,</mark> what's the plan for today,{' '}
                <mark className="mark-red">um, like,</mark> just to confirm?
              </>}
              outputText="What's the plan for today? Just to confirm."
            />
          </FeatureRow>

          <FeatureRow
            title="Removes repetition"
            desc="Automatically detects and removes unnecessary and repeated words in your speech, ensuring your language is concise and easy to understand."
            bg="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #ede9fe 100%)"
          >
            <DictateDemo
              inputText={<>
                I think we should,{' '}
                <mark className="mark-orange">maybe we should</mark>{' '}
                move it to tomorrow, because today is{' '}
                <mark className="mark-orange">kind of,</mark> kind of packed.
              </>}
              outputText="I think we should move it to tomorrow because today is kind of packed."
            />
          </FeatureRow>

          <FeatureRow
            title="Auto-edits when you change your mind"
            desc="Typeless recognizes when you correct yourself mid-sentence and keeps only your final intended message, avoiding clutter and confusion."
            bg="linear-gradient(135deg, #fef9c3 0%, #fef3c7 50%, #fff7ed 100%)"
          >
            <DictateDemo
              inputText={<>
                How about we meet tomorrow at,{' '}
                <mark className="mark-yellow">um, 7 am? Oh, actually, let's do</mark>{' '}
                3 pm.
              </>}
              outputText="How about we meet tomorrow at 3 pm."
            />
          </FeatureRow>

          <FeatureRow
            title="Auto-formats"
            desc="Automatically organizes spoken lists, steps, and key points into clean, structured text, saving you the hassle of manual formatting."
            bg="linear-gradient(135deg, #fdf4ff 0%, #ede9fe 50%, #e0f2fe 100%)"
          >
            <DictateDemo
              inputText="Hi Anna, my new phone number is 4081234567. Thanks, Jack."
              outputFormatted
            />
          </FeatureRow>

          <FeatureRow
            title="Find the perfect words"
            desc="Typeless lets you effortlessly express ideas, ensuring your message is easy to understand and your points come across clearly."
            bg="linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #f0f9ff 100%)"
          >
            <WordSuggestionsDemo />
          </FeatureRow>

          {/* 2-col feature cards */}
          <div className="feature-cards-grid">
            <div className="feature-card reveal">
              <div
                className="feature-card__img"
                style={{ backgroundImage: `url(${CDN}/homepage/Personalization-progress.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="feature-card__body">
                <h3>Personalized style and tone</h3>
                <p>Typeless adapts to your tone, phrasing, and writing habits, creating dictation that feels like you. Your personalization progress highlights how closely Typeless aligns with the way you communicate.</p>
              </div>
            </div>

            <div className="feature-card reveal" style={{ '--reveal-delay': '100ms' }}>
              <div
                className="feature-card__img"
                style={{ backgroundImage: `url(${CDN}/homepage/Personal-dictionary.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="feature-card__body">
                <h3>Personal dictionary</h3>
                <p>Typeless recognizes the names, terms, and expressions that matter to you. Whether added automatically or manually, your vocabulary stays accurate across every app and context.</p>
              </div>
            </div>

            <div className="feature-card reveal" style={{ '--reveal-delay': '0ms' }}>
              <div
                className="feature-card__img"
                style={{ backgroundImage: `url(${CDN}/homepage/100%2B-languages-supported.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="feature-card__body">
                <h3>100+ languages supported</h3>
                <p>Speak in any language or mix them seamlessly, and Typeless automatically detects your language and transcribes your speech. It is simple and effortless.</p>
              </div>
            </div>

            <div className="feature-card reveal" style={{ '--reveal-delay': '100ms' }}>
              <div
                className="feature-card__img"
                style={{ backgroundImage: `url(${CDN}/homepage/Different-tones-for-each-app.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="feature-card__body">
                <h3>Different tones for each app</h3>
                <p>Typeless adapts tone and style based on the app you are using, from work emails to casual chats, so everything fits the context.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── TRANSLATE ─────────────── */}
      <section className="feature-section">
        <div className="container">
          <h2 className="feature-section__title reveal">Translate</h2>

          <FeatureRow
            title="Translates as you speak"
            desc="Typeless instantly translates your speech into your chosen language with phrasing that reads like a local would write it."
            bg="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)"
          >
            <DictateDemo
              inputText="Here's the product info, the price is 9 dollars, the size is 30, and we offer free returns."
              outputFormatted
              outputTranslated
            />
          </FeatureRow>
        </div>
      </section>

      {/* ─────────────── ASK ANYTHING ─────────────── */}
      <section className="feature-section">
        <div className="container">
          <h2 className="feature-section__title reveal">Ask anything</h2>

          <FeatureRow
            title="Speak to edit selected text"
            desc="Select any text and speak your command. Instantly make it shorter, longer, change its tone, or even generate a creative response. It is your personal editor, ready anywhere you write."
            bg="linear-gradient(135deg, #f0f9ff 0%, #ede9fe 100%)"
            reverse
            tall
          >
            <TwitterEditDemo />
          </FeatureRow>

          <FeatureRow
            title="Speak to ask about selected text"
            desc="Now you can interact with read-only text. Select a paragraph on any website or document and ask for a summary, an explanation, or a translation, all without breaking your flow."
            bg="linear-gradient(135deg, #dbeafe 0%, #e0f2fe 50%, #f0fdf4 100%)"
            tall
          >
            <TranslatePopupDemo />
          </FeatureRow>

          <FeatureRow
            title="Quick answers &amp; actions"
            desc="Just ask for what you need. Typeless can check the latest info, help you brainstorm, search across sites and services, and open the right page with the details already in place, so you can stay in flow."
            bg="linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)"
          >
            <QuickAnswersDemo />
          </FeatureRow>
        </div>
      </section>

    </div>
  )
}

/* ─── Sub-components ─── */

function FeatureRow({ title, desc, bg, children, reverse = false, tall = false }) {
  return (
    <div className={`feature-row${reverse ? ' feature-row--reverse' : ''} reveal`}>
      <div className="feature-row__text">
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <p dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
      <div className="feature-row__visual">
        <div
          className={`feature-card-img${tall ? ' feature-card-img--tall' : ''}`}
          style={{ background: bg }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function DictateDemo({ inputText, outputText, outputFormatted, outputTranslated }) {
  return (
    <div className="dictate-demo">
      <div className="dictate-demo__bubble dictate-demo__bubble--in">
        <WaveformIcon size="sm" />
        <span>{inputText || (outputFormatted && !outputTranslated
          ? 'Hi Anna, my new phone number is 4081234567. Thanks, Jack.'
          : "Here's the product info, the price is 9 dollars, the size is 30, and we offer free returns."
        )}</span>
      </div>
      {outputFormatted && !outputTranslated && (
        <div className="dictate-demo__bubble dictate-demo__bubble--out dictate-demo__bubble--formatted">
          <p>Hi Anna,</p>
          <p>My new phone number is (408) 123-4567.</p>
          <p>Thanks,<br />Jack</p>
        </div>
      )}
      {outputTranslated && (
        <div className="dictate-demo__bubble dictate-demo__bubble--out dictate-demo__bubble--formatted">
          <p>Aquí tienes la información del producto:</p>
          <p>1. El precio es de $9<br />2. El tamaño es 30<br />3. Ofrecemos devoluciones gratuitas</p>
        </div>
      )}
      {outputText && (
        <div className="dictate-demo__bubble dictate-demo__bubble--out">{outputText}</div>
      )}
    </div>
  )
}

function WordSuggestionsDemo() {
  return (
    <div className="dictate-demo">
      <div className="dictate-demo__bubble dictate-demo__bubble--in" style={{ marginBottom: 12 }}>
        <WaveformIcon size="sm" />
      </div>
      <div className="word-suggestions">
        {[{ w: 0.85, accent: true }, { w: 0.5, accent: false }, { w: 0.92, accent: true }, { w: 0.6, accent: false }, { w: 0.4, accent: false }].map(({ w, accent }, i) => (
          <div key={i} className="word-suggestion-row">
            <div className="word-suggestion-bar" style={{ width: `${w * 100}%`, background: accent ? '#6366f1' : '#c4b5fd' }} />
            {accent && <div className="word-suggestion-dot" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function TwitterEditDemo() {
  return (
    <div className="dictate-demo">
      <div className="dictate-demo__bubble dictate-demo__bubble--in">
        <WaveformIcon size="sm" />
        <span>Rewrite it into a viral Twitter post with a confident tone, emojis, and hashtags.</span>
      </div>
      <div className="ask-twitter-mock">
        <div className="ask-twitter-mock__header">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
          &nbsp;X (Twitter)
        </div>
        <div className="ask-twitter-mock__body">
          <p>Stop wasting time at your keyboard. ⌨️✖️</p>
          <p>Typeless lets you speak naturally and instantly converts your thoughts into polished, professional emails and documents.</p>
          <p>It's 4x faster than typing and reads like you spent hours crafting it. ✈️📝</p>
          <p>Stop typing. Start talking. Win your time back. ⏱️👆</p>
          <p className="ask-twitter-mock__tags">#Productivity #AI #Typeless #WorkSmarter</p>
        </div>
      </div>
    </div>
  )
}

function TranslatePopupDemo() {
  return (
    <div className="dictate-demo">
      <div className="dictate-demo__bubble dictate-demo__bubble--in">
        <WaveformIcon size="sm" />
        <span style={{ fontSize: 11, lineHeight: 1.4, color: '#555' }}>
          日本一高くそびえる富士山は日本人にとって信仰の対象として...
        </span>
      </div>
      <div className="translate-popup">
        <div className="translate-popup__header">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
          &nbsp;Typeless
          <button className="translate-popup__close" type="button">✕</button>
        </div>
        <div className="translate-popup__row">
          <span>↻ Translate to English</span>
          <button className="translate-popup__copy" type="button">⧉</button>
        </div>
        <div className="translate-popup__section">Answer</div>
        <p className="translate-popup__text">
          The towering Mount Fuji in Japan is a sacred figure for the Japanese people. Since ancient times, it has been regarded as a "object of faith", exerting a significant influence on the Japanese view of nature.
        </p>
      </div>
    </div>
  )
}

function QuickAnswersDemo() {
  return (
    <div className="quick-answers-mock">
      <div className="quick-answers-mock__title">⚡ Quick answers</div>
      <div className="quick-answers-mock__item">
        <span className="quick-answers-mock__icon" style={{ color: '#f59e0b' }}>☀</span>
        What's the weather in New York tomorrow?
      </div>
      <div className="quick-answers-mock__item">
        <span className="quick-answers-mock__icon" style={{ color: '#f97316' }}>$</span>
        What's 100 USD in euros?
      </div>
      <div className="quick-answers-mock__item">
        <span className="quick-answers-mock__icon" style={{ color: '#6b7280' }}>📱</span>
        What's the iPhone price right now?
      </div>
    </div>
  )
}

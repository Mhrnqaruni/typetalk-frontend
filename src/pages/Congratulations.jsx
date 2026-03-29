import { Link } from 'react-router-dom'
import './Congratulations.css'

function BrowserMockup() {
  return (
    <div className="browser-mock">
      <div className="browser-mock__bar">
        <div className="browser-mock__controls">
          <span /><span /><span />
        </div>
        <div className="browser-mock__url-area">
          <div className="browser-mock__addr">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div className="browser-mock__actions">
            <span>⊞</span>
            <span>⊕</span>
            <span>↺</span>
            <span>↓</span>
            <span>⋯</span>
          </div>
        </div>
      </div>
      <div className="browser-mock__downloads">
        <div className="browser-mock__download-item">
          <span className="browser-mock__download-icon">↓</span>
          <div className="browser-mock__download-info">
            <span className="browser-mock__download-name">Typeless_setup.exe</span>
            <div className="browser-mock__download-actions">
              <span>Open File</span>
            </div>
          </div>
          <span className="browser-mock__cursor">↗</span>
        </div>
        <div className="browser-mock__see-more">See More</div>
      </div>
    </div>
  )
}

function InstallerMockup() {
  return (
    <div className="installer-mock">
      <div className="installer-mock__titlebar">
        <div className="installer-mock__logo-row">
          <div className="installer-mock__logo">
            <svg viewBox="0 0 40 40" width="18" height="18" fill="none">
              <path d="M8 8.5C16.2 8.5 22.5 14.8 22.5 23V31.5C14.3 31.5 8 25.2 8 17V8.5Z" fill="#111"/>
              <path d="M23.5 9C30.6 11.7 35 18.1 35 25.5C35 28.4 34.3 31.1 32.8 33.5C30.9 24.4 25.7 17.7 18 13.5C19.4 11.2 21.2 9.7 23.5 9Z" fill="#111"/>
            </svg>
            <span>Typeless Setup</span>
          </div>
          <div className="installer-mock__window-btns">
            <span>–</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>
      </div>
      <div className="installer-mock__body">
        <div className="installer-mock__spinner-row">
          <div className="installer-mock__spinner" />
          <span className="installer-mock__status">Installing, please wait...</span>
        </div>
        <div className="installer-mock__progress">
          <div className="installer-mock__progress-bar" />
        </div>
      </div>
    </div>
  )
}

export default function Congratulations() {
  return (
    <div className="congrats-page">
      <div className="container">
        <p className="congrats-thanks">Thanks for downloading</p>
        <h1 className="congrats-title">Just a few steps left!</h1>

        <div className="congrats-steps">
          {/* Step 1 */}
          <div className="congrats-step">
            <div className="congrats-step__num">
              <span>1</span>
            </div>
            <div className="congrats-step__visual">
              <BrowserMockup />
            </div>
            <p className="congrats-step__desc">
              Open <strong>Typeless_setup.exe</strong> from the top-right Downloads tab
            </p>
          </div>

          {/* Step 2 */}
          <div className="congrats-step">
            <div className="congrats-step__num">
              <span>2</span>
            </div>
            <div className="congrats-step__visual">
              <InstallerMockup />
            </div>
            <p className="congrats-step__desc">
              Wait for the installer to complete, then <strong>Typeless</strong> onboarding begins
            </p>
          </div>
        </div>

        <p className="congrats-retry">
          Not working?{' '}
          <Link to="/downloads" className="congrats-retry__link">
            Download again
          </Link>
        </p>
      </div>
    </div>
  )
}

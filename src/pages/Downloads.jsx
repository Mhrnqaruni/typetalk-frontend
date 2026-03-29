import { Link } from 'react-router-dom'
import { Monitor, Smartphone } from 'lucide-react'
import './Downloads.css'

function DesktopIcon() {
  return <Monitor size={24} aria-hidden="true" />
}

function MobileIcon() {
  return <Smartphone size={24} aria-hidden="true" />
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.18.64.24.98.18L14.54 12 3.08.06c-.32-.06-.66 0-.96.18C1.56.6 1.2 1.2 1.2 1.98v20.04c0 .78.36 1.38.98 1.74zm14.82-7.5L5.4 23.1 15.66 12 5.4.9l12.6 6.84c.84.48.84 1.62 0 2.1l-.84.48.84.48v-.24zM3.18.24L14.54 12 3.16 23.76l-.08-.08V.32L3.18.24z"/>
    </svg>
  )
}

function QRCode() {
  return (
    <img
      src="https://typeless-static.com/webpage/assets/downloads/typeless-mobile-code.png"
      width="80"
      height="80"
      alt="Scan to download Typeless mobile"
      className="qr-code"
    />
  )
}

export default function Downloads() {
  return (
    <div className="downloads-page">
      <div className="container">
        <h1 className="downloads-title">Pick your download</h1>

        <div className="downloads-grid">
          {/* Desktop card */}
          <div className="download-card">
            <div className="download-card__icon">
              <DesktopIcon />
            </div>
            <h2 className="download-card__name">Desktop</h2>
            <p className="download-card__desc">
              Smart voice dictation that turns speech into clear, polished writing in every app.
            </p>
            <div className="download-card__btns">
              <Link to="/congratulations" className="download-btn download-btn--dark">
                <AppleIcon /> Download for macOS
              </Link>
              <Link to="/congratulations" className="download-btn download-btn--dark">
                <WindowsIcon /> Download for Windows
              </Link>
            </div>
          </div>

          {/* Mobile card */}
          <div className="download-card">
            <div className="download-card__top">
              <div>
                <div className="download-card__icon">
                  <MobileIcon />
                </div>
                <h2 className="download-card__name">Mobile</h2>
                <p className="download-card__desc">
                  AI voice keyboard for your phone. 6× faster than typing.
                </p>
              </div>
              <QRCode />
            </div>
            <div className="download-card__btns">
              <a href="#" className="download-btn download-btn--dark download-btn--store">
                <AppleIcon />
                <span>
                  <span className="download-btn__small">Download on the</span>
                  <span className="download-btn__big">App Store</span>
                </span>
              </a>
              <a href="#" className="download-btn download-btn--dark download-btn--store">
                <GooglePlayIcon />
                <span>
                  <span className="download-btn__small">GET IT ON</span>
                  <span className="download-btn__big">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

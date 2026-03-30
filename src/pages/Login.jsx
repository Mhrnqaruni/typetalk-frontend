import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import GoogleSignInButton from '../components/GoogleSignInButton'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../lib/api'
import { sanitizeNextPath } from '../lib/auth'
import './Login.css'

const authErrorMessages = {
  invalid_otp: 'That code does not look right. Check the latest email and try again.',
  expired_otp: 'That code expired. Request a new one and try again.',
  otp_locked: 'Too many incorrect attempts. Request a fresh code to continue.',
  rate_limited: 'Too many attempts from this browser session. Please wait and try again.',
  google_link_required: 'This email already has an account. Sign in with email first, then link Google later from Account.',
  google_email_unverified: 'Your Google account must have a verified email address.',
}

function resolveErrorMessage(error) {
  if (error instanceof ApiError && error.code && authErrorMessages[error.code]) {
    return authErrorMessages[error.code]
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [codeRequested, setCodeRequested] = useState(false)
  const [busyAction, setBusyAction] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const nextPath = sanitizeNextPath(searchParams.get('next'))

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(nextPath, { replace: true })
    }
  }, [auth.isAuthenticated, navigate, nextPath])

  async function runAction(action, task, successMessage = '') {
    setBusyAction(action)
    setErrorMessage('')

    try {
      await task()
      setStatusMessage(successMessage)
    } catch (error) {
      setStatusMessage('')
      setErrorMessage(resolveErrorMessage(error))
    } finally {
      setBusyAction(null)
    }
  }

  async function handleRequestCode(event) {
    event.preventDefault()

    await runAction('request', async () => {
      await auth.requestEmailCode({ email })
      setCodeRequested(true)
    }, `Code sent to ${email}.`)
  }

  async function handleResendCode() {
    await runAction('resend', async () => {
      await auth.resendEmailCode({ email })
      setCodeRequested(true)
    }, `A fresh code was sent to ${email}.`)
  }

  async function handleVerifyCode(event) {
    event.preventDefault()

    await runAction('verify', async () => {
      await auth.verifyEmailCode({ email, code })
      navigate(nextPath, { replace: true })
    })
  }

  async function handleGoogleCredential(credential) {
    await runAction('google', async () => {
      await auth.signInWithGoogle(credential)
      navigate(nextPath, { replace: true })
    })
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card reveal is-visible">
          <div className="login-card__copy">
            <p className="login-card__eyebrow">Browser auth</p>
            <h1>Sign in to the TypeTalk app shell</h1>
            <p className="login-card__intro">
              Use a one-time email code or the dedicated web Google flow. Your refresh token stays
              inside a secure backend cookie, and the access token stays in memory only.
            </p>
            <p className="login-card__next">
              After sign-in, you&apos;ll land at <code>{nextPath}</code>.
            </p>
          </div>

          <div className="login-card__forms">
            <form className="login-form" onSubmit={codeRequested ? handleVerifyCode : handleRequestCode}>
              <label className="login-form__field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </label>

              {codeRequested && (
                <label className="login-form__field">
                  <span>6-digit code</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    autoComplete="one-time-code"
                    required
                  />
                </label>
              )}

              <div className="login-form__actions">
                {!codeRequested && (
                  <button type="submit" className="login-form__submit" disabled={!email || busyAction !== null}>
                    {busyAction === 'request' ? 'Sending code…' : 'Email me a code'}
                  </button>
                )}

                {codeRequested && (
                  <>
                    <button type="submit" className="login-form__submit" disabled={code.length !== 6 || busyAction !== null}>
                      {busyAction === 'verify' ? 'Signing you in…' : 'Verify and continue'}
                    </button>
                    <button type="button" className="login-form__ghost" onClick={handleResendCode} disabled={!email || busyAction !== null}>
                      {busyAction === 'resend' ? 'Sending…' : 'Resend code'}
                    </button>
                  </>
                )}
              </div>
            </form>

            {statusMessage && <p className="login-form__status">{statusMessage}</p>}
            {errorMessage && <p className="login-form__error">{errorMessage}</p>}

            <div className="login-divider">
              <span />
              <p>or continue with Google</p>
              <span />
            </div>

            <GoogleSignInButton
              disabled={busyAction !== null}
              onCredential={handleGoogleCredential}
              onError={(error) => {
                setErrorMessage(resolveErrorMessage(error))
              }}
            />

            <p className="login-card__footer">
              Need the public site instead? <Link to="/">Return to typetalk.app</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

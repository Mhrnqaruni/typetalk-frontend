import { useEffect, useRef, useState } from 'react'
import { getGoogleClientId, isGoogleIdentityConfigured, loadGoogleIdentityServices } from '../lib/google'

export default function GoogleSignInButton({ disabled = false, onCredential, onError }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState(() => (
    isGoogleIdentityConfigured() ? 'loading' : 'unavailable'
  ))

  useEffect(() => {
    if (!isGoogleIdentityConfigured() || !containerRef.current) {
      return undefined
    }

    let isActive = true

    async function setupGoogleButton() {
      try {
        const google = await loadGoogleIdentityServices()

        if (!isActive || !containerRef.current) {
          return
        }

        google.accounts.id.initialize({
          client_id: getGoogleClientId(),
          callback: async ({ credential }) => {
            if (!credential) {
              onError?.(new Error('Google did not return a credential.'))
              return
            }

            try {
              await onCredential?.(credential)
            } catch (error) {
              onError?.(error)
            }
          },
        })

        containerRef.current.innerHTML = ''
        google.accounts.id.renderButton(containerRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          width: 320,
        })

        setStatus('ready')
      } catch (error) {
        if (!isActive) {
          return
        }

        setStatus('error')
        onError?.(error)
      }
    }

    void setupGoogleButton()

    return () => {
      isActive = false
    }
  }, [onCredential, onError])

  if (!isGoogleIdentityConfigured()) {
    return (
      <div className="login-google login-google--unavailable">
        Google sign-in will appear once the web client id is configured.
      </div>
    )
  }

  return (
    <div
      className={`login-google${disabled ? ' login-google--disabled' : ''}`}
      aria-busy={status === 'loading'}
    >
      <div ref={containerRef} className="login-google__button" />
      {status === 'loading' && <p className="login-google__meta">Loading Google sign-in…</p>}
      {status === 'ready' && <p className="login-google__meta">Uses the dedicated web Google audience.</p>}
      {status === 'error' && <p className="login-google__meta">Google sign-in is currently unavailable.</p>}
    </div>
  )
}

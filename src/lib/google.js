function resolveGoogleClientId() {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '').trim()
}

let googleIdentityPromise = null

function looksLikeGoogleWebClientId(value) {
  return typeof value === 'string' && /\.apps\.googleusercontent\.com$/i.test(value.trim())
}

export function getGoogleClientId() {
  return resolveGoogleClientId()
}

export function isGoogleIdentityConfigured() {
  return looksLikeGoogleWebClientId(resolveGoogleClientId())
}

export async function loadGoogleIdentityServices() {
  if (window.google?.accounts?.id) {
    return window.google
  }

  if (!isGoogleIdentityConfigured()) {
    throw new Error('Google web sign-in is not configured for this environment.')
  }

  if (googleIdentityPromise) {
    return googleIdentityPromise
  }

  googleIdentityPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-identity-services')

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.google?.accounts?.id) {
          resolve(window.google)
          return
        }

        reject(new Error('Google Identity Services did not initialize.'))
      }, { once: true })
      existingScript.addEventListener('error', () => {
        reject(new Error('Failed to load Google sign-in.'))
      }, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = 'google-identity-services'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google?.accounts?.id) {
        resolve(window.google)
        return
      }

      reject(new Error('Google Identity Services did not initialize.'))
    }
    script.onerror = () => {
      reject(new Error('Failed to load Google sign-in.'))
    }

    document.head.appendChild(script)
  })

  return googleIdentityPromise
}

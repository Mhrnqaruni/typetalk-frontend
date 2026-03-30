import { afterEach, describe, expect, it, vi } from 'vitest'
import { getGoogleClientId, isGoogleIdentityConfigured } from './google'

describe('google web auth configuration', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('treats placeholder client ids as unconfigured', () => {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'replace_me')

    expect(getGoogleClientId()).toBe('replace_me')
    expect(isGoogleIdentityConfigured()).toBe(false)
  })

  it('accepts real web google client ids', () => {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', '1234567890-example.apps.googleusercontent.com')

    expect(isGoogleIdentityConfigured()).toBe(true)
  })
})

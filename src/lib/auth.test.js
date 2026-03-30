import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  logout,
  refreshSession,
  requestEmailCode,
  resendEmailCode,
  signInWithGoogle,
  verifyEmailCode,
} from './auth'

function createJsonResponse(body) {
  return {
    ok: true,
    status: 200,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  }
}

describe('web auth client helpers', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.typetalk.app')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createJsonResponse({ status: 'ok' })))
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('keeps otp request and resend non-credentialed', async () => {
    await requestEmailCode({ email: 'person@example.com' })
    await resendEmailCode({ email: 'person@example.com' })

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.typetalk.app/v1/web-auth/email/request-code',
      expect.objectContaining({
        method: 'POST',
        credentials: 'omit',
      }),
    )
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.typetalk.app/v1/web-auth/email/resend-code',
      expect.objectContaining({
        method: 'POST',
        credentials: 'omit',
      }),
    )
  })

  it('uses credentials include on every cookie-bearing web auth request', async () => {
    await verifyEmailCode({ email: 'person@example.com', code: '123456' })
    await signInWithGoogle('google-token')
    await refreshSession()
    await logout()

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.typetalk.app/v1/web-auth/email/verify-code',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    )
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://api.typetalk.app/v1/web-auth/google',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    )
    expect(fetch).toHaveBeenNthCalledWith(
      3,
      'https://api.typetalk.app/v1/web-auth/refresh',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    )
    expect(fetch).toHaveBeenNthCalledWith(
      4,
      'https://api.typetalk.app/v1/web-auth/logout',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    )
  })
})

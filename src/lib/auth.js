import { apiRequest } from './api'

export function sanitizeNextPath(nextPath) {
  if (typeof nextPath !== 'string' || !nextPath.startsWith('/app')) {
    return '/app'
  }

  return nextPath
}

export async function requestEmailCode({ email }) {
  return apiRequest('/v1/web-auth/email/request-code', {
    method: 'POST',
    body: { email },
  })
}

export async function resendEmailCode({ email }) {
  return apiRequest('/v1/web-auth/email/resend-code', {
    method: 'POST',
    body: { email },
  })
}

export async function verifyEmailCode({ email, code }) {
  return apiRequest('/v1/web-auth/email/verify-code', {
    method: 'POST',
    body: { email, code },
    credentials: 'include',
  })
}

export async function signInWithGoogle(idToken) {
  return apiRequest('/v1/web-auth/google', {
    method: 'POST',
    body: { id_token: idToken },
    credentials: 'include',
  })
}

export async function refreshSession() {
  return apiRequest('/v1/web-auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })
}

export async function logout() {
  return apiRequest('/v1/web-auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
}

export const defaultAuthClient = {
  requestEmailCode,
  resendEmailCode,
  verifyEmailCode,
  signInWithGoogle,
  refreshSession,
  logout,
}

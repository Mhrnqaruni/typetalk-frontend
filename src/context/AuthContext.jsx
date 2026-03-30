import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { apiRequest, ApiError } from '../lib/api'
import { defaultAuthClient } from '../lib/auth'

export const AuthContext = createContext(null)

function createAnonymousState(status = 'anonymous') {
  return {
    status,
    accessToken: null,
    organizationId: null,
    session: null,
    user: null,
  }
}

function createAuthenticatedState(payload) {
  return {
    status: 'authenticated',
    accessToken: payload.access_token,
    organizationId: payload.organization_id,
    session: payload.session,
    user: payload.user,
  }
}

export function AuthProvider({ children, client = defaultAuthClient }) {
  const [state, setState] = useState(() => createAnonymousState('booting'))
  const bootstrapStarted = useRef(false)

  useEffect(() => {
    if (bootstrapStarted.current) {
      return undefined
    }

    bootstrapStarted.current = true
    let isActive = true

    async function bootstrap() {
      try {
        const payload = await client.refreshSession()

        if (isActive) {
          setState(createAuthenticatedState(payload))
        }
      } catch {
        if (isActive) {
          setState(createAnonymousState())
        }
      }
    }

    void bootstrap()

    return () => {
      isActive = false
    }
  }, [client])

  async function requestEmailCode(input) {
    return client.requestEmailCode(input)
  }

  async function resendEmailCode(input) {
    return client.resendEmailCode(input)
  }

  async function verifyEmailCode(input) {
    const payload = await client.verifyEmailCode(input)
    setState(createAuthenticatedState(payload))
    return payload
  }

  async function signInWithGoogle(idToken) {
    const payload = await client.signInWithGoogle(idToken)
    setState(createAuthenticatedState(payload))
    return payload
  }

  async function refreshSession() {
    try {
      const payload = await client.refreshSession()
      setState(createAuthenticatedState(payload))
      return payload
    } catch (error) {
      setState(createAnonymousState())
      throw error
    }
  }

  async function logout() {
    try {
      await client.logout()
    } finally {
      setState(createAnonymousState())
    }
  }

  async function authorizedRequest(path, options = {}) {
    if (!state.accessToken) {
      throw new Error('Not authenticated.')
    }

    try {
      return await apiRequest(path, {
        ...options,
        accessToken: state.accessToken,
      })
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setState(createAnonymousState())
      }

      throw error
    }
  }

  const value = {
    ...state,
    isAuthenticated: state.status === 'authenticated',
    isBootstrapping: state.status === 'booting',
    requestEmailCode,
    resendEmailCode,
    verifyEmailCode,
    signInWithGoogle,
    refreshSession,
    logout,
    authorizedRequest,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.')
  }

  return context
}

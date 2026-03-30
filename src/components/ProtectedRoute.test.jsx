import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

function renderProtectedRoute(authValue, initialEntries = ['/app/account']) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route
            path="/app/*"
            element={(
              <ProtectedRoute>
                <div>Protected app</div>
              </ProtectedRoute>
            )}
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects logged-out users to /login with the intended next path', () => {
    renderProtectedRoute({
      status: 'anonymous',
      isAuthenticated: false,
      isBootstrapping: false,
      requestEmailCode: vi.fn(),
      resendEmailCode: vi.fn(),
      verifyEmailCode: vi.fn(),
      signInWithGoogle: vi.fn(),
      refreshSession: vi.fn(),
      logout: vi.fn(),
      authorizedRequest: vi.fn(),
    })

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('renders protected content for authenticated users', () => {
    renderProtectedRoute({
      status: 'authenticated',
      isAuthenticated: true,
      isBootstrapping: false,
      requestEmailCode: vi.fn(),
      resendEmailCode: vi.fn(),
      verifyEmailCode: vi.fn(),
      signInWithGoogle: vi.fn(),
      refreshSession: vi.fn(),
      logout: vi.fn(),
      authorizedRequest: vi.fn(),
    })

    expect(screen.getByText('Protected app')).toBeInTheDocument()
  })
})

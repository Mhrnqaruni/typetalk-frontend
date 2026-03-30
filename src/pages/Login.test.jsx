import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../context/AuthContext'
import { ApiError } from '../lib/api'
import Login from './Login'

vi.mock('../components/GoogleSignInButton', () => ({
  default: ({ onCredential }) => (
    <button type="button" onClick={() => onCredential('mock-google-token')}>
      Google mock
    </button>
  ),
}))

function renderLogin(authValue, initialEntry = '/login?next=%2Fapp%2Fusage') {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/app/usage" element={<div>Usage route</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

function buildAuthValue(overrides = {}) {
  return {
    status: 'anonymous',
    isAuthenticated: false,
    isBootstrapping: false,
    requestEmailCode: vi.fn().mockResolvedValue({ status: 'accepted' }),
    resendEmailCode: vi.fn().mockResolvedValue({ status: 'accepted' }),
    verifyEmailCode: vi.fn().mockResolvedValue({}),
    signInWithGoogle: vi.fn().mockResolvedValue({}),
    refreshSession: vi.fn(),
    logout: vi.fn(),
    authorizedRequest: vi.fn(),
    ...overrides,
  }
}

describe('Login page', () => {
  it('requests a code and reveals the verification state', async () => {
    const authValue = buildAuthValue()
    const user = userEvent.setup()

    renderLogin(authValue)

    await user.type(screen.getByLabelText('Email'), 'person@example.com')
    await user.click(screen.getByRole('button', { name: 'Email me a code' }))

    expect(authValue.requestEmailCode).toHaveBeenCalledWith({ email: 'person@example.com' })
    expect(await screen.findByLabelText('6-digit code')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Resend code' })).toBeInTheDocument()
  })

  it('shows backend otp errors and keeps the user on the form', async () => {
    const authValue = buildAuthValue({
      verifyEmailCode: vi.fn().mockRejectedValue(new ApiError('OTP code is invalid.', {
        status: 401,
        code: 'invalid_otp',
      })),
    })
    const user = userEvent.setup()

    renderLogin(authValue)

    await user.type(screen.getByLabelText('Email'), 'person@example.com')
    await user.click(screen.getByRole('button', { name: 'Email me a code' }))
    await user.type(await screen.findByLabelText('6-digit code'), '123456')
    await user.click(screen.getByRole('button', { name: 'Verify and continue' }))

    await waitFor(() => {
      expect(screen.getByText(/does not look right/i)).toBeInTheDocument()
    })
    expect(screen.queryByText('Usage route')).not.toBeInTheDocument()
  })

  it('redirects to the intended protected route after a successful verify', async () => {
    const authValue = buildAuthValue()
    const user = userEvent.setup()

    renderLogin(authValue)

    await user.type(screen.getByLabelText('Email'), 'person@example.com')
    await user.click(screen.getByRole('button', { name: 'Email me a code' }))
    await user.type(await screen.findByLabelText('6-digit code'), '123456')
    await user.click(screen.getByRole('button', { name: 'Verify and continue' }))

    await waitFor(() => {
      expect(screen.getByText('Usage route')).toBeInTheDocument()
    })
  })
})

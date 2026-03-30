import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'

function AuthProbe() {
  const auth = useAuth()

  return (
    <div>
      <span data-testid="status">{auth.status}</span>
      <span data-testid="email">{auth.user?.primary_email ?? 'none'}</span>
    </div>
  )
}

const authPayload = {
  access_token: 'access-token',
  organization_id: 'org-1',
  session: {
    id: 'session-1',
    expires_at: '2026-04-01T00:00:00.000Z',
  },
  user: {
    id: 'user-1',
    primary_email: 'person@example.com',
    display_name: 'Test Person',
  },
}

describe('AuthProvider', () => {
  it('hydrates authenticated state when the refresh bootstrap succeeds', async () => {
    const client = {
      refreshSession: vi.fn().mockResolvedValue(authPayload),
    }

    render(
      <AuthProvider client={client}>
        <AuthProbe />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('authenticated')
    })
    expect(screen.getByTestId('email')).toHaveTextContent('person@example.com')
  })

  it('falls back to anonymous state when the refresh bootstrap fails', async () => {
    const client = {
      refreshSession: vi.fn().mockRejectedValue(new Error('missing session')),
    }

    render(
      <AuthProvider client={client}>
        <AuthProbe />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('anonymous')
    })
    expect(screen.getByTestId('email')).toHaveTextContent('none')
  })
})

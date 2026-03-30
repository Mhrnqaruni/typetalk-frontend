import { expect, test } from '@playwright/test'

const authPayload = {
  access_token: 'browser-access-token',
  organization_id: 'org-browser-1',
  session: {
    id: 'session-browser-1',
    expires_at: '2026-04-01T00:00:00.000Z',
  },
  user: {
    id: 'user-browser-1',
    primary_email: 'browser@example.com',
    display_name: 'Browser User',
  },
}

test.beforeEach(async ({ page }) => {
  let isAuthenticated = false

  await page.addInitScript(() => {
    window.google = {
      accounts: {
        id: {
          initialize: () => {},
          renderButton: (container) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.textContent = 'Continue with Google'
            container.appendChild(button)
          },
        },
      },
    }
  })

  await page.route('**/v1/web-auth/email/request-code', async (route) => {
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'accepted' }),
    })
  })

  await page.route('**/v1/web-auth/email/verify-code', async (route) => {
    const payload = route.request().postDataJSON()

    if (payload?.code !== '123456') {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            code: 'invalid_otp',
            message: 'OTP code is invalid.',
          },
        }),
      })
      return
    }

    isAuthenticated = true
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(authPayload),
    })
  })

  await page.route('**/v1/web-auth/refresh', async (route) => {
    if (!isAuthenticated) {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            code: 'missing_refresh_cookie',
            message: 'Refresh cookie is required.',
          },
        }),
      })
      return
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(authPayload),
    })
  })

  await page.route('**/v1/web-auth/logout', async (route) => {
    isAuthenticated = false
    await route.fulfill({
      status: 204,
      body: '',
    })
  })

  await page.route('**/v1/web-auth/google', async (route) => {
    isAuthenticated = true
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(authPayload),
    })
  })
})

test('redirects logged-out users away from protected routes', async ({ page }) => {
  await page.goto('/app/account')

  await expect(page).toHaveURL(/\/login\?next=%2Fapp%2Faccount/)
  await expect(page.getByRole('heading', { name: /sign in to the typetalk app shell/i })).toBeVisible()
})

test('completes otp login, survives reload bootstrap, and logs out cleanly', async ({ page }) => {
  await page.goto('/login?next=%2Fapp%2Fusage')

  await page.getByLabel('Email').fill('browser@example.com')
  await page.getByRole('button', { name: 'Email me a code' }).click()
  await expect(page.getByLabel('6-digit code')).toBeVisible()

  await page.getByLabel('6-digit code').fill('123456')
  await page.getByRole('button', { name: 'Verify and continue' }).click()

  await expect(page).toHaveURL(/\/app\/usage$/)
  await expect(page.getByRole('heading', { name: 'Usage' })).toBeVisible()

  await page.reload()

  await expect(page).toHaveURL(/\/app\/usage$/)
  await expect(page.getByRole('heading', { name: 'Usage' })).toBeVisible()

  await page.getByRole('button', { name: 'Log out' }).click()

  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: /sign in to the typetalk app shell/i })).toBeVisible()
})

test('google sign-in smoke', async () => {
  test.skip(!process.env.PLAYWRIGHT_ENABLE_GOOGLE_SMOKE, 'Real Google smoke is optional until the web client is available.')
})

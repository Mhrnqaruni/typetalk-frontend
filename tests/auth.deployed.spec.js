import { execSync } from 'node:child_process'

import { expect, test } from '@playwright/test'

const deployedBaseUrl = process.env.PLAYWRIGHT_DEPLOYED_BASE_URL?.trim()
const deployedEmail = process.env.PLAYWRIGHT_DEPLOYED_EMAIL?.trim()
const deployedOtpCode = process.env.PLAYWRIGHT_DEPLOYED_OTP_CODE?.trim()
const deployedOtpCommand = process.env.PLAYWRIGHT_DEPLOYED_OTP_CODE_COMMAND?.trim()
const expectedReloadResult = process.env.PLAYWRIGHT_DEPLOYED_EXPECT_RELOAD_RESULT?.trim()
const expectGooglePlaceholder = process.env.PLAYWRIGHT_DEPLOYED_EXPECT_GOOGLE_PLACEHOLDER === '1'
const expectedApiHost = process.env.PLAYWRIGHT_DEPLOYED_EXPECT_API_HOST?.trim()
const expectedAllowOrigin = process.env.PLAYWRIGHT_DEPLOYED_EXPECT_ALLOW_ORIGIN?.trim()
const requireDebugOtpHeader = process.env.PLAYWRIGHT_DEPLOYED_REQUIRE_DEBUG_OTP_HEADER === '1'
const debugOtpHeaderName = 'x-typetalk-debug-otp-code'

function getLastSixDigitCode(rawValue) {
  const otpMatch = rawValue.match(/OTP for .*?:\s*(\d{6})/i)

  if (otpMatch?.[1]) {
    return otpMatch[1]
  }

  const matches = rawValue.match(/\b\d{6}\b/g)
  return matches?.at(-1) ?? null
}

function resolveScenarioEmail(scenario) {
  if (!deployedEmail) {
    return null
  }

  return deployedEmail.includes('{scenario}')
    ? deployedEmail.replaceAll('{scenario}', scenario)
    : deployedEmail
}

async function resolveOtpCode(emailAddress) {
  if (deployedOtpCode) {
    return deployedOtpCode
  }

  if (!deployedOtpCommand) {
    throw new Error('Set PLAYWRIGHT_DEPLOYED_OTP_CODE or PLAYWRIGHT_DEPLOYED_OTP_CODE_COMMAND for deployed OTP verification.')
  }

  const otpCommand = deployedOtpCommand.includes('{email}')
    ? deployedOtpCommand.replaceAll('{email}', emailAddress)
    : deployedOtpCommand

  for (let attempt = 1; attempt <= 10; attempt += 1) {
    let output = ''

    try {
      output = execSync(otpCommand, {
        encoding: 'utf8',
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim()
    } catch (error) {
      output = typeof error?.stdout === 'string' ? error.stdout.trim() : ''
    }

    const code = getLastSixDigitCode(output)

    if (code) {
      return code
    }

    await new Promise((resolve) => setTimeout(resolve, 1_000))
  }

  throw new Error('Failed to resolve a 6-digit OTP code from the deployed smoke command output.')
}

async function requestOtpCode(page, emailAddress) {
  const responsePromise = page.waitForResponse((response) => {
    return response.request().method() === 'POST'
      && response.url().includes('/v1/web-auth/email/request-code')
  })

  await page.getByLabel('Email').fill(emailAddress)
  await page.getByRole('button', { name: 'Email me a code' }).click()

  const response = await responsePromise
  expect(response.status()).toBe(202)
  await expect(page.getByLabel('6-digit code')).toBeVisible()

  const headers = await response.allHeaders()
  const requestUrl = new URL(response.url())
  const debugOtpCode = headers[debugOtpHeaderName]

  if (expectedApiHost) {
    expect(requestUrl.host).toBe(expectedApiHost)
  }

  if (expectedAllowOrigin) {
    expect(headers['access-control-allow-origin']).toBe(expectedAllowOrigin)
    expect(headers['access-control-allow-credentials']).toBe('true')
  }

  if (requireDebugOtpHeader) {
    expect(debugOtpCode).toBeTruthy()
  }

  if (debugOtpCode) {
    return debugOtpCode
  }

  return resolveOtpCode(emailAddress)
}

test.describe('deployed browser auth smoke', () => {
  test.skip(!deployedBaseUrl, 'Set PLAYWRIGHT_DEPLOYED_BASE_URL to run deployed browser auth smoke.')
  test.describe.configure({ mode: 'serial' })

  test('redirects, signs in with a real OTP, and logs out on the deployed site', async ({ page }) => {
    test.skip(!deployedEmail, 'Set PLAYWRIGHT_DEPLOYED_EMAIL to run deployed OTP smoke.')

    const scenarioEmail = resolveScenarioEmail('login')

    await page.goto('/app/usage')

    await expect(page).toHaveURL(/\/login\?next=%2Fapp%2Fusage/)
    const otpCode = await requestOtpCode(page, scenarioEmail)
    await page.getByLabel('6-digit code').fill(otpCode)
    await page.getByRole('button', { name: 'Verify and continue' }).click()

    await expect(page).toHaveURL(/\/app\/usage$/)
    await expect(page.getByRole('heading', { name: 'Usage' })).toBeVisible()

    await page.getByRole('button', { name: 'Log out' }).click()

    await expect(page).toHaveURL(/\/login$/)
  })

  test('matches the expected deployed reload behavior', async ({ page }) => {
    test.skip(!deployedEmail, 'Set PLAYWRIGHT_DEPLOYED_EMAIL to run deployed reload smoke.')
    test.skip(!expectedReloadResult, 'Set PLAYWRIGHT_DEPLOYED_EXPECT_RELOAD_RESULT to persist or login.')

    const scenarioEmail = resolveScenarioEmail('reload')

    await page.goto('/login?next=%2Fapp%2Fusage')
    const otpCode = await requestOtpCode(page, scenarioEmail)
    await page.getByLabel('6-digit code').fill(otpCode)
    await page.getByRole('button', { name: 'Verify and continue' }).click()

    await expect(page).toHaveURL(/\/app\/usage$/)
    await page.reload()

    if (expectedReloadResult === 'persist') {
      await expect(page).toHaveURL(/\/app\/usage$/)
      await expect(page.getByRole('heading', { name: 'Usage' })).toBeVisible()
      return
    }

    if (expectedReloadResult === 'login') {
      await expect(page).toHaveURL(/\/login\?next=%2Fapp%2Fusage/)
      return
    }

    throw new Error('PLAYWRIGHT_DEPLOYED_EXPECT_RELOAD_RESULT must be set to persist or login.')
  })

  test('shows the configured Google placeholder state on the deployed login page', async ({ page }) => {
    test.skip(!expectGooglePlaceholder, 'Set PLAYWRIGHT_DEPLOYED_EXPECT_GOOGLE_PLACEHOLDER=1 to verify the deployed Google placeholder state.')

    await page.goto('/login')

    await expect(page.getByText('Google sign-in will appear once the web client id is configured.')).toBeVisible()
  })
})

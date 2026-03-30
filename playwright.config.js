import { defineConfig } from '@playwright/test'

const deployedBaseUrl = process.env.PLAYWRIGHT_DEPLOYED_BASE_URL?.trim()

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: deployedBaseUrl || 'http://127.0.0.1:4173',
    browserName: 'chromium',
    channel: 'msedge',
    headless: true,
  },
  webServer: deployedBaseUrl ? undefined : {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    env: {
      VITE_API_BASE_URL: 'https://api.typetalk.app',
      VITE_GOOGLE_CLIENT_ID: 'playwright-web-client-id',
      VITE_PUBLIC_SITE_URL: 'https://typetalk.app',
      VITE_SUPPORT_EMAIL: 'support@typetalk.app',
      VITE_WINDOWS_DOWNLOAD_URL: 'https://example.com/TypeTalkSetup.exe',
      VITE_GOOGLE_PLAY_URL: 'https://play.google.com/store/apps/details?id=app.typetalk',
      VITE_BILLING_CHECKOUT_ENABLED: 'false',
      VITE_BILLING_CUSTOMER_PORTAL_ENABLED: 'false',
    },
    port: 4173,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})

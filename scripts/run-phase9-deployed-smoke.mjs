import { spawnSync } from 'node:child_process'

const defaults = {
  PLAYWRIGHT_DEPLOYED_BASE_URL: 'https://project-y32ng.vercel.app',
  PLAYWRIGHT_DEPLOYED_EMAIL: `phase9-round3-{scenario}-${Date.now()}@example.com`,
  PLAYWRIGHT_DEPLOYED_EXPECT_RELOAD_RESULT: 'login',
  PLAYWRIGHT_DEPLOYED_EXPECT_GOOGLE_PLACEHOLDER: '1',
  PLAYWRIGHT_DEPLOYED_EXPECT_API_HOST: 'melodious-presence-staging.up.railway.app',
  PLAYWRIGHT_DEPLOYED_EXPECT_ALLOW_ORIGIN: 'https://project-y32ng.vercel.app',
  PLAYWRIGHT_DEPLOYED_REQUIRE_DEBUG_OTP_HEADER: '1',
}

const effectiveEnv = { ...process.env }

for (const [key, defaultValue] of Object.entries(defaults)) {
  const currentValue = process.env[key]?.trim()
  effectiveEnv[key] = currentValue || defaultValue
}

console.log('Phase 9 deployed smoke defaults:')
for (const key of Object.keys(defaults)) {
  console.log(`  ${key}=${effectiveEnv[key]}`)
}

const result = process.platform === 'win32'
  ? spawnSync('cmd.exe', ['/d', '/s', '/c', 'npx playwright test tests/auth.deployed.spec.js'], {
      cwd: process.cwd(),
      env: effectiveEnv,
      stdio: 'inherit',
    })
  : spawnSync('npx', ['playwright', 'test', 'tests/auth.deployed.spec.js'], {
      cwd: process.cwd(),
      env: effectiveEnv,
      stdio: 'inherit',
    })

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)

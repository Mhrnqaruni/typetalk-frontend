# TypeTalk Frontend Deploy Notes

## Phase 8 Frozen Inputs

- Public product name: `TypeTalk`
- Canonical production site: `https://typetalk.app`
- Alternate production site: `https://www.typetalk.app`
- Recommended staging site: `https://staging.typetalk.app`
- Launch-facing platform scope for the current rollout: `Windows` and `Android`
- `macOS` and `iOS` stay out of launch-facing UI until verified distribution URLs exist
- Pricing and quota shown on the site must eventually match the backend seed baseline:
  - `free`: `10,000` words per week
  - `pro_monthly`: `$9.99`
  - `pro_yearly`: `$99.99`

## Execution Boundary

- Phase 8 does not enable live Paddle checkout.
- Phase 8 must prove deployed frontend routing, env wiring, and backend connectivity only.

## Phase 9 Browser Auth Contract

Frozen browser-auth rules for the frontend rollout:

- Public marketing routes remain public.
- `/login` is the browser sign-in entry.
- `/app/*` is the protected authenticated SPA namespace.
- Browser sign-in and refresh use only the dedicated backend routes under `/v1/web-auth/*`.
- Native `/v1/auth/*` endpoints remain the Android and Windows contract and must not be treated as browser-cookie endpoints.
- The backend owns the refresh token in an `HttpOnly` cookie on the backend origin.
- The frontend keeps the access token in memory only and must not persist long-lived auth state to `localStorage` or `sessionStorage`.
- Browser requests that set or send the refresh cookie must use `credentials: "include"`.

## Current Operational State At Phase 8 Start

- Frontend remote:
  - `https://github.com/Mhrnqaruni/typetalk-frontend.git`
- Vercel CLI account:
  - `mhrnqaruni`
- Missing frontend deployment files at Phase 8 start:
  - `frontend/.env.example`
  - `frontend/vercel.json`

## Pending Sections To Be Completed During Phase 8

- Frontend environment inventory
- Vercel build and rewrite contract
- Frontend-origin connectivity smoke procedure
- Rollout and rollback notes

## Frontend Environment Inventory

Public frontend build-time vars for Phase 8:

- `VITE_API_BASE_URL`
- `VITE_PUBLIC_SITE_URL`
- `VITE_SUPPORT_EMAIL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_WINDOWS_DOWNLOAD_URL`
- `VITE_GOOGLE_PLAY_URL`
- `VITE_BILLING_CHECKOUT_ENABLED`
- `VITE_BILLING_CUSTOMER_PORTAL_ENABLED`

Phase 9 browser-auth notes:

- `VITE_GOOGLE_CLIENT_ID` is the browser Google Identity Services client id and must use authorized JavaScript origins for local, staging, and production.
- `/login`, `/app`, and `/app/account` become direct-load routes that must keep working under the committed SPA rewrite contract.
- Browser auth calls that set or send the backend refresh cookie must use the dedicated `/v1/web-auth/*` contract against `VITE_API_BASE_URL`.

Rules:

- Only `VITE_`-prefixed values are exposed to browser code.
- Secrets must remain in Railway/backend env, not in Vercel client env.
- Download/store URLs must be replaced with verified launch URLs before the related platform is shown publicly.

## Vercel Build And Routing Contract

- Vercel project root: `frontend/`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite contract lives in committed `frontend/vercel.json`
- Direct loads that must keep working after deploy:
  - `/`
  - `/pricing`
  - `/downloads`
  - `/about`
  - `/deploy-check`

Preview versus production policy:

- Preview deployments can validate routing and static rendering.
- Preview deployments must not force production backend CORS to allow arbitrary `*.vercel.app` origins.
- If browser-auth rehearsal from a preview deployment is needed later, use a dedicated staging backend allowlist instead of widening production.
- The checked-in rehearsal command for the current Phase 9 preview-to-staging proof is `npm run test:e2e:deployed:phase9`.
- Preview-domain browser-auth rehearsal is still cross-site when `*.vercel.app` talks to `*.up.railway.app`, so it can validate request, verify, and logout behavior but it cannot prove `SameSite=Lax` refresh-cookie persistence on reload.
- Real cookie-persistence proof requires same-site frontend and backend domains such as `typetalk.app` plus `api.typetalk.app` or an equivalent staging pair under the same registrable domain.

## Frontend-Origin Connectivity Smoke

- Route: `/deploy-check`
- Purpose: prove the deployed frontend origin can fetch:
  - `${VITE_API_BASE_URL}/health`
  - `${VITE_API_BASE_URL}/v1/billing/plans`
- This route is operational-only and should not be promoted in the primary site navigation.
- The page must surface:
  - current frontend origin
  - configured `VITE_API_BASE_URL`
  - pass/fail state for the health request
  - pass/fail state for the public billing-plans request

## First Frontend Rollout Order

1. Confirm the backend deploy is healthy first.
2. Create or link the Vercel project for `frontend/`.
3. Set Vercel public env vars from `frontend/.env.example`.
4. Deploy with the committed `vercel.json` rewrite contract.
5. Verify direct loads for `/`, `/pricing`, `/downloads`, `/about`, and `/deploy-check`.
6. Use `/deploy-check` from the deployed frontend origin to confirm live backend connectivity.

## Frontend Rollback Rules

- If a Vercel deploy breaks routing, redeploy the last known-good frontend build before changing backend CORS.
- If `/deploy-check` fails because of backend origin policy, fix the backend allowlist or point the frontend at the correct staging backend instead of loosening production to wildcard origins.
- If a frontend deploy is healthy but points at the wrong backend, fix the `VITE_API_BASE_URL` configuration and redeploy rather than patching URLs in built assets manually.

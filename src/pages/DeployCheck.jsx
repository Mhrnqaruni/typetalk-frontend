import { useEffect, useState } from 'react'
import './DeployCheck.css'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/$/, '')

const requiredPlanKeys = [
  'amount_cents',
  'billing_interval',
  'code',
  'currency',
  'display_name',
  'is_active',
  'trial_days',
  'weekly_word_limit',
]

const forbiddenPlanKeys = [
  'id',
  'paddle_price_id',
  'stripe_price_id',
  'google_product_id',
  'google_base_plan_id',
]

function summarizePlanContract(payload) {
  const firstPlan = payload?.items?.[0]

  if (!Array.isArray(payload?.items) || !firstPlan) {
    return {
      ok: false,
      message: 'Billing plans response is missing plan items.',
      details: null,
    }
  }

  const keys = Object.keys(firstPlan).sort()
  const hasRequiredKeys = requiredPlanKeys.every((key) => keys.includes(key))
  const hasForbiddenKeys = forbiddenPlanKeys.some((key) => keys.includes(key))

  return {
    ok: hasRequiredKeys && !hasForbiddenKeys,
    message: hasRequiredKeys && !hasForbiddenKeys
      ? 'Public plans contract is display-safe.'
      : 'Public plans contract does not match the locked Phase 8 shape.',
    details: {
      first_plan_code: firstPlan.code ?? null,
      keys,
    },
  }
}

async function runCheck(label, url, validatePayload) {
  const startedAt = new Date().toISOString()

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        accept: 'application/json',
      },
    })
    const contentType = response.headers.get('content-type') ?? ''
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      return {
        label,
        ok: false,
        url,
        started_at: startedAt,
        status: response.status,
        message: `Request failed with status ${response.status}.`,
        details: payload,
      }
    }

    const validation = validatePayload(payload)

    return {
      label,
      ok: validation.ok,
      url,
      started_at: startedAt,
      status: response.status,
      message: validation.message,
      details: validation.details,
    }
  } catch (error) {
    return {
      label,
      ok: false,
      url,
      started_at: startedAt,
      status: null,
      message: error instanceof Error ? error.message : 'Request failed.',
      details: null,
    }
  }
}

export default function DeployCheck() {
  const [checks, setChecks] = useState([])
  const [status, setStatus] = useState(apiBaseUrl ? 'loading' : 'missing-config')

  useEffect(() => {
    if (!apiBaseUrl) {
      return
    }

    let cancelled = false

    async function runChecks() {
      setStatus('loading')

      const results = await Promise.all([
        runCheck(
          'Backend health',
          `${apiBaseUrl}/health`,
          (payload) => ({
            ok: payload?.status === 'ok' && payload?.database === 'ok',
            message: payload?.status === 'ok' && payload?.database === 'ok'
              ? 'Backend health check returned ok.'
              : 'Backend health payload is missing the expected ok state.',
            details: payload,
          }),
        ),
        runCheck(
          'Public billing plans',
          `${apiBaseUrl}/v1/billing/plans`,
          summarizePlanContract,
        ),
      ])

      if (cancelled) {
        return
      }

      setChecks(results)
      setStatus(results.every((result) => result.ok) ? 'passed' : 'failed')
    }

    void runChecks()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="deploy-check">
      <div className="container">
        <div className="deploy-check__panel">
          <p className="deploy-check__eyebrow">Operational route</p>
          <h1 className="deploy-check__title">Deployment connectivity check</h1>
          <p className="deploy-check__intro">
            This page proves that the current frontend origin can reach the live backend and that
            the public billing-plans contract is display-safe.
          </p>

          <dl className="deploy-check__meta">
            <div>
              <dt>Frontend origin</dt>
              <dd>{window.location.origin}</dd>
            </div>
            <div>
              <dt>Configured API base</dt>
              <dd>{apiBaseUrl || 'Missing VITE_API_BASE_URL'}</dd>
            </div>
            <div>
              <dt>Overall status</dt>
              <dd className={`deploy-check__status deploy-check__status--${status}`}>{status}</dd>
            </div>
          </dl>

          {!apiBaseUrl && (
            <div className="deploy-check__alert">
              Set <code>VITE_API_BASE_URL</code> before using this route for deployed verification.
            </div>
          )}

          <div className="deploy-check__grid">
            {checks.map((check) => (
              <article
                key={check.label}
                className={`deploy-check__card${check.ok ? ' is-passed' : ' is-failed'}`}
              >
                <div className="deploy-check__card-head">
                  <h2>{check.label}</h2>
                  <span>{check.ok ? 'PASS' : 'FAIL'}</span>
                </div>
                <p className="deploy-check__message">{check.message}</p>
                <dl className="deploy-check__details">
                  <div>
                    <dt>URL</dt>
                    <dd>{check.url}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{check.status ?? 'network error'}</dd>
                  </div>
                  <div>
                    <dt>Started at</dt>
                    <dd>{check.started_at}</dd>
                  </div>
                </dl>
                <pre>{JSON.stringify(check.details, null, 2)}</pre>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

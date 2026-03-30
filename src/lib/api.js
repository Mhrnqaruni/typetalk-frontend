function resolveApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/$/, '')
}

export class ApiError extends Error {
  constructor(message, { status = 500, code = null, details = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

async function parseResponsePayload(response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }

  try {
    const text = await response.text()
    return text || null
  } catch {
    return null
  }
}

export function getApiBaseUrl() {
  const apiBaseUrl = resolveApiBaseUrl()

  if (!apiBaseUrl) {
    throw new Error('Missing VITE_API_BASE_URL.')
  }

  return apiBaseUrl
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'omit',
    accessToken = null,
    signal,
  } = options
  const requestHeaders = new Headers({
    accept: 'application/json',
    ...headers,
  })

  if (body !== undefined) {
    requestHeaders.set('content-type', 'application/json')
  }

  if (accessToken) {
    requestHeaders.set('authorization', `Bearer ${accessToken}`)
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: requestHeaders,
    credentials,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })
  const payload = await parseResponsePayload(response)

  if (!response.ok) {
    const errorPayload = payload && typeof payload === 'object' ? payload.error ?? null : null

    throw new ApiError(
      errorPayload?.message ?? `Request failed with status ${response.status}.`,
      {
        status: response.status,
        code: errorPayload?.code ?? null,
        details: errorPayload?.details ?? payload,
      },
    )
  }

  return payload
}

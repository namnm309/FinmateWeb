import { auth } from '@clerk/nextjs/server'

function decodeJwtPayload(jwt: string): Record<string, unknown> | null {
  const parts = jwt.split('.')
  if (parts.length < 2) return null
  const payload = parts[1]
  const json = Buffer.from(payload, 'base64url').toString('utf8')
  return JSON.parse(json) as Record<string, unknown>
}

function decodeJwtHeader(jwt: string): Record<string, unknown> | null {
  const parts = jwt.split('.')
  if (parts.length < 2) return null
  const header = parts[0]
  const json = Buffer.from(header, 'base64url').toString('utf8')
  return JSON.parse(json) as Record<string, unknown>
}

export default async function DebugAuthPage() {
  const { getToken } = await auth()
  const token = await getToken()

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold">Debug Auth</h1>
        <p className="text-muted-foreground mt-2">Chưa có token. Hãy sign-in trước.</p>
      </div>
    )
  }

  const header = decodeJwtHeader(token)
  const claims = decodeJwtPayload(token)
  const beBaseUrl = (process.env.NEXT_PUBLIC_BE_BASE_URL || '').replace(/\/$/, '')

  const beRes = await fetch(`${beBaseUrl}/api/auth/me-external`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  }).catch((e: unknown) => ({
    ok: false,
    status: 0,
    text: async () => String(e),
  }))

  const beText = await beRes.text()

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Debug Auth</h1>
        <p className="text-muted-foreground mt-2">
          Trang này giúp kiểm tra token Clerk và phản hồi từ BE <code>/api/auth/me</code>.
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-2">
        <div className="text-sm">
          <span className="text-muted-foreground">BE base URL:</span>{' '}
          <code>{beBaseUrl || '(missing NEXT_PUBLIC_BE_BASE_URL)'}</code>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">BE /api/auth/me-external status:</span>{' '}
          <code>{String(beRes.status)}</code>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">BE body:</span>
          <pre className="mt-2 max-h-64 overflow-auto rounded bg-muted p-3 text-xs">
            {beText || '(empty)'}
          </pre>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm text-muted-foreground mb-2">JWT header</div>
        <pre className="max-h-48 overflow-auto rounded bg-muted p-3 text-xs">
          {header ? JSON.stringify(header, null, 2) : '(cannot decode)'}
        </pre>

        <div className="text-sm text-muted-foreground mb-2 mt-4">JWT claims (payload)</div>
        <pre className="max-h-96 overflow-auto rounded bg-muted p-3 text-xs">
          {claims ? JSON.stringify(claims, null, 2) : '(cannot decode)'}
        </pre>
      </div>
    </div>
  )
}


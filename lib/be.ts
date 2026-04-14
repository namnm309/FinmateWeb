import { cache } from 'react'

export type BackendMe = {
  id?: string
  email?: string
  fullName?: string
  role?: number | string
}

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not set`)
  return v
}

function isAllowedRole(role: BackendMe['role']): boolean {
  // Backend currently serializes enum Role as number by default (User=0, Staff=1, Admin=2).
  if (typeof role === 'number') return role === 1 || role === 2
  if (typeof role === 'string') {
    const r = role.toLowerCase()
    return r === 'staff' || r === 'admin' || r === '1' || r === '2'
  }
  return false
}

export const getBackendMe = cache(async (clerkJwt: string): Promise<BackendMe> => {
  const baseUrl = requireEnv('NEXT_PUBLIC_BE_BASE_URL').replace(/\/$/, '')

  const res = await fetch(`${baseUrl}/api/auth/me-external`, {
    headers: {
      Authorization: `Bearer ${clerkJwt}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`BE /api/auth/me failed: ${res.status} ${text}`)
  }

  return (await res.json()) as BackendMe
})

export const assertStaffOrAdmin = cache(async (clerkJwt: string) => {
  const me = await getBackendMe(clerkJwt)
  if (!isAllowedRole(me.role)) {
    const role = me.role ?? 'unknown'
    throw new Error(`Forbidden: role=${String(role)}`)
  }
  return me
})


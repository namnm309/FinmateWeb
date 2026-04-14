export type PremiumPlanKey = '1-month' | '6-month' | '1-year'

export type PremiumPlanConfig = {
  id: string
  plan: PremiumPlanKey
  priceVnd: number
  originalPriceVnd: number | null
  discountPercent: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

function beBaseUrl(): string {
  // IMPORTANT:
  // Next.js only inlines NEXT_PUBLIC_* env vars into client bundles when accessed statically.
  // Dynamic access like process.env[name] will be undefined on the client.
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchPremiumPlanConfigs(): Promise<PremiumPlanConfig[]> {
  const res = await fetch(`${beBaseUrl()}/api/premium-plan-configs`, { cache: 'no-store' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load premium plan configs: ${res.status} ${text}`)
  }
  return (await res.json()) as PremiumPlanConfig[]
}

export type UpsertPremiumPlanConfig = Pick<
  PremiumPlanConfig,
  'plan' | 'priceVnd' | 'originalPriceVnd' | 'discountPercent' | 'isActive'
>

export async function upsertPremiumPlanConfigs(input: {
  token: string
  items: UpsertPremiumPlanConfig[]
}): Promise<PremiumPlanConfig[]> {
  const res = await fetch(`${beBaseUrl()}/api/premium-plan-configs`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.token}`,
    },
    body: JSON.stringify(input.items),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to update premium plan configs: ${res.status} ${text}`)
  }

  return (await res.json()) as PremiumPlanConfig[]
}


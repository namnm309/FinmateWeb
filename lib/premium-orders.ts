export type PremiumPlanKey = '1-month' | '6-month' | '1-year'

export type PremiumOrderCheckout = {
  id: string
  plan: PremiumPlanKey
  amountVnd: number
  status: 'Pending' | 'Paid' | 'Expired' | 'Cancelled' | string
  paymentCode: string
  createdAt: string
  expiresAt: string
  paidAt: string | null
  qrBank: string | null
  qrAccountNumber: string | null
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function createPremiumOrder(input: { token: string; plan: PremiumPlanKey }): Promise<PremiumOrderCheckout> {
  const res = await fetch(`${beBaseUrl()}/api/premium-orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.token}`,
    },
    body: JSON.stringify({ plan: input.plan }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to create premium order: ${res.status} ${text}`)
  }

  return (await res.json()) as PremiumOrderCheckout
}

export async function fetchPremiumOrder(input: { token: string; id: string }): Promise<PremiumOrderCheckout> {
  const res = await fetch(`${beBaseUrl()}/api/premium-orders/${encodeURIComponent(input.id)}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load premium order: ${res.status} ${text}`)
  }

  return (await res.json()) as PremiumOrderCheckout
}

export type SepayGatewayInit = {
  orderId: string
  checkoutUrl: string
  fields: Record<string, string>
}

export async function initSepayGatewayCheckout(input: { token: string; plan: PremiumPlanKey }): Promise<SepayGatewayInit> {
  const res = await fetch(`${beBaseUrl()}/api/sepay-gateway/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.token}`,
    },
    body: JSON.stringify({ plan: input.plan }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to init SePay checkout: ${res.status} ${text}`)
  }

  return (await res.json()) as SepayGatewayInit
}

export type AdminPremiumOrderRow = {
  id: string
  plan: PremiumPlanKey
  amountVnd: number
  status: string
  paymentCode: string
  createdAt: string
  expiresAt: string
  paidAt: string | null
  userEmail: string
  userId: string
  sepayTransactionId: number | null
  referenceCode: string | null
}

export type AdminPremiumOrdersPage = {
  items: AdminPremiumOrderRow[]
  page: number
  perPage: number
  total: number
  charts: PremiumOrdersCharts
}

export type OrdersByDayPoint = {
  date: string // yyyy-MM-dd (UTC)
  count: number
}

export type RevenueByDayPoint = {
  date: string // yyyy-MM-dd (UTC)
  amountVnd: number
}

export type PlanBreakdownPoint = {
  plan: PremiumPlanKey
  count: number
}

export type PremiumOrdersCharts = {
  ordersByDay: OrdersByDayPoint[]
  revenueByDay: RevenueByDayPoint[]
  planBreakdown: PlanBreakdownPoint[]
}

export async function adminFetchPremiumOrders(input: {
  token: string
  page?: number
  perPage?: number
  status?: string
  plan?: PremiumPlanKey
  minAmountVnd?: number
  maxAmountVnd?: number
  q?: string
}): Promise<AdminPremiumOrdersPage> {
  const params = new URLSearchParams()
  if (input.page) params.set('page', String(input.page))
  if (input.perPage) params.set('perPage', String(input.perPage))
  if (input.status) params.set('status', input.status)
  if (input.plan) params.set('plan', input.plan)
  if (typeof input.minAmountVnd === 'number' && Number.isFinite(input.minAmountVnd)) params.set('minAmountVnd', String(input.minAmountVnd))
  if (typeof input.maxAmountVnd === 'number' && Number.isFinite(input.maxAmountVnd)) params.set('maxAmountVnd', String(input.maxAmountVnd))
  if (input.q) params.set('q', input.q)

  const res = await fetch(`${beBaseUrl()}/api/admin/premium-orders?${params.toString()}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load premium orders: ${res.status} ${text}`)
  }

  return (await res.json()) as AdminPremiumOrdersPage
}

export async function adminFetchPremiumOrderDetail(input: { token: string; id: string }): Promise<AdminPremiumOrderRow> {
  const res = await fetch(`${beBaseUrl()}/api/admin/premium-orders/${encodeURIComponent(input.id)}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load premium order detail: ${res.status} ${text}`)
  }

  return (await res.json()) as AdminPremiumOrderRow
}


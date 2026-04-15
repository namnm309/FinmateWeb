export type AdminDashboardSummary = {
  premiumOrders: {
    pending: number
    paid: number
    expired: number
    cancelled: number
    total: number
  }
  premiumRevenueVndThisMonth: number
  totalSystemIncomeVnd: number
  customersWithGoals: number
  premiumExpiringIn5Days: number
  users: {
    total: number
    premium: number
    staffOrAdmin: number
  }
  aiUsage: {
    periodKey: string
    totalPlanCalls: number
    totalChatCalls: number
    usersWithUsage: number
  }
  premiumPlanConfigsActive: number
  generatedAtUtc: string
}

export type AdminUserMetricsPoint = {
  date: string
  activeUsers: number
  newUsers: number
  premiumBuyers: number
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchAdminDashboardSummary(token: string): Promise<AdminDashboardSummary> {
  const res = await fetch(`${beBaseUrl()}/api/admin/dashboard-summary`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load admin summary: ${res.status} ${text}`)
  }

  return (await res.json()) as AdminDashboardSummary
}

export async function fetchAdminUserMetrics(input: {
  token: string
  startDate?: Date
  endDate?: Date
}): Promise<AdminUserMetricsPoint[]> {
  const params = new URLSearchParams()
  if (input.startDate) params.set('startDate', input.startDate.toISOString())
  if (input.endDate) params.set('endDate', input.endDate.toISOString())

  const q = params.toString()
  const res = await fetch(`${beBaseUrl()}/api/admin/dashboard-summary/user-metrics${q ? `?${q}` : ''}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load user metrics: ${res.status} ${text}`)
  }

  return (await res.json()) as AdminUserMetricsPoint[]
}

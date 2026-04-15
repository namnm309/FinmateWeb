export type AdminDashboardSummary = {
  premiumOrders: {
    pending: number
    paid: number
    expired: number
    cancelled: number
    total: number
  }
  premiumRevenueVndThisMonth: number
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

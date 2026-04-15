export type AdminAiManageSummary = {
  periodKey: string
  totalChatCalls: number
  totalPlanCalls: number
  usersWithUsage: number
  generatedAtUtc: string
}

export type AdminAiManageUserRow = {
  userId: string
  email: string
  fullName: string
  isPremium: boolean
  role: number
  chatCalls: number
  planCalls: number
  goalsCount: number
}

export type AdminAiManagePage = {
  items: AdminAiManageUserRow[]
  page: number
  perPage: number
  total: number
  summary: AdminAiManageSummary
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchAdminAiManage(input: {
  token: string
  periodKey?: string
  q?: string
  sort?: 'chat' | 'plan' | 'goals' | 'email'
  dir?: 'desc' | 'asc'
  page?: number
  perPage?: number
}): Promise<AdminAiManagePage> {
  const params = new URLSearchParams()
  if (input.periodKey) params.set('periodKey', input.periodKey)
  if (input.q) params.set('q', input.q)
  if (input.sort) params.set('sort', input.sort)
  if (input.dir) params.set('dir', input.dir)
  if (input.page) params.set('page', String(input.page))
  if (input.perPage) params.set('perPage', String(input.perPage))

  const res = await fetch(`${beBaseUrl()}/api/admin/ai-manage?${params.toString()}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load AI manage: ${res.status} ${text}`)
  }

  return (await res.json()) as AdminAiManagePage
}


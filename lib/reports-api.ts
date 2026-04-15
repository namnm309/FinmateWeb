export type CategoryStatDto = {
  categoryId: string
  categoryName: string
  categoryIcon: string
  amount: number
  percentage: number
  color: string
}

export type OverviewReportDto = {
  totalIncome: number
  totalExpense: number
  difference: number
  categoryStats: CategoryStatDto[]
}

export type WeeklyExpenseBarDto = {
  day: string
  thisWeek: number
  lastWeek: number
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchReportOverview(input: {
  token: string
  startDate?: Date
  endDate?: Date
}): Promise<OverviewReportDto> {
  const params = new URLSearchParams()
  if (input.startDate) params.set('startDate', input.startDate.toISOString())
  if (input.endDate) params.set('endDate', input.endDate.toISOString())

  const q = params.toString()
  const res = await fetch(`${beBaseUrl()}/api/reports/overview${q ? `?${q}` : ''}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load report: ${res.status} ${text}`)
  }

  return (await res.json()) as OverviewReportDto
}

export async function fetchWeeklyExpenses(token: string): Promise<WeeklyExpenseBarDto[]> {
  const res = await fetch(`${beBaseUrl()}/api/reports/weekly-expenses`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load weekly report: ${res.status} ${text}`)
  }

  return (await res.json()) as WeeklyExpenseBarDto[]
}

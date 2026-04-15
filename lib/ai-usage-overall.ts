export type AiUsageOverall = {
  usersWithUsage: number
  totalPlanCalls: number
  totalChatCalls: number
  totalCalls: number
  generatedAtUtc: string
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchAiUsageOverall(token: string): Promise<AiUsageOverall> {
  const res = await fetch(`${beBaseUrl()}/api/ai-usage/overall`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load overall AI usage: ${res.status} ${text}`)
  }

  return (await res.json()) as AiUsageOverall
}

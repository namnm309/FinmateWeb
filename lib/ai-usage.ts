export type AiUsageSnapshot = {
  periodKey: string
  planCallsUsed: number
  planCallsLimit: number
  chatCallsUsed: number
  chatCallsLimit: number
  isPremium: boolean
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchAiUsage(token: string): Promise<AiUsageSnapshot> {
  const res = await fetch(`${beBaseUrl()}/api/ai-usage`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load AI usage: ${res.status} ${text}`)
  }

  return (await res.json()) as AiUsageSnapshot
}

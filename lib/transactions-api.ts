export type TransactionDto = {
  id: string
  userId: string
  transactionTypeId: string
  transactionTypeName: string
  transactionTypeColor: string
  isIncome: boolean
  moneySourceId: string
  moneySourceName: string
  moneySourceIcon: string
  categoryId: string
  categoryName: string
  categoryIcon: string
  contactId: string | null
  contactName: string | null
  amount: number
  transactionDate: string
  description: string | null
  isBorrowingForThis: boolean
  isFee: boolean
  excludeFromReport: boolean
  createdAt: string
  updatedAt: string
}

export type TransactionListResponse = {
  totalCount: number
  page: number
  pageSize: number
  transactions: TransactionDto[]
}

function beBaseUrl(): string {
  const v = process.env.NEXT_PUBLIC_BE_BASE_URL
  if (!v) throw new Error(`NEXT_PUBLIC_BE_BASE_URL is not set`)
  return v.replace(/\/$/, '')
}

export async function fetchTransactions(input: {
  token: string
  page?: number
  pageSize?: number
  transactionTypeId?: string
}): Promise<TransactionListResponse> {
  const params = new URLSearchParams()
  params.set('page', String(input.page ?? 1))
  params.set('pageSize', String(Math.min(input.pageSize ?? 20, 100)))
  if (input.transactionTypeId) params.set('transactionTypeId', input.transactionTypeId)

  const res = await fetch(`${beBaseUrl()}/api/transactions?${params.toString()}`, {
    headers: { Authorization: `Bearer ${input.token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to load transactions: ${res.status} ${text}`)
  }

  return (await res.json()) as TransactionListResponse
}

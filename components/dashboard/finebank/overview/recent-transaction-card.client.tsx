'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

import { fetchTransactions } from '@/lib/transactions-api'
import { mapTransactionToRecentRow } from '@/lib/transaction-mapper'
import type { RecentTxRow } from '@/lib/transaction-mapper'
import { Skeleton } from '@/components/ui/skeleton'
import { FinebankRecentTransactionCard } from '@/components/dashboard/finebank/overview/recent-transaction-card'

export function FinebankRecentTransactionCardClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [all, setAll] = useState<RecentTxRow[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error('No token')
        const res = await fetchTransactions({ token, page: 1, pageSize: 40 })
        const rows = res.transactions.map(mapTransactionToRecentRow)
        if (!cancelled) {
          setAll(rows)
          setErr(null)
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded || !isSignedIn) return null

  if (loading) {
    return (
      <div className="flex h-full flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="min-h-[280px] flex-1 rounded-lg" />
      </div>
    )
  }

  if (err) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {err}
      </div>
    )
  }

  const revenue = all.filter((r) => r.isIncome)
  const expenses = all.filter((r) => !r.isIncome)

  return <FinebankRecentTransactionCard all={all} revenue={revenue} expenses={expenses} />
}

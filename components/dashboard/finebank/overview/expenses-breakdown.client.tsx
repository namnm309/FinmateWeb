'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

import { fetchReportOverview } from '@/lib/reports-api'
import { buildExpenseBreakdownRows } from '@/lib/transaction-mapper'
import type { ExpenseBreakdownRow } from '@/lib/transaction-mapper'
import { Skeleton } from '@/components/ui/skeleton'
import { FinebankExpensesBreakdown } from '@/components/dashboard/finebank/overview/expenses-breakdown'

function monthRangeUtc(y: number, m0: number) {
  const start = new Date(Date.UTC(y, m0, 1, 0, 0, 0, 0))
  const end = new Date(Date.UTC(y, m0 + 1, 0, 23, 59, 59, 999))
  return { start, end }
}

export function FinebankExpensesBreakdownClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [rows, setRows] = useState<ExpenseBreakdownRow[] | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) return

        const now = new Date()
        const y = now.getUTCFullYear()
        const m = now.getUTCMonth()
        const cur = monthRangeUtc(y, m)
        const prevM = m === 0 ? 11 : m - 1
        const prevY = m === 0 ? y - 1 : y
        const prev = monthRangeUtc(prevY, prevM)

        const [currentReport, prevReport] = await Promise.all([
          fetchReportOverview({ token, startDate: cur.start, endDate: cur.end }),
          fetchReportOverview({ token, startDate: prev.start, endDate: prev.end }),
        ])

        const prevMap = new Map<string, number>()
        for (const s of prevReport.categoryStats) {
          prevMap.set(s.categoryId, Number(s.amount))
        }

        const built = buildExpenseBreakdownRows(currentReport.categoryStats, prevMap)
        if (!cancelled) setRows(built)
      } catch {
        if (!cancelled) setRows([])
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded || !isSignedIn) return null

  if (rows === null) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    )
  }

  return <FinebankExpensesBreakdown rows={rows} />
}

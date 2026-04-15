'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

import { fetchWeeklyExpenses } from '@/lib/reports-api'
import { Skeleton } from '@/components/ui/skeleton'
import { FinebankStatisticsCard, type WeeklyComparisonPoint } from '@/components/dashboard/finebank/overview/statistics-card'

export function FinebankStatisticsCardClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [data, setData] = useState<WeeklyComparisonPoint[] | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) return
        const rows = await fetchWeeklyExpenses(token)
        const mapped: WeeklyComparisonPoint[] = rows.map((r) => ({
          day: r.day,
          thisWeek: r.thisWeek,
          lastWeek: r.lastWeek,
        }))
        if (!cancelled) setData(mapped)
      } catch {
        if (!cancelled) setData([])
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded || !isSignedIn) return null

  if (data === null) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="rounded-lg bg-white p-6 shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
          <Skeleton className="h-5 w-48" />
          <div className="mt-6">
            <Skeleton className="h-[240px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  return <FinebankStatisticsCard data={data} />
}

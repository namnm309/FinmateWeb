'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

import { fetchAdminUserMetrics } from '@/lib/admin-dashboard-summary'
import { Skeleton } from '@/components/ui/skeleton'
import { FinebankStatisticsCard, type UserMetricsPoint } from '@/components/dashboard/finebank/overview/statistics-card'

function toLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

function toFullDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function parseDdMmYyyy(text: string): Date | null {
  const m = text.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  const dd = Number(m[1])
  const mm = Number(m[2])
  const yyyy = Number(m[3])
  const d = new Date(Date.UTC(yyyy, mm - 1, dd))
  if (d.getUTCFullYear() !== yyyy || d.getUTCMonth() !== mm - 1 || d.getUTCDate() !== dd) return null
  return d
}

function rangeByDays(days: number) {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - (days - 1))
  return { start, end }
}

export function FinebankStatisticsCardClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [data, setData] = useState<UserMetricsPoint[] | null>(null)
  const [rangeMode, setRangeMode] = useState<'7d' | '30d' | 'custom'>('7d')
  const [customRangeText, setCustomRangeText] = useState('')
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | null>(null)
  const [customRangeError, setCustomRangeError] = useState<string | null>(null)

  useEffect(() => {
    const { start, end } = rangeByDays(7)
    const startText = start.toLocaleDateString('en-GB')
    const endText = end.toLocaleDateString('en-GB')
    setCustomRangeText(`${startText} - ${endText}`)
  }, [])

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const { start, end } =
      rangeMode === '30d'
        ? rangeByDays(30)
        : rangeMode === 'custom' && customRange
          ? customRange
          : rangeByDays(7)

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) return
        const rows = await fetchAdminUserMetrics({ token, startDate: start, endDate: end })
        const mapped: UserMetricsPoint[] = rows.map((r) => ({
          label: toLabel(r.date),
          activeUsers: r.activeUsers,
          newUsers: r.newUsers,
          premiumBuyers: r.premiumBuyers,
          fullDate: toFullDate(r.date),
        }))
        if (!cancelled) setData(mapped)
      } catch {
        if (!cancelled) setData([])
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken, rangeMode, customRange])

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

  return (
    <FinebankStatisticsCard
      data={data}
      rangeMode={rangeMode}
      customRangeText={customRangeText}
      onSelect7Days={() => setRangeMode('7d')}
      onSelect30Days={() => setRangeMode('30d')}
      onChangeCustomRangeText={setCustomRangeText}
      customRangeError={customRangeError}
      onApplyCustomRange={() => {
        const parts = customRangeText.split('-')
        if (parts.length < 2) {
          setCustomRangeError('Nhập đúng định dạng: dd/mm/yyyy - dd/mm/yyyy')
          return
        }
        const start = parseDdMmYyyy(parts[0])
        const end = parseDdMmYyyy(parts[1])
        if (!start || !end) {
          setCustomRangeError('Ngày không hợp lệ. Ví dụ: 01/04/2026 - 15/04/2026')
          return
        }
        setCustomRangeError(null)
        setCustomRange({ start, end })
        setRangeMode('custom')
      }}
    />
  )
}

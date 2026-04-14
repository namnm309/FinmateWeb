'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

type Point = { month: string; income: number; spend: number }

const OverviewCashflowChart = dynamic(
  () =>
    import('./overview-cashflow-chart').then((m) => m.OverviewCashflowChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border bg-card/40 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-[260px] w-full" />
        </div>
      </div>
    ),
  },
)

export function OverviewCashflowChartClient({ data }: { data: Point[] }) {
  return <OverviewCashflowChart data={data} />
}


'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

const FinebankStatisticsCard = dynamic(
  () => import('./statistics-card').then((m) => m.FinebankStatisticsCard),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="rounded-lg bg-white p-6 shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
          <Skeleton className="h-5 w-48" />
          <div className="mt-6">
            <Skeleton className="h-[240px] w-full" />
          </div>
        </div>
      </div>
    ),
  },
)

export function FinebankStatisticsCardClient() {
  return <FinebankStatisticsCard />
}


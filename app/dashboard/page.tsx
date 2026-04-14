import { FinebankOverviewTopRow } from '@/components/dashboard/finebank/overview/top-row'
import { FinebankRecentTransactionCard } from '@/components/dashboard/finebank/overview/recent-transaction-card'
import { FinebankStatisticsCardClient } from '@/components/dashboard/finebank/overview/statistics-card.client'
import { FinebankExpensesBreakdown } from '@/components/dashboard/finebank/overview/expenses-breakdown'

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8 px-6 py-8">
      <FinebankOverviewTopRow />

      <div className="grid items-stretch gap-6 xl:grid-cols-[352px_1fr] xl:grid-rows-[auto_auto]">
        <div className="xl:row-span-2">
          <FinebankRecentTransactionCard />
        </div>
        <div className="xl:col-start-2">
          <FinebankStatisticsCardClient />
        </div>
        <div className="xl:col-start-2">
          <FinebankExpensesBreakdown />
        </div>
      </div>
    </div>
  )
}


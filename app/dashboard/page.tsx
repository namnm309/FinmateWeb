import { FinebankOverviewTopRow } from '@/components/dashboard/finebank/overview/top-row'
import { FinebankRecentTransactionCardClient } from '@/components/dashboard/finebank/overview/recent-transaction-card.client'
import { FinebankStatisticsCardClient } from '@/components/dashboard/finebank/overview/statistics-card.client'
import { FinebankExpensesBreakdownClient } from '@/components/dashboard/finebank/overview/expenses-breakdown.client'
import { AiUsageOverviewClient } from '@/components/dashboard/finebank/overview/ai-usage-overview.client'
import { AdminOverviewSummaryClient } from '@/components/dashboard/admin/admin-overview-summary.client'

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8 px-6 py-8">
      <FinebankOverviewTopRow />

      <AdminOverviewSummaryClient />

      <AiUsageOverviewClient />

      <div className="grid items-stretch gap-6 xl:grid-cols-[352px_1fr] xl:grid-rows-[auto_auto]">
        <div className="xl:row-span-2">
          <FinebankRecentTransactionCardClient />
        </div>
        <div className="xl:col-start-2">
          <FinebankStatisticsCardClient />
        </div>
        <div className="xl:col-start-2">
          <FinebankExpensesBreakdownClient />
        </div>
      </div>
    </div>
  )
}

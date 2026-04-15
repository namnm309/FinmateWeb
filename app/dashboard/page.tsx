import { FinebankOverviewTopRow } from '@/components/dashboard/finebank/overview/top-row'
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

      <div className="grid items-stretch gap-6 xl:grid-cols-2">
        <FinebankStatisticsCardClient />
        <FinebankExpensesBreakdownClient />
      </div>
    </div>
  )
}

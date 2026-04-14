import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  finebankTransactionsAll,
  finebankTransactionsExpenses,
  finebankTransactionsRevenue,
} from '@/lib/mock/finebank-transactions'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import { FinebankTransactionsTable } from '@/components/dashboard/finebank/transactions/transactions-table'

export default function TransactionsPage() {
  return (
    <div className="w-full space-y-5 px-6 py-8">
      <SectionTitle title="Recent Transaction" />

      <Tabs defaultValue="all">
        <TabsList className="h-auto rounded-none bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            Expenses
          </TabsTrigger>
        </TabsList>

        <div className="pt-4">
          <TabsContent value="all" className="m-0">
            <FinebankTransactionsTable rows={finebankTransactionsAll} />
          </TabsContent>
          <TabsContent value="revenue" className="m-0">
            <FinebankTransactionsTable rows={finebankTransactionsRevenue} />
          </TabsContent>
          <TabsContent value="expenses" className="m-0">
            <FinebankTransactionsTable rows={finebankTransactionsExpenses} />
          </TabsContent>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            className="h-11 w-[140px] rounded-md bg-[#299D91] text-white hover:bg-[#299D91]/90"
          >
            Load More
          </Button>
        </div>
      </Tabs>
    </div>
  )
}


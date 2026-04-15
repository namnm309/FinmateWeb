import {
  CarTaxiFront,
  Clapperboard,
  Gamepad2,
  Keyboard,
  Pizza,
  Shirt,
  Utensils,
} from 'lucide-react'

import type { RecentTxRow, TxIconName } from '@/lib/transaction-mapper'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import { cn } from '@/lib/utils'

function TxIcon({ name }: { name: TxIconName }) {
  const cls = 'size-5 text-[#525256]'
  if (name === 'gamepad') return <Gamepad2 className={cls} />
  if (name === 'shirt') return <Shirt className={cls} />
  if (name === 'biryani') return <Utensils className={cls} />
  if (name === 'movie') return <Clapperboard className={cls} />
  if (name === 'taxi') return <CarTaxiFront className={cls} />
  if (name === 'pizza') return <Pizza className={cls} />
  return <Keyboard className={cls} />
}

function TxRow({ tx, last }: { tx: RecentTxRow; last: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-6 py-6',
        !last && 'border-b border-[#f3f3f3]',
      )}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-[rgba(210,210,210,0.25)] p-2">
          <TxIcon name={tx.icon} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-base font-semibold text-[#191919]">{tx.title}</div>
          <div className="truncate text-xs text-[#9f9f9f]">{tx.subtitle}</div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div
          className={cn(
            'text-base font-semibold',
            tx.isIncome ? 'text-[#299D91]' : 'text-[#525256]',
          )}
        >
          {tx.amount}
        </div>
        <div className="text-xs text-[#9f9f9f]">{tx.date}</div>
      </div>
    </div>
  )
}

function TxList({ rows }: { rows: RecentTxRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-[#878787]">
        {'Ch\u01b0a c\u00f3 giao d\u1ecbch.'}
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      {rows.map((tx, idx) => (
        <TxRow key={tx.id} tx={tx} last={idx === rows.length - 1} />
      ))}
    </div>
  )
}

export function FinebankRecentTransactionCard({
  all,
  revenue,
  expenses,
}: {
  all: RecentTxRow[]
  revenue: RecentTxRow[]
  expenses: RecentTxRow[]
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <SectionTitle title="Recent Transaction" href="/dashboard/transactions" />
      <Card className="flex flex-1 flex-col rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardContent className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-4">
          <Tabs defaultValue="all">
            <TabsList className="h-auto rounded-none bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-2 py-2 text-base font-bold text-[#525256] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="revenue"
                className="rounded-none border-b-2 border-transparent px-2 py-2 text-base font-bold text-[#525256] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
              >
                Revenue
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="rounded-none border-b-2 border-transparent px-2 py-2 text-base font-bold text-[#525256] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
              >
                Expenses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-2 flex min-h-0 flex-1">
              <div className="min-h-0 flex-1 overflow-auto pr-1">
                <TxList rows={all} />
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-2 flex min-h-0 flex-1">
              <div className="min-h-0 flex-1 overflow-auto pr-1">
                <TxList rows={revenue} />
              </div>
            </TabsContent>
            <TabsContent value="expenses" className="mt-2 flex min-h-0 flex-1">
              <div className="min-h-0 flex-1 overflow-auto pr-1">
                <TxList rows={expenses} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

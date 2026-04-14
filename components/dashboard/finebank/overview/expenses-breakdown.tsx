import { ArrowDownRight, ArrowUpRight, Home, MoreHorizontal, ShoppingBag, Train, Utensils, Film } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { finebankExpenseBreakdown } from '@/lib/mock/finebank-overview'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import { cn } from '@/lib/utils'

type Row = (typeof finebankExpenseBreakdown)[number]

function IconFor({ id }: { id: Row['id'] }) {
  const cls = 'size-5 text-[#9f9f9f]'
  if (id === 'housing') return <Home className={cls} />
  if (id === 'food') return <Utensils className={cls} />
  if (id === 'transport') return <Train className={cls} />
  if (id === 'entertainment') return <Film className={cls} />
  if (id === 'shopping') return <ShoppingBag className={cls} />
  return <MoreHorizontal className={cls} />
}

export function FinebankExpensesBreakdown() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <SectionTitle title="Expenses Breakdown" />
        <div className="text-xs text-[#878787]">*Compare to last month</div>
      </div>

      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardContent className="p-0">
          <div className="grid divide-y divide-[#f3f3f3] md:grid-cols-3 md:divide-x md:divide-y-0">
            {finebankExpenseBreakdown.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-6 py-6">
                <div className="rounded-lg bg-[#f4f5f7] p-2">
                  <IconFor id={r.id} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-[#878787]">{r.label}</div>
                  <div className="text-base font-semibold text-[#191919]">
                    {r.value}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#878787]">
                    <span>{r.pct}</span>
                    {r.trend === 'up' ? (
                      <ArrowUpRight className="size-3 text-[#E73D1C]" />
                    ) : (
                      <ArrowDownRight className="size-3 text-[#4DAF6E]" />
                    )}
                  </div>
                </div>
                <div className={cn('text-[#d1d1d1]')}>→</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


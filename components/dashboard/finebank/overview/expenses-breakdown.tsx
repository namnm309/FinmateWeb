import { ArrowDownRight, ArrowUpRight, Home, MoreHorizontal, ShoppingBag, Train, Utensils, Film } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import type { ExpenseBreakdownRow, ExpenseBreakdownIconId } from '@/lib/transaction-mapper'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import { cn } from '@/lib/utils'

function IconFor({ id }: { id: ExpenseBreakdownIconId }) {
  const cls = 'size-5 text-[#9f9f9f]'
  if (id === 'housing') return <Home className={cls} />
  if (id === 'food') return <Utensils className={cls} />
  if (id === 'transport') return <Train className={cls} />
  if (id === 'entertainment') return <Film className={cls} />
  if (id === 'shopping') return <ShoppingBag className={cls} />
  return <MoreHorizontal className={cls} />
}

export function FinebankExpensesBreakdown({ rows }: { rows: ExpenseBreakdownRow[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <SectionTitle title={'Ph\u00e2n b\u1ed5 chi ti\u00eau'} />
        <div className="text-xs text-[#878787]">
          {'So v\u1edbi th\u00e1ng tr\u01b0\u1edbc (UTC)'}
        </div>
      </div>

      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-[#878787]">
              {'Ch\u01b0a c\u00f3 chi ti\u00eau trong th\u00e1ng.'}
            </div>
          ) : (
            <div className="grid divide-y divide-[#f3f3f3] md:grid-cols-3 md:divide-x md:divide-y-0">
              {rows.map((r) => (
                <div key={r.id} className="flex items-center gap-4 px-6 py-6">
                  <div className="rounded-lg bg-[#f4f5f7] p-2">
                    <IconFor id={r.iconId} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[#878787]">{r.label}</div>
                    <div className="text-base font-semibold text-[#191919]">{r.value}</div>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

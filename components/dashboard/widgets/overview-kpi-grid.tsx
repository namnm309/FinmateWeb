import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'

import type { Kpi } from '@/lib/mock/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function TrendIcon({ trend }: { trend: Kpi['trend'] }) {
  if (trend === 'up') return <ArrowUpRight className="size-4 text-emerald-400" />
  if (trend === 'down')
    return <ArrowDownRight className="size-4 text-rose-400" />
  return <ArrowRight className="size-4 text-muted-foreground" />
}

export function OverviewKpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => (
        <Card key={kpi.id} className="bg-card/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between gap-4">
            <div className="text-2xl font-semibold tracking-tight">
              {kpi.value}
            </div>
            <div
              className={cn(
                'flex items-center gap-1 rounded-full border px-2 py-1 text-xs',
                kpi.trend === 'up' && 'border-emerald-500/30 bg-emerald-500/10',
                kpi.trend === 'down' && 'border-rose-500/30 bg-rose-500/10',
                kpi.trend === 'flat' && 'border-border bg-muted/30',
              )}
            >
              <TrendIcon trend={kpi.trend} />
              <span
                className={cn(
                  kpi.trend === 'up' && 'text-emerald-200',
                  kpi.trend === 'down' && 'text-rose-200',
                )}
              >
                {kpi.delta}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


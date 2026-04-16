'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { type PremiumOrdersCharts, type PremiumPlanKey } from '@/lib/premium-orders'

const planLabelMap: Record<PremiumPlanKey, string> = {
  '1-month': '1 Tháng',
  '6-month': '6 Tháng',
  '1-year': '1 Năm',
}

export function PremiumOrdersChartsSection({ charts, isLoading }: { charts: PremiumOrdersCharts | null; isLoading?: boolean }) {
  if (isLoading || !charts) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card key={idx} className="bg-card/40">
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-[260px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const ordersData = React.useMemo(() => charts.ordersByDay, [charts.ordersByDay])
  const revenueData = React.useMemo(() => charts.revenueByDay, [charts.revenueByDay])
  const planData = React.useMemo(() => {
    const fillByPlan: Record<PremiumPlanKey, string> = {
      '1-month': 'hsl(var(--chart-1))',
      '6-month': 'hsl(var(--chart-2))',
      '1-year': 'hsl(var(--chart-3))',
    }

    return charts.planBreakdown.map((p) => ({
      plan: p.plan,
      label: planLabelMap[p.plan as PremiumPlanKey] ?? p.plan,
      count: p.count,
      fill: fillByPlan[p.plan as PremiumPlanKey] ?? 'hsl(var(--chart-2))',
    }))
  }, [charts.planBreakdown])

  const ordersConfig = React.useMemo(
    () => ({
      count: { label: 'Số đơn', color: 'hsl(var(--chart-1))' },
    }),
    [],
  )

  const revenueConfig = React.useMemo(
    () => ({
      amountVnd: { label: 'Doanh thu (đ)', color: 'hsl(var(--chart-2))' },
    }),
    [],
  )

  const planConfig = React.useMemo(
    () => ({
      count: { label: 'Số đơn', color: 'hsl(var(--chart-3))' },
    }),
    [],
  )

  const revenueFillId = React.useId().replace(/:/g, '')

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-card/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Đơn Premium (7 ngày)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={ordersConfig} className="h-[260px] w-full">
            <LineChart data={ordersData} margin={{ left: 6, right: 6, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                interval={0}
                tickFormatter={(v) => String(v).slice(5)}
              />
              <YAxis hide />
              <RechartsTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Doanh thu Premium (7 ngày)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={revenueConfig} className="h-[260px] w-full">
            <AreaChart data={revenueData} margin={{ left: 6, right: 6, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                interval={0}
                tickFormatter={(v) => String(v).slice(5)}
              />
              <YAxis hide />
              <RechartsTooltip content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id={`revenueFill-${revenueFillId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-amountVnd)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-amountVnd)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="amountVnd"
                stroke="var(--color-amountVnd)"
                fill={`url(#revenueFill-${revenueFillId})`}
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Phân bổ theo gói</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={planConfig} className="h-[260px] w-full">
            <PieChart>
              <RechartsTooltip content={<ChartTooltipContent />} />
              <Pie
                data={planData}
                dataKey="count"
                nameKey="label"
                innerRadius={55}
                outerRadius={85}
                stroke="transparent"
                strokeWidth={0}
                isAnimationActive={false}
              />
              {planData.map((d) => (
                // Ensure each slice has its own color.
                <Cell key={`${d.label}-${d.plan}`} fill={d.fill} />
              ))}
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}


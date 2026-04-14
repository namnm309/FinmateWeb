'use client'

import * as React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

type Point = { month: string; income: number; spend: number }

const config = {
  income: { label: 'Thu nhập', color: 'hsl(var(--chart-2))' },
  spend: { label: 'Chi tiêu', color: 'hsl(var(--chart-1))' },
}

export function OverviewCashflowChart({ data }: { data: Point[] }) {
  return (
    <Card className="bg-card/40">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Cashflow</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={config} className="h-[260px] w-full">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-spend)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              fill="url(#incomeFill)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="var(--color-spend)"
              fill="url(#spendFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


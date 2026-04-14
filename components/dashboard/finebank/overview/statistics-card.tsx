'use client'

import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { finebankWeeklyComparison } from '@/lib/mock/finebank-overview'

export function FinebankStatisticsCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-normal leading-8 text-[#878787]">
          Statistics
        </div>
      </div>
      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardHeader className="flex-row items-center justify-between pb-0">
          <div className="text-sm font-semibold text-[#191919]">
            Weekly Comparison
          </div>
          <div className="flex items-center gap-6 text-xs text-[#878787]">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-sm bg-[#299D91]" />
              This week
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-sm bg-[#E8E8E8]" />
              Last week
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[240px] w-full">
            <ResponsiveContainer>
              <BarChart
                data={finebankWeeklyComparison}
                margin={{ left: 6, right: 6, top: 10, bottom: 0 }}
                barCategoryGap={16}
              >
                <CartesianGrid vertical={false} stroke="#F3F3F3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#878787', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#878787', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #E8E8E8',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
                  }}
                />
                <Legend wrapperStyle={{ display: 'none' }} />
                <Bar
                  dataKey="lastWeek"
                  fill="#E8E8E8"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={22}
                />
                <Bar
                  dataKey="thisWeek"
                  fill="#299D91"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


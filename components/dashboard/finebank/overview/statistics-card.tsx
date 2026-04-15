'use client'

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export type UserMetricsPoint = {
  label: string
  activeUsers: number
  newUsers: number
  premiumBuyers: number
  fullDate?: string
}

export function FinebankStatisticsCard({
  data,
  rangeMode,
  customRangeText,
  onSelect7Days,
  onSelect30Days,
  onApplyCustomRange,
  onChangeCustomRangeText,
  customRangeError,
}: {
  data: UserMetricsPoint[]
  rangeMode: '7d' | '30d' | 'custom'
  customRangeText: string
  onSelect7Days: () => void
  onSelect30Days: () => void
  onApplyCustomRange: () => void
  onChangeCustomRangeText: (v: string) => void
  customRangeError: string | null
}) {
  const chartData = data.length > 0 ? data : [{ label: '—', activeUsers: 0, newUsers: 0, premiumBuyers: 0, fullDate: '—' }]
  const xTickInterval = chartData.length > 16 ? 2 : chartData.length > 10 ? 1 : 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-normal leading-8 text-[#878787]">{'Th\u1ed1ng k\u00ea'}</div>
      </div>
      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardHeader className="space-y-3 pb-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[#191919]">{'Bi\u1ebfn \u0111\u1ed9ng user theo ng\u00e0y'}</div>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" variant={rangeMode === '7d' ? 'default' : 'outline'} onClick={onSelect7Days}>
                7 ngày
              </Button>
              <Button type="button" size="sm" variant={rangeMode === '30d' ? 'default' : 'outline'} onClick={onSelect30Days}>
                30 ngày
              </Button>
              <div className="flex items-center gap-2">
                <Input
                  value={customRangeText}
                  onChange={(e) => onChangeCustomRangeText(e.target.value)}
                  placeholder="dd/mm/yyyy - dd/mm/yyyy"
                  className="h-9 w-[220px] bg-[#f4f5f7]"
                />
                <Button type="button" size="sm" variant={rangeMode === 'custom' ? 'default' : 'outline'} onClick={onApplyCustomRange}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#878787]">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-sm bg-[#299D91]" />
              {'User đang hoạt động'}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-sm bg-[#3B82F6]" />
              {'User mới'}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-sm bg-[#F59E0B]" />
              {'User mua premium'}
            </div>
          </div>
          {customRangeError ? (
            <p className="text-xs text-destructive">{customRangeError}</p>
          ) : null}
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[320px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ left: 6, right: 6, top: 10, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#F3F3F3" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  interval={xTickInterval}
                  minTickGap={18}
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
                  formatter={(value: number) => [value.toLocaleString('vi-VN'), 'User']}
                  labelFormatter={(_, payload) => {
                    const first = payload?.[0]?.payload as UserMetricsPoint | undefined
                    return first?.fullDate ? `Ngày: ${first.fullDate}` : 'Ngày'
                  }}
                />
                <Line type="monotone" dataKey="activeUsers" stroke="#299D91" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="newUsers" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="premiumBuyers" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-[11px] text-[#878787]">
            {'Số lượng user theo ngày (UTC). Có thể lọc 7 ngày, 30 ngày hoặc khoảng tùy chọn.'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import {
  adminFetchPremiumOrders,
  type AdminPremiumOrderRow,
  type PremiumOrdersCharts,
  type PremiumPlanKey,
} from "@/lib/premium-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

function formatVnd(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v)
}

function parseVndInput(raw: string): number | undefined {
  const digits = raw.replace(/[^\d]/g, "")
  if (!digits) return undefined
  const n = Number(digits)
  if (!Number.isFinite(n)) return undefined
  return n
}

const planLabelMap: Record<PremiumPlanKey, string> = {
  '1-month': '1 Tháng',
  '6-month': '6 Tháng',
  '1-year': '1 Năm',
}

function PremiumOrdersChartsSection({ charts, isLoading }: { charts: PremiumOrdersCharts | null; isLoading?: boolean }) {
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
      amountVnd: { label: 'Doanh thu', color: 'hsl(var(--chart-2))' },
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
              >
                {planData.map((d) => (
                  <Cell key={`${d.label}-${d.plan}`} fill={d.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PremiumOrdersAdminPage() {
  const { getToken } = useAuth()

  const [items, setItems] = React.useState<AdminPremiumOrderRow[] | null>(null)
  const [total, setTotal] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [perPage] = React.useState<number>(20)
  const [status, setStatus] = React.useState<string>("")
  const [plan, setPlan] = React.useState<PremiumPlanKey | "">("")
  const [q, setQ] = React.useState<string>("")
  const [minAmount, setMinAmount] = React.useState<string>("")
  const [maxAmount, setMaxAmount] = React.useState<string>("")

  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [charts, setCharts] = React.useState<PremiumOrdersCharts | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

      const res = await adminFetchPremiumOrders({
        token,
        page,
        perPage,
        status: status || undefined,
        plan: plan || undefined,
        minAmountVnd: parseVndInput(minAmount),
        maxAmountVnd: parseVndInput(maxAmount),
        q: q.trim() || undefined,
      })
      setItems(res.items)
      setTotal(res.total)
      setCharts(res.charts)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setItems(null)
      setTotal(0)
      setCharts(null)
    } finally {
      setLoading(false)
    }
  }, [getToken, maxAmount, minAmount, page, perPage, plan, q, status])

  React.useEffect(() => {
    void load()
  }, [load])

  const pageCount = Math.max(1, Math.ceil(total / perPage))

  return (
    <div className="w-full space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{'\u0110\u01a1n Premium'}</h1>
        <p className="text-sm text-muted-foreground">Theo dõi các đơn nâng cấp nhận qua chuyển khoản/QR (SePay webhook).</p>
      </div>

      <PremiumOrdersChartsSection charts={charts} isLoading={loading} />

      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              value={status}
              onChange={(e) => {
                setPage(1)
                setStatus(e.target.value)
              }}
            >
              <option value="">Tất cả</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="plan">Gói</Label>
            <select
              id="plan"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              value={plan}
              onChange={(e) => {
                setPage(1)
                setPlan(e.target.value)
              }}
            >
              <option value="">Tất cả</option>
              <option value="1-month">1-month</option>
              <option value="6-month">6-month</option>
              <option value="1-year">1-year</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="minAmount">Giá từ (VND)</Label>
            <Input
              id="minAmount"
              inputMode="numeric"
              placeholder="Ví dụ: 99000"
              value={minAmount}
              onChange={(e) => {
                setPage(1)
                setMinAmount(e.target.value)
              }}
            />
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="maxAmount">Giá đến (VND)</Label>
            <Input
              id="maxAmount"
              inputMode="numeric"
              placeholder="Ví dụ: 999000"
              value={maxAmount}
              onChange={(e) => {
                setPage(1)
                setMaxAmount(e.target.value)
              }}
            />
          </div>

          <div className="md:col-span-9 space-y-2">
            <Label htmlFor="q">Tìm kiếm</Label>
            <Input
              id="q"
              placeholder="Email / PaymentCode / ReferenceCode"
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
            />
          </div>
          <div className="md:col-span-3 flex items-end justify-end gap-3">
            <Button variant="outline" onClick={() => void load()} disabled={loading}>
              Làm mới
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Danh sách</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : items && items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-4">Thời gian</th>
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Gói</th>
                    <th className="py-2 pr-4">Số tiền</th>
                    <th className="py-2 pr-4">PaymentCode</th>
                    <th className="py-2 pr-4">Trạng thái</th>
                    <th className="py-2 pr-4">SepayId</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-4 whitespace-nowrap">{row.createdAt}</td>
                      <td className="py-2 pr-4">
                        <div className="truncate max-w-[220px]">{row.userEmail}</div>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.plan}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{formatVnd(row.amountVnd)} đ</td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        <Link href={`/dashboard/premium-orders/${row.id}`} className="text-primary underline underline-offset-4">
                          {row.paymentCode}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.status}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.sepayTransactionId ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Chưa có đơn nào.</div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              Tổng: {total} • Trang {page}/{pageCount}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                disabled={page >= pageCount || loading}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


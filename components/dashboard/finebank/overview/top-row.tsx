'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import {
  fetchAdminDashboardSummary,
  type AdminDashboardSummary,
} from '@/lib/admin-dashboard-summary'

function FinebankSurfaceCard({
  title,
  right,
  children,
}: {
  title: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex min-h-8 items-center justify-between">
        <div className="text-[22px] font-normal leading-8 text-[#878787]">
          {title}
        </div>
        {right}
      </div>
      <Card className="flex flex-1 flex-col rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        {children}
      </Card>
    </div>
  )
}

export function FinebankOverviewTopRow() {
  const { getToken } = useAuth()
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fmtCurrency = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    [],
  )

  const loadSummary = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const token = await getToken()
      if (!token) throw new Error('Thiếu token đăng nhập')

      const data = await fetchAdminDashboardSummary(token)
      setSummary(data)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Không tải được dữ liệu'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void loadSummary()
  }, [loadSummary])

  const totalIncome = summary?.totalSystemIncomeVnd ?? 0
  const customersWithGoals = summary?.customersWithGoals ?? 0
  const expiringAccounts = summary?.premiumExpiringIn5Days ?? 0

  return (
    <div className="grid items-stretch gap-6 xl:grid-cols-3">
      <FinebankSurfaceCard
        title="Tổng thu nhập"
        right={
          <div className="text-xs font-medium text-[#878787]">Toàn hệ thống</div>
        }
      >
        <CardHeader className="pb-0">
          <div className="text-[24px] font-bold leading-7 text-[#191919]">
            {fmtCurrency.format(totalIncome)}
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pt-5">
          <div className="rounded-lg bg-[#299D91] p-4 text-white">
            <div className="text-sm">Thu nhập từ ví + doanh thu Premium đã thanh toán</div>
            <div className="mt-3 text-xs opacity-90">
              {isLoading ? 'Đang tải dữ liệu...' : 'Cập nhật theo dữ liệu thực tế trên hệ thống'}
            </div>
          </div>
          <div className="mt-auto pt-4 text-xs text-[#878787]">
            {error
              ? `Lỗi: ${error}`
              : 'Nguồn: Transactions (thu nhập) + PremiumOrders (Paid)'}
          </div>
        </CardContent>
      </FinebankSurfaceCard>

      <FinebankSurfaceCard
        title="Goal"
        right={<div className="text-xs font-medium text-[#878787]">Đến hiện tại</div>}
      >
        <CardContent className="flex flex-1 flex-col pt-6">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="text-[24px] font-bold leading-7 text-[#191919]">
                {customersWithGoals.toLocaleString('vi-VN')}
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-[#525256]">
                  <span className="text-[#878787]">Số khách hàng đã đặt goal</span>{' '}
                  <span className="font-semibold text-[#191919]">
                    {customersWithGoals.toLocaleString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid size-[120px] place-items-center rounded-full bg-[#f4f5f7]">
              <div className="grid size-[92px] place-items-center rounded-full bg-white shadow-sm">
                <div className="text-center">
                  <div className="text-xs text-[#878787]">Khách hàng</div>
                  <div className="text-sm font-semibold text-[#191919]">
                    {customersWithGoals.toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6 text-xs text-[#878787]">
            Đếm theo số user khác nhau đã tạo goal
          </div>
        </CardContent>
      </FinebankSurfaceCard>

      <div className="flex h-full flex-col gap-4">
        <div className="min-h-8">
          <SectionTitle title="Sắp hết hạn premium" href="/dashboard/bills" />
        </div>
        <Card className="flex flex-1 flex-col rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
          <CardContent className="p-0">
            <div className="divide-y divide-[#f3f3f3]">
              <div className="flex items-center gap-4 px-6 py-5">
                <div className="w-10 shrink-0 text-center">
                  <div className="text-xs text-[#878787]">Còn</div>
                  <div className="text-lg font-semibold text-[#191919]">5</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-[#191919]">
                    Tài khoản premium sắp hết hạn
                  </div>
                  <div className="truncate text-xs text-[#9f9f9f]">
                    Chỉ tính tài khoản còn hạn dưới 5 ngày
                  </div>
                </div>
                <div className="shrink-0 rounded-lg bg-[#f4f5f7] px-3 py-2 text-sm font-semibold text-[#525256]">
                  {expiringAccounts.toLocaleString('vi-VN')}
                </div>
              </div>
              <div className="px-6 py-4 text-xs text-[#878787]">
                {isLoading
                  ? 'Đang tải dữ liệu...'
                  : 'Đếm theo user premium có gói đang active và còn hạn trong 5 ngày tới'}
              </div>
              {error ? (
                <div className="px-6 pb-5 text-xs text-[#d14343]">
                  Không tải được dữ liệu: {error}
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import {
  Crown,
  Users,
  Sparkles,
  MessageCircle,
  LayoutList,
  Tag,
  Banknote,
} from 'lucide-react'

import { fetchAdminDashboardSummary, type AdminDashboardSummary } from '@/lib/admin-dashboard-summary'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'

const t = {
  summaryTitle: 'T\u1ed5ng k\u1ebft Admin',
  loadErr: 'L\u1ed7i t\u1ea3i t\u1ed5ng k\u1ebft',
  noToken: 'Ch\u01b0a c\u00f3 token',
  premiumOrders: '\u0110\u01a1n Premium',
  waitingPay: 'Ch\u1edd thanh to\u00e1n',
  paid: '\u0110\u00e3 tr\u1ea3',
  expiredCancelled: 'H\u1ebft h\u1ea1n / H\u1ee7y',
  totalRows: 'T\u1ed5ng b\u1ea3n ghi',
  revenueTitle: 'Doanh thu Premium (th\u00e1ng UTC)',
  revenueHint:
    'C\u00e1c \u0111\u01a1n tr\u1ea1ng th\u00e1i Paid v\u1edbi paidAt trong th\u00e1ng.',
  usersTitle: 'Ng\u01b0\u1eddi d\u00f9ng',
  totalUsers: 'T\u1ed5ng user',
  premiumUsers: '\u0110ang Premium',
  staffAdmin: 'Staff / Admin',
  aiTitle: 'AI (to\u00e0n h\u1ec7)',
  period: 'K\u1ef3',
  planAi: 'L\u1eadp k\u1ebf ho\u1ea1ch',
  usersWithCalls: 'User c\u00f3 ph\u00e1t sinh l\u01b0\u1ee3t',
  activePlans: 'G\u00f3i hi\u1ec3n th\u1ecb landing \u0111ang b\u1eadt',
  pricingBtn: 'Gi\u00e1 & t\u1ea3i app',
}

function formatVnd(n: number) {
  return `${new Intl.NumberFormat('vi-VN').format(Math.round(n))} \u20ab`
}

export function AdminOverviewSummaryClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [data, setData] = useState<AdminDashboardSummary | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error(t.noToken)
        const s = await fetchAdminDashboardSummary(token)
        if (!cancelled) {
          setData(s)
          setErr(null)
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : t.loadErr)
          setData(null)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded || !isSignedIn) return null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle title={t.summaryTitle} />
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline" className="border-[#299D91] text-[#299D91]">
            <Link href="/dashboard/premium-orders">
              <LayoutList className="mr-2 size-4" />
              {'\u0110\u01a1n Premium'}
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-[#299D91] text-[#299D91]">
            <Link href="/dashboard/pricing">
              <Tag className="mr-2 size-4" />
              {t.pricingBtn}
            </Link>
          </Button>
        </div>
      </div>

      {err ? (
        <p className="text-sm text-destructive">{err}</p>
      ) : !data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                <Crown className="size-4 text-[#299D91]" />
                {t.premiumOrders}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-[#525256]">
              <div className="flex justify-between">
                <span>{t.waitingPay}</span>
                <span className="font-semibold text-[#191919]">{data.premiumOrders.pending}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.paid}</span>
                <span className="font-semibold text-[#299D91]">{data.premiumOrders.paid}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.expiredCancelled}</span>
                <span>
                  {data.premiumOrders.expired} / {data.premiumOrders.cancelled}
                </span>
              </div>
              <div className="border-t border-[#eee] pt-2 text-[11px] text-[#878787]">
                {t.totalRows}: {data.premiumOrders.total}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                <Banknote className="size-4 text-[#299D91]" />
                {t.revenueTitle}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#191919]">
                {formatVnd(data.premiumRevenueVndThisMonth)}
              </div>
              <p className="mt-2 text-xs text-[#878787]">{t.revenueHint}</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                <Users className="size-4 text-[#299D91]" />
                {t.usersTitle}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-[#525256]">
              <div className="flex justify-between">
                <span>{t.totalUsers}</span>
                <span className="font-semibold text-[#191919]">{data.users.total}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.premiumUsers}</span>
                <span className="font-semibold text-[#299D91]">{data.users.premium}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.staffAdmin}</span>
                <span className="font-semibold text-[#191919]">{data.users.staffOrAdmin}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                <Sparkles className="size-4 text-[#299D91]" />
                {t.aiTitle}
              </div>
              <div className="text-[11px] font-normal text-[#878787]">
                {t.period} {data.aiUsage.periodKey}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-[#525256]">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-[#299D91]" />
                  {t.planAi}
                </span>
                <span className="font-semibold text-[#191919]">{data.aiUsage.totalPlanCalls}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3 text-[#299D91]" />
                  Chatbot
                </span>
                <span className="font-semibold text-[#191919]">{data.aiUsage.totalChatCalls}</span>
              </div>
              <div className="border-t border-[#eee] pt-2 text-[11px] text-[#878787]">
                {t.usersWithCalls}: {data.aiUsage.usersWithUsage}
              </div>
              <div className="text-[11px] text-[#878787]">
                {t.activePlans}: {data.premiumPlanConfigsActive}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

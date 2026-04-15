'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Sparkles, MessageCircle } from 'lucide-react'

import { fetchAiUsageOverall, type AiUsageOverall } from '@/lib/ai-usage-overall'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'

/** Chuoi tieng Viet (Unicode escape). */
const TXT_USAGE_SUBTITLE =
  'T\u1ed5ng h\u1ee3p to\u00e0n h\u1ec7 th\u1ed1ng t\u1eeb l\u00fac app ra m\u1eaft \u0111\u1ebfn nay'
const TXT_APP_HINT = 'D\u1eef li\u1ec7u l\u1ea5y t\u1eeb b\u1ea3ng ghi nh\u1eadn l\u01b0\u1ee3t g\u1ecdi AI c\u1ee7a to\u00e0n b\u1ed9 ng\u01b0\u1eddi d\u00f9ng.'

export function AiUsageOverviewClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [data, setData] = useState<AiUsageOverall | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error('Chưa có token đăng nhập')
        const snap = await fetchAiUsageOverall(token)
        if (!cancelled) {
          setData(snap)
          setErr(null)
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : 'Không tải được dữ liệu AI')
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
      <div>
        <SectionTitle title="Sử dụng AI" />
        <p className="mt-1 text-xs text-[#878787]">{TXT_USAGE_SUBTITLE}</p>
      </div>

      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-[#525256]">
              {data ? (
                <>
                  User đã dùng AI:{' '}
                  <span className="font-semibold text-[#191919]">{data.usersWithUsage.toLocaleString('vi-VN')}</span>
                </>
              ) : (
                <Skeleton className="h-4 w-48" />
              )}
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-[#299D91] text-[#299D91] hover:bg-[#299D91]/10"
            >
              <Link href="/dashboard/pricing">Nâng cấp</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {err ? (
            <p className="text-sm text-destructive">{err}</p>
          ) : !data ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg bg-[#f4f5f7] p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                    <Sparkles className="h-4 w-4 text-[#299D91]" />
                    Tổng lượt lập plan
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#191919]">
                    {data.totalPlanCalls.toLocaleString('vi-VN')}
                  </div>
                </div>
                <div className="rounded-lg bg-[#f4f5f7] p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                    <MessageCircle className="h-4 w-4 text-[#299D91]" />
                    Tổng lượt chatbot
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#191919]">
                    {data.totalChatCalls.toLocaleString('vi-VN')}
                  </div>
                </div>
                <div className="rounded-lg bg-[#f4f5f7] p-3">
                  <div className="text-sm font-medium text-[#191919]">Tổng lượt gọi AI</div>
                  <div className="mt-2 text-2xl font-bold text-[#191919]">
                    {data.totalCalls.toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-[#f4f5f7] p-3 text-sm text-[#525256]">
                <span className="font-medium text-[#191919]">
                  User đã từng dùng AI:
                </span>{' '}
                {data.usersWithUsage.toLocaleString('vi-VN')}
              </div>
              <p className="text-xs text-[#878787]">{TXT_APP_HINT}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

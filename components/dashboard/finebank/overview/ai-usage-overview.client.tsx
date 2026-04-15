'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Sparkles, MessageCircle } from 'lucide-react'

import { fetchAiUsage, type AiUsageSnapshot } from '@/lib/ai-usage'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'

function pct(used: number, limit: number) {
  if (limit <= 0) return 0
  return Math.min(100, Math.round((used / limit) * 100))
}

/** Chuoi tieng Viet (Unicode escape). */
const TXT_USAGE_SUBTITLE = 'Theo th\u00e1ng (UTC), \u0111\u1ed3ng b\u1ed9 v\u1edbi Finmate-BE'
const TXT_PERIOD = 'K\u1ef3:'
const TXT_USED = '\u0110\u00e3 d\u00f9ng'
const TXT_APP_HINT =
  '\u1ee8ng d\u1ee5ng g\u1ecdi POST /api/chat k\u00e8m Bearer Clerk v\u00e0 aiFeature "plan" ho\u1eb7c "chat" \u0111\u1ec3 \u0111\u1ebfm \u0111\u00fang lo\u1ea1i.'

export function AiUsageOverviewClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [data, setData] = useState<AiUsageSnapshot | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error('Chưa có token đăng nhập')
        const snap = await fetchAiUsage(token)
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
                  {TXT_PERIOD}{' '}
                  <span className="font-semibold text-[#191919]">{data.periodKey}</span>
                  {data.isPremium ? (
                    <span className="ml-2 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                      Premium
                    </span>
                  ) : (
                    <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      Free
                    </span>
                  )}
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
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                  <Sparkles className="h-4 w-4 text-[#299D91]" />
                  AI lập kế hoạch
                </div>
                <div className="flex justify-between text-xs text-[#878787]">
                  <span>
                    {TXT_USED} {data.planCallsUsed} / {data.planCallsLimit} lượt
                  </span>
                  <span>{pct(data.planCallsUsed, data.planCallsLimit)}%</span>
                </div>
                <Progress value={pct(data.planCallsUsed, data.planCallsLimit)} className="h-2 bg-[#E8F3F1]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#191919]">
                  <MessageCircle className="h-4 w-4 text-[#299D91]" />
                  AI chatbot
                </div>
                <div className="flex justify-between text-xs text-[#878787]">
                  <span>
                    {TXT_USED} {data.chatCallsUsed} / {data.chatCallsLimit} lượt
                  </span>
                  <span>{pct(data.chatCallsUsed, data.chatCallsLimit)}%</span>
                </div>
                <Progress value={pct(data.chatCallsUsed, data.chatCallsLimit)} className="h-2 bg-[#E8F3F1]" />
              </div>
              <p className="text-xs text-[#878787]">{TXT_APP_HINT}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

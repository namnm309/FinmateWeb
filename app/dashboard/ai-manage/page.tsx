'use client'

import * as React from 'react'
import { useAuth } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'

import { fetchAdminAiManage } from '@/lib/admin-ai-manage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'

const t = {
  title: 'Qu\u1ea3n l\u00fd AI',
  subtitle: 'Th\u1ed1ng k\u00ea theo th\u00e1ng (UTC) cho to\u00e0n b\u1ed9 ng\u01b0\u1eddi d\u00f9ng',
  searchPlaceholder: 'T\u00ecm theo email / h\u1ecd t\u00ean...',
  periodPlaceholder: 'K\u1ef3 (yyyy-MM), v\u00ed d\u1ee5: 2026-04',
  refresh: 'T\u1ea3i l\u1ea1i',
  sortChat: 'S\u1eafp x\u1ebfp: Chatbot',
  sortPlan: 'S\u1eafp x\u1ebfp: L\u1eadp plan',
  sortGoals: 'S\u1eafp x\u1ebfp: M\u1ee5c ti\u00eau',
  user: 'Ng\u01b0\u1eddi d\u00f9ng',
  premium: 'Premium',
  chat: 'Chatbot',
  plan: 'L\u1eadp plan',
  goals: 'M\u1ee5c ti\u00eau',
  total: 'T\u1ed5ng',
  empty: 'Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u.',
}

export default function AiManagePage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const [periodKey, setPeriodKey] = React.useState('')
  const [q, setQ] = React.useState('')
  const [sort, setSort] = React.useState<'chat' | 'plan' | 'goals'>('chat')
  const [page, setPage] = React.useState(1)

  const [loading, setLoading] = React.useState(true)
  const [err, setErr] = React.useState<string | null>(null)
  const [data, setData] = React.useState<Awaited<ReturnType<typeof fetchAdminAiManage>> | null>(null)

  const perPage = 25

  const load = React.useCallback(async () => {
    setLoading(true)
    setErr(null)
    try {
      const token = await getToken()
      if (!token) throw new Error('Ch\u01b0a \u0111\u0103ng nh\u1eadp')
      const res = await fetchAdminAiManage({
        token,
        periodKey: periodKey.trim() || undefined,
        q: q.trim() || undefined,
        sort,
        dir: 'desc',
        page,
        perPage,
      })
      setData(res)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c d\u1eef li\u1ec7u')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [getToken, periodKey, q, sort, page])

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    void load()
  }, [isLoaded, isSignedIn, load])

  if (!isLoaded || !isSignedIn) return null

  const summary = data?.summary
  const items = data?.items ?? []
  const hasPrev = page > 1
  const hasNext = (data?.page ?? 1) * (data?.perPage ?? perPage) < (data?.total ?? 0)

  return (
    <div className="w-full space-y-6 px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionTitle title={t.title} />
          <p className="mt-1 text-xs text-[#878787]">{t.subtitle}</p>
        </div>
        <Button
          type="button"
          onClick={() => void load()}
          className="h-10 rounded-md bg-[#299D91] text-white hover:bg-[#299D91]/90"
        >
          {t.refresh}
        </Button>
      </div>

      <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-3">
            <Input
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
              placeholder={t.searchPlaceholder}
              className="h-11 w-[320px] rounded-xl border-0 bg-[#f4f5f7] shadow-none focus-visible:ring-2 focus-visible:ring-[#299D91]"
            />
            <Input
              value={periodKey}
              onChange={(e) => {
                setPage(1)
                setPeriodKey(e.target.value)
              }}
              placeholder={t.periodPlaceholder}
              className="h-11 w-[220px] rounded-xl border-0 bg-[#f4f5f7] shadow-none focus-visible:ring-2 focus-visible:ring-[#299D91]"
            />
            <Button type="button" variant={sort === 'chat' ? 'default' : 'outline'} onClick={() => setSort('chat')}>
              {t.sortChat}
            </Button>
            <Button type="button" variant={sort === 'plan' ? 'default' : 'outline'} onClick={() => setSort('plan')}>
              {t.sortPlan}
            </Button>
            <Button type="button" variant={sort === 'goals' ? 'default' : 'outline'} onClick={() => setSort('goals')}>
              {t.sortGoals}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {err ? <p className="text-sm text-destructive">{err}</p> : null}

          {summary ? (
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-[#f4f5f7] p-3 text-xs">
                <div className="text-[#878787]">K\u1ef3</div>
                <div className="mt-1 font-semibold text-[#191919]">{summary.periodKey}</div>
              </div>
              <div className="rounded-lg bg-[#f4f5f7] p-3 text-xs">
                <div className="text-[#878787]">T\u1ed5ng Chatbot</div>
                <div className="mt-1 flex items-center gap-2 font-semibold text-[#191919]">
                  <Sparkles className="size-4 text-[#299D91]" />
                  {summary.totalChatCalls}
                </div>
              </div>
              <div className="rounded-lg bg-[#f4f5f7] p-3 text-xs">
                <div className="text-[#878787]">T\u1ed5ng l\u1eadp plan</div>
                <div className="mt-1 font-semibold text-[#191919]">{summary.totalPlanCalls}</div>
              </div>
              <div className="rounded-lg bg-[#f4f5f7] p-3 text-xs">
                <div className="text-[#878787]">User c\u00f3 s\u1eed d\u1ee5ng</div>
                <div className="mt-1 font-semibold text-[#191919]">{summary.usersWithUsage}</div>
              </div>
            </div>
          ) : null}

          <div className="overflow-hidden rounded-lg border border-[#f3f3f3]">
            <Table>
              <TableHeader className="[&_tr]:border-b-[#f3f3f3]">
                <TableRow className="border-b-[#f3f3f3] hover:bg-transparent">
                  <TableHead className="h-12 px-6 text-sm font-semibold text-[#191919]">{t.user}</TableHead>
                  <TableHead className="h-12 px-4 text-sm font-semibold text-[#191919]">{t.premium}</TableHead>
                  <TableHead className="h-12 px-4 text-sm font-semibold text-[#191919]">{t.chat}</TableHead>
                  <TableHead className="h-12 px-4 text-sm font-semibold text-[#191919]">{t.plan}</TableHead>
                  <TableHead className="h-12 px-4 text-sm font-semibold text-[#191919]">{t.goals}</TableHead>
                  <TableHead className="h-12 px-6 text-right text-sm font-semibold text-[#191919]">{t.total}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr]:border-b-[#f3f3f3]">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="px-6 py-10 text-center text-sm text-[#878787]">
                      {'\u0110ang t\u1ea3i...'}
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="px-6 py-10 text-center text-sm text-[#878787]">
                      {t.empty}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((r) => (
                    <TableRow key={r.userId} className="hover:bg-[#f4f5f7]/60">
                      <TableCell className="px-6 py-4">
                        <div className="text-sm font-semibold text-[#191919]">{r.fullName || r.email}</div>
                        <div className="text-xs text-[#878787]">{r.email}</div>
                      </TableCell>
                      <TableCell className="px-4 py-4 text-sm text-[#666666]">{r.isPremium ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="px-4 py-4 text-sm text-[#666666]">{r.chatCalls}</TableCell>
                      <TableCell className="px-4 py-4 text-sm text-[#666666]">{r.planCalls}</TableCell>
                      <TableCell className="px-4 py-4 text-sm text-[#666666]">{r.goalsCount}</TableCell>
                      <TableCell className="px-6 py-4 text-right text-sm font-semibold text-[#191919]">
                        {r.chatCalls + r.planCalls}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" disabled={!hasPrev || loading} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              {'Tr\u01b0\u1edbc'}
            </Button>
            <Button type="button" variant="outline" disabled={!hasNext || loading} onClick={() => setPage((p) => p + 1)}>
              {'Sau'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


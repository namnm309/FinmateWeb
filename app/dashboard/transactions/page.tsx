'use client'

import * as React from 'react'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'
import { FinebankTransactionsTable } from '@/components/dashboard/finebank/transactions/transactions-table'
import { fetchTransactions } from '@/lib/transactions-api'
import { mapTransactionToTableRow } from '@/lib/transaction-mapper'
import type { TransactionTableRow } from '@/lib/transaction-mapper'
import {
  TRANSACTION_TYPE_CHI_TIEU_ID,
  TRANSACTION_TYPE_THU_TIEN_ID,
} from '@/lib/finmate-transaction-type-ids'

type TabKey = 'all' | 'revenue' | 'expenses'

export default function TransactionsPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [tab, setTab] = React.useState<TabKey>('all')
  const [page, setPage] = React.useState(1)
  const [rows, setRows] = React.useState<TransactionTableRow[]>([])
  const [hasMore, setHasMore] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [err, setErr] = React.useState<string | null>(null)

  const pageSize = 20

  const typeIdForTab = React.useCallback((t: TabKey) => {
    if (t === 'revenue') return TRANSACTION_TYPE_THU_TIEN_ID
    if (t === 'expenses') return TRANSACTION_TYPE_CHI_TIEU_ID
    return undefined
  }, [])

  const load = React.useCallback(
    async (opts: { token: string; nextPage: number; append: boolean; activeTab: TabKey }) => {
      const tid = typeIdForTab(activeTab)
      const res = await fetchTransactions({
        token: opts.token,
        page: opts.nextPage,
        pageSize,
        transactionTypeId: tid,
      })
      const mapped = res.transactions.map(mapTransactionToTableRow)
      setHasMore(mapped.length === pageSize)
      if (opts.append) setRows((prev) => [...prev, ...mapped])
      else setRows(mapped)
    },
    [pageSize, typeIdForTab],
  )

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    let cancelled = false
    ;(async () => {
      setLoading(true)
      setErr(null)
      try {
        const token = await getToken()
        if (!token) throw new Error('No token')
        await load({ token, nextPage: 1, append: false, activeTab: tab })
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, getToken, tab, load])

  const onTabChange = (v: string) => {
    setTab(v as TabKey)
    setPage(1)
  }

  const onLoadMore = async () => {
    const token = await getToken()
    if (!token || loadingMore || !hasMore) return
    const next = page + 1
    setLoadingMore(true)
    setErr(null)
    try {
      await load({ token, nextPage: next, append: true, activeTab: tab })
      setPage(next)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoadingMore(false)
    }
  }

  if (!isLoaded || !isSignedIn) return null

  return (
    <div className="w-full space-y-5 px-6 py-8">
      <SectionTitle title="Recent Transaction" />

      {err ? <p className="text-sm text-destructive">{err}</p> : null}

      <Tabs value={tab} onValueChange={onTabChange}>
        <TabsList className="h-auto rounded-none bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="rounded-none border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-[#666666] data-[state=active]:border-[#299D91] data-[state=active]:bg-transparent data-[state=active]:text-[#299D91] data-[state=active]:shadow-none"
          >
            Expenses
          </TabsTrigger>
        </TabsList>

        <div className="pt-4">
          <TabsContent value="all" className="m-0">
            {loading ? (
              <p className="text-sm text-[#878787]">Loading...</p>
            ) : (
              <FinebankTransactionsTable rows={rows} />
            )}
          </TabsContent>
          <TabsContent value="revenue" className="m-0">
            {loading ? (
              <p className="text-sm text-[#878787]">Loading...</p>
            ) : (
              <FinebankTransactionsTable rows={rows} />
            )}
          </TabsContent>
          <TabsContent value="expenses" className="m-0">
            {loading ? (
              <p className="text-sm text-[#878787]">Loading...</p>
            ) : (
              <FinebankTransactionsTable rows={rows} />
            )}
          </TabsContent>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="button"
            disabled={loading || loadingMore || !hasMore}
            onClick={onLoadMore}
            className="h-11 w-[140px] rounded-md bg-[#299D91] text-white hover:bg-[#299D91]/90 disabled:opacity-50"
          >
            {loadingMore ? '...' : hasMore ? 'Load More' : 'H\u1ebft d\u1eef li\u1ec7u'}
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

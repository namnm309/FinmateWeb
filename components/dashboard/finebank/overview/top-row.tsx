import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { finebankBills } from '@/lib/mock/finebank-overview'
import { SectionTitle } from '@/components/dashboard/finebank/section-title'

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
  return (
    <div className="grid items-stretch gap-6 xl:grid-cols-3">
      <FinebankSurfaceCard
        title="Total Balance"
        right={
          <div className="text-xs font-medium text-[#878787]">All Accounts</div>
        }
      >
        <CardHeader className="pb-0">
          <div className="text-[24px] font-bold leading-7 text-[#191919]">
            $240,399
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pt-5">
          <div className="rounded-lg bg-[#299D91] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-xs opacity-90">Account Type</div>
                <div className="text-sm font-semibold">Credit Card</div>
                <div className="text-xs opacity-90">**** **** **** 2598</div>
              </div>
              <div className="rounded-md bg-white/15 px-2 py-1 text-xs">
                Mastercard
              </div>
            </div>
            <div className="mt-4 text-right text-sm font-semibold">$25000</div>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 text-xs text-[#878787]">
            <span>&lt; Previous</span>
            <span>Next &gt;</span>
          </div>
        </CardContent>
      </FinebankSurfaceCard>

      <FinebankSurfaceCard
        title="Goals"
        right={<div className="text-xs font-medium text-[#878787]">May, 2023</div>}
      >
        <CardContent className="flex flex-1 flex-col pt-6">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="text-[24px] font-bold leading-7 text-[#191919]">
                $20,000
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-[#525256]">
                  <span className="text-[#878787]">Target Achieved</span>{' '}
                  <span className="font-semibold text-[#191919]">$12,500</span>
                </div>
                <div className="text-[#525256]">
                  <span className="text-[#878787]">This month Target</span>{' '}
                  <span className="font-semibold text-[#191919]">$20,000</span>
                </div>
              </div>
            </div>
            <div className="grid size-[120px] place-items-center rounded-full bg-[#f4f5f7]">
              <div className="grid size-[92px] place-items-center rounded-full bg-white shadow-sm">
                <div className="text-center">
                  <div className="text-xs text-[#878787]">Target</div>
                  <div className="text-sm font-semibold text-[#191919]">12K</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6 text-xs text-[#878787]">
            Target vs Achievement
          </div>
        </CardContent>
      </FinebankSurfaceCard>

      <div className="flex h-full flex-col gap-4">
        <div className="min-h-8">
          <SectionTitle title="Upcoming Bill" href="/dashboard/bills" />
        </div>
        <Card className="flex flex-1 flex-col rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
          <CardContent className="p-0">
            <div className="divide-y divide-[#f3f3f3]">
              {finebankBills.map((b) => (
                <div key={b.id} className="flex items-center gap-4 px-6 py-5">
                  <div className="w-10 shrink-0 text-center">
                    <div className="text-xs text-[#878787]">{b.month}</div>
                    <div className="text-lg font-semibold text-[#191919]">
                      {b.day}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-[#191919]">
                      {b.title}
                    </div>
                    <div className="truncate text-xs text-[#9f9f9f]">
                      {b.subtitle}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-lg bg-[#f4f5f7] px-3 py-2 text-sm font-semibold text-[#525256]">
                    {b.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


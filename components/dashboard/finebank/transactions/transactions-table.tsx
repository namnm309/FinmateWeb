import {
  CarTaxiFront,
  Clapperboard,
  Gamepad2,
  Keyboard,
  Pizza,
  Shirt,
  Utensils,
} from 'lucide-react'

import type { FinebankTransactionRow } from '@/lib/mock/finebank-transactions'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function Icon({ name }: { name: FinebankTransactionRow['icon'] }) {
  const cls = 'size-5 text-[#525256]'
  if (name === 'gamepad') return <Gamepad2 className={cls} />
  if (name === 'shirt') return <Shirt className={cls} />
  if (name === 'biryani') return <Utensils className={cls} />
  if (name === 'movie') return <Clapperboard className={cls} />
  if (name === 'taxi') return <CarTaxiFront className={cls} />
  if (name === 'pizza') return <Pizza className={cls} />
  return <Keyboard className={cls} />
}

export function FinebankTransactionsTable({
  rows,
}: {
  rows: FinebankTransactionRow[]
}) {
  return (
    <Card className="rounded-lg border-0 bg-white shadow-[0_20px_25px_0px_rgba(76,103,100,0.10)]">
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader className="[&_tr]:border-b-[#f3f3f3]">
              <TableRow className="border-b-[#f3f3f3] hover:bg-transparent">
                <TableHead className="h-14 px-8 text-sm font-semibold text-[#191919]">
                  Items
                </TableHead>
                <TableHead className="h-14 px-4 text-sm font-semibold text-[#191919]">
                  Shop Name
                </TableHead>
                <TableHead className="h-14 px-4 text-sm font-semibold text-[#191919]">
                  Date
                </TableHead>
                <TableHead className="h-14 px-4 text-sm font-semibold text-[#191919]">
                  Payment Method
                </TableHead>
                <TableHead className="h-14 px-8 text-right text-sm font-semibold text-[#191919]">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-b-[#f3f3f3]">
              {rows.map((r) => (
                <TableRow key={r.id} className="hover:bg-[#f4f5f7]/60">
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[rgba(210,210,210,0.25)] p-2">
                        <Icon name={r.icon} />
                      </div>
                      <div className="text-sm font-semibold text-[#191919]">
                        {r.item}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-5 text-sm text-[#666666]">
                    {r.shopName}
                  </TableCell>
                  <TableCell className="px-4 py-5 text-sm text-[#666666]">
                    {r.date}
                  </TableCell>
                  <TableCell className="px-4 py-5 text-sm text-[#666666]">
                    {r.paymentMethod}
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right text-sm font-semibold text-[#191919]">
                    {r.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


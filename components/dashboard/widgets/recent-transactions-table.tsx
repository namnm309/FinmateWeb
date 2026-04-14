import type { TransactionRow } from '@/lib/mock/dashboard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

function formatVnd(v: number) {
  const abs = Math.abs(v)
  const sign = v < 0 ? '-' : ''
  return `${sign}₫ ${abs.toLocaleString('vi-VN')}`
}

function StatusBadge({ status }: { status: TransactionRow['status'] }) {
  const variant =
    status === 'Success' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive'

  return (
    <Badge
      variant={variant as never}
      className={cn(
        'rounded-full',
        status === 'Success' && 'bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20',
        status === 'Pending' && 'bg-amber-500/15 text-amber-200 hover:bg-amber-500/20',
        status === 'Failed' && 'bg-rose-500/15 text-rose-200 hover:bg-rose-500/20',
      )}
    >
      {status}
    </Badge>
  )
}

export function RecentTransactionsTable({ rows }: { rows: TransactionRow[] }) {
  return (
    <Card className="bg-card/40">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Recent transactions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.category}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium tabular-nums',
                      r.amountVnd < 0 ? 'text-rose-200' : 'text-emerald-200',
                    )}
                  >
                    {formatVnd(r.amountVnd)}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={r.status} />
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


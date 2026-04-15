import type { TransactionDto } from '@/lib/transactions-api'
import type { CategoryStatDto } from '@/lib/reports-api'

export type TxIconName =
  | 'gamepad'
  | 'shirt'
  | 'biryani'
  | 'movie'
  | 'taxi'
  | 'pizza'
  | 'keyboard'

export type TransactionTableRow = {
  id: string
  item: string
  shopName: string
  date: string
  paymentMethod: string
  amount: string
  icon: TxIconName
}

export type RecentTxRow = {
  id: string
  title: string
  subtitle: string
  amount: string
  date: string
  icon: TxIconName
  isIncome: boolean
}

function formatVndSigned(amount: number, isIncome: boolean) {
  const abs = new Intl.NumberFormat('vi-VN').format(Math.abs(amount))
  const d = '\u0111\u1ed3ng'
  if (isIncome) return `+${abs} ${d}`
  return `-${abs} ${d}`
}

function formatDateLabel(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Gan icon lucide gan dung theo ten / icon category tu BE. */
export function pickTxIcon(tx: TransactionDto): TxIconName {
  const icon = (tx.categoryIcon || '').toLowerCase()
  const cat = (tx.categoryName || '').toLowerCase()
  const desc = (tx.description || '').toLowerCase()

  if (icon.includes('shirt') || cat.includes('quần') || cat.includes('áo') || desc.includes('shirt'))
    return 'shirt'
  if (
    icon.includes('food') ||
    icon.includes('restaurant') ||
    cat.includes('ăn') ||
    cat.includes('food') ||
    cat.includes('nhà hàng')
  )
    return 'biryani'
  if (icon.includes('movie') || cat.includes('phim') || cat.includes('giải trí'))
    return 'movie'
  if (icon.includes('taxi') || cat.includes('uber') || cat.includes('xe') || desc.includes('taxi'))
    return 'taxi'
  if (icon.includes('game') || desc.includes('game') || cat.includes('game'))
    return 'gamepad'
  if (cat.includes('pizza') || desc.includes('pizza')) return 'pizza'
  return 'keyboard'
}

export function mapTransactionToTableRow(tx: TransactionDto): TransactionTableRow {
  const item = (tx.description && tx.description.trim()) || tx.categoryName || 'Giao dịch'
  const shop = tx.contactName?.trim() || tx.moneySourceName || '—'
  return {
    id: tx.id,
    item,
    shopName: shop,
    date: formatDateLabel(tx.transactionDate),
    paymentMethod: tx.moneySourceName || '—',
    amount: formatVndSigned(tx.amount, tx.isIncome),
    icon: pickTxIcon(tx),
  }
}

export function mapTransactionToRecentRow(tx: TransactionDto): RecentTxRow {
  const title = (tx.description && tx.description.trim()) || tx.categoryName || 'Giao dịch'
  const subtitle = tx.contactName?.trim() || tx.moneySourceName || tx.transactionTypeName
  return {
    id: tx.id,
    title,
    subtitle,
    amount: formatVndSigned(tx.amount, tx.isIncome),
    date: formatDateLabel(tx.transactionDate),
    icon: pickTxIcon(tx),
    isIncome: tx.isIncome,
  }
}

export const expenseBreakdownIconIds = [
  'housing',
  'food',
  'transport',
  'entertainment',
  'shopping',
  'others',
] as const

export type ExpenseBreakdownIconId = (typeof expenseBreakdownIconIds)[number]

export type ExpenseBreakdownRow = {
  id: string
  iconId: ExpenseBreakdownIconId
  label: string
  value: string
  pct: string
  trend: 'up' | 'down'
}

function formatVndPlain(n: number) {
  return `${new Intl.NumberFormat('vi-VN').format(Math.round(Math.abs(n)))} \u0111\u1ed3ng`
}

export function buildExpenseBreakdownRows(
  currentStats: CategoryStatDto[],
  prevAmountByCategoryId: Map<string, number>,
): ExpenseBreakdownRow[] {
  const top = [...currentStats].sort((a, b) => Number(b.amount) - Number(a.amount)).slice(0, 6)
  return top.map((c, idx) => {
    const prevAmt = prevAmountByCategoryId.get(c.categoryId) ?? 0
    const amt = Number(c.amount)
    let trend: 'up' | 'down' = 'down'
    if (prevAmt <= 0 && amt > 0) trend = 'up'
    else if (prevAmt > 0) {
      const chg = (amt - prevAmt) / prevAmt
      trend = chg >= 0 ? 'up' : 'down'
    }
    return {
      id: c.categoryId,
      iconId: expenseBreakdownIconIds[Math.min(idx, expenseBreakdownIconIds.length - 1)]!,
      label: c.categoryName,
      value: formatVndPlain(amt),
      pct: `${Math.round(c.percentage)}%`,
      trend,
    }
  })
}

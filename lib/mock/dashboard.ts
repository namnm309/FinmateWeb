export type Kpi = {
  id: string
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'flat'
}

export type TransactionRow = {
  id: string
  name: string
  category: string
  date: string
  amountVnd: number
  status: 'Success' | 'Pending' | 'Failed'
}

export const overviewKpis: Kpi[] = [
  {
    id: 'balance',
    label: 'Tổng số dư',
    value: '₫ 128.450.000',
    delta: '+4.2%',
    trend: 'up',
  },
  {
    id: 'income',
    label: 'Thu nhập (tháng)',
    value: '₫ 52.100.000',
    delta: '+2.1%',
    trend: 'up',
  },
  {
    id: 'spend',
    label: 'Chi tiêu (tháng)',
    value: '₫ 31.780.000',
    delta: '-1.4%',
    trend: 'down',
  },
  {
    id: 'transactions',
    label: 'Giao dịch hôm nay',
    value: '24',
    delta: '+8',
    trend: 'up',
  },
]

export const overviewCashflowSeries = [
  { month: 'T1', income: 42, spend: 28 },
  { month: 'T2', income: 46, spend: 30 },
  { month: 'T3', income: 49, spend: 33 },
  { month: 'T4', income: 52, spend: 31 },
  { month: 'T5', income: 50, spend: 29 },
  { month: 'T6', income: 55, spend: 34 },
]

export const recentTransactions: TransactionRow[] = [
  {
    id: 'tx_1001',
    name: 'Nguyễn Văn A',
    category: 'Nạp ví',
    date: 'Hôm nay • 09:32',
    amountVnd: 2000000,
    status: 'Success',
  },
  {
    id: 'tx_1002',
    name: 'Shopee',
    category: 'Mua sắm',
    date: 'Hôm nay • 10:10',
    amountVnd: -450000,
    status: 'Success',
  },
  {
    id: 'tx_1003',
    name: 'Điện lực',
    category: 'Hóa đơn',
    date: 'Hôm nay • 11:03',
    amountVnd: -820000,
    status: 'Pending',
  },
  {
    id: 'tx_1004',
    name: 'Lương tháng',
    category: 'Thu nhập',
    date: 'Hôm qua • 18:02',
    amountVnd: 18000000,
    status: 'Success',
  },
  {
    id: 'tx_1005',
    name: 'Grab',
    category: 'Di chuyển',
    date: 'Hôm qua • 22:41',
    amountVnd: -128000,
    status: 'Failed',
  },
]


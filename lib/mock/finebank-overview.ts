export type FinebankBill = {
  id: string
  day: string
  month: string
  title: string
  subtitle: string
  amount: string
  brand: 'Figma' | 'Adobe'
}

export type FinebankTx = {
  id: string
  title: string
  subtitle: string
  amount: string
  date: string
  icon: 'gamepad' | 'shirt' | 'biryani' | 'taxi' | 'keyboard'
}

export const finebankBills: FinebankBill[] = [
  {
    id: 'bill-figma',
    day: '15',
    month: 'May',
    brand: 'Figma',
    title: 'Figma - Monthly',
    subtitle: 'Last Charge - 14 May, 2022',
    amount: '$150',
  },
  {
    id: 'bill-adobe',
    day: '16',
    month: 'Jun',
    brand: 'Adobe',
    title: 'Adobe - Yearly',
    subtitle: 'Last Charge - 17 Jun, 2023',
    amount: '$559',
  },
]

export const finebankRecentAll: FinebankTx[] = [
  {
    id: 'tx-1',
    title: 'GTR 5',
    subtitle: 'Gadget & Gear',
    amount: '$160.00',
    date: '17 May 2023',
    icon: 'gamepad',
  },
  {
    id: 'tx-2',
    title: 'Polo Shirt',
    subtitle: 'XL fashions',
    amount: '$20.00',
    date: '17 May 2023',
    icon: 'shirt',
  },
  {
    id: 'tx-3',
    title: 'Biriyani',
    subtitle: 'Haji Biriyani',
    amount: '$10.00',
    date: '17 May 2023',
    icon: 'biryani',
  },
  {
    id: 'tx-4',
    title: 'Taxi Fare',
    subtitle: 'Uber',
    amount: '$12.00',
    date: '17 May 2023',
    icon: 'taxi',
  },
  {
    id: 'tx-5',
    title: 'Keyboard',
    subtitle: 'Gadget & Gear',
    amount: '$22.00',
    date: '17 May 2023',
    icon: 'keyboard',
  },
]

export const finebankRecentRevenue = finebankRecentAll.slice(0, 3)
export const finebankRecentExpenses = finebankRecentAll.slice(2)

export const finebankWeeklyComparison = [
  { day: '17 Sun', thisWeek: 40, lastWeek: 25 },
  { day: '18 Mon', thisWeek: 55, lastWeek: 35 },
  { day: '19 Tue', thisWeek: 30, lastWeek: 45 },
  { day: '20 Wed', thisWeek: 65, lastWeek: 55 },
  { day: '21 Thu', thisWeek: 60, lastWeek: 50 },
  { day: '22 Fri', thisWeek: 70, lastWeek: 20 },
  { day: '23 Sat', thisWeek: 58, lastWeek: 40 },
]

export const finebankExpenseBreakdown = [
  { id: 'housing', label: 'Housing', value: '$250.00', pct: '15%', trend: 'up' as const },
  { id: 'food', label: 'Food', value: '$350.00', pct: '08%', trend: 'down' as const },
  { id: 'transport', label: 'Transportation', value: '$50.00', pct: '12%', trend: 'up' as const },
  { id: 'entertainment', label: 'Entertainment', value: '$80.00', pct: '15%', trend: 'down' as const },
  { id: 'shopping', label: 'Shopping', value: '$420.00', pct: '25%', trend: 'up' as const },
  { id: 'others', label: 'Others', value: '$650.00', pct: '23%', trend: 'up' as const },
]


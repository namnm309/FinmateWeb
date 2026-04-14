import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Banknote,
  FileText,
  LayoutDashboard,
  Tag,
  ReceiptText,
  PiggyBank,
  Settings,
  Crown,
} from 'lucide-react'

export type DashboardNavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const dashboardNav: DashboardNavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Balances', href: '/dashboard/balances', icon: Banknote },
  { label: 'Transactions', href: '/dashboard/transactions', icon: ReceiptText },
  { label: 'Bills', href: '/dashboard/bills', icon: FileText },
  { label: 'Expenses', href: '/dashboard/expenses', icon: ReceiptText },
  { label: 'Goals', href: '/dashboard/goals', icon: PiggyBank },
  { label: 'Pricing', href: '/dashboard/pricing', icon: Tag },
  { label: 'Premium orders', href: '/dashboard/premium-orders', icon: Crown },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]


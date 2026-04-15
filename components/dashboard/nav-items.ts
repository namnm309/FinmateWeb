import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Banknote,
  FileText,
  LayoutDashboard,
  Sparkles,
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
  { label: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Số dư', href: '/dashboard/balances', icon: Banknote },
  { label: 'Giao dịch', href: '/dashboard/transactions', icon: ReceiptText },
  { label: 'Hóa đơn', href: '/dashboard/bills', icon: FileText },
  { label: 'Chi tiêu', href: '/dashboard/expenses', icon: ReceiptText },
  { label: 'Mục tiêu', href: '/dashboard/goals', icon: PiggyBank },
  { label: 'Giá & gói', href: '/dashboard/pricing', icon: Tag },
  { label: 'Quản lý AI', href: '/dashboard/ai-manage', icon: Sparkles },
  { label: 'Đơn Premium', href: '/dashboard/premium-orders', icon: Crown },
  { label: 'Cài đặt', href: '/dashboard/settings', icon: Settings },
]


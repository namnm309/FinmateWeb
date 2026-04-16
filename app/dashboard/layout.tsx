import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { assertStaffOrAdmin } from '@/lib/be'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getToken } = await auth()
  const token = await getToken()

  if (!token) {
    redirect('/sign-in')
  }

  try {
    await assertStaffOrAdmin(token)
  } catch {
    redirect('/')
  }

  return <DashboardShell>{children}</DashboardShell>
}


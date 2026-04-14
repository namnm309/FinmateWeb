import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { assertStaffOrAdmin } from '@/lib/be'

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
    redirect('/debug-auth')
  }

  return <div className="min-h-svh bg-background">{children}</div>
}


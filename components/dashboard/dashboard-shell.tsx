'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { dashboardNav } from '@/components/dashboard/nav-items'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

function formatInitials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join('')
}

function formatTodayLikeFinmate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useUser()
  const todayLabel = React.useMemo(() => formatTodayLikeFinmate(new Date()), [])

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.primaryEmailAddress?.emailAddress ||
    'Admin'
  const displayEmail = user?.primaryEmailAddress?.emailAddress ?? ''

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="bg-[#191919] text-white"
      >
        <SidebarHeader className="gap-4 p-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="text-xl font-semibold tracking-wide">Finmate</div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/50">Menu</SidebarGroupLabel>
            <SidebarMenu>
              {dashboardNav.map((item) => {
                const active =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname?.startsWith(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className={cn(
                        'h-11 rounded-lg px-4 text-white/70 hover:bg-white/5 hover:text-white',
                        active && 'bg-[#299D91] text-white hover:bg-[#299D91]',
                      )}
                    >
                      <Link href={item.href} className="gap-3">
                        <Icon className="size-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-6 pt-3">
          <Separator className="mb-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-2 text-white hover:bg-white/5 hover:text-white"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs">{formatInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="truncate text-sm font-semibold">{displayName}</div>
                    <div className="truncate text-xs text-white/50">
                      {displayEmail || '—'}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">{'C\u00e0i \u0111\u1eb7t'}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">Về landing</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="finmate bg-[#f4f5f7] text-[#191919]">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#e8e8e8] bg-[#f4f5f7]/80 px-6 py-5 backdrop-blur supports-[backdrop-filter]:bg-[#f4f5f7]/60">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold leading-7">
              {'Xin ch\u00e0o '}{displayName.split(/\s+/)[0] ?? displayName}
            </div>
            <div className="text-sm text-[#9f9f9f]">{todayLabel}</div>
          </div>

          <div className="flex items-center gap-10">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="text-[#191919] hover:bg-black/5"
            >
              <Bell className="size-5" />
            </Button>
            <div className="relative">
              <Input
                placeholder={'T\u00ecm ki\u1ebfm...'}
                aria-label="Tim kiem"
                className="h-12 w-[260px] rounded-xl border-0 bg-white pl-5 pr-12 text-base shadow-[0_26px_26px_0px_rgba(106,22,58,0.04)] placeholder:text-[#9f9f9f] focus-visible:ring-2 focus-visible:ring-[#299D91]"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#9f9f9f]" />
            </div>
          </div>
        </header>

        <div className={cn('min-h-[calc(100svh-56px)]')}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}


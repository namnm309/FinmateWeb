"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth, useClerk } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Link from "next/link" // Import Link for client-side navigation

type HeaderProps = {
  showDashboardButton?: boolean
}

export function Header({ showDashboardButton = false }: HeaderProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const signOutInFlightRef = useRef(false)

  /**
   * Xóa session Clerk trước, rồi `location.replace` full page tới /sign-in.
   * Tránh `signOut({ redirectUrl })` (soft nav): nếu cookie còn sót, `<SignIn />` thấy vẫn đăng nhập → tự redirect như “tự login”.
   */
  const handleSignOut = useCallback(async () => {
    if (signOutInFlightRef.current) return
    signOutInFlightRef.current = true
    setSigningOut(true)
    try {
      await signOut()
    } catch {
      /* vẫn ép điều hướng */
    }
    window.location.replace("/sign-in")
  }, [signOut])

  const navItems = [
    { name: "Tính năng", href: "#features-section" },
    { name: "Gói cước", href: "#pricing-section" },
    { name: "Đánh giá", href: "#testimonials-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#' from href
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="relative z-[110] w-full py-5 md:py-6 px-4 sm:px-6 md:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-7 md:gap-8">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image 
              src="/finmate-logo.png" 
              alt="Logo FinMate" 
              width={40} 
              height={40}
              className="w-9 h-9 md:w-10 md:h-10"
            />
            <span className="text-foreground text-2xl md:text-[28px] font-semibold hidden sm:inline">FinMate</span>
          </Link>
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)} // Add onClick handler
                className="text-[#888888] hover:text-foreground px-5 py-2.5 rounded-full text-base lg:text-lg font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {showDashboardButton ? (
            <Link href="/dashboard" className="hidden md:block">
              <Button
                variant="outline"
                className="px-7 h-12 rounded-full text-base lg:text-lg font-medium shadow-sm"
              >
                Vào dashboard
              </Button>
            </Link>
          ) : null}
          {isLoaded && !isSignedIn ? (
            <Button
              type="button"
              variant="outline"
              className="hidden md:inline-flex px-5 h-12 rounded-full text-base lg:text-lg font-medium"
              onClick={() => router.push("/sign-in")}
            >
              Đăng nhập
            </Button>
          ) : null}
          {isLoaded && isSignedIn ? (
            <Button
              type="button"
              variant="ghost"
              disabled={signingOut}
              className="hidden md:inline-flex cursor-pointer px-5 h-12 rounded-full text-base lg:text-lg font-medium disabled:opacity-60"
              onClick={() => void handleSignOut()}
            >
              {signingOut ? "Đang đăng xuất…" : "Đăng xuất"}
            </Button>
          ) : null}
          <Link href="#pricing-section" onClick={(e) => handleScroll(e, "#pricing-section")} className="hidden md:block">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 h-12 rounded-full text-base lg:text-lg font-medium shadow-sm">
              Nâng Cấp Gói
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground h-11 w-11">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Mở menu điều hướng</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Điều hướng</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)} // Add onClick handler
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-3"
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoaded && !isSignedIn ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2 rounded-full font-medium"
                    onClick={() => router.push("/sign-in")}
                  >
                    Đăng nhập
                  </Button>
                ) : null}
                {isLoaded && isSignedIn ? (
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={signingOut}
                    className="w-full mt-2 cursor-pointer rounded-full font-medium disabled:opacity-60"
                    onClick={() => void handleSignOut()}
                  >
                    {signingOut ? "Đang đăng xuất…" : "Đăng xuất"}
                  </Button>
                ) : null}
                <Link href="#pricing-section" onClick={(e) => handleScroll(e, "#pricing-section")} className="w-full mt-4">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm">
                    Nâng Cấp Gói
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

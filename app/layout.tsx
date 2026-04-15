import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinMate - Quản lý tài chính thông minh với AI',
  description: 'FinMate giúp bạn quản lý tài chính, theo dõi chi tiêu và đặt mục tiêu tiết kiệm với sự hỗ trợ của AI.',
  generator: 'v0.app',
  icons: {
    icon: '/finmate-logo.png',
    apple: '/finmate-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="vi" suppressHydrationWarning>
        <body className={`${geist.className} ${geistMono.className} antialiased`} suppressHydrationWarning>
          {children}
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}

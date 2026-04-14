import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
        <body className="font-sans antialiased" suppressHydrationWarning>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}

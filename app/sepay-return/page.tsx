"use client"

import * as React from "react"
import { Suspense } from "react"
import SepayReturnClient from "./sepay-return-client"
import { useRouter } from "next/navigation"

export default function SepayReturnPage() {
  const router = useRouter()
  React.useEffect(() => {
    router.replace("/", { scroll: false })
  }, [router])

  return (
    <Suspense fallback={<div className="p-6 md:p-10 text-sm text-muted-foreground">Đang tải...</div>}>
      <SepayReturnClient />
    </Suspense>
  )
}


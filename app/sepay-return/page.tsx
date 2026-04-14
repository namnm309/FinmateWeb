"use client"

import * as React from "react"
import { Suspense } from "react"
import SepayReturnClient from "./sepay-return-client"

export default function SepayReturnPage() {
  return (
    <Suspense fallback={<div className="p-6 md:p-10 text-sm text-muted-foreground">Đang tải...</div>}>
      <SepayReturnClient />
    </Suspense>
  )
}


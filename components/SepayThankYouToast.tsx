"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function SepayThankYouToast() {
  const sp = useSearchParams()
  const router = useRouter()

  React.useEffect(() => {
    const payment = sp.get("payment")
    if (!payment) return

    if (payment === "success") {
      toast.success("Cảm ơn bạn đã nâng cấp!", {
        description: "Thanh toán đã được ghi nhận. Chúc bạn sử dụng FinMate hiệu quả.",
        duration: 5000,
      })
    } else if (payment === "cancel") {
      toast.message("Bạn đã hủy thanh toán.", { duration: 4000 })
    } else if (payment === "error") {
      toast.error("Thanh toán chưa thành công.", { duration: 5000 })
    }

    // Clean URL so toast doesn't repeat on refresh.
    router.replace("/", { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}


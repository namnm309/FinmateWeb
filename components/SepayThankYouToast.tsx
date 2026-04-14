"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { fetchAppDownloadConfig } from "@/lib/app-download-config"
import { fetchPremiumOrder } from "@/lib/premium-orders"

export default function SepayThankYouToast() {
  const sp = useSearchParams()
  const router = useRouter()
  const { isLoaded, isSignedIn, getToken } = useAuth()

  const [open, setOpen] = React.useState(false)
  const [statusText, setStatusText] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)
  const [iosUrl, setIosUrl] = React.useState<string | null>(null)
  const [androidUrl, setAndroidUrl] = React.useState<string | null>(null)

  const payment = sp.get("payment")
  const orderId = sp.get("orderId")

  React.useEffect(() => {
    if (!payment) return

    // Always clean URL so popup doesn't repeat on refresh.
    router.replace("/", { scroll: false })

    if (payment === "cancel") {
      setStatusText("Bạn đã hủy thanh toán.")
      setOpen(true)
      return
    }

    if (payment === "error") {
      setStatusText("Thanh toán chưa thành công.")
      setOpen(true)
      return
    }

    if (payment !== "success") return

    setOpen(true)
    setError(null)
    setStatusText("Đang xác nhận thanh toán...")

    let cancelled = false
    const run = async () => {
      try {
        if (!orderId) throw new Error("Thiếu orderId.")
        if (!isLoaded) return
        if (!isSignedIn) throw new Error("Vui lòng đăng nhập để xác nhận thanh toán.")

        const token = await getToken()
        if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

        const startedAt = Date.now()
        const timeoutMs = 60_000
        while (!cancelled) {
          const order = await fetchPremiumOrder({ token, id: orderId })
          if (order.status === "Paid") break
          if (order.status === "Expired" || order.status === "Cancelled") {
            throw new Error(`Đơn đã chuyển trạng thái: ${order.status}`)
          }
          if (Date.now() - startedAt > timeoutMs) {
            throw new Error("Hệ thống chưa xác nhận thanh toán (timeout). Vui lòng thử lại sau vài giây.")
          }
          await new Promise((r) => setTimeout(r, 2500))
        }

        if (cancelled) return

        const cfg = await fetchAppDownloadConfig()
        setIosUrl(cfg.iosUrl)
        setAndroidUrl(cfg.androidUrl)
        setStatusText("Thanh toán thành công. Bạn có thể tải ứng dụng tại đây.")
      } catch (e: unknown) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : String(e))
        setStatusText("Không thể xác nhận thanh toán.")
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [getToken, isLoaded, isSignedIn, orderId, payment, router])

  if (!payment) return null

  const hasDownload = Boolean(iosUrl || androidUrl)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {payment === "success" ? "Kết quả thanh toán" : payment === "cancel" ? "Đã hủy thanh toán" : "Thanh toán lỗi"}
          </DialogTitle>
          <DialogDescription>{statusText}</DialogDescription>
        </DialogHeader>

        {error ? <div className="text-sm text-destructive">{error}</div> : null}

        {payment === "success" && hasDownload ? (
          <div className="grid gap-3">
            {iosUrl ? (
              <Button asChild className="w-full">
                <a href={iosUrl} target="_blank" rel="noopener noreferrer">
                  Tải xuống iOS
                </a>
              </Button>
            ) : null}
            {androidUrl ? (
              <Button asChild variant="secondary" className="w-full">
                <a href={androidUrl} target="_blank" rel="noopener noreferrer">
                  Tải xuống Android
                </a>
              </Button>
            ) : null}
            {!iosUrl && !androidUrl ? (
              <div className="text-xs text-muted-foreground">Admin chưa cấu hình link tải xuống.</div>
            ) : null}
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


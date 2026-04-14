"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { fetchPremiumOrder, type PremiumOrderCheckout } from "@/lib/premium-orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function buildQrUrl(input: { bank: string; acc: string; amount: number; des: string }) {
  const params = new URLSearchParams()
  params.set("acc", input.acc)
  params.set("bank", input.bank)
  params.set("amount", String(Math.trunc(input.amount)))
  params.set("des", input.des)
  params.set("template", "compact")
  return `https://qr.sepay.vn/img?${params.toString()}`
}

export default function PremiumCheckoutPage({ params }: { params: { orderId: string } }) {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const router = useRouter()

  const [order, setOrder] = React.useState<PremiumOrderCheckout | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  const load = React.useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      if (!isLoaded) return
      if (!isSignedIn) {
        router.push("/sign-in")
        return
      }

      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

      const data = await fetchPremiumOrder({ token, id: params.orderId })
      setOrder(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }, [getToken, isLoaded, isSignedIn, params.orderId, router])

  React.useEffect(() => {
    void load()
  }, [load])

  React.useEffect(() => {
    if (!order) return
    if (order.status === "Paid" || order.status === "Expired" || order.status === "Cancelled") return

    const t = window.setInterval(() => {
      void load()
    }, 3000)
    return () => window.clearInterval(t)
  }, [order, load])

  const qrUrl =
    order?.qrBank && order?.qrAccountNumber
      ? buildQrUrl({
          bank: order.qrBank,
          acc: order.qrAccountNumber,
          amount: order.amountVnd,
          des: order.paymentCode,
        })
      : null

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Thanh toán nâng cấp</h1>
        <p className="text-sm text-muted-foreground">
          Quét QR để chuyển khoản. Hệ thống sẽ tự cập nhật khi nhận webhook từ SePay.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trạng thái đơn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : order ? (
            <div className="grid gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Mã đơn:</span> {order.id}
              </div>
              <div>
                <span className="text-muted-foreground">Gói:</span> {order.plan}
              </div>
              <div>
                <span className="text-muted-foreground">Số tiền:</span>{" "}
                {new Intl.NumberFormat("vi-VN").format(order.amountVnd)} đ
              </div>
              <div>
                <span className="text-muted-foreground">Nội dung chuyển khoản:</span>{" "}
                <span className="font-semibold">{order.paymentCode}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái:</span>{" "}
                <span className="font-semibold">{order.status}</span>
              </div>
              {order.paidAt ? (
                <div>
                  <span className="text-muted-foreground">Đã thanh toán lúc:</span> {order.paidAt}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" onClick={() => void load()}>
              Làm mới
            </Button>
            <Button variant="ghost" onClick={() => router.push("/")}>
              Về landing
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">QR chuyển khoản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qrUrl ? (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="QR chuyển khoản"
                className="w-full max-w-[360px] rounded-lg border bg-white p-2"
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Chưa cấu hình `SEPAY_QR_BANK` / `SEPAY_QR_ACC` ở backend.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Lưu ý: nội dung chuyển khoản nên đúng <span className="font-semibold">{order?.paymentCode ?? "..."}</span> để hệ thống
            tự đối soát.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

import { fetchPremiumOrder, type PremiumOrderCheckout } from "@/lib/premium-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SepayReturnClient() {
  const sp = useSearchParams()
  const orderId = sp.get("orderId")
  const result = sp.get("result")

  const { isLoaded, isSignedIn, getToken } = useAuth()

  const [order, setOrder] = React.useState<PremiumOrderCheckout | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const run = async () => {
      setError(null)
      if (!orderId) return
      if (!isLoaded) return
      if (!isSignedIn) return
      setLoading(true)
      try {
        const token = await getToken()
        if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")
        const data = await fetchPremiumOrder({ token, id: orderId })
        setOrder(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e))
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }
    void run()
  }, [getToken, isLoaded, isSignedIn, orderId])

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Kết quả thanh toán</h1>
        <p className="text-sm text-muted-foreground">
          SePay đã chuyển hướng về hệ thống. Kết quả cuối cùng sẽ được xác nhận bằng IPN.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">result:</span> {result ?? "-"}
          </div>
          <div>
            <span className="text-muted-foreground">orderId:</span> {orderId ?? "-"}
          </div>

          {loading ? <div className="text-muted-foreground">Đang tải trạng thái...</div> : null}
          {error ? <div className="text-destructive">{error}</div> : null}
          {order ? (
            <div className="rounded-md border p-3">
              <div>
                <span className="text-muted-foreground">status:</span>{" "}
                <span className="font-semibold">{order.status}</span>
              </div>
              <div>
                <span className="text-muted-foreground">paymentCode:</span>{" "}
                <span className="font-semibold">{order.paymentCode}</span>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3 pt-2">
            <Button asChild>
              <Link href={orderId ? `/checkout/premium/${orderId}` : "/"}>Theo dõi đơn</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Về landing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


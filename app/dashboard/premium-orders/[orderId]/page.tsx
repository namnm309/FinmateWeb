"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { adminFetchPremiumOrderDetail, type AdminPremiumOrderRow } from "@/lib/premium-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function formatVnd(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v)
}

export default function PremiumOrderDetailPage({ params }: { params: { orderId: string } }) {
  const { getToken } = useAuth()

  const [item, setItem] = React.useState<AdminPremiumOrderRow | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")
      const res = await adminFetchPremiumOrderDetail({ token, id: params.orderId })
      setItem(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setItem(null)
    } finally {
      setLoading(false)
    }
  }, [getToken, params.orderId])

  React.useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="w-full space-y-6 px-6 py-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Chi tiết đơn</h1>
          <p className="text-sm text-muted-foreground">Đơn nâng cấp premium nhận qua webhook SePay.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            Làm mới
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/premium-orders">Về danh sách</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Thông tin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : item ? (
            <div className="grid gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">OrderId:</span> {item.id}
              </div>
              <div>
                <span className="text-muted-foreground">User:</span> {item.userEmail} ({item.userId})
              </div>
              <div>
                <span className="text-muted-foreground">Plan:</span> {item.plan}
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span> {formatVnd(item.amountVnd)} đ
              </div>
              <div>
                <span className="text-muted-foreground">PaymentCode:</span> {item.paymentCode}
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span> {item.status}
              </div>
              <div>
                <span className="text-muted-foreground">CreatedAt:</span> {item.createdAt}
              </div>
              <div>
                <span className="text-muted-foreground">ExpiresAt:</span> {item.expiresAt}
              </div>
              {item.paidAt ? (
                <div>
                  <span className="text-muted-foreground">PaidAt:</span> {item.paidAt}
                </div>
              ) : null}
              <div>
                <span className="text-muted-foreground">SepayTransactionId:</span> {item.sepayTransactionId ?? "-"}
              </div>
              <div>
                <span className="text-muted-foreground">ReferenceCode:</span> {item.referenceCode ?? "-"}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}


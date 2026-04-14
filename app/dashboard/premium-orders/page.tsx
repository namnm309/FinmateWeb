"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { adminFetchPremiumOrders, type AdminPremiumOrderRow } from "@/lib/premium-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function formatVnd(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v)
}

export default function PremiumOrdersAdminPage() {
  const { getToken } = useAuth()

  const [items, setItems] = React.useState<AdminPremiumOrderRow[] | null>(null)
  const [total, setTotal] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [perPage] = React.useState<number>(20)
  const [status, setStatus] = React.useState<string>("")
  const [q, setQ] = React.useState<string>("")

  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

      const res = await adminFetchPremiumOrders({
        token,
        page,
        perPage,
        status: status || undefined,
        q: q.trim() || undefined,
      })
      setItems(res.items)
      setTotal(res.total)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setItems(null)
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [getToken, page, perPage, q, status])

  React.useEffect(() => {
    void load()
  }, [load])

  const pageCount = Math.max(1, Math.ceil(total / perPage))

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Premium orders</h1>
        <p className="text-sm text-muted-foreground">Theo dõi các đơn nâng cấp nhận qua chuyển khoản/QR (SePay webhook).</p>
      </div>

      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              value={status}
              onChange={(e) => {
                setPage(1)
                setStatus(e.target.value)
              }}
            >
              <option value="">Tất cả</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="md:col-span-6 space-y-2">
            <Label htmlFor="q">Tìm kiếm</Label>
            <Input
              id="q"
              placeholder="Email / PaymentCode / ReferenceCode"
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
            />
          </div>
          <div className="md:col-span-3 flex items-end justify-end gap-3">
            <Button variant="outline" onClick={() => void load()} disabled={loading}>
              Làm mới
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Danh sách</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : items && items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-4">Thời gian</th>
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Gói</th>
                    <th className="py-2 pr-4">Số tiền</th>
                    <th className="py-2 pr-4">PaymentCode</th>
                    <th className="py-2 pr-4">Trạng thái</th>
                    <th className="py-2 pr-4">SepayId</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-4 whitespace-nowrap">{row.createdAt}</td>
                      <td className="py-2 pr-4">
                        <div className="truncate max-w-[220px]">{row.userEmail}</div>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.plan}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{formatVnd(row.amountVnd)} đ</td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        <Link href={`/dashboard/premium-orders/${row.id}`} className="text-primary underline underline-offset-4">
                          {row.paymentCode}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.status}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{row.sepayTransactionId ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Chưa có đơn nào.</div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              Tổng: {total} • Trang {page}/{pageCount}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                disabled={page >= pageCount || loading}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { upsertPremiumPlanConfigs, fetchPremiumPlanConfigs, type PremiumPlanConfig } from "@/lib/premium-plan-configs"
import { adminUpsertAppDownloadConfig, fetchAppDownloadConfig } from "@/lib/app-download-config"

type EditablePlan = {
  plan: PremiumPlanConfig["plan"]
  label: string
  priceVnd: string
  originalPriceVnd: string
  discountPercent: string
  isActive: boolean
}

function toEditable(configs: PremiumPlanConfig[]): EditablePlan[] {
  const byPlan = new Map(configs.map((c) => [c.plan, c]))
  const order: Array<{ plan: PremiumPlanConfig["plan"]; label: string }> = [
    { plan: "1-month", label: "1 Tháng" },
    { plan: "6-month", label: "6 Tháng" },
    { plan: "1-year", label: "1 Năm" },
  ]

  return order.map(({ plan, label }) => {
    const c = byPlan.get(plan)
    return {
      plan,
      label,
      priceVnd: String(c?.priceVnd ?? ""),
      originalPriceVnd: c?.originalPriceVnd == null ? "" : String(c.originalPriceVnd),
      discountPercent: c?.discountPercent == null ? "" : String(c.discountPercent),
      isActive: c?.isActive ?? true,
    }
  })
}

function parseIntOrNull(v: string): number | null {
  const s = v.trim()
  if (!s) return null
  const n = Number(s)
  if (!Number.isFinite(n)) return null
  return Math.trunc(n)
}

function parseDecimalOrNull(v: string): number | null {
  const s = v.trim()
  if (!s) return null
  const n = Number(s)
  if (!Number.isFinite(n)) return null
  return n
}

export default function DashboardPricingPage() {
  const { getToken } = useAuth()

  const [plans, setPlans] = React.useState<EditablePlan[] | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const [downloadIosUrl, setDownloadIosUrl] = React.useState<string>("")
  const [downloadAndroidUrl, setDownloadAndroidUrl] = React.useState<string>("")
  const [downloadSaving, setDownloadSaving] = React.useState(false)
  const [downloadLoading, setDownloadLoading] = React.useState(true)
  const [downloadError, setDownloadError] = React.useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchPremiumPlanConfigs()
      .then((cfgs) => {
        if (!mounted) return
        setPlans(toEditable(cfgs))
        setError(null)
      })
      .catch((e: unknown) => {
        if (!mounted) return
        setError(e instanceof Error ? e.message : String(e))
        setPlans(null)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  React.useEffect(() => {
    let mounted = true
    setDownloadLoading(true)
    fetchAppDownloadConfig()
      .then((cfg) => {
        if (!mounted) return
        setDownloadIosUrl(cfg.iosUrl ?? "")
        setDownloadAndroidUrl(cfg.androidUrl ?? "")
        setDownloadError(null)
      })
      .catch((e: unknown) => {
        if (!mounted) return
        setDownloadError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!mounted) return
        setDownloadLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const onSave = async () => {
    setSuccess(null)
    setError(null)
    setSaving(true)
    try {
      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")
      if (!plans) throw new Error("Chưa có dữ liệu plan để lưu.")

      const items = plans.map((p) => {
        const price = parseDecimalOrNull(p.priceVnd)
        if (price == null) throw new Error(`Giá không hợp lệ cho gói ${p.label}`)
        const original = parseDecimalOrNull(p.originalPriceVnd)
        const discount = parseIntOrNull(p.discountPercent)

        return {
          plan: p.plan,
          priceVnd: price,
          originalPriceVnd: original,
          discountPercent: discount,
          isActive: p.isActive,
        }
      })

      const updated = await upsertPremiumPlanConfigs({ token, items })
      setPlans(toEditable(updated))
      setSuccess("Đã lưu thành công.")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setSaving(false)
    }
  }

  const onSaveDownloadLinks = async () => {
    setDownloadSuccess(null)
    setDownloadError(null)
    setDownloadSaving(true)
    try {
      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

      const updated = await adminUpsertAppDownloadConfig({
        token,
        iosUrl: downloadIosUrl,
        androidUrl: downloadAndroidUrl,
      })

      setDownloadIosUrl(updated.iosUrl ?? "")
      setDownloadAndroidUrl(updated.androidUrl ?? "")
      setDownloadSuccess("Đã lưu link tải xuống.")
    } catch (e: unknown) {
      setDownloadError(e instanceof Error ? e.message : String(e))
    } finally {
      setDownloadSaving(false)
    }
  }

  return (
    <div className="w-full space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{'Gi\u00e1 & g\u00f3i Premium'}</h1>
        <p className="text-sm text-muted-foreground">
          Chỉnh giá hiển thị ở landing page (section “Nâng cấp tài khoản”). Chỉ Staff/Admin mới vào được.
        </p>
      </div>

      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{'C\u1ea5u h\u00ecnh g\u00f3i Premium'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          ) : plans ? (
            <div className="space-y-4">
              {plans.map((p, idx) => (
                <div key={p.plan} className="grid gap-4 rounded-lg border p-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <div className="text-sm font-semibold">Cao cấp</div>
                    <div className="text-xs text-muted-foreground">{p.label}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Switch
                        checked={p.isActive}
                        onCheckedChange={(v) => {
                          setPlans((prev) => {
                            if (!prev) return prev
                            const next = [...prev]
                            next[idx] = { ...next[idx], isActive: v }
                            return next
                          })
                        }}
                      />
                      <span className="text-xs text-muted-foreground">Hiển thị</span>
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`price-${p.plan}`}>Giá (VND)</Label>
                    <Input
                      id={`price-${p.plan}`}
                      inputMode="numeric"
                      value={p.priceVnd}
                      onChange={(e) => {
                        const v = e.target.value
                        setPlans((prev) => {
                          if (!prev) return prev
                          const next = [...prev]
                          next[idx] = { ...next[idx], priceVnd: v }
                          return next
                        })
                      }}
                      placeholder="Ví dụ: 389000"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`original-${p.plan}`}>Giá gốc (VND, optional)</Label>
                    <Input
                      id={`original-${p.plan}`}
                      inputMode="numeric"
                      value={p.originalPriceVnd}
                      onChange={(e) => {
                        const v = e.target.value
                        setPlans((prev) => {
                          if (!prev) return prev
                          const next = [...prev]
                          next[idx] = { ...next[idx], originalPriceVnd: v }
                          return next
                        })
                      }}
                      placeholder="Ví dụ: 474000"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`discount-${p.plan}`}>Giảm giá (% , optional)</Label>
                    <Input
                      id={`discount-${p.plan}`}
                      inputMode="numeric"
                      value={p.discountPercent}
                      onChange={(e) => {
                        const v = e.target.value
                        setPlans((prev) => {
                          if (!prev) return prev
                          const next = [...prev]
                          next[idx] = { ...next[idx], discountPercent: v }
                          return next
                        })
                      }}
                      placeholder="Ví dụ: 18"
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-end gap-3">
                <Button onClick={onSave} disabled={saving}>
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Không có dữ liệu. {error ? <span className="text-destructive">({error})</span> : null}
            </div>
          )}

          {error ? <div className="text-sm text-destructive">{error}</div> : null}
          {success ? <div className="text-sm text-primary">{success}</div> : null}
        </CardContent>
      </Card>

      <Card className="bg-card/40">
        <CardHeader>
          <CardTitle className="text-sm font-medium">App download links (Landing)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {downloadLoading ? <div className="text-sm text-muted-foreground">Đang tải...</div> : null}

          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-6 space-y-2">
              <Label htmlFor="download-ios">iOS URL</Label>
              <Input
                id="download-ios"
                inputMode="url"
                value={downloadIosUrl}
                onChange={(e) => setDownloadIosUrl(e.target.value)}
                placeholder="Ví dụ: https://apps.apple.com/app/..."
              />
              <div className="text-xs text-muted-foreground">Để trống nếu muốn ẩn nút iOS.</div>
            </div>
            <div className="md:col-span-6 space-y-2">
              <Label htmlFor="download-android">Android URL</Label>
              <Input
                id="download-android"
                inputMode="url"
                value={downloadAndroidUrl}
                onChange={(e) => setDownloadAndroidUrl(e.target.value)}
                placeholder="Ví dụ: https://play.google.com/store/apps/..."
              />
              <div className="text-xs text-muted-foreground">Để trống nếu muốn ẩn nút Android.</div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button onClick={onSaveDownloadLinks} disabled={downloadSaving}>
              {downloadSaving ? "Đang lưu..." : "Lưu link tải xuống"}
            </Button>
          </div>

          {downloadError ? <div className="text-sm text-destructive">{downloadError}</div> : null}
          {downloadSuccess ? <div className="text-sm text-primary">{downloadSuccess}</div> : null}
        </CardContent>
      </Card>
    </div>
  )
}


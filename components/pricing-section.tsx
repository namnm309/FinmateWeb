"use client"

import { useEffect, useMemo, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchPremiumPlanConfigs, type PremiumPlanConfig } from "@/lib/premium-plan-configs"
import { initSepayGatewayCheckout } from "@/lib/premium-orders"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function PricingSection() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const router = useRouter()
  const defaultPlans = useMemo(
    () => [
      {
        key: "1-month" as const,
        name: "Cao cấp",
        duration: "1 Tháng",
        features: [
          "Theo dõi ngân sách không giới hạn",
          "Báo cáo chi tiêu theo tuần và theo tháng",
          "Đồng bộ trên nhiều thiết bị",
          "Xuất dữ liệu PDF và Excel",
        ],
        buttonText: "Chọn gói này",
      },
      {
        key: "6-month" as const,
        name: "Cao cấp",
        duration: "6 Tháng",
        features: [
          "Tất cả quyền lợi của gói 1 tháng",
          "Tiết kiệm 18% so với thanh toán từng tháng",
          "AI gợi ý tối ưu chi tiêu mỗi ngày",
          "Nhắc nhở hóa đơn và mục tiêu tiết kiệm",
          "Đồng bộ dữ liệu không giới hạn thiết bị",
          "Ưu tiên hỗ trợ khi cần",
        ],
        buttonText: "Chọn gói này",
        popular: true,
      },
      {
        key: "1-year" as const,
        name: "Cao cấp",
        duration: "1 Năm",
        features: [
          "Tất cả quyền lợi của gói 6 tháng",
          "Tiết kiệm 25% với mức phí tối ưu nhất",
          "Phân tích xu hướng chi tiêu bằng AI",
          "Lập nhiều quỹ tiết kiệm cùng lúc",
          "Hỗ trợ ưu tiên 24/7",
          "Xuất dữ liệu không giới hạn",
          "Báo cáo tài chính chuyên sâu",
          "Quản lý nhiều mục tiêu tài chính",
        ],
        buttonText: "Chọn gói này",
      },
    ],
    []
  )

  const [configs, setConfigs] = useState<PremiumPlanConfig[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchPremiumPlanConfigs()
      .then((data) => {
        if (!mounted) return
        setConfigs(data)
      })
      .catch((e: unknown) => {
        if (!mounted) return
        setLoadError(e instanceof Error ? e.message : String(e))
        setConfigs(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  const formatVnd = useMemo(() => new Intl.NumberFormat("vi-VN"), [])

  const pricingPlans = useMemo(() => {
    const byKey = new Map(configs?.map((c) => [c.plan, c]) ?? [])
    return defaultPlans.map((p) => {
      const c = byKey.get(p.key)
      const priceVnd = c?.priceVnd ?? (p.key === "1-month" ? 79000 : p.key === "6-month" ? 389000 : 710000)
      const originalPriceVnd =
        c?.originalPriceVnd ?? (p.key === "6-month" ? 474000 : p.key === "1-year" ? 948000 : null)
      const discountPercent =
        c?.discountPercent ?? (p.key === "6-month" ? 18 : p.key === "1-year" ? 25 : null)

      return {
        ...p,
        price: formatVnd.format(priceVnd),
        originalPrice: originalPriceVnd == null ? null : formatVnd.format(originalPriceVnd),
        discount: discountPercent == null ? null : String(discountPercent),
        isActive: c?.isActive ?? true,
      }
    })
  }, [configs, defaultPlans, formatVnd])

  const visiblePlans = useMemo(() => pricingPlans.filter((p) => p.isActive), [pricingPlans])
  const defaultSelectedIndex = useMemo(() => {
    const idx = visiblePlans.findIndex((p) => p.popular)
    return idx >= 0 ? idx : 0
  }, [visiblePlans])

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(defaultSelectedIndex)
  const [hoveredPlanIndex, setHoveredPlanIndex] = useState<number | null>(null)
  const [creatingIndex, setCreatingIndex] = useState<number | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)

  useEffect(() => {
    setSelectedPlanIndex(defaultSelectedIndex)
  }, [defaultSelectedIndex])

  const startCheckout = async (index: number) => {
    setCreateError(null)
    setCreatingIndex(index)
    try {
      if (!isLoaded) return
      if (!isSignedIn) {
        router.push(`/sign-in`)
        return
      }

      const token = await getToken()
      if (!token) throw new Error("Không lấy được token. Hãy đăng nhập lại.")

      const plan = visiblePlans[index]?.key
      if (!plan) throw new Error("Gói không hợp lệ.")

      const init = await initSepayGatewayCheckout({ token, plan })

      // Submit a POST form to SePay hosted checkout so QR is rendered on SePay side.
      const form = document.createElement("form")
      form.method = "POST"
      form.action = init.checkoutUrl
      form.style.display = "none"
      Object.entries(init.fields).forEach(([k, v]) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = k
        input.value = v
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    } catch (e: unknown) {
      setCreateError(e instanceof Error ? e.message : String(e))
    } finally {
      setCreatingIndex(null)
    }
  }

  return (
    <section className="w-full px-4 sm:px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight md:leading-[40px]">
            Chọn loại tài khoản
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-tight">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>
      </div>
      <div className="self-stretch px-0 sm:px-5 flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-6 mt-6 max-w-[1100px] mx-auto">
        {visiblePlans.map((plan, index) => {
          const isSelected = selectedPlanIndex === index
          const isHighlighted = hoveredPlanIndex !== null ? hoveredPlanIndex === index : isSelected
          const isCreating = creatingIndex === index

          return (
          <div
            key={index}
            onMouseEnter={() => setHoveredPlanIndex(index)}
            onMouseLeave={() => setHoveredPlanIndex(null)}
            className={`flex-1 p-4 sm:p-5 overflow-hidden rounded-xl flex flex-col justify-between gap-6 cursor-pointer transition-all duration-200 ${
              isHighlighted
                ? "bg-primary shadow-[0px_10px_24px_-8px_rgba(0,0,0,0.20)]"
                : "bg-card hover:-translate-y-1 hover:shadow-[0px_8px_20px_-10px_rgba(0,0,0,0.18)]"
            }`}
            style={isHighlighted ? {} : { outline: "1px solid hsl(var(--border))", outlineOffset: "-1px" }}
            aria-selected={isSelected}
          >
            <div className="flex flex-col gap-5">
              {/* Header with name and badge */}
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-lg font-semibold ${isHighlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.name}
                  </div>
                  <div className={`text-sm ${isHighlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {plan.popular && (
                    <div className={`px-3 py-1 rounded-md text-xs font-medium ${isHighlighted ? "bg-card text-foreground" : "bg-primary/10 text-primary"}`}>
                      PHỔ BIẾN
                    </div>
                  )}
                  {isSelected && (
                    <div className="px-3 py-1 rounded-md bg-card text-foreground text-xs font-medium">
                      ĐANG CHỌN
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl sm:text-3xl font-bold ${isHighlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.price} đ
                </span>
                {plan.originalPrice && (
                  <span className={`text-sm line-through ${isHighlighted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                    {plan.originalPrice} đ
                  </span>
                )}
              </div>

              {/* Discount badge */}
              {plan.discount && (
                <div className="inline-flex">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${isHighlighted ? "bg-card/15 text-primary-foreground" : "bg-primary-light/30 text-primary"}`}>
                    Tiết kiệm {plan.discount}%
                  </span>
                </div>
              )}

              {/* Features */}
              <div className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                      <Check
                        className={`w-full h-full ${isHighlighted ? "text-primary-foreground" : "text-primary"}`}
                        strokeWidth={2}
                      />
                    </div>
                    <span className={`text-sm ${isHighlighted ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              type="button"
              onClick={() => {
                setSelectedPlanIndex(index)
                void startCheckout(index)
              }}
              disabled={creatingIndex !== null}
              className={`w-full py-3 rounded-full font-medium transition-colors duration-200 ${
                isHighlighted
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {isCreating ? "Đang tạo đơn..." : isSelected ? "Đã chọn gói này" : plan.buttonText}
            </Button>
          </div>
        )})}
      </div>
      {loadError ? (
        <div className="mt-4 text-xs text-muted-foreground">
          Không tải được giá từ server, đang dùng giá mặc định. ({loadError})
        </div>
      ) : null}
      {createError ? (
        <div className="mt-3 text-xs text-destructive">
          {createError}
        </div>
      ) : null}
    </section>
  )
}

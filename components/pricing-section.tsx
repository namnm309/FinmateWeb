"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Cao cấp",
      duration: "1 Tháng",
      price: "79,000",
      originalPrice: null,
      discount: null,
      features: [
        "Theo dõi ngân sách không giới hạn",
        "Báo cáo chi tiêu theo tuần và theo tháng",
        "Đồng bộ trên nhiều thiết bị",
        "Xuất dữ liệu PDF và Excel",
      ],
      buttonText: "Chọn gói này",
    },
    {
      name: "Cao cấp",
      duration: "6 Tháng",
      price: "389,000",
      originalPrice: "474,000",
      discount: "18",
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
      name: "Cao cấp",
      duration: "1 Năm",
      price: "710,000",
      originalPrice: "948,000",
      discount: "25",
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
  ]

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    pricingPlans.findIndex((plan) => plan.popular) >= 0 ? pricingPlans.findIndex((plan) => plan.popular) : 0
  )
  const [hoveredPlanIndex, setHoveredPlanIndex] = useState<number | null>(null)

  return (
    <section className="w-full px-4 sm:px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight md:leading-[40px]">
            Nâng cấp tài khoản
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-tight">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>
      </div>
      <div className="self-stretch px-0 sm:px-5 flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-6 mt-6 max-w-[1100px] mx-auto">
        {pricingPlans.map((plan, index) => {
          const isSelected = selectedPlanIndex === index
          const isHighlighted = hoveredPlanIndex !== null ? hoveredPlanIndex === index : isSelected

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
              }}
              className={`w-full py-3 rounded-full font-medium transition-colors duration-200 ${
                isHighlighted
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {isSelected ? "Đã chọn gói này" : plan.buttonText}
            </Button>
          </div>
        )})}
      </div>
    </section>
  )
}

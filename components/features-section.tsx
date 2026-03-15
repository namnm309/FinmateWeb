"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  FileText,
  BarChart2,
  DollarSign,
  Mic,
  Share2,
  FileOutput,
  CloudCog,
  LayoutList,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Feature = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

const leftFeatures: Feature[] = [
  {
    id: "recording",
    icon: <FileText className="w-6 h-6" />,
    title: "Ghi chép thu chi thông minh",
    description: "Dễ dàng tìm kiếm mọi khoản thu/chi của bạn theo từng hạng mục cụ thể",
    image: "/images/finmate-preview.png",
  },
  {
    id: "report",
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Báo cáo trực quan, sinh động",
    description: "Thống kê rõ ràng, thông minh mọi khoản thu/chi của bạn",
    image: "/images/report-preview2.png",
  },
  {
    id: "debt",
    icon: <DollarSign className="w-6 h-6" />,
    title: "Theo dõi vay nợ",
    description: "Ghi chép và theo dõi chặt chẽ các khoản vay nợ",
    image: "/images/debt-preview.png",
  },
  {
    id: "voice",
    icon: <Mic className="w-6 h-6" />,
    title: "Ghi chép bằng AI",
    description: "Tối ưu hóa việc quản lý thu chi cá nhân với công nghệ AI mạnh mẽ",
    image: "/images/aiinput.png",
  },
]

const rightFeatures: Feature[] = [
  {
    id: "share",
    icon: <Share2 className="w-6 h-6" />,
    title: "Cộng đồng chia sẻ tips tiết kiệm",
    description: "Khám phá và chia sẻ mẹo tiết kiệm cùng hàng nghìn người dùng FinMate khác",
    image: "/images/tips.png",
  },
  {
    id: "export",
    icon: <FileOutput className="w-6 h-6" />,
    title: "Phân tích tài chính",
    description: "Hiểu rõ dòng tiền, xu hướng chi tiêu và đưa ra quyết định tài chính thông minh hơn",
    image: "/images/phantichtaichinh.png",
  },
  {
    id: "sync",
    icon: <CloudCog className="w-6 h-6" />,
    title: "Mục tiêu tiết kiệm",
    description: "Đặt mục tiêu, theo dõi tiến độ và đạt được ước mơ tài chính của bạn",
    image: "/images/muctieutietkiem.png",
  },
  {
    id: "budget",
    icon: <LayoutList className="w-6 h-6" />,
    title: "Lập hạn mức chi tiêu",
    description: "Giúp bạn kiểm soát chi tiêu hiệu quả mà không vượt quá ngân sách",
    image: "/images/finmate-preview.png",
  },
]

const allFeatures = [...leftFeatures, ...rightFeatures]

export function FeaturesSection() {
  const [activeId, setActiveId] = useState<string>("recording")
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const activeFeature = allFeatures.find((f) => f.id === activeId) ?? allFeatures[0]

  useEffect(() => {
    setIsImageLoaded(false)
  }, [activeFeature.image])

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 space-y-3">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold">Tính năng</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Việc quản lý tài chính trở nên tiện lợi với những tính năng đa dạng của chúng tôi
        </p>
      </div>

      {/* 3-column layout */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-8 lg:gap-12">

        {/* Left features */}
        <div className="flex flex-col gap-6 w-full md:w-[260px] lg:w-[300px] md:pt-8">
          {leftFeatures.map((feature) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              isActive={activeId === feature.id}
              align="right"
              onHover={() => setActiveId(feature.id)}
            />
          ))}
        </div>

        {/* Center phone mockup */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
          <div className="relative w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px]">
            {/* Phone frame */}
            <div className="relative bg-foreground rounded-[3rem] p-[10px] shadow-2xl ring-4 ring-foreground/10">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground rounded-full z-10" />
              <div className="rounded-[2.5rem] overflow-hidden bg-background aspect-[9/19]">
                <Image
                  key={activeFeature.id}
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  width={280}
                  height={600}
                  onLoadingComplete={() => setIsImageLoaded(true)}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-500 ease-out",
                    isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right features */}
        <div className="flex flex-col gap-6 w-full md:w-[260px] lg:w-[300px] md:pt-8">
          {rightFeatures.map((feature) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              isActive={activeId === feature.id}
              align="left"
              onHover={() => setActiveId(feature.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureItem({
  feature,
  isActive,
  align,
  onHover,
}: {
  feature: Feature
  isActive: boolean
  align: "left" | "right"
  onHover: () => void
}) {
  return (
    <div
      className={cn(
        "flex gap-4 cursor-pointer group transition-all duration-200",
        align === "right" ? "flex-row-reverse text-right" : "flex-row text-left"
      )}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
          isActive
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}
      >
        {feature.icon}
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h3
          className={cn(
            "text-sm md:text-base font-semibold transition-colors duration-200",
            isActive ? "text-primary" : "text-foreground group-hover:text-primary"
          )}
        >
          {feature.title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "FinMate là gì và dành cho ai?",
    answer:
      "FinMate là ứng dụng quản lý tài chính cá nhân thông minh với sự hỗ trợ của AI. App dành cho tất cả mọi người muốn kiểm soát chi tiêu, theo dõi thu nhập và đặt mục tiêu tiết kiệm - từ sinh viên, người đi làm đến các gia đình.",
  },
  {
    question: "Tính năng AI nhập liệu bằng giọng nói hoạt động như thế nào?",
    answer:
      "Bạn chỉ cần nói một câu đơn giản như 'Hôm nay đi chợ hết 150k' hoặc 'Lương tháng này 15 triệu', AI sẽ tự động nhận diện và phân loại khoản thu/chi vào đúng danh mục. Không cần gõ phím, tiết kiệm thời gian tối đa.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "Tuyệt đối an toàn! FinMate sử dụng mã hóa end-to-end và lưu trữ dữ liệu trên cloud bảo mật. Dữ liệu chỉ thuộc về bạn và không bao giờ được chia sẻ với bất kỳ bên thứ ba nào mà không có sự đồng ý của bạn.",
  },
  {
    question: "Bản miễn phí có những tính năng gì?",
    answer:
      "Bản miễn phí bao gồm: ghi chép thu chi cơ bản, báo cáo theo tháng, đặt 1 mục tiêu tiết kiệm, và AI nhập liệu giới hạn 20 lần/tháng. Đủ để bạn trải nghiệm và làm quen với app trước khi nâng cấp.",
  },
  {
    question: "Tôi có thể đồng bộ dữ liệu giữa nhiều thiết bị không?",
    answer:
      "Có! Với tài khoản Premium, dữ liệu của bạn sẽ được đồng bộ tự động giữa tất cả các thiết bị (điện thoại, máy tính bảng). Bạn có thể ghi chép trên điện thoại và xem báo cáo trên tablet một cách liền mạch.",
  },
  {
    question: "Làm sao để hủy gói Premium?",
    answer:
      "Bạn có thể hủy gói Premium bất kỳ lúc nào trong phần Cài đặt > Quản lý gói cước. Sau khi hủy, bạn vẫn sử dụng được các tính năng Premium cho đến hết thời hạn đã đăng ký, sau đó tài khoản sẽ chuyển về bản miễn phí.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-4 sm:px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center w-10 h-10">
          <ChevronDown
            className={`w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-4 sm:px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-4 sm:px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-3xl sm:text-4xl font-semibold leading-10 break-words">
            Câu hỏi thường gặp
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Những điều bạn cần biết về FinMate và cách app giúp bạn quản lý tài chính hiệu quả hơn
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}

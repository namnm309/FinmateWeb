import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Mới dùng thử được 1 tuần mà thấy tiện quá! Tính năng AI nhập liệu bằng giọng nói siêu tiện, chỉ cần nói 'Hôm nay đi chợ 150k' là xong. Giao diện đẹp, dễ dùng. Đang chờ bản chính thức!",
    name: "Minh Hoàng",
    date: "2 ngày trước",
    avatar: "/images/avatars/annette-black.png",
    type: "large-teal",
    title: "AI nhập liệu quá tiện!",
  },
  {
    quote:
      "Được bạn giới thiệu dùng thử FinMate, ban đầu hơi nghi ngờ nhưng xài thử thấy khá ổn. Giao diện trực quan, dễ hiểu với người mới.",
    name: "Thu Hà",
    date: "3 ngày trước",
    avatar: "/images/avatars/dianne-russell.png",
    type: "small-dark",
    title: "Ấn tượng ban đầu tốt",
  },
  {
    quote:
      "Đang test thử tính năng đặt mục tiêu tiết kiệm, app tự tính cho mình cần tiết kiệm bao nhiêu mỗi ngày. Hay phết!",
    name: "An Đỗ Thanh",
    date: "5 ngày trước",
    avatar: "/images/avatars/cameron-williamson.png",
    type: "small-dark",
    title: "Tính năng mục tiêu hay",
  },
  {
    quote:
      "Mình là beta tester của app, phải nói là team dev rất chịu khó lắng nghe feedback. Mỗi tuần đều có update mới, fix bug nhanh. Hy vọng app phát triển tốt!",
    name: "Tuệ Minh",
    date: "1 tuần trước",
    avatar: "/images/avatars/robert-fox.png",
    type: "small-dark",
    title: "Beta tester hài lòng",
  },
  {
    quote:
      "Trước giờ ghi chi tiêu bằng Excel, giờ chuyển qua FinMate thấy tiện hơn nhiều. Nhất là có thể xem báo cáo theo tuần/tháng luôn.",
    name: "Phạm Song Tân",
    date: "1 tuần trước",
    avatar: "/images/avatars/darlene-robertson.png",
    type: "small-dark",
    title: "Thay thế Excel hoàn hảo",
  },
  {
    quote:
      "Đang dùng bản miễn phí, tính năng cơ bản đủ dùng rồi. Chờ xem có gì hay ho hơn ở bản Premium không thì sẽ nâng cấp.",
    name: "Lan Anh",
    date: "4 ngày trước",
    avatar: "/images/avatars/cody-fisher.png",
    type: "small-dark",
    title: "Bản free đủ dùng",
  },
  {
    quote:
      "Mình thích nhất là giao diện màu xanh lá dễ chịu, không bị rối mắt như mấy app khác. Đặc biệt tính năng gợi ý chi tiêu hàng ngày giúp mình ý thức hơn về việc tiêu tiền. App mới mà đã có nhiều tính năng hay vậy, chờ đợi những update tiếp theo!",
    name: "Văn Hùng",
    date: "6 ngày trước",
    avatar: "/images/avatars/albert-flores.png",
    type: "large-light",
    title: "Giao diện đẹp, dễ dùng",
  },
]

const StarRating = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-0.5 ${className}`}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
)

const TestimonialCard = ({ quote, name, date, type, title }: {
  quote: string
  name: string
  date: string
  type: string
  title: string
}) => {
  const isLargeCard = type.startsWith("large")
  const padding = isLargeCard ? "p-6" : "p-5"

  let cardClasses = `group relative flex flex-col justify-between items-start overflow-hidden rounded-xl border border-border bg-card ${padding} shadow-[0px_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-primary hover:shadow-[0px_10px_24px_-8px_rgba(0,0,0,0.20)]`
  let titleClasses = "text-foreground transition-colors duration-200 group-hover:text-primary-foreground"
  let quoteClasses = "transition-colors duration-200 group-hover:text-primary-foreground/90"
  let nameClasses = "text-foreground transition-colors duration-200 group-hover:text-primary-foreground"
  let dateClasses = "text-muted-foreground transition-colors duration-200 group-hover:text-primary-foreground/60"
  let backgroundElements = null
  let hoverOverlay = null
  let cardHeight = isLargeCard ? "h-auto min-h-[320px]" : "h-auto min-h-[200px]"
  const cardWidth = "w-full md:w-[384px]"

  if (isLargeCard) {
    titleClasses += " text-lg font-semibold"
    quoteClasses += " text-base font-normal leading-relaxed text-foreground/80"
    nameClasses += " text-sm font-medium"
    dateClasses += " text-xs"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-5 transition-opacity duration-200 group-hover:opacity-10"
        style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
      />
    )
  } else {
    titleClasses += " text-base font-semibold"
    quoteClasses += " text-sm font-normal leading-relaxed text-foreground/70"
    nameClasses += " text-sm font-medium"
    dateClasses += " text-xs"
  }

  hoverOverlay = <div className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ zIndex: 0 }} />

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight} gap-4`}>
      {backgroundElements}
      {hoverOverlay}
      {/* Header: Title + Date */}
      <div className="relative z-10 w-full flex justify-between items-start gap-2">
        <h3 className={titleClasses}>{title}</h3>
        <span className={`${dateClasses} whitespace-nowrap`}>{date}</span>
      </div>
      {/* Star Rating */}
      <StarRating className="relative z-10 transition-opacity duration-200 group-hover:brightness-110" />
      {/* Quote */}
      <p className={`relative z-10 flex-1 ${quoteClasses}`}>{quote}</p>
      {/* Author */}
      <div className={`relative z-10 ${nameClasses}`}>{name}</div>
    </div>
  )
}

export function TestimonialGridSection() {
  return (
    <section className="w-full px-4 sm:px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-4">
        {/* Stars and review count */}
        <div className="flex flex-col items-center gap-2">
          <StarRating />
          <span className="text-primary font-semibold text-sm">Người dùng thử nghiệm yêu thích</span>
        </div>
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Cảm nhận của người dùng
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-relaxed max-w-xl">
            Những đánh giá của người dùng là nguồn động lực cho đội ngũ chúng tôi tiếp tục cố gắng cải thiện và phát triển dịch vụ tốt hơn!
          </p>
        </div>
      </div>
      <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto">
        <div className="w-full md:flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="w-full md:flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[4]} />
        </div>
        <div className="w-full md:flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[5]} />
          <TestimonialCard {...testimonials[6]} />
        </div>
      </div>
    </section>
  )
}

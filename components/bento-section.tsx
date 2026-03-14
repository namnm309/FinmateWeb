import AiCodeReviews from "./bento/ai-code-reviews"
import RealtimeCodingPreviews from "./bento/real-time-previews"
import OneClickIntegrationsIllustration from "./bento/one-click-integrations-illustration"
import MCPConnectivityIllustration from "./bento/mcp-connectivity-illustration" // Updated import
import EasyDeployment from "./bento/easy-deployment"
import ParallelCodingAgents from "./bento/parallel-agents" // Updated import

const BentoCard = ({ title, description, Component }) => (
  <div className="overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative">
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <p className="self-stretch text-foreground text-lg font-normal leading-7">
          {title} <br />
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
    </div>
    <div className="self-stretch h-72 relative -mt-0.5 z-10">
      <Component />
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "AI tự phân loại giao dịch.",
      description: "Gợi ý hạng mục chi tiêu nhanh và chính xác ngay khi bạn nhập liệu.",
      Component: AiCodeReviews,
    },
    {
      title: "Báo cáo cập nhật theo thời gian thực",
      description: "Theo dõi dòng tiền và mức chi tiêu ngay sau mỗi giao dịch mới.",
      Component: RealtimeCodingPreviews,
    },
    {
      title: "Kết nối ví và ngân hàng trong vài chạm",
      description: "Tập trung dữ liệu tài chính về một nơi để quản lý dễ dàng hơn.",
      Component: OneClickIntegrationsIllustration,
    },
    {
      title: "Đồng bộ nhiều nguồn dữ liệu linh hoạt",
      description: "Kết nối tài khoản ngân hàng, ví điện tử và nguồn thu trong cùng một màn hình.",
      Component: MCPConnectivityIllustration,
    },
    {
      title: "Theo dõi nhiều mục tiêu cùng lúc",
      description: "Tách riêng ngân sách, quỹ dự phòng và mục tiêu tiết kiệm để kiểm soát rõ ràng.",
      Component: ParallelCodingAgents,
    },
    {
      title: "Thiết lập FinMate trong chưa đầy một phút",
      description: "Hoàn tất khởi tạo, đồng bộ dữ liệu và bắt đầu quản lý tiền bạc ngay lập tức.",
      Component: EasyDeployment,
    },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              FinMate giúp bạn ghi chép, phân tích và ra quyết định chi tiêu nhanh hơn nhờ AI, báo cáo trực quan và
              khả năng đồng bộ liền mạch.
            </p>
          </div>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

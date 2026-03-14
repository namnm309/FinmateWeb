import type React from "react"

interface DeploymentEasyProps {
  /** Width of component – number (px) or any CSS size value */
  width?: number | string
  /** Height of component – number (px) or any CSS size value */
  height?: number | string
  /** Extra Tailwind / CSS classes for root element */
  className?: string
}

const DeploymentEasy: React.FC<DeploymentEasyProps> = ({ width = "100%", height = "100%", className = "" }) => {
  /* ------------------------------------------------------------
   * Theme-based design tokens using global CSS variables
   * ---------------------------------------------------------- */
  const themeVars = {
    "--deploy-primary-color": "hsl(var(--primary))",
    "--deploy-background-color": "hsl(var(--background))",
    "--deploy-text-color": "hsl(var(--foreground))",
    "--deploy-text-secondary": "hsl(var(--muted-foreground))",
    "--deploy-border-color": "hsl(var(--border))",
  } as React.CSSProperties

  /* ------------------------------------------------------------
   * Console log output (static for demo) – can be replaced via props
   * ---------------------------------------------------------- */
  const logLines = [
    "[08:30:12.637] Đang khởi tạo hồ sơ tài chính cá nhân...",
    "[08:30:13.118] Kiểm tra thiết bị và bật đồng bộ đám mây",
    "[08:30:13.653] Đang tìm các nguồn dữ liệu khả dụng...",
    "[08:30:14.101] Đã phát hiện 4 nguồn thu và 3 ví chi tiêu",
    "[08:30:14.979] Đang đồng bộ 84 giao dịch gần nhất...",
    "[08:30:16.420] AI bắt đầu phân loại chi tiêu tự động",
    "[08:30:18.205] Hoàn tất nhóm các khoản chi ăn uống, di chuyển, sinh hoạt",
    "[08:30:19.840] Đang tạo báo cáo tuần đầu tiên",
    "[08:30:21.190] Đã bật nhắc nhở mục tiêu tiết kiệm",
    "[08:30:22.770] Sẵn sàng sử dụng FinMate",
    "[08:30:23.099] Hoàn tất thiết lập trong chưa đầy 1 phút",
  ]

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      style={{
        width,
        height,
        position: "relative",
        background: "transparent",
        ...themeVars,
      }}
      role="img"
      aria-label="Bảng thiết lập nhanh FinMate với nút bắt đầu sử dụng"
    >
      {/* -------------------------------------------------------- */}
      {/* Console / Terminal panel                                */}
      {/* -------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "340px",
          height: "239px",
          background: "linear-gradient(180deg, var(--deploy-background-color) 0%, transparent 100%)",
          backdropFilter: "blur(7.907px)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Inner translucent panel – replicates subtle overlay */}
        <div
          style={{
            position: "absolute",
            inset: "2px",
            borderRadius: "8px",
            background: "hsl(var(--foreground) / 0.08)",
          }}
        />

        {/* Log text */}
        <div
          style={{
            position: "relative",
            padding: "8px",
            height: "100%",
            overflow: "hidden",
            fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', monospace",
            fontSize: "10px",
            lineHeight: "16px",
            color: "var(--deploy-text-color)",
            whiteSpace: "pre",
          }}
        >
          {logLines.map((line, index) => (
            <p key={index} style={{ margin: 0 }}>
              {line}
            </p>
          ))}
        </div>

        {/* Inner border overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "0.791px solid var(--deploy-border-color)",
            borderRadius: "10px",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* -------------------------------------------------------- */}
      {/* Call-to-action button                                   */}
      {/* -------------------------------------------------------- */}
      <button
        style={{
          position: "absolute",
          top: "calc(50% + 57.6px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6.375px",
          padding: "5.1px 10.2px",
          background: "var(--deploy-primary-color)",
          color: "hsl(var(--primary-foreground))",
          border: "none",
          cursor: "pointer",
          borderRadius: "8.925px",
          fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "16.575px",
          lineHeight: "25.5px",
          letterSpacing: "-0.51px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          boxShadow:
            "0px 42.075px 11.475px rgba(0, 0, 0, 0), 0px 26.775px 10.2px rgba(0, 0, 0, 0.01), 0px 15.3px 8.925px rgba(0, 0, 0, 0.05), 0px 6.375px 6.375px rgba(0, 0, 0, 0.09), 0px 1.275px 3.825px rgba(0, 0, 0, 0.1)",
        }}
      >
        Bắt đầu với FinMate
      </button>
    </div>
  )
}

export default DeploymentEasy

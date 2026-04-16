import Image from "next/image"
import Link from "next/link"
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F4F5F7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-3rem)] w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:grid-cols-[minmax(0,1fr)_600px]">
        <div className="isolate flex min-w-0 flex-col bg-[linear-gradient(180deg,rgba(41,157,145,0.08),rgba(41,157,145,0.02))] px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <Image
                src="/finmate-logo.png"
                alt="Logo FinMate"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-[#191D23] text-2xl md:text-[28px] font-semibold">FinMate</span>
            </Link>
            <Link href="/" className="text-sm font-medium text-[#4B5768] hover:text-[#191D23]">
              Về trang chủ
            </Link>
          </div>

          <div className="relative z-10 mt-12 max-w-xl">
            <div className="inline-flex rounded-full border border-[#299D91]/15 bg-white/70 px-4 py-2 text-sm font-medium text-[#299D91]">
              Chào mừng bạn quay trở lại
            </div>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-[#191D23] sm:text-4xl lg:text-5xl">
              Đăng nhập để tiếp tục quản lý tài chính cùng FinMate
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#4B5768] sm:text-lg">
              Theo dõi chi tiêu, quản lý mục tiêu tiết kiệm và mở khóa các tính năng cao cấp trong
              cùng một không gian đồng bộ trên mọi thiết bị.
            </p>
          </div>

          <div className="relative z-0 mt-12 hidden 2xl:block">
            <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
              <div className="absolute bottom-0 left-0 z-0 w-[160px] rounded-[2.2rem] bg-white/80 p-2 shadow-xl">
                <img
                  src="/images/1.png"
                  alt="Màn hình ứng dụng FinMate"
                  className="w-full rounded-[1.8rem] object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-[120px] z-0 w-[190px] rounded-[2.5rem] bg-white p-2.5 shadow-2xl">
                <img
                  src="/images/2.png"
                  alt="Màn hình ứng dụng FinMate"
                  className="w-full rounded-[2rem] object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-[280px] z-0 w-[160px] rounded-[2.2rem] bg-white/80 p-2 shadow-xl">
                <img
                  src="/images/3.png"
                  alt="Màn hình ứng dụng FinMate"
                  className="w-full rounded-[1.8rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center border-t border-white/60 bg-white/55 px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-12">
          <div className="w-full max-w-[520px] rounded-[28px] border border-white/80 bg-white/85 p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#299D91]">Đăng nhập</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#191D23]">Truy cập tài khoản của bạn</h2>
              <p className="mt-3 text-sm leading-6 text-[#4B5768]">
                Đăng nhập bằng email hoặc tài khoản mạng xã hội để tiếp tục sử dụng FinMate.
              </p>
            </div>

            <SignIn
              path="/sign-in"
              routing="path"
              appearance={{
                variables: {
                  colorPrimary: '#299D91',
                  colorBackground: '#F4F5F7',
                  colorText: '#191D23',
                  colorTextSecondary: '#999DA3',
                  colorInputText: '#4B5768',
                  colorInputBackground: '#FFFFFF',
                  borderRadius: '8px',
                },
                elements: {
                  rootBox: 'w-full',
                  cardBox: 'shadow-none bg-transparent p-0 w-full',
                  card: 'shadow-none bg-transparent p-0 w-full',
                  header: 'hidden',
                  footer: 'hidden',
                  socialButtonsRoot: 'overflow-visible',
                  socialButtons: 'gap-3 overflow-visible',
                  lastAuthenticationStrategyBadge:
                    'absolute -top-2 right-4 z-10 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#299D91] ring-1 ring-inset ring-[#D0D5DD]',
                  socialButtonsBlockButton:
                    'relative w-full inline-flex items-center justify-center gap-3 bg-white hover:bg-white text-[#4B5768] h-11 sm:h-12 !rounded-full px-5 font-medium shadow-none border-0 ring-1 ring-inset ring-[#D0D5DD] whitespace-nowrap leading-none overflow-visible',
                  socialButtonsBlockButtonText: 'text-[#4B5768] text-[15px] sm:text-base font-medium leading-none',
                  formButtonPrimary:
                    'w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-12 !rounded-full px-8 text-[15px] sm:text-base font-medium shadow-none border-0 ring-1 ring-inset ring-secondary/30 whitespace-nowrap leading-none',
                  dividerLine: 'bg-[#D0D5DD]',
                  dividerText: 'text-[#999DA3] text-[14px]',
                  formFieldLabel: 'text-[#191D23] text-[16px] font-medium',
                  formFieldInput:
                    'h-12 rounded-[8px] border border-[#D0D5DD] text-[#4B5768] placeholder:text-[#999DA3] focus:border-[#4B5768] focus:ring-0',
                  formFieldAction: 'text-[#299D91] text-[12px] font-medium',
                  formFieldSuccessText: 'text-[#299D91]',
                  formFieldErrorText: 'text-[#E73D1C]',
                  identityPreviewText: 'text-[#4B5768]',
                  formResendCodeLink: 'text-[#299D91]',
                  form: 'gap-6',
                  formFieldRow: 'gap-2',
                  formField: 'gap-2',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


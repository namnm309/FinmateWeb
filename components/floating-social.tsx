"use client"

import { useEffect, useState } from "react"

export function FloatingSocial() {
  const [showMessage, setShowMessage] = useState(true)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timerId = window.setTimeout(() => setEntered(true), 80)
    return () => window.clearTimeout(timerId)
  }, [])

  return (
    <div className="fixed right-4 bottom-5 md:right-6 md:bottom-7 z-[60] flex flex-col items-end gap-3">
      <div className="w-40 md:w-44 flex flex-col items-center gap-3 self-end">
        <a
          href="https://www.tiktok.com/@finmate0?fbclid=IwY2xjawQibxhleHRuA2FlbQIxMABicmlkETFLREY4UUhtaEYxQ2I2TDFsc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHjv9sEEIRsqM_X66rSF4cvQOpb2imA_sWb0LpMjTJc-6Qs6ZUaVOWAWEcD0c_aem_eNbq1SaY3jkNlyfE5yhljw"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mở TikTok FinMate"
          className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black text-white shadow-xl ring-1 ring-white/20 transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.204V2h-3.218v12.235a2.939 2.939 0 1 1-2.939-2.939c.244 0 .48.03.706.087V8.115a6.176 6.176 0 0 0-.706-.041A6.157 6.157 0 1 0 15.82 14.23V8.004a8.01 8.01 0 0 0 4.706 1.525V6.686h-.937z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61581320641242"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mở Facebook FinMate"
          className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl ring-1 ring-white/30 transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
            <path d="M13.616 21.996V12.88h3.07l.46-3.553h-3.53V7.06c0-1.028.286-1.728 1.762-1.728l1.883-.001V2.153C16.985 2.109 15.865 2 14.56 2c-2.724 0-4.59 1.663-4.59 4.717v2.61H6.89v3.553h3.08v9.116h3.646z" />
          </svg>
        </a>
      </div>

      <div className="flex items-center gap-3">
        {showMessage && (
          <div
            className={`max-w-[220px] text-right text-xs md:text-sm font-semibold text-black floating-message-color-loop drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out ${
              entered ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="bg-transparent">
              Hãy cũng tiết kiệm cũng Finmate nào mọi người ơiiiiiiiiiiiiiiiiiiiiii :3
            </p>
          </div>
        )}
        <button
          type="button"
          aria-label={showMessage ? "Ẩn lời nhắn" : "Hiện lời nhắn"}
          onClick={() => setShowMessage((prev) => !prev)}
          className="bg-transparent p-0 translate-x-2 md:translate-x-3"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjhhM2J2d2VtcmhubzExcjVsYnd3MXYyaXhlMHI2ZTEwM2N3MHJ6NSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/rZjsvCDqSM7jzH2HHS/giphy.gif"
            alt="FinMate sticker"
            width={170}
            height={170}
            className="h-40 w-40 md:h-44 md:w-44 object-contain"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  )
}

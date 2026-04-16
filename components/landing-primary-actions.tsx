"use client"

import * as React from "react"
import Link from "next/link"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fetchAppDownloadConfig } from "@/lib/app-download-config"

type LandingPrimaryActionsProps = {
  className?: string
  fullWidth?: boolean
  primaryButtonClassName?: string
  secondaryButtonClassName?: string
}

export function LandingPrimaryActions({
  className,
  fullWidth = false,
  primaryButtonClassName,
  secondaryButtonClassName,
}: LandingPrimaryActionsProps) {
  const [androidUrl, setAndroidUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    fetchAppDownloadConfig()
      .then((config) => {
        if (!mounted) return
        setAndroidUrl(config.androidUrl)
      })
      .catch(() => {
        if (!mounted) return
        setAndroidUrl(null)
      })

    return () => {
      mounted = false
    }
  }, [])

  const handleScrollToPricing = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetElement = document.getElementById("pricing-section")
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      return
    }
    window.location.hash = "pricing-section"
  }, [])

  const showAndroidDownload = Boolean(androidUrl)
  const containerClassName = fullWidth ? "w-full" : ""

  return (
    <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <Link href="#pricing-section" onClick={handleScrollToPricing} className={containerClassName}>
        <Button className={primaryButtonClassName}>Nâng Cấp Gói</Button>
      </Link>

      {showAndroidDownload && androidUrl ? (
        <Button asChild variant="outline" className={secondaryButtonClassName}>
          <a href={androidUrl} target="_blank" rel="noopener noreferrer" download>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-primary/10 px-1 text-[10px] font-semibold text-primary">
                APK
              </span>
              <Download className="h-4 w-4" />
              <span>Tải xuống Android</span>
            </span>
          </a>
        </Button>
      ) : null}
    </div>
  )
}

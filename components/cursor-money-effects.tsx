"use client"

import { useEffect, useRef, useState } from "react"

type ParticleKind = "coin" | "bill"

type Particle = {
  id: number
  kind: ParticleKind
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  spin: number
  size: number
  age: number
  life: number
}

const CLICK_PARTICLES = 5
const TRAIL_INTERVAL_MS = 18
const MAX_PARTICLES = 72
const MIN_TRAIL_DISTANCE = 10

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function CursorMoneyEffects() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [showCursor, setShowCursor] = useState(false)
  const particleIdRef = useRef(0)
  const pointerDownRef = useRef(false)
  const lastTrailSpawnRef = useRef(0)
  const lastMousePointRef = useRef({ x: 0, y: 0 })
  const hasMousePointRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia("(pointer: fine)").matches

    if (canUseCustomCursor) {
      document.body.classList.add("money-cursor-active")
    }

    const spawnParticles = (newParticles: Particle[]) => {
      setParticles((current) => [...current, ...newParticles].slice(-MAX_PARTICLES))
    }

    const createCoinBurst = (x: number, y: number) => {
      const coins = Array.from({ length: CLICK_PARTICLES }, () => ({
        id: particleIdRef.current++,
        kind: "coin" as const,
        x: x + randomBetween(-10, 10),
        y: y + randomBetween(-8, 8),
        vx: randomBetween(-28, 28),
        vy: randomBetween(15, 70),
        rotation: randomBetween(-20, 20),
        spin: randomBetween(-150, 150),
        size: randomBetween(22, 34),
        age: 0,
        life: randomBetween(0.9, 1.25),
      }))

      spawnParticles(coins)
    }

    const createTrailBill = (x: number, y: number, intensity = 1) => {
      const previous = lastMousePointRef.current
      const dx = x - previous.x
      const dy = y - previous.y
      const speedInfluenceX = Math.max(-80, Math.min(80, dx * 8))
      const speedInfluenceY = Math.max(-40, Math.min(40, dy * 4))

      const count = intensity > 1.35 ? 2 : 1
      const bills = Array.from({ length: count }, (_, index) => ({
        id: particleIdRef.current++,
        kind: "bill" as const,
        x: x + randomBetween(-12, 12) - index * dx * 0.08,
        y: y + randomBetween(-12, 12) - index * dy * 0.08,
        vx: speedInfluenceX + randomBetween(-40, 30),
        vy: speedInfluenceY + randomBetween(-8, 26),
        rotation: randomBetween(-24, 24),
        spin: randomBetween(-220, 220),
        size: randomBetween(26, 34),
        age: 0,
        life: randomBetween(0.65, 1),
      }))

      spawnParticles(bills)
    }

    const handleMouseDown = (event: MouseEvent) => {
      pointerDownRef.current = true
      hasMousePointRef.current = true
      lastMousePointRef.current = { x: event.clientX, y: event.clientY }
      if (canUseCustomCursor) {
        setShowCursor(true)
      }
      createCoinBurst(event.clientX, event.clientY)
    }

    const handleMouseUp = () => {
      pointerDownRef.current = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      const nextPoint = { x: event.clientX, y: event.clientY }

      if (!hasMousePointRef.current) {
        hasMousePointRef.current = true
        lastMousePointRef.current = nextPoint
        if (canUseCustomCursor) {
          setCursorPosition(nextPoint)
          setShowCursor(true)
        }
        return
      }

      if (canUseCustomCursor) {
        setCursorPosition(nextPoint)
        setShowCursor(true)
      }

      const previous = lastMousePointRef.current
      const dx = nextPoint.x - previous.x
      const dy = nextPoint.y - previous.y
      const distance = Math.hypot(dx, dy)
      const enoughTimePassed = event.timeStamp - lastTrailSpawnRef.current >= TRAIL_INTERVAL_MS

      if (distance >= MIN_TRAIL_DISTANCE && enoughTimePassed) {
        const intensity = pointerDownRef.current ? 1.8 : Math.min(1.6, 1 + distance / 28)
        createTrailBill(nextPoint.x, nextPoint.y, intensity)
        lastTrailSpawnRef.current = event.timeStamp
      }

      lastMousePointRef.current = nextPoint
    }

    const handleBlur = () => {
      pointerDownRef.current = false
      setShowCursor(false)
    }

    const handleMouseLeaveWindow = () => {
      pointerDownRef.current = false
      setShowCursor(false)
    }

    const tick = (timestamp: number) => {
      const previousTimestamp = lastFrameTimeRef.current ?? timestamp
      const delta = Math.min((timestamp - previousTimestamp) / 1000, 0.032)
      lastFrameTimeRef.current = timestamp

      setParticles((current) =>
        current
          .map((particle) => {
            const gravity = particle.kind === "coin" ? 260 : 115
            const drag = particle.kind === "coin" ? 0.985 : 0.975

            const nextAge = particle.age + delta
            const nextVy = particle.vy + gravity * delta
            const nextVx = particle.vx * drag

            return {
              ...particle,
              x: particle.x + nextVx * delta,
              y: particle.y + nextVy * delta,
              vx: nextVx,
              vy: nextVy,
              rotation: particle.rotation + particle.spin * delta,
              age: nextAge,
            }
          })
          .filter((particle) => particle.age < particle.life),
      )

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseUp)
    window.addEventListener("blur", handleBlur)
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }

      document.body.classList.remove("money-cursor-active")

      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseUp)
      window.removeEventListener("blur", handleBlur)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {particles.map((particle) => {
        const progress = particle.age / particle.life
        const opacity = progress < 0.75 ? 1 : Math.max(0, (1 - progress) / 0.25)
        const scale = particle.kind === "coin" ? 1 - progress * 0.08 : 1 - progress * 0.14

        return (
          <div
            key={particle.id}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              transform: `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rotation}deg) scale(${scale})`,
              opacity,
            }}
          >
            {particle.kind === "coin" ? (
              <div
                className="flex items-center justify-center rounded-full border border-emerald-200/60 bg-[radial-gradient(circle_at_30%_30%,rgba(190,255,232,0.95),rgba(62,214,164,0.9)_58%,rgba(12,90,64,0.95))] shadow-[0_10px_25px_rgba(80,255,190,0.25)]"
                style={{ width: particle.size, height: particle.size }}
              >
                <span className="text-sm font-black leading-none text-emerald-950">₫</span>
              </div>
            ) : (
              <MoneyBill width={particle.size * 1.55} height={particle.size} label="VNĐ" compact={particle.size < 30} />
            )}
          </div>
        )
      })}
      {showCursor && (
        <div
          className="absolute left-0 top-0 will-change-transform"
          style={{
            transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) rotate(-12deg)`,
          }}
        >
          <div className="relative -translate-x-[12%] -translate-y-[52%] drop-shadow-[0_10px_24px_rgba(58,255,172,0.18)]">
            <MoneyBill width={54} height={34} label="VNĐ" cursor />
          </div>
        </div>
      )}
    </div>
  )
}

function MoneyBill({
  width,
  height,
  label,
  compact = false,
  cursor = false,
}: {
  width: number
  height: number
  label: string
  compact?: boolean
  cursor?: boolean
}) {
  const hasCurrencyMark = /[đ₫]/i.test(label)

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-emerald-200/45 bg-[linear-gradient(135deg,rgba(170,255,222,0.95),rgba(110,255,200,0.9)_48%,rgba(46,196,141,0.95))] ${cursor ? "shadow-[0_14px_30px_rgba(70,255,180,0.22)]" : "shadow-[0_12px_30px_rgba(70,255,180,0.16)]"}`}
      style={{ width, height }}
    >
      <div className="absolute inset-y-0 left-[18%] w-px bg-emerald-950/15" />
      <div className="absolute inset-y-0 right-[18%] w-px bg-emerald-950/15" />
      <div className="absolute inset-x-[12%] top-[18%] h-[2px] rounded-full bg-emerald-950/10" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.42)_48%,transparent_72%)] opacity-80" />
      {!hasCurrencyMark && (
        <>
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-[10px] font-black leading-none text-emerald-950/70">₫</div>
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 text-[10px] font-black leading-none text-emerald-950/70">₫</div>
        </>
      )}
      <div className={`flex h-full items-center justify-center font-black text-emerald-950/90 ${compact ? "text-[9px] tracking-[0.16em]" : "text-[10px] tracking-[0.24em]"}`}>
        {label}
      </div>
    </div>
  )
}
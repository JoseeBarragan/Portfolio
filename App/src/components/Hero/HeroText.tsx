import { useMotionValue, useMotionTemplate, motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
  
    const handleBlobMove = (e: CustomEvent) => {
      const rect = container.getBoundingClientRect()
      x.set(e.detail.x - rect.left)
      y.set(e.detail.y - rect.top)
    }
  
    window.addEventListener('blob-move', handleBlobMove as EventListener)
    return () => window.removeEventListener('blob-move', handleBlobMove as EventListener)
  }, [])

  const mask = useMotionTemplate`radial-gradient(27px circle at ${x}px ${y}px, black 60%, transparent 100%)`

  const baseStyle = {
    margin: 0,
    padding: 0,
    fontFamily: "'Bebas Neue', sans-serif",
    lineHeight: 1.1,
    letterSpacing: '0.02em',
    pointerEvents: "none" as const,
  }

  const content = (revealed: boolean) => (
    <div style={{ textAlign: "center" }}>
      <p style={{
        ...baseStyle,
        fontSize: "clamp(0.7rem, 3vw, 1.1rem)",
        color: revealed ? "#000000" : "#bda0f8",
        fontFamily: "'Geist', sans-serif",
        letterSpacing: "0.25em",
        marginBottom: "0.75rem",
        fontWeight: 300,
      }}>
        Hello, I'm
      </p>
      <h1 style={{
        ...baseStyle,
        fontSize: "clamp(2rem, 8vw, 5rem)",
        color: revealed ? "#000000" : "#cccccc",
      }}>
        JOSÉ BARRAGÁN
      </h1>
      <h2 style={{
        ...baseStyle,
        fontSize: "clamp(0.9rem, 4vw, 2rem)",
        color: revealed ? "#000000" : "#bda0f8",
        fontWeight: 400,
        marginTop: "0.4rem",
      }}>
        FULLSTACK DEVELOPER
      </h2>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="relative z-900 flex items-center justify-center w-full md:w-auto px-6 md:px-0"
    >
      {/* Capa base */}
      {content(false)}

      {/* Capa revelada */}
      <motion.div
        id="blob-shadow"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maskImage: mask,
          WebkitMaskImage: mask,
          zIndex: 900
        }}
      >
        {content(true)}
      </motion.div>
    </div>
  )
}
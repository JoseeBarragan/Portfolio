import { useMotionValue, useMotionTemplate, motion, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-999) // empieza fuera de pantalla
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

  const mask = useMotionTemplate`radial-gradient(35px circle at ${x}px ${y}px, black 60%, transparent 100%)`

  return (
    <div ref={containerRef} 
        style={{ 
          position: "absolute",
          inset: 0,
          zIndex: 200,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      className="w-full"
    >
      {/* Capa base — gris apagado */}
      <h1 style={{ color: "#ffffff", margin: "auto" }} className="m-auto">FULLSTACK DEVELOPER</h1>

      {/* Capa revelada — cyan brillante */}
      <motion.h1
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          color: "#000000",
          maskImage: mask,
          WebkitMaskImage: mask,
          zIndex: 50,
        }}
        className="m-auto"
      >
        FULLSTACK DEVELOPER
      </motion.h1>
    </div>
  )
}
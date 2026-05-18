import { useMotionValue, useMotionTemplate, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function VSTerminal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleBlobMove = (e: CustomEvent) => {
      const rect = container.getBoundingClientRect()
      x.set(e.detail.x - rect.left)
      y.set(e.detail.y - rect.top)
    }

    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    window.addEventListener('blob-move', handleBlobMove as EventListener)
    return () => {
      window.removeEventListener('blob-move', handleBlobMove as EventListener)
      window.removeEventListener('resize', check)
    }
  }, [])

  const mask = useMotionTemplate`radial-gradient(26px circle at ${x}px ${y}px, black 60%, transparent 100%)`

  return (
  <div 
    ref={containerRef} 
    style={
        {   
            position: isMobile ? 'absolute' : 'relative',
            inset: isMobile ? 0 : 'auto',
            zIndex: 900,
            opacity: isMobile ? 0.25 : 1,
            scale: isMobile ? 0.6 : 1,
            display: isMobile ? 'flex' : 'inline-block',
            alignItems: isMobile ? 'center' : 'auto',
            justifyContent: isMobile ? 'center' : 'auto',
            pointerEvents: isMobile ? 'none' : 'auto',
        }
    }>
    {/* solo una terminal */}
    {children}

    {/* overlay con invert — no duplica children */}
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maskImage: mask,
        WebkitMaskImage: mask,
        pointerEvents: 'none',
        backdropFilter: 'invert(1)',
        WebkitBackdropFilter: 'invert(1)',
      }}
    />
  </div>
)
}
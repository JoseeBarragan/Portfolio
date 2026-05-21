import { useEffect, useState } from 'react'

export default function VSTerminal({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
  <div 
    style={
        {   
            position: isMobile ? 'absolute' : 'relative',
            inset: isMobile ? 0 : 0,
            zIndex: 900,
            opacity: isMobile ? 0.25 : 1,
            scale: isMobile ? 0.6 : 1,
            display: isMobile ? 'flex' : 'block',
            alignItems: isMobile ? 'center' : 'auto',
            justifyContent: isMobile ? 'center' : 'auto',
            pointerEvents: isMobile ? 'none' : 'auto',
            backfaceVisibility: 'hidden',
        }
    }>
      <div className='backface-hidden'>
        {children}
      </div>
  </div>
)
}
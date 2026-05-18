import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import BorderGlow from './externalComponents/BorderGlow'
import CurvedLoop from './externalComponents/CurvedLoop'

export default function Loader() {
  const btnRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)
  const [showPercent, setShowPercent] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const progress = { value: 0 }

    gsap.to(progress, {
      value: 100,
      duration: 4,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.round(progress.value))
      },
      onComplete: () => {
        setShowPercent(false)
        setExpanded(true)

        gsap.to(btnRef.current, {
          scale: 40,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                if (loaderRef.current) loaderRef.current.style.display = 'none'
              }
            })
          }
        })
      }
    })
  }, [])

    return (
      <div
        ref={loaderRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e4dfe6',
        }}
      >
        {/* CurvedLoop centrado detrás */}
        <div style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          zIndex: 0,
        }}>
          <CurvedLoop 
            marqueeText="< FULLSTACK /> · < BACKEND /> · < FRONTEND />"
            speed={0.4}
            curveAmount={0}
            direction="left"
            interactive={false}
            className="curved-text"
          />
        </div>

        {/* Botón encima */}
        <div ref={btnRef} style={{ transformOrigin: 'center', pointerEvents: 'auto', position: 'relative', zIndex: 1000 }}>
          {expanded ? (
            <div style={{
              width: '270px',
              height: '70px',
              borderRadius: '28px',
              background: '#120F17',
            }} />
          ) : (
            <BorderGlow
              edgeSensitivity={30}
              glowColor="271 91 72"
              backgroundColor="#120F17"
              borderRadius={28}
              glowRadius={60}
              glowIntensity={6}
              coneSpread={15}
              animated={true}
              colors={['#c084fc', '#a855f7', '#7c3aed']}
              fillOpacity={0}
            >
              <div style={{
                width: '270px',
                height: '70px',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1.3rem',
                letterSpacing: '0.1em',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}>
                {showPercent && (
                  <>
                    <span style={{ color: '#888' }}>LOADING</span>
                    <span>{percent}%</span>
                  </>
                )}
              </div>
            </BorderGlow>
          )}
        </div>
      </div>
    )
}
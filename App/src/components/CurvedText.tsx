import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SimpleMarquee({
  text,
  speed = 60, // px por segundo, aprox
  direction = 'left', // 'left' | 'right'
  className = '',
  gap = '2rem',
}) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Se mide UNA sola vez al montar (no en cada frame) para saber
    // cuánto dura el loop. No hay reflows en el loop en sí.
    const singleWidth = track.scrollWidth / 2
    const duration = singleWidth / speed

    gsap.set(track, { xPercent: direction === 'left' ? 0 : -50 })

    const tween = gsap.to(track, {
      xPercent: direction === 'left' ? -50 : 0,
      duration,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [speed, direction])

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}
    >
      <div
        ref={trackRef}
        style={{ display: 'inline-flex', willChange: 'transform' }}
      >
        <span style={{ display: 'inline-block', paddingRight: gap }} className="select-none font-extrabold">
          {text}
        </span>
        <span
          style={{ display: 'inline-block', paddingRight: gap }}
          aria-hidden="true"
          className="select-none font-extrabold"
        >
          {text}
        </span>
      </div>
    </div>
  )
}
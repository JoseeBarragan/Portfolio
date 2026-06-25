'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 20
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const originalSizes = useRef([])
  const [isTouch, setIsTouch] = useState(true)
  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);
  const isOverriding = useRef(false)

  const handleMove = useCallback(
    e => {
      if (isOverriding.current) return
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      window.dispatchEvent(new CustomEvent('blob-move', { detail: { x, y } }));

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    originalSizes.current = blobsRef.current.map((el, i) => ({
      width: sizes[i],
      height: sizes[i],
      borderRadius: blobType === 'circle' ? '50%' : '0%',
    }))
    const handleOverride = (e) => {
      isOverriding.current = true
      const { left, top } = updateOffset()
      blobsRef.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          x: e.detail.x - left,
          y: e.detail.y - top,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
      })
    }

    const handleRelease = () => {
      isOverriding.current = false
    }

    const handleScale = (e) => {
      blobsRef.current.forEach((el) => {
        if (!el) return

        gsap.to(el, {
          height: e.detail.height,
          width: e.detail.width,
          borderRadius: e.detail.radius,
          duration: 0.4,
          ease: 'power3.out',
        })
      })
    }

    const handleMouseLeave = (e) => {
      if (!containerRef.current) return
      const { left, top } = updateOffset()
      const x = e.clientX - left
      const y = e.clientY - top
      blobsRef.current.forEach(el => {
        if (!el) return
        gsap.killTweensOf(el)
        gsap.set(el, { x, y })
      })

      containerRef.current.style.transformOrigin = `${e.clientX}px ${e.clientY}px`
      gsap.to(containerRef.current, { scale: 0, duration: 0.2, ease: 'power2.in' })
    }

    const handleMouseEnterExclusiveElement = (e) => {
      if (!containerRef.current) return
      gsap.to(containerRef.current, { scale: 0, duration: 0.2, ease: 'power2.in' })
    }

    const handleMouseEnter = (e) => {
      if (!containerRef.current) return
      containerRef.current.style.transformOrigin = `${e.clientX}px ${e.clientY}px`
      gsap.to(containerRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' })

      if (!isOverriding.current) {
        blobsRef.current.forEach((el, i) => {
          if (!el) return
          gsap.to(el, {
            width: sizes[i],
            height: sizes[i],
            borderRadius: blobType === 'circle' ? '50%' : '0%',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }
    }


    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    const onResize = () => updateOffset();

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('blob-override', handleOverride)
    window.addEventListener('blob-scale', handleScale)
    window.addEventListener('blob-release', handleRelease)
    window.addEventListener("blob-disapear", handleMouseEnterExclusiveElement)
    window.addEventListener("blob-appear", handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('blob-override', handleOverride)
      window.removeEventListener('blob-scale', handleScale)
      window.removeEventListener('blob-release', handleRelease)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    };
  }, [updateOffset, handleMove]);

  if (isTouch) return null

  return (
    <div
      ref={containerRef}
      className="blob-container"
      id='blob-container'
      style={{ zIndex }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

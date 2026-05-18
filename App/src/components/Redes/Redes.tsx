import { use, useRef, useState } from 'react'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/tu-usuario',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tu-usuario',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/tu-id',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    label: 'Gmail',
    href: 'mailto:tu@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
]

export default function SocialBar() {
    const refs = useRef<(HTMLAnchorElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleContainerEnter = () => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        setIsHovered(true)
        window.dispatchEvent(new CustomEvent('blob-override', { detail: { x: cx, y: cy } }))
        window.dispatchEvent(new CustomEvent('blob-scale', { detail: { height: rect.height, radius: "24px" } }))
    }

    

    const handleLeave = () => {
        setIsHovered(false)
        window.dispatchEvent(new CustomEvent('blob-scale', { detail: { height: 45, radius: "36px" } })) // altura original
        window.dispatchEvent(new CustomEvent('blob-release'))
    }

    return (
      <div 
          ref={containerRef}
          onMouseEnter={handleContainerEnter}
          onMouseLeave={handleLeave}
          style={{
            position: 'fixed',
            left: '2rem',
            top: '80%',
            transform: 'translateY(-50%)',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            padding: '0.75rem',
            alignItems: 'center',
          }}>

        {socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noreferrer"
            ref={el => {refs.current[i] = el}}
            title={s.label}
            style={{
              color: isHovered ?'#0c090d' : "#e4dfe6",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              transition: 'color 0.2s ease',
              textDecoration: 'none',
              zIndex: 900,
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
          >
            {s.icon}
          </a>
        ))}

      </div>
    )
}   
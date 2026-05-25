import { useEffect, useState } from 'react'

export default function TerminalBack() {
  const [startTyping, setStartTyping] = useState(false)
  const [command1, setCommand1] = useState('')
  const [showOutput1, setShowOutput1] = useState(false)
  const [command2, setCommand2] = useState('')
  const [showOutput2, setShowOutput2] = useState(false)

  useEffect(() => {
    // Escuchamos el evento de GSAP para arrancar
    const handleStart = () => {
      // Si ya empezó o ya terminó, no hacemos nada para evitar que se pise la animación
      setStartTyping(true)
    }
    
    window.addEventListener('start-terminal-typing', handleStart)
    return () => {
      window.removeEventListener('start-terminal-typing', handleStart)
    }
  }, [])

  useEffect(() => {
    if (!startTyping || command1.length > 0) return

    let txt1 = ' whoami'
    let i = 0
    const timer1 = setInterval(() => {
      if (i < txt1.length) {
        const char = txt1.charAt(i)
        i++
        setCommand1((prev) => prev + char)  
      } else {
        clearInterval(timer1)
        setTimeout(() => {
          setShowOutput1(true)
          triggerSecondCommand()
        }, 350)
      }
    }, 90)

    const triggerSecondCommand = () => {
      let txt2 = ' cat about.txt'
      let j = 0
      const timer2 = setInterval(() => {
        if (j < txt2.length) {
          const char = txt2.charAt(j)
          j++
          setCommand2((prev) => prev + char)  // ✅ idem
        } else {
          clearInterval(timer2)
          setTimeout(() => setShowOutput2(true), 350)
        }
      }, 80)
    }
  }, [startTyping])

  return (
    <div
      className="h-full absolute inset-0 rounded-xl border border-[#331c4e] bg-[#050208]/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden text-[#cdd6f4]"
      style={{
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        width: 'clamp(400px, 40vw, 500px)',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#11071c]/90 border-b border-[#331c4e] select-none shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs text-[#bda0f8]/50 font-sans font-medium">portfolio ~ guest</div>
        <div className="w-12" />
      </div>

      {/* Body */}
      <div className="grow p-6 font-mono text-[13px] leading-relaxed lg:overflow-hidden overflow-y-auto text-left flex flex-col gap-5">
        
        {/* BLOQUE 1: whoami */}
        {startTyping && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#bda0f8] font-bold">$</span>
              <span className="text-[#e2d5f8]">{command1}</span>
              {!showOutput1 && <span className="w-1.5 h-4 bg-[#bda0f8] animate-pulse inline-block" />}
            </div>

            {showOutput1 && (
              <div className="mt-3 pl-4 border-l-2 border-[#331c4e] flex flex-col gap-2">
                <div className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#bda0f8] to-[#efebd8] tracking-wide mb-1">
                  JOSÉ BARRAGÁN
                </div>
                <div className="flex gap-4">
                  <span className="text-[#bda0f8]/60 font-semibold w-14 inline-block">ROLE</span>
                  <span className="text-[#efebd8]">Fullstack Developer</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#bda0f8]/60 font-semibold w-14 inline-block">STACK</span>
                  <span className="text-[#efebd8]/90">Node · NestJS · React · TypeScript · Postgres · Docker</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BLOQUE 2: cat about.txt */}
        {showOutput1 && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#bda0f8] font-bold">$</span>
              <span className="text-[#e2d5f8]">{command2}</span>
              {!showOutput2 && <span className="w-1.5 h-4 bg-[#bda0f8] animate-pulse inline-block" />}
            </div>

            {showOutput2 && (
              <div className="mt-3 pl-4 border-l-2 border-[#331c4e] text-[#efebd8]/80 text-justify max-w-105 font-sans text-xs leading-relaxed">
                <p>I am a Fullstack Developer and a System Engineering student at UTN, currently halfway through my degree.</p>
  <p>Beyond specific frameworks like TypeScript, React, and NestJS, I am deeply driven by robust system design, scalable infrastructure, and performance optimization.</p>
  <p>I don't just build features; I architect solutions. I am constantly learning, bridging the gap between academic theory and real-world engineering to deliver cleaner, more efficient systems.</p>
              </div>
            )}
          </div>
        )}

        {/* Cursor final activo */}
        {showOutput2 && (
          <div className="flex items-center gap-2">
            <span className="text-[#bda0f8] font-bold">$</span>
            <span className="w-1.5 h-4 bg-[#bda0f8] animate-pulse inline-block" />
          </div>
        )}

      </div>
    </div>
  )
}
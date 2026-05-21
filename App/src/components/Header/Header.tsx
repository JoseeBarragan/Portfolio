import { useRef } from "react"

export default function Header() {
    const logoRef = useRef<HTMLDivElement>(null)
    const emailRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const workRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)

    // Función genérica para manejar el hover en cualquier elemento
    const handleEnter = (ref: React.RefObject<HTMLElement | null>, forceHeight?: number) => {
        const el = ref.current
        if (!el) return
        
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        
        window.dispatchEvent(new CustomEvent('blob-override', { detail: { x: cx, y: cy } }))
        
        // Usamos el height forzado si se pasa (como en el logo), si no, usamos el del elemento
        const targetHeight = forceHeight !== undefined ? forceHeight : rect.height;
        window.dispatchEvent(new CustomEvent('blob-scale', { detail: { height: targetHeight, width: rect.width, radius: '36px' } }))
    }

    const handleLeave = () => {
      window.dispatchEvent(new CustomEvent('blob-scale', { detail: { height: 45, width: 45, radius: '24px' } }))
      window.dispatchEvent(new CustomEvent('blob-release'))
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-900 flex items-center px-10 py-6 max-w-full w-full">
  
            {/* Logo - izquierda */}
            {/* Nota: cambié logoRef de HTMLParagraphElement a HTMLDivElement ya que lo aplicas a un <div> */}
            <div 
                id="logo" 
                ref={logoRef} 
                onMouseEnter={() => handleEnter(logoRef, 45)} 
                onMouseLeave={handleLeave} 
                className="group flex items-center justify-center w-11.25 h-11.25 rounded-[36px] z-900"
            >
                <p className="flex items-center justify-center z-900 font-medium text-white group-hover:text-black">JB</p>
            </div>

            {/* Mail - centro absoluto */}
            <a href="#email" className="absolute left-1/2 -translate-x-1/2">
                <div 
                    id="email" 
                    ref={emailRef} 
                    onMouseEnter={() => handleEnter(emailRef)} 
                    onMouseLeave={handleLeave} 
                    className="cursor-pointer group px-3 py-2 rounded-[36px] z-900"
                >
                    <p className="z-900 text-white tracking-widest group-hover:text-black font-medium">barraganseba@gmail.com</p>
                </div>
            </a>

            {/* Nav - derecha */}
            <div className="flex gap-14 ml-auto justify-between">
                <a href="#about">
                    <div className="group px-3 py-2 cursor-pointer" ref={aboutRef} onMouseEnter={() => handleEnter(aboutRef)} onMouseLeave={handleLeave}>
                        <p className="text-white group-hover:text-black font-medium">ABOUT</p>
                    </div>
                </a>
                <a href="#work">
                    <div className="group px-3 py-2 cursor-pointer" ref={workRef} onMouseEnter={() => handleEnter(workRef)} onMouseLeave={handleLeave}>
                        <p className="text-white group-hover:text-black font-medium">WORK</p>
                    </div>
                </a>
                <a href="#contact">
                    <div className="group px-3 py-2 cursor-pointer" ref={contactRef} onMouseEnter={() => handleEnter(contactRef)} onMouseLeave={handleLeave}>
                        <p className="text-white group-hover:text-black font-medium">CONTACT</p>
                    </div>
                </a>
            </div>

        </header>
    )
}
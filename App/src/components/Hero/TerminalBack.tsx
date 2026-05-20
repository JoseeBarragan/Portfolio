// TerminalBack.tsx
export default function TerminalBack() {
  return (
    <div 
      className="w-full h-full rounded-xl border border-[#331c4e] bg-[#0d0714]/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden text-[#cccccc]"
      style={{
        // Forzamos que se mantenga dado vuelta por defecto en el espacio 3D
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Barra superior de la terminal trasera (Para que mantenga la estética) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#160c22]/80 border-b border-[#331c4e] select-none shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs text-[#bda0f8]/70 font-sans">joseph@archlinux:~</div>
        <div className="w-12"></div>
      </div>

      {/* Cuerpo principal: Fondo negro/oscuro que toma todo el espacio restante */}
      <div className="grow bg-[#050208] p-6 font-mono text-sm overflow-auto text-left">
        {/* De entrada queda vacío u ocupando espacio, acá irá tu neofetch o contenido futuro */}
        <span className="text-[#bda0f8]/40 animate-pulse">&gt; _</span>
      </div>
    </div>
  )
}
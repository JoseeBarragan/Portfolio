import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { socials } from "@/components/Redes/socials";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "STACK", href: "#stack" },
];

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.9,
} as const;

const slide: [number, number, number, number] = [0.32, 0.72, 0, 1];

const asideTransition = {
  duration: 0.45,
  ease: slide,
} as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll lock: bloqueamos el scroll poniendo overflow:hidden en el <html>.
  // A diferencia del body, el documentElement no colapsa el layout ni
  // resetea la posición del scroll, así no hay salto ni fondo blanco.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Cierra el menú, espera a que termine la animación de salida y el
  // body recupere su scroll normal, y recién ahí scrollea al destino.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      let y = el.getBoundingClientRect().top + window.scrollY;
      // Replica el offset que usa el hero en desktop para #about
      if (id === "about") y += 500;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      {/* Hamburger -> X */}
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-1200 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md lg:hidden"
      >
        <span className="relative block h-4 w-6">
          <motion.span
            animate={open ? { rotate: 45, y: 0, width: 22 } : { rotate: 0, y: -5, width: 24 }}
            transition={spring}
            className="absolute left-0 top-1/2 block h-0.5 -translate-y-1/2 rounded-full bg-white"
          />
          <motion.span
            animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-white"
          />
          <motion.span
            animate={open ? { rotate: -45, y: 0, width: 22 } : { rotate: 0, y: 5, width: 16 }}
            transition={spring}
            className="absolute left-0 top-1/2 block h-0.5 -translate-y-1/2 rounded-full bg-white"
          />
        </span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-1100 bg-black/50 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Aside */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={asideTransition}
            className="fixed left-0 top-0 z-1150 flex h-screen w-[82vw] max-w-sm flex-col justify-between bg-[#121014]/95 px-8 pb-10 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/40">Navegación</p>
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: 0.1 + i * 0.07 }}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-5"
                  >
                    <span className="text-xs font-mono text-white/35 group-hover:text-[#e0bef8]">
                      0{i + 1}
                    </span>
                    <span className="text-3xl font-medium text-white transition-colors group-hover:text-[#e0bef8]">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">Contacto</p>
              <div className="flex flex-col gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.25 + i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:border-[#e0bef8]/50 hover:bg-white/10"
                  >
                    <span className="text-white/80">{s.icon(22)}</span>
                    <span className="text-lg text-white/90">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

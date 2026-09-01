import { useRef, useState } from "react";
import { socials } from "./socials";

export default function SocialBar() {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleContainerEnter = () => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setIsHovered(true);
    window.dispatchEvent(
      new CustomEvent("blob-override", { detail: { x: cx, y: cy } }),
    );
    window.dispatchEvent(
      new CustomEvent("blob-scale", {
        detail: { height: rect.height, radius: "24px", width: 45 },
      }),
    );
  };

  const handleLeave = () => {
    setIsHovered(false);
    window.dispatchEvent(
      new CustomEvent("blob-scale", {
        detail: { height: 45, radius: "36px", width: 45 },
      }),
    );
    window.dispatchEvent(new CustomEvent("blob-release"));
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleContainerEnter}
      onMouseLeave={handleLeave}
      className="hidden md:flex fixed left-4 top-[82%] -translate-y-1/2 z-900 flex-col gap-2 p-3 items-center"
    >
      {socials.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target={s.href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noreferrer"
          ref={(el) => {
            refs.current[i] = el;
          }}
          title={s.label}
          style={{
            color: isHovered ? "#0c090d" : "#e4dfe6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: "50%",
            transition: "color 0.2s ease",
            textDecoration: "none",
            zIndex: 900,
          }}
        >
          {s.icon(25)}
        </a>
      ))}
    </div>
  );
}

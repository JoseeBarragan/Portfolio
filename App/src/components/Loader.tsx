import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BorderFillProgress from "./BorderFillProgress";
import SimpleMarquee from "./CurvedText";

export default function Loader() {
  const btnRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [showPercent, setShowPercent] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const progress = { value: 0 };

    document.body.style.overflowY = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflowY = "unset";
    }, 4000);

    gsap.to(progress, {
      value: 100,
      duration: 4,
      ease: "power2.inOut",
      onUpdate: () => {
        setPercent(Math.round(progress.value));
      },
      onComplete: () => {
        setShowPercent(false);
        setExpanded(true);

        gsap.to(btnRef.current, {
          scale: 40,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                if (loaderRef.current) loaderRef.current.style.display = "none";
                window.dispatchEvent(new CustomEvent('loader-complete'))
              },
            });
          },
        });
      },
    });

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "unset";
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e4dfe6",
      }}
    >
      {/* CurvedLoop centrado detrás */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        <SimpleMarquee
            text="< FULLSTACK /> · < BACKEND /> · < FRONTEND />"
            speed={60}
            direction="left"
            className="curved-text"
         />
      </div>

      {/* Botón encima */}
      <div
        ref={btnRef}
        style={{
          transformOrigin: "center",
          pointerEvents: "auto",
          position: "relative",
          zIndex: 1000,
        }}
      >
        {expanded ? (
          <div
            style={{
              width: "270px",
              height: "70px",
              borderRadius: "28px",
              background: "#120F17",
            }}
          />
        ) : (
          <div style={{ position: 'relative', width: 270, height: 70 }}>
            <BorderFillProgress percent={percent} width={270} height={70} radius={28} />
              <div style={{
                width: '270px',
                height: '70px',
                borderRadius: '28px',
                background: '#120F17',
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
                    <span className="text-[#888] select-none">LOADING</span>
                    <span className="select-none"> {percent}%</span>
                  </>
                )}
              </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode[];
}

// Hem OTOMATIK kayan hem de kullanıcının ELİYLE (dokunarak/sürükleyerek)
// kaydırabildiği şerit. Gerçek bir scroll container kullanır (requestAnimationFrame
// ile otomatik ilerler), kullanıcı dokunduğunda otomatik kaymayı durdurur,
// bıraktıktan birkaç saniye sonra otomatik devam eder.
export function ProviderCarousel({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    function step() {
      if (el && !pausedRef.current) {
        el.scrollLeft += 0.6;
        // Kartlar iki kez tekrarlandığı için, yarısına gelince başa sar —
        // kullanıcı sonsuz döngü gibi hisseder.
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  function pause() {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  }
  function resumeAfterDelay() {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 3000);
  }

  return (
    <>
      <style>{`
        .rp-scrollbox::-webkit-scrollbar{display:none}
        .rp-scrollbox{scrollbar-width:none;-ms-overflow-style:none}
      `}</style>
      <div
        ref={scrollRef}
        onTouchStart={pause}
        onTouchEnd={resumeAfterDelay}
        onMouseDown={pause}
        onMouseUp={resumeAfterDelay}
        onMouseLeave={resumeAfterDelay}
        className="rp-scrollbox"
        style={{
          display: "flex",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
          padding: "0 20px",
        }}
      >
        {children}
      </div>
    </>
  );
}

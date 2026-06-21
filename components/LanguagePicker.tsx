"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LANGUAGES, getLanguage } from "@/lib/data/languages";

// ─────────────────────────────────────────────────────────────
// Üstteki dil seçici. "Language" yazısı + ok.
// Basınca açılır, dışarı/boş yere basınca kapanır.
// ─────────────────────────────────────────────────────────────

export function LanguagePicker({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lang = getLanguage(locale);

  // Dışarı tıklayınca kapan
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-xs sm:text-sm text-sky flex items-center gap-1.5"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span>{lang?.label ?? "Language"}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1.5 w-44 z-30 max-h-72 overflow-auto">
          {LANGUAGES.map((l) => (
            <Link
              key={l.code}
              href={`/${l.code}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-1.5 text-sm hover:bg-sky ${l.code === locale ? "text-navy font-semibold" : "text-navy"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

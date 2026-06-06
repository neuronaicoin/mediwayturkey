"use client";

import { useState } from "react";
import { AiAssistant } from "@/components/AiAssistant";

interface Props {
  locale: string;
  label: string;
}

// Ana sayfadaki "Let our AI assistant guide you" butonu + sohbet penceresi.
export function AiEntry({ locale, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-gold-tint border border-gold/40 rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:brightness-[0.99] transition"
      >
        <span className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="#fbbf24" />
          </svg>
        </span>
        <span className="flex-1 text-sm text-navy font-semibold">{label}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="#0a2540" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <AiAssistant locale={locale} onClose={() => setOpen(false)} />}
    </>
  );
}

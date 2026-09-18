"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";

interface Props {
  locale: string;
  citySlug: string;
  cityName: string;
  gradientTo: string;
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"
        stroke="#0a2540" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" fill="#c9a84c" />
    </svg>
  );
}

// Şehir kartı — kompakt, tek satır (TreatmentCard ile aynı gorsel dil).
// Tıklanınca TEDAVİ seçenekleri açılır (varsaymadan sorar).
export function CityCard({ locale, citySlug, cityName, gradientTo }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-shadow ${
        open ? "border-gold shadow-md" : "border-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex flex-col items-center gap-1.5 px-2 py-3 text-center active:scale-[0.98] transition-transform"
      >
        <div className="w-9 h-9 rounded-full bg-gold-tint flex items-center justify-center">
          <PinIcon />
        </div>
        <span className="text-[12px] font-semibold text-navy leading-tight">{cityName}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-3 bg-cream">
          <div className="text-[10.5px] uppercase tracking-wide text-slate-soft font-semibold mb-2 text-center">
            Choose a treatment
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ACTIVE_TREATMENTS.map((tr) => (
              <button
                key={tr.slug}
                onClick={() => router.push(`/${locale}/${tr.slug}/${citySlug}`)}
                className="text-xs bg-white border border-gray-200 text-navy px-3 py-1.5 rounded-lg hover:border-gold hover:bg-gold-tint active:scale-95 transition"
              >
                {tr.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

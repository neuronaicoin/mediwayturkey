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

// Şehre özel zarif çok tonlu gradyan — fotoğraf riski yok, siteyle tutarlı görsel dil
const CITY_GRADIENTS: Record<string, string> = {
  istanbul: "linear-gradient(155deg, #0a2540 0%, #1c3a55 55%, #21405e 100%)",
  antalya: "linear-gradient(155deg, #0a2540 0%, #16344f 55%, #26485f 100%)",
  izmir: "linear-gradient(155deg, #0a2540 0%, #143a5e 55%, #1c3a55 100%)",
  ankara: "linear-gradient(155deg, #0a2540 0%, #1c3a55 55%, #234862 100%)",
  bursa: "linear-gradient(155deg, #0a2540 0%, #143a5e 55%, #21405e 100%)",
  cappadocia: "linear-gradient(155deg, #0a2540 0%, #16344f 55%, #1e4058 100%)",
};

function PinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"
        stroke="#fbbf24" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" stroke="#fbbf24" strokeWidth="1.6" />
    </svg>
  );
}

// Şehir kartı: tıklanınca TEDAVİ seçenekleri açılır (varsaymadan sorar).
export function CityCard({ locale, citySlug, cityName, gradientTo }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const gradient = CITY_GRADIENTS[citySlug] || `linear-gradient(155deg, #0a2540, ${gradientTo})`;

  return (
    <div className="rounded-xl overflow-hidden border-[1.5px] border-gold/60 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-full h-28 flex flex-col items-center justify-center gap-1.5 hover:brightness-110 transition overflow-hidden"
        style={{ background: gradient }}
      >
        {/* zarif altın parıltı — hero/how-it-works ile tutarlı */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-[0.16] pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full opacity-[0.10] pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
        />
        <div className="relative">
          <PinIcon />
        </div>
        <span className="relative text-gold text-base font-bold tracking-wide">
          {cityName}
        </span>
        <div className="relative w-6 h-[2px] bg-gold/50 rounded-full" />
      </button>

      {open && (
        <div className="p-3 bg-cream border border-t-0 border-gray-200 rounded-b-xl">
          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-2 text-center">
            Choose a treatment
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ACTIVE_TREATMENTS.map((tr) => (
              <button
                key={tr.slug}
                onClick={() => router.push(`/${locale}/${tr.slug}/${citySlug}`)}
                className="text-xs bg-white border border-gray-200 text-navy px-3 py-1.5 rounded-lg hover:border-gold hover:bg-gold-tint transition"
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

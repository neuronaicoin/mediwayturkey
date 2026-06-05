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

// Şehir kartı: tıklanınca TEDAVİ seçenekleri açılır (varsaymadan sorar).
export function CityCard({ locale, citySlug, cityName, gradientTo }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full h-28 flex items-center justify-center p-3 hover:brightness-110 transition"
        style={{ background: `linear-gradient(135deg, #0a2540, ${gradientTo})` }}
      >
        <span className="text-white text-lg font-semibold tracking-wide">{cityName}</span>
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

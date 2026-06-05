"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_CITIES } from "@/lib/data/cities";

interface Props {
  locale: string;
  treatmentSlug: string;
  treatmentName: string;
  subtitle: string;
  icon: ReactNode;
}

// Tedavi kartı: tıklanınca ŞEHİR seçenekleri açılır (varsaymadan sorar).
export function TreatmentCard({
  locale,
  treatmentSlug,
  treatmentName,
  subtitle,
  icon,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full p-5 text-center hover:bg-sky/40 transition"
      >
        <div className="flex justify-center mb-2">{icon}</div>
        <div className="text-sm font-semibold text-navy">{treatmentName}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{subtitle}</div>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-3 bg-cream">
          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-2 text-center">
            Choose a city
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ACTIVE_CITIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => router.push(`/${locale}/${treatmentSlug}/${c.slug}`)}
                className="text-xs bg-white border border-gray-200 text-navy px-3 py-1.5 rounded-lg hover:border-gold hover:bg-gold-tint transition"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

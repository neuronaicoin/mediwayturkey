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

// Tedaviye özel zarif gradyan — fotoğraf riski yok, her zaman doğru ve tutarlı görünür
const TREATMENT_GRADIENTS: Record<string, string> = {
  "hair-transplant": "linear-gradient(150deg, #0a2540 0%, #1c3a55 100%)",
  dental: "linear-gradient(150deg, #143a5e 0%, #21405e 100%)",
  aesthetics: "linear-gradient(150deg, #0c2d4d 0%, #26485f 100%)",
};

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
  const gradient = TREATMENT_GRADIENTS[treatmentSlug] || TREATMENT_GRADIENTS["hair-transplant"];

  return (
    <div className="bg-white border-[1.5px] border-navy rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-center hover:opacity-95 transition"
      >
        <div
          className="relative w-full h-24 flex items-center justify-center overflow-hidden"
          style={{ background: gradient }}
        >
          {/* zarif dekoratif desen */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
          />
          <div className="relative bg-white/95 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
            {icon}
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm font-semibold text-navy">{treatmentName}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{subtitle}</div>
        </div>
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

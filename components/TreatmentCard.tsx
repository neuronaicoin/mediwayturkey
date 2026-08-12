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

// Tedavi görselleri — gerçek fotoğraf
const TREATMENT_IMAGES: Record<string, string> = {
  "hair-transplant": "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=500&q=75",
  dental: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=500&q=75",
  aesthetics: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=500&q=75",
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
  const imageUrl = TREATMENT_IMAGES[treatmentSlug];

  return (
    <div className="bg-white border-[1.5px] border-navy rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-center hover:bg-sky/40 transition"
      >
        {imageUrl && (
          <div className="relative w-full h-28 overflow-hidden">
            <img src={imageUrl} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-white/95 rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
              {icon}
            </div>
          </div>
        )}
        <div className="p-4">
          {!imageUrl && <div className="flex justify-center mb-2">{icon}</div>}
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

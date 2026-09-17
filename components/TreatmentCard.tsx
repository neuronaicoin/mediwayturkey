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
  tag?: string;
}

// Tedavi kartı — kompakt, tek satır. Tıklanınca ŞEHİR seçenekleri altında açılır.
export function TreatmentCard({
  locale,
  treatmentSlug,
  treatmentName,
  subtitle,
  icon,
  tag,
}: Props) {
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
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left active:scale-[0.98] transition-transform"
      >
        <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-gold-tint flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold text-navy leading-tight truncate">{treatmentName}</div>
          <div className="text-[11px] text-slate-soft mt-0.5 truncate">{subtitle}</div>
        </div>
        {tag && (
          <span className="flex-shrink-0 text-[9.5px] font-semibold text-gold-deep bg-gold-tint px-2 py-1 rounded-full">
            {tag}
          </span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          className={`flex-shrink-0 text-slate-soft transition-transform ${open ? "rotate-90" : ""}`}
        >
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-gray-100 p-3 bg-cream">
          <div className="text-[10.5px] uppercase tracking-wide text-slate-soft font-semibold mb-2 text-center">
            Choose a city
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ACTIVE_CITIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => router.push(`/${locale}/${treatmentSlug}/${c.slug}`)}
                className="text-xs bg-white border border-gray-200 text-navy px-3 py-1.5 rounded-lg hover:border-gold hover:bg-gold-tint active:scale-95 transition"
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

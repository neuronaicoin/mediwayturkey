"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";

interface Props {
  locale: string;
  labels: { treatment: string; city: string; search: string };
}

export function SearchBar({ locale, labels }: Props) {
  const router = useRouter();
  const [treatment, setTreatment] = useState(ACTIVE_TREATMENTS[0].slug);
  const [city, setCity] = useState(ACTIVE_CITIES[0].slug);

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    // Aramayı arka planda kaydet (kullanıcıyı bekletmeden).
    // Hata olursa sessizce yutulur, yönlendirme her durumda yapılır.
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          type: "search",
          treatment,
          city,
          locale,
        }),
      }).catch(() => {
        // sessizce yut
      });
    } catch {
      // sessizce yut
    }

    router.push(`/${locale}/${treatment}/${city}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/90 backdrop-blur-md border border-gold/40 rounded-2xl p-2.5 shadow-[0_20px_50px_-12px_rgba(11,28,44,0.45)] sm:flex sm:items-stretch sm:gap-2"
    >
      {/* Treatment + City her zaman yan yana (mobilde de) */}
      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-1 sm:gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 sm:border-r border-gray-100 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
            <path d="M5 3v5a4 4 0 0 0 8 0V3" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9 12v3a5 5 0 0 0 10 0v-2" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="19" cy="11" r="2" stroke="#0a2540" strokeWidth="1.6" />
          </svg>
          <div className="text-left flex-1 min-w-0">
            <div className="text-[9.5px] sm:text-[11px] uppercase tracking-wide text-gray-400 font-medium truncate">
              {labels.treatment}
            </div>
            <select
              value={treatment}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTreatment(e.target.value)}
              className="w-full text-[13px] sm:text-base text-navy font-semibold bg-transparent outline-none cursor-pointer"
            >
              {ACTIVE_TREATMENTS.map((tr) => (
                <option key={tr.slug} value={tr.slug}>
                  {tr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
            <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="#0a2540" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.5" stroke="#0a2540" strokeWidth="1.6" />
          </svg>
          <div className="text-left flex-1 min-w-0">
            <div className="text-[9.5px] sm:text-[11px] uppercase tracking-wide text-gray-400 font-medium truncate">
              {labels.city}
            </div>
            <select
              value={city}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
              className="w-full text-[13px] sm:text-base text-navy font-semibold bg-transparent outline-none cursor-pointer"
            >
              {ACTIVE_CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Kucuk, kompakt arama butonu - once buyuk/baskin degil */}
      <button
        type="submit"
        className="mt-2 sm:mt-0 w-full sm:w-auto sm:self-center bg-gradient-to-b from-navy-soft to-navy text-white flex items-center justify-center gap-1.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-[12.5px] sm:text-sm font-semibold shadow active:scale-[0.98] transition-transform"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {labels.search}
      </button>
    </form>
  );
}

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
    router.push(`/${locale}/${treatment}/${city}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white border-2 border-gold rounded-2xl p-2.5 flex flex-col sm:flex-row gap-2 shadow-xl"
    >
      <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:border-r border-gray-100">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 3v5a4 4 0 0 0 8 0V3" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 12v3a5 5 0 0 0 10 0v-2" stroke="#0a2540" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="19" cy="11" r="2" stroke="#0a2540" strokeWidth="1.6" />
        </svg>
        <div className="text-left flex-1">
          <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
            {labels.treatment}
          </div>
          <select
            value={treatment}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTreatment(e.target.value)}
            className="w-full text-base text-navy font-semibold bg-transparent outline-none cursor-pointer"
          >
            {ACTIVE_TREATMENTS.map((tr) => (
              <option key={tr.slug} value={tr.slug}>
                {tr.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:border-r border-gray-100">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="#0a2540" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.5" stroke="#0a2540" strokeWidth="1.6" />
        </svg>
        <div className="text-left flex-1">
          <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
            {labels.city}
          </div>
          <select
            value={city}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
            className="w-full text-base text-navy font-semibold bg-transparent outline-none cursor-pointer"
          >
            {ACTIVE_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-navy text-white flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-semibold hover:bg-navy-light transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {labels.search}
      </button>
    </form>
  );
}

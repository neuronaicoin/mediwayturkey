"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LANGUAGES } from "@/lib/data/languages";
import { useSavedProviders } from "@/lib/useSavedProviders";

// Server'dan gelen hafifletilmiş provider verisi
export interface ListingProvider {
  id: string;
  business_name: string;
  plan: string;
  is_verified: boolean;
  languages: string[];
  districts: string[];
  techValues: string[]; // tedavi detayları (fue, dhi, implant...)
  coverPhoto: string | null;
}

interface FilterGroup {
  key: string;
  label: string;
  options: { slug: string; name: string }[];
}

interface Props {
  locale: string;
  cityName: string;
  citySlug: string;
  providers: ListingProvider[];
  filterGroups: FilterGroup[];
  districts: { slug: string; name: string }[];
  labels: {
    filters: string;
    resultsFound: string;
    verified: string;
  };
}

export function ListingResults({
  locale,
  cityName,
  citySlug,
  providers,
  filterGroups,
  districts,
  labels,
}: Props) {
  const { isSaved, toggle } = useSavedProviders();

  // Seçili filtreler (henüz uygulanmamış)
  const [selTech, setSelTech] = useState<string[]>([]);
  const [selLangs, setSelLangs] = useState<string[]>([]);
  const [selDistricts, setSelDistricts] = useState<string[]>([]);
  // Uygulanmış filtreler (Apply'a basınca güncellenir)
  const [applied, setApplied] = useState<{ tech: string[]; langs: string[]; districts: string[] }>({
    tech: [],
    langs: [],
    districts: [],
  });

  function toggleArr(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  function applyFilters() {
    setApplied({ tech: selTech, langs: selLangs, districts: selDistricts });
  }

  function clearFilters() {
    setSelTech([]);
    setSelLangs([]);
    setSelDistricts([]);
    setApplied({ tech: [], langs: [], districts: [] });
  }

  // Filtrelenmiş sonuçlar
  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (applied.tech.length > 0) {
        const has = applied.tech.some((t) => p.techValues.includes(t));
        if (!has) return false;
      }
      if (applied.langs.length > 0) {
        const has = applied.langs.some((l) => p.languages.includes(l));
        if (!has) return false;
      }
      if (applied.districts.length > 0) {
        const has = applied.districts.some((d) => p.districts.includes(d));
        if (!has) return false;
      }
      return true;
    });
  }, [providers, applied]);

  const hasSelection = selTech.length > 0 || selLangs.length > 0 || selDistricts.length > 0;
  const hasApplied = applied.tech.length > 0 || applied.langs.length > 0 || applied.districts.length > 0;

  const filterableLangs = LANGUAGES.filter((l) =>
    ["en", "tr", "de", "fr", "ar", "es", "it", "ru"].includes(l.code)
  );

  return (
    <>
      <p className="text-sm text-slate-body mb-4">
        Hair Transplant in {cityName} —{" "}
        <span className="text-navy font-semibold">
          {filtered.length} {labels.resultsFound}
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-5">
        {/* ─── FİLTRE PANELİ ─── */}
        <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
          <div className="text-base font-semibold text-navy mb-4">{labels.filters}</div>

          {filterGroups.map((g) => (
            <div key={g.key} className="mb-4">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                {g.label}
              </div>
              {g.options.slice(0, 8).map((o) => (
                <label key={o.slug} className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-navy"
                    checked={selTech.includes(o.slug)}
                    onChange={() => setSelTech((p) => toggleArr(p, o.slug))}
                  />
                  {o.name}
                </label>
              ))}
            </div>
          ))}

          <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
              Language
            </div>
            {filterableLangs.map((l) => (
              <label key={l.code} className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-navy"
                  checked={selLangs.includes(l.code)}
                  onChange={() => setSelLangs((p) => toggleArr(p, l.code))}
                />
                {l.label}
              </label>
            ))}
          </div>

          {districts.length > 0 && (
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                Area
              </div>
              {districts.map((d) => (
                <label key={d.slug} className="flex items-center gap-2 text-sm text-navy mb-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-navy"
                    checked={selDistricts.includes(d.slug)}
                    onChange={() => setSelDistricts((p) => toggleArr(p, d.slug))}
                  />
                  {d.name}
                </label>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5">
            <button
              onClick={applyFilters}
              disabled={!hasSelection}
              className="w-full bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply filters
            </button>
            {(hasApplied || hasSelection) && (
              <button
                onClick={clearFilters}
                className="w-full border border-gray-300 text-navy py-2.5 rounded-lg text-sm font-semibold hover:bg-sky transition"
              >
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* ─── SONUÇLAR ─── */}
        <section className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
              <p className="text-sm text-slate-body">
                {hasApplied
                  ? "No providers match these filters. Try clearing some filters."
                  : "No providers listed here yet. New clinics are joining soon."}
              </p>
            </div>
          ) : (
            filtered.map((p) => {
              const isPremium = p.plan === "premium";
              const saved = isSaved(p.id);
              return (
                <Link
                  key={p.id}
                  href={`/${locale}/provider/${p.id}`}
                  className={`relative bg-white rounded-xl p-3 flex gap-3 transition hover:shadow-md ${
                    isPremium ? "border-2 border-gold" : "border border-gray-200"
                  }`}
                >
                  {/* Kaydet (kalp) butonu */}
                  <button
                    type="button"
                    aria-label={saved ? "Remove from saved" : "Save"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggle({
                        id: p.id,
                        name: p.business_name,
                        city: cityName,
                        photo: p.coverPhoto ?? undefined,
                      });
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center z-10 hover:border-gold"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill={saved ? "#f0ad2f" : "none"}
                      stroke={saved ? "#f0ad2f" : "#8a8a82"}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
                    </svg>
                  </button>

                  <div className="w-20 h-20 bg-sky rounded-lg flex-shrink-0 relative overflow-hidden">
                    {p.coverPhoto ? (
                      <img src={p.coverPhoto} alt={p.business_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-muted">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="8.5" cy="10" r="1.5" fill="currentColor"/>
                          <path d="m4 17 5-4 4 3 3-2 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {isPremium && (
                      <span className="absolute top-1 left-1 bg-gold text-navy text-[8px] font-bold px-1.5 py-0.5 rounded">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="text-sm font-semibold text-navy">{p.business_name}</div>
                    {p.is_verified && (
                      <div className="text-[10px] text-emerald-trust mt-0.5">✓ {labels.verified}</div>
                    )}
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {cityName}
                      {p.languages.length > 0 &&
                        " · " + p.languages.map((l) => l.toUpperCase()).join(" · ")}
                    </div>
                    {p.techValues.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.techValues.slice(0, 4).map((v) => (
                          <span key={v} className="text-[9px] bg-sky text-navy px-2 py-0.5 rounded">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </div>
    </>
  );
}

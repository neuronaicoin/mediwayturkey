"use client";

import { useState, type ReactNode } from "react";
import { TreatmentCard } from "@/components/TreatmentCard";
import { CityCard } from "@/components/CityCard";

interface TreatmentItem {
  slug: string;
  name: string;
  subtitle: string;
  icon: ReactNode;
  tag?: string;
}
interface CityItem {
  slug: string;
  name: string;
  gradientTo: string;
}
interface Props {
  locale: string;
  title: string;
  treatmentTabLabel: string;
  cityTabLabel: string;
  treatments: TreatmentItem[];
  cities: CityItem[];
}

// "Search Treatment" ve "Popular Destinations" bölümlerini TEK bir
// sekmeli kutuda birleştirir. İkisi zaten aynı hedefe (tedavi × şehir
// eşleşmesi) farklı iki kapıdan gidiyordu — tek kutu daha az tekrar,
// daha kısa sayfa demek.
export function TreatmentCityTabs({
  locale,
  title,
  treatmentTabLabel,
  cityTabLabel,
  treatments,
  cities,
}: Props) {
  const [tab, setTab] = useState<"treatment" | "city">("treatment");

  return (
    <section className="max-w-container mx-auto px-5 mt-3 w-full">
      <div className="text-center mb-5">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">{title}</h2>
        <div className="w-10 h-[3px] bg-gold rounded-full mx-auto mt-2.5" />
      </div>

      {/* Sekme geçişi */}
      <div className="flex bg-white border border-gray-100 rounded-full p-1 max-w-sm mx-auto mb-5 shadow-sm">
        <button
          onClick={() => setTab("treatment")}
          className={`flex-1 text-[11.5px] sm:text-[13px] font-semibold py-2 px-1 rounded-full transition-all active:scale-95 whitespace-nowrap ${
            tab === "treatment" ? "bg-navy text-white shadow" : "text-slate-soft"
          }`}
        >
          {treatmentTabLabel}
        </button>
        <button
          onClick={() => setTab("city")}
          className={`flex-1 text-[11.5px] sm:text-[13px] font-semibold py-2 px-1 rounded-full transition-all active:scale-95 whitespace-nowrap ${
            tab === "city" ? "bg-navy text-white shadow" : "text-slate-soft"
          }`}
        >
          {cityTabLabel}
        </button>
      </div>

      {tab === "treatment" ? (
        <div className="grid grid-cols-2 gap-2.5">
          {treatments.map((tr) => (
            <TreatmentCard
              key={tr.slug}
              locale={locale}
              treatmentSlug={tr.slug}
              treatmentName={tr.name}
              subtitle={tr.subtitle}
              icon={tr.icon}
              tag={tr.tag}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2.5">
          {cities.map((c) => (
            <CityCard
              key={c.slug}
              locale={locale}
              citySlug={c.slug}
              cityName={c.name}
              gradientTo={c.gradientTo}
            />
          ))}
        </div>
      )}
    </section>
  );
}

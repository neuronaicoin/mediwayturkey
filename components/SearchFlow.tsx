"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import { getDictionary } from "@/lib/i18n";

interface Props {
  locale: string;
  open: boolean;
  onClose: () => void;
}

function TreatmentIcon({ icon }: { icon: string }) {
  if (icon === "hair") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.6" strokeLinecap="round">
        <path d="M5 3v5a4 4 0 0 0 8 0V3" />
        <path d="M9 12v3a5 5 0 0 0 10 0v-2" />
        <circle cx="19" cy="11" r="2" />
      </svg>
    );
  }
  if (icon === "dental") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 5.5c-2-1.8-5-2-6.5-.5C4 6.5 4.5 10 6 15c.7 2.3 1 4 2 4s1.2-2 1.5-3.5c.2-1 .8-1.5 2.5-1.5s2.3.5 2.5 1.5c.3 1.5.5 3.5 1.5 3.5s1.3-1.7 2-4c1.5-5 2-8.5.5-10C17 3.5 14 3.7 12 5.5Z" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 4c2.5 3 4 5 4 8a4 4 0 0 1-8 0c0-3 1.5-5 4-8Z" />
    </svg>
  );
}

export function SearchFlow({ locale, open, onClose }: Props) {
  const router = useRouter();
  const t = getDictionary(locale);
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState<string | null>(null);

  if (!open) return null;

  function reset() {
    setStep(1);
    setTreatment(null);
  }
  function close() {
    reset();
    onClose();
  }
  function pickTreatment(slug: string) {
    setTreatment(slug);
    setStep(2);
  }
  function pickCity(citySlug: string) {
    const tr = treatment;
    close();
    router.push(`/${locale}/${tr}/${citySlug}`);
  }
  function back() {
    if (step === 2) setStep(1);
    else close();
  }

  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 z-[60] bg-cream flex flex-col" style={{ bottom: "84px" }}>
      <div className="bg-navy px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
        <button onClick={back} aria-label="Back" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-medium text-base flex-1">
          {step === 1 ? t.mobile.chooseTreatment : t.mobile.chooseCity}
        </span>
        <button onClick={close} aria-label="Close" className="text-white/70 text-sm">✕</button>
      </div>

      <div className="px-4 pt-4 flex gap-1.5 flex-shrink-0">
        <div className="flex-1 h-1 rounded-full" style={{ background: "#0c2d4f" }} />
        <div className="flex-1 h-1 rounded-full" style={{ background: step >= 2 ? "#0c2d4f" : "#dcdcd2" }} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {step === 1 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {t.mobile.step} 1 {t.mobile.of} 2 · {t.mobile.whatLookingFor}
            </p>
            {ACTIVE_TREATMENTS.map((tr) => (
              <button key={tr.slug} onClick={() => pickTreatment(tr.slug)}
                className="w-full bg-white border-[1.5px] border-navy rounded-2xl p-4 mb-3 flex items-center gap-3.5 text-left">
                <span className="w-11 h-11 bg-[#eef3f8] border border-[#d5e0ea] rounded-xl flex items-center justify-center flex-shrink-0">
                  <TreatmentIcon icon={tr.icon} />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-medium text-navy">{tr.name}</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
            <div className="mt-2 p-3 bg-[#f1f5f9] rounded-xl text-xs text-gray-500 text-center">
              {t.mobile.moreCategoriesSoon}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {t.mobile.step} 2 {t.mobile.of} 2 · {t.mobile.inWhichCity}
            </p>
            {ACTIVE_CITIES.map((c) => (
              <button key={c.slug} onClick={() => pickCity(c.slug)}
                className="w-full bg-white border-[1.5px] border-navy rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 text-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.6" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span className="flex-1 text-[15px] font-medium text-navy">{c.name}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { useSavedProviders } from "@/lib/useSavedProviders";

// ─────────────────────────────────────────────────────────────
// SavedSheet — kaydedilen klinikler (alt bardaki "Saved" butonu açar).
// Boşsa boş durum gösterir. 14 dilli.
// ─────────────────────────────────────────────────────────────

interface Props {
  locale: string;
  open: boolean;
  onClose: () => void;
}

export function SavedSheet({ locale, open, onClose }: Props) {
  const t = getDictionary(locale);
  const { saved, remove } = useSavedProviders();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-cream flex flex-col">
      {/* Üst başlık */}
      <div className="bg-navy px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
        <span className="text-white font-medium text-base flex-1">{t.mobile.saved}</span>
        <button onClick={onClose} aria-label="Close" className="text-white/80 text-xl leading-none">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center pt-16">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0c2d4f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
              <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
            </svg>
            <p className="text-[15px] font-medium text-navy mt-3">{t.mobile.savedEmpty}</p>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed max-w-xs">
              {t.mobile.savedEmptyDesc}
            </p>
          </div>
        ) : (
          saved.map((p) => (
            <div
              key={p.id}
              className="bg-white border-[1.5px] border-navy rounded-2xl p-3 mb-2.5 flex gap-3 items-center"
            >
              <Link
                href={`/${locale}/provider/${p.id}`}
                onClick={onClose}
                className="flex gap-3 items-center flex-1 min-w-0"
              >
                <div className="w-14 h-14 bg-sky rounded-lg flex-shrink-0 overflow-hidden">
                  {p.photo ? (
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-navy-muted">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8.5" cy="10" r="1.5" fill="currentColor"/>
                        <path d="m4 17 5-4 4 3 3-2 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-navy truncate">{p.name}</div>
                  {p.city && <div className="text-[11px] text-gray-500 mt-0.5">{p.city}</div>}
                </div>
              </Link>
              <button
                onClick={() => remove(p.id)}
                aria-label="Remove"
                className="w-9 h-9 rounded-full bg-[#fdf6e8] flex items-center justify-center flex-shrink-0"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#f0ad2f" stroke="#f0ad2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

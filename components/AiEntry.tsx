"use client";

import { useRouter, usePathname } from "next/navigation";

interface Props {
  locale: string;
  label: string;
  subtitle: string;
}

// Ana sayfadaki "Let our AI assistant guide you" butonu.
// Kendi modalını açmak yerine, alt bardaki (BottomNav) "Ask AI" sekmesiyle
// AYNI, kanıtlanmış çalışan görünümü tetikler — URL'e ?ai=1 ekleyerek.
// BottomNav bunu bir useEffect ile yakalayıp kendi "ai" sekmesini açar.
export function AiEntry({ locale, label, subtitle }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function openAi() {
    router.push(`${pathname}?ai=1`, { scroll: false });
  }

  return (
    <button
      onClick={openAi}
      className="w-full bg-gradient-to-r from-gold-tint to-white border border-gold/50 rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
    >
      <span className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
        {/* zarif nabız halkası - dikkat ceker ama abartisiz */}
        <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping [animation-duration:2.5s]" />
        <span className="relative w-9 h-9 rounded-full bg-navy flex items-center justify-center">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="#c9a84c" />
          </svg>
        </span>
      </span>
      <span className="flex-1">
        <span className="block text-sm text-navy font-semibold">{label}</span>
        <span className="block text-[11px] text-slate-soft mt-0.5">{subtitle}</span>
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="#0a2540" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

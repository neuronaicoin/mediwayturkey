"use client";

import { useState, type ChangeEvent } from "react";
import { ACTIVE_TREATMENTS } from "@/lib/data/treatments";
import { ACTIVE_CITIES } from "@/lib/data/cities";
import {
  AI_DETAIL_STEPS,
  AI_TIMING_STEP,
  COUNTRY_CODES,
  type AiStep,
} from "@/lib/data/ai-flow";
import { submitLead } from "@/lib/leads";

interface Props {
  locale: string;
  onClose: () => void;
  embedded?: boolean; // true: alt bar görünür kalsın diye sarmalayıcı içinde, üstte açılır
}

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

export function AiAssistant({ locale, onClose, embedded = false }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "Hi! I'll help you find the right care in Turkey. What treatment are you interested in?" },
  ]);
  const [phase, setPhase] = useState<"treatment" | "city" | "detail" | "timing" | "form" | "done">("treatment");
  const [treatment, setTreatment] = useState("");
  const [city, setCity] = useState("");
  const [detailIndex, setDetailIndex] = useState(0);
  const [details, setDetails] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function addMsg(m: ChatMessage) {
    setMessages((prev) => [...prev, m]);
  }

  const detailSteps: AiStep[] = AI_DETAIL_STEPS[treatment] ?? [];

  function pickTreatment(slug: string, label: string) {
    setTreatment(slug);
    addMsg({ from: "user", text: label });
    addMsg({ from: "bot", text: "Which city would you like to have it in?" });
    setPhase("city");
  }

  function pickCity(slug: string, label: string) {
    setCity(slug);
    addMsg({ from: "user", text: label });
    const steps = AI_DETAIL_STEPS[treatment] ?? [];
    if (steps.length > 0) {
      addMsg({ from: "bot", text: steps[0].question });
      setDetailIndex(0);
      setPhase("detail");
    } else {
      addMsg({ from: "bot", text: AI_TIMING_STEP.question });
      setPhase("timing");
    }
  }

  function pickDetail(value: string, label: string) {
    const step = detailSteps[detailIndex];
    addMsg({ from: "user", text: label });
    const newDetails = { ...details, [step.key]: value };
    setDetails(newDetails);
    const next = detailIndex + 1;
    if (next < detailSteps.length) {
      setDetailIndex(next);
      addMsg({ from: "bot", text: detailSteps[next].question });
    } else {
      addMsg({ from: "bot", text: AI_TIMING_STEP.question });
      setPhase("timing");
    }
  }

  function pickTiming(value: string, label: string) {
    addMsg({ from: "user", text: label });
    setDetails((prev) => ({ ...prev, timing: value }));
    const cityName = ACTIVE_CITIES.find((c) => c.slug === city)?.name ?? city;
    addMsg({
      from: "bot",
      text: `Perfect. Leave your WhatsApp and the right providers in ${cityName} will contact you within 24h.`,
    });
    setPhase("form");
  }

  async function handleSubmit() {
    setError("");
    if (!name.trim() || !whatsapp.trim()) {
      setError("Please enter your name and WhatsApp number.");
      return;
    }
    if (!consent) {
      setError("Please accept the consent to continue.");
      return;
    }
    setSubmitting(true);
    const ok = await submitLead({
      patient_name: name.trim(),
      whatsapp_country_code: countryCode,
      whatsapp: whatsapp.trim(),
      treatment_slug: treatment,
      city_slug: city,
      details,
      locale,
      consent,
    });
    setSubmitting(false);
    if (ok) {
      addMsg({ from: "bot", text: "Thank you! Suitable providers will contact you on WhatsApp soon." });
      setPhase("done");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  // embedded: sarmalayıcı (BottomNav) konumu verir, burada sadece doldur.
  // normal: tam ekran modal (alttan açılır) — ana sayfadaki AiEntry için.
  const outerClass = embedded
    ? "w-full h-full flex flex-col"
    : "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4";
  const innerClass = embedded
    ? "bg-cream w-full h-full overflow-hidden flex flex-col"
    : "bg-cream w-full sm:max-w-md sm:rounded-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[600px]";

  return (
    <div className={outerClass}>
      <div className={innerClass}>
        {/* Üst bar */}
        <div className="bg-navy px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="#0a2540" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">MediWay Assistant</div>
            <div className="text-[10px] text-emerald-trust">● Online</div>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-navy-muted hover:text-white text-xl leading-none">×</button>
        </div>

        {/* Mesajlar */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${
                m.from === "bot"
                  ? "self-start bg-white border border-gray-200 rounded-[3px_12px_12px_12px] text-navy"
                  : "self-end bg-gold rounded-[12px_12px_3px_12px] text-navy font-medium"
              }`}
            >
              {m.text}
            </div>
          ))}

          {phase === "treatment" && (
            <div className="flex flex-wrap gap-1.5 self-start mt-1">
              {ACTIVE_TREATMENTS.map((tr) => (
                <button key={tr.slug} onClick={() => pickTreatment(tr.slug, tr.name)}
                  className="text-xs bg-navy text-white px-3 py-1.5 rounded-full hover:bg-navy-light transition">
                  {tr.name}
                </button>
              ))}
            </div>
          )}

          {phase === "city" && (
            <div className="flex flex-wrap gap-1.5 self-start mt-1">
              {ACTIVE_CITIES.map((c) => (
                <button key={c.slug} onClick={() => pickCity(c.slug, c.name)}
                  className="text-xs bg-white border border-gray-300 text-navy px-3 py-1.5 rounded-full hover:border-gold hover:bg-gold-tint transition">
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {phase === "detail" && detailSteps[detailIndex] && (
            <div className="flex flex-wrap gap-1.5 self-start mt-1">
              {detailSteps[detailIndex].options.map((o) => (
                <button key={o.value} onClick={() => pickDetail(o.value, o.label)}
                  className="text-xs bg-white border border-gray-300 text-navy px-3 py-1.5 rounded-full hover:border-gold hover:bg-gold-tint transition">
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {phase === "timing" && (
            <div className="flex flex-wrap gap-1.5 self-start mt-1">
              {AI_TIMING_STEP.options.map((o) => (
                <button key={o.value} onClick={() => pickTiming(o.value, o.label)}
                  className="text-xs bg-white border border-gray-300 text-navy px-3 py-1.5 rounded-full hover:border-gold hover:bg-gold-tint transition">
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {phase === "form" && (
            <div className="self-stretch bg-white border border-gray-200 rounded-xl p-3 mt-1">
              <div className="flex gap-1.5 mb-2">
                <select value={countryCode} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-2 text-xs text-navy outline-none">
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <input value={whatsapp} onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp number" inputMode="tel"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs text-navy outline-none" />
              </div>
              <input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-navy outline-none mb-2" />
              <label className="flex items-start gap-2 mb-3 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e: ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-navy" />
                <span className="text-[10px] text-gray-500 leading-snug">
                  I agree my details may be shared with suitable providers so they can contact me.
                </span>
              </label>
              {error && <div className="text-[10px] text-red-500 mb-2">{error}</div>}
              <button onClick={handleSubmit} disabled={submitting}
                className="w-full bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-60">
                {submitting ? "Sending..." : "Connect me with providers"}
              </button>
            </div>
          )}

          {phase === "done" && (
            <button onClick={onClose}
              className="self-center mt-2 text-xs text-navy underline">
              Close
            </button>
          )}
        </div>

        <div className="px-4 py-2 text-center text-[9px] text-gray-400 border-t border-gray-200 flex-shrink-0">
          Free · No commission · Your info goes only to matched providers
        </div>
      </div>
    </div>
  );
}

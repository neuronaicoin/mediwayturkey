"use client";
import { useState, useEffect } from "react";
import { getTreatment } from "@/lib/data/treatments";
import { getCity } from "@/lib/data/cities";
import { COUNTRY_CODES } from "@/lib/data/ai-flow";
import { getProviderLeads, markContacted, type ProviderLead } from "@/lib/leadDistribution";

// Telefon ülke kodundan ülke adı + bayrak bul (hastanın nereden yazdığını göster)
function countryFromCode(code: string): { name: string; flag: string } | null {
  const match = COUNTRY_CODES.find((c) => c.code === code);
  return match ? { name: match.name, flag: match.flag } : null;
}

export function LeadsList({ providerId }: { providerId: string }) {
  const [leads, setLeads] = useState<ProviderLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  useEffect(() => {
    let active = true;
    async function load() {
      const data = await getProviderLeads(providerId);
      if (active) {
        setLeads(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [providerId]);

  // Tedavi + detaylar (şehir AYRI gösterilir, karışıklık olmasın)
  function treatmentText(lead: ProviderLead): string {
    const parts: string[] = [];
    const tr = getTreatment(lead.treatment_slug);
    if (tr) parts.push(tr.name);
    for (const v of Object.values(lead.details)) {
      if (v && v !== "unsure") parts.push(String(v));
    }
    return parts.join(" · ");
  }

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    if (h < 1) return "just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
  async function handleReveal(id: string) {
    setRevealed((p) => ({ ...p, [id]: true }));
  }
  async function handleContacted(id: string) {
    const ok = await markContacted(id);
    if (ok) {
      setLeads((prev) =>
        prev.map((l) => (l.distribution_id === id ? { ...l, is_contacted: true } : l))
      );
    }
  }
  if (loading) {
    return <div className="text-sm text-slate-body py-6 text-center">Loading leads...</div>;
  }
  if (leads.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
        <p className="text-sm text-slate-body">
          No patient leads yet. Once your profile is live, matching patients will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2.5">
      {leads.map((lead) => {
        const country = countryFromCode(lead.whatsapp_country_code);
        const city = getCity(lead.city_slug);
        return (
          <div key={lead.distribution_id}
            className={`bg-white border rounded-xl p-3.5 ${lead.is_contacted ? "border-gray-200 opacity-70" : "border-gray-200"}`}>
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                {/* Hastanın geldiği ülke — belirgin */}
                {country && (
                  <div className="inline-flex items-center gap-1.5 bg-sky text-navy text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1.5">
                    <span>{country.flag}</span>
                    <span>Lead from {country.name}</span>
                  </div>
                )}
                <div className="text-sm font-semibold text-navy">{lead.patient_name}</div>
                {/* Tedavi bilgileri */}
                <div className="text-[11px] text-gray-500 mt-0.5">{treatmentText(lead)}</div>
                {/* Tedavi olmak istediği şehir — AYRI ve net etiketli */}
                {city && (
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    <span className="text-gray-400">Wants treatment in:</span>{" "}
                    <span className="font-medium text-navy">{city.name}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{timeAgo(lead.created_at)}</span>
            </div>
            <div className="flex gap-2 mt-3">
              {revealed[lead.distribution_id] ? (
                <a href={`https://wa.me/${lead.whatsapp_country_code.replace("+", "")}${lead.whatsapp}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-emerald-trust text-white px-3 py-1.5 rounded-lg font-semibold">
                  {lead.whatsapp_country_code} {lead.whatsapp}
                </a>
              ) : (
                <button onClick={() => handleReveal(lead.distribution_id)}
                  className="text-xs bg-navy text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-navy-light transition">
                  Reveal WhatsApp
                </button>
              )}
              {!lead.is_contacted ? (
                <button onClick={() => handleContacted(lead.distribution_id)}
                  className="text-xs border border-gray-300 text-navy px-3 py-1.5 rounded-lg hover:bg-sky transition">
                  Mark contacted
                </button>
              ) : (
                <span className="text-xs text-emerald-trust px-3 py-1.5">✓ Contacted</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

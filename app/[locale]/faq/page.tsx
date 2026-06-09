import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | MediWayTurkey",
  description:
    "Frequently asked questions about MediWayTurkey: how the platform works, costs, safety, contacting providers, and health tourism in Turkey.",
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is MediWayTurkey?",
    a: "MediWayTurkey is a free marketplace that helps international patients search, compare and directly contact verified health providers in Turkey for hair transplant, dental treatment and aesthetic procedures.",
  },
  {
    q: "Is MediWayTurkey free for patients?",
    a: "Yes. MediWayTurkey is completely free for patients and takes no commission on any treatment. Providers pay a subscription to be listed, so there is no markup added to your treatment.",
  },
  {
    q: "How do I contact a provider?",
    a: "Choose a treatment and city, browse and compare verified providers, then contact your chosen provider directly — usually via WhatsApp. There is no middleman in the conversation.",
  },
  {
    q: "Does MediWayTurkey provide medical advice?",
    a: "No. We are an information and connection platform, not a medical provider. Our content is for general information only. Always consult a qualified provider about your specific situation.",
  },
  {
    q: "Which treatments and cities are covered?",
    a: "We cover hair transplant, dental treatment and aesthetic procedures, across Istanbul, Antalya, Izmir, Ankara, Bursa and Cappadocia, with more growing over time.",
  },
  {
    q: "Why is treatment in Turkey more affordable?",
    a: "Lower operating costs and strong local competition mean prices are often far lower than in Western Europe, without a drop in quality at serious providers. Many offer all-inclusive packages covering hotel and transfers.",
  },
  {
    q: "How do I know a provider is trustworthy?",
    a: "We verify providers on the platform, but you should still do your own checks: ask who performs the procedure, request real before-and-after photos, get the package contents in writing, and notice how clearly they communicate.",
  },
  {
    q: "In which languages is MediWayTurkey available?",
    a: "The platform serves a global audience with content available in multiple languages, so patients from across Europe, the Gulf, Russia and beyond can use it in their own language.",
  },
];

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader locale={locale} />
      <section className="max-w-3xl mx-auto px-5 py-12 w-full">
        <h1 className="font-display text-3xl font-semibold text-navy mb-6">Frequently asked questions</h1>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="bg-white rounded-xl border border-navy/10 p-5 group">
              <summary className="list-none cursor-pointer font-semibold text-navy flex items-center justify-between">
                {f.q}
                <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-navy/75 leading-relaxed text-[15px] mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

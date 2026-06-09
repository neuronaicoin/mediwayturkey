import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About MediWayTurkey — Free Health Tourism Marketplace",
  description:
    "Learn about MediWayTurkey, the free, no-commission marketplace connecting international patients with verified health providers in Turkey for hair transplant, dental and aesthetic treatments.",
};

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <SiteHeader locale={locale} />
      <section className="max-w-3xl mx-auto px-5 py-12 w-full">
        <h1 className="font-display text-3xl font-semibold text-navy mb-6">About MediWayTurkey</h1>
        <div className="space-y-5 text-navy/80 leading-relaxed text-[15px]">
          <p>
            MediWayTurkey is a free health tourism marketplace that helps international patients
            search, compare and directly contact verified health providers in Turkey — for hair
            transplant, dental treatment and aesthetic procedures.
          </p>
          <p>
            Turkey is one of the world&apos;s leading destinations for medical and aesthetic care,
            combining experienced doctors, modern facilities and prices often far lower than in
            Western Europe. But finding a trustworthy provider from abroad can be difficult, and many
            patients end up paying high agency commissions. We built MediWayTurkey to solve that.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-3">How it works</h2>
          <p>
            Patients choose a treatment and a city, browse and compare verified providers, and contact
            their chosen provider directly — usually via WhatsApp. There is no middleman in the
            conversation and no commission added to your treatment.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-3">Free for patients, no commission</h2>
          <p>
            MediWayTurkey is completely free for patients and takes no commission on any treatment.
            Providers pay a simple subscription to be listed, so they have no incentive to inflate
            prices. You deal with the provider directly, with full transparency.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-3">Serving patients worldwide</h2>
          <p>
            Our platform serves patients from across Europe, the Gulf, Russia and beyond, with content
            available in multiple languages. Wherever you are, you can find and compare trusted health
            providers in Turkey in your own language.
          </p>
          <div className="pt-4">
            <Link href={`/${locale}/list-your-business`}
              className="inline-block bg-gold text-navy px-5 py-3 rounded-md font-semibold hover:brightness-105 transition">
              List your business
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

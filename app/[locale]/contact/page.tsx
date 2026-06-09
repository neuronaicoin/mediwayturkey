import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact MediWayTurkey",
  description:
    "Get in touch with MediWayTurkey. Questions about finding health providers in Turkey, or listing your business? Send us a message.",
};

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <SiteHeader locale={locale} />
      <section className="max-w-3xl mx-auto px-5 py-12 w-full">
        <h1 className="font-display text-3xl font-semibold text-navy mb-4">Contact us</h1>
        <p className="text-navy/80 leading-relaxed text-[15px] mb-8">
          Have a question about finding a health provider in Turkey, or about listing your
          business on MediWayTurkey? Send us a message using the form below and we&apos;ll get
          back to you.
        </p>
        <ContactForm />
        <div className="mt-10 bg-white rounded-xl p-6 border border-navy/10 text-[15px] text-navy/80 leading-relaxed">
          <h2 className="font-display text-lg font-semibold text-navy mb-2">For patients</h2>
          <p className="mb-4">
            MediWayTurkey is free to use. Browse treatments and cities, compare verified
            providers, and contact them directly — no account required to start.
          </p>
          <h2 className="font-display text-lg font-semibold text-navy mb-2">For providers</h2>
          <p>
            Want to reach international patients without commission? Use the &quot;List your
            business&quot; button at the top of the page to get started.
          </p>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

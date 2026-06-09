import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Terms of Service — MediWayTurkey",
  description: "The terms governing your use of the MediWayTurkey platform.",
};

export default function TermsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <SiteHeader locale={locale} />
      <section className="max-w-3xl mx-auto px-5 py-12 w-full">
        <h1 className="font-display text-3xl font-semibold text-navy mb-2">Terms of Service</h1>
        <p className="text-sm text-navy/50 mb-6">Last updated: June 2026</p>
        <div className="space-y-4 text-navy/80 leading-relaxed text-[15px]">
          <p>
            By using MediWayTurkey (the &quot;platform&quot;), you agree to these Terms of Service.
            Please read them carefully.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">What MediWayTurkey is</h2>
          <p>
            MediWayTurkey is a marketplace that helps patients discover and compare health providers in
            Turkey and contact them directly. We are an information and connection platform. We are not
            a medical provider, do not perform any treatments, and do not provide medical advice.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">No medical advice</h2>
          <p>
            The content on this platform, including blog guides, is for general information only and is
            not a substitute for professional medical advice. Always consult a qualified provider about
            your specific situation before making any treatment decision.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Relationship with providers</h2>
          <p>
            Any treatment, agreement, payment or arrangement is strictly between you and the provider
            you choose. MediWayTurkey is not a party to that relationship and is not responsible for the
            services, outcomes, pricing or conduct of any provider listed on the platform.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">No commission, free for patients</h2>
          <p>
            The platform is free for patients and takes no commission. Providers subscribe to be listed.
            We do our best to verify providers, but you remain responsible for doing your own due
            diligence before choosing one.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, MediWayTurkey is not liable for any loss or damage
            arising from your use of the platform or from any treatment or service provided by a third
            party provider.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Contact</h2>
          <p>
            Questions about these terms? Please{" "}
            <Link href={`/${locale}/contact`} className="text-navy font-semibold underline">
              get in touch via our contact form
            </Link>.
          </p>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy Policy — MediWayTurkey",
  description: "How MediWayTurkey collects, uses and protects your personal data.",
};

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <main className="min-h-screen bg-cream font-body flex flex-col">
      <SiteHeader locale={locale} />
      <section className="max-w-3xl mx-auto px-5 py-12 w-full">
        <h1 className="font-display text-3xl font-semibold text-navy mb-2">Privacy Policy</h1>
        <p className="text-sm text-navy/50 mb-6">Last updated: June 2026</p>
        <div className="space-y-4 text-navy/80 leading-relaxed text-[15px]">
          <p>
            This Privacy Policy explains how MediWayTurkey (&quot;we&quot;, &quot;us&quot;) collects,
            uses and protects your personal data when you use our website and services.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Information we collect</h2>
          <p>
            When you submit an enquiry, we may collect your name, contact details (such as phone number
            or messaging handle), the treatment and city you are interested in, and your country. We
            also collect basic, anonymised analytics about how visitors use the site.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">How we use your information</h2>
          <p>
            We use the information you provide to connect you with the health providers you choose to
            contact, to operate and improve the platform, and to communicate with you about your
            enquiry. We do not sell your personal data.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Sharing with providers</h2>
          <p>
            When you choose to contact a provider through our platform, the details you submit are
            shared with that provider so they can respond to your enquiry. Each provider is responsible
            for its own handling of your data once shared.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Cookies and analytics</h2>
          <p>
            We use cookies and analytics tools (such as Google Analytics and Microsoft Clarity) to
            understand how the site is used and to improve it. You can control cookies through your
            browser settings.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Your rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct or delete your
            personal data, or to object to its processing. To exercise these rights, please{" "}
            <Link href={`/${locale}/contact`} className="text-navy font-semibold underline">
              contact us
            </Link>.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-2">Contact</h2>
          <p>
            For any privacy questions, please{" "}
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

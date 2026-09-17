import { TopBar } from "@/components/TopBar";
import { SignupForm } from "@/components/SignupForm";

export default function ListYourBusinessPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-cream font-body">
      <TopBar locale={params.locale} />
      <div className="max-w-container mx-auto px-5 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center max-w-5xl mx-auto">
          {/* Deger onerisi paneli - mobilde ustte, masaustunde solda */}
          <div className="order-1 md:order-1">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-4 leading-tight">
              Get discovered by patients searching for treatment in Turkey
            </h2>
            <p className="text-sm md:text-base text-slate-body mb-6">
              MediWayTurkey connects your clinic directly with international patients already comparing hair transplant, dental and aesthetic providers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm md:text-base text-navy">No commission — keep everything you earn from every patient</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm md:text-base text-navy">Reach patients from around the world, actively searching right now</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm md:text-base text-navy">Set up your profile in minutes — no complicated paperwork</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm md:text-base text-navy">Completely free to join — no card, no hidden fees</span>
              </li>
            </ul>
          </div>

          {/* Kayit formu - mobilde altta, masaustunde sagda */}
          <div className="order-2 md:order-2">
            <SignupForm locale={params.locale} />

            <div className="max-w-md mx-auto mt-6 text-center">
              <p className="text-xs text-slate-body">
                Free during our launch · No card required · No hidden fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import { TopBar } from "@/components/TopBar";
import { SignupForm } from "@/components/SignupForm";

export default function ListYourBusinessPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-cream font-body">
      <TopBar locale={params.locale} />
      <div className="max-w-container mx-auto px-5 py-10">
        <SignupForm locale={params.locale} />

        <div className="max-w-md mx-auto mt-6 text-center">
          <p className="text-xs text-slate-body">
            Free for the first 30 days · No card required · Cancel anytime
          </p>
        </div>
      </div>
    </main>
  );
}

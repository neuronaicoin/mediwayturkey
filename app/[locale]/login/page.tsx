import { TopBar } from "@/components/TopBar";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-cream font-body">
      <TopBar locale={params.locale} />
      <div className="max-w-container mx-auto px-5 py-10">
        <LoginForm locale={params.locale} />
      </div>
    </main>
  );
}

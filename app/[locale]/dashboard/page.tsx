import { TopBar } from "@/components/TopBar";
import { DashboardClient } from "@/components/DashboardClient";

export default function DashboardPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-cream font-body">
      <TopBar locale={params.locale} />
      <DashboardClient locale={params.locale} />
    </main>
  );
}

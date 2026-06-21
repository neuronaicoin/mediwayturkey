import { cookies } from "next/headers";
import { isValidAdminToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { getAdminStats } from "@/lib/adminStats";
import { AdminClient } from "@/components/AdminClient";

// Admin paneli her zaman dinamik (canlı veri, çerez kontrolü)
export const dynamic = "force-dynamic";

// Arama motorları admin panelini indekslemesin
export const metadata = {
  robots: { index: false, follow: false },
  title: "Admin — MediWayTurkey",
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const authed = isValidAdminToken(token);

  if (!authed) {
    return <AdminClient authed={false} stats={null} />;
  }

  const stats = await getAdminStats();
  return <AdminClient authed={true} stats={stats} />;
}

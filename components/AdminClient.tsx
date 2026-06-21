"use client";

import { useState } from "react";
import type { AdminStats } from "@/lib/adminStats";

// ─────────────────────────────────────────────────────────────
// Admin panel — tarayıcı tarafı.
// İki mod:
//  - authed=false → giriş formu
//  - authed=true  → istatistik paneli + bildir butonu
// ─────────────────────────────────────────────────────────────

// Basit yatay bar grafik (harici kütüphane yok)
function BarChart({ data, color = "#0a2540" }: { data: { label: string; count: number }[]; color?: string }) {
  if (data.length === 0) {
    return <p className="text-xs text-gray-400 py-2">Henüz veri yok.</p>;
  }
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex flex-col gap-1.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <span className="text-[11px] text-gray-600 w-24 truncate text-right">{d.label}</span>
          <div className="flex-1 bg-gray-100 rounded h-4 overflow-hidden">
            <div
              className="h-full rounded flex items-center justify-end pr-1.5"
              style={{ width: `${(d.count / max) * 100}%`, backgroundColor: color, minWidth: "1.5rem" }}
            >
              <span className="text-[10px] text-white font-semibold">{d.count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">{label}</div>
      <div className="text-2xl font-bold text-navy mt-1">{value}</div>
      {sub && <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-sm font-semibold text-navy mb-3">{title}</h2>
      {children}
    </div>
  );
}

// ─── GİRİŞ FORMU ───
function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        setError("Şifre yanlış.");
      }
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-sm">
        <h1 className="text-lg font-bold text-navy mb-1">MediWay Admin</h1>
        <p className="text-xs text-gray-500 mb-4">Devam etmek için şifre girin.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Şifre"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-navy"
          autoFocus
        />
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-3 bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition disabled:opacity-50"
        >
          {loading ? "Kontrol ediliyor..." : "Giriş yap"}
        </button>
      </div>
    </div>
  );
}

// ─── BİLDİR BUTONU ───
function NotifyButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function notify() {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin-notify", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        setMessage(`${data.submitted} sayfa arama motorlarına bildirildi.`);
      } else {
        setStatus("error");
        setMessage(data.error ?? "Bildirim başarısız.");
      }
    } catch {
      setStatus("error");
      setMessage("Bir hata oluştu.");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-sm font-semibold text-navy mb-1">Arama motorlarına bildir</h2>
      <p className="text-[11px] text-gray-500 mb-3">
        Tüm sayfaları (ana sayfalar, tedavi/şehir, bloglar, klinikler) Bing ve Yandex&apos;e anında
        indekslenmek üzere gönderir. Google bu sistemi kullanmaz; Google için sitemap + Search Console
        gereklidir.
      </p>
      <button
        onClick={notify}
        disabled={status === "loading"}
        className="bg-gold text-navy px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-105 transition disabled:opacity-50"
      >
        {status === "loading" ? "Gönderiliyor..." : "Şimdi bildir"}
      </button>
      {message && (
        <p className={`text-xs mt-2 ${status === "error" ? "text-red-500" : "text-emerald-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

// ─── ÇIKIŞ ───
async function logout() {
  await fetch("/api/admin-login", { method: "DELETE" });
  window.location.reload();
}

// ─── ANA BİLEŞEN ───
export function AdminClient({ authed, stats }: { authed: boolean; stats: AdminStats | null }) {
  if (!authed || !stats) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Üst bar */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-bold text-navy">MediWay Admin</h1>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-navy transition">
            Çıkış
          </button>
        </div>

        {/* Özet kartlar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          <StatCard label="Toplam üye" value={stats.providers.total} sub={`${stats.providers.published} yayında`} />
          <StatCard label="Doğrulanmış" value={stats.providers.verified} />
          <StatCard label="Arama (7 gün)" value={stats.searches.last7days} sub={`${stats.searches.total} toplam`} />
          <StatCard label="Ziyaret (7 gün)" value={stats.visits.last7days} sub={`${stats.visits.total} toplam`} />
        </div>

        {/* Bildir butonu */}
        <div className="mb-3">
          <NotifyButton />
        </div>

        {/* Grafikler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Section title="En çok aranan tedaviler">
            <BarChart data={stats.searches.topTreatments} color="#0a2540" />
          </Section>
          <Section title="En çok aranan şehirler">
            <BarChart data={stats.searches.topCities} color="#c8a45c" />
          </Section>
          <Section title="Aramada en çok ülke">
            <BarChart data={stats.searches.topCountries} color="#0a2540" />
          </Section>
          <Section title="Ziyarette en çok ülke">
            <BarChart data={stats.visits.topCountries} color="#c8a45c" />
          </Section>
          <Section title="Üye kategorileri">
            <BarChart data={stats.providers.byType} color="#0a2540" />
          </Section>
          <Section title="En çok ziyaret edilen sayfalar">
            <BarChart data={stats.visits.topPaths} color="#c8a45c" />
          </Section>
        </div>

        {/* Son aramalar */}
        <Section title="Son aramalar">
          {stats.searches.recent.length === 0 ? (
            <p className="text-xs text-gray-400">Henüz arama yok.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {stats.searches.recent.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-gray-50 pb-1.5">
                  <span className="text-navy">
                    {s.treatment ?? "?"} · {s.city ?? "?"}
                  </span>
                  <span className="text-gray-400">
                    {s.country ?? "—"} · {new Date(s.created_at).toLocaleString("tr-TR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

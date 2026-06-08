// IndexNow anahtar doğrulama dosyası.
// Bing bu adresi kontrol eder: https://www.mediwayturkey.com/db66538cc8be421583a14cbd2ece23dd.txt
export const dynamic = "force-static";

export function GET() {
  return new Response("db66538cc8be421583a14cbd2ece23dd", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

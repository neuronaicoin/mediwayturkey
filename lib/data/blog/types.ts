// ───────────────────────────────────────────────────────────
// BLOG — Veri tipi (çok dilli, SEO odaklı)
// Her yazı bir BlogPost nesnesi. Yeni yazı = yeni dosya + index'e ekle.
// ───────────────────────────────────────────────────────────

export interface BlogSection {
  // İçerik bloğu — başlık + paragraflar (HTML destekli: iç linkler için)
  heading?: string;
  // paragraphs: her biri HTML olabilir (içine <a> linkler, <strong> vb.)
  paragraphs: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  locale: string; // en, fr, de, ar, tr ...
  title: string; // SEO başlık (h1)
  metaTitle: string; // <title> etiketi
  metaDescription: string; // meta description
  excerpt: string; // liste/kart özeti
  heroImage: string; // konuya uygun görsel URL
  heroAlt: string; // görsel alt metni (SEO + erişilebilirlik)
  category: string; // Hair Transplant | Dental | Aesthetics | Guide
  publishedAt: string; // YYYY-MM-DD
  readMinutes: number;
  intro: string[]; // giriş paragrafları (HTML)
  sections: BlogSection[]; // ana içerik
  faqs: BlogFAQ[]; // SSS (FAQPage schema)
  // İlgili dahili sayfalar (SEO iç link bloğu — yazı sonunda gösterilir)
  relatedLinks: { label: string; href: string }[];
  // Aynı yazının diğer dillerdeki slug'ları (hreflang için)
  translations?: { locale: string; slug: string }[];
}

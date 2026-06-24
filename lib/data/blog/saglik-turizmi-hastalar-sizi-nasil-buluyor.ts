// app/blog/turkiye-saglik-turizminde-hastalar-sizi-nasil-buluyor/page.tsx
// MediWay Blog — SEO + AI arama motoru odaklı, işletme üyelerine yönelik
// NOT: Bu dosyayı GitHub'a commit etmeden ÖNCE index.ts referansını eklemeyin.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Türkiye Sağlık Turizminde Hastalar Sizi Nasıl Buluyor? | Saç Ekimi, Diş ve Estetik Klinikleri İçin Rehber | MediWay",
  description:
    "Her yıl yüz binlerce yabancı hasta saç ekimi, diş tedavisi ve estetik için Türkiye'yi araştırıyor. Klinik, hastane ve doktorlar bu hastalara MediWay'de nasıl ulaşır? SEO, AI arama motorları ve dijital görünürlük rehberi.",
  keywords: [
    "Türkiye sağlık turizmi",
    "saç ekimi Türkiye",
    "diş tedavisi Türkiye",
    "estetik İstanbul",
    "hair transplant Turkey",
    "dental treatment Turkey",
    "klinik dijital pazarlama",
    "sağlık turizmi hasta bulma",
    "İstanbul saç ekimi merkezleri",
    "klinik SEO",
    "sağlık turizmi platformu",
    "hasta lead",
    "yurt dışı hasta",
    "MediWay üyelik",
    "klinik listeleme",
  ],
  alternates: {
    canonical:
      "https://mediwayturkey.com/blog/turkiye-saglik-turizminde-hastalar-sizi-nasil-buluyor",
  },
  openGraph: {
    title:
      "Türkiye Sağlık Turizminde Hastalar Sizi Nasıl Buluyor? | MediWay",
    description:
      "Saç ekimi, diş ve estetik klinikleri için yurt dışı hasta çekme rehberi. SEO, AI arama motorları ve MediWay listeleme stratejisi.",
    url: "https://mediwayturkey.com/blog/turkiye-saglik-turizminde-hastalar-sizi-nasil-buluyor",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1636537511494-c3e558e0702b?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "İstanbul — Türkiye sağlık turizminin merkezi",
      },
    ],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Türkiye Sağlık Turizminde Hastalar Sizi Nasıl Buluyor?",
  description:
    "Saç ekimi, diş tedavisi ve estetik için Türkiye'ye gelen yurt dışı hastalara klinik, hastane ve doktorların ulaşma rehberi.",
  image:
    "https://images.unsplash.com/photo-1636537511494-c3e558e0702b?w=1200&auto=format&fit=crop&q=80",
  author: { "@type": "Organization", name: "MediWay" },
  publisher: {
    "@type": "Organization",
    name: "MediWay",
    url: "https://mediwayturkey.com",
  },
  datePublished: "2026-06-24",
  dateModified: "2026-06-24",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://mediwayturkey.com/blog/turkiye-saglik-turizminde-hastalar-sizi-nasil-buluyor",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Yurt dışından hastalar Türkiye'deki klinikleri nasıl buluyor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hastaların büyük çoğunluğu önce internette araştırma yapıyor: Google'da arama, AI arama motorları, sosyal medya ve sağlık platformları. Klinikler, hastaların aradığı anahtar kelimelerde ve MediWay gibi platformlarda görünür olduğunda doğrudan iletişim alıyor.",
      },
    },
    {
      "@type": "Question",
      name: "MediWay'e üye olmak ücretli mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Temel listeleme süresiz olarak ücretsizdir. Daha yüksek sıralama ve daha fazla hasta talebi (lead) için premium özellikler mevcuttur. Erken üyeler avantajlı koşullardan yararlanır.",
      },
    },
    {
      "@type": "Question",
      name: "MediWay komisyon alıyor mu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. MediWay hasta ile klinik arasında komisyonsuz, doğrudan iletişim sağlar. Yapay zekâ destekli sistem hastanın tedavi, şehir, greft ve zamanlama bilgilerini toplar ve doğrudan size iletir.",
      },
    },
  ],
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-[#FEBD23]">
          Sağlık Turizmi · İşletme Rehberi
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-[#0C2D4E] md:text-4xl">
          Türkiye Sağlık Turizminde Hastalar Sizi Nasıl Buluyor?
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Saç ekimi, diş tedavisi ve estetik için her yıl yüz binlerce yabancı
          hasta Türkiye'yi araştırıyor. Peki bu hastalar kliniğinizi,
          hastanenizi veya muayenehanenizi nasıl buluyor — ve siz bu trafiğin
          neresindesiniz?
        </p>
      </header>

      <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1636537511494-c3e558e0702b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXN0YW5idWx8ZW58MHx8MHx8fDA%3D"
          alt="İstanbul — Türkiye sağlık turizminin kalbi"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none prose-headings:text-[#0C2D4E] prose-a:text-[#0C2D4E]">
        <p>
          Türkiye, dünyanın en büyük <strong>sağlık turizmi</strong>{" "}
          merkezlerinden biri. <strong>Saç ekimi</strong>,{" "}
          <strong>diş tedavisi</strong> ve <strong>estetik işlemler</strong>{" "}
          için Almanya'dan, Fransa'dan, İngiltere'den, Körfez ülkelerinden ve
          dünyanın dört bir yanından hastalar her yıl İstanbul'a, Ankara'ya,
          İzmir'e ve Antalya'ya geliyor. Ama bu hastaların hepsinin ortak bir
          başlangıç noktası var: <strong>internette araştırma</strong>.
        </p>

        <p>
          Bir Fransız <strong>saç ekimi Türkiye</strong> diye arıyor. Bir Alman{" "}
          <em>"hair transplant Istanbul"</em> yazıyor. Bir İngiliz{" "}
          <em>"dental treatment Turkey price"</em> sorgusuyla karşınıza
          çıkabilecek bir kliniği arıyor. Karar vermeden önce haftalarca, bazen
          aylarca okuyorlar, karşılaştırıyorlar, yorum bakıyorlar. İşte tam bu
          aşamada sizi <strong>buldukları yerde</strong> olmak, tüm farkı
          yaratıyor.
        </p>

        <h2>Hasta Yolculuğu: Aramadan Randevuya</h2>
        <p>
          Yurt dışından gelen bir hastanın karar süreci genellikle aynı şekilde
          ilerliyor:
        </p>
        <ol>
          <li>
            <strong>Araştırma:</strong> Google ve giderek artan oranda{" "}
            <strong>AI arama motorları</strong> (ChatGPT, Gemini, Perplexity)
            üzerinden tedaviyi araştırır.
          </li>
          <li>
            <strong>Karşılaştırma:</strong> Şehir, fiyat, teknik (FUE, DHI,
            implant türü), doktor deneyimi ve hasta yorumlarını karşılaştırır.
          </li>
          <li>
            <strong>Güven:</strong> Şeffaf bilgi sunan, doğrulanabilir ve
            kolayca iletişime geçilebilen sağlayıcıları kısa listeye alır.
          </li>
          <li>
            <strong>İletişim:</strong> WhatsApp veya form üzerinden doğrudan
            iletişime geçer.
          </li>
        </ol>
        <p>
          Bu yolculuğun her adımında <strong>görünür</strong> ve{" "}
          <strong>bulunabilir</strong> olmayan klinikler, hastayı rakibe
          kaptırıyor. Sorun tedavinizin kalitesi değil — sorun, hastanın sizi
          hiç görememesi.
        </p>

        <h2>MediWay Nedir ve Klinikler İçin Neden Önemli?</h2>
        <p>
          <strong>MediWay</strong>, Türkiye'deki hastane, klinik ve doktorları,
          sağlık hizmeti almak isteyen hastalarla buluşturan bir{" "}
          <strong>arama ve bulma platformudur</strong>. Hasta platforma girer,
          arama bölümünden tedavisini ve şehrini seçer — örneğin{" "}
          <em>"saç ekimi, İstanbul"</em> — ve o kategoride listelenen
          sağlayıcılar karşısına çıkar. Üye işletmenin sayfasına girdiğinde tüm
          detayları görür ve <strong>doğrudan iletişime</strong> geçer.
        </p>
        <p>
          MediWay, baştan sona <strong>SEO ve AI arama motorlarına uyumlu</strong>{" "}
          şekilde tasarlanmıştır. İnanılmaz hızlı, mobil arayüzü kusursuz ve
          sayfalarının her biri arama motorlarında üst sıralara çıkacak şekilde
          yapılandırılmıştır. Bu, sizin görünürlüğünüz demektir.
        </p>

        <h2>Üye Olarak Ne Kazanırsınız?</h2>
        <ul>
          <li>
            <strong>Yapay zekâ destekli hasta talebi (lead) sistemi:</strong>{" "}
            Sistem hastanın tedavi türü, şehir, greft sayısı, zamanlama ve
            WhatsApp bilgilerini toplar ve size hazır şekilde iletir.
          </li>
          <li>
            <strong>Komisyonsuz, doğrudan iletişim:</strong> Hasta ile aranıza
            kimse girmez. Aracı yok, kesinti yok.
          </li>
          <li>
            <strong>Süresiz ücretsiz temel listeleme:</strong> Hiçbir maliyet
            olmadan platformda yer alın.
          </li>
          <li>
            <strong>Premium görünürlük:</strong> Daha üst sıralama ve daha fazla
            lead için premium özellikler. Erken üyeler avantajlı koşullardan
            yararlanır.
          </li>
          <li>
            <strong>SEO gücü sizin de arkanızda:</strong> Platformun arama motoru
            sıralamaları, kliniğinizin sayfasını da yukarı taşır.
          </li>
        </ul>

        <h2>Üç Kategori, Tek Platform: Saç Ekimi, Diş, Estetik</h2>
        <p>
          MediWay <strong>saç ekimi merkezleri</strong>,{" "}
          <strong>diş klinikleri</strong> ve <strong>estetik cerrahi</strong>{" "}
          sağlayıcılarını aynı çatı altında buluşturur. Bu, hasta için tek
          noktadan arama kolaylığı; sizin için ise zaten doğru tedaviyi arayan,
          niyeti yüksek hastalara erişim demektir.
        </p>
        <p>
          <strong>Saç ekimi</strong> arayan hasta FUE ve DHI tekniklerini,
          greft sayısını ve fiyatı araştırır. <strong>Diş tedavisi</strong>{" "}
          hastası implant, zirkonyum kaplama ve gülüş tasarımına bakar.{" "}
          <strong>Estetik</strong> hastası ise rinoplasti, liposuction veya
          anne estetiği gibi işlemleri karşılaştırır. Üç kategoride de ortak
          payda aynı: <strong>doğru anda, doğru yerde görünür olmak</strong>.
        </p>

        <h2>Neden Şimdi Üye Olmalısınız?</h2>
        <p>
          Türkiye sağlık turizmi büyüyor ve dijital rekabet hızlanıyor. Arama
          motorlarında ve AI sistemlerinde erken konumlanan platformlar ve
          klinikler, kalıcı bir avantaj elde ediyor. MediWay'in erken üyeleri,
          hem avantajlı premium koşullardan hem de platformun büyüyen SEO
          otoritesinden ilk yararlananlar oluyor.
        </p>
        <p>
          Kliniğiniz, hastaneniz veya muayenehaneniz dünyanın her yerinden gelen
          hastalar tarafından bulunmayı hak ediyor. Şimdi listenizi oluşturun,
          AI lead sistemine bağlanın ve sağlık turizminin dijital merkezinde
          yerinizi alın.
        </p>

        <div className="my-10 rounded-2xl bg-[#0C2D4E] p-8 text-center text-white">
          <h3 className="m-0 text-2xl font-bold text-white">
            Hastalar sizi arıyor. Bulunur olun.
          </h3>
          <p className="mt-2 text-white/80">
            Saç ekimi, diş ve estetik kliniğinizi MediWay'de ücretsiz listeleyin.
          </p>
          <Link
            href="/kayit"
            className="mt-5 inline-block rounded-full bg-[#FEBD23] px-8 py-3 font-semibold text-[#0C2D4E] no-underline transition hover:opacity-90"
          >
            Üye Ol
          </Link>
        </div>

        <h2>Sıkça Sorulan Sorular</h2>
        <h3>Yurt dışından hastalar Türkiye'deki klinikleri nasıl buluyor?</h3>
        <p>
          Hastaların büyük çoğunluğu önce internette araştırıyor: Google
          aramaları, AI arama motorları, sosyal medya ve sağlık platformları.
          Klinikler hastaların aradığı anahtar kelimelerde ve MediWay gibi
          platformlarda görünür olduğunda doğrudan iletişim alıyor.
        </p>
        <h3>MediWay'e üye olmak ücretli mi?</h3>
        <p>
          Temel listeleme süresiz ücretsizdir. Daha yüksek sıralama ve daha
          fazla hasta talebi için premium özellikler mevcuttur. Erken üyeler
          avantajlı koşullardan yararlanır.
        </p>
        <h3>MediWay komisyon alıyor mu?</h3>
        <p>
          Hayır. MediWay komisyonsuz, doğrudan iletişim sağlar. Yapay zekâ
          destekli sistem hastanın bilgilerini toplayıp doğrudan size iletir.
        </p>
      </div>
    </article>
  );
}

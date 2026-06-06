import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { getPost, getAllPostParams } from "@/lib/data/blog";

const BASE = "https://www.mediwayturkey.com";

interface PageParams {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return getAllPostParams();
}

export function generateMetadata({ params }: PageParams): Metadata {
  const post = getPost(params.locale, params.slug);
  if (!post) return { title: "MediWayTurkey Blog" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${BASE}/${params.locale}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: PageParams) {
  const { locale } = params;
  const post = getPost(locale, params.slug);
  if (!post) notFound();

  const pageUrl = `${BASE}/${locale}/blog/${post.slug}`;

  // BlogPosting + FAQPage schema (Google rich results + AI)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: post.heroImage,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@type": "Organization", name: "MediWayTurkey" },
        publisher: {
          "@type": "Organization",
          name: "MediWayTurkey",
          url: BASE,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        inLanguage: locale,
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-cream font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TopBar locale={locale} />

      <article className="max-w-3xl mx-auto px-5 py-8">
        {/* Üst bilgi */}
        <Link href={`/${locale}/blog`} className="text-xs text-gold-deep font-semibold">
          ← Blog
        </Link>
        <span className="block text-[11px] uppercase tracking-wide text-gold-deep font-semibold mt-4">
          {post.category}
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy mt-1 leading-tight">
          {post.title}
        </h1>
        <div className="text-xs text-gray-400 mt-2">
          {post.publishedAt} · {post.readMinutes} min read
        </div>

        {/* Hero görsel */}
        <div className="h-56 sm:h-72 rounded-xl bg-sky bg-cover bg-center my-6"
          style={{ backgroundImage: `url(${post.heroImage})` }}
          role="img" aria-label={post.heroAlt} />

        {/* Giriş */}
        <div className="flex flex-col gap-4">
          {post.intro.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-slate-body"
              dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Bölümler */}
        {post.sections.map((section, i) => (
          <section key={i} className="mt-8">
            {section.heading && (
              <h2 className="font-display text-xl font-semibold text-navy mb-3">
                {section.heading}
              </h2>
            )}
            <div className="flex flex-col gap-4">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-[15px] leading-relaxed text-slate-body blog-prose"
                  dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </section>
        ))}

        {/* SSS */}
        {post.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-navy mb-4">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-3">
              {post.faqs.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-navy mb-1.5">{f.question}</h3>
                  <p className="text-sm text-slate-body leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* İlgili linkler (SEO iç link bloğu) */}
        {post.relatedLinks.length > 0 && (
          <section className="mt-10 bg-navy rounded-xl p-5">
            <h2 className="font-display text-base font-semibold text-white mb-3">
              Explore providers
            </h2>
            <div className="flex flex-col gap-2">
              {post.relatedLinks.map((link, i) => (
                <Link key={i} href={`/${locale}${link.href.replace(/^\/[a-z]{2}/, "")}`}
                  className="text-sm text-gold hover:text-white transition">
                  → {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

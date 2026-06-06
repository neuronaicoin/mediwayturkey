import Link from "next/link";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { getPostsByLocale } from "@/lib/data/blog";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return {
    title: "Patient Guides — Health Tourism in Turkey | MediWayTurkey",
    description:
      "Expert guides on hair transplant, dental and aesthetic treatments in Turkey: costs, techniques, safety and how to choose the right clinic.",
    alternates: { canonical: `https://www.mediwayturkey.com/${params.locale}/blog` },
  };
}

export default function BlogListPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const posts = getPostsByLocale(locale);

  return (
    <main className="min-h-screen bg-cream font-body">
      <TopBar locale={locale} />

      <div className="max-w-container mx-auto px-5 py-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy mb-2">
          Patient Guides
        </h1>
        <p className="text-sm text-slate-body mb-8 max-w-2xl">
          Everything you need to know before your treatment in Turkey — costs,
          techniques, safety, and how to choose the right clinic. Honest guides, no sales talk.
        </p>

        {posts.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
            <p className="text-sm text-slate-body">Articles are coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group">
                <div className="h-44 bg-sky bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.heroImage})` }} />
                <div className="p-4">
                  <span className="text-[10px] uppercase tracking-wide text-gold-deep font-semibold">
                    {post.category}
                  </span>
                  <h2 className="font-display text-base font-semibold text-navy mt-1 leading-snug group-hover:text-gold-deep transition">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-body mt-2 line-clamp-3">{post.excerpt}</p>
                  <div className="text-[11px] text-gray-400 mt-3">
                    {post.publishedAt} · {post.readMinutes} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

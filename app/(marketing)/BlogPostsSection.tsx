// components/marketing/BlogPostsSection.tsx (or wherever you keep it)
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export function BlogPostsSection({ posts }: { posts: BlogPost[] }) {
  const top = posts.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: top.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.proxiesseller.cc/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <section className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              Proxy Guides • Updates • Tutorials
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Learn how to use proxies like a pro
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Practical guides for scraping, automation, multi-accounting, SEO tools, and staying undetected.
              Written for builders who care about speed and reliability.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              View all posts
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Get proxies
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {top.map((p) => (
            <article
              key={p.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {p.coverImage ? (
                <Link href={`/blog/${p.slug}`} aria-label={p.title} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-slate-50 to-slate-100" />
              )}

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {p.category}
                  </span>

                  <span className="text-xs text-slate-500">{formatDate(p.publishDateISO)}</span>
                  <span className="text-xs text-slate-500">• {p.readTime}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  <Link href={`/blog/${p.slug}`} className="hover:text-indigo-700">
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>

                <div className="mt-5">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Want a custom proxy setup?</h3>
              <p className="mt-1 text-sm text-slate-600">
                Check plans for Residential, Mobile, Datacenter and Fast proxies — built for scraping & automation.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/residential-proxies"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Residential
              </Link>
              <Link
                href="/mobile-proxies"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Mobile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

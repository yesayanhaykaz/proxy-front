// app/blog/BlogIndexClient.tsx
"use client";

import Link from "next/link";
import type { BlogBadge, BlogPost } from "@/lib/blog";
import { useMemo, useState } from "react";

type Guide = {
  title: string;
  desc: string;
  href: string;
  badge?: BlogBadge;
  icon?: string;
  tags?: string[];
  readTime?: string;
  publishDate?: string;
};

function Badge({ type }: { type?: BlogBadge }) {
  if (!type) return null;

  const cls =
    type === "Popular"
      ? "border-indigo-200 bg-indigo-100 text-indigo-700"
      : type === "Advanced"
      ? "border-blue-200 bg-blue-100 text-blue-700"
      : "border-emerald-200 bg-emerald-100 text-emerald-700";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${cls}`}>
      {type}
    </span>
  );
}

function GuideCard({ g }: { g: Guide }) {
  return (
    <article className="group">
      <Link
        href={g.href}
        className="block overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600">
              <i className={`${g.icon ?? "bi bi-journal-text"} text-xl`} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge type={g.badge} />
              {g.publishDate && (
                <time className="text-xs font-medium text-slate-500">{g.publishDate}</time>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600">{g.title}</h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.desc}</p>

            {g.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {g.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                Read article <i className="bi bi-arrow-right transition-transform group-hover:translate-x-1" />
              </span>
              {g.readTime && (
                <span className="text-xs font-medium text-slate-500">
                  <i className="bi bi-clock mr-1" />
                  {g.readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Section({
  id,
  title,
  subtitle,
  items,
  initialCount = 6,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: Guide[];
  initialCount?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, initialCount);

  return (
    <section className="py-12" id={id}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
          <p className="mt-2 text-base text-slate-600">{subtitle}</p>
        </div>

        {items.length > initialCount ? (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            {showAll ? "Show less" : "Show all"}
            <i className={`bi ${showAll ? "bi-chevron-up" : "bi-chevron-down"}`} />
          </button>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((g) => (
          <GuideCard key={g.href} g={g} />
        ))}
      </div>
    </section>
  );
}

function toGuides(posts: BlogPost[]): Guide[] {
  return posts.map((p) => ({
    badge: p.badge,
    title: p.title,
    desc: p.description,
    href: `/blog/${p.slug}`,
    icon: p.icon,
    tags: p.tags,
    readTime: p.readTime,
    publishDate: new Date(p.publishDateISO).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  }));
}

export function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const integrations = useMemo(
    () => toGuides(posts.filter((p) => p.category === "Integration")),
    [posts]
  );

  const advanced = useMemo(
    () => toGuides(posts.filter((p) => p.category === "Advanced")),
    [posts]
  );

  const useCases = useMemo(
    () => toGuides(posts.filter((p) => p.category === "Use Case")),
    [posts]
  );

  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-purple-100/50 blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #1e293b 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container-page relative py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <i className="bi bi-journal-text" />
              Blog & Guides
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
              Proxy integration{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                guides
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Step-by-step tutorials for popular tools, advanced optimization techniques, and
              industry-specific use cases.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#integrations"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500"
              >
                Browse guides <i className="bi bi-arrow-down" />
              </Link>
              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50"
              >
                <i className="bi bi-book" />
                Documentation
              </Link>
            </div>

            {/* quick jumps */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
              <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50" href="#integrations">
                Integrations
              </a>
              <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50" href="#advanced">
                Advanced
              </a>
              <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50" href="#use-cases">
                Use cases
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="container-page">
        <Section
          id="integrations"
          title="Popular integration guides"
          subtitle="Most commonly used tools and frameworks with detailed setup instructions"
          items={integrations}
          initialCount={6}
        />

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        <Section
          id="advanced"
          title="Advanced topics"
          subtitle="Deep dive into proxy optimization, rotation strategies, and advanced configurations"
          items={advanced}
          initialCount={6}
        />

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        <Section
          id="use-cases"
          title="Use case guides"
          subtitle="Industry-specific guides for common proxy use cases and workflows"
          items={useCases}
          initialCount={6}
        />

        {/* Newsletter */}
        <section className="py-12">
          <div className="overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50/50 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white">
                <i className="bi bi-envelope text-xl" />
              </div>

              <h2 className="mt-6 text-3xl font-black text-slate-900">Get proxy tips & guides</h2>

              <p className="mt-3 text-base text-slate-600">
                Subscribe to get new tutorials, optimization tips, and industry insights.
              </p>

              <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:max-w-xs"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500"
                >
                  Subscribe <i className="bi bi-arrow-right" />
                </button>
              </form>

              <p className="mt-4 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        {/* CTA bottom */}
        <section className="pb-16">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Need custom help?</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Get recommendations on proxy type, rotation, and authentication for your tool stack.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500"
                  >
                    <i className="bi bi-chat-dots" />
                    Talk to an expert
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50"
                  >
                    View pricing
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <i className="bi bi-lightning-charge text-2xl text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-slate-900">Fast response time</h3>
                    <p className="mt-1 text-sm text-slate-600">Get answers from our technical team</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <i className="bi bi-code-slash text-2xl text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-slate-900">Custom code examples</h3>
                    <p className="mt-1 text-sm text-slate-600">Tailored snippets for your stack</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <i className="bi bi-headset text-2xl text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-slate-900">Ongoing support</h3>
                    <p className="mt-1 text-sm text-slate-600">Help when you scale up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

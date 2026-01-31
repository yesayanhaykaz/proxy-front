import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, POSTS } from "@/lib/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Proxiesseller Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  if (!items.length) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Table of Contents
        </h2>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50/50 p-6">
        <h3 className="text-sm font-bold text-slate-900">Ready to get started?</h3>
        <p className="mt-2 text-sm text-slate-600">Choose a plan and start using proxies today.</p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-500"
        >
          View pricing <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </nav>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

const tocItems = post.content
  .filter((b): b is Extract<typeof post.content[number], { type: "heading" }> => b.type === "heading")
  .map((b) => ({ id: b.id, title: b.text }));

  // related = same category, excluding current
  const related = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "Proxiesseller Technical Team" },
    datePublished: post.publishDateISO,
    mainEntityOfPage: `https://www.proxiesseller.cc/blog/${post.slug}`,
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <i className="bi bi-chevron-right text-xs" />
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
            <i className="bi bi-chevron-right text-xs" />
            <span className="text-slate-900">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
            <i className="bi bi-bookmark" />
            {post.category}
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">{post.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-slate-200 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
                PT
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-600">Author</div>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div>
              <div className="text-sm font-bold text-slate-900">{formatDate(post.publishDateISO)}</div>
              <div className="text-xs text-slate-600">Published</div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div>
              <div className="text-sm font-bold text-slate-900">{post.readTime}</div>
              <div className="text-xs text-slate-600">Reading time</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Body + TOC */}
        <div className="mx-auto mt-12 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-3xl prose-h3:text-2xl prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-500 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-semibold prose-code:text-slate-900 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-950">
              {post.content.map((b, idx) => {
                if (b.type === "heading") {
                  return (
                    <section key={idx} id={b.id}>
                      <h2>{b.text}</h2>
                    </section>
                  );
                }
                if (b.type === "paragraph") return <p key={idx}>{b.text}</p>;
                if (b.type === "list") {
                  return (
                    <ul key={idx}>
                      {b.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  );
                }
                if (b.type === "code") {
                  return (
                    <pre key={idx}>
                      <code className={`language-${b.lang}`}>{b.code}</code>
                    </pre>
                  );
                }
                if (b.type === "subheading") return <h3 id={b.id} key={idx}>{b.text}</h3>;
                if (b.type === "callout") {
  return (
    <div key={idx} className="not-prose mt-8 rounded-2xl border border-indigo-200/80 bg-indigo-50 p-6">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <i className={`${b.icon ?? "bi bi-lightbulb"} text-lg`} />
        </div>
        <div>
          <div className="font-bold text-slate-900">{b.title}</div>
          <p className="mt-1 text-sm text-slate-600">{b.text}</p>
        </div>
      </div>
    </div>
  );
}

                return null;
              })}
            </div>

            <aside>
              <TableOfContents items={tocItems} />
            </aside>
          </div>
        </div>

        {/* Related */}
        {related.length ? (
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-2xl font-black text-slate-900">Related guides</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block rounded-xl border border-slate-200/80 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-md"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">{r.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="text-slate-500">
                      <i className="bi bi-clock mr-1" />
                      {r.readTime}
                    </span>
                    <i className="bi bi-arrow-right text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}

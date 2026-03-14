import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, POSTS } from "@/lib/blog";

const SITE = "https://www.proxiesseller.cc";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
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

  const url = `${SITE}/blog/${post.slug}`;

  return {
    title: `${post.title} | Proxiesseller`,
    description: post.description,
    keywords: post.tags,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Proxiesseller",
      type: "article",
      publishedTime: post.publishDateISO,
      authors: ["Proxiesseller"],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {

  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const url = `${SITE}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: "Proxiesseller",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Proxiesseller",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
      },
    },
    datePublished: post.publishDateISO,
    dateModified: post.publishDateISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const related = POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3);

  return (
    <div className="container-page py-16">

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-slate-600">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.title}
      </nav>

      <h1 className="text-5xl font-black text-slate-900">{post.title}</h1>

      <p className="mt-4 text-lg text-slate-600">{post.description}</p>

      <div className="mt-6 text-sm text-slate-500">
        Published {formatDate(post.publishDateISO)} • {post.readTime}
      </div>

      {/* ARTICLE BODY */}

      <div className="prose prose-slate max-w-none mt-10">

        {post.content.map((b, idx) => {

          if (b.type === "heading") {
            return <h2 key={idx}>{b.text}</h2>;
          }

          if (b.type === "paragraph") {
            return <p key={idx}>{b.text}</p>;
          }

          if (b.type === "list") {
            return (
              <ul key={idx}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          }

          if (b.type === "code") {
            return (
              <pre key={idx}>
                <code>{b.code}</code>
              </pre>
            );
          }

          return null;
        })}

      </div>

      {/* INTERNAL SEO LINKS */}

      <div className="mt-12 border rounded-xl p-6 bg-slate-50">

        <h3 className="font-bold text-lg">
          Recommended proxy solutions
        </h3>

        <ul className="mt-4 space-y-2 text-sm">

          <li>
            <Link href="/residential-proxies" className="text-indigo-600">
              Residential proxies for scraping
            </Link>
          </li>

          <li>
            <Link href="/mobile-proxies" className="text-indigo-600">
              Mobile proxies for social automation
            </Link>
          </li>

          <li>
            <Link href="/datacenter-proxies" className="text-indigo-600">
              High-speed datacenter proxies
            </Link>
          </li>

          <li>
            <Link href="/pricing" className="text-indigo-600">
              View proxy pricing plans
            </Link>
          </li>

        </ul>

      </div>

      {/* RELATED ARTICLES */}

      {related.length > 0 && (
        <div className="mt-16">

          <h2 className="text-2xl font-black mb-6">
            Related guides
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="border rounded-xl p-4 hover:shadow"
              >
                <h3 className="font-bold">{r.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{r.readTime}</p>
              </Link>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}
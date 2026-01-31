// app/blog/page.tsx
import type { Metadata } from "next";
import { POSTS } from "@/lib/blog";
import { BlogIndexClient } from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Proxy Guides & Integrations | Proxiesseller Blog",
  description:
    "Integration guides, advanced proxy topics, and use-case workflows. Learn how to use Proxiesseller proxies with Python, Scrapy, Selenium, Puppeteer, cURL, Node.js, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Proxy Guides & Integrations | Proxiesseller",
    description:
      "Popular proxy integrations + advanced topics + use-case guides. Setup instructions for Python, Scrapy, Selenium, Puppeteer, cURL, Node.js and more.",
    url: "/blog",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  return <BlogIndexClient posts={POSTS} />;
}

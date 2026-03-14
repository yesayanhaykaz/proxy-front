import type { Metadata } from "next";
import { POSTS } from "@/lib/blog";
import { BlogIndexClient } from "./BlogIndexClient";

export const metadata: Metadata = {

  title: "Proxy Guides, Tutorials & Scraping Tips | Proxiesseller",

  description:
    "Learn how to use rotating proxies, scraping proxies, and automation proxies with Python, Selenium, Scrapy, Puppeteer, Node.js and more.",

  keywords: [
    "proxy guides",
    "scraping proxies tutorial",
    "rotating proxies",
    "selenium proxies",
    "python proxies",
  ],

  alternates: {
    canonical: "https://www.proxiesseller.cc/blog",
  },

  openGraph: {
    title: "Proxy Guides & Tutorials",
    description:
      "Step-by-step tutorials for proxy integration, scraping, automation and SEO tracking.",
    url: "https://www.proxiesseller.cc/blog",
    siteName: "Proxiesseller",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndexPage() {
  return <BlogIndexClient posts={POSTS} />;
}
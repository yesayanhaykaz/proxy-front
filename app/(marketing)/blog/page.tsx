import type { Metadata } from "next";
import { POSTS } from "@/lib/blog";
import { BlogIndexClient } from "./BlogIndexClient";

const englishLabels = {
  badge: "Blog & Guides",
  heroTitle: "Proxy integration",
  heroHighlight: "guides",
  heroBody: "Step-by-step tutorials for popular tools, advanced optimization techniques, and industry-specific use cases.",
  browseGuides: "Browse guides",
  documentation: "Documentation",
  integrationsChip: "Integrations",
  advancedChip: "Advanced",
  useCasesChip: "Use cases",
  readArticle: "Read article",
  showAll: "Show all",
  showLess: "Show less",
  integrationsTitle: "Popular integration guides",
  integrationsSubtitle: "Most commonly used tools and frameworks with detailed setup instructions",
  advancedTitle: "Advanced topics",
  advancedSubtitle: "Deep dive into proxy optimization, rotation strategies, and advanced configurations",
  useCasesTitle: "Use case guides",
  useCasesSubtitle: "Industry-specific guides for common proxy use cases and workflows",
  newsletterTitle: "Get proxy tips & guides",
  newsletterBody: "Subscribe to get new tutorials, optimization tips, and industry insights.",
  newsletterPlaceholder: "your@email.com",
  newsletterButton: "Subscribe",
  newsletterFootnote: "No spam. Unsubscribe anytime.",
  ctaTitle: "Need custom help?",
  ctaBody: "Get recommendations on proxy type, rotation, and authentication for your tool stack.",
  ctaContact: "Talk to an expert",
  ctaPricing: "View pricing",
  featureOneTitle: "Fast response time",
  featureOneBody: "Get answers from our technical team",
  featureTwoTitle: "Custom code examples",
  featureTwoBody: "Tailored snippets for your stack",
  featureThreeTitle: "Ongoing support",
  featureThreeBody: "Help when you scale up",
} as const;

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
  return <BlogIndexClient posts={POSTS} labels={englishLabels} />;
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation & Setup Guides | Proxiesseller",
  description:
    "Complete documentation for integrating proxies with popular tools. Setup guides for Scrapy, Selenium, Puppeteer, cURL, and more. Code examples in Python, JavaScript, PHP.",
  alternates: { canonical: "/documentation" },
  openGraph: {
    title: "Proxy Documentation & Integration Guides",
    description:
      "Step-by-step guides for integrating proxies with your favorite tools and frameworks.",
    url: "/documentation",
    type: "website",
  },
};

type DocCard = {
  title: string;
  description: string;
  icon: string;
  href: string;
  tag?: string;
};

type QuickStart = {
  title: string;
  description: string;
  code: string;
  language: string;
};

const POPULAR_GUIDES: DocCard[] = [
  {
    title: "Python with Requests",
    description: "Use proxies with Python's requests library for web scraping and API calls.",
    icon: "bi bi-filetype-py",
    href: "/docs/python-requests",
    tag: "Popular",
  },
  {
    title: "Scrapy Integration",
    description: "Configure Scrapy spiders to use rotating proxies for large-scale scraping.",
    icon: "bi bi-bug",
    href: "/docs/scrapy",
    tag: "Popular",
  },
  {
    title: "Selenium WebDriver",
    description: "Set up Selenium with proxy authentication for automated browser testing.",
    icon: "bi bi-browser-chrome",
    href: "/docs/selenium",
    tag: "Popular",
  },
  {
    title: "Puppeteer & Playwright",
    description: "Use proxies with headless browsers for JavaScript-heavy sites.",
    icon: "bi bi-code-square",
    href: "/docs/puppeteer",
  },
  {
    title: "cURL & Command Line",
    description: "Make authenticated requests using cURL with SOCKS5 or HTTP proxies.",
    icon: "bi bi-terminal",
    href: "/docs/curl",
  },
  {
    title: "Node.js & Axios",
    description: "Configure Node.js applications to use proxies with popular HTTP clients.",
    icon: "bi bi-node-plus",
    href: "/docs/nodejs",
  },
];

const ADVANCED_GUIDES: DocCard[] = [
  {
    title: "Proxy Rotation Strategies",
    description: "Learn about sticky sessions, rotating pools, and optimal rotation intervals.",
    icon: "bi bi-arrow-repeat",
    href: "/docs/rotation",
  },
  {
    title: "Authentication Methods",
    description: "Compare username/password auth vs IP whitelisting and best practices.",
    icon: "bi bi-shield-check",
    href: "/docs/authentication",
  },
  {
    title: "Error Handling & Retries",
    description: "Handle proxy errors gracefully with retry logic and fallback strategies.",
    icon: "bi bi-exclamation-triangle",
    href: "/docs/error-handling",
  },
  {
    title: "Performance Optimization",
    description: "Optimize your setup for speed, reduce latency, and maximize throughput.",
    icon: "bi bi-speedometer2",
    href: "/docs/performance",
  },
  {
    title: "Geographic Targeting",
    description: "Target specific countries, regions, or cities for geo-specific data.",
    icon: "bi bi-globe",
    href: "/docs/geo-targeting",
  },
  {
    title: "API Documentation",
    description: "Manage proxies programmatically with our RESTful API endpoints.",
    icon: "bi bi-braces",
    href: "/docs/api",
  },
];

const USE_CASE_GUIDES: DocCard[] = [
  {
    title: "Web Scraping",
    description: "Best practices for scraping e-commerce, social media, and news sites.",
    icon: "bi bi-database",
    href: "/docs/web-scraping",
  },
  {
    title: "SEO & SERP Monitoring",
    description: "Track search rankings across locations without getting blocked.",
    icon: "bi bi-search",
    href: "/docs/seo-monitoring",
  },
  {
    title: "Ad Verification",
    description: "Verify ad placements and campaigns across different geos.",
    icon: "bi bi-badge-ad",
    href: "/docs/ad-verification",
  },
  {
    title: "Social Media Automation",
    description: "Manage multiple accounts safely with residential and mobile proxies.",
    icon: "bi bi-people",
    href: "/docs/social-media",
  },
  {
    title: "Price Monitoring",
    description: "Track competitor pricing and product availability in real-time.",
    icon: "bi bi-tag",
    href: "/docs/price-monitoring",
  },
  {
    title: "Sneaker Bots",
    description: "Configure residential proxies for sneaker releases and limited drops.",
    icon: "bi bi-basket",
    href: "/docs/sneaker-bots",
  },
];

const QUICK_STARTS: QuickStart[] = [
  {
    title: "Python Requests",
    description: "Basic proxy setup with authentication",
    language: "python",
    code: `import requests

proxies = {
    'http': 'socks5://username:password@proxy.example.com:1080',
    'https': 'socks5://username:password@proxy.example.com:1080'
}

response = requests.get('https://api.ipify.org', proxies=proxies)
print(f'Your IP: {response.text}')`,
  },
  {
    title: "cURL",
    description: "Command-line proxy authentication",
    language: "bash",
    code: `# SOCKS5 proxy
curl -x socks5://username:password@proxy.example.com:1080 https://api.ipify.org

# HTTP proxy
curl -x http://username:password@proxy.example.com:8080 https://api.ipify.org`,
  },
  {
    title: "Node.js",
    description: "Using proxies with Axios",
    language: "javascript",
    code: `const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');

const agent = new SocksProxyAgent(
  'socks5://username:password@proxy.example.com:1080'
);

axios.get('https://api.ipify.org', { 
  httpAgent: agent, 
  httpsAgent: agent 
})
.then(res => console.log('Your IP:', res.data));`,
  },
];

function DocCard({ title, description, icon, href, tag }: DocCard) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-lg"
    >
      {tag && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
            {tag}
          </span>
        </div>
      )}

      <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 text-indigo-600">
        <i className={`${icon} text-2xl`} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-indigo-600">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-600">
        Read guide
        <i className="bi bi-arrow-right transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function QuickStartCard({ title, description, code, language }: QuickStart) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="mt-0.5 text-xs text-slate-600">{description}</p>
          </div>
          <span className="rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
            {language}
          </span>
        </div>
      </div>

      <div className="p-5">
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
          <i className={`${icon} text-lg`} />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <div>
      {/* Hero */}
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
              <i className="bi bi-book" />
              Documentation
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
              Get started in{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                minutes
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Step-by-step guides, code examples, and best practices for integrating proxies with your favorite tools and frameworks.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#quick-start"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500"
              >
                Quick start
                <i className="bi bi-arrow-down" />
              </Link>
              <Link
                href="/docs/api"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50"
              >
                <i className="bi bi-braces" />
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="container-page py-16 md:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">Quick start examples</h2>
          <p className="mt-3 text-base text-slate-600">
            Copy and paste these code snippets to get started immediately
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {QUICK_STARTS.slice(0, 2).map((qs) => (
            <QuickStartCard key={qs.title} {...qs} />
          ))}
        </div>

        <div className="mt-6">
          <QuickStartCard {...QUICK_STARTS[2]} />
        </div>
      </section>

      {/* Popular Guides */}
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container-page py-16 md:py-20">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900">Popular integration guides</h2>
            <p className="mt-3 text-base text-slate-600">
              Most commonly used tools and frameworks with detailed setup instructions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POPULAR_GUIDES.map((guide) => (
              <DocCard key={guide.href} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="container-page py-16 md:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">Advanced topics</h2>
          <p className="mt-3 text-base text-slate-600">
            Deep dive into proxy optimization, rotation strategies, and advanced configurations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_GUIDES.map((guide) => (
            <DocCard key={guide.href} {...guide} />
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container-page py-16 md:py-20">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900">Use case guides</h2>
            <p className="mt-3 text-base text-slate-600">
              Industry-specific guides for common proxy use cases and workflows
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASE_GUIDES.map((guide) => (
              <DocCard key={guide.href} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container-page py-16 md:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">What you get</h2>
          <p className="mt-3 text-base text-slate-600">
            Every guide includes comprehensive documentation and real-world examples
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureRow
            icon="bi bi-code-slash"
            title="Copy-paste code"
            description="Production-ready code examples in multiple languages that you can use immediately."
          />
          <FeatureRow
            icon="bi bi-list-check"
            title="Step-by-step instructions"
            description="Clear, detailed guides that walk you through every step of the integration process."
          />
          <FeatureRow
            icon="bi bi-tools"
            title="Troubleshooting tips"
            description="Common issues and solutions to help you debug problems quickly."
          />
          <FeatureRow
            icon="bi bi-graph-up"
            title="Performance best practices"
            description="Optimization techniques to maximize speed and minimize latency."
          />
          <FeatureRow
            icon="bi bi-shield-check"
            title="Security guidelines"
            description="Best practices for keeping your credentials safe and secure."
          />
          <FeatureRow
            icon="bi bi-arrow-repeat"
            title="Regular updates"
            description="Documentation updated regularly to reflect latest features and changes."
          />
        </div>
      </section>

      {/* Support CTA */}
      <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page py-16 md:py-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 shadow-xl shadow-slate-900/5">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Left */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-black text-slate-900">
                  Need help getting started?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Our support team is available 24/7 to help you with integration issues,
                  answer technical questions, or provide custom solutions for your use case.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-check-circle-fill text-xl text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Live chat support</div>
                      <div className="text-sm text-slate-600">Get instant help from our technical team</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-check-circle-fill text-xl text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Email support</div>
                      <div className="text-sm text-slate-600">Detailed responses within 2 hours</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-check-circle-fill text-xl text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Custom integration</div>
                      <div className="text-sm text-slate-600">We can help build custom solutions</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500"
                  >
                    <i className="bi bi-chat-dots" />
                    Contact support
                  </Link>
                  <Link
                    href="/faqs"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50"
                  >
                    <i className="bi bi-question-circle" />
                    View FAQs
                  </Link>
                </div>
              </div>

              {/* Right */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex rounded-xl bg-white/10 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                    <i className="bi bi-star-fill mr-2" />
                    Community resources
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-white">
                    Join our community
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-indigo-100">
                    Connect with other developers, share tips, and get help from the community.
                  </p>

                  <div className="mt-8 space-y-3">
                    <Link
                      href="/discord"
                      className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <i className="bi bi-discord text-2xl text-white" />
                      <div>
                        <div className="font-bold text-white">Discord Community</div>
                        <div className="text-sm text-indigo-100">Join 5,000+ developers</div>
                      </div>
                    </Link>

                    <Link
                      href="/blog"
                      className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <i className="bi bi-journal-text text-2xl text-white" />
                      <div>
                        <div className="font-bold text-white">Blog & Tutorials</div>
                        <div className="text-sm text-indigo-100">Learn best practices</div>
                      </div>
                    </Link>

                    <Link
                      href="/github"
                      className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <i className="bi bi-github text-2xl text-white" />
                      <div>
                        <div className="font-bold text-white">GitHub Examples</div>
                        <div className="text-sm text-indigo-100">Open-source code samples</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
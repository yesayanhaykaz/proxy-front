import type { Metadata } from "next";
import Link from "next/link";
import { PricingGrid } from "@/components/PricingGrid";
import { TrustedMarquee } from "@/components/marketing/TrustedMarquee";
import { apiGet, type ProxyPlan } from "@/lib/api";

export const metadata: Metadata = {
  title: "Proxy Pricing | Residential, Mobile, Datacenter & SOCKS5 — Proxiesseller",
  description:
    "Explore flexible proxy pricing: Residential, Mobile, Datacenter and Fast SOCKS5. Filter by country, rotation, protocol and duration. Instant activation.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Proxy Pricing — Residential, Mobile & Datacenter",
    description:
      "Choose a proxy plan by duration, location, rotation and traffic. Instant activation & dashboard control.",
    url: "/pricing",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
function getSiteUrl() {
  // Use NEXT_PUBLIC_SITE_URL if you set it, else fallback in dev
  const u = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";
  return u.replace(/\/$/, "");
}


function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition-all hover:border-indigo-300 hover:bg-indigo-100">
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      {children}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {


  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-2xl transition-all group-hover:scale-150" />
      <div className="relative">
        <div className="inline-flex rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-2.5 text-indigo-600">
          {icon}
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function TechRow({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="group flex items-center justify-between gap-6 rounded-xl border border-slate-200/80 bg-white px-5 py-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/30">
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        <span className="text-sm font-semibold text-slate-900">{left}</span>
      </div>
      <span className="text-sm font-medium text-slate-600">{right}</span>
    </div>
  );
}

function StepCard({
  step,
  title,
  desc,
  delay,
}: {
  step: string;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:from-slate-900/80 hover:to-slate-950/80"
      style={{ animationDelay: delay }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:scale-150" />
      <div className="relative">
        <div className="inline-flex items-center justify-center rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-400 ring-1 ring-indigo-500/20">
          {step}
        </div>
        <h4 className="mt-3 text-sm font-bold text-white">{title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{desc}</p>
      </div>
    </div>
  );
}

export default async function PricingPage() {
  const site = getSiteUrl();
  const r = await fetch(`${site}/api/plans`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Light gradient background */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[350px] w-[700px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl" />
        </div>

        {/* Subtle dot pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #1e293b 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container-page relative py-16 md:py-20 lg:py-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            {/* Left content */}
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2">
                <Chip>Instant activation</Chip>
                <Chip>SOCKS5 + HTTP</Chip>
                <Chip>Smart rotation</Chip>
                <Chip>195+ countries</Chip>
              </div>

              <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                Simple, transparent{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  pricing
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Enterprise-grade proxy infrastructure for{" "}
                <span className="font-semibold text-slate-900">scraping</span>,{" "}
                <span className="font-semibold text-slate-900">automation</span>, and{" "}
                <span className="font-semibold text-slate-900">data collection</span>. Start in minutes,
                scale to millions of requests.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#plans"
                  className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30"
                >
                  View pricing
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Talk to sales
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Stats grid */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-900">99.9%</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Uptime SLA</div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-900">&lt;200ms</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Avg latency</div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-900">24/7</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right: How it works */}
            <div className="w-full max-w-md">
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h2 className="text-sm font-bold text-slate-900">Getting Started</h2>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 transition-all hover:border-indigo-200 hover:shadow-md">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl transition-all group-hover:scale-150" />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700">
                        STEP 1
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-slate-900">Choose your proxy type</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        Select from Residential, Mobile, Datacenter, or Fast SOCKS5 based on your use case.
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 transition-all hover:border-indigo-200 hover:shadow-md">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl transition-all group-hover:scale-150" />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                        STEP 2
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-slate-900">Configure & activate</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        Pick location, rotation settings, and duration. Instant activation with credentials.
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 transition-all hover:border-indigo-200 hover:shadow-md">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:scale-150" />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                        STEP 3
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-slate-900">Integrate & scale</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        Use with any tool via SOCKS5/HTTP. Monitor usage in real-time dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href="/residential-proxies"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Residential
                  </Link>
                  <Link
                    href="/mobile-proxies"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Mobile
                  </Link>
                  <Link
                    href="/datacenter-proxies"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Datacenter
                  </Link>
                  <Link
                    href="/fast-proxies"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Fast SOCKS5
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </section>

      {/* TRUST */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page py-10">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500">Trusted by 10,000+ developers and companies</p>
          </div>
          <div className="mt-6">
            <TrustedMarquee />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-page py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
            Built for production workloads
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Everything you need to run reliable, high-performance proxy infrastructure
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Enterprise Security"
            desc="Session-based authentication with username/password or IP whitelisting. Full SSL/TLS support with secure credential management."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Blazing Fast Performance"
            desc="Sub-200ms average latency worldwide. Optimized routing and high-bandwidth infrastructure for data-intensive operations."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Global Coverage"
            desc="Access proxies in 195+ countries with city-level targeting. Scale across regions for geo-distributed workloads."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Real-time Analytics"
            desc="Monitor bandwidth, request counts, and IP usage in your dashboard. Export usage data via API for integration."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            title="Flexible Rotation"
            desc="Choose sticky sessions for consistency or rotating pools for anonymity. Customize rotation intervals per use case."
          />
          <FeatureCard
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title="Developer-Friendly"
            desc="RESTful API, comprehensive docs, code examples in 10+ languages. Integrate with Scrapy, Selenium, Puppeteer, and more."
          />
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section className="border-y border-slate-200/80 bg-gradient-to-b from-white to-slate-50">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Technical specifications</h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Production-ready infrastructure with protocol flexibility and granular control
              </p>
            </div>
            <Link
              href="/documentation"
              className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-500"
            >
              Read documentation
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            <TechRow left="Supported Protocols" right="SOCKS5, HTTP, HTTPS" />
            <TechRow left="Authentication Methods" right="Username/Password, IP Whitelist" />
            <TechRow left="Session Management" right="Sticky sessions (1-30 min) + Rotating pools" />
            <TechRow left="Usage Monitoring" right="Real-time dashboard + API access" />
            <TechRow left="Geographic Targeting" right="Country, region, city-level (plan-dependent)" />
            <TechRow left="Concurrent Connections" right="Unlimited (within bandwidth limits)" />
            <TechRow left="Bandwidth Tracking" right="Per-proxy metering with rollover options" />
            <TechRow left="Technical Support" right="Email, chat, integration assistance" />
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-xl bg-indigo-600 p-2.5 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Need help integrating?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Our docs include setup guides for popular tools like Scrapy, Puppeteer, Selenium, curl, and more.
                  Can't find what you need? Contact support for custom integration help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING GRID */}
      <section id="plans" className="container-page py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Choose your plan</h2>
          <p className="mt-3 text-base text-slate-600">
            All plans include instant activation, dashboard access, and technical support
          </p>
        </div>
        <div className="mt-12">
          <PricingGrid plans={plans} />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page py-16 md:py-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-8 shadow-xl shadow-slate-900/5 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
                Need a custom solution?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                High-volume traffic, dedicated IPs, custom rotation logic, or specific geographic requirements?
                Our enterprise team will design a plan tailored to your exact needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30"
                >
                  Contact sales team
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Compare all plans
                </Link>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-slate-500">
              Explore by proxy type
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500" href="/residential-proxies">
                Residential proxies
              </Link>
              <span className="text-slate-300">·</span>
              <Link className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500" href="/mobile-proxies">
                Mobile proxies
              </Link>
              <span className="text-slate-300">·</span>
              <Link className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500" href="/datacenter-proxies">
                Datacenter proxies
              </Link>
              <span className="text-slate-300">·</span>
              <Link className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500" href="/fast-proxies">
                Fast SOCKS5 proxies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
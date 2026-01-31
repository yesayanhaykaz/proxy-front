"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Item = { href: string; label: string; icon?: string };

type Props = {
  isLoggedIn?: boolean;
  email?: string;
};

const TOP_NAV = [
  { href: "/residential-proxies", label: "Residential" },
  { href: "/mobile-proxies", label: "Mobile" },
  { href: "/datacenter-proxies", label: "Datacenter" },
  { href: "/fast-proxies", label: "Fast" },
];

const PRICING_PROXY_TYPES: Item[] = [
  { href: "/residential-proxies", label: "Residential Proxies", icon: "bi bi-house" },
  { href: "/datacenter-proxies", label: "Datacenter Proxies", icon: "bi bi-hdd-network" },
  { href: "/mobile-proxies", label: "Mobile Proxies", icon: "bi bi-phone" },
  { href: "/fast-proxies", label: "Fast Proxies", icon: "bi bi-lightning-charge" },
];

const PRICING_PLANS: Item[] = [
  { href: "/pricing#starter", label: "Starter Plan", icon: "bi bi-rocket-takeoff" },
  { href: "/pricing#professional", label: "Professional Plan", icon: "bi bi-briefcase" },
  { href: "/pricing#enterprise", label: "Enterprise Plan", icon: "bi bi-building" },
];

const PRICING_EXTRAS: Item[] = [
  { href: "/compare", label: "Compare Packages", icon: "bi bi-sliders" },
  { href: "/features", label: "Features Overview", icon: "bi bi-stars" },
  { href: "/blog", label: "Proxy Guides", icon: "bi bi-journal-text" },
];

function MegaLink({ href, label, icon }: Item) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition-all hover:bg-indigo-50 hover:text-slate-900"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all group-hover:bg-indigo-100 group-hover:text-indigo-700">
        <i className={`${icon ?? "bi bi-arrow-right"} text-sm`} />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}

function initialsFromEmail(email?: string) {
  const e = (email || "").trim();
  if (!e) return "AC";
  const name = e.split("@")[0] || e;
  const parts = name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  const a = parts[0]?.[0] ?? "A";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "C";
  return (a + b).toUpperCase();
}

export function HeaderClient({ isLoggedIn = false, email = "" }: Props) {
  const router = useRouter();

  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const pricingWrapRef = useRef<HTMLDivElement | null>(null);
  const accountWrapRef = useRef<HTMLDivElement | null>(null);

  const doLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });

    setAccountOpen(false);
    setMobileOpen(false);

    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Node) {
        if (pricingWrapRef.current && !pricingWrapRef.current.contains(t)) setPricingOpen(false);
        if (accountWrapRef.current && !accountWrapRef.current.contains(t)) setAccountOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPricingOpen(false);
        setAccountOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
            <i className="bi bi-shield-lock text-sm text-white" />
          </div>
          <span className="text-base">proxiesseller</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {TOP_NAV.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {i.label}
            </Link>
          ))}

          {/* Pricing mega menu */}
          <div
            ref={pricingWrapRef}
            className="relative"
            onMouseEnter={() => setPricingOpen(true)}
            onMouseLeave={() => setPricingOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-haspopup="menu"
              aria-expanded={pricingOpen}
              onClick={() => setPricingOpen((v) => !v)}
            >
              Pricing
              <i className={`bi bi-chevron-down text-[10px] transition-transform ${pricingOpen ? 'rotate-180' : ''}`} />
            </button>

            {pricingOpen && (
              <>
                <div className="absolute left-0 right-0 top-full h-4" />
                <div
                  role="menu"
                  className="absolute left-1/2 top-full mt-4 w-[min(920px,calc(100vw-32px))] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl"
                >
                  <div className="pointer-events-none absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-slate-200/80 bg-white" />

                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Proxy Types
                      </div>
                      <div className="space-y-1">
                        {PRICING_PROXY_TYPES.map((x) => (
                          <MegaLink key={x.href} {...x} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Plans
                      </div>
                      <div className="space-y-1">
                        {PRICING_PLANS.map((x) => (
                          <MegaLink key={x.href} {...x} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Resources
                      </div>
                      <div className="space-y-1">
                        {PRICING_EXTRAS.map((x) => (
                          <MegaLink key={x.href} {...x} />
                        ))}
                      </div>

                      <div className="mt-5 rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50/50 p-4">
                        <div className="text-sm font-bold text-slate-900">Need help choosing?</div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-600">
                          Our team can help you find the perfect proxy solution for your needs.
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-indigo-500"
                          >
                            <i className="bi bi-chat-dots" />
                            Contact Sales
                          </Link>
                          <Link
                            href="/faqs"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
                          >
                            <i className="bi bi-question-circle" />
                            FAQ
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right actions (DESKTOP) */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <div ref={accountWrapRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-sm">
                  {initialsFromEmail(email)}
                </span>
                <i className={`bi bi-chevron-down text-[10px] text-slate-500 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl"
                >
                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="text-xs font-semibold text-slate-500">Signed in as</div>
                    <div className="mt-0.5 truncate text-sm font-bold text-slate-900">{email || "Account"}</div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
                      onClick={() => setAccountOpen(false)}
                    >
                      <i className="bi bi-speedometer2 text-slate-500" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
                      onClick={() => setAccountOpen(false)}
                    >
                      <i className="bi bi-person-circle text-slate-500" />
                      Profile Settings
                    </Link>

                    <Link
                      href="/dashboard/billing"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
                      onClick={() => setAccountOpen(false)}
                    >
                      <i className="bi bi-credit-card text-slate-500" />
                      Billing
                    </Link>

                    <div className="my-2 h-px bg-slate-200" />

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                      onClick={doLogout}
                    >
                      <i className="bi bi-box-arrow-right" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page py-4">
            <div className="grid gap-1">
              {TOP_NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {i.label}
                </Link>
              ))}

              {/* Pricing accordion */}
              <button
                type="button"
                onClick={() => setMobilePricingOpen((v) => !v)}
                className="mt-1 flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span>Pricing</span>
                <i className={`bi bi-chevron-down text-xs transition-transform ${mobilePricingOpen ? "rotate-180" : ""}`} />
              </button>

              {mobilePricingOpen && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="grid gap-1">
                    <div className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500">Proxy Types</div>
                    {PRICING_PROXY_TYPES.map((x) => (
                      <Link
                        key={x.href}
                        href={x.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <i className={`${x.icon} text-slate-500`} />
                        {x.label}
                      </Link>
                    ))}

                    <div className="mt-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">Plans</div>
                    {PRICING_PLANS.map((x) => (
                      <Link
                        key={x.href}
                        href={x.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <i className={`${x.icon} text-slate-500`} />
                        {x.label}
                      </Link>
                    ))}

                    <div className="mt-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">Resources</div>
                    {PRICING_EXTRAS.map((x) => (
                      <Link
                        key={x.href}
                        href={x.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <i className={`${x.icon} text-slate-500`} />
                        {x.label}
                      </Link>
                    ))}

                    <div className="mt-3 flex gap-2">
                      <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition-all hover:bg-indigo-500"
                      >
                        <i className="bi bi-chat-dots" />
                        Contact
                      </Link>
                      <Link
                        href="/faqs"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100"
                      >
                        <i className="bi bi-question-circle" />
                        FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile actions */}
              {isLoggedIn ? (
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <div className="text-xs font-semibold text-slate-500">Signed in as</div>
                    <div className="mt-0.5 truncate text-sm font-bold text-slate-900">{email || "Account"}</div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-500"
                  >
                    <i className="bi bi-speedometer2" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    <i className="bi bi-person-circle" />
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={doLogout}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
                  >
                    <i className="bi bi-box-arrow-right" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid gap-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-500"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
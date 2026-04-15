"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getLocaleFromPathname,
  localizeHref,
  switchLocaleInPath,
  type Locale,
  uiCopy,
} from "@/lib/i18n";

type Item = { href: string; label: string; icon?: string };

type Props = {
  isLoggedIn?: boolean;
  email?: string;
};

function MegaLink({ href, label, icon }: Item) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition-all hover:bg-amber-50 hover:text-slate-900"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all group-hover:bg-amber-100 group-hover:text-amber-700">
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
  const parts = name.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "A";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "C";
  return (a + b).toUpperCase();
}

export function HeaderClient({ isLoggedIn = false, email = "" }: Props) {
  const pathname = usePathname() || "/";
  const locale = (getLocaleFromPathname(pathname) || DEFAULT_LOCALE) as Locale;
  const copy = uiCopy[locale].header;
  const router = useRouter();

  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const pricingWrapRef = useRef<HTMLDivElement | null>(null);
  const languageWrapRef = useRef<HTMLDivElement | null>(null);
  const accountWrapRef = useRef<HTMLDivElement | null>(null);

  const topNav = useMemo(
    () => [
      { href: localizeHref(locale, "/residential-proxies"), label: copy.navResidential },
      { href: localizeHref(locale, "/mobile-proxies"), label: copy.navMobile },
      { href: localizeHref(locale, "/datacenter-proxies"), label: copy.navDatacenter },
      { href: localizeHref(locale, "/fast-proxies"), label: copy.navFast },
    ],
    [copy.navDatacenter, copy.navFast, copy.navMobile, copy.navResidential, locale]
  );

  const pricingProxyTypes: Item[] = [
    { href: localizeHref(locale, "/residential-proxies"), label: copy.pricingResidential, icon: "bi bi-house" },
    { href: localizeHref(locale, "/datacenter-proxies"), label: copy.pricingDatacenter, icon: "bi bi-hdd-network" },
    { href: localizeHref(locale, "/mobile-proxies"), label: copy.pricingMobile, icon: "bi bi-phone" },
    { href: localizeHref(locale, "/fast-proxies"), label: copy.pricingFast, icon: "bi bi-lightning-charge" },
  ];

  const pricingPlans: Item[] = [
    { href: localizeHref(locale, "/pricing"), label: copy.pricingStarter, icon: "bi bi-rocket-takeoff" },
    { href: localizeHref(locale, "/pricing"), label: copy.pricingProfessional, icon: "bi bi-briefcase" },
    { href: localizeHref(locale, "/pricing"), label: copy.pricingEnterprise, icon: "bi bi-building" },
    { href: localizeHref(locale, "/proxy-builder"), label: copy.pricingBuilder, icon: "bi bi-sliders" },
  ];

  const pricingExtras: Item[] = [
    { href: localizeHref(locale, "/pricing"), label: copy.pricingCompare, icon: "bi bi-columns-gap" },
    { href: localizeHref(locale, "/pricing"), label: copy.pricingFeatures, icon: "bi bi-stars" },
    { href: localizeHref(locale, "/blog"), label: copy.pricingGuides, icon: "bi bi-journal-text" },
  ];

  const doLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include", cache: "no-store" });
    setAccountOpen(false);
    setMobileOpen(false);
    router.replace(localizeHref(locale, "/"));
    router.refresh();
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Node) {
        if (pricingWrapRef.current && !pricingWrapRef.current.contains(t)) setPricingOpen(false);
        if (languageWrapRef.current && !languageWrapRef.current.contains(t)) setLanguageOpen(false);
        if (accountWrapRef.current && !accountWrapRef.current.contains(t)) setAccountOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPricingOpen(false);
        setLanguageOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href={localizeHref(locale, "/")}
          className="flex items-center gap-2.5 font-bold text-slate-900 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8a3d] to-[#0f766e]">
            <i className="bi bi-shield-lock text-sm text-white" />
          </div>
          <span className="text-base">proxiesseller</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {topNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}

          <div
            ref={pricingWrapRef}
            className="relative"
            onMouseEnter={() => setPricingOpen(true)}
            onMouseLeave={() => setPricingOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              onClick={() => setPricingOpen((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={pricingOpen}
            >
              {copy.navPricing}
              <i className={`bi bi-chevron-down text-[10px] transition-transform ${pricingOpen ? "rotate-180" : ""}`} />
            </button>

            {pricingOpen && (
              <>
                <div className="absolute left-0 right-0 top-full h-4" />
                <div className="absolute left-1/2 top-full mt-4 w-[min(920px,calc(100vw-32px))] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {copy.pricingTypes}
                      </div>
                      <div className="space-y-1">
                        {pricingProxyTypes.map((item) => (
                          <MegaLink key={item.href + item.label} {...item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {copy.pricingPlans}
                      </div>
                      <div className="space-y-1">
                        {pricingPlans.map((item) => (
                          <MegaLink key={item.href + item.label} {...item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {copy.pricingResources}
                      </div>
                      <div className="space-y-1">
                        {pricingExtras.map((item) => (
                          <MegaLink key={item.href + item.label} {...item} />
                        ))}
                      </div>
                      <div className="mt-5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-cyan-50/40 p-4">
                        <div className="text-sm font-bold text-slate-900">{copy.needHelpTitle}</div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-600">{copy.needHelpBody}</div>
                        <div className="mt-3 flex gap-2">
                          <Link href={localizeHref(locale, "/contact")} className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff8a3d] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#ff7b26]">
                            <i className="bi bi-chat-dots" />
                            {copy.contactSales}
                          </Link>
                          <Link href={localizeHref(locale, "/faqs")} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50">
                            <i className="bi bi-question-circle" />
                            {copy.faq}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href={localizeHref(locale, "/proxy-builder")}
            className="ml-1 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff8a3d] to-[#0f766e] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-cyan-100" />
            {copy.buildCustom}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div ref={languageWrapRef} className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
            >
              <i className="bi bi-globe2 text-sm text-slate-500" />
              <span>{copy.language}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold uppercase text-slate-600">
                {locale}
              </span>
              <i className={`bi bi-chevron-down text-[10px] transition-transform ${languageOpen ? "rotate-180" : ""}`} />
            </button>

            {languageOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2 shadow-xl"
              >
                {SUPPORTED_LOCALES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLanguageOpen(false);
                      router.push(switchLocaleInPath(pathname, item));
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all ${
                      item === locale
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="uppercase">{item}</span>
                    {item === locale ? <i className="bi bi-check2 text-slate-500" /> : null}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <div ref={accountWrapRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8a3d] to-[#0f766e] text-xs font-bold text-white shadow-sm">
                  {initialsFromEmail(email)}
                </span>
                <i className={`bi bi-chevron-down text-[10px] text-slate-500 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div role="menu" className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl">
                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="text-xs font-semibold text-slate-500">{email || "Account"}</div>
                  </div>
                  <div className="p-2">
                    {[
                      { href: "/dashboard", label: copy.dashboard, icon: "bi-speedometer2" },
                      { href: "/dashboard/billing", label: copy.billing, icon: "bi-credit-card" },
                      { href: "/dashboard/settings", label: copy.settings, icon: "bi-gear" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
                      >
                        <i className={`bi ${item.icon} text-slate-400`} />
                        {item.label}
                      </Link>
                    ))}
                    <div className="my-2 h-px bg-slate-100" />
                    <button
                      type="button"
                      onClick={doLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                    >
                      <i className="bi bi-box-arrow-right" />
                      {copy.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900">
                {copy.login}
              </Link>
              <Link href="/auth/register" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800">
                {copy.createAccount}
              </Link>
            </>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page py-4">
            <div className="grid gap-1">
              <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {copy.language}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_LOCALES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push(switchLocaleInPath(pathname, item));
                      }}
                      className={`rounded-lg px-3 py-2 text-xs font-bold uppercase transition ${
                        item === locale
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {topNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={localizeHref(locale, "/proxy-builder")}
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex justify-center rounded-xl bg-gradient-to-r from-[#ff8a3d] to-[#0f766e] px-4 py-3 text-sm font-extrabold text-white"
              >
                {copy.buildCustom}
              </Link>

              <button
                type="button"
                onClick={() => setMobilePricingOpen((value) => !value)}
                className="mt-2 flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                <span>{copy.navPricing}</span>
                <i className={`bi bi-chevron-down text-xs transition-transform ${mobilePricingOpen ? "rotate-180" : ""}`} />
              </button>

              {mobilePricingOpen && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="grid gap-1">
                    {[...pricingProxyTypes, ...pricingPlans, ...pricingExtras].map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <i className={`${item.icon} text-slate-500`} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {isLoggedIn ? (
                <div className="mt-3 grid gap-2">
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">
                    <i className="bi bi-speedometer2" />
                    {copy.dashboard}
                  </Link>
                  <Link href="/dashboard/billing" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                    <i className="bi bi-credit-card text-slate-400" />
                    {copy.billing}
                  </Link>
                  <button type="button" onClick={doLogout} className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">
                    <i className="bi bi-box-arrow-right" />
                    {copy.logout}
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid gap-2">
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                    {copy.login}
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">
                    {copy.createAccount}
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

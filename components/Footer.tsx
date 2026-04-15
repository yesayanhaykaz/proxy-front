"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  localizeHref,
  type Locale,
  uiCopy,
} from "@/lib/i18n";

export function Footer() {
  const pathname = usePathname() || "/";
  const locale = (getLocaleFromPathname(pathname) || DEFAULT_LOCALE) as Locale;
  const copy = uiCopy[locale].footer;
  const year = new Date().getFullYear();

  const products = [
    { href: "/residential-proxies", label: uiCopy[locale].header.pricingResidential },
    { href: "/mobile-proxies", label: uiCopy[locale].header.pricingMobile },
    { href: "/datacenter-proxies", label: uiCopy[locale].header.pricingDatacenter },
    { href: "/fast-proxies", label: uiCopy[locale].header.pricingFast },
    { href: "/pricing", label: uiCopy[locale].header.navPricing },
  ];

  const company = [
    { href: "/about", label: copy.about },
    { href: "/affiliate", label: copy.affiliate },
    { href: "/blog", label: copy.blog },
    { href: "/contact", label: copy.contact },
  ];

  const legal = [
    { href: "/terms", label: copy.terms },
    { href: "/privacy", label: copy.privacy },
    { href: "/refunds", label: copy.refunds },
  ];

  const siteUrl = "https://proxiesseller.cc";
  const localizedBase =
    locale === "en" ? `${siteUrl}/en` : `${siteUrl}/${locale}`;

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Proxiesseller",
    url: localizedBase,
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Proxiesseller",
    url: localizedBase,
    inLanguage: locale,
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />

      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-slate-900">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8a3d] to-[#0f766e] text-white">
                P
              </span>
              <span>Proxiesseller</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{copy.brandDescription}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">{copy.products}</h4>
            <ul className="space-y-2">
              {products.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-600 hover:text-slate-900"
                    href={localizeHref(locale, link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">{copy.company}</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-600 hover:text-slate-900"
                    href={localizeHref(locale, link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">{copy.legal}</h4>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-600 hover:text-slate-900"
                    href={localizeHref(locale, link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} Proxiesseller. {copy.rights}
          </span>
          <div className="flex flex-wrap gap-4">
            <Link href={localizeHref(locale, "/terms")} className="hover:text-slate-700">
              {copy.terms}
            </Link>
            <Link href={localizeHref(locale, "/privacy")} className="hover:text-slate-700">
              {copy.privacy}
            </Link>
            <Link href={localizeHref(locale, "/refunds")} className="hover:text-slate-700">
              {copy.refunds}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

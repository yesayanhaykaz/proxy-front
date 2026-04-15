import Link from "next/link";

const products = [
  { href: "/residential-proxies", label: "Residential Proxies" },
  { href: "/mobile-proxies", label: "Mobile Proxies" },
  { href: "/datacenter-proxies", label: "Datacenter Proxies" },
  { href: "/fast-proxies", label: "Fast Proxies" },
  { href: "/pricing", label: "Pricing" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/affiliate", label: "Affiliate" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refunds", label: "Refund Policy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Proxiesseller",
    url: "https://proxiesseller.cc",
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Proxiesseller",
    url: "https://proxiesseller.cc",
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />

      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-slate-900">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                P
              </span>
              <span>Proxiesseller</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Residential, Mobile, Datacenter & SOCKS5 proxies with instant activation and flexible pricing.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">Products</h4>
            <ul className="space-y-2">
              {products.map((l) => (
                <li key={l.href}>
                  <Link className="text-sm text-slate-600 hover:text-slate-900" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">Company</h4>
            <ul className="space-y-2">
              {company.map((l) => (
                <li key={l.href}>
                  <Link className="text-sm text-slate-600 hover:text-slate-900" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">Legal</h4>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link className="text-sm text-slate-600 hover:text-slate-900" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {year} Proxiesseller. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-slate-700">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/refunds" className="hover:text-slate-700">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

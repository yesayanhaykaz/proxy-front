"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "nl", name: "Netherlands" },
  { code: "tr", name: "Turkey" },
  { code: "ru", name: "Russia" },
  { code: "br", name: "Brazil" },
  { code: "in", name: "India" },
];

const PRICE_TABLE: Record<string, number> = {
  residential: 2,
  mobile: 5,
  datacenter: 0.8,
  fast: 1.2,
};

const NETWORK_META: Record<string, { icon: string; color: string; border: string; bg: string; activeBg: string; activeText: string; activeBorder: string; desc: string }> = {
  residential: { icon: "fa-house",         color: "text-violet-600", border: "border-violet-200", bg: "bg-violet-50",  activeBg: "bg-violet-600", activeText: "text-white", activeBorder: "border-violet-600", desc: "Real ISP IPs" },
  mobile:      { icon: "fa-mobile-screen", color: "text-emerald-600",border: "border-emerald-200",bg: "bg-emerald-50", activeBg: "bg-emerald-600",activeText: "text-white", activeBorder: "border-emerald-600",desc: "4G/5G mobile" },
  datacenter:  { icon: "fa-server",        color: "text-sky-600",    border: "border-sky-200",    bg: "bg-sky-50",     activeBg: "bg-sky-600",    activeText: "text-white", activeBorder: "border-sky-600",    desc: "Fast & cheap" },
  fast:        { icon: "fa-bolt",          color: "text-amber-600",  border: "border-amber-200",  bg: "bg-amber-50",   activeBg: "bg-amber-600",  activeText: "text-white", activeBorder: "border-amber-600",  desc: "Ultra speed" },
};

export default function ProxyBuilderPage() {
  const router = useRouter();

  const [network,  setNetwork]  = useState("residential");
  const [session,  setSession]  = useState("sticky");
  const [protocol, setProtocol] = useState("socks5");
  const [location, setLocation] = useState("worldwide");
  const [country,  setCountry]  = useState("us");
  const [traffic,  setTraffic]  = useState(1);

  const pricePerGb = PRICE_TABLE[network];
  const totalPrice = (pricePerGb * traffic).toFixed(2);

  const handleBuy = () => {
    const isLoggedIn = document.cookie.includes("ps_session=");
    const params = new URLSearchParams({
      plan: "custom", custom: "1",
      network, session, protocol, location, country,
      traffic: String(traffic),
    });
    const checkoutUrl = `/checkout?${params.toString()}`;
    if (!isLoggedIn) {
      // Encode the full checkout URL so the inner `?` doesn't break the `next` param
      router.push(`/auth/login?next=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    router.push(checkoutUrl);
  };

  const meta = NETWORK_META[network];

  return (
    <main className="min-h-screen bg-slate-50 font-['Sora',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: `
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .fu3 { animation-delay:.18s; }
        .option-btn { transition: all .15s; }
        .field-select {
          width:100%; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px;
          padding:12px 40px 12px 16px; font-size:14px; font-weight:500; color:#0f172a;
          font-family:"Sora",sans-serif; outline:none; appearance:none; cursor:pointer;
          transition:border-color .2s;
        }
        .field-select:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }
        .range-input { -webkit-appearance:none; width:100%; height:6px; border-radius:6px; background:#e2e8f0; outline:none; }
        .range-input::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#7c3aed; cursor:pointer; box-shadow:0 2px 6px rgba(124,58,237,.3); }
        .range-input::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:#7c3aed; cursor:pointer; border:none; }
      ` }} />

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Heading */}
        <div className="fu mb-12">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-violet-600 mb-3">Proxy Builder</p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Configure Your Proxy</h1>
          <p className="mt-3 text-slate-500 max-w-xl text-sm leading-relaxed">
            Configure your proxy network, location, and traffic. Credentials are generated instantly after purchase.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── LEFT CONFIGURATOR ── */}
          <div className="lg:col-span-3 space-y-6 fu fu1">

            {/* Network type */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-network-wired text-slate-300" />Network Type
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(NETWORK_META).map(([n, m]) => (
                  <button
                    key={n}
                    onClick={() => setNetwork(n)}
                    className={`option-btn flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center ${
                      network === n
                        ? `${m.activeBg} ${m.activeText} ${m.activeBorder} shadow-md`
                        : `bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700`
                    }`}
                  >
                    <i className={`fa-solid ${m.icon} text-lg ${network === n ? "text-white" : m.color}`} />
                    <span className="text-xs font-bold capitalize">{n}</span>
                    <span className={`text-[10px] font-medium ${network === n ? "text-white/70" : "text-slate-400"}`}>{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Session + Protocol */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-rotate text-slate-300" />Session Type
                </p>
                <div className="flex gap-2">
                  {["sticky", "rotating"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSession(s)}
                      className={`option-btn flex-1 rounded-xl border px-3 py-2.5 text-xs font-bold capitalize ${
                        session === s
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <i className={`fa-solid ${s === "sticky" ? "fa-thumbtack" : "fa-arrows-rotate"} mr-1.5`} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-shield text-slate-300" />Protocol
                </p>
                <div className="flex gap-2">
                  {["http", "socks5", "ssl"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setProtocol(p)}
                      className={`option-btn flex-1 rounded-xl border px-2 py-2.5 text-xs font-bold uppercase ${
                        protocol === p
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-globe text-slate-300" />Location
              </p>
              <div className="flex gap-3 mb-4">
                {[
                  { val: "worldwide", label: "Worldwide", icon: "fa-earth-americas" },
                  { val: "country",   label: "Country",   icon: "fa-flag" },
                ].map(({ val, label, icon }) => (
                  <button
                    key={val}
                    onClick={() => setLocation(val)}
                    className={`option-btn flex-1 flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold ${
                      location === val
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <i className={`fa-solid ${icon}`} />{label}
                  </button>
                ))}
              </div>

              {location === "country" && (
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="field-select"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
                </div>
              )}
            </div>

            {/* Traffic */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-chart-bar text-slate-300" />Traffic Amount
              </p>
              <div className="relative mb-4">
                <select
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="field-select"
                >
                  <option value={1}>1 GB</option>
                  <option value={5}>5 GB</option>
                  <option value={10}>10 GB</option>
                  <option value={50}>50 GB</option>
                  <option value={100}>100 GB</option>
                </select>
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>1 GB</span>
                <span className="font-bold text-slate-700 mono">{traffic} GB selected</span>
                <span>100 GB</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT SUMMARY ── */}
          <div className="lg:col-span-2 fu fu2">
            <div className="sticky top-6 space-y-4">

              {/* Order summary card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                  <i className="fa-solid fa-receipt text-slate-300" />Order Summary
                </p>

                <div className="space-y-3 mb-5">
                  {[
                    { label: "Network",  value: network,   icon: meta.icon,        fmt: (v: string) => <span className="capitalize font-bold text-slate-900">{v}</span> },
                    { label: "Session",  value: session,   icon: "fa-rotate",      fmt: (v: string) => <span className="capitalize font-bold text-slate-900">{v}</span> },
                    { label: "Protocol", value: protocol,  icon: "fa-shield",      fmt: (v: string) => <span className="uppercase font-bold text-slate-900">{v}</span> },
                    { label: "Location", value: location === "worldwide" ? "Worldwide" : COUNTRIES.find(c => c.code === country)?.name || country, icon: "fa-globe", fmt: (v: string) => <span className="font-bold text-slate-900">{v}</span> },
                    { label: "Traffic",  value: `${traffic} GB`, icon: "fa-chart-bar", fmt: (v: string) => <span className="font-bold text-slate-900 mono">{v}</span> },
                  ].map(({ label, value, icon, fmt }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-none">
                      <span className="text-xs text-slate-400 flex items-center gap-2">
                        <i className={`fa-solid ${icon} text-slate-300 w-3 text-center`} />{label}
                      </span>
                      <span className="text-xs">{fmt(value)}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Price per GB</span>
                    <span className="text-sm font-bold mono text-slate-700">${pricePerGb}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total</span>
                    <span className="text-2xl font-extrabold text-violet-600 mono">${totalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[.98] text-white rounded-2xl px-5 py-3.5 text-sm font-bold transition-all"
                >
                  <i className="fa-solid fa-bolt text-xs" />Buy Proxy — ${totalPrice}
                </button>

                <p className="text-[11px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400" />Credentials generated instantly after purchase
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "fa-lock", label: "Secure" },
                  { icon: "fa-bolt", label: "Instant" },
                  { icon: "fa-headset", label: "24/7 Support" },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-white rounded-2xl border border-slate-200 p-3 text-center">
                    <i className={`fa-solid ${icon} text-slate-400 text-sm mb-1`} />
                    <p className="text-[10px] font-bold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

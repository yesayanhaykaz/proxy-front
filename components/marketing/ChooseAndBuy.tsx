"use client";

import { useMemo, useState } from "react";

type ProxyType = "residential" | "mobile" | "datacenter" | "fast";

const TYPE_META: Record<ProxyType, { label: string; icon: string; color: string; activeBg: string; activeBorder: string; activeText: string; badgeBg: string; badgeText: string }> = {
  residential: { label: "Residential", icon: "fa-house",         color: "text-violet-600", activeBg: "bg-violet-600", activeBorder: "border-violet-600", activeText: "text-white", badgeBg: "bg-violet-100", badgeText: "text-violet-700" },
  mobile:      { label: "Mobile",      icon: "fa-mobile-screen", color: "text-emerald-600",activeBg: "bg-emerald-600",activeBorder: "border-emerald-600",activeText: "text-white", badgeBg: "bg-emerald-100",badgeText: "text-emerald-700"},
  datacenter:  { label: "Datacenter",  icon: "fa-server",        color: "text-sky-600",    activeBg: "bg-sky-600",    activeBorder: "border-sky-600",    activeText: "text-white", badgeBg: "bg-sky-100",    badgeText: "text-sky-700"    },
  fast:        { label: "Fast",        icon: "fa-bolt",          color: "text-amber-600",  activeBg: "bg-amber-600",  activeBorder: "border-amber-600",  activeText: "text-white", badgeBg: "bg-amber-100",  badgeText: "text-amber-700"  },
};

const TYPE_HELP: Record<ProxyType, { text: string; useCases: string[] }> = {
  residential: { text: "Best for strict targets and high success rates.",        useCases: ["SERP scraping",    "Social media automation", "Marketplace monitoring"] },
  mobile:      { text: "Highest trust level for ads and sensitive workflows.",   useCases: ["Ad verification",  "Social accounts",         "Mobile-first apps"]      },
  datacenter:  { text: "Fast, stable and cost-effective for bulk automation.",   useCases: ["SEO tooling",      "Bulk data collection",    "Price monitoring"]       },
  fast:        { text: "Optimized low-latency routes for high-throughput bots.", useCases: ["API automation",   "Real-time scraping",      "High-volume bots"]       },
};

const LOCS = [
  { label: "United States",  code: "us", flag: "🇺🇸" },
  { label: "United Kingdom", code: "gb", flag: "🇬🇧" },
  { label: "Germany",        code: "de", flag: "🇩🇪" },
  { label: "France",         code: "fr", flag: "🇫🇷" },
  { label: "Netherlands",    code: "nl", flag: "🇳🇱" },
];

const DURATIONS = [
  { value: 30,  label: "1 Month",   badge: ""        },
  { value: 60,  label: "2 Months",  badge: "Save 8%" },
  { value: 90,  label: "3 Months",  badge: "Save 15%"},
];

export function ChooseAndBuy() {
  const [type,     setType]     = useState<ProxyType>("residential");
  const [loc,      setLoc]      = useState("us");
  const [qty,      setQty]      = useState(2);
  const [duration, setDuration] = useState(30);

  const pricePerIp = useMemo(() => {
    const base = type === "residential" ? 7.49 : type === "mobile" ? 9.99 : type === "datacenter" ? 4.99 : 5.99;
    const locFactor = loc === "us" ? 1 : loc === "gb" ? 1.05 : 1.1;
    const durFactor = duration >= 90 ? 0.85 : duration >= 60 ? 0.92 : 1;
    return Math.round(base * locFactor * durFactor * 100) / 100;
  }, [type, loc, duration]);

  const total       = useMemo(() => Math.round(pricePerIp * qty * 100) / 100, [pricePerIp, qty]);
  const selectedLoc = LOCS.find((l) => l.code === loc);
  const meta        = TYPE_META[type];
  const help        = TYPE_HELP[type];
  const buyHref     = `/pricing?type=${type}&loc=${loc}&qty=${qty}&days=${duration}`;

  return (
    <section className="bg-slate-50 font-['Sora',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Custom select wrapper */
        .cs-wrap { position:relative; }
        .cs-wrap select {
          width:100%; appearance:none;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:14px;
          padding:11px 40px 11px 14px; font-size:13px; font-weight:600; color:#0f172a;
          font-family:'Sora',sans-serif; outline:none; cursor:pointer;
          transition:border-color .2s, box-shadow .2s;
        }
        .cs-wrap select:focus { border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.12); }
        .cs-wrap .cs-arrow {
          pointer-events:none; position:absolute; right:13px; top:50%; transform:translateY(-50%);
          color:#94a3b8; font-size:10px; transition:transform .2s;
        }
        .cs-wrap select:focus ~ .cs-arrow { transform:translateY(-50%) rotate(180deg); }

        /* Qty stepper */
        .qty-btn {
          width:36px; height:36px; border-radius:10px; border:1.5px solid #e2e8f0;
          background:#fff; display:inline-flex; align-items:center; justify-content:center;
          font-size:16px; font-weight:700; color:#475569; cursor:pointer;
          transition:background .15s, border-color .15s, color .15s;
        }
        .qty-btn:hover { background:#f1f5f9; border-color:#cbd5e1; color:#0f172a; }
        .qty-btn:active { transform:scale(.93); }

        /* Type selector cards */
        .type-card { transition: all .18s; cursor:pointer; }
        .type-card:hover { transform:translateY(-1px); }

        /* Duration toggle pills */
        .dur-pill { transition: all .18s; cursor:pointer; }

        /* Price bar animation */
        @keyframes countUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .price-animate { animation: countUp .25s ease both; }

        /* Buy button */
        .buy-btn {
          position:relative; overflow:hidden;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          width:100%; padding:14px 24px; border-radius:14px;
          font-size:14px; font-weight:800; color:#fff; border:none; cursor:pointer;
          background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);
          box-shadow:0 2px 16px rgba(99,102,241,.35);
          transition:transform .15s, box-shadow .15s;
          text-decoration:none;
        }
        .buy-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%);
          opacity:0; transition:opacity .18s;
        }
        .buy-btn:hover { transform:translateY(-2px); box-shadow:0 6px 28px rgba(99,102,241,.5); }
        .buy-btn:hover::before { opacity:1; }
        .buy-btn:active { transform:scale(.97); }
        .buy-btn .btn-arrow { transition:transform .2s; }
        .buy-btn:hover .btn-arrow { transform:translateX(4px); }

        /* Use case tags */
        .use-tag { display:inline-flex; align-items:center; gap:5px; padding:5px 10px; border-radius:8px; font-size:11px; font-weight:700; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
        .fu  { animation:fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
      ` }} />

      <div className="mx-auto max-w-6xl px-4 py-20">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12 fu">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm mb-5">
            <i className="fa-solid fa-sliders text-indigo-500" />Quick configurator
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Choose and buy in seconds</h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Select proxy type, location, quantity, and duration — price updates instantly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 fu fu1">

          {/* ── LEFT: Configurator ── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Type selector */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-network-wired text-slate-300" />Proxy Type
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(TYPE_META) as ProxyType[]).map((t) => {
                  const m = TYPE_META[t];
                  const active = type === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`type-card flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center ${
                        active
                          ? `${m.activeBg} ${m.activeBorder} shadow-md`
                          : "border-slate-200 bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${active ? "bg-white/20" : "bg-white border border-slate-200"}`}>
                        <i className={`fa-solid ${m.icon} text-sm ${active ? "text-white" : m.color}`} />
                      </div>
                      <span className={`text-xs font-bold ${active ? "text-white" : "text-slate-700"}`}>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location + Quantity */}
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Location */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-globe text-slate-300" />Location
                </p>
                <div className="cs-wrap">
                  <select value={loc} onChange={(e) => setLoc(e.target.value)}>
                    {LOCS.map((l) => (
                      <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down cs-arrow" />
                </div>
                {selectedLoc && (
                  <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="text-base">{selectedLoc.flag}</span>
                    {selectedLoc.label} selected
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-slate-300" />Quantity (IPs)
                </p>
                <div className="flex items-center gap-3">
                  <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <input
                    type="number" min={1} value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                    className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-xl py-2 text-base font-extrabold text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  />
                  <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  {qty === 1 ? "1 IP address" : `${qty} IP addresses`}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-regular fa-calendar text-slate-300" />Duration
              </p>
              <div className="grid grid-cols-3 gap-3">
                {DURATIONS.map((d) => {
                  const active = duration === d.value;
                  return (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={`dur-pill relative flex flex-col items-center gap-1 rounded-2xl border-2 py-3.5 px-2 text-center ${
                        active
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <span className={`text-sm font-extrabold ${active ? "text-indigo-700" : "text-slate-700"}`}>{d.label}</span>
                      {d.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          active ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                        }`}>{d.badge}</span>
                      )}
                      {active && (
                        <span className="absolute top-2 right-2">
                          <i className="fa-solid fa-circle-check text-indigo-500 text-[10px]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary + Info ── */}
          <div className="lg:col-span-2 space-y-4 fu fu2">

            {/* Price card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                <i className="fa-solid fa-receipt text-slate-300" />Order Summary
              </p>

              {/* Selected config */}
              <div className="space-y-2.5 mb-5">
                {[
                  { label: "Type",     value: TYPE_META[type].label, icon: TYPE_META[type].icon },
                  { label: "Location", value: `${selectedLoc?.flag} ${selectedLoc?.label}`, icon: "fa-globe" },
                  { label: "Quantity", value: `${qty} IP${qty > 1 ? "s" : ""}`,             icon: "fa-layer-group" },
                  { label: "Duration", value: DURATIONS.find(d => d.value === duration)?.label || "", icon: "fa-calendar" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-none">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <i className={`fa-solid ${icon} text-slate-300 w-3 text-center`} />{label}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Per IP / month</span>
                  <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${pricePerIp}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{qty} IP × ${pricePerIp}</span>
                  <span className="text-xs text-slate-400">${total}</span>
                </div>
                <div className="h-px bg-slate-200 my-3" />
                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-slate-600">Total</span>
                  <span key={total} className="price-animate text-3xl font-extrabold text-indigo-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    ${total}
                  </span>
                </div>
              </div>

              {/* Offer badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">
                  <i className="fa-solid fa-tag text-amber-500 text-[9px]" />LIMITED OFFER — pricing may change
                </span>
              </div>

              {/* Buy button */}
              <a href={buyHref} className="buy-btn">
                <i className="fa-solid fa-bolt text-xs" />
                Buy Now
                <span className="btn-arrow">→</span>
              </a>

              <p className="mt-3 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-circle-check text-emerald-400" />Credentials generated instantly
              </p>
            </div>

            {/* Type info card */}
            <div className={`rounded-3xl border-2 p-5 transition-all duration-200 ${
              type === "residential" ? "border-violet-200 bg-violet-50/50" :
              type === "mobile"      ? "border-emerald-200 bg-emerald-50/50" :
              type === "datacenter"  ? "border-sky-200 bg-sky-50/50" :
                                       "border-amber-200 bg-amber-50/50"
            }`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${meta.badgeBg} border-current/20`}>
                  <i className={`fa-solid ${meta.icon} ${meta.color} text-sm`} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{meta.label} Proxies</p>
                  <p className="text-xs text-slate-500 mt-0.5">{help.text}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {help.useCases.map((uc) => (
                  <span key={uc} className={`use-tag border ${meta.badgeBg} ${meta.badgeText} border-current/20`}>
                    <i className="fa-solid fa-check text-[9px]" />{uc}
                  </span>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed">
              <i className="fa-solid fa-lightbulb text-amber-400 mr-1.5" />
              <strong className="text-slate-700">Tip:</strong> For strict websites, start with <span className="font-bold text-violet-600">Residential</span> or <span className="font-bold text-emerald-600">Mobile</span>. For performance at scale, use <span className="font-bold text-sky-600">Datacenter</span> or <span className="font-bold text-amber-600">Fast</span>.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
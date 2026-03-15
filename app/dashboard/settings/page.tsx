import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings | ProxiesSeller",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  const cookieStore = cookies();
  const email = decodeURIComponent(cookieStore.get("ps_email")?.value || "user");

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .fu3 { animation-delay:.18s; }
        .fu4 { animation-delay:.24s; }

        .section-card { background:#fff; border-radius:24px; border:1.5px solid #e2e8f0; padding:28px; }
        .section-title { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#94a3b8; margin-bottom:18px; }
        .divider { height:1px; background:#f1f5f9; }

        /* Toggle */
        .toggle-wrap { position:relative; display:inline-block; width:44px; height:26px; flex-shrink:0; }
        .toggle-wrap input { opacity:0; width:0; height:0; }
        .toggle-track {
          position:absolute; inset:0; border-radius:100px; cursor:pointer;
          background:#e2e8f0; border:1.5px solid #cbd5e1;
          transition:background .2s, border-color .2s;
        }
        .toggle-track::after {
          content:''; position:absolute; top:3px; left:3px;
          width:16px; height:16px; border-radius:50%; background:#fff;
          box-shadow:0 1px 3px rgba(0,0,0,.15);
          transition:transform .2s;
        }
        .toggle-wrap input:checked + .toggle-track { background:#7c3aed; border-color:#7c3aed; }
        .toggle-wrap input:checked + .toggle-track::after { transform:translateX(18px); }
        .toggle-wrap input:focus + .toggle-track { box-shadow:0 0 0 3px rgba(124,58,237,.15); }

        .field-select {
          background:#fff; border:1.5px solid #e2e8f0; border-radius:12px;
          padding:10px 36px 10px 14px; font-size:13px; font-weight:500; color:#0f172a;
          font-family:'Sora',sans-serif; outline:none; appearance:none; cursor:pointer;
          transition:border-color .2s;
        }
        .field-select:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px; background:#7c3aed;
          border:none; border-radius:12px; padding:11px 22px; font-size:13px;
          font-weight:700; color:#fff; cursor:pointer; font-family:'Sora',sans-serif;
          transition:background .15s, transform .1s;
        }
        .btn-primary:hover  { background:#6d28d9; }
        .btn-primary:active { transform:scale(.97); }

        .btn-secondary {
          display:inline-flex; align-items:center; gap:6px;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:10px;
          padding:8px 14px; font-size:12px; font-weight:600; color:#475569;
          cursor:pointer; transition:background .15s; font-family:'Sora',sans-serif;
        }
        .btn-secondary:hover { background:#f8fafc; }

        .row-item { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 0; }
        .row-item + .row-item { border-top: 1px solid #f1f5f9; }
        .row-label { font-size:14px; font-weight:600; color:#0f172a; }
        .row-desc  { font-size:12px; color:#94a3b8; margin-top:2px; }
      `}</style>

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors font-semibold">Dashboard</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Settings</span>
          </div>
          <Link href="/dashboard" className="btn-secondary">← Back</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-5">

        {/* Page title */}
        <div className="fu">
          <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your account preferences and dashboard behaviour</p>
        </div>

        {/* Account info */}
        <div className="section-card fu fu1">
          <p className="section-title">Account</p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg font-extrabold shadow-md shadow-violet-100 shrink-0">
              {email[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm mono truncate text-slate-700">{email}</p>
              <p className="text-xs text-slate-400 mt-0.5">Logged-in account · read-only</p>
            </div>
            <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="section-card fu fu2">
          <p className="section-title">Notifications</p>
          {[
            { id: "n1", label: "Proxy activation",  desc: "Email when a proxy plan is successfully activated",  on: true  },
            { id: "n2", label: "Invoice emails",     desc: "Receive a receipt after every successful purchase",  on: true  },
            { id: "n3", label: "Expiry reminders",   desc: "Alert me 3 days before a proxy plan expires",       on: false },
            { id: "n4", label: "Product updates",    desc: "News about new proxy types, features, promotions",  on: false },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="row-item cursor-pointer">
              <div>
                <p className="row-label">{item.label}</p>
                <p className="row-desc">{item.desc}</p>
              </div>
              <label className="toggle-wrap">
                <input id={item.id} type="checkbox" defaultChecked={item.on} />
                <span className="toggle-track" />
              </label>
            </label>
          ))}
        </div>

        {/* Appearance */}
        <div className="section-card fu fu3">
          <p className="section-title">Appearance</p>
          <div className="row-item">
            <div>
              <p className="row-label">Theme</p>
              <p className="row-desc">Dashboard color scheme</p>
            </div>
            <div className="relative">
              <select className="field-select">
                <option>Light (default)</option>
                <option>Dark</option>
                <option>System</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▾</span>
            </div>
          </div>
          {[
            { id: "compact",   label: "Compact mode",           desc: "Reduce spacing in lists and tables",                  on: false },
            { id: "bandwidth", label: "Show bandwidth usage",   desc: "Display progress bars on subscription cards",         on: true  },
            { id: "tooltips",  label: "Show tooltips",          desc: "Helpful hints throughout the dashboard",              on: true  },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="row-item cursor-pointer">
              <div>
                <p className="row-label">{item.label}</p>
                <p className="row-desc">{item.desc}</p>
              </div>
              <label className="toggle-wrap">
                <input id={item.id} type="checkbox" defaultChecked={item.on} />
                <span className="toggle-track" />
              </label>
            </label>
          ))}
        </div>

        {/* Region & Language */}
        <div className="section-card fu fu4">
          <p className="section-title">Region &amp; Language</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Language</label>
              <div className="relative">
                <select className="field-select w-full">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>German</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▾</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Currency display</label>
              <div className="relative">
                <select className="field-select w-full">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▾</span>
              </div>
            </div>
          </div>
          <div className="divider mt-6 mb-5" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Changes apply immediately after saving</p>
            <button type="button" className="btn-primary">Save settings →</button>
          </div>
        </div>

      </main>
    </div>
  );
}

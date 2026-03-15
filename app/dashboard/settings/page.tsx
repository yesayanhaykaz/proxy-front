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
    <div className="min-h-screen bg-[#0a0b0f] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.35s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.10s; }
        .fade-up-3 { animation-delay: 0.15s; }
        .fade-up-4 { animation-delay: 0.20s; }

        .mono { font-family: 'JetBrains Mono', monospace; }
        .section-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.25); margin-bottom: 20px;
        }

        /* Toggle switch */
        .toggle-wrap { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .toggle-wrap input { opacity: 0; width: 0; height: 0; }
        .toggle-track {
          position: absolute; inset: 0; border-radius: 100px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; transition: background 0.25s, border-color 0.25s;
        }
        .toggle-track::after {
          content: ''; position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: transform 0.25s, background 0.25s;
        }
        .toggle-wrap input:checked + .toggle-track {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border-color: transparent;
        }
        .toggle-wrap input:checked + .toggle-track::after {
          transform: translateX(18px);
          background: white;
        }
        .toggle-wrap input:focus + .toggle-track {
          box-shadow: 0 0 0 3px rgba(139,92,246,0.2);
        }

        /* Select */
        .select-field {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 10px 16px; font-size: 13px; color: white;
          font-family: 'Sora', sans-serif; font-weight: 500; outline: none;
          appearance: none; cursor: pointer; transition: border-color 0.2s;
        }
        .select-field:focus { border-color: rgba(139,92,246,0.5); }
        .select-field option { background: #1a1b23; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border: none; border-radius: 12px; padding: 11px 22px; font-size: 13px;
          font-weight: 700; color: white; cursor: pointer;
          transition: opacity 0.2s, transform 0.1s; font-family: 'Sora', sans-serif;
        }
        .btn-primary:hover  { opacity: 0.9; }
        .btn-primary:active { transform: scale(0.97); }

        .row-hover { transition: background 0.15s; border-radius: 14px; }
        .row-hover:hover { background: rgba(255,255,255,0.025); }
      `}</style>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors font-medium">
              Dashboard
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-semibold">Settings</span>
          </div>
          <Link href="/dashboard" className="text-xs text-white/40 hover:text-white transition-colors font-semibold border border-white/8 rounded-lg px-3 py-2">
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">

        {/* Page title */}
        <div className="fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-white/40">Manage your account preferences and dashboard behaviour</p>
        </div>

        {/* Account info */}
        <div className="glass rounded-3xl p-6 fade-up fade-up-1">
          <p className="section-label">Account</p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-extrabold shrink-0">
              {email[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate mono text-white/70">{email}</p>
              <p className="text-xs text-white/30 mt-0.5">Logged-in account · read-only</p>
            </div>
            <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass rounded-3xl p-6 fade-up fade-up-2">
          <p className="section-label">Notifications</p>

          <div className="space-y-1">
            {[
              {
                id: "notif-activate",
                label: "Proxy activation",
                desc: "Get an email when a proxy plan is successfully activated",
                defaultChecked: true,
              },
              {
                id: "notif-invoice",
                label: "Invoice emails",
                desc: "Receive a receipt after every successful purchase",
                defaultChecked: true,
              },
              {
                id: "notif-expiry",
                label: "Expiry reminders",
                desc: "Alert me 3 days before a proxy plan expires",
                defaultChecked: false,
              },
              {
                id: "notif-news",
                label: "Product updates",
                desc: "News about new proxy types, features, and promotions",
                defaultChecked: false,
              },
            ].map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className="row-hover flex items-center justify-between gap-4 px-2 py-3 cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-white/35 mt-0.5">{item.desc}</p>
                </div>
                <label className="toggle-wrap">
                  <input id={item.id} type="checkbox" defaultChecked={item.defaultChecked} />
                  <span className="toggle-track" />
                </label>
              </label>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="glass rounded-3xl p-6 fade-up fade-up-3">
          <p className="section-label">Appearance</p>

          <div className="space-y-1">
            <label className="row-hover flex items-center justify-between gap-4 px-2 py-3 cursor-pointer">
              <div>
                <p className="text-sm font-semibold">Theme</p>
                <p className="text-xs text-white/35 mt-0.5">Dashboard color scheme</p>
              </div>
              <div className="relative">
                <select className="select-field pr-8">
                  <option>Dark (default)</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-[10px]">▾</div>
              </div>
            </label>

            <label className="row-hover flex items-center justify-between gap-4 px-2 py-3 cursor-pointer">
              <div>
                <p className="text-sm font-semibold">Compact mode</p>
                <p className="text-xs text-white/35 mt-0.5">Reduce spacing in lists and tables</p>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" />
                <span className="toggle-track" />
              </label>
            </label>

            <label className="row-hover flex items-center justify-between gap-4 px-2 py-3 cursor-pointer">
              <div>
                <p className="text-sm font-semibold">Show bandwidth usage</p>
                <p className="text-xs text-white/35 mt-0.5">Display progress bars on subscription cards</p>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track" />
              </label>
            </label>
          </div>
        </div>

        {/* Region & Language */}
        <div className="glass rounded-3xl p-6 fade-up fade-up-4">
          <p className="section-label">Region & Language</p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Language</label>
              <div className="relative">
                <select className="select-field w-full pr-8">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>German</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-[10px]">▾</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Currency display</label>
              <div className="relative">
                <select className="select-field w-full pr-8">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-[10px]">▾</div>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-white/5">
              <p className="text-xs text-white/25">Changes apply immediately after saving</p>
              <button type="button" className="btn-primary">
                Save settings →
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

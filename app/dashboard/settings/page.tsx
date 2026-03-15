import type { Metadata } from "next";
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


      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-5">

        {/* Page title */}
        <div className="fu">
          <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your account preferences and dashboard behaviour</p>
        </div>

        {/* Account info */}
        <div className="card fu fu1">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-user text-slate-300" />Account
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg font-extrabold shadow-md shadow-violet-100 shrink-0">
              {email[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm mono truncate text-slate-700">{email}</p>
              <p className="text-xs text-slate-400 mt-0.5">Logged-in account · read-only</p>
            </div>
            <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="card fu fu2">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-bell text-slate-300" />Notifications
          </h2>
          {[
            { id: "n1", label: "Proxy activation",  desc: "Email when a proxy plan is successfully activated",  icon: "fa-network-wired", on: true  },
            { id: "n2", label: "Invoice emails",     desc: "Receive a receipt after every successful purchase",  icon: "fa-receipt",       on: true  },
            { id: "n3", label: "Expiry reminders",   desc: "Alert me 3 days before a proxy plan expires",       icon: "fa-clock",         on: false },
            { id: "n4", label: "Product updates",    desc: "News about new proxy types, features, promotions",  icon: "fa-bullhorn",      on: false },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="row-item cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${item.icon} text-slate-400 text-[11px]`} />
                </div>
                <div>
                  <p className="row-label">{item.label}</p>
                  <p className="row-desc">{item.desc}</p>
                </div>
              </div>
              <label className="toggle-wrap">
                <input id={item.id} type="checkbox" defaultChecked={item.on} />
                <span className="toggle-track" />
              </label>
            </label>
          ))}
        </div>

        {/* Appearance */}
        <div className="card fu fu3">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-palette text-slate-300" />Appearance
          </h2>

          <div className="row-item">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-sun text-slate-400 text-[11px]" />
              </div>
              <div>
                <p className="row-label">Theme</p>
                <p className="row-desc">Dashboard color scheme</p>
              </div>
            </div>
            <div className="relative">
              <select className="field-select">
                <option>Light (default)</option>
                <option>Dark</option>
                <option>System</option>
              </select>
              <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
            </div>
          </div>

          {[
            { id: "compact",   label: "Compact mode",         desc: "Reduce spacing in lists and tables",          icon: "fa-compress",   on: false },
            { id: "bandwidth", label: "Show bandwidth usage", desc: "Display progress bars on subscription cards", icon: "fa-chart-bar",  on: true  },
            { id: "tooltips",  label: "Show tooltips",        desc: "Helpful hints throughout the dashboard",      icon: "fa-circle-info",on: true  },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="row-item cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${item.icon} text-slate-400 text-[11px]`} />
                </div>
                <div>
                  <p className="row-label">{item.label}</p>
                  <p className="row-desc">{item.desc}</p>
                </div>
              </div>
              <label className="toggle-wrap">
                <input id={item.id} type="checkbox" defaultChecked={item.on} />
                <span className="toggle-track" />
              </label>
            </label>
          ))}
        </div>

        {/* Region & Language */}
        <div className="card fu fu4">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-globe text-slate-300" />Region &amp; Language
          </h2>
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
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
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
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
              </div>
            </div>
          </div>
          <div className="divider mt-6 mb-5" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              <i className="fa-solid fa-circle-info mr-1 text-slate-300" />Changes apply immediately after saving
            </p>
            <button type="button" className="btn-primary">
              <i className="fa-solid fa-floppy-disk text-xs" />Save settings
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

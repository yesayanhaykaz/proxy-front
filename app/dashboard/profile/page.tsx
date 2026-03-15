import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile | ProxiesSeller",
  description: "Manage your account profile, password, and security settings.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  const cookieStore = cookies();
  const email       = decodeURIComponent(cookieStore.get("ps_email")?.value || "");
  const displayName = email.split("@")[0] || "User";
  const initials    = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-5">

        {/* Page title */}
        <div className="fu">
          <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your account details, security, and API access</p>
        </div>

        {/* Avatar banner */}
        <div className="card fu fu1 flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-violet-100">
              {initials}
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-lg">{displayName}</p>
            <p className="text-sm text-slate-400 mono truncate">{email}</p>
          </div>
          <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active account
          </span>
        </div>

        {/* Account details */}
        <div className="card fu fu2">
          <h2 className="text-sm font-extrabold text-slate-700 flex items-center gap-2 mb-1">
            <i className="fa-solid fa-user text-slate-400 text-xs" />Account Details
          </h2>
          <p className="text-xs text-slate-400 mb-6">Used for invoices, account recovery, and support.</p>

          <form className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Full name</label>
              <input className="field-input" defaultValue={displayName} placeholder="John Doe" />
            </div>
            <div>
              <label className="field-label">
                Email <span className="text-slate-400 font-normal text-[11px]">(login & receipts)</span>
              </label>
              <input className="field-input" defaultValue={email} type="email" disabled />
            </div>
            <div>
              <label className="field-label">Company <span className="text-slate-400 font-normal text-[11px]">(optional)</span></label>
              <input className="field-input" placeholder="Your company" />
            </div>
            <div>
              <label className="field-label">Country</label>
              <div className="relative">
                <select className="field-select">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
              </div>
            </div>
            <div>
              <label className="field-label">City</label>
              <input className="field-input" placeholder="New York" />
            </div>
            <div>
              <label className="field-label">Timezone</label>
              <div className="relative">
                <select className="field-select">
                  <option value="America/New_York">America / New York</option>
                  <option value="America/Chicago">America / Chicago</option>
                  <option value="America/Los_Angeles">America / Los Angeles</option>
                  <option value="UTC">UTC</option>
                </select>
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="divider" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  <i className="fa-solid fa-circle-info mr-1 text-slate-300" />Country changes affect future invoices
                </p>
                <button type="submit" className="btn-primary">
                  <i className="fa-solid fa-floppy-disk text-xs" />Save changes
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Password + Security side by side */}
        <div className="grid gap-5 lg:grid-cols-2 fu fu3">

          {/* Password */}
          <div className="card">
            <h2 className="text-sm font-extrabold text-slate-700 flex items-center gap-2 mb-1">
              <i className="fa-solid fa-lock text-slate-400 text-xs" />Password
            </h2>
            <p className="text-xs text-slate-400 mb-6">Use a strong, unique password to protect your account.</p>
            <form className="space-y-4">
              {[
                { label: "Current password",    ph: "••••••••",        icon: "fa-lock" },
                { label: "New password",         ph: "Min 10+ characters", icon: "fa-key" },
                { label: "Confirm new password", ph: "••••••••••",      icon: "fa-key" },
              ].map(({ label, ph }) => (
                <div key={label}>
                  <label className="field-label">{label}</label>
                  <input className="field-input" type="password" placeholder={ph} />
                </div>
              ))}
              <div className="pt-1">
                <button type="submit" className="btn-dark">
                  <i className="fa-solid fa-rotate text-xs" />Update password
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center">
                <i className="fa-solid fa-shield-halved mr-1 text-slate-300" />Use a password manager and avoid reusing passwords.
              </p>
            </form>
          </div>

          {/* Security & API */}
          <div className="card space-y-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-700 flex items-center gap-2 mb-1">
                <i className="fa-solid fa-shield-halved text-slate-400 text-xs" />Security &amp; API Access
              </h2>
              <p className="text-xs text-slate-400">Manage 2FA and your API key for integrations.</p>
            </div>

            {/* 2FA */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen-button text-violet-500 text-xs" />Two-factor authentication
                </p>
                <p className="text-xs text-slate-400 mt-1 ml-5">Add an extra layer of protection to your login</p>
              </div>
              <button type="button" className="btn-secondary py-2 px-4 text-xs shrink-0">Enable</button>
            </div>

            {/* API Key */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                <i className="fa-solid fa-code text-violet-500 text-xs" />API Key
              </p>
              <p className="text-xs text-slate-400 mb-3 ml-5">Use for automation, stats, and integration workflows</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 min-w-0 truncate bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs mono text-slate-600 font-medium">
                  pk_live_••••••••••••••••••••••••••
                </code>
                <button type="button" className="btn-primary py-2.5 px-3 text-xs shrink-0">
                  <i className="fa-solid fa-rotate text-[10px]" />Regenerate
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                <i className="fa-solid fa-triangle-exclamation text-amber-400 mr-1" />Regenerating invalidates the old key immediately
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/documentation" className="btn-secondary flex-1 py-2 px-4 text-xs">
                <i className="fa-solid fa-book text-xs" />Docs
              </Link>
              <Link href="/contact" className="btn-secondary flex-1 py-2 px-4 text-xs">
                <i className="fa-solid fa-headset text-xs" />Support
              </Link>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-3xl border border-red-200 bg-red-50/60 p-6 fu fu4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-red-700 flex items-center gap-2 mb-1">
                <i className="fa-solid fa-triangle-exclamation" />Danger zone
                <span className="inline-flex rounded-full bg-red-100 border border-red-200 px-2.5 py-0.5 text-[11px] font-bold text-red-600">Irreversible</span>
              </p>
              <p className="text-xs text-red-400">
                Deleting your account permanently removes all plans and data. Contact support first if you need help.
              </p>
            </div>
            <button type="button" className="btn-danger shrink-0">
              <i className="fa-solid fa-trash text-xs" />Delete account
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

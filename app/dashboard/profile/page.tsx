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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .fu3 { animation-delay:.18s; }
        .fu4 { animation-delay:.24s; }

        .field-label { display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:6px; }
        .field-input {
          width:100%; background:#fff; border:1.5px solid #e2e8f0; border-radius:12px;
          padding:11px 14px; font-size:14px; font-weight:500; color:#0f172a;
          font-family:'Sora',sans-serif; outline:none;
          transition: border-color .2s, box-shadow .2s;
        }
        .field-input::placeholder { color:#94a3b8; }
        .field-input:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }
        .field-input:disabled { background:#f8fafc; color:#94a3b8; cursor:not-allowed; }
        .field-select {
          width:100%; background:#fff; border:1.5px solid #e2e8f0; border-radius:12px;
          padding:11px 14px; font-size:14px; font-weight:500; color:#0f172a;
          font-family:'Sora',sans-serif; outline:none; appearance:none; cursor:pointer;
          transition: border-color .2s, box-shadow .2s;
        }
        .field-select:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px; justify-content:center;
          background:#7c3aed; border-radius:12px; padding:11px 22px; font-size:13px;
          font-weight:700; color:#fff; cursor:pointer; border:none;
          transition:background .15s, transform .1s; font-family:'Sora',sans-serif;
        }
        .btn-primary:hover  { background:#6d28d9; }
        .btn-primary:active { transform:scale(.97); }

        .btn-secondary {
          display:inline-flex; align-items:center; gap:8px; justify-content:center;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:12px;
          padding:11px 22px; font-size:13px; font-weight:700; color:#1e293b;
          cursor:pointer; transition:background .15s; font-family:'Sora',sans-serif;
        }
        .btn-secondary:hover { background:#f8fafc; }

        .btn-dark {
          display:inline-flex; align-items:center; gap:8px; justify-content:center;
          background:#0f172a; border-radius:12px; padding:11px 22px; font-size:13px;
          font-weight:700; color:#fff; cursor:pointer; border:none;
          transition:background .15s; font-family:'Sora',sans-serif; width:100%;
        }
        .btn-dark:hover { background:#1e293b; }

        .btn-danger {
          display:inline-flex; align-items:center; gap:8px; justify-content:center;
          background:#fef2f2; border:1.5px solid #fecaca; border-radius:12px;
          padding:11px 22px; font-size:13px; font-weight:700; color:#dc2626;
          cursor:pointer; transition:background .15s; font-family:'Sora',sans-serif;
        }
        .btn-danger:hover { background:#fee2e2; }

        .section-card { background:#fff; border-radius:24px; border:1.5px solid #e2e8f0; padding:28px; }
        .section-title { font-size:15px; font-weight:800; color:#0f172a; margin-bottom:4px; }
        .section-desc  { font-size:13px; color:#64748b; margin-bottom:24px; }
        .divider { height:1px; background:#f1f5f9; margin:20px 0; }
      `}</style>

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors font-semibold">Dashboard</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Profile</span>
          </div>
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm">← Back</Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-5">

        {/* Page title */}
        <div className="fu">
          <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your account details, security, and API access</p>
        </div>

        {/* Avatar card */}
        <div className="section-card fu fu1 flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-violet-200">
              {initials}
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-lg">{displayName}</p>
            <p className="text-sm text-slate-400 mono truncate">{email}</p>
          </div>
          <span className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active account
          </span>
        </div>

        {/* Account details */}
        <div className="section-card fu fu2">
          <p className="section-title">Account Details</p>
          <p className="section-desc">Used for invoices, account recovery, and support.</p>
          <form className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Full name</label>
              <input className="field-input" defaultValue={displayName} placeholder="John Doe" />
            </div>
            <div>
              <label className="field-label">Email <span className="text-slate-400 font-normal">(login & receipts)</span></label>
              <input className="field-input" defaultValue={email} type="email" disabled />
            </div>
            <div>
              <label className="field-label">Company <span className="text-slate-400 font-normal">(optional)</span></label>
              <input className="field-input" placeholder="Your company" />
            </div>
            <div>
              <label className="field-label">Country</label>
              <div className="relative">
                <select className="field-select pr-9">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label className="field-label">City</label>
              <input className="field-input" placeholder="New York" />
            </div>
            <div>
              <label className="field-label">Timezone</label>
              <div className="relative">
                <select className="field-select pr-9">
                  <option value="America/New_York">America / New York</option>
                  <option value="America/Chicago">America / Chicago</option>
                  <option value="America/Los_Angeles">America / Los Angeles</option>
                  <option value="UTC">UTC</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="divider" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Changing country/company affects future invoices</p>
                <button type="submit" className="btn-primary">Save changes →</button>
              </div>
            </div>
          </form>
        </div>

        {/* Password + API side by side */}
        <div className="grid gap-5 lg:grid-cols-2 fu fu3">

          {/* Password */}
          <div className="section-card">
            <p className="section-title">Password</p>
            <p className="section-desc">Use a strong, unique password to protect your account.</p>
            <form className="space-y-4">
              {[
                { label: "Current password",    ph: "••••••••" },
                { label: "New password",         ph: "Min 10+ characters" },
                { label: "Confirm new password", ph: "••••••••••" },
              ].map(({ label, ph }) => (
                <div key={label}>
                  <label className="field-label">{label}</label>
                  <input className="field-input" type="password" placeholder={ph} />
                </div>
              ))}
              <div className="pt-1">
                <button type="submit" className="btn-dark">Update password</button>
              </div>
              <p className="text-xs text-slate-400 text-center">Tip: use a password manager and avoid reusing passwords.</p>
            </form>
          </div>

          {/* Security & API */}
          <div className="section-card space-y-4">
            <div>
              <p className="section-title">Security &amp; API Access</p>
              <p className="section-desc">Manage 2FA and your API key for integrations.</p>
            </div>

            {/* 2FA */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Two-factor authentication</p>
                <p className="text-xs text-slate-400 mt-1">Add an extra layer of protection to your login</p>
              </div>
              <button type="button" className="btn-secondary py-2 px-4 text-xs shrink-0">Enable</button>
            </div>

            {/* API Key */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-bold text-slate-900 mb-1">API Key</p>
              <p className="text-xs text-slate-400 mb-3">Use for automation, stats, and integration workflows</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 min-w-0 truncate bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs mono text-slate-600 font-medium">
                  pk_live_••••••••••••••••••••••••••
                </code>
                <button type="button" className="btn-primary py-2.5 px-3 text-xs shrink-0">Regenerate</button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Regenerating invalidates the old key immediately</p>
            </div>

            <div className="flex gap-3">
              <Link href="/documentation" className="btn-secondary flex-1 py-2 px-4 text-xs">Docs</Link>
              <Link href="/contact"       className="btn-secondary flex-1 py-2 px-4 text-xs">Support</Link>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 fu fu4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-extrabold text-red-700">Danger zone</p>
                <span className="inline-flex rounded-full bg-red-100 border border-red-200 px-2.5 py-0.5 text-[11px] font-bold text-red-600">Irreversible</span>
              </div>
              <p className="text-xs text-red-400">Deleting your account permanently removes all plans and data. Contact support first if you need help.</p>
            </div>
            <button type="button" className="btn-danger shrink-0">Delete account</button>
          </div>
        </div>

      </main>
    </div>
  );
}

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
  const email = decodeURIComponent(cookieStore.get("ps_email")?.value || "");
  const displayName = email.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }
        .input-field {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 12px 16px; font-size: 14px; color: white;
          font-family: 'Sora', sans-serif; font-weight: 500; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
        .input-field:focus { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }
        .input-field:disabled { opacity: 0.4; cursor: not-allowed; }
        .select-field {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 12px 16px; font-size: 14px; color: white;
          font-family: 'Sora', sans-serif; font-weight: 500; outline: none; transition: border-color 0.2s;
          appearance: none; cursor: pointer;
        }
        .select-field:focus { border-color: rgba(139,92,246,0.5); }
        .select-field option { background: #1a1b23; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border: none; border-radius: 12px; padding: 12px 24px; font-size: 14px;
          font-weight: 700; color: white; cursor: pointer; transition: opacity 0.2s, transform 0.1s;
          font-family: 'Sora', sans-serif;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 12px 24px; font-size: 14px;
          font-weight: 600; color: white; cursor: pointer; transition: background 0.2s;
          font-family: 'Sora', sans-serif;
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.1); }
        .btn-danger {
          background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
          border-radius: 12px; padding: 12px 24px; font-size: 14px; font-weight: 700;
          color: #fca5a5; cursor: pointer; transition: background 0.2s;
          font-family: 'Sora', sans-serif;
        }
        .btn-danger:hover { background: rgba(239,68,68,0.25); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); margin-bottom: 20px; }
      `}</style>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors font-medium">Dashboard</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-semibold">Profile</span>
          </div>
          <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4">
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">

        {/* Page heading */}
        <div className="fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight">Profile Settings</h1>
          <p className="mt-1 text-sm text-white/40">Manage your account, security, and preferences</p>
        </div>

        {/* Avatar + quick info */}
        <div className="glass rounded-3xl p-6 fade-up flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-extrabold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-lg">{displayName}</div>
            <div className="text-sm text-white/40 mono truncate">{email}</div>
          </div>
          <div className="ml-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active account
            </span>
          </div>
        </div>

        {/* Account details */}
        <div className="glass rounded-3xl p-6 fade-up">
          <p className="section-label">Account Details</p>
          <form className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Full name</label>
              <input className="input-field" defaultValue={displayName} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Email <span className="text-white/20 text-xs">(login & receipts)</span></label>
              <input className="input-field" defaultValue={email} type="email" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Company <span className="text-white/20 text-xs">(optional)</span></label>
              <input className="input-field" placeholder="Your company" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Country</label>
              <div className="relative">
                <select className="select-field">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▾</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">City</label>
              <input className="input-field" placeholder="New York" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Timezone</label>
              <div className="relative">
                <select className="select-field">
                  <option value="America/New_York">America / New York</option>
                  <option value="America/Chicago">America / Chicago</option>
                  <option value="America/Los_Angeles">America / Los Angeles</option>
                  <option value="UTC">UTC</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▾</div>
              </div>
            </div>
            <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-white/5">
              <p className="text-xs text-white/25">Country changes affect future invoices</p>
              <button type="submit" className="btn-primary">
                Save changes →
              </button>
            </div>
          </form>
        </div>

        {/* Security + API side by side */}
        <div className="grid gap-6 lg:grid-cols-2 fade-up">

          {/* Password */}
          <div className="glass rounded-3xl p-6">
            <p className="section-label">Password</p>
            <form className="space-y-4">
              {[
                { label: "Current password", ph: "••••••••" },
                { label: "New password", ph: "Min 10+ chars", hint: "recommended" },
                { label: "Confirm new password", ph: "••••••••••" },
              ].map(({ label, ph }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm font-semibold text-white/60">{label}</label>
                  <input className="input-field" type="password" placeholder={ph} />
                </div>
              ))}
              <button type="submit" className="btn-secondary w-full justify-center mt-2">
                Update password
              </button>
              <p className="text-xs text-white/20 text-center">Use a password manager. Never reuse passwords.</p>
            </form>
          </div>

          {/* API & Security */}
          <div className="glass rounded-3xl p-6 space-y-5">
            <p className="section-label">Security & API</p>

            {/* 2FA */}
            <div className="rounded-2xl bg-white/3 border border-white/6 p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-sm">Two-factor authentication</div>
                <p className="text-xs text-white/40 mt-1">Add an extra layer to your login</p>
              </div>
              <button type="button" className="btn-secondary py-2 px-3 text-xs shrink-0">
                Enable
              </button>
            </div>

            {/* API Key */}
            <div className="rounded-2xl bg-white/3 border border-white/6 p-4">
              <div className="font-semibold text-sm">API Key</div>
              <p className="text-xs text-white/40 mt-1 mb-3">For automation and integrations</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 min-w-0 truncate rounded-xl bg-black/30 border border-white/10 px-3 py-2.5 text-xs mono text-white/50">
                  pk_live_••••••••••••••••••••••••••
                </code>
                <button type="button" className="btn-secondary py-2.5 px-3 text-xs shrink-0">
                  Regenerate
                </button>
              </div>
              <p className="mt-2 text-[11px] text-white/20">Regenerating invalidates the old key immediately</p>
            </div>

            <div className="flex gap-3 pt-1">
              <Link href="/documentation" className="btn-secondary py-2 px-4 text-xs flex-1 justify-center">
                Docs
              </Link>
              <Link href="/contact" className="btn-secondary py-2 px-4 text-xs flex-1 justify-center">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 fade-up">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-400 font-bold text-sm">Danger zone</span>
                <span className="inline-flex rounded-full bg-red-500/15 border border-red-500/30 px-2.5 py-0.5 text-[11px] font-bold text-red-400">Irreversible</span>
              </div>
              <p className="text-xs text-white/30">Deleting your account permanently removes all plans and data. Contact support first if you need help.</p>
            </div>
            <button type="button" className="btn-danger shrink-0">
              Delete account
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

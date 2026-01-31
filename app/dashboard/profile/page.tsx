import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile | Proxiesseller Dashboard",
  description: "Manage your account profile, password, and security settings.",
  robots: { index: false, follow: false },
};

function Card({
  title,
  desc,
  children,
  action,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-base font-black text-slate-900">{title}</h2>
          {desc ? <p className="mt-1 text-sm text-slate-600">{desc}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-black text-slate-900">{label}</label>
        {hint ? <span className="text-xs font-semibold text-slate-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900",
        "placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900",
        "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function Divider() {
  return <div className="h-px w-full bg-slate-200" />;
}

export default function ProfilePage() {
  // TODO: Replace with real data from your auth/session
  const user = {
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc.",
    country: "United States",
    city: "New York",
    timezone: "America/New_York",
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/dashboard" className="hover:text-slate-900">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Profile</span>
          </div>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Update your account details, security settings, and API access.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Account details */}
        <Card
          title="Account details"
          desc="Used for invoices, account recovery, and support."
          action={
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              Active
            </span>
          }
        >
          <form className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name">
              <Input defaultValue={user.name} placeholder="John Doe" />
            </Field>

            <Field label="Email" hint="Login & receipts">
              <Input
                defaultValue={user.email}
                type="email"
                disabled
                className="bg-slate-50 text-slate-700"
              />
            </Field>

            <Field label="Company (optional)">
              <Input defaultValue={user.company} placeholder="Company name" />
            </Field>

            <Field label="Country">
              <Select defaultValue={user.country}>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>France</option>
              </Select>
            </Field>

            <Field label="City">
              <Input defaultValue={user.city} placeholder="New York" />
            </Field>

            <Field label="Timezone">
              <Select defaultValue={user.timezone}>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Chicago">America/Chicago</option>
                <option value="America/Denver">America/Denver</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="UTC">UTC</option>
              </Select>
            </Field>

            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Changing country/company affects future invoices.
              </p>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
              >
                Save changes <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </Card>

        {/* Security + API */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Password" desc="Use a unique password to protect your account.">
            <form className="space-y-4">
              <Field label="Current password">
                <Input type="password" placeholder="••••••••" />
              </Field>
              <Field label="New password" hint="Min 10+ chars recommended">
                <Input type="password" placeholder="••••••••••" />
              </Field>
              <Field label="Confirm new password">
                <Input type="password" placeholder="••••••••••" />
              </Field>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-black"
              >
                Update password
              </button>

              <p className="text-xs text-slate-500">
                Tip: Use a password manager and avoid reusing passwords.
              </p>
            </form>
          </Card>

          <Card title="Security & API access" desc="Manage API key and extra security options.">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-black text-slate-900">Two-factor authentication (2FA)</div>
                    <p className="mt-1 text-sm text-slate-600">
                      Add an extra layer of protection to your dashboard login.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                  >
                    Enable
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-black text-slate-900">API Key</div>
                <p className="mt-1 text-sm text-slate-600">
                  Use your API key for automation, usage stats, and integration workflows.
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <code className="flex-1 truncate rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-900">
                    pk_live_••••••••••••••••••••••••••
                  </code>
                  <button
                    type="button"
                    className="rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black text-white hover:bg-indigo-500"
                  >
                    Regenerate
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Regenerating will invalidate the old key immediately.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/documentation"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Documentation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Support
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Danger zone */}
        <Card
          title="Danger zone"
          desc="Deleting your account permanently removes all plans and data."
          action={
            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
              Careful
            </span>
          }
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-black text-slate-900">Delete account</div>
              <p className="mt-1 text-sm text-slate-600">
                This action is irreversible. Contact support if you need help before deleting.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-black text-white hover:bg-rose-500"
            >
              Delete account
            </button>
          </div>

          <Divider />

          <p className="mt-4 text-xs text-slate-500">
            Pro tip: you can also rotate API keys and remove active sessions without deleting the account.
          </p>
        </Card>
      </div>
    </div>
  );
}

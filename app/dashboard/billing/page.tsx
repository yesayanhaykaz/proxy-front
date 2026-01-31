import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billing | Proxiesseller Dashboard",
  description: "Manage your plan, invoices, and payment methods.",
  robots: { index: false, follow: false },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
      {children}
    </span>
  );
}

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-2 text-base font-black text-slate-900">{value}</div>
    </div>
  );
}

export default function BillingPage() {
  // TODO: Replace with real data from your API
  const plan = {
    name: "Residential Proxies — Starter",
    status: "Active",
    renewal: "2026-03-01",
    amount: "$49.00 / month",
    paymentMethod: "Visa •••• 4242",
  };

  const invoices = [
    { id: "INV-10021", date: "2026-02-01", amount: "$49.00", status: "Paid" },
    { id: "INV-09988", date: "2026-01-01", amount: "$49.00", status: "Paid" },
    { id: "INV-09812", date: "2025-12-01", amount: "$49.00", status: "Paid" },
  ];

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
            <span className="text-slate-900">Billing</span>
          </div>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Billing
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Manage your plan, invoices, and payment method. For upgrades or cancellations, use the billing portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Upgrade plans
          </Link>
          <a
            href="/api/billing/portal"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
          >
            Manage billing <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Current plan */}
        <Card
          title="Current plan"
          desc="Subscription status and renewal details."
          action={<Pill>{plan.status}</Pill>}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Plan" value={plan.name} />
            <Stat label="Renews on" value={plan.renewal} />
            <Stat label="Price" value={plan.amount} />
            <Stat label="Payment method" value={plan.paymentMethod} />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-black text-slate-900">Need a different proxy type?</div>
                <p className="mt-1 text-sm text-slate-600">
                  Switch between Residential, Mobile, Datacenter, and Fast plans anytime.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/residential-proxies"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Residential
                </Link>
                <Link
                  href="/mobile-proxies"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Mobile
                </Link>
                <Link
                  href="/datacenter-proxies"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Datacenter
                </Link>
                <Link
                  href="/fast-proxies"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  Fast
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment & billing details */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            title="Payment method"
            desc="Update card securely in the billing portal."
            action={
              <a
                href="/api/billing/portal"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 hover:bg-slate-50"
              >
                Update
              </a>
            }
          >
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <i className="bi bi-credit-card text-xl text-slate-900" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-slate-900">{plan.paymentMethod}</div>
                <p className="mt-1 text-sm text-slate-600">We don’t store full card details.</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Payments are handled by your provider (Stripe/Paddle). Use the portal to cancel, change plan, or update card.
            </p>
          </Card>

          <Card title="Billing details" desc="Used for invoices and receipts.">
            <form className="space-y-3">
              <input
                placeholder="Full name / Company"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <input
                placeholder="Address line"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="City"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <input
                  placeholder="ZIP / Postal code"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-black"
              >
                Save billing details
              </button>
            </form>
          </Card>
        </div>

        {/* Invoices */}
        <Card title="Invoices" desc="Download invoices for accounting.">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Invoice</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-black text-slate-900">{inv.id}</td>
                      <td className="px-5 py-4 text-slate-700">{inv.date}</td>
                      <td className="px-5 py-4 font-black text-slate-900">{inv.amount}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <a
                          href={`/api/billing/invoice/${inv.id}`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-900 hover:bg-slate-50"
                        >
                          PDF ↓
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Missing something? Open the billing portal for full history.
          </p>
        </Card>
      </div>
    </div>
  );
}

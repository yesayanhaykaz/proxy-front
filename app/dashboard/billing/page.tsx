import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Billing | Proxiesseller Dashboard",
  description: "Manage your plan, invoices, and payment methods.",
  robots: { index: false, follow: false },
};

type Purchase = {
  purchase_id: string;
  package_name: string;
  category: string;
  price_cents: number;
  created_at: string;
  status: string;
};

async function getPurchases(userId: string): Promise<Purchase[]> {
  if (!userId) return [];

  const res = await fetch(
    "https://api.proxiesseller.cc/api/purchases",
    {
      headers: { "X-User-Id": userId },
      cache: "no-store",
    }
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data.purchases || [];
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
      {children}
    </span>
  );
}

export default async function BillingPage() {

  const cookieStore = cookies();

  const userId = cookieStore.get("ps_uid")?.value || "";

  const purchases = await getPurchases(userId);

  const lastPlan = purchases[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">

      <h1 className="text-2xl font-black text-slate-900">
        Billing
      </h1>

      <div className="mt-8 space-y-6">

        {/* Current plan */}

        {lastPlan && (

          <div className="rounded-2xl border bg-white p-6">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-lg font-black">
                  {lastPlan.package_name}
                </div>

                <div className="text-sm text-slate-600">
                  Activated {new Date(lastPlan.created_at).toLocaleDateString()}
                </div>

              </div>

              <Pill>Active</Pill>

            </div>

            <div className="mt-4 text-sm">

              Price: <b>${(lastPlan.price_cents / 100).toFixed(2)}</b>

            </div>

          </div>

        )}

        {/* Invoices */}

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="text-lg font-black">
            Invoices
          </h2>

          {purchases.length === 0 && (
            <div className="mt-4 text-sm text-slate-500">
              No invoices yet
            </div>
          )}

          <div className="mt-4 space-y-3">

            {purchases.map((p) => (

              <div
                key={p.purchase_id}
                className="flex items-center justify-between rounded-xl border p-4"
              >

                <div>

                  <div className="font-bold">
                    {p.package_name}
                  </div>

                  <div className="text-xs text-slate-500">
                    {new Date(p.created_at).toLocaleDateString()}
                  </div>

                </div>

                <div className="font-bold">
                  ${(p.price_cents / 100).toFixed(2)}
                </div>

              </div>

            ))}

          </div>

        </div>

        <Link
          href="/pricing"
          className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white"
        >
          Upgrade plan
        </Link>

      </div>

    </div>
  );
}
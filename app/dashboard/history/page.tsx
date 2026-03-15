import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function getTransactions(userId: string) {

  const res = await fetch(
    "https://api.proxiesseller.cc/api/purchases",
    {
      headers: { "X-User-Id": userId },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.purchases || [];
}

export default async function HistoryPage() {

  const cookieStore = cookies();

  const userId = cookieStore.get("ps_uid")?.value || "";

  const purchases = await getTransactions(userId);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h1 className="text-2xl font-extrabold text-slate-900">
        Transaction history
      </h1>

      {purchases.length === 0 && (
        <div className="mt-6 text-sm text-slate-500">
          No transactions yet.
        </div>
      )}

      <div className="mt-6 space-y-4">

        {purchases.map((p: any) => (
          <div
            key={p.purchase_id}
            className="rounded-xl border p-4 flex justify-between"
          >

            <div>
              <div className="font-bold">{p.package_name}</div>
              <div className="text-xs text-slate-500">
                {new Date(p.created_at).toLocaleString()}
              </div>
            </div>

            <div className="font-bold">
              ${(p.price_cents / 100).toFixed(2)}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
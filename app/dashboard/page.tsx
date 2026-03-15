import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  CreditCard,
  Globe2,
  ShieldCheck,
  Zap,
  Boxes,
  Sparkles,
  Server,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Purchase = {
  purchase_id: string;
  package_name: string;
  category: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "active" | "expired";
  created_at: string;
  proxy_username: string;
  proxy_password: string;
  host: string;
  port: number;
  protocol: string;
};

type Sub = {
  id: string;
  planName: string;
  type: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "Active" | "Expired";
  renewsOn: string;
  usage: { used: number; total: number; unit: "GB" };
  location: string;
};

function pct(used: number, total: number) {
  if (!total) return 0;
  const p = Math.round((used / total) * 100);
  return Math.max(0, Math.min(100, p));
}

function mapPurchase(p: Purchase): Sub {
  return {
    id: p.purchase_id,
    planName: p.package_name,
    type: p.category,
    status: p.status === "active" ? "Active" : "Expired",
    renewsOn: new Date(p.created_at).toLocaleDateString(),
    usage: { used: 0, total: 5, unit: "GB" }, // you can later load real traffic
    location: "Global",
  };
}

async function getSubscriptions(userId: string): Promise<Sub[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/purchases`, {
      headers: {
        "X-User-Id": userId,
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    const purchases: Purchase[] = data.purchases || [];

    return purchases.map(mapPurchase);
  } catch {
    return [];
  }
}

function badgeType(type: Sub["type"]) {
  const cls =
    type === "Residential"
      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
      : type === "Mobile"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : type === "Datacenter"
      ? "bg-sky-50 text-sky-700 border-sky-200"
      : "bg-amber-50 text-amber-800 border-amber-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold ${cls}`}>
      {type}
    </span>
  );
}

function statusPill(status: Sub["status"]) {
  return status === "Active" ? (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
      Active
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
      Expired
    </span>
  );
}

export default async function DashboardPage() {
  const email = decodeURIComponent(cookies().get("ps_email")?.value || "user");
  const userId = cookies().get("ps_uid")?.value || "";

  const subs = await getSubscriptions(userId);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10">

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Welcome back, <span className="text-indigo-700">{email}</span>
          </h1>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">
            My subscriptions
          </h2>

          {subs.length === 0 && (
            <div className="py-10 text-center text-slate-500">
              No active proxies yet.
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-white"
                >
                  Browse plans
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-4">
            {subs.map((s) => {
              const progress = pct(s.usage.used, s.usage.total);

              return (
                <div
                  key={s.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex justify-between">

                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-extrabold">{s.planName}</div>
                        {badgeType(s.type)}
                        {statusPill(s.status)}
                      </div>

                      <div className="text-sm text-slate-600 mt-2">
                        Renews on {s.renewsOn}
                      </div>

                      <div className="mt-3 h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <Link
                        href={`/dashboard/subscription?id=${encodeURIComponent(
                          s.id
                        )}`}
                        className="rounded-xl border px-4 py-2 text-sm"
                      >
                        Details
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
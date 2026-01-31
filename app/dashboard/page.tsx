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

export const dynamic = "force-dynamic"; // reads cookies

type Sub = {
  id: string;
  planName: string;
  type: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "Active" | "Expired";
  renewsOn: string;
  usage: { used: number; total: number; unit: "GB" | "IPs" };
  location: string;
};

const MOCK_SUBS: Sub[] = [
  {
    id: "sub_1",
    planName: "Residential 5GB",
    type: "Residential",
    status: "Active",
    renewsOn: "Feb 28, 2026",
    usage: { used: 1.2, total: 5, unit: "GB" },
    location: "US / Worldwide",
  },
  {
    id: "sub_2",
    planName: "Mobile 1GB",
    type: "Mobile",
    status: "Active",
    renewsOn: "Feb 14, 2026",
    usage: { used: 0.3, total: 1, unit: "GB" },
    location: "EU / Worldwide",
  },
];

function pct(used: number, total: number) {
  if (!total) return 0;
  const p = Math.round((used / total) * 100);
  return Math.max(0, Math.min(100, p));
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

export default function DashboardPage() {
  const email = decodeURIComponent(cookies().get("ps_email")?.value || "user");

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Header block (no logout here — header has account menu) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-700">
              <Sparkles className="h-4 w-4" />
              Account Dashboard
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
              Welcome back, <span className="text-indigo-700">{email}</span>
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Manage subscriptions, copy endpoints, and monitor usage — everything in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Browse plans <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-indigo-500"
            >
              Setup guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Kpi icon={ShieldCheck} label="Security" value="Session active" hint="Protected access" tone="indigo" />
          <Kpi icon={Zap} label="Provisioning" value="Instant" hint="Auto activation" tone="sky" />
          <Kpi icon={Globe2} label="Coverage" value="Global" hint="Multiple locations" tone="emerald" />
          <Kpi icon={CreditCard} label="Billing" value="Manage" hint="Renewals & invoices" tone="slate" />
        </div>

        {/* Subscriptions */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">My subscriptions</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Click “Details” to see endpoints, credentials, usage, and setup examples.
              </p>
            </div>

            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-500">
              Buy more proxies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {MOCK_SUBS.map((s) => {
              const progress = pct(s.usage.used, s.usage.total);

              return (
                <div
                  key={s.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-base font-extrabold text-slate-900">{s.planName}</div>
                        {badgeType(s.type)}
                        {statusPill(s.status)}
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-700">
                          <Server className="h-4 w-4" />
                          {s.location}
                        </span>
                      </div>

                      <div className="mt-2 text-sm font-semibold text-slate-600">
                        Renews on <span className="font-extrabold text-slate-900">{s.renewsOn}</span>
                      </div>

                      {/* Usage bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span>
                            Usage:{" "}
                            <span className="font-extrabold text-slate-900">{s.usage.used}</span> / {s.usage.total}{" "}
                            {s.usage.unit}
                          </span>
                          <span className="font-extrabold text-slate-700">{progress}%</span>
                        </div>

                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-indigo-600"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Quick meta */}
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                          <span className="rounded-full bg-slate-50 px-3 py-1">Protocol: SOCKS5 / HTTP</span>
                          <span className="rounded-full bg-slate-50 px-3 py-1">Auth: user/pass or IP</span>
                          <span className="rounded-full bg-slate-50 px-3 py-1">Rotation: configurable</span>
                        </div>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <Link href={`/dashboard/subscription?id=${encodeURIComponent(s.id)}` }
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                        >Details</Link>

                      <Link
                        href="/documentation"
                        className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-indigo-500"
                      >
                        Setup guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help box */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                <Boxes className="h-5 w-5 text-slate-700" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900">Need help choosing the right proxy type?</div>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Residential for high-trust targets, Mobile for social platforms, Datacenter for speed, Fast for low-latency automation.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500" href="/residential-proxies">
                    Residential
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500" href="/mobile-proxies">
                    Mobile
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500" href="/datacenter-proxies">
                    Datacenter
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500" href="/fast-proxies">
                    Fast
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: any;
  label: string;
  value: string;
  hint: string;
  tone: "indigo" | "sky" | "emerald" | "slate";
}) {
  const toneCls =
    tone === "indigo"
      ? "border-indigo-200/60 bg-indigo-50/40"
      : tone === "sky"
      ? "border-sky-200/60 bg-sky-50/40"
      : tone === "emerald"
      ? "border-emerald-200/60 bg-emerald-50/40"
      : "border-slate-200/60 bg-slate-50/40";

  const iconCls =
    tone === "indigo"
      ? "text-indigo-700 bg-indigo-600/10"
      : tone === "sky"
      ? "text-sky-700 bg-sky-600/10"
      : tone === "emerald"
      ? "text-emerald-700 bg-emerald-600/10"
      : "text-slate-700 bg-slate-900/5";

  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${toneCls}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconCls}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-extrabold text-slate-700">{label}</div>
          <div className="text-lg font-extrabold text-slate-900">{value}</div>
        </div>
      </div>
      <div className="mt-3 text-sm font-semibold text-slate-600">{hint}</div>
    </div>
  );
}

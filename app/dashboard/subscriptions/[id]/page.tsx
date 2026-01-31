import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Copy, Globe2, ShieldCheck, Server, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

function mockById(id: string) {
  // Replace with DB later
  const isMobile = id.includes("2");
  return {
    id,
    planName: isMobile ? "Mobile 1GB" : "Residential 5GB",
    type: isMobile ? "Mobile" : "Residential",
    renewsOn: isMobile ? "Feb 14, 2026" : "Feb 28, 2026",
    usage: { used: isMobile ? 0.3 : 1.2, total: isMobile ? 1 : 5, unit: "GB" as const },
    endpoints: {
      socks5: "socks5.proxiesseller.cc:1080",
      http: "http.proxiesseller.cc:8080",
      host: "proxiesseller.cc",
    },
    auth: {
      username: "user123",
      password: "pass123",
      ipWhitelist: "Recommended for bots (no password needed)",
    },
    notes: isMobile
      ? "Mobile proxies are ideal for social platforms, apps, and high-trust targets."
      : "Residential proxies are best for scraping, price monitoring, and avoiding bans.",
  };
}

function pct(used: number, total: number) {
  if (!total) return 0;
  const p = Math.round((used / total) * 100);
  return Math.max(0, Math.min(100, p));
}

export default function SubscriptionDetailsPage({ params }: { params: { id: string } }) {
  const email = decodeURIComponent(cookies().get("ps_email")?.value || "user");
  const sub = mockById(decodeURIComponent(params.id));
  const progress = pct(sub.usage.used, sub.usage.total);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-500">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Subscription Details
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                {sub.planName} <span className="text-slate-400">•</span>{" "}
                <span className="text-indigo-700">{email}</span>
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">{sub.notes}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-extrabold">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                  Type: {sub.type}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                  Renews: {sub.renewsOn}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                  ID: {sub.id}
                </span>
              </div>
            </div>

            <Link
              href="/documentation"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-indigo-500"
            >
              Setup guide
            </Link>
          </div>

          {/* Usage */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between text-sm font-extrabold text-slate-900">
              <span>Usage</span>
              <span className="text-slate-700">{progress}%</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-600">
              {sub.usage.used} / {sub.usage.total} {sub.usage.unit}
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200/60">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Connection blocks */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card
              title="Endpoints"
              icon={<Server className="h-5 w-5" />}
              items={[
                { label: "SOCKS5", value: sub.endpoints.socks5 },
                { label: "HTTP", value: sub.endpoints.http },
                { label: "Host", value: sub.endpoints.host },
              ]}
            />

            <Card
              title="Authentication"
              icon={<ShieldCheck className="h-5 w-5" />}
              items={[
                { label: "Username", value: sub.auth.username },
                { label: "Password", value: sub.auth.password },
                { label: "IP Whitelist", value: sub.auth.ipWhitelist },
              ]}
            />
          </div>

          {/* Setup examples */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <CodeCard
              title="cURL (HTTP Proxy)"
              icon={<Globe2 className="h-5 w-5" />}
              code={`curl -x http://${sub.auth.username}:${sub.auth.password}@${sub.endpoints.http} https://ifconfig.me`}
            />
            <CodeCard
              title="cURL (SOCKS5 Proxy)"
              icon={<Zap className="h-5 w-5" />}
              code={`curl --socks5 ${sub.auth.username}:${sub.auth.password}@${sub.endpoints.socks5} https://ifconfig.me`}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-extrabold text-slate-900">Tips</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-600">
              <li>Prefer IP whitelist for servers/bots (more stable).</li>
              <li>Use rotation settings if the target bans frequently.</li>
              <li>If you need a specific country/city, pick location in your plan settings.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
          {icon}
        </div>
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((x) => (
          <div key={x.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{x.label}</div>
            <div className="mt-1 break-all text-sm font-extrabold text-slate-900">{x.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeCard({
  title,
  icon,
  code,
}: {
  title: string;
  icon: React.ReactNode;
  code: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
          {icon}
        </div>
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-4">
        <pre className="overflow-x-auto text-xs font-semibold text-slate-100">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-3 text-xs font-semibold text-slate-500">
        Copy & run in terminal to test your proxy.
      </div>
    </div>
  );
}

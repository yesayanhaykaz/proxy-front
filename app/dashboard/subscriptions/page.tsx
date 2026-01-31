import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SubscriptionPage({
  searchParams,
}: {
  searchParams?: { id?: string };
}) {
  const id = searchParams?.id ? String(searchParams.id) : "";

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/dashboard"
          className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-extrabold text-slate-900">
            Subscription details
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Testing route. Your subscription id:
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              id
            </div>
            <div className="mt-1 break-all text-sm font-extrabold text-slate-900">
              {id || "(missing id)"}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

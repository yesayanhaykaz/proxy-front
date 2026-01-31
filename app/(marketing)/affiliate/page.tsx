import Link from "next/link";

export const metadata = {
  title: "Affiliate Program — ProxiesSeller",
  description: "Earn commissions by referring customers to ProxiesSeller.",
};

export default function AffiliatePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">Affiliate Program</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600">
          Promote ProxiesSeller and earn commissions on qualified referrals. (We can later connect to your real affiliate system.)
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Card title="Share" text="Share your referral link on websites, blogs, or communities." icon="fas fa-share-nodes" />
          <Card title="Earn" text="Earn commissions on paid customers you refer." icon="fas fa-dollar-sign" />
          <Card title="Scale" text="Get marketing assets and tracking to grow your earnings." icon="fas fa-chart-line" />
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Join Affiliate Program
          </Link>
        </div>
      </div>
    </main>
  );
}

function Card({ title, text, icon }: { title: string; text: string; icon: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="text-2xl text-blue-700"><i className={icon} /></div>
      <div className="mt-3 text-lg font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{text}</div>
    </div>
  );
}


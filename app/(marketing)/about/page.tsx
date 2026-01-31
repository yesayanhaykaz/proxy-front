export const metadata = {
  title: "About ProxiesSeller",
  description: "Learn about ProxiesSeller: our network, mission, and reliability standards.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">About ProxiesSeller</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
          ProxiesSeller provides fast, secure proxy infrastructure for automation, web scraping, privacy, and research.
          We focus on clean IP pools, stable routing, and straightforward plans for developers and marketers.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Card icon="fas fa-shield-halved" title="Security" text="Multiple authentication options and privacy-first operations." />
          <Card icon="fas fa-gauge-high" title="Performance" text="Optimized routing for speed, stability and success rates." />
          <Card icon="fas fa-headset" title="Support" text="Responsive support and clear documentation for setup." />
        </div>
      </div>
    </main>
  );
}

function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="text-2xl text-blue-700"><i className={icon} /></div>
      <div className="mt-3 text-lg font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{text}</div>
    </div>
  );
}

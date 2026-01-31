export function TrustBar() {
  const items = [
    { title: "No Logs", desc: "Privacy-first routing" },
    { title: "Rotation Control", desc: "Sticky + rotating sessions" },
    { title: "Auth Options", desc: "User/Pass or IP whitelist" },
    { title: "Built For", desc: "Scraping • Bots • Ads • SEO" },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((i) => (
              <div
                key={i.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
              >
                <div className="text-sm font-extrabold text-slate-950">{i.title}</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">{i.desc}</div>
                <div className="mt-3 h-1 w-10 rounded-full bg-indigo-600/30 transition group-hover:bg-indigo-600/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChoose(props: {
  items: { icon: string; title: string; text: string }[];
}) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">Why Choose Our Proxies?</h2>
        <p className="mt-3 text-sm text-slate-600 text-center">
          Designed for speed, stability, and anonymity — perfect for scraping, SEO, and automation.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {props.items.map((x) => (
            <div key={x.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
              <div className="text-3xl text-blue-700">
                <i className={x.icon} />
              </div>
              <div className="mt-4 text-lg font-extrabold text-slate-900">{x.title}</div>
              <div className="mt-2 text-sm text-slate-600">{x.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

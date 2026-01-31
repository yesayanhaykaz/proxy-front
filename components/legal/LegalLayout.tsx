"use client";

import { useEffect, useMemo, useState } from "react";

type Section = { id: string; label: string };

function cn(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function LegalLayout(props: {
  title: string;
  subtitle?: string;
  lastUpdatedHuman?: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  const { title, subtitle, lastUpdatedHuman, sections, children } = props;

  const [activeId, setActiveId] = useState(sections?.[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) => s.label.toLowerCase().includes(q));
  }, [query, sections]);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.2, 0.35, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    setMobileOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <main className="bg-white">
      {/* Top header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-10 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <a href="/" className="hover:text-slate-950">Home</a>
                <span className="text-slate-300">/</span>
                <span className="text-slate-700">Legal</span>
              </div>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                  {subtitle}
                </p>
              ) : null}

              {lastUpdatedHuman ? (
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Last updated: <span className="text-slate-800">{lastUpdatedHuman}</span>
                </p>
              ) : null}
            </div>

            {/* Mobile TOC */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Table of contents
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Layout */}
      <section className="container-page py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-950">On this page</div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                  {sections.length}
                </span>
              </div>

              <div className="mt-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections…"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <nav className="mt-4 max-h-[62vh] space-y-1 overflow-auto pr-1">
                {filtered.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => jump(s.id)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-2xl px-3 py-2 text-left transition",
                        isActive
                          ? "bg-indigo-50 text-indigo-900"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                          isActive ? "bg-indigo-500" : "bg-slate-200 group-hover:bg-slate-300"
                        )}
                      />
                      <span className="text-sm font-semibold leading-snug">{s.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  Need help?
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Billing, refunds, compliance questions — we respond fast.
                </p>
                <a
                  href="/contact"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-indigo-700"
                >
                  Contact support
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
              <div className="prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-h2:text-2xl prose-h2:font-extrabold prose-h2:tracking-tight prose-h3:text-lg prose-h3:font-extrabold prose-p:leading-relaxed prose-a:font-semibold prose-a:text-indigo-700 hover:prose-a:text-indigo-800">
                {children}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-extrabold text-slate-950">Questions about these terms?</div>
              <p className="mt-2 text-sm text-slate-600">
                Contact us and we’ll clarify refunds, acceptable use, or billing.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-indigo-700"
                >
                  Contact support
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] rounded-t-3xl border-t border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-950">Table of contents</div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections…"
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-4 space-y-1 overflow-auto">
              {filtered.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => jump(s.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl px-3 py-2 text-left",
                      isActive ? "bg-indigo-50 text-indigo-900" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", isActive ? "bg-indigo-500" : "bg-slate-200")} />
                    <span className="text-sm font-semibold">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

"use client";
import { useState } from "react";

const FAQS = [
  { q: "What proxy types do you offer?", a: "Residential, Mobile, Datacenter and Fast proxies. Each type is built for scraping, automation, ad accounts, or general browsing." },
  { q: "Do you support IP rotation?", a: "Yes. Rotating and sticky sessions depending on plan type, plus flexible authorization." },
  { q: "How fast is setup?", a: "Usually instant. After purchase, proxy access appears in your dashboard with credentials and connection details." },
  { q: "Can I use them for scraping?", a: "Yes, commonly used for scraping/automation. Always comply with site terms and local laws." },
];

export function FAQ() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">FAQ</h2>
          <p className="mt-3 text-sm text-slate-600">Answers to common questions about proxies and setup.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <span className="text-slate-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-sm leading-6 text-slate-600">{a}</div>}
    </div>
  );
}

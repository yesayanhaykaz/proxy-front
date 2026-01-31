"use client";

import Link from "next/link";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";

type Row = { feature: string; left: string; right: string };
type FAQ = { q: string; a?: string };

export function ComparisonBlock(props: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  rows: Row[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
}) {
  const { title, leftLabel, rightLabel, rows, faqs, ctaTitle, ctaText, ctaHref } = props;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">{title}</h2>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <div className="grid grid-cols-3 gap-0 border-b border-slate-200 bg-white">
            <div className="p-4 text-sm font-semibold text-slate-700">Feature</div>
            <div className="p-4 text-sm font-semibold text-blue-700">{leftLabel}</div>
            <div className="p-4 text-sm font-semibold text-slate-700">{rightLabel}</div>
          </div>

          {rows.map((r) => (
            <div key={r.feature} className="grid grid-cols-3 gap-0 border-b border-slate-200 last:border-b-0">
              <div className="p-4 text-sm text-slate-700">{r.feature}</div>
              <div className="p-4 text-sm font-semibold text-slate-900">{r.left}</div>
              <div className="p-4 text-sm text-slate-700">{r.right}</div>
            </div>
          ))}
        </div>

        <h3 className="mt-12 text-2xl font-extrabold text-slate-900 text-center">Frequently Asked Questions</h3>

        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a ?? "Answer coming soon. Contact support for details."} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
          <div className="text-2xl font-extrabold text-slate-900">{ctaTitle}</div>
          <p className="mt-2 text-sm text-slate-600">{ctaText}</p>
<CtaButton href={ctaHref}>Buy Now</CtaButton>
          <div className="mt-3 text-xs text-red-600 font-semibold">Limited offer — prices may change.</div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <span className="text-slate-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-sm leading-6 text-slate-600">{a}</div>}
    </div>
  );
}

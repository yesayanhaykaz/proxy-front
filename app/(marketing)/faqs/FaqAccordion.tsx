"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <Item key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <span className="text-slate-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-sm leading-6 text-slate-600">{a}</div>}
    </div>
  );
}

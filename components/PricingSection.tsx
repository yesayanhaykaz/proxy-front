'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiGetJson } from '@/lib/http';

export type ProxyPlan = {
  id: number;
  type: string;
  price: number;
  location?: string | null;
  valid_day?: number | null;
  traffic_gb?: number | null;
  ports?: number | null;
  status?: string;
};

const typeOrder = ['residential', 'mobile', 'datacenter', 'fast', 'mobile+', 'scrapers'];

export default function PricingSection() {
  const [plans, setPlans] = useState<ProxyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [days, setDays] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await apiGetJson<{ plans: ProxyPlan[]; filters: { locations: string[]; validDays: number[] } }>('/plans.php');
        if (!mounted) return;
        setPlans(data.plans || []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load plans');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const locations = Array.from(new Set(plans.map((p) => p.location).filter(Boolean) as string[])).sort();
    const validDays = Array.from(new Set(plans.map((p) => p.valid_day).filter((v): v is number => typeof v === 'number'))).sort((a, b) => a - b);
    const types = Array.from(new Set(plans.map((p) => (p.type || '').toLowerCase()))).sort((a, b) => {
      const ia = typeOrder.indexOf(a);
      const ib = typeOrder.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    return { locations, validDays, types };
  }, [plans]);

  const visible = useMemo(() => {
    return plans.filter((p) => {
      const t = (p.type || '').toLowerCase();
      if (type !== 'all' && t !== type) return false;
      if (location !== 'all' && (p.location || '') !== location) return false;
      if (days !== 'all' && String(p.valid_day ?? '') !== days) return false;
      return true;
    });
  }, [plans, type, location, days]);

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-56 rounded bg-slate-200" />
          <div className="h-10 w-full rounded bg-slate-200" />
          <div className="h-40 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="font-bold text-slate-900">Couldn’t load plans</div>
        <div className="text-sm text-slate-600 mt-1">{error}</div>
        <div className="text-xs text-slate-500 mt-4">
          Tip: create <code className="rounded bg-slate-100 px-1">/public/api/plans.php</code> in your PHP backend (I included it in the migration notes).
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
        <div>
          <div className="font-extrabold text-lg">Choose your plan</div>
          <div className="text-sm text-slate-600">Filter by proxy type, location, and validity.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm">
            <option value="all">All types</option>
            {filters.types.map((t) => (
              <option key={t} value={t}>{t.toUpperCase()}</option>
            ))}
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm">
            <option value="all">All locations</option>
            {filters.locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select value={days} onChange={(e) => setDays(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm">
            <option value="all">Any validity</option>
            {filters.validDays.map((d) => (
              <option key={d} value={String(d)}>{d} days</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <div key={p.id} className="card p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-500">{(p.type || '').toUpperCase()}</div>
                <div className="mt-1 text-3xl font-black text-brand-700">${Number(p.price).toFixed(2)}</div>
              </div>
              <div className="rounded-xl bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800 border border-brand-100">
                {(p.location || 'Global')}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-center justify-between"><span className="text-slate-500">Validity</span><span className="font-semibold">{p.valid_day ? `${p.valid_day} days` : '—'}</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Traffic</span><span className="font-semibold">{p.traffic_gb ? `${p.traffic_gb} GB` : '—'}</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Ports</span><span className="font-semibold">{p.ports ?? '—'}</span></li>
            </ul>

            <div className="mt-6 flex gap-2">
              <Link className="btn-primary flex-1" href={`/checkout/${p.id}`}>Checkout</Link>
              <Link className="btn-ghost" href={`/pricing#plan-${p.id}`}>Details</Link>
            </div>

            <div id={`plan-${p.id}`} className="sr-only" />
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card p-6 text-sm text-slate-600">No plans match these filters.</div>
      )}
    </div>
  );
}

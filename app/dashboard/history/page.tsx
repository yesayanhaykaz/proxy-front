export default function HistoryPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold text-slate-900">Transaction history</h1>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        This will show invoices, payments, refunds, and renewals.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-700">
        No transactions yet (DB not connected).
      </div>
    </div>
  );
}

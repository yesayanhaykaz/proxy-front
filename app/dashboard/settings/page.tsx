import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false }
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-950">Placeholder</h1>
      <p className="mt-2 text-sm text-slate-600">
        We will migrate the corresponding PHP dashboard screen here and keep session auth.
      </p>
    </div>
  );
}

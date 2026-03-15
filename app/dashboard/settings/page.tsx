import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Settings | Proxiesseller Dashboard",
  robots: { index: false, follow: false },
};

export default function Page() {

  const cookieStore = cookies();

  const email = decodeURIComponent(
    cookieStore.get("ps_email")?.value || "user"
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

      <h1 className="text-2xl font-extrabold text-slate-900">
        Account settings
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Manage your account preferences and dashboard settings.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="space-y-4">

          <div>
            <div className="text-sm font-bold text-slate-900">
              Account email
            </div>
            <div className="text-sm text-slate-600">
              {email}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-sm font-bold text-slate-900">
              Notifications
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked />
              Email me when a proxy plan is activated
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked />
              Send invoice emails
            </label>
          </div>

        </div>

      </div>

    </div>
  );
}
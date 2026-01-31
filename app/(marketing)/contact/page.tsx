export const metadata = {
  title: "Contact — ProxiesSeller",
  description: "Contact ProxiesSeller support and sales.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">Contact Us</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600">
          Need a custom plan or help with setup? Contact us and we’ll respond as soon as possible.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Info icon="fas fa-envelope" title="Email" text="support@proxiesseller.com" />
          <Info icon="fas fa-phone" title="Phone" text="+1 (800) 230-2493" />
          <Info icon="fas fa-location-dot" title="Address" text="11708 San Vicente Blvd. Los Angeles, CA 90049" />
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <div className="text-lg font-extrabold text-slate-900">Send a message</div>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" placeholder="Your name" />
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" placeholder="Your email" />
            <input className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" placeholder="Subject" />
            <textarea className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" placeholder="Message" rows={5} />
            <button type="button" className="sm:col-span-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
              Send Message
            </button>
          </form>
          <div className="mt-3 text-xs text-slate-500">
            (We’ll wire this to your real backend later.)
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="text-2xl text-blue-700"><i className={icon} /></div>
      <div className="mt-3 text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{text}</div>
    </div>
  );
}

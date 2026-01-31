const LAST_UPDATED = "November 2025";

export const metadata = {
  title: "Refund & Cancellation Policy — ProxiesSeller",
  description:
    "ProxiesSeller refund and cancellation policy. 14-day no-questions-asked refunds, Paddle refund processing, timelines, and cancellation terms.",
};

const sections = [
  { id: "refund", label: "1. 14-Day Refund" },
  { id: "cancellations", label: "2. Cancellations" },
  { id: "payments", label: "3. Payments & Refunds (Paddle)" },
  { id: "how-to", label: "4. How to Request a Refund" },
  { id: "questions", label: "5. Common Questions" },
  { id: "timelines", label: "Refund Timelines" },
  { id: "contact", label: "Contact" },
];

function Toc() {
  return (
    <nav className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        On this page
      </div>
      <ul className="mt-3 space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionTitle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-lg font-extrabold text-slate-900"
    >
      {children}
    </h2>
  );
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

export default function RefundsPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-slate-500">
              <a href="/" className="hover:text-slate-900">
                Home
              </a>{" "}
              <span className="mx-2">/</span>
              <span className="text-slate-700">
                Refund & Cancellation Policy
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900">
              Refund & Cancellation Policy
            </h1>

            <p className="text-sm text-slate-600">
              Policy updated: <span className="font-semibold">{LAST_UPDATED}</span>
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">
              We want you to feel confident using ProxiesSeller. If you’re not
              satisfied, you’re protected by a straightforward{" "}
              <strong>14-day refund policy</strong>. You can also cancel anytime
              from your dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                14-day refund
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                No questions asked
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Cancel anytime
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Paddle processing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sticky TOC */}
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-auto">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <Toc />

              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                This policy applies to purchases from ProxiesSeller via Paddle.
                For faster support, include your order/receipt number.
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="max-w-3xl space-y-10 text-sm leading-6 text-slate-700">
            {/* 1 */}
            <section className="space-y-3">
              <SectionTitle id="refund">1. 14-Day Refund</SectionTitle>
              <p>
                Full refund within <strong>14 days</strong> of purchase.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Full refund</strong> within 14 days
                </li>
                <li>
                  <strong>No questions asked</strong> — no usage limits or
                  conditions
                </li>
                <li>Issued to the original payment method</li>
              </ul>

              <Callout title="After 14 days">
                After 14 days, refunds are not guaranteed and may be declined at
                our discretion.
              </Callout>
            </section>

            {/* 2 */}
            <section className="space-y-3">
              <SectionTitle id="cancellations">2. Cancellations</SectionTitle>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Cancel anytime from your dashboard</li>
                <li>
                  Access continues until the end of the current billing period
                </li>
                <li>Cancellation stops future billing</li>
              </ul>
              <p className="mt-2">
                Cancelling does not automatically trigger a refund. If you want
                a refund, submit a request within the 14-day window.
              </p>
            </section>

            {/* 3 */}
            <section className="space-y-3">
              <SectionTitle id="payments">3. Payments & Refunds (Paddle)</SectionTitle>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  We use <strong>Paddle</strong> as our Merchant of Record
                </li>
                <li>
                  Refunds are processed by Paddle to the original payment method
                </li>
                <li>
                  Typical timing: <strong>3–10 business days</strong> (varies by
                  bank/provider)
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section className="space-y-4">
              <SectionTitle id="how-to">4. How to Request a Refund</SectionTitle>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">1</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Submit within 14 days
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Your refund request must be sent within 14 days of purchase.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">2</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Send order details
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Email <strong>support@proxiesseller.cc</strong> with your
                    order number, or request via your dashboard.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">3</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    Refund issued
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    We verify the order and submit the refund via Paddle. No
                    explanation required.
                  </p>
                </div>
              </div>

              <Callout title="Verification">
                We confirm the order details and submit the refund through
                Paddle. No explanation is required.
              </Callout>
            </section>

            {/* 5 */}
            <section className="space-y-3">
              <SectionTitle id="questions">5. Common Questions</SectionTitle>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Are there any exceptions or conditions?
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    No. Within 14 days you can request a full refund — no usage
                    limits and no conditions.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    How are refunds sent?
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Refunds are processed by Paddle and returned to your
                    original payment method.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Can I cancel without a refund?
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Yes. You can cancel anytime; access remains active until the
                    end of the current billing period.
                  </p>
                </div>
              </div>
            </section>

            {/* Timelines */}
            <section className="space-y-4">
              <SectionTitle id="timelines">Refund Timelines</SectionTitle>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Credit Card
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Cards (Visa/Mastercard/AmEx)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Typically <strong>3–10 business days</strong> depending on
                    your bank.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    PayPal
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    PayPal (if used)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Usually <strong>24–72 hours</strong> back to your PayPal
                    balance.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Other Methods
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Apple/Google Pay or local methods
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Timing varies by provider and issuing bank.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                This policy applies to purchases from ProxiesSeller via Paddle.
                If you have questions about your order, include your receipt or
                order number for faster assistance.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <SectionTitle id="contact">Contact</SectionTitle>
              <p>
                For refund requests or questions, contact support and include
                your order number for the fastest response:
              </p>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Support
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  support@proxiesseller.cc
                </div>
              </div>
            </section>

            <div className="pt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} ProxiesSeller. All rights reserved.
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

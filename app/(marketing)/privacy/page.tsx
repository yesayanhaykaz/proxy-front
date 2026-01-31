const LAST_UPDATED = "2025-10-27";

export const metadata = {
  title: "Privacy Policy — ProxiesSeller",
  description:
    "ProxiesSeller Privacy Policy: what we collect, how we use it, how we protect it, retention, GDPR rights, and international data transfers.",
};

const sections = [
  { id: "parties", label: "1. Parties" },
  { id: "acceptance", label: "2. Acceptance of the Policy" },
  { id: "legal-basis", label: "3. Legal Basis for Processing" },
  { id: "security", label: "4. Security" },
  { id: "data-we-collect", label: "5. Information We Collect" },
  { id: "no-logs", label: "6. No-Logs Policy" },
  { id: "how-we-use", label: "7. How We Use Your Information" },
  { id: "retention", label: "8. Storage & Retention" },
  { id: "transfers", label: "9. International Data Transfers" },
  { id: "rights", label: "10. Your Rights (GDPR)" },
  { id: "deletion", label: "11. Deleting Personal Information" },
  { id: "changes", label: "12. Changes to the Policy" },
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

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      {/* Top header */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-slate-500">
              <a href="/" className="hover:text-slate-900">
                Home
              </a>{" "}
              <span className="mx-2">/</span>
              <span className="text-slate-700">Privacy Policy</span>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-600">
              Last updated: <span className="font-semibold">{LAST_UPDATED}</span>
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">
              At <strong>ProxiesSeller</strong>, we take privacy seriously. This
              Privacy Policy explains how we collect, use, store, and protect
              information when you access our website and use our proxy services
              (the “Services”). If you do not agree with this Policy, please
              stop using the Services immediately.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                GDPR-ready
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                No-logs statement
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Security & retention
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                International transfers
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
                For related legal documents, see{" "}
                <a
                  href="/terms"
                  className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="/refund"
                  className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
                >
                  Refund Policy
                </a>
                .
              </div>
            </div>
          </aside>

          {/* Policy content */}
          <article className="max-w-3xl space-y-10 text-sm leading-6 text-slate-700">
            {/* 1 */}
            <section className="space-y-3">
              <SectionTitle id="parties">1. Parties</SectionTitle>
              <p>
                This Privacy Policy is provided by <strong>ProxiesSeller</strong>{" "}
                (“we”, “our”, or “us”). It describes how we collect, use,
                maintain, and disclose information from our customers, visitors
                to our websites, and, in some cases, visitors to our customers’
                websites (“Users”) when using our proxy services.
              </p>
              <p>
                For the purposes of the General Data Protection Regulation
                (GDPR), ProxiesSeller acts as a <strong>Data Controller</strong>{" "}
                for personal data processed in connection with the Services.
                Certain verification and monitoring functions (such as identity,
                email, or device verification) may be performed by trusted
                third-party processors under GDPR-compliant Data Processing
                Agreements (DPAs).
              </p>
            </section>

            {/* 2 */}
            <section className="space-y-3">
              <SectionTitle id="acceptance">2. Acceptance of the Policy</SectionTitle>
              <p>
                You accept this Privacy Policy by using our website (the “Site”),
                placing an order for Services, creating an account, or joining
                our email list.
              </p>
              <Callout title="Important">
                IF YOU DO NOT AGREE TO THE TERMS OF THIS PRIVACY POLICY, PLEASE
                STOP USING THE SERVICES IMMEDIATELY.
              </Callout>
            </section>

            {/* 3 */}
            <section className="space-y-3">
              <SectionTitle id="legal-basis">3. Legal Basis for Processing</SectionTitle>
              <p>
                The GDPR provides several legal bases that allow processing of
                personal data. We process data under one or more of the following:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Consent</strong> (Art. 6(1)(a) GDPR) where you have
                  given consent
                </li>
                <li>
                  <strong>Contract necessity</strong> (Art. 6(1)(b) GDPR) to
                  provide the Services and manage your account
                </li>
                <li>
                  <strong>Legal obligation</strong> (Art. 6(1)(c) GDPR) such as
                  compliance, tax, or regulatory duties
                </li>
                <li>
                  <strong>Legitimate interests</strong> (Art. 6(1)(f) GDPR) such
                  as securing the network, preventing fraud and abuse, improving
                  reliability, and enforcing our Terms, provided your rights do
                  not override those interests
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section className="space-y-3">
              <SectionTitle id="security">4. Security</SectionTitle>
              <p>
                We implement technical, physical, and administrative safeguards
                designed to protect personal information against loss and
                unauthorized access, use, or disclosure. Access to personal data
                is restricted to authorized staff and service providers who need
                it to perform their roles.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Encryption in transit (e.g., TLS where applicable)</li>
                <li>Encrypted storage for sensitive account data</li>
                <li>Role-based access control and least-privilege principles</li>
                <li>Infrastructure patching and vulnerability mitigation</li>
                <li>Audit and security monitoring for abuse prevention</li>
              </ul>
              <p className="mt-2">
                Passwords are stored in encrypted/hashed form following
                industry-standard practices.
              </p>
            </section>

            {/* 5 */}
            <section className="space-y-3">
              <SectionTitle id="data-we-collect">5. Information We Collect</SectionTitle>
              <p>
                We collect different categories of data depending on how you
                interact with the Services:
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Account & Billing Data
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>Email address and account credentials</li>
                    <li>Billing references, invoices, transaction IDs</li>
                    <li>Support messages and contact preferences</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Technical & Usage Data
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>IP address (for security and abuse prevention)</li>
                    <li>Device/browser identifiers and session data</li>
                    <li>Plan configuration and usage metrics (bandwidth, status)</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Payments
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>Payment tokens or invoice references</li>
                    <li>We do not store full card details</li>
                    <li>Payment processing is handled by third-party providers</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-extrabold text-slate-900">
                    Verification (If Required)
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>Identity and email verification results</li>
                    <li>Fraud-prevention and risk signals</li>
                    <li>
                      KYC/AML checks may be performed by trusted vendors when
                      necessary for compliance
                    </li>
                  </ul>
                </div>
              </div>

              <Callout title="No selling of personal data">
                We do not sell or lease personal data. We may share limited
                information with payment processors, infrastructure providers,
                and verification vendors strictly to provide, secure, and comply
                with legal obligations related to the Services.
              </Callout>
            </section>

            {/* 6 */}
            <section className="space-y-3">
              <SectionTitle id="no-logs">6. No-Logs Policy</SectionTitle>
              <p>
                We respect privacy and operate a strict no-logs approach for
                proxy traffic content. We do not intentionally collect, store,
                or monitor:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Browsing activity or visited websites</li>
                <li>Destination IP addresses or ports</li>
                <li>DNS requests or queries</li>
                <li>Content of internet traffic routed through our proxy servers</li>
              </ul>
              <p className="mt-2">
                We may process limited technical data necessary for security,
                fraud prevention, service delivery, and reliability (for example,
                detecting abusive patterns or enforcing rate limits).
              </p>
            </section>

            {/* 7 */}
            <section className="space-y-3">
              <SectionTitle id="how-we-use">7. How We Use Your Information</SectionTitle>
              <p>
                We use information to provide the Services and comply with legal
                requirements. This includes:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Creating and managing your account</li>
                <li>Delivering access to proxies and subscriptions</li>
                <li>Customer support and service communications</li>
                <li>Billing, receipts, invoices, and fraud prevention</li>
                <li>Service analytics to improve performance and reliability</li>
                <li>
                  Enforcing our Terms, preventing misuse, and protecting our
                  network and users
                </li>
                <li>
                  Compliance checks (including AML/CTF and sanctions screening)
                  if required by law or payment providers
                </li>
              </ul>
            </section>

            {/* 8 */}
            <section className="space-y-3">
              <SectionTitle id="retention">8. Storage & Retention</SectionTitle>
              <p>We store personal data:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  If processed based on <strong>consent</strong>, until consent is
                  withdrawn (where applicable)
                </li>
                <li>
                  If needed for <strong>contract performance</strong>, for as
                  long as the contractual relationship exists and as required by
                  legal retention periods
                </li>
                <li>
                  If processed based on <strong>legitimate interests</strong>,
                  for as long as necessary unless your deletion/anonymization
                  interests prevail
                </li>
                <li>
                  If required by <strong>law</strong> (e.g., tax or commercial
                  obligations), until those obligations expire
                </li>
              </ul>

              <Callout title="Compliance retention (KYC/verification)">
                If verification or compliance checks are required, related logs
                may be retained for up to five (5) years after the end of the
                business relationship, unless a longer period is required by
                applicable law. We aim to minimize data and retain only what is
                necessary for compliance and audit purposes.
              </Callout>
            </section>

            {/* 9 */}
            <section className="space-y-3">
              <SectionTitle id="transfers">9. International Data Transfers</SectionTitle>
              <p>
                Some service providers (such as cloud infrastructure or payment
                processors) may process data outside your country or outside the
                European Economic Area (EEA). Where required, we ensure
                appropriate safeguards are in place, such as adequacy decisions,
                Standard Contractual Clauses (SCCs), or other lawful transfer
                mechanisms.
              </p>
            </section>

            {/* 10 */}
            <section className="space-y-3">
              <SectionTitle id="rights">10. Your Rights (GDPR)</SectionTitle>
              <p>
                Depending on your location and applicable law (including GDPR),
                you may have the right to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Access your personal data and understand how it is processed</li>
                <li>Request correction of inaccurate data</li>
                <li>Request restriction of processing in certain cases</li>
                <li>
                  Request data portability for data you provided, processed by
                  automated means on the basis of consent or contract
                </li>
                <li>Object to processing based on legitimate interests</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>
                  Lodge a complaint with a data protection authority (we recommend
                  contacting us first to resolve issues quickly)
                </li>
              </ul>

              <Callout title="Response time">
                We aim to respond to valid requests within one (1) month as
                required by GDPR, unless a longer period is permitted by law.
              </Callout>
            </section>

            {/* 11 */}
            <section className="space-y-3">
              <SectionTitle id="deletion">11. Deleting Personal Information</SectionTitle>
              <p>
                You may request deletion of your personal information. We will
                attempt to accommodate such requests. However, we may retain
                certain information where retention is required by law (for
                example, compliance, tax, AML/CTF obligations) or where it is
                necessary to establish, exercise, or defend legal claims.
              </p>
            </section>

            {/* 12 */}
            <section className="space-y-3">
              <SectionTitle id="changes">12. Changes to the Policy</SectionTitle>
              <p>
                Material changes to this Policy will take effect no earlier than
                30 calendar days from the date we notify you by email and/or via
                your account dashboard. Non-material updates take effect upon
                publication on our website.
              </p>
              <p>
                You agree that we may communicate with you electronically for
                purposes of this Policy. If you do not agree to changes, we will
                maintain and use personal information previously collected in
                accordance with the Policy in force as of that date.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <SectionTitle id="contact">Contact</SectionTitle>
              <p>
                If you have questions about this Privacy Policy or our data
                handling, please contact us:
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

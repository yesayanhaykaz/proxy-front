import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Proxiesseller",
  description:
    "Proxiesseller Terms of Service covering billing via Paddle, acceptable use, subscriptions, refunds, compliance, and liability.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED_HUMAN = "November 6, 2025";

const sections = [
  { id: "general", label: "1. General Provisions" },
  { id: "definitions", label: "2. Definitions" },
  { id: "merchant", label: "3. Merchant of Record (Billing)" },
  { id: "eligibility", label: "4. Eligibility & Accounts" },
  { id: "service", label: "5. Nature of Service & Delivery" },
  { id: "acceptable", label: "6. Acceptable Use" },
  { id: "security", label: "7. Security, Monitoring & Abuse" },
  { id: "plans", label: "8. Plans, Subscriptions & Taxes" },
  { id: "availability", label: "9. Availability & Maintenance" },
  { id: "refunds", label: "10. Refunds & Cancellations" },
  { id: "ip", label: "11. Intellectual Property" },
  { id: "privacy", label: "12. Privacy & Data" },
  { id: "sanctions", label: "13. Export Controls & Sanctions" },
  { id: "disclaimers", label: "14. Disclaimers" },
  { id: "liability", label: "15. Limitation of Liability" },
  { id: "changes", label: "16. Changes to Terms or Services" },
  { id: "law", label: "17. Governing Law & Disputes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="These Terms govern your access to and use of the Proxiesseller services. Please read carefully."
      lastUpdatedHuman={LAST_UPDATED_HUMAN}
      sections={sections}
    >
      <h2 id="general">1. General Provisions</h2>
      <p>
        These Terms of Service (“Terms”) govern your access to and use of the proxy services and related functionality
        offered at <strong>https://proxiesseller.cc</strong> (the “Site”) by <strong>Proxiesseller LLC</strong>,
        registered at <strong>11708 San Vicente Blvd. Los Angeles, CA 90049</strong> (“Proxiesseller”, “we”, “us”, “our”).
        By accessing the Site or using any paid or free plan (the “Services”), you agree to these Terms and any policies
        referenced in them, including our Privacy Policy and Refund Policy.
      </p>
      <p>
        If you are using the Services on behalf of a company or organization, you represent that you have authority to bind
        that entity, and “you” refers to that entity.
      </p>

      <h2 id="definitions">2. Definitions</h2>
      <ul>
        <li><strong>Account</strong> means your Proxiesseller account and dashboard access.</li>
        <li><strong>Plan</strong> means a subscription or prepaid package shown on the Site or dashboard.</li>
        <li><strong>Proxy</strong> means a proxy endpoint (Residential, Mobile, Datacenter, or Fast SOCKS5) provided under a Plan.</li>
        <li><strong>Traffic/Usage</strong> means bandwidth, requests, ports, rotation, or other metered usage depending on Plan.</li>
        <li><strong>Merchant of Record</strong> means the entity that processes payment, invoices, and taxes for your purchase.</li>
      </ul>

      <h2 id="merchant">3. Who bills you (Merchant of Record)</h2>
      <p>
        We use Paddle (Paddle.com Inc. / Paddle Payments Limited) as our Merchant of Record for all purchases. Paddle provides
        checkout, billing, invoicing, tax calculation, and processes refunds to the original payment method. Your payment is
        made to Paddle and may appear on your statement as <strong>“PADDLE* PROXIESSELLER”</strong>.
      </p>

      <h2 id="eligibility">4. Eligibility & Accounts</h2>
      <ul>
        <li>You must be at least 18 years old (or the age of majority in your jurisdiction).</li>
        <li>You are responsible for all activity under your Account, including actions by your team members.</li>
        <li>You must provide accurate information and keep it up to date.</li>
        <li>You must keep your credentials secure and notify us promptly of suspected compromise.</li>
      </ul>

      <h2 id="service">5. Nature of Service & Delivery</h2>
      <p>
        The Services are digital and delivered by providing access to our dashboard and proxy connection credentials (such as
        host, port, username/password, or approved authentication method) depending on your Plan.
      </p>
      <p>
        <strong>Service delivery</strong> is deemed complete when access credentials become available in your dashboard or are
        otherwise provided to you, regardless of the amount of subsequent use.
      </p>

      <h2 id="acceptable">6. Acceptable Use</h2>
      <p>
        You agree to use the Services only for lawful purposes and in compliance with applicable laws and third-party terms.
        The following activities are strictly prohibited:
      </p>
      <ul>
        <li>Spam, phishing, email abuse, or unsolicited messaging;</li>
        <li>Credential stuffing, hacking, DDoS, malware distribution, or unauthorized access attempts;</li>
        <li>Illegal content distribution or activities that infringe IP or privacy rights;</li>
        <li>Use that violates sanctions, export controls, or other applicable laws;</li>
        <li>Attempts to evade platform security controls or to target critical infrastructure.</li>
      </ul>
      <p>
        <strong>Enforcement:</strong> We may suspend or terminate accounts for violations, and we may block destinations or traffic
        patterns that create risk to our network or third parties.
      </p>

      <h2 id="security">7. Security, Monitoring & Abuse</h2>
      <p>
        We may monitor and log operational data necessary to maintain service quality, prevent abuse, and protect our network
        and customers. This may include connection metadata, usage totals, error events, and abuse signals.
      </p>
      <p>
        If we detect suspicious or abusive activity, we may throttle, restrict, suspend, or terminate access. Where feasible,
        we will provide notice and allow a reasonable time to cure, except where immediate action is required for security or law.
      </p>

      <h2 id="plans">8. Plans, Subscriptions & Taxes</h2>
      <ul>
        <li>Plans are billed in advance via Paddle at the beginning of each billing term (monthly or as stated at checkout).</li>
        <li>Applicable taxes (e.g., VAT/GST) are calculated and collected by Paddle based on your location and local law.</li>
        <li>You can manage or cancel your subscription from your dashboard; access continues until the end of the paid period.</li>
      </ul>

      <h2 id="availability">9. Availability & Maintenance</h2>
      <p>
        We strive for high availability but do not guarantee uninterrupted operation. We may perform maintenance, upgrades, or
        emergency mitigations that may temporarily affect availability. We will make reasonable efforts to minimize downtime.
      </p>

      <h2 id="refunds">10. Refunds & Cancellations</h2>
      <p>
        <strong>14-Day Refund.</strong> If you are not satisfied for any reason, you may request a full refund within 14 days
        of purchase. No questions asked. No usage limits or other conditions apply.
      </p>
      <ul>
        <li><strong>How to request:</strong> email <strong>support@proxiesseller.cc</strong> or use your dashboard within 14 days.</li>
        <li><strong>Refund method:</strong> refunds are processed by Paddle and returned to the original payment method.</li>
        <li><strong>Timing:</strong> processing times vary by provider (typically 3–10 business days).</li>
      </ul>
      <p>
        <strong>After 14 days:</strong> refunds are not provided except where required by law. You may cancel any time, and access
        will continue until the end of the current billing period.
      </p>
      <p>
        <strong>Chargebacks:</strong> Please contact us first so we can resolve billing issues through Paddle. Filing a chargeback
        without contacting us may delay resolution.
      </p>

      <h2 id="ip">11. Intellectual Property</h2>
      <p>
        The Services, Site, and associated software and content are owned by Proxiesseller or its licensors and are protected by
        intellectual property laws. You receive a limited, non-exclusive, non-transferable right to access and use the Services
        during your subscription term.
      </p>

      <h2 id="privacy">12. Privacy & Data</h2>
      <p>
        Our collection and use of personal data is described in our Privacy Policy. By using the Services, you consent to our
        processing of data as outlined there and to Paddle’s processing for billing and tax compliance.
      </p>

      <h2 id="sanctions">13. Export Controls & Sanctions</h2>
      <p>
        You represent that you are not located in, under the control of, or a national or resident of any sanctioned jurisdiction,
        and that you are not on any restricted party list. You agree to comply with applicable export control and sanctions laws.
      </p>

      <h2 id="disclaimers">14. Disclaimers</h2>
      <p>
        The Services are provided “as is” and “as available.” We disclaim all warranties to the maximum extent permitted by law,
        including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2 id="liability">15. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, our total liability for claims relating to the Services will not exceed the amounts
        paid by you for the Services in the three (3) months preceding the event giving rise to the claim.
      </p>

      <h2 id="changes">16. Changes to the Services or Terms</h2>
      <p>
        We may update these Terms from time to time. We will post the updated Terms with a new “Last updated” date. Your continued
        use of the Services after changes become effective constitutes acceptance of the updated Terms.
      </p>

      <h2 id="law">17. Governing Law & Disputes</h2>
      <p>
        These Terms are governed by the laws of USA, without regard to conflict-of-law rules. Courts located in Los Angeles shall
        have exclusive jurisdiction, unless mandatory consumer protection laws in your country provide otherwise.
      </p>

      <h2 id="contact">Contact</h2>
      <p><strong>Legal entity:</strong> Proxiesseller LLC</p>
      <p><strong>Registered address:</strong> 11708 San Vicente Blvd. Los Angeles, CA 90049</p>
      <p><strong>Email:</strong> support@proxiesseller.cc</p>
    </LegalLayout>
  );
}

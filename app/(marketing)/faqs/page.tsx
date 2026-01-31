import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "FAQs — ProxiesSeller",
  description: "Frequently asked questions about our proxy plans, rotation, targeting and setup.",
};

const FAQS = [
  { q: "What proxy types do you offer?", a: "Residential, Mobile, Datacenter and Fast proxies. Each type fits different tasks like scraping, automation, and ad verification." },
  { q: "What authentication methods do you support?", a: "Typically username/password and IP whitelisting. Options depend on plan type." },
  { q: "Do you support rotation?", a: "Yes — rotating and sticky sessions depending on the plan." },
  { q: "How fast is setup after payment?", a: "Usually instant. You’ll see connection details in your dashboard." },
  { q: "Can I target specific countries or cities?", a: "Residential/Mobile can support fine-grained targeting depending on availability." },
];

export default function FAQsPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600">
          Quick answers about proxy types, targeting, rotation and usage.
        </p>

        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </main>
  );
}

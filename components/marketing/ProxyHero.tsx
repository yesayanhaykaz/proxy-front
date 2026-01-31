import Link from "next/link";

export function ProxyHero(props: {
  title: string;
  subtitle: string;
  badge?: string;
  primaryHref: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
}) {
  const {
    title,
    subtitle,
    badge = "LIMITED OFFER",
    primaryHref,
    primaryText = "Buy Now",
    secondaryHref = "/pricing",
    secondaryText = "View Pricing",
  } = props;

  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 w-fit rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-extrabold text-red-700">
          {badge}
        </div>

        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-300">{subtitle}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {primaryText}
          </Link>

          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}

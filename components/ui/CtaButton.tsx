import Link from "next/link";

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
  const primary = "rounded-2xl bg-indigo-600 px-6 py-3 text-sm text-white hover:bg-indigo-500";
  const secondary =
    "rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10";

  return (
    <Link href={href} className={`${base} ${variant === "primary" ? primary : secondary} ${className}`}>
      {children}
    </Link>
  );
}

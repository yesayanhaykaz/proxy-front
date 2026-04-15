export function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSiteOrigin() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";

  if (explicit) return trimTrailingSlash(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export function getBackendBase() {
  const base =
    process.env.API_BASE ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "http://localhost:8081/api";

  if (base.startsWith("http://") || base.startsWith("https://")) {
    return trimTrailingSlash(base);
  }

  return `${getSiteOrigin()}${base.startsWith("/") ? base : `/${base}`}`;
}

export function getBrowserApiBase() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "/api";
  return trimTrailingSlash(base.startsWith("/") ? base : `/${base}`);
}

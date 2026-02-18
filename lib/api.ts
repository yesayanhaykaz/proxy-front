export type ProxyPlan = {
  id: number;
  type: string;
  price: number;
  location?: string | null;
  valid_day?: number | null;
  traffic?: string | null;
  status?: string;
  [key: string]: unknown;
};

function getSiteOrigin() {
  // Prefer an explicit site URL (best for production)
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "";

  if (explicit) return explicit.replace(/\/+$/, "");

  // Vercel provides VERCEL_URL without protocol
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // Local dev fallback
  return "http://localhost:3000";
}

function apiBase() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "/api";

  // If user provided full URL like https://domain.com/api
  if (base.startsWith("http://") || base.startsWith("https://")) {
    return base.replace(/\/+$/, "");
  }

  // Browser can use relative URL
  if (typeof window !== "undefined") {
    return base.startsWith("/") ? base : `/${base}`;
  }

  // Server must use absolute URL
  const origin = getSiteOrigin();
  const normalized = base.startsWith("/") ? base : `/${base}`;
  return `${origin}${normalized}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const p = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`${apiBase()}${p}`, {
    credentials: "include",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<T>;
}


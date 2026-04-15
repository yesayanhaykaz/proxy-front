import {
  getBrowserApiBase,
  getSiteOrigin as getDefaultSiteOrigin,
} from "@/lib/env";

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
  return getDefaultSiteOrigin();
}

function apiBase() {
  const base = getBrowserApiBase();

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

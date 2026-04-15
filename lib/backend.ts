import { getBackendBase } from "@/lib/env";

export function backendBase() {
  return getBackendBase();
}

export async function backendGetJson<T>(path: string): Promise<T> {
  const url = `${backendBase()}${path.startsWith("/") ? "" : "/"}${path}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`Backend ${r.status} for ${url}`);
  return (await r.json()) as T;
}

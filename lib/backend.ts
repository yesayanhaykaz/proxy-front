export function backendBase() {
  const base = process.env.API_BASE || "http://localhost:8081/api";
  return base.replace(/\/$/, "");
}

export async function backendGetJson<T>(path: string): Promise<T> {
  const url = `${backendBase()}${path.startsWith("/") ? "" : "/"}${path}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`Backend ${r.status} for ${url}`);
  return (await r.json()) as T;
}

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

export async function apiGetJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

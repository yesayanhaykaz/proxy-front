import { getBackendBase } from "@/lib/env";

export type Purchase = {
  purchase_id: string;
  package_name: string;
  category: string;
  status: "active" | "expired";
  created_at: string;
  price_cents?: number;
  proxy_username?: string;
  proxy_password?: string;
  host?: string;
  port?: number;
  protocol?: string;
};

export async function getPurchases(userId: string): Promise<Purchase[]> {
  if (!userId) return [];

  const res = await fetch(`${getBackendBase()}/purchases`, {
    headers: { "X-User-Id": userId },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json().catch(() => ({}));
  return Array.isArray(data.purchases) ? data.purchases : [];
}

export async function getPurchaseById(userId: string, purchaseId: string) {
  const purchases = await getPurchases(userId);
  return purchases.find((purchase) => purchase.purchase_id === purchaseId) ?? null;
}

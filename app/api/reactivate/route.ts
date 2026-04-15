import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getBackendBase } from "@/lib/env";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const userId = cookieStore.get("ps_uid")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { purchase_id } = body;

  if (!purchase_id) {
    return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
  }

  // Call your backend reactivation endpoint.
  // Adjust the URL and payload shape to match your API.
  const res = await fetch(`${getBackendBase()}/reactivate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({ purchase_id }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: data.message || data.error || "Reactivation failed" },
      { status: res.status }
    );
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json({ success: true, ...data });
}

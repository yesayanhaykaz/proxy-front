import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const c = cookies();
  const session = c.get("ps_session")?.value || null;
  return NextResponse.json({ session });
}

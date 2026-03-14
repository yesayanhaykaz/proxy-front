import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let form: FormData | null = null;

    try {
      form = await req.formData();
    } catch {
      form = null;
    }

    const data = form
      ? Object.fromEntries(form.entries())
      : {};

    console.log("Checkout request:", data);

    return NextResponse.json({
      ok: true,
      received: data
    });

  } catch (err) {
    console.error("Checkout error:", err);

    return NextResponse.json(
      { error: "checkout failed" },
      { status: 500 }
    );
  }
}

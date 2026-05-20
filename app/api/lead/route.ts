import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validations";

export const runtime = "nodejs";

/**
 * POST /api/lead
 * Validates the inbound payload, enriches with server-side metadata, and
 * forwards to the Go High Level workflow webhook.
 *
 * Required env: GHL_WEBHOOK_URL
 * Optional env: GHL_WEBHOOK_SECRET (sent as x-buildra-secret header)
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_failed",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    // Don't fail the user-facing flow if the webhook isn't configured yet.
    // Log so the operator notices, and return 200 so the form still shows the
    // success state in development.
    console.warn("[buildra/lead] GHL_WEBHOOK_URL not set — skipping forward");
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";

  const payload = {
    name: data.name,
    email: data.email,
    phone: `${data.countryCode}${data.phone.replace(/\D/g, "")}`,
    projectType: data.projectType,
    location: data.location,
    budget: data.budget,
    timing: data.timing,
    message: data.message,
    lang: data.lang,
    source: "buildra-landing",
    submittedAt: new Date().toISOString(),
    utm: data.utm ?? {},
    page: data.page ?? "",
    userAgent: data.userAgent ?? req.headers.get("user-agent") ?? "",
    ip,
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.GHL_WEBHOOK_SECRET
          ? { "x-buildra-secret": process.env.GHL_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      // Don't hang the user — GHL webhooks normally respond fast.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[buildra/lead] webhook returned", res.status, text);
      return NextResponse.json(
        { ok: false, error: "webhook_failed" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[buildra/lead] webhook fetch error", err);
    return NextResponse.json(
      { ok: false, error: "webhook_unreachable" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

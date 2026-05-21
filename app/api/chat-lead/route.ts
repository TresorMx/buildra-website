import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

/**
 * POST /api/chat-lead
 * Captura simplificada de lead desde el widget de Daniela.
 * Envía al mismo GHL_WEBHOOK_URL con valores por defecto para campos del form principal.
 */

const chatLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  message: z.string().max(1000).optional().default(""),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = chatLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", details: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[buildra/chat-lead] GHL_WEBHOOK_URL not set — skipping");
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";

  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    projectType: "no-seguro",
    location: "otro",
    budget: "hablemos",
    timing: "explorando",
    message: data.message || "Lead capturado desde el chat con Daniela.",
    lang: "es",
    source: "buildra-chat-daniela",
    submittedAt: new Date().toISOString(),
    utm: {},
    page: req.headers.get("referer") ?? "",
    userAgent: req.headers.get("user-agent") ?? "",
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
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[buildra/chat-lead] webhook returned", res.status, text);
      return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[buildra/chat-lead] webhook error", err);
    return NextResponse.json({ ok: false, error: "webhook_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

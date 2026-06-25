import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmails } from "@/lib/email";

// Simple in-memory IP rate limit (per serverless instance).
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count++;
  return entry.count > max;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Covers invalid fields AND filled honeypot (spam) — generic message, no leak.
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  try {
    await sendContactEmails(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send. Please email me directly." },
      { status: 500 },
    );
  }
}

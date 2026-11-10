import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { normalizeEmails, verifyOutreachToken } from "@/lib/outreach";

export const runtime = "nodejs";

/** The confirm button on /unsubscribe/outreach posts here. */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const e = String(form.get("e") ?? "");
  const p = String(form.get("p") ?? "");
  const t = String(form.get("t") ?? "");
  const emails = normalizeEmails(e);

  if (emails.length === 0 || !verifyOutreachToken(emails, p, t)) {
    return NextResponse.redirect(new URL("/unsubscribed?ok=0", req.url), 303);
  }

  try {
    await ensureSchema();
    const db = sql();
    const practice = p.slice(0, 200) || null;
    for (const email of emails) {
      await db`
        INSERT INTO outreach_unsubscribes (email, practice, source)
        VALUES (${email}, ${practice}, 'link')
        ON CONFLICT (email) DO NOTHING
      `;
    }
  } catch (err) {
    console.error("[outreach-unsubscribe] failed to save", err);
    return NextResponse.redirect(new URL("/unsubscribed?ok=0", req.url), 303);
  }

  return NextResponse.redirect(new URL("/unsubscribed?ok=1", req.url), 303);
}

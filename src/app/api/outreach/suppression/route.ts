import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { isOutreachBearer, normalizeEmails } from "@/lib/outreach";

export const runtime = "nodejs";

/**
 * Read and add to the outreach opt-out list. Called only by the outreach
 * Apps Script, with OUTREACH_SECRET as a bearer token.
 * GET returns every opted-out address. POST adds addresses the script
 * found as "unsubscribe" replies in the Gmail inbox.
 */
export async function GET(req: NextRequest) {
  if (!isOutreachBearer(req.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  await ensureSchema();
  const db = sql();
  const rows = await db`SELECT email FROM outreach_unsubscribes ORDER BY email`;
  return NextResponse.json({ ok: true, emails: rows.map((r) => String(r.email)) });
}

type Entry = { email?: unknown; practice?: unknown };

export async function POST(req: NextRequest) {
  if (!isOutreachBearer(req.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  let body: { entries?: Entry[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON." }, { status: 400 });
  }
  const entries = Array.isArray(body.entries) ? body.entries.slice(0, 1000) : [];
  await ensureSchema();
  const db = sql();
  let added = 0;
  for (const entry of entries) {
    const [email] = normalizeEmails(String(entry.email ?? ""));
    if (!email) continue;
    const practice = entry.practice ? String(entry.practice).slice(0, 200) : null;
    const result = await db`
      INSERT INTO outreach_unsubscribes (email, practice, source)
      VALUES (${email}, ${practice}, 'email reply')
      ON CONFLICT (email) DO NOTHING
      RETURNING email
    `;
    added += result.length;
  }
  return NextResponse.json({ ok: true, added });
}

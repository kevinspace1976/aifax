import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Removes visit rows from the Traffic page: one page view (`id`), every
 * page view from one browser (`session_id`), or everything (`all`).
 * Gated by the /api/admin proxy check; plain form post, 303 back.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const id = Number(form?.get("id"));
  const sessionId = form?.get("session_id");
  const all = form?.get("all") === "1";

  await ensureSchema();
  const db = sql();
  if (Number.isInteger(id) && id > 0) {
    await db`DELETE FROM visits WHERE id = ${id}`;
  } else if (typeof sessionId === "string" && sessionId) {
    await db`DELETE FROM visits WHERE session_id = ${sessionId}`;
  } else if (all) {
    await db`DELETE FROM visits`;
  }
  return NextResponse.redirect(new URL("/admin/traffic", req.url), 303);
}

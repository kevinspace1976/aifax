import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Deletes one or more leads (form field `id`, repeated for a multi-select).
 * Their emails, opens, and activity go with them via ON DELETE CASCADE.
 * Gated by the /api/admin proxy check; plain form post, 303 back to /admin.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const ids = (form?.getAll("id") ?? [])
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0);

  if (ids.length > 0) {
    await ensureSchema();
    const db = sql();
    await db`DELETE FROM leads WHERE id = ANY(${ids}::bigint[])`;
  }
  return NextResponse.redirect(new URL("/admin", req.url), 303);
}

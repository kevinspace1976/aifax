import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get("lead");
  const token = req.nextUrl.searchParams.get("token");

  if (!leadId || !token || !verifyUnsubscribeToken(leadId, token)) {
    return NextResponse.redirect(new URL("/unsubscribed?ok=0", req.url));
  }

  try {
    await ensureSchema();
    const db = sql();
    await db`UPDATE leads SET unsubscribed = TRUE, next_email_due_at = NULL WHERE id = ${Number(leadId)}`;
  } catch (err) {
    console.error("[unsubscribe] failed to update lead", err);
    return NextResponse.redirect(new URL("/unsubscribed?ok=0", req.url));
  }

  return NextResponse.redirect(new URL("/unsubscribed?ok=1", req.url));
}

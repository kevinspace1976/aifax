import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

export const STATUS_OPTIONS = [
  "new",
  "contacted",
  "qualifying",
  "ehr_vendor_pending",
  "proposal_sent",
  "won",
  "lost"
] as const;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId)) {
    return NextResponse.json({ ok: false, error: "Invalid lead id." }, { status: 400 });
  }

  const form = await req.formData();
  const status = form.get("status");
  const nurturePaused = form.get("nurturePaused");

  await ensureSchema();
  const db = sql();

  if (status !== null) {
    if (!STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number])) {
      return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
    }
    await db`UPDATE leads SET status = ${status} WHERE id = ${leadId}`;
  }
  if (nurturePaused !== null) {
    await db`UPDATE leads SET nurture_paused = ${nurturePaused === "true"} WHERE id = ${leadId}`;
  }

  return NextResponse.redirect(new URL(`/admin/leads/${leadId}`, req.url), 303);
}

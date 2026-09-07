import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

const MANUAL_TYPES = ["note", "call", "vendor_contact"] as const;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId)) {
    return NextResponse.json({ ok: false, error: "Invalid lead id." }, { status: 400 });
  }

  const form = await req.formData();
  const type = String(form.get("type") || "");
  const activityBody = String(form.get("body") || "").trim();
  const ticketNumber = String(form.get("ticketNumber") || "").trim();
  const followUpAt = String(form.get("followUpAt") || "").trim();

  if (!MANUAL_TYPES.includes(type as (typeof MANUAL_TYPES)[number])) {
    return NextResponse.json({ ok: false, error: "Invalid activity type." }, { status: 400 });
  }
  if (!activityBody) {
    return NextResponse.json({ ok: false, error: "Activity body is required." }, { status: 400 });
  }

  await ensureSchema();
  const db = sql();
  await db`
    INSERT INTO lead_activities (lead_id, type, body, ticket_number, follow_up_at)
    VALUES (
      ${leadId}, ${type}, ${activityBody}, ${ticketNumber || null},
      ${followUpAt ? new Date(followUpAt).toISOString() : null}
    )
  `;

  return NextResponse.redirect(new URL(`/admin/leads/${leadId}`, req.url), 303);
}

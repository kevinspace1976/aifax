import { NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

function csvCell(value: unknown) {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  await ensureSchema();
  const db = sql();
  const rows = await db`
    SELECT created_at, name, email, phone, practice_name, ehr_platform, fax_provider,
           monthly_volume, utm_source, utm_medium, utm_campaign, fbclid, referrer,
           sequence_step, unsubscribed, notes
    FROM leads
    ORDER BY created_at DESC
  `;

  const header = [
    "created_at", "name", "email", "phone", "practice_name", "ehr_platform", "fax_provider",
    "monthly_volume", "utm_source", "utm_medium", "utm_campaign", "fbclid", "referrer",
    "sequence_step", "unsubscribed", "notes"
  ];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(header.map((key) => csvCell((row as Record<string, unknown>)[key])).join(","));
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="aifax-leads-${new Date().toISOString().slice(0, 10)}.csv"`
    }
  });
}

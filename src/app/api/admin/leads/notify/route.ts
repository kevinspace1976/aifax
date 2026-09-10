import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, rows, sql } from "@/lib/db";
import { notifyAdmin } from "@/lib/notify";

export const runtime = "nodejs";

type LeadRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  practice_name: string | null;
  ehr_platform: string | null;
  fax_provider: string | null;
  fax_number: string | null;
  monthly_volume: string | null;
  call_window: string | null;
  notes: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  fbclid: string | null;
  referrer: string | null;
  last_email_sent_at: string | null;
  created_at: string;
};

const TZ = "America/New_York";

function esc(v: string | null) {
  return (v ?? "-").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function when(iso: string) {
  return new Date(iso).toLocaleString("en-US", { timeZone: TZ, month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function source(l: LeadRow) {
  const base = l.utm_source || (l.fbclid ? "facebook (ad click)" : l.referrer || "direct");
  return l.utm_campaign ? `${base} / ${l.utm_campaign}` : base;
}

/**
 * Emails the owner every lead submitted in the last N hours, one message,
 * so anything missed while alerts were misrouted can be caught up. Plain
 * form post from /admin; gated by the /api/admin proxy check.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const hours = Math.min(Math.max(Number(form?.get("hours")) || 24, 1), 24 * 30);

  await ensureSchema();
  const db = sql();
  const leads = await rows<LeadRow>(db`
    SELECT id, name, email, phone, practice_name, ehr_platform, fax_provider, fax_number, monthly_volume,
           call_window, notes, utm_source, utm_campaign, fbclid, referrer, last_email_sent_at, created_at
    FROM leads
    WHERE created_at > now() - (${hours} * interval '1 hour')
    ORDER BY created_at DESC
  `);

  const back = new URL("/admin", req.url);
  back.searchParams.set("notified", String(leads.length));
  back.searchParams.set("hours", String(hours));

  if (leads.length === 0) {
    back.searchParams.set("sent", "none");
    return NextResponse.redirect(back, 303);
  }

  const subject = `${leads.length} lead${leads.length === 1 ? "" : "s"} from the last ${hours} hours`;
  const html = `
    <h2>${subject}</h2>
    ${leads
      .map(
        (l) => `
      <div style="border-top:1px solid #ddd;padding:10px 0">
        <p style="margin:0 0 6px"><strong>${esc(l.name)}</strong> (${esc(l.email)})${l.practice_name ? ` - ${esc(l.practice_name)}` : ""}<br />
        <span style="color:#666">${when(l.created_at)} Eastern, source: ${esc(source(l))}</span></p>
        <table cellpadding="3" style="font-size:14px">
          <tr><td>Phone</td><td>${esc(l.phone)}</td></tr>
          <tr><td>EHR platform</td><td>${esc(l.ehr_platform)}</td></tr>
          <tr><td>Current fax provider</td><td>${esc(l.fax_provider)}</td></tr>
          <tr><td>Current fax number</td><td>${esc(l.fax_number)}</td></tr>
          <tr><td>Monthly volume</td><td>${esc(l.monthly_volume)}</td></tr>
          <tr><td>Preferred contact</td><td>${esc(l.call_window)}</td></tr>
          <tr><td>Confirmation email to them</td><td>${l.last_email_sent_at ? "sent" : "not sent"}</td></tr>
        </table>
        <p style="margin:6px 0 0"><strong>What they want to solve:</strong><br />${esc(l.notes).replace(/\n/g, "<br />")}</p>
        <p style="margin:6px 0 0"><a href="https://www.aifax.net/admin/leads/${l.id}">Open in admin</a></p>
      </div>`
      )
      .join("")}
  `;
  const text = leads
    .map(
      (l) =>
        `${l.name} (${l.email})${l.practice_name ? ` - ${l.practice_name}` : ""}\n${when(l.created_at)} Eastern, source: ${source(l)}\n` +
        `Phone: ${l.phone || "-"}\nEHR: ${l.ehr_platform || "-"}\nCurrent fax provider: ${l.fax_provider || "-"}\n` +
        `Current fax number: ${l.fax_number || "-"}\nMonthly volume: ${l.monthly_volume || "-"}\nPreferred contact: ${l.call_window || "-"}\n` +
        `Confirmation email to them: ${l.last_email_sent_at ? "sent" : "not sent"}\nWhat they want to solve: ${l.notes || "-"}\n` +
        `https://www.aifax.net/admin/leads/${l.id}`
    )
    .join("\n\n----\n\n");

  const result = await notifyAdmin({ subject, html: `${html}`, text: `${subject}\n\n${text}` });
  back.searchParams.set("sent", result.sent ? result.via : "failed");
  return NextResponse.redirect(back, 303);
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteForm } from "@/components/delete-form";
import { ensureSchema, rows, sql } from "@/lib/db";
import { STATUS_OPTIONS } from "./status/route";

export const dynamic = "force-dynamic";

type Lead = {
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
  status: string;
  nurture_paused: boolean;
  sequence_step: number;
  unsubscribed: boolean;
  created_at: string;
};
type Activity = {
  id: number;
  type: string;
  subject: string | null;
  body: string | null;
  ticket_number: string | null;
  follow_up_at: string | null;
  occurred_at: string;
};
type EmailStats = { opens: number; clicks: number };

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualifying: "Qualifying",
  ehr_vendor_pending: "EHR Vendor Pending",
  proposal_sent: "Proposal Sent",
  won: "Won",
  lost: "Lost"
};

const TYPE_LABELS: Record<string, string> = {
  note: "Note",
  call: "Call",
  vendor_contact: "Vendor Contact",
  email_inbound: "Email (from lead)",
  email_outbound: "Email (sent)",
  status_change: "Status change"
};

const FIELD =
  "mt-1 w-full rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm text-white " +
  "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300";
const LABEL = "block text-xs font-medium uppercase tracking-wide text-slate-400";

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleString() : "-";
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId)) notFound();

  await ensureSchema();
  const db = sql();

  const [leadRows, activities, emailStatsRows] = await Promise.all([
    rows<Lead>(db`SELECT * FROM leads WHERE id = ${leadId}`),
    rows<Activity>(db`
      SELECT id, type, subject, body, ticket_number, follow_up_at, occurred_at
      FROM lead_activities
      WHERE lead_id = ${leadId}
      ORDER BY occurred_at DESC
    `),
    rows<EmailStats>(db`
      SELECT COUNT(*) FILTER (WHERE event_type = 'email.opened')::int AS opens,
             COUNT(*) FILTER (WHERE event_type = 'email.clicked')::int AS clicks
      FROM email_events
      WHERE lead_id = ${leadId}
    `)
  ]);

  const lead = leadRows[0];
  if (!lead) notFound();
  const emailStats = emailStatsRows[0] || { opens: 0, clicks: 0 };

  return (
    <main className="section-shell py-10">
      <Link href="/admin" className="text-sm text-cyan-300 underline-offset-4 hover:underline">
        &larr; Back to admin
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">{lead.name}</h1>
          <p className="text-sm text-slate-300">
            {lead.practice_name || "No practice name"} &middot;{" "}
            <a href={`mailto:${lead.email}`} className="text-cyan-300 underline-offset-4 hover:underline">
              {lead.email}
            </a>
            {lead.phone ? ` · ${lead.phone}` : ""}
          </p>
          <p className="mt-1 text-xs text-slate-400">Lead since {fmt(lead.created_at)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form action={`/admin/leads/${lead.id}/status`} method="post" className="flex items-center gap-2">
            <select name="status" defaultValue={lead.status} className={FIELD}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary px-3 py-2 text-sm">
              Update
            </button>
          </form>

          <form action={`/admin/leads/${lead.id}/status`} method="post">
            <input type="hidden" name="nurturePaused" value={lead.nurture_paused ? "false" : "true"} />
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:border-white/40"
            >
              {lead.nurture_paused ? "Resume nurture emails" : "Pause nurture emails"}
            </button>
          </form>

          <DeleteForm
            action="/api/admin/leads/delete"
            fields={{ id: String(lead.id) }}
            confirmText={`Delete ${lead.name}? Their emails and activity are removed too. This cannot be undone.`}
          >
            <button
              type="submit"
              className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:border-red-400"
            >
              Delete lead
            </button>
          </DeleteForm>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-surface p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Nurture step</p>
          <p className="mt-1 text-lg text-white">
            {lead.unsubscribed ? "unsubscribed" : lead.nurture_paused ? "paused" : `${lead.sequence_step} / 6`}
          </p>
        </div>
        <div className="card-surface p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Email opens</p>
          <p className="mt-1 text-lg text-white">{emailStats.opens}</p>
        </div>
        <div className="card-surface p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Email clicks</p>
          <p className="mt-1 text-lg text-white">{emailStats.clicks}</p>
        </div>
        <div className="card-surface p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Status</p>
          <p className="mt-1 text-lg text-white">{STATUS_LABELS[lead.status] || lead.status}</p>
        </div>
      </div>

      <section className="card-surface mt-6 p-6">
        <h2 className="text-lg font-semibold text-white">Contact details</h2>
        <div className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <p className="text-slate-300">
            <span className="text-slate-400">EHR platform: </span>
            {lead.ehr_platform || "-"}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Current fax provider: </span>
            {lead.fax_provider || "-"}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Current fax number: </span>
            {lead.fax_number || "-"}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Monthly volume: </span>
            {lead.monthly_volume || "-"}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Best time to call: </span>
            {lead.call_window || "-"}
          </p>
        </div>
        <p className="mt-3 text-sm text-slate-300">
          <span className="text-slate-400">What they want to solve: </span>
          {lead.notes || "-"}
        </p>
      </section>

      <section className="card-surface mt-6 p-6">
        <h2 className="text-lg font-semibold text-white">Log an activity</h2>
        <form action={`/admin/leads/${lead.id}/activity`} method="post" className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="type">Type</label>
            <select id="type" name="type" className={FIELD} defaultValue="note">
              <option value="note">Note</option>
              <option value="call">Call</option>
              <option value="vendor_contact">Vendor Contact</option>
            </select>
          </div>
          <div>
            <label className={LABEL} htmlFor="ticketNumber">Ticket # (optional)</label>
            <input id="ticketNumber" name="ticketNumber" className={FIELD} placeholder="e.g. EHR-4821" />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="body">Details</label>
            <textarea id="body" name="body" rows={3} required className={FIELD} />
          </div>
          <div>
            <label className={LABEL} htmlFor="followUpAt">Follow up on (optional)</label>
            <input id="followUpAt" name="followUpAt" type="date" className={FIELD} />
          </div>
          <div className="flex items-end sm:col-span-2">
            <button type="submit" className="btn-primary">
              Add activity
            </button>
          </div>
        </form>
      </section>

      <section className="card-surface mt-6 p-6">
        <h2 className="text-lg font-semibold text-white">Timeline</h2>
        <div className="mt-4 space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-slate-400">No activity logged yet.</p>
          ) : (
            activities.map((a) => (
              <div key={a.id} className="border-b border-white/5 pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{TYPE_LABELS[a.type] || a.type}</span>
                  <span className="text-xs text-slate-400">{fmt(a.occurred_at)}</span>
                </div>
                {a.subject ? <p className="mt-1 text-sm text-slate-300">{a.subject}</p> : null}
                {a.body ? <p className="mt-1 text-sm text-slate-300">{a.body}</p> : null}
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                  {a.ticket_number ? <span>Ticket: {a.ticket_number}</span> : null}
                  {a.follow_up_at ? <span>Follow up: {new Date(a.follow_up_at).toLocaleDateString()}</span> : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

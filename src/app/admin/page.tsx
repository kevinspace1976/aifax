import Link from "next/link";
import { ensureSchema, rows, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type VisitTotals = { total: number };
type SourceRow = { source: string; visits: number };
type FbRow = { fb_visits: number };
type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  practice_name: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  fbclid: string | null;
  referrer: string | null;
  sequence_step: number;
  unsubscribed: boolean;
  created_at: string;
};
type EmailStatsRow = { lead_id: number; opens: number; clicks: number; last_opened_at: string | null };
type FollowUpRow = {
  lead_id: number;
  name: string;
  follow_up_at: string;
  body: string | null;
  ticket_number: string | null;
};
type UnsubscribedRow = {
  id: number;
  name: string;
  email: string;
  practice_name: string | null;
  unsubscribed_at: string | null;
};

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="card-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

function sourceLabel(row: { utm_source: string | null; fbclid: string | null; referrer: string | null }) {
  if (row.utm_source) return row.utm_source;
  if (row.fbclid) return "facebook (ad click)";
  if (row.referrer) {
    try {
      return new URL(row.referrer).hostname;
    } catch {
      return row.referrer;
    }
  }
  return "direct";
}

export default async function AdminPage() {
  await ensureSchema();
  const db = sql();

  const [visits30, visits7, sources30, fb30, leads30, leadsRecent, emailStats, followUps, unsubscribed] = await Promise.all([
    rows<VisitTotals>(db`SELECT COUNT(*)::int AS total FROM visits WHERE created_at > now() - interval '30 days'`),
    rows<VisitTotals>(db`SELECT COUNT(*)::int AS total FROM visits WHERE created_at > now() - interval '7 days'`),
    rows<SourceRow>(db`
      SELECT COALESCE(utm_source, CASE WHEN fbclid IS NOT NULL THEN 'facebook (ad click)' END, 'direct / other') AS source,
             COUNT(*)::int AS visits
      FROM visits
      WHERE created_at > now() - interval '30 days'
      GROUP BY source
      ORDER BY visits DESC
      LIMIT 10
    `),
    rows<FbRow>(
      db`SELECT COUNT(*)::int AS fb_visits FROM visits WHERE fbclid IS NOT NULL AND created_at > now() - interval '30 days'`
    ),
    rows<VisitTotals>(db`SELECT COUNT(*)::int AS total FROM leads WHERE created_at > now() - interval '30 days'`),
    rows<Lead>(db`
      SELECT id, name, email, phone, practice_name, utm_source, utm_campaign, fbclid, referrer,
             sequence_step, unsubscribed, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 50
    `),
    rows<EmailStatsRow>(db`
      SELECT lead_id,
             COUNT(*) FILTER (WHERE event_type = 'email.opened')::int AS opens,
             COUNT(*) FILTER (WHERE event_type = 'email.clicked')::int AS clicks,
             MAX(occurred_at) FILTER (WHERE event_type = 'email.opened') AS last_opened_at
      FROM email_events
      GROUP BY lead_id
    `),
    rows<FollowUpRow>(db`
      SELECT l.id AS lead_id, l.name, la.follow_up_at, la.body, la.ticket_number
      FROM leads l
      JOIN LATERAL (
        SELECT follow_up_at, body, ticket_number
        FROM lead_activities
        WHERE lead_id = l.id
        ORDER BY occurred_at DESC
        LIMIT 1
      ) la ON true
      WHERE la.follow_up_at IS NOT NULL AND la.follow_up_at <= now()
      ORDER BY la.follow_up_at ASC
    `),
    rows<UnsubscribedRow>(db`
      SELECT id, name, email, practice_name, unsubscribed_at
      FROM leads
      WHERE unsubscribed = TRUE
      ORDER BY unsubscribed_at DESC NULLS LAST
      LIMIT 50
    `)
  ]);

  const emailStatsByLead = new Map(emailStats.map((row) => [row.lead_id, row]));

  const totalVisits30 = visits30[0]?.total ?? 0;
  const totalLeads30 = leads30[0]?.total ?? 0;
  const conversionRate = totalVisits30 > 0 ? ((totalLeads30 / totalVisits30) * 100).toFixed(1) : "-";

  return (
    <main className="section-shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Admin</h1>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-slate-200 hover:border-white/40"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visits, last 7 days" value={visits7[0]?.total ?? 0} />
        <StatCard label="Visits, last 30 days" value={totalVisits30} />
        <StatCard
          label="From Facebook ad clicks, 30d"
          value={fb30[0]?.fb_visits ?? 0}
          hint="Visits carrying a Facebook click id (fbclid)"
        />
        <StatCard
          label="Leads, last 30 days"
          value={totalLeads30}
          hint={`${conversionRate}% of 30-day visits`}
        />
      </div>

      {followUps.length > 0 ? (
        <section className="card-surface mt-8 border border-orange-400/30 p-6">
          <h2 className="text-lg font-semibold text-white">Needs follow-up ({followUps.length})</h2>
          <div className="mt-3 space-y-2">
            {followUps.map((f) => (
              <Link
                key={f.lead_id}
                href={`/admin/leads/${f.lead_id}`}
                className="block rounded-lg border border-white/10 p-3 text-sm hover:border-orange-400/40"
              >
                <span className="font-medium text-white">{f.name}</span>
                <span className="ml-2 text-orange-300">
                  due {new Date(f.follow_up_at).toLocaleDateString()}
                </span>
                {f.ticket_number ? <span className="ml-2 text-slate-400">Ticket: {f.ticket_number}</span> : null}
                {f.body ? <p className="mt-1 text-slate-300">{f.body}</p> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="card-surface mt-8 p-6">
        <h2 className="text-lg font-semibold text-white">Traffic sources, last 30 days</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 font-medium">Source</th>
                <th className="pb-2 font-medium">Visits</th>
              </tr>
            </thead>
            <tbody>
              {sources30.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-4 text-slate-400">
                    No visits recorded yet.
                  </td>
                </tr>
              ) : (
                sources30.map((row) => (
                  <tr key={row.source} className="border-b border-white/5">
                    <td className="py-2 text-slate-200">{row.source}</td>
                    <td className="py-2 text-slate-200">{row.visits}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-surface mt-8 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Leads</h2>
          <Link href="/admin/leads/export" className="text-sm text-cyan-300 underline-offset-4 hover:underline">
            Export CSV
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Email</th>
                <th className="pb-2 pr-4 font-medium">Practice</th>
                <th className="pb-2 pr-4 font-medium">Source</th>
                <th className="pb-2 pr-4 font-medium">Nurture step</th>
                <th className="pb-2 pr-4 font-medium">Opened</th>
              </tr>
            </thead>
            <tbody>
              {leadsRecent.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 text-slate-400">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                leadsRecent.map((lead) => {
                  const stats = emailStatsByLead.get(lead.id);
                  return (
                    <tr key={lead.id} className="border-b border-white/5 align-top">
                      <td className="py-2 pr-4 whitespace-nowrap text-slate-300">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4 text-slate-200">
                        <Link href={`/admin/leads/${lead.id}`} className="text-cyan-300 underline-offset-4 hover:underline">
                          {lead.name}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 text-slate-200">
                        <a href={`mailto:${lead.email}`} className="text-cyan-300 underline-offset-4 hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="py-2 pr-4 text-slate-300">{lead.practice_name || "-"}</td>
                      <td className="py-2 pr-4 text-slate-300">{sourceLabel(lead)}</td>
                      <td className="py-2 pr-4 text-slate-300">
                        {lead.unsubscribed ? "unsubscribed" : `${lead.sequence_step} / 6 sent`}
                      </td>
                      <td className="py-2 pr-4 text-slate-300">
                        {!stats || stats.opens === 0
                          ? "-"
                          : `${stats.opens}x, last ${new Date(stats.last_opened_at!).toLocaleDateString()}${
                              stats.clicks > 0 ? ` (${stats.clicks} click${stats.clicks === 1 ? "" : "s"})` : ""
                            }`}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-surface mt-8 p-6">
        <h2 className="text-lg font-semibold text-white">Unsubscribed ({unsubscribed.length})</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Email</th>
                <th className="pb-2 pr-4 font-medium">Practice</th>
                <th className="pb-2 pr-4 font-medium">Unsubscribed</th>
              </tr>
            </thead>
            <tbody>
              {unsubscribed.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-slate-400">
                    No unsubscribes yet.
                  </td>
                </tr>
              ) : (
                unsubscribed.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-slate-200">
                      <Link href={`/admin/leads/${lead.id}`} className="text-cyan-300 underline-offset-4 hover:underline">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-slate-300">{lead.email}</td>
                    <td className="py-2 pr-4 text-slate-300">{lead.practice_name || "-"}</td>
                    <td className="py-2 pr-4 whitespace-nowrap text-slate-300">
                      {lead.unsubscribed_at ? new Date(lead.unsubscribed_at).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

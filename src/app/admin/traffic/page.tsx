import Link from "next/link";
import { cookies } from "next/headers";
import { EXCLUDE_DEVICE_COOKIE, isExcludedDevice } from "@/lib/admin-auth";
import { ensureSchema, rows, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Site traffic, city level. Every row comes from /api/track (one per page
 * view). Bots and crawlers are filtered out by user agent so the counts
 * reflect people. Location comes from Vercel's edge geo headers; no raw IP
 * is stored or shown, per the privacy policy. Times are shown in Eastern.
 */

const TZ = "America/New_York";
const BOT_UA =
  "(bot|crawl|spider|slurp|facebookexternalhit|preview|headless|python-requests|curl/|wget|lighthouse|pingdom|uptime|monitor)";

type Count = { visits: number; visitors: number };
type CityRow = { city: string | null; region: string | null; country: string | null; visits: number; visitors: number };
type PageRow = { path: string; visits: number };
type SourceRow = { source: string; visits: number; visitors: number };
type DeviceRow = { device: string; visits: number };
type VisitRow = {
  id: number;
  created_at: string;
  city: string | null;
  region: string | null;
  country: string | null;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  fbclid: string | null;
  user_agent: string | null;
  session_id: string;
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

function place(row: { city: string | null; region: string | null; country: string | null }) {
  if (!row.city && !row.region && !row.country) return "Unknown";
  const parts = [row.city, row.region].filter(Boolean);
  const inUs = row.country === "US";
  if (inUs) return parts.join(", ") || "United States";
  return [...parts, row.country].filter(Boolean).join(", ");
}

function source(row: { utm_source: string | null; utm_campaign: string | null; fbclid: string | null; referrer: string | null }) {
  if (row.utm_source) return row.utm_campaign ? `${row.utm_source} / ${row.utm_campaign}` : row.utm_source;
  if (row.fbclid) return "facebook (ad click)";
  if (row.referrer) {
    try {
      const host = new URL(row.referrer).hostname.replace(/^www\./, "");
      return host.endsWith("aifax.net") ? "internal" : host;
    } catch {
      return row.referrer;
    }
  }
  return "direct";
}

function device(ua: string | null) {
  if (!ua) return "unknown";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone/i.test(ua)) return "phone";
  return "desktop";
}

function when(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default async function TrafficPage() {
  await ensureSchema();
  const db = sql();
  const cookieStore = await cookies();
  const thisDeviceExcluded = isExcludedDevice(cookieStore.get(EXCLUDE_DEVICE_COOKIE)?.value);
  const excludedIps = (process.env.EXCLUDED_VISITOR_IPS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean).length;

  const [today, yesterday, week, month, cities, pages, sources, devices, recent] = await Promise.all([
    rows<Count>(db`
      SELECT COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE (created_at AT TIME ZONE ${TZ})::date = (now() AT TIME ZONE ${TZ})::date
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
    `),
    rows<Count>(db`
      SELECT COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE (created_at AT TIME ZONE ${TZ})::date = (now() AT TIME ZONE ${TZ})::date - 1
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
    `),
    rows<Count>(db`
      SELECT COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE created_at > now() - interval '7 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
    `),
    rows<Count>(db`
      SELECT COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE created_at > now() - interval '30 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
    `),
    rows<CityRow>(db`
      SELECT city, region, country, COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE created_at > now() - interval '30 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
      GROUP BY city, region, country
      ORDER BY visitors DESC, visits DESC
      LIMIT 25
    `),
    rows<PageRow>(db`
      SELECT path, COUNT(*)::int AS visits
      FROM visits
      WHERE created_at > now() - interval '30 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
      GROUP BY path
      ORDER BY visits DESC
      LIMIT 15
    `),
    rows<SourceRow>(db`
      SELECT COALESCE(utm_source, CASE WHEN fbclid IS NOT NULL THEN 'facebook (ad click)' END,
                      CASE WHEN referrer IS NOT NULL AND referrer NOT LIKE '%aifax.net%' THEN 'referral' END,
                      'direct') AS source,
             COUNT(*)::int AS visits, COUNT(DISTINCT session_id)::int AS visitors
      FROM visits
      WHERE created_at > now() - interval '30 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
      GROUP BY source
      ORDER BY visitors DESC
      LIMIT 10
    `),
    rows<DeviceRow>(db`
      SELECT CASE
               WHEN user_agent ~* '(iPad|Tablet)' THEN 'tablet'
               WHEN user_agent ~* '(Mobile|Android|iPhone)' THEN 'phone'
               WHEN user_agent IS NULL THEN 'unknown'
               ELSE 'desktop'
             END AS device,
             COUNT(*)::int AS visits
      FROM visits
      WHERE created_at > now() - interval '30 days'
        AND (user_agent IS NULL OR user_agent !~* ${BOT_UA})
      GROUP BY device
      ORDER BY visits DESC
    `),
    rows<VisitRow>(db`
      SELECT id, created_at, city, region, country, path, referrer, utm_source, utm_campaign, fbclid,
             user_agent, session_id
      FROM visits
      WHERE (user_agent IS NULL OR user_agent !~* ${BOT_UA})
      ORDER BY created_at DESC
      LIMIT 150
    `)
  ]);

  const t = today[0] ?? { visits: 0, visitors: 0 };
  const y = yesterday[0] ?? { visits: 0, visitors: 0 };
  const w = week[0] ?? { visits: 0, visitors: 0 };
  const m = month[0] ?? { visits: 0, visitors: 0 };
  const monthVisits = Math.max(m.visits, 1);

  return (
    <main className="section-shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Traffic</h1>
          <p className="mt-1 text-sm text-slate-400">
            People only (crawlers filtered). Location is city level from the visitor&apos;s network. Times in Eastern.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="btn-secondary min-h-0 px-4 py-1.5 text-sm">
            Leads
          </Link>
          <Link href="/admin/traffic" className="btn-secondary min-h-0 px-4 py-1.5 text-sm">
            Refresh
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value={t.visitors} hint={`${t.visits} page views`} />
        <StatCard label="Yesterday" value={y.visitors} hint={`${y.visits} page views`} />
        <StatCard label="Last 7 days" value={w.visitors} hint={`${w.visits} page views`} />
        <StatCard label="Last 30 days" value={m.visitors} hint={`${m.visits} page views`} />
      </div>
      <p className="mt-2 text-xs text-slate-500">Big number is unique visitors (one per browser). Page views count every page opened.</p>

      <section className="card-surface mt-6 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="text-sm font-semibold text-white">Your own visits</h2>
          <p className="mt-1 text-xs text-slate-400">
            Never counted while signed in here. Excluding a device keeps it out for a year even when signed out.
            {excludedIps > 0 ? ` ${excludedIps} network address${excludedIps === 1 ? "" : "es"} also excluded.` : ""}
          </p>
        </div>
        <form action="/api/admin/exclude-device" method="post">
          {thisDeviceExcluded ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-emerald-300">This device is excluded</span>
              <button type="submit" name="action" value="remove" className="btn-secondary min-h-0 px-4 py-1.5 text-sm">
                Count it again
              </button>
            </div>
          ) : (
            <button type="submit" name="action" value="add" className="btn-primary min-h-0 px-4 py-1.5 text-sm">
              Exclude this device
            </button>
          )}
        </form>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="card-surface p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white">Where visitors are, 30 days</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-2">City</th>
                <th className="pb-2 text-right">Visitors</th>
                <th className="pb-2 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {cities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-3 text-slate-400">
                    No visits recorded yet.
                  </td>
                </tr>
              ) : (
                cities.map((c, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-2 text-slate-200">{place(c)}</td>
                    <td className="py-2 text-right text-white">{c.visitors}</td>
                    <td className="py-2 text-right text-slate-400">{c.visits}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-lg font-semibold text-white">Where they came from, 30 days</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-2">Source</th>
                <th className="pb-2 text-right">Visitors</th>
                <th className="pb-2 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.source} className="border-t border-white/10">
                  <td className="py-2 text-slate-200">{s.source}</td>
                  <td className="py-2 text-right text-white">{s.visitors}</td>
                  <td className="py-2 text-right text-slate-400">{s.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="mt-6 text-sm font-semibold text-white">Devices</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {devices.map((d) => (
              <li key={d.device} className="flex justify-between text-slate-300">
                <span>{d.device}</span>
                <span>
                  {d.visits} <span className="text-slate-500">({Math.round((d.visits / monthVisits) * 100)}%)</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-lg font-semibold text-white">Pages, 30 days</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-2">Page</th>
                <th className="pb-2 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.path} className="border-t border-white/10">
                  <td className="py-2 text-slate-200">{p.path}</td>
                  <td className="py-2 text-right text-white">{p.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="card-surface mt-8 p-6">
        <h2 className="text-lg font-semibold text-white">Recent visits</h2>
        <p className="mt-1 text-xs text-slate-400">
          Last 150 page views. Visitor is a per-browser id, the same across that person&apos;s pages.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="pb-2 pr-4">When</th>
                <th className="pb-2 pr-4">Location</th>
                <th className="pb-2 pr-4">Page</th>
                <th className="pb-2 pr-4">Source</th>
                <th className="pb-2 pr-4">Device</th>
                <th className="pb-2">Visitor</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-3 text-slate-400">
                    No visits recorded yet.
                  </td>
                </tr>
              ) : (
                recent.map((v) => (
                  <tr key={v.id} className="border-t border-white/10">
                    <td className="whitespace-nowrap py-2 pr-4 text-slate-300">{when(v.created_at)}</td>
                    <td className="whitespace-nowrap py-2 pr-4 text-slate-200">{place(v)}</td>
                    <td className="py-2 pr-4 text-slate-200">{v.path}</td>
                    <td className="py-2 pr-4 text-slate-300">{source(v)}</td>
                    <td className="py-2 pr-4 text-slate-400">{device(v.user_agent)}</td>
                    <td className="py-2 font-mono text-xs text-slate-500">{v.session_id.slice(0, 8)}</td>
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

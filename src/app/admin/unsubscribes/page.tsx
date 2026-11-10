import Link from "next/link";
import { ensureSchema, rows, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Opt-outs from the practice outreach emails, newest first, times in Eastern. */
type Row = { email: string; practice: string | null; source: string; unsubscribed_at: string };

export default async function OutreachUnsubscribesPage() {
  await ensureSchema();
  const db = sql();
  const list = await rows<Row>(
    db`SELECT email, practice, source, unsubscribed_at FROM outreach_unsubscribes ORDER BY unsubscribed_at DESC`
  );
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short"
  });

  return (
    <main className="section-shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Outreach unsubscribes ({list.length})</h1>
        <Link href="/admin" className="btn-secondary min-h-0 px-4 py-1.5 text-sm">
          Back to Admin
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-300">
        Addresses that opted out of the practice outreach emails. The outreach script skips every address here.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Date (ET)</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Practice</th>
              <th className="px-4 py-3">How</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                  No unsubscribes yet.
                </td>
              </tr>
            ) : (
              list.map((r) => (
                <tr key={r.email} className="border-t border-white/10">
                  <td className="whitespace-nowrap px-4 py-3">{fmt.format(new Date(r.unsubscribed_at))}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.practice ?? ""}</td>
                  <td className="px-4 py-3">{r.source === "link" ? "Unsubscribe link" : "Email reply"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

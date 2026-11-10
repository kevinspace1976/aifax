import type { Metadata } from "next";
import { normalizeEmails, verifyOutreachToken } from "@/lib/outreach";

export const metadata: Metadata = { title: "Unsubscribe | AiFax", robots: { index: false } };
export const dynamic = "force-dynamic";

/**
 * Landing page for the unsubscribe link in the practice outreach email.
 * It asks for one confirming click (a POST) instead of unsubscribing on
 * the GET: email security scanners open every link in an email, and a
 * GET that unsubscribed would opt practices out that never clicked.
 */
export default async function OutreachUnsubscribePage({
  searchParams
}: {
  searchParams: Promise<{ e?: string; p?: string; t?: string }>;
}) {
  const { e = "", p = "", t = "" } = await searchParams;
  const emails = normalizeEmails(e);
  const valid = emails.length > 0 && verifyOutreachToken(emails, p, t);

  return (
    <main className="section-shell flex min-h-[50vh] items-center justify-center py-16">
      <div className="card-surface max-w-md p-6 text-center">
        {valid ? (
          <>
            <h1 className="text-xl font-semibold text-slate-900">Unsubscribe from AiFax emails</h1>
            <p className="mt-3 text-sm text-slate-700">
              {p ? `${p}: ` : ""}
              {emails.join(", ")}
            </p>
            <form action="/api/outreach/unsubscribe" method="post" className="mt-5">
              <input type="hidden" name="e" value={e} />
              <input type="hidden" name="p" value={p} />
              <input type="hidden" name="t" value={t} />
              <button type="submit" className="btn-primary">
                Unsubscribe
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-slate-900">That link didn&apos;t work</h1>
            <p className="mt-3 text-sm text-slate-700">
              Reply &quot;unsubscribe&quot; to the email, or email info@aifax.net, and we will remove you.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

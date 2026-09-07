import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

// Read-only: the CRM only ever reads the mailbox to log communication
// history. Outbound mail stays on the existing paths (Resend for nurture
// emails, a human sending manually in Gmail).
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

/**
 * Admin-only entry point into the one-time Gmail OAuth consent flow.
 * access_type=offline + prompt=consent forces Google to hand back a
 * refresh token every time this is visited, not just on first ever
 * authorization.
 */
export async function GET(req: NextRequest) {
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  const clientId = process.env.GMAIL_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ ok: false, error: "GMAIL_CLIENT_ID is not configured." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aifax.net";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl}/api/gmail/oauth/callback`,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES.join(" ")
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}

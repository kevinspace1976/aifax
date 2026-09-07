import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

function htmlResponse(bodyHtml: string, status = 200) {
  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:40px auto;line-height:1.5;">${bodyHtml}</body></html>`,
    { status, headers: { "Content-Type": "text/html" } }
  );
}

/**
 * Google redirects here after the admin approves the consent screen.
 * This is a one-time, human-in-the-loop step: the refresh token is shown
 * on screen exactly once (Google never returns it again after this
 * exchange) for the admin to copy into Vercel as GMAIL_REFRESH_TOKEN,
 * matching this app's existing convention of every secret living in an
 * env var, never in the database.
 */
export async function GET(req: NextRequest) {
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  const code = req.nextUrl.searchParams.get("code");
  const oauthError = req.nextUrl.searchParams.get("error");
  if (oauthError) {
    return htmlResponse(`<p>Google returned an error: <code>${oauthError}</code></p>`, 400);
  }
  if (!code) {
    return htmlResponse("<p>No authorization code received.</p>", 400);
  }

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse("<p>GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET are not configured on the server.</p>", 500);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aifax.net";
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${siteUrl}/api/gmail/oauth/callback`
    })
  });
  const data = (await tokenRes.json()) as { refresh_token?: string; error?: string; error_description?: string };

  if (!tokenRes.ok || !data.refresh_token) {
    return htmlResponse(
      `<p><strong>Token exchange failed, or no refresh token was returned.</strong></p>
      <pre style="white-space:pre-wrap;background:#f3f4f6;padding:12px;border-radius:8px;">${JSON.stringify(
        data,
        null,
        2
      )}</pre>
      <p>Missing refresh_token usually means this app was already authorized once before. Go to
      <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">Google Account &rarr; Third-party access</a>,
      remove "AiFax CRM", then visit <a href="/api/gmail/oauth/connect">/api/gmail/oauth/connect</a> again.</p>`,
      500
    );
  }

  return htmlResponse(`
    <p><strong>Connected.</strong> Copy the value below and add it to Vercel as
    <code>GMAIL_REFRESH_TOKEN</code> (Type: Secret, Environment: Production), then redeploy.
    This value will not be shown again after you leave this page.</p>
    <textarea readonly style="width:100%;height:90px;font-family:monospace;font-size:13px;" onclick="this.select()">${data.refresh_token}</textarea>
  `);
}

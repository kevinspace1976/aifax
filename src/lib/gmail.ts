/**
 * Thin wrapper around the Gmail REST API (no googleapis SDK dependency,
 * this app already talks to Resend and Meta the same way: plain fetch).
 * Used by the CRM's email sync (see /api/cron/gmail-sync) to read
 * info@aifax.net's mailbox - never to send, outbound mail still goes
 * through Resend (nurture emails) or a human sending manually in Gmail.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://gmail.googleapis.com/gmail/v1/users/me";

export function gmailConfigured() {
  return Boolean(
    process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN
  );
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });
  if (!res.ok) {
    console.error("[gmail] failed to refresh access token", await res.text());
    return null;
  }
  const data = (await res.json()) as { access_token?: string };
  return data.access_token || null;
}

export type GmailMessageSummary = {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  internalDate: string;
};

function header(headers: { name: string; value: string }[] | undefined, name: string) {
  return headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || "";
}

/**
 * Searches the mailbox with a Gmail search query (same syntax as the
 * Gmail search box, e.g. "(from:x@y.com OR to:x@y.com) after:2026/09/01")
 * and returns lightweight summaries. Only metadata is fetched per
 * message (no body), keeping this cheap to run for every lead on every
 * sync tick.
 */
export async function searchMessages(query: string, maxResults = 25): Promise<GmailMessageSummary[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  const listRes = await fetch(
    `${API_BASE}/messages?${new URLSearchParams({ q: query, maxResults: String(maxResults) })}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!listRes.ok) {
    console.error("[gmail] search failed", await listRes.text());
    return [];
  }
  const listData = (await listRes.json()) as { messages?: { id: string; threadId: string }[] };
  const ids = listData.messages || [];

  const messages: GmailMessageSummary[] = [];
  for (const { id } of ids) {
    const msgRes = await fetch(
      `${API_BASE}/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!msgRes.ok) continue;
    const msg = (await msgRes.json()) as {
      id: string;
      threadId: string;
      snippet?: string;
      internalDate?: string;
      payload?: { headers?: { name: string; value: string }[] };
    };
    messages.push({
      id: msg.id,
      threadId: msg.threadId,
      from: header(msg.payload?.headers, "From"),
      to: header(msg.payload?.headers, "To"),
      subject: header(msg.payload?.headers, "Subject"),
      snippet: msg.snippet || "",
      internalDate: msg.internalDate || String(Date.now())
    });
  }
  return messages;
}

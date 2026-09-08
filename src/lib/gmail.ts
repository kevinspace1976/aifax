/**
 * Thin wrapper around the Gmail REST API (no googleapis SDK dependency,
 * this app already talks to Resend and Meta the same way: plain fetch).
 * Used for two things: the CRM's email sync (see /api/cron/gmail-sync)
 * reads info@aifax.net's mailbox, and /api/contact creates a draft reply
 * for the admin to review - it only ever creates drafts, never sends, the
 * admin still reviews and hits send themselves in Gmail.
 */

import { randomUUID } from "crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://gmail.googleapis.com/gmail/v1/users/me";

export function gmailConfigured() {
  return Boolean(
    process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN
  );
}

export async function getAccessToken(): Promise<string | null> {
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

/**
 * Creates a Gmail draft addressed to the given recipient - never sent
 * automatically, it just appears in info@aifax.net's Drafts folder for a
 * human to review, edit, and send. Requires the gmail.compose scope
 * (broader than the gmail.readonly used for the CRM sync), re-authorizing
 * via /api/gmail/oauth/connect picks up both.
 *
 * Sent as multipart/alternative (plain text + HTML) so the HTML part can
 * carry real bold text and bullet points instead of asterisks/hyphens,
 * while clients that don't render HTML still get a readable plain copy.
 */
export async function createDraft(opts: { to: string; subject: string; text: string; html: string }): Promise<boolean> {
  const accessToken = await getAccessToken();
  if (!accessToken) return false;

  const boundary = `aifax_${randomUUID()}`;
  const message = [
    // Set explicitly rather than left to Gmail's account-level identity
    // resolution: that lagged behind after the mailbox's Workspace profile
    // and "Send mail as" name were renamed to AiFax DevTeam, still sending
    // as the old name.
    'From: "AiFax DevTeam" <info@aifax.net>',
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    opts.text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    opts.html,
    "",
    `--${boundary}--`
  ].join("\r\n");
  const raw = Buffer.from(message, "utf-8").toString("base64url");

  const res = await fetch(`${API_BASE}/drafts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: { raw } })
  });
  if (!res.ok) {
    console.error("[gmail] failed to create draft", await res.text());
    return false;
  }
  return true;
}

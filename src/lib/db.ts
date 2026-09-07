import { neon } from "@neondatabase/serverless";

/**
 * A single shared Postgres connection string covers this. Any Postgres
 * works (Neon, Vercel's own Postgres marketplace add-on, Supabase, etc);
 * this driver just happens to be the one Vercel currently recommends for
 * its serverless functions, since it talks to Postgres over HTTP instead
 * of a long-lived TCP connection, which is what serverless needs.
 */
function connectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add a Postgres database (Vercel Storage tab, " +
        "or any Neon/Supabase instance) and set DATABASE_URL in the project's " +
        "environment variables."
    );
  }
  return url;
}

export function sql() {
  return neon(connectionString());
}

/**
 * The neon driver's tagged-template call returns rows typed as
 * Record<string, any>[] by design (it can't know your query's shape
 * ahead of time). Callers know the shape, this just lets them assert it
 * in one place instead of an awkward double-cast at every call site.
 */
export function rows<T>(queryResult: Promise<Record<string, unknown>[]>): Promise<T[]> {
  return queryResult as unknown as Promise<T[]>;
}

let schemaReady: Promise<void> | null = null;

/**
 * Called lazily by every route that touches the database, same pattern as
 * ictfax_ensure_schema() on the fax box: no separate migration step to
 * remember to run, the tables just exist by the time anything queries them.
 * Safe to call on every request, CREATE TABLE/INDEX IF NOT EXISTS is a
 * cheap no-op once the schema exists.
 */
export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = runMigrations().catch((err) => {
      // Let the next call retry instead of caching a permanent failure
      // (e.g. the very first call before DATABASE_URL is set locally).
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

async function runMigrations() {
  const db = sql();

  await db`
    CREATE TABLE IF NOT EXISTS visits (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      fbclid TEXT,
      gclid TEXT,
      user_agent TEXT,
      ip_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits (created_at)`;
  await db`CREATE INDEX IF NOT EXISTS visits_session_idx ON visits (session_id)`;

  await db`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      practice_name TEXT,
      ehr_platform TEXT,
      fax_provider TEXT,
      fax_number TEXT,
      monthly_volume TEXT,
      call_window TEXT,
      notes TEXT,
      source_path TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      fbclid TEXT,
      gclid TEXT,
      ip_hash TEXT,
      sequence_step INT NOT NULL DEFAULT 0,
      next_email_due_at TIMESTAMPTZ,
      last_email_sent_at TIMESTAMPTZ,
      unsubscribed BOOLEAN NOT NULL DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'new',
      nurture_paused BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE INDEX IF NOT EXISTS leads_next_email_due_idx
      ON leads (next_email_due_at)
      WHERE unsubscribed = FALSE
  `;
  await db`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at)`;

  await db`
    CREATE TABLE IF NOT EXISTS email_events (
      id BIGSERIAL PRIMARY KEY,
      lead_id BIGINT REFERENCES leads (id) ON DELETE CASCADE,
      step INT,
      event_type TEXT NOT NULL,
      link_url TEXT,
      occurred_at TIMESTAMPTZ NOT NULL
    )
  `;
  await db`CREATE INDEX IF NOT EXISTS email_events_lead_idx ON email_events (lead_id)`;

  // The CRM timeline: manually logged notes/calls/vendor contacts, status
  // changes, and (once the Gmail sync is wired up) every inbound/outbound
  // email tied to a lead, so nothing about where a client stands has to be
  // remembered, it is just the log for that lead_id in order.
  await db`
    CREATE TABLE IF NOT EXISTS lead_activities (
      id BIGSERIAL PRIMARY KEY,
      lead_id BIGINT NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      subject TEXT,
      body TEXT,
      ticket_number TEXT,
      follow_up_at TIMESTAMPTZ,
      gmail_message_id TEXT UNIQUE,
      occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`CREATE INDEX IF NOT EXISTS lead_activities_lead_idx ON lead_activities (lead_id, occurred_at)`;
  await db`CREATE INDEX IF NOT EXISTS lead_activities_follow_up_idx ON lead_activities (follow_up_at)`;
}

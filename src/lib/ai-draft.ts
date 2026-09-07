/**
 * Auto-drafts a personal reply to a new lead using the Claude API, so a
 * draft is already waiting in Gmail (see /api/contact) instead of the
 * admin writing every reply from scratch. Never sends anything itself,
 * the draft still needs a human to review, edit, and hit send.
 */
export async function generateLeadReply(lead: {
  name: string;
  practiceName: string | null;
  phone: string | null;
  ehrPlatform: string | null;
  faxProvider: string | null;
  faxNumber: string | null;
  monthlyVolume: string | null;
  callWindow: string | null;
  notes: string | null;
}): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const summary = [
    `Name: ${lead.name}`,
    `Practice: ${lead.practiceName || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `EHR platform: ${lead.ehrPlatform || "-"}`,
    `Current fax provider: ${lead.faxProvider || "-"}`,
    `Current fax number: ${lead.faxNumber || "-"}`,
    `Monthly fax volume: ${lead.monthlyVolume || "-"}`,
    `Best time to call: ${lead.callWindow || "-"}`,
    `What they want to solve: ${lead.notes || "-"}`
  ].join("\n");

  const system = `You write a follow-up email on behalf of Kevin at AiFax (AI-powered fax-to-EHR automation for
medical practices) to someone who just submitted a "Schedule a Workflow Review" form.

Rules:
- Output ONLY the email body as plain text. No subject line, no markdown, no placeholders like [Name].
- If "What they want to solve" is filled in, address that specific goal substantively (how AiFax's OCR/NLP fax
  reading and EHR routing applies to it), don't just restate it back to them.
- If key fields are blank ("-"): EHR platform, fax provider, fax number, monthly volume, or what they want to
  solve, ask for exactly those missing ones instead of guessing.
- If both "Best time to call" and Phone are filled in, propose a call at that time using that number.
- 3-5 short sentences total.
- Sign off exactly as:
Kevin
AiFax`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: summary }]
      })
    });
    if (!res.ok) {
      console.error("[ai-draft] Anthropic API rejected the request", await res.text());
      return null;
    }
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((block) => block.type === "text")?.text;
    return text?.trim() || null;
  } catch (err) {
    console.error("[ai-draft] request failed", err);
    return null;
  }
}

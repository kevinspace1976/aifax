import { newNumberUrl, portNumberUrl } from "@/lib/site";

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
- Write like a normal, casual one-to-one email reply, short natural paragraphs, not a marketing page. Don't
  repeat the plan's feature list, an "everything included" section is appended automatically after your reply.
- If "What they want to solve" is filled in, address that specific goal substantively (how AiFax's OCR/NLP fax
  reading and EHR routing applies to it), don't just restate it back to them.
- Always point them to get started themselves right away, no call needed: porting their current fax number or
  getting a new one turns on AI fax reading, routing, and chat-with-your-faxes immediately.
  - Get a new fax number: ${newNumberUrl}
  - Port an existing fax number: ${portNumberUrl}
- Do not propose a phone call, ask to schedule one, or reference "best time to call" or their phone number, even
  if those fields are filled in. The one exception: if "What they want to solve" or the EHR platform clearly
  means they want their EHR integration scoped out, you may offer a short call as one option, alongside just
  replying to this email, for figuring out the right setup, never require or push it.
- If key fields are blank ("-"): EHR platform, fax provider, fax number, monthly volume, or what they want to
  solve, ask for exactly those missing ones instead of guessing.
- 3-5 short sentences total.
- Never use an em dash. Use a hyphen instead, or rewrite the sentence.
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

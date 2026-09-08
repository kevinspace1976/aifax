/**
 * The lead-nurture sequence. Standard B2B SaaS cadence: confirm right
 * away, then educate, then prove it works, then handle the objections
 * that actually stall a purchase (price, compliance, setup effort), then
 * a direct check-in, then one last nudge before going quiet. Six touches
 * over three weeks is enough contact for a considered B2B decision
 * without reading as spam.
 *
 * DELAYS_DAYS[i] is days-since-signup that template i should go out.
 * Index 0 is sent synchronously at signup by /api/contact, not by cron.
 */
import { featuresHtml, featuresText } from "@/lib/features";
import { newNumberUrl, portNumberUrl } from "@/lib/site";

export const DELAYS_DAYS = [0, 2, 5, 7, 12, 21] as const;

export type NurtureContext = {
  name: string;
  practiceName: string | null;
  notes: string | null;
  unsubscribeUrl: string;
  mailingAddress: string | null;
};

type Template = { subject: string; html: (ctx: NurtureContext) => string; text: (ctx: NurtureContext) => string };

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(ctx: NurtureContext, bodyHtml: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
    ${bodyHtml}
    ${featuresHtml()}
    <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb" />
    <p style="font-size:12px;color:#6b7280;line-height:1.6">
      ${ctx.mailingAddress ? `AiFax, ${ctx.mailingAddress}<br />` : ""}
      You are receiving this because you requested information from AiFax.
      <a href="${ctx.unsubscribeUrl}" style="color:#6b7280">Unsubscribe</a>
    </p>
  </div>`;
}

function textFooter(ctx: NurtureContext) {
  return `\n\n--\nEverything included with your AiFax plan\n\n${featuresText()}\n\n--\n${
    ctx.mailingAddress ? `AiFax, ${ctx.mailingAddress}\n` : ""
  }Unsubscribe: ${ctx.unsubscribeUrl}`;
}

export const NURTURE_SEQUENCE: Template[] = [
  // Step 0 - day 0: confirmation
  {
    subject: "Got your request, here is what happens next",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>Thanks for reaching out about AiFax${ctx.practiceName ? ` for ${ctx.practiceName}` : ""}. We got your
        details and will follow up with a workflow review tailored to how faxes reach your practice today.</p>
        ${
          ctx.notes
            ? `<p>You mentioned: &ldquo;${escapeHtml(ctx.notes)}&rdquo; - that's exactly what we'll map out
        in your workflow review.</p>`
            : ""
        }
        <p>Want to get started right away instead of waiting on us? <a href="${newNumberUrl}">Get a new fax
        number</a> or <a href="${portNumberUrl}">port your current one</a> and the AI fax reading, routing, and
        chat-with-your-faxes features turn on immediately, no call needed.</p>
        <p>In the meantime, here is a 2-minute look at how it works:
        <a href="https://www.aifax.net/how-it-works">aifax.net/how-it-works</a></p>
        <p>Talk soon,<br />Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nThanks for reaching out about AiFax${
        ctx.practiceName ? ` for ${ctx.practiceName}` : ""
      }. We got your details and will follow up with a workflow review tailored to how faxes reach your practice today.\n${
        ctx.notes ? `\nYou mentioned: "${ctx.notes}" - that's exactly what we'll map out in your workflow review.\n` : ""
      }\nWant to get started right away instead of waiting on us? Get a new fax number: ${newNumberUrl} or port your current one: ${portNumberUrl}. The AI fax reading, routing, and chat-with-your-faxes features turn on immediately, no call needed.\n\nIn the meantime, here is a 2-minute look at how it works: https://www.aifax.net/how-it-works\n\nTalk soon,\nTeam AiFax${textFooter(
        ctx
      )}`
  },
  // Step 1 - day 2: pain-point education
  {
    subject: "The 8 manual steps behind every fax you file today",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>Every fax that lands in your practice, a lab result, a referral, a records request, goes through
        the same manual chain before it's actually usable: open it, identify the patient, identify the document
        type, download it, rename it, find or create the chart, upload it, and notify the right provider.</p>
        <p>Miss a step and you get a fax filed in the wrong chart, a missed follow-up, or a HIPAA exposure. None
        of that is a training problem, it's a workflow problem.</p>
        <p>AiFax reads every fax the moment it arrives and routes it into the right patient's chart
        automatically, so your staff reviews instead of retypes.</p>
        <p><a href="https://www.aifax.net/ehr-integration">See how EHR integration works</a></p>
        <p>Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nEvery fax that lands in your practice goes through the same manual chain: open it, identify the patient, identify the document type, download it, rename it, find or create the chart, upload it, notify the provider. Miss a step and you get a misfiled fax or a missed follow-up.\n\nAiFax reads every fax the moment it arrives and routes it into the right patient's chart automatically.\n\nSee how EHR integration works: https://www.aifax.net/ehr-integration\n\nTeam AiFax${textFooter(
        ctx
      )}`
  },
  // Step 2 - day 5: proof / feature depth
  {
    subject: "How AiFax reads a fax (NLP + OCR, not a template)",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>A common question we get: "our faxes don't follow a consistent format, will this actually work?"</p>
        <p>AiFax doesn't rely on a fixed template. It combines OCR with natural language processing to read the
        actual content of the document, identify the patient, classify the document type, and route it,
        whether it's a typed referral, a handwritten order, or a multi-page lab report.</p>
        <p><a href="https://www.aifax.net/solutions">See the full workflow</a></p>
        <p>Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nA common question: "our faxes don't follow a consistent format, will this work?" AiFax combines OCR with natural language processing to read the actual content, identify the patient, classify the document type, and route it, whether it's typed, handwritten, or a multi-page report.\n\nSee the full workflow: https://www.aifax.net/solutions\n\nTeam AiFax${textFooter(
        ctx
      )}`
  },
  // Step 3 - day 7: objection handling (price / compliance / setup)
  {
    subject: "Cost, HIPAA, and how long setup actually takes",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>The three questions every practice asks before switching:</p>
        <p><strong>What does it cost?</strong> Plans start at $9.99/month with page-based tiers, so a small
        practice isn't paying enterprise pricing. <a href="https://www.aifax.net/pricing">See plans</a>.</p>
        <p><strong>Is it HIPAA-compliant?</strong> Yes, that's the baseline, not an add-on.</p>
        <p><strong>How long does setup take?</strong> You keep your current fax number, there is no hardware
        to install, and most practices are live within days.</p>
        <p>Ready when you are: <a href="${portNumberUrl}">port your current number</a> or
        <a href="${newNumberUrl}">get a new one</a> and you're live in days, no call required. Happy to answer
        anything specific to your practice too, just reply to this email.</p>
        <p>Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nThree questions every practice asks:\n\nWhat does it cost? Plans start at $9.99/month with page-based tiers. See plans: https://www.aifax.net/pricing\nIs it HIPAA-compliant? Yes, that's the baseline.\nHow long does setup take? You keep your current fax number, no hardware, most practices are live within days.\n\nReady when you are: port your current number (${portNumberUrl}) or get a new one (${newNumberUrl}), no call required. Reply to this email with anything specific to your practice.\n\nTeam AiFax${textFooter(
        ctx
      )}`
  },
  // Step 4 - day 12: check-in / soft CTA
  {
    subject: "Still sorting out your fax workflow?",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>Wanted to check in, still looking at options for getting faxes into ${
          ctx.practiceName || "your EHR"
        } automatically?</p>
        <p>You don't need a call to get started: <a href="${newNumberUrl}">get a new fax number</a> or
        <a href="${portNumberUrl}">port your current one</a> and the AI fax reading, routing, and
        chat-with-your-faxes features turn on right away.</p>
        <p>If you specifically want your EHR integration scoped out, just reply here and we'll figure out the
        right setup, no obligation.</p>
        <p>Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nStill looking at options for getting faxes into ${
        ctx.practiceName || "your EHR"
      } automatically?\n\nYou don't need a call to get started: get a new fax number (${newNumberUrl}) or port your current one (${portNumberUrl}) and the AI fax reading, routing, and chat-with-your-faxes features turn on right away.\n\nIf you specifically want your EHR integration scoped out, just reply here and we'll figure out the right setup, no obligation.\n\nTeam AiFax${textFooter(
        ctx
      )}`
  },
  // Step 5 - day 21: final call
  {
    subject: "Last note from us on this",
    html: (ctx) =>
      wrap(
        ctx,
        `<p>Hi ${firstName(ctx.name)},</p>
        <p>This is the last email in this series, don't want to clutter your inbox if the timing isn't right.</p>
        <p>If getting faxes out of manual filing and into ${
          ctx.practiceName || "your EHR"
        } becomes a priority later, everything above still applies: <a href="${newNumberUrl}">get a new fax
        number</a> or <a href="${portNumberUrl}">port your current one</a> whenever it's useful, no call needed.
        Just reply if you'd rather talk through EHR integration first.</p>
        <p>Team AiFax</p>`
      ),
    text: (ctx) =>
      `Hi ${firstName(ctx.name)},\n\nThis is the last email in this series. If getting faxes out of manual filing and into ${
        ctx.practiceName || "your EHR"
      } becomes a priority later, everything above still applies: get a new fax number (${newNumberUrl}) or port your current one (${portNumberUrl}) whenever it's useful, no call needed. Just reply if you'd rather talk through EHR integration first.\n\nTeam AiFax${textFooter(
        ctx
      )}`
  }
];

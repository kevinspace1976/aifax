"use client";

// Scripted FAQ chat for AiFax - same pattern as the Med Care Outreach and
// Healthcare Utilizations site assistants: a fixed set of vetted answers with
// quick-reply chips and a keyword router. No LLM, no external calls, nothing
// invented. Content mirrors the phone assistant's constraints: real pricing
// only, AI features start at Plus, EHR integration is scoped by EMAIL (kept on
// record), no competitor talk, no PHI collected.

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const EMAIL = "info@aifax.net";
const PHONE = "954-872-1918";

const FAQ: Record<string, { chip: string; answer: string }> = {
  whatis: {
    chip: "What is AiFax?",
    answer:
      "AiFax is a HIPAA-compliant online fax service with AI built in. Every inbound fax arrives already read and summarized, auto-labeled with the patient's name and date of birth, so your staff stops opening PDFs just to find out who a fax is about. You can send faxes from email, the dashboard, or your phone's browser. Porting your existing number is free, and your BAA is executed at signup."
  },
  pricing: {
    chip: "Pricing & plans",
    answer:
      "All plans are month to month with no contract, free number porting, 24/7 support, and 5 cents per page over your allowance (service never stops mid-month). Annual billing saves about 17%.\n\nLite - $9.99/mo: 250 pages, fax only (no AI features).\nPlus - $29.99/mo (most popular): 500 pages, AI summary on every inbound fax with patient name and DOB labeling, plus the document chatbot (about 10 documents / 250 questions). The AI features start here.\nPro - $44.99/mo: 1,000 pages and a larger chatbot (about 50 documents / 500 questions).\nEnterprise - $69.99/mo: 1,500 pages and the largest chatbot (about 100 documents / 1,000 questions).\nCorporate: custom pricing for higher volume - email us at " +
      EMAIL +
      ".\n\nFull details and signup are on the Pricing page."
  },
  ehr: {
    chip: "EHR integration",
    answer:
      "EHR integration is available - AI summaries can be delivered into email, SMS, or your EHR/EMR/CRM, scoped to your workflow. It starts with a short discovery over email so everything is scoped in writing and kept on record: email us at " +
      EMAIL +
      " with the EHR you use and what you want the faxes to do, and our team will map it out with you."
  },
  switching: {
    chip: "Switching / porting",
    answer:
      "Switching is painless. We port your existing fax number for free, and your old service stays live until the day the port completes, so you never miss a fax. Porting typically takes 1-2 weeks depending on the carrier, and we manage the carrier end-to-end. Your BAA is executed electronically the moment you sign up."
  },
  hipaa: {
    chip: "HIPAA & security",
    answer:
      "AiFax is compliance-first: HIPAA-compliant architecture, secure transmission, and encryption for data in transit and storage. A Business Associate Agreement (BAA) is executed electronically at signup, and a countersigned copy is available on request."
  },
  contact: {
    chip: "Contact us",
    answer:
      "The best way to reach us is email - it keeps everything on record: " +
      EMAIL +
      ". You can also call " +
      PHONE +
      " and our receptionist will take your details. For pricing questions, integration, or anything in writing, email is fastest."
  }
};

const DEFAULT_CHIPS = ["whatis", "pricing", "ehr", "switching", "hipaa", "contact"];

function route(input: string): string | "fallback" | "guard" {
  const t = input.toLowerCase();
  if (/(ssn|social security|credit card|card number|password|patient (record|chart)|medical record|diagnos)/.test(t))
    return "guard";
  if (/(price|pricing|cost|how much|plan|monthly|fee|cheap|rate)/.test(t)) return "pricing";
  if (/(ehr|emr|epic|cerner|athena|office ally|practice fusion|integrat|api|crm)/.test(t)) return "ehr";
  if (/(port|switch|transfer|move|keep my number|existing number|efax|current provider)/.test(t)) return "switching";
  if (/(hipaa|baa|secur|complian|encrypt|privacy|phi)/.test(t)) return "hipaa";
  if (/(contact|email|phone|call|reach|talk|human|person|sales)/.test(t)) return "contact";
  if (/(what|how (do|does)|about|explain|tell me|overview|fax)/.test(t)) return "whatis";
  return "fallback";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([
        {
          from: "bot",
          text:
            "Hi, I'm Kyle, the AiFax assistant. I can answer questions about what AiFax does, pricing, EHR integration, switching, and HIPAA compliance. Pick a topic below or type a question.\n\nPlease don't share any patient information (PHI) in this chat."
        }
      ]);
    }
  }, [open, msgs.length]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    // Scroll so the most recent USER message sits at the top of the window -
    // long answers (like pricing) then read from their first line instead of
    // landing mid-answer with the top cut off.
    const users = log.querySelectorAll<HTMLElement>('[data-from="user"]');
    const last = users[users.length - 1];
    if (last) log.scrollTo({ top: Math.max(0, last.offsetTop - 12) });
    else log.scrollTo({ top: log.scrollHeight });
  }, [msgs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function answer(key: string, userText: string) {
    const next: Msg[] = [...msgs, { from: "user", text: userText }];
    if (key === "guard") {
      next.push({
        from: "bot",
        text:
          "For privacy, please don't share patient information or other sensitive details here. For anything account-specific, email us at " +
          EMAIL +
          " and our team will help directly."
      });
    } else if (key === "fallback") {
      next.push({
        from: "bot",
        text:
          "I may not have that exact answer - I can help with what AiFax does, pricing and plans, EHR integration, switching or porting your number, and HIPAA compliance. For anything else, email us at " +
          EMAIL +
          " and the team will follow up in writing."
      });
    } else {
      next.push({ from: "bot", text: FAQ[key].answer });
    }
    setMsgs(next);
  }

  function onChip(key: string) {
    answer(key, FAQ[key].chip);
  }

  function onSend() {
    const t = input.trim();
    if (!t) return;
    setInput("");
    answer(route(t), t);
  }

  return (
    <>
      <button
        ref={launcherRef}
        aria-label={open ? "Close AiFax chat" : "Chat with AiFax"}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-slate-950/50 transition hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="AiFax chat assistant"
          className="fixed bottom-24 right-5 z-50 flex h-[min(85vh,760px)] w-[min(94vw,400px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/40"
        >
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              Chat with Ai<span className="text-orange-400">Fax</span>
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
              Automated assistant with preset answers. Please do not share patient information (PHI) here.
            </p>
          </div>

          <div ref={logRef} className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                data-from={m.from}
                className={
                  m.from === "bot"
                    ? "max-w-[88%] whitespace-pre-line rounded-xl rounded-tl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800"
                    : "ml-auto max-w-[88%] whitespace-pre-line rounded-xl rounded-tr-sm bg-orange-500/90 px-3 py-2 text-sm text-white"
                }
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {DEFAULT_CHIPS.map((k) => (
                <button
                  key={k}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
                  onClick={() => onChip(k)}
                >
                  {FAQ[k].chip}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-3 py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
              placeholder="Type a question..."
              aria-label="Type a question for the AiFax assistant"
              className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
            />
            <button
              aria-label="Send message"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-400"
              onClick={onSend}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

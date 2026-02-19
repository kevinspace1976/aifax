import { PageHero } from "@/components/page-hero";

const items = [
  {
    title: "Connect your fax line",
    description: "Start with a new number, keep your existing eFax number, or port your current line to AiFax."
  },
  {
    title: "Define your AI logic",
    description: "Use custom prompts and extraction rules tailored to your business workflows and terminology."
  },
  {
    title: "Automate routing and summaries",
    description: "Incoming faxes are summarized instantly and delivered to your preferred channels and systems."
  },
  {
    title: "Scale with analytics",
    description: "Monitor activity from a dashboard and continuously optimize processing speed and quality."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        title="How AiFax Works"
        description="A simple process that replaces repetitive manual fax handling with secure, AI-powered automation."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, idx) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm font-semibold text-orange-400">Step {idx + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

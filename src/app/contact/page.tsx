import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        description="Learn how AiFax can support your business with secure fax automation and AI implementation."
      />
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <form className="space-y-4 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="First Name" />
            <input className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Last Name" />
          </div>
          <input className="w-full rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Email" />
          <textarea className="h-36 w-full rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Your Message" />
          <button type="button" className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

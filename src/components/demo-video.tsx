import { demoVideoLink } from "@/lib/site";

function toEmbedUrl(link: string): string | null {
  try {
    const url = new URL(link);
    let id: string | null = null;
    if (url.hostname.includes("youtu.be")) id = url.pathname.replace("/", "");
    else if (url.hostname.includes("youtube.com")) id = url.searchParams.get("v");
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null;
  } catch {
    return null;
  }
}

/** Inline 16:9 embed of the product demo, lazy-loaded so it costs nothing until scrolled to. */
export function DemoVideo({ caption = "Watch how a fax goes from arrival to a matched, summarized document." }: { caption?: string }) {
  const src = toEmbedUrl(demoVideoLink);
  if (!src) return null;
  return (
    <figure className="m-0">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
        <iframe
          className="h-full w-full"
          src={src}
          title="See AiFax in action"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-2 text-sm text-slate-500">{caption}</figcaption>
    </figure>
  );
}

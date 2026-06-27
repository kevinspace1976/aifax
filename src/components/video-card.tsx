"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

type VideoCardProps = {
  embedUrl: string;
};

function thumbnailFromEmbed(embedUrl: string): string | null {
  try {
    const url = new URL(embedUrl);
    const id = url.pathname.split("/embed/")[1]?.split(/[/?]/)[0];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

export function VideoCard({ embedUrl }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const thumbnail = thumbnailFromEmbed(embedUrl);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play the AiFax product demo video"
        className="card-surface interactive group block w-full overflow-hidden p-0 text-left"
      >
        <div className="relative aspect-video w-full">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-slate-800" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-slate-950/45 transition group-hover:bg-slate-950/25">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition group-hover:bg-orange-400">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
            </span>
          </span>
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-white">See AiFax in Action</p>
          <p className="text-xs text-slate-400">Watch the demo</p>
        </div>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AiFax product demo video"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-11 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <iframe
                className="h-full w-full"
                src={`${embedUrl}?autoplay=1`}
                title="AiFax Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

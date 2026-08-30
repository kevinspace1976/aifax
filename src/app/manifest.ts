import type { MetadataRoute } from "next";
import { brand } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} - ${brand.tagline}`,
    short_name: brand.name,
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}

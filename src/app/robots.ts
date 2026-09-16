import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/unsubscribed"]
      }
    ],
    sitemap: "https://www.aifax.net/sitemap.xml"
  };
}

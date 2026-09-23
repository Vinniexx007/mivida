import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { legalNav } from "@/lib/legal";

/**
 * Generates /sitemap.xml at build time. Uses the canonical site URL from the
 * central site config so it stays in sync with the rest of the app.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    ...legalNav.map((entry) => ({
      path: new URL(entry.href, site.url).pathname,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

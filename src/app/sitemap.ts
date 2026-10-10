import type { MetadataRoute } from "next";
import { currentSearchCatalog, searchUrls } from "@/lib/seo/indexability";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return searchUrls(currentSearchCatalog()).map((entry) => ({
    url: entry.loc,
    alternates: { languages: entry.languages },
  }));
}

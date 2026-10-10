/**
 * A public origin is set only when the owner supplies an https site URL.
 * Paths, queries, and credentials are rejected so metadata cannot point at a private host.
 */
export function publicSiteOrigin(raw: string | null | undefined = process.env.NEXT_PUBLIC_SITE_URL): string | null {
  if (!raw?.trim()) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password || url.search || url.hash) return null;
  if (url.pathname !== "/" && url.pathname !== "") return null;
  return url.origin;
}

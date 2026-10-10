import { getPublicContact, getPublicIdentityClaims } from "@/content/retrieve";
import { publicSiteOrigin } from "@/lib/seo/origin";

/**
 * Organization data is limited to established public claims.
 * Address, opening hours, ratings, and reviews are omitted until those facts exist.
 */
export function organizationJsonLd(origin: string | null = publicSiteOrigin()): Record<string, unknown> | null {
  const name = getPublicIdentityClaims().find((claim) => claim.id === "public-name")?.value;
  if (!name || !origin) return null;

  const contact = getPublicContact();
  const email = contact.find((channel) => channel.kind === "email")?.value;
  const telephone = contact.find((channel) => channel.kind === "phone")?.value;
  const graph: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: origin,
  };
  if (email) graph.email = email;
  if (telephone) graph.telephone = telephone;
  return graph;
}

/**
 * Google Business Profile needs a confirmed public location or a defined service area.
 * Neither is on file, so a listing must not be created from this website.
 */
export function googleBusinessProfileAssessment() {
  const contact = getPublicContact();
  const hasVerifiedAddress = contact.some((channel) => channel.kind === "address");
  const hasVerifiedServiceArea = contact.some((channel) => channel.kind === "service-area");
  return {
    publishListing: false,
    hasVerifiedAddress,
    hasVerifiedServiceArea,
    note: "No verified street address or service area is on file. Do not add a city, a street address, a rating, or a customer review.",
  };
}

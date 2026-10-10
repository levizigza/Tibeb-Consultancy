"use client";

import { usePathname } from "next/navigation";
import { buildBreadcrumbs } from "@/components/layout/breadcrumbs";
import { InlineLink } from "@/components/ui/link";
import type { LocaleCode } from "@/i18n/locales";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/json-ld";

export function BreadcrumbNav({
  locale,
  origin,
}: {
  locale: LocaleCode;
  origin: string | null;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const crumbs = buildBreadcrumbs(pathname);
  if (crumbs.length === 0) return null;
  const structured = breadcrumbJsonLd(crumbs, origin);

  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-page px-gutter pt-lg sm:px-gutter-lg">
      {structured ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(structured) }} />
      ) : null}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta">
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              ) : null}
              {current ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <InlineLink href={crumb.path}>{crumb.label}</InlineLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

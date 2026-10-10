import Link from "next/link";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { ContactCta } from "@/components/layout/contact-cta";
import { primaryNavigation, serviceFamilies } from "@/content/site/information-architecture";
import { previewCopy } from "@/content/translations/preview";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";
import { resolveChrome } from "@/i18n/messages/resolve";

export function SiteFooter({ locale }: { locale: LocaleCode }) {
  const chrome = resolveChrome(locale).messages;

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-page gap-3xl px-gutter py-3xl sm:px-gutter-lg md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        <BrandLockup locale={locale} />
        <nav aria-label={chrome.footerNav}>
          <h2 className="text-meta font-semibold">{chrome.pages}</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={replaceLocaleInPath(item.path, locale)}
                  className="block min-h-11 w-full max-w-full py-2 font-medium underline-offset-4 hover:underline"
                >
                  {chrome.nav[item.id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={chrome.serviceGroups}>
          <h2 className="text-meta font-semibold">{chrome.serviceGroups}</h2>
          <p className="mt-2 text-meta text-muted">These groups are a map. They are not work you can buy.</p>
          <ul className="mt-3 flex flex-col gap-1">
            {serviceFamilies.map((family) => (
              <li key={family.id}>
                <Link
                  href={replaceLocaleInPath(family.path, locale)}
                  className="block min-h-11 w-full max-w-full py-2 font-medium underline-offset-4 hover:underline"
                >
                  {family.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-6">
          <ContactCta locale={locale} quiet />
          <Link
            href={replaceLocaleInPath(previewCopy.documentationPath, locale)}
            className="block min-h-11 w-full max-w-full py-2 font-medium text-link underline decoration-link/40 underline-offset-4"
          >
            {previewCopy.documentationLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}

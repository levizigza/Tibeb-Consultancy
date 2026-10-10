import { SealRule } from "@/components/brand/seal-rule";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { SiteNavigationClient } from "@/components/layout/site-navigation";
import type { LocaleCode } from "@/i18n/locales";

export function SiteHeader({ locale }: { locale: LocaleCode }) {
  return (
    <header className="bg-background">
      <div className="mx-auto flex w-full min-w-0 max-w-page flex-wrap items-start justify-between gap-4 px-gutter py-3 sm:px-gutter-lg">
        <BrandLockup locale={locale} />
        <SiteNavigationClient locale={locale} />
      </div>
      <SealRule />
    </header>
  );
}

import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { notoSansEthiopic } from "@/app/fonts";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TranslationFallback } from "@/components/layout/translation-fallback";
import { documentLanguage } from "@/i18n/document-language";
import { locales } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { publicSiteOrigin } from "@/lib/seo/origin";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const renderedLanguage = documentLanguage(locale);
  const renderedScript = locales.find((item) => item.code === renderedLanguage)?.script;

  return (
    <div
      lang={renderedLanguage}
      className={[
        "flex flex-1 flex-col",
        renderedScript === "ethiopic" ? notoSansEthiopic.className : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteHeader locale={locale} />
      <main id="main" tabIndex={-1} className="flex-1">
        <TranslationFallback locale={locale} />
        <BreadcrumbNav locale={locale} origin={publicSiteOrigin()} />
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

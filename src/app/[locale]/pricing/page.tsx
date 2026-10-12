import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { PriceStatusList } from "@/components/pricing/price-status-list";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { SectionRule } from "@/components/sections/section-rule";
import { rhythm } from "@/components/sections/rhythm";
import { TextLink } from "@/components/ui/text-link";
import { getPublicPricePresentations, pricingPage } from "@/content/services/price-presentation";
import { staticPages } from "@/content/site/information-architecture";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const page = staticPages.find((item) => item.id === "pricing");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, page?.path ?? "/pricing", page?.label ?? pricingPage.title, pricingPage.lede);
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  return PricingContent({ params });
}

async function PricingContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !page) notFound();
  const prices = getPublicPricePresentations();

  return (
    <>
      <PageHeader title={page.label} lede={pricingPage.lede} />
      <section aria-labelledby="fee-information" className={`${rhythm.grid} border-t border-line`}>
        <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
          <h2 id="fee-information" className="text-heading font-semibold">
            Fee information
          </h2>
          <SectionRule />
          <p className="mt-4 max-w-content text-body">{pricingPage.governmentFee}</p>
          <div className="mt-xl">
            <PriceStatusList items={prices} />
          </div>
        </div>
      </section>
      <QuietEditorialSection id="pricing-related" title="Related pages">
        <ul className="flex flex-col gap-2">
          <li>
            <TextLink href="/how-it-works" locale={locale}>
              How it works
            </TextLink>
          </li>
          <li>
            <TextLink href="/resources" locale={locale}>
              Questions
            </TextLink>
          </li>
          <li>
            <TextLink href="/services" locale={locale}>
              Services
            </TextLink>
          </li>
        </ul>
      </QuietEditorialSection>
      <FinalCtaSection
        id="pricing-contact"
        title="Contact"
        text="Write from the Contact page. This page does not send a message."
        action={{ href: replaceLocaleInPath("/contact", locale), label: "Contact" }}
      />
    </>
  );
}

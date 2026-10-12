import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { MaterialFrame } from "@/components/sections/material-frame";
import { SectionRule } from "@/components/sections/section-rule";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { staticPages } from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { replaceLocaleInPath } from "@/i18n/href";
import { pageStills } from "@/content/site/work-stills";
import { inquiryMessages } from "@/lib/inquiry/messages";
import { submitInquiry } from "@/lib/inquiry/action";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const page = staticPages.find((item) => item.id === "contact");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, page?.path ?? "/contact", page?.label ?? "Contact", page?.message);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return ContactContent({ params });
}

async function ContactContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !page) notFound();
  const action = process.env.GITHUB_PAGES === "true" ? undefined : submitInquiry;

  return (
    <>
      <PageHeader title={page.label} lede={page.message} />
      <section aria-labelledby="general-inquiry" className="border-t border-line">
        <div className="mx-auto grid w-full max-w-page grid-cols-1 items-start gap-xl px-gutter py-2xl sm:px-gutter-lg lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)]">
          <div className="max-w-content">
            <h2 id="general-inquiry" className="text-heading font-semibold" data-motion="enter">
              {inquiryMessages.heading}
            </h2>
            <SectionRule />
            <p id="inquiry-instructions" className="mt-4 text-body" data-motion="fade">
              {inquiryMessages.instructions}
            </p>
            <div className="mt-xl">
              <InquiryForm locale={locale} action={action} />
            </div>
          </div>
          <div data-motion="lift">
          <MaterialFrame
            src={pageStills.room.src}
            alt={pageStills.room.alt}
            caption={pageStills.room.caption}
            width={pageStills.room.width}
            height={pageStills.room.height}
            sizes="(min-width: 64rem) 32rem, 100vw"
            aspect="aspect-[4/3]"
          />
          </div>
        </div>
      </section>
      <FinalCtaSection
        id="contact-next"
        title="How it works"
        text="Read how a matter proceeds after you write."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
          label: scaffoldCopy.primaryCta.label,
        }}
      />
    </>
  );
}

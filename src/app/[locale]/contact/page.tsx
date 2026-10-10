import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { staticPages } from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { replaceLocaleInPath } from "@/i18n/href";
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
      <section aria-labelledby="general-inquiry" className="mx-auto w-full max-w-page px-gutter py-2xl sm:px-gutter-lg">
        <div className="max-w-content">
          <h2 id="general-inquiry" className="text-heading font-semibold">
            {inquiryMessages.heading}
          </h2>
          <p id="inquiry-instructions" className="mt-4 text-body">
            {inquiryMessages.instructions}
          </p>
          <div className="mt-xl">
            <InquiryForm locale={locale} action={action} />
          </div>
        </div>
      </section>
      <FinalCtaSection
        id="contact-next"
        title="How the map is meant to be read"
        text="The inquiry form does not start the stages on the next page."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
          label: scaffoldCopy.primaryCta.label,
        }}
      />
    </>
  );
}

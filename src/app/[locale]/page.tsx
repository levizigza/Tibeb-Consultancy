import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { notoSansEthiopic } from "@/app/fonts";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { ServiceGridSection } from "@/components/sections/service-grid-section";
import { StillRow } from "@/components/sections/still-row";
import { InlineLink } from "@/components/ui/link";
import { businessProfile } from "@/content/business/profile";
import { previewCopy } from "@/content/translations/preview";
import {
  getPublicConsultationLanguages,
  getPublicCredentials,
  getPublicDisclosures,
  getPublicFaqs,
  getPublicTestimonials,
} from "@/content/retrieve";
import { serviceFamilies } from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { serviceStills } from "@/content/site/work-stills";
import { homePage } from "@/content/translations/home";
import { replaceLocaleInPath } from "@/i18n/href";
import { locales, translationStatusLabel } from "@/i18n/locales";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, "/", { absolute: homePage.title }, homePage.description);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  return HomeContent({ params });
}

async function HomeContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const testimonials = getPublicTestimonials();
  const credentials = getPublicCredentials();
  const consultationLanguages = getPublicConsultationLanguages();
  const governmentStatements = getPublicDisclosures().filter(
    (item) => item.topic === "government-affiliation",
  );
  const faqs = getPublicFaqs(locale);

  return (
    <>
      <HeroSection
        title={homePage.title}
        lede={businessProfile.positioning.text}
        notice={homePage.aboutDraftNote}
        limit={previewCopy.statusBody}
        actions={[
          {
            href: replaceLocaleInPath(homePage.contactPath, locale),
            label: homePage.contactLabel,
          },
          {
            href: replaceLocaleInPath(homePage.servicesPath, locale),
            label: homePage.servicesLabel,
            variant: "secondary",
          },
        ]}
      />

      <QuietEditorialSection id="trust" title={homePage.trustTitle}>
        <p>{homePage.trustIntro}</p>
        <ul className="flex flex-col gap-3">
          {locales.map((item) => (
            <li
              key={item.code}
              className="flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between"
            >
              <InlineLink href={replaceLocaleInPath("/", item.code)} hrefLang={item.code}>
                <span
                  lang={item.code}
                  className={item.script === "ethiopic" ? notoSansEthiopic.className : undefined}
                >
                  {item.endonym}
                </span>
                {item.endonym === item.englishName ? null : (
                  <span className="font-normal text-muted"> ({item.englishName})</span>
                )}
              </InlineLink>
              <span className="max-w-full text-meta text-muted">{translationStatusLabel[item.translationStatus]}</span>
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border-t border-line pt-3">
            <dt className="text-meta text-muted">{homePage.credentialLabel}</dt>
            <dd className="mt-1 font-medium">
              {credentials.length === 0
                ? homePage.credentialValue
                : credentials.map((item) => `${item.title}, ${item.issuer}`).join("; ")}
            </dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="text-meta text-muted">{homePage.governmentLabel}</dt>
            <dd className="mt-1 font-medium">
              {governmentStatements.length === 0
                ? homePage.governmentValue
                : governmentStatements.map((item) => item.statement).join(" ")}
            </dd>
          </div>
        </dl>
        <p>{homePage.supportBody}</p>
      </QuietEditorialSection>

      <ServiceGridSection
        id="services"
        title={homePage.servicesTitle}
        intro={homePage.servicesIntro}
        items={serviceFamilies.map((family) => ({
          href: replaceLocaleInPath(family.path, locale),
          title: family.label,
          detail: family.restriction,
          status: homePage.closedStatus,
          image: serviceStills[family.id],
        }))}
      />

      <ProcessSection
        id="how-it-works"
        title={homePage.howTitle}
        intro={homePage.howIntro}
        steps={scaffoldCopy.howItWorksSteps}
      />

      <StillRow locale={locale} />

      <QuietEditorialSection id="about" title={homePage.aboutTitle}>
        <h3 className="text-heading-sm font-semibold">{homePage.aboutDraftLabel}</h3>
        <p>{businessProfile.positioning.text}</p>
        <p className="text-meta text-muted">{homePage.aboutDraftNote}</p>
        <p>{homePage.aboutFounder}</p>
        <h3 className="text-heading-sm font-semibold">{homePage.evidenceTitle}</h3>
        {testimonials.length === 0 ? <p>{homePage.evidenceEmpty}</p> : null}
        {testimonials.map((item) => (
          <figure key={item.id} className="border-l-4 border-foreground pl-4">
            <blockquote>{item.quote}</blockquote>
            <figcaption className="mt-2 text-meta text-muted">{item.attribution}</figcaption>
          </figure>
        ))}
        {consultationLanguages.length > 0 ? (
          <>
            <h3 className="text-heading-sm font-semibold">{homePage.supportTitle}</h3>
            <p>{homePage.supportListLead}</p>
            <ul className="flex flex-col gap-2">
              {consultationLanguages.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </>
        ) : null}
      </QuietEditorialSection>

      <FaqSection
        id="questions"
        title={homePage.faqTitle}
        items={faqs}
        empty={homePage.faqEmpty}
        emptyLink={{ href: replaceLocaleInPath("/resources", locale), label: "Resources" }}
      />

      <FinalCtaSection
        id="contact"
        title={homePage.ctaTitle}
        text={homePage.ctaText}
        action={{
          href: replaceLocaleInPath(homePage.contactPath, locale),
          label: homePage.contactLabel,
        }}
      />
    </>
  );
}

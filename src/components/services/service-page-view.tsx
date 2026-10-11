import { FileMark } from "@/components/brand/file-mark";
import Link from "next/link";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ProcessSection } from "@/components/sections/process-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { PageHeader } from "@/components/layout/page-header";
import { TextLink } from "@/components/ui/text-link";
import { linkClassName } from "@/components/ui/link";
import type { ServicePageModel } from "@/content/services/page-model";
import { rhythm } from "@/components/sections/rhythm";
import type { LocaleCode } from "@/i18n/locales";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 ps-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SourceList({
  id,
  title,
  intro,
  sources,
}: {
  id: string;
  title: string;
  intro: string;
  sources: { title: string; publisher: string; url: string }[];
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.quiet} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          <div className="flex items-start gap-4">
            <FileMark />
            <h2 id={id} className="min-w-0 text-heading font-semibold" data-motion="enter">
              {title}
            </h2>
          </div>
          <p className="mt-4 text-body">{intro}</p>
          <ul className="mt-4 flex flex-col gap-4 border-t border-line pt-4">
            {sources.map((source) => (
              <li key={source.url} data-motion="file">
                <a href={source.url} className={`${linkClassName} inline-flex min-h-11 items-center`} rel="noreferrer">
                  {source.title}
                </a>
                <p className="mt-1 text-meta text-muted">{source.publisher}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RelatedList({
  title,
  items,
}: {
  title: string;
  items: { href: string; title: string; status: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <QuietEditorialSection id="related-services" title={title}>
      <ul className="flex flex-col gap-3 border-t border-line pt-4">
        {items.map((item) => (
          <li key={item.href} className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
            <Link href={item.href} className={linkClassName}>
              {item.title}
            </Link>
            <span className="max-w-full text-meta text-muted">{item.status}</span>
          </li>
        ))}
      </ul>
    </QuietEditorialSection>
  );
}

export function ServicePageView({ model, locale }: { model: ServicePageModel; locale: LocaleCode }) {
  if (model.mode === "closed") {
    return (
      <>
        <PageHeader title={model.title} lede={model.lede} />
        <QuietEditorialSection id="service-status" title={model.statusTitle}>
          <p>{model.statusBody}</p>
          <p>
            <TextLink href="/how-it-works" locale={locale}>
              {model.howItWorksLabel}
            </TextLink>
          </p>
        </QuietEditorialSection>
        <SourceList id="official-sources" title="Official pages" intro={model.sourcesIntro} sources={model.sources} />
        <RelatedList title={model.relatedTitle} items={model.related} />
        <FinalCtaSection id="service-next" title={model.ctaTitle} text={model.ctaText} action={model.cta} />
      </>
    );
  }

  const page = model.page;
  return (
    <>
      <PageHeader title={model.title} lede={model.lede} />
      <QuietEditorialSection id="service-audience" title="Who it is for">
        <p>{page.audience}</p>
      </QuietEditorialSection>
      <QuietEditorialSection id="service-problem" title="The problem">
        <p>{page.problem}</p>
      </QuietEditorialSection>
      <QuietEditorialSection id="service-deliverables" title="What you receive">
        <BulletList items={page.deliverables} />
      </QuietEditorialSection>
      <QuietEditorialSection id="service-scope" title="Scope">
        <h3 className="text-body font-semibold">Included</h3>
        <BulletList items={page.inclusions} />
        <h3 className="text-body font-semibold">Not included</h3>
        <BulletList items={page.exclusions} />
      </QuietEditorialSection>
      <QuietEditorialSection id="service-information" title="Information needed">
        <BulletList items={page.requiredInformation} />
      </QuietEditorialSection>
      <ProcessSection id="service-process" title="Process" steps={page.steps} />
      <QuietEditorialSection id="service-price" title="Price">
        <p>{page.priceNote}</p>
        {page.turnaround ? (
          <>
            <h3 className="text-body font-semibold">Turnaround</h3>
            <p>{page.turnaround}</p>
          </>
        ) : (
          <p>No turnaround time is confirmed.</p>
        )}
      </QuietEditorialSection>
      <FaqSection
        id="service-questions"
        title="Questions"
        items={page.faqs.map((item, index) => ({
          id: `${page.id}-faq-${index}`,
          question: item.question,
          answer: item.answer,
        }))}
        empty="No questions are approved for this service."
      />
      <QuietEditorialSection id="service-disclosures" title="Disclosures">
        <BulletList items={page.disclosures} />
      </QuietEditorialSection>
      <SourceList
        id="official-sources"
        title="Official pages"
        intro="Government or regulator pages cited for this service. This site does not restate their rules as its own."
        sources={page.sources}
      />
      <RelatedList title={model.relatedTitle} items={model.related} />
      <FinalCtaSection id="service-next" title={model.ctaTitle} text={model.ctaText} action={model.cta} />
    </>
  );
}

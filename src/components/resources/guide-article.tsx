import { linkClassName } from "@/components/ui/link";
import { TextLink } from "@/components/ui/text-link";
import { resourceMessagesForLocale } from "@/content/resources/messages";
import type { GuidePresentation } from "@/content/resources/publication";
import type { LocaleCode } from "@/i18n/locales";

function dateText(value: string | null, empty: string): string {
  return value ?? empty;
}

export function GuideArticle({ guide, locale }: { guide: GuidePresentation; locale: LocaleCode }) {
  const messages = resourceMessagesForLocale(locale);
  const status = guide.published ? messages.statusPublished : messages.statusNotPublished;

  return (
    <article lang="en" className="mx-auto w-full max-w-page px-gutter py-2xl sm:px-gutter-lg md:py-3xl">
      <div className="max-w-content">
        <p className="text-meta font-medium text-muted">{guide.categoryLabel}</p>
        <h1 className="mt-3 text-title font-semibold tracking-tight">{guide.title}</h1>
        <p className="mt-lg text-body-lg">{guide.summary}</p>
        <dl className="mt-xl grid grid-cols-1 gap-4 border-t border-line pt-lg sm:grid-cols-2">
          <div>
            <dt className="text-meta text-muted">{messages.statusLabel}</dt>
            <dd className="mt-1 font-medium">{status}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.reviewerLabel}</dt>
            <dd className="mt-1 font-medium">{guide.reviewer ?? messages.reviewerEmpty}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.audienceLabel}</dt>
            <dd className="mt-1">{guide.audience}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.localeLabel}</dt>
            <dd className="mt-1">{guide.translationStatus === "source" ? messages.translationSource : messages.translationMissing}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.publishedLabel}</dt>
            <dd className="mt-1">{dateText(guide.publishedOn, messages.dateEmpty)}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.reviewedLabel}</dt>
            <dd className="mt-1">{dateText(guide.lastReviewed, messages.dateEmpty)}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted">{messages.nextReviewLabel}</dt>
            <dd className="mt-1">{dateText(guide.nextReview, messages.dateEmpty)}</dd>
          </div>
        </dl>
        {guide.requiresProfessionalReview && !guide.published ? <p className="mt-lg text-body">{messages.professional}</p> : null}

        {guide.published ? (
          guide.sections.map((section) => (
            <section key={section.id} aria-labelledby={`${guide.id}-${section.id}`} className="mt-2xl">
              <h2 id={`${guide.id}-${section.id}`} className="text-heading font-semibold">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-body">
                  {paragraph}
                </p>
              ))}
            </section>
          ))
        ) : (
          <p className="mt-2xl text-body">{messages.withheld}</p>
        )}

        {guide.sources.length > 0 ? (
          <section aria-labelledby={`${guide.id}-sources`} className="mt-2xl border-t border-line pt-lg">
            <h2 id={`${guide.id}-sources`} className="text-heading font-semibold">
              {messages.sourcesHeading}
            </h2>
            <p className="mt-4 text-body">{messages.sourcesNote}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {guide.sources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    className={`${linkClassName} inline-flex min-h-11 items-center`}
                  >
                    {source.title}
                  </a>
                  <p className="text-meta text-muted">
                    {source.publisher}. Accessed {source.accessedOn}.
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {guide.related.length > 0 ? (
          <section aria-labelledby={`${guide.id}-related`} className="mt-2xl border-t border-line pt-lg">
            <h2 id={`${guide.id}-related`} className="text-heading font-semibold">
              {messages.relatedHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {guide.related.map((link) => (
                <li key={link.path}>
                  <TextLink href={link.path} locale={locale}>
                    {link.title}
                  </TextLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {guide.siteLinks.length > 0 ? (
          <section aria-labelledby={`${guide.id}-site`} className="mt-xl">
            <h2 id={`${guide.id}-site`} className="text-heading font-semibold">
              {messages.alsoHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {guide.siteLinks.map((link) => (
                <li key={link.path}>
                  <TextLink href={link.path} locale={locale}>
                    {link.title}
                  </TextLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

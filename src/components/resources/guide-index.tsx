"use client";

import { useState } from "react";
import { TextLink } from "@/components/ui/text-link";
import { rhythm } from "@/components/sections/rhythm";
import { resourceCategories } from "@/content/resources/categories";
import { resourceMessagesForLocale } from "@/content/resources/messages";
import type { GuidePresentation } from "@/content/resources/publication";
import type { ResourceCategoryId } from "@/content/resources/schema";
import type { LocaleCode } from "@/i18n/locales";

export function GuideIndex({
  locale,
  guides,
}: {
  locale: LocaleCode;
  guides: readonly GuidePresentation[];
}) {
  const messages = resourceMessagesForLocale(locale);
  const [category, setCategory] = useState<"all" | ResourceCategoryId>("all");
  const visible = guides.filter((guide) => category === "all" || guide.categoryId === category);
  const published = visible.filter((guide) => guide.published);
  const review = visible.filter((guide) => !guide.published);

  return (
    <section aria-labelledby="resource-guides" lang="en" className={`${rhythm.grid} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <h2 id="resource-guides" className="text-heading font-semibold">
          {messages.filterLabel}
        </h2>
        <div role="group" aria-labelledby="resource-guides" className="mt-lg flex flex-col gap-sm sm:flex-row sm:flex-wrap">
          <FilterButton pressed={category === "all"} onClick={() => setCategory("all")}>
            {messages.allCategories}
          </FilterButton>
          {resourceCategories.map((item) => (
            <FilterButton key={item.id} pressed={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}
            </FilterButton>
          ))}
        </div>

        <div className="mt-2xl max-w-content">
          <h3 className="text-heading-sm font-semibold">{messages.publishedHeading}</h3>
          {published.length === 0 ? <p className="mt-4 text-body">{messages.emptyPublished}</p> : <GuideList guides={published} locale={locale} />}
        </div>
        <div className="mt-2xl max-w-content">
          <h3 className="text-heading-sm font-semibold">{messages.reviewHeading}</h3>
          {review.length === 0 ? <p className="mt-4 text-body">{messages.emptyReview}</p> : <GuideList guides={review} locale={locale} />}
        </div>
      </div>
    </section>
  );
}

function GuideList({ guides, locale }: { guides: readonly GuidePresentation[]; locale: LocaleCode }) {
  const messages = resourceMessagesForLocale(locale);
  return (
    <ul className="mt-lg flex flex-col gap-sm">
      {guides.map((guide) => (
        <li key={guide.id} className="rounded-lg border border-line bg-surface p-lg">
          <h4 className="text-body font-semibold">
            <TextLink href={guide.path} locale={locale}>
              {guide.title}
            </TextLink>
          </h4>
          <p className="mt-2 text-meta text-muted">{guide.categoryLabel}</p>
          <p className="mt-3 text-body">{guide.summary}</p>
          <p className="mt-3 text-meta font-medium">{guide.published ? messages.statusPublished : messages.statusNotPublished}</p>
        </li>
      ))}
    </ul>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="min-h-11 rounded-md border border-line bg-background px-4 text-start text-body font-medium aria-pressed:border-foreground aria-pressed:bg-surface"
    >
      {children}
      {pressed ? <span className="ms-2 text-meta text-muted">Selected</span> : null}
    </button>
  );
}

import type { FaqItem } from "@/components/sections/faq-item";
import { SectionRule } from "@/components/sections/section-rule";
import { rhythm } from "@/components/sections/rhythm";
import { InlineLink } from "@/components/ui/link";

export function FaqSection({
  id,
  title,
  intro,
  items,
  empty,
  emptyLink,
}: {
  id: string;
  title: string;
  intro?: string;
  items: readonly FaqItem[];
  empty: string;
  emptyLink?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.faq} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <h2 id={id} className="text-heading font-semibold" data-motion="enter">
          {title}
        </h2>
        <SectionRule />
        {intro ? <p className="mt-4 max-w-content text-body">{intro}</p> : null}
        <div className="mt-xl">
          {items.length === 0 ? (
            <div className="max-w-content" data-motion="fade">
              <p className="text-body">{empty}</p>
              {emptyLink ? (
                <p className="mt-3">
                  <InlineLink href={emptyLink.href}>{emptyLink.label}</InlineLink>
                </p>
              ) : null}
            </div>
          ) : (
            <div className="flex max-w-content flex-col">
              {items.map((item) => (
                <article key={item.id} aria-labelledby={`${id}-${item.id}`} className="border-t border-line py-lg" data-motion="fade">
                  <h3 id={`${id}-${item.id}`} className="text-heading-sm font-semibold">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-body">{item.answer}</p>
                  {item.links && item.links.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-2">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <InlineLink href={link.href}>{link.label}</InlineLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

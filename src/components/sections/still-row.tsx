import { MaterialFrame } from "@/components/sections/material-frame";
import { SectionRule } from "@/components/sections/section-rule";
import { rhythm } from "@/components/sections/rhythm";
import { TextLink } from "@/components/ui/text-link";
import { illustrativeNotice, pageStills } from "@/content/site/work-stills";
import type { LocaleCode } from "@/i18n/locales";

const stories = [
  { path: "/how-it-works", title: "How it works", still: pageStills.planning },
  { path: "/resources", title: "Resources", still: pageStills.reading },
  { path: "/about", title: "About", still: pageStills.institution },
] as const;

export function StillRow({ locale }: { locale: LocaleCode }) {
  return (
    <section aria-labelledby="illustrative-stills" className={`${rhythm.grid} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <h2 id="illustrative-stills" className="text-heading font-semibold" data-motion="enter">
          Illustrative stills
        </h2>
        <SectionRule />
        <p className="mt-4 max-w-content text-body" data-motion="fade">
          {illustrativeNotice}
        </p>
        <ul className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
          {stories.map((story) => (
            <li key={story.path} data-motion="lift">
              <MaterialFrame
                src={story.still.src}
                alt={story.still.alt}
                caption={story.still.caption}
                width={story.still.width}
                height={story.still.height}
                sizes="(min-width: 48rem) 22rem, 100vw"
                aspect="aspect-[16/10]"
              />
              <p className="mt-3">
                <TextLink href={story.path} locale={locale}>
                  {story.title}
                </TextLink>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

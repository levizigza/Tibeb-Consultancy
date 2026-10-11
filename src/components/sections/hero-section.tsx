import { FileMark } from "@/components/brand/file-mark";
import { MaterialFrame } from "@/components/sections/material-frame";
import { ButtonLink } from "@/components/ui/button";
import { rhythm } from "@/components/sections/rhythm";
import { heroStill } from "@/content/site/work-stills";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function HeroSection({
  eyebrow,
  title,
  lede,
  actions = [],
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  actions?: HeroAction[];
}) {
  return (
    <section className={rhythm.hero}>
      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-start gap-xl px-gutter sm:px-gutter-lg lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="max-w-content">
          {eyebrow ? <p className="text-meta font-medium text-muted">{eyebrow}</p> : null}
          <div className="mt-4 flex items-start gap-4">
            <FileMark className="mt-1 h-16 w-12 sm:h-20 sm:w-14" />
            <h1 className="min-w-0 text-display font-semibold tracking-tight" data-motion="enter">
              {title}
            </h1>
          </div>
          <div className="regal-band mt-6 w-40 max-w-full" aria-hidden="true" data-motion="draw" />
          <p className="mt-lg text-body-lg">{lede}</p>
          {actions.length > 0 ? (
            <div className="mt-xl flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-motion="fade">
              {actions.map((action) => (
                <ButtonLink key={action.href} href={action.href} variant={action.variant ?? "primary"}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
        <MaterialFrame
          src={heroStill.src}
          alt={heroStill.alt}
          caption={heroStill.caption}
          width={heroStill.width}
          height={heroStill.height}
          sizes="(min-width: 64rem) 38vw, 100vw"
          priority
          aspect="aspect-[4/3]"
        />
      </div>
    </section>
  );
}

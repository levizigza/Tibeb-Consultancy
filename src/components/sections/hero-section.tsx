import { MaterialFrame } from "@/components/sections/material-frame";
import { ButtonLink } from "@/components/ui/button";
import { rhythm } from "@/components/sections/rhythm";
import { decorativeStills } from "@/content/site/decorative-stills";

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
  const gold = decorativeStills[0];

  return (
    <section className={rhythm.hero}>
      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-start gap-xl px-gutter sm:px-gutter-lg lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="max-w-content">
          {eyebrow ? <p className="text-meta font-medium text-muted">{eyebrow}</p> : null}
          <h1 className="mt-4 text-display font-semibold tracking-tight" data-motion="enter">
            {title}
          </h1>
          <div className="mt-6 flex w-28 flex-col" aria-hidden="true" data-motion="draw">
            <span className="h-1 bg-curtain" />
            <span className="h-1.5 bg-ornament" />
          </div>
          <p className="mt-lg text-body-lg">{lede}</p>
          {actions.length > 0 ? (
            <div className="mt-xl flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions.map((action) => (
                <ButtonLink key={action.href} href={action.href} variant={action.variant ?? "primary"}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
        <MaterialFrame
          src={gold.src}
          alt={gold.alt}
          caption={gold.caption}
          width={gold.width}
          height={gold.height}
          sizes="(min-width: 64rem) 38vw, 100vw"
          priority
          aspect="aspect-[4/5] lg:aspect-[3/4]"
        />
      </div>
    </section>
  );
}

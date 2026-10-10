import { ButtonLink } from "@/components/ui/button";
import { rhythm } from "@/components/sections/rhythm";

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
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          {eyebrow ? <p className="text-meta font-medium text-muted">{eyebrow}</p> : null}
          <h1 className="mt-4 text-display font-semibold tracking-tight">{title}</h1>
          <div className="mt-6 flex w-16 flex-col gap-1" aria-hidden="true">
            <span className="h-px bg-line" />
            <span className="h-px bg-ornament" />
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
      </div>
    </section>
  );
}

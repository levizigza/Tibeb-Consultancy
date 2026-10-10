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
          <h1 className="mt-3 text-title font-semibold tracking-tight">{title}</h1>
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

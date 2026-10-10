import { ButtonLink } from "@/components/ui/button";
import { rhythm } from "@/components/sections/rhythm";

export function FinalCtaSection({
  id,
  title,
  text,
  action,
}: {
  id: string;
  title: string;
  text: string;
  action: { href: string; label: string };
}) {
  return (
    <section aria-labelledby={id} className="bg-curtain text-curtain-ink">
      <div className="h-1.5 w-full bg-ornament" aria-hidden="true" data-motion="draw" />
      <div className={`${rhythm.cta} mx-auto w-full max-w-page px-gutter sm:px-gutter-lg`}>
        <div className="max-w-content">
          <h2 id={id} className="text-heading font-semibold">
            {title}
          </h2>
          <p className="mt-4 text-body">{text}</p>
          <div className="mt-xl" data-motion="enter">
            <ButtonLink href={action.href} variant="seal">
              {action.label}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="h-1.5 w-full bg-ornament" aria-hidden="true" />
    </section>
  );
}

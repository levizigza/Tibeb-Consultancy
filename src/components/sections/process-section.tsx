import { FileMark } from "@/components/brand/file-mark";
import { rhythm } from "@/components/sections/rhythm";
import { ProcessList, ProcessStep } from "@/components/ui/process-step";
import { TextLink } from "@/components/ui/text-link";
import type { LocaleCode } from "@/i18n/locales";

export type ProcessStepInput =
  | string
  | {
      title: string;
      detail?: string;
      href?: string;
      linkLabel?: string;
    };

function stepContent(step: ProcessStepInput): {
  title: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
} {
  return typeof step === "string" ? { title: step } : step;
}

export function ProcessSection({
  id,
  title,
  intro,
  steps,
  locale,
}: {
  id: string;
  title: string;
  intro?: string;
  steps: readonly ProcessStepInput[];
  locale?: LocaleCode;
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.process} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="flex items-start gap-4">
          <FileMark />
          <h2 id={id} className="min-w-0 text-heading font-semibold" data-motion="enter">
            {title}
          </h2>
        </div>
        {intro ? <p className="mt-4 max-w-content text-body">{intro}</p> : null}
        <div className="mt-xl max-w-content">
          <ProcessList>
            {steps.map((step, index) => {
              const item = stepContent(step);
              return (
                <ProcessStep key={item.title} step={index + 1} title={item.title}>
                  {item.detail}
                  {item.href && item.linkLabel && locale ? (
                    <>
                      {" "}
                      <TextLink href={item.href} locale={locale}>
                        {item.linkLabel}
                      </TextLink>
                    </>
                  ) : null}
                </ProcessStep>
              );
            })}
          </ProcessList>
        </div>
      </div>
    </section>
  );
}

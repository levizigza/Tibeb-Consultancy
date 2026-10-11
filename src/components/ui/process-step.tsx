import type { ReactNode } from "react";

type ProcessStepProps = {
  step: number;
  title: string;
  children?: ReactNode;
};

export function ProcessList({ children }: { children: ReactNode }) {
  return (
    <ol className="process-rail flex flex-col gap-6" data-motion="rail">
      {children}
    </ol>
  );
}

export function ProcessStep({ step, title, children }: ProcessStepProps) {
  return (
    <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-1" data-motion="fade">
      <span
        className="flex size-10 items-center justify-center rounded-full border-2 border-curtain bg-surface text-meta font-semibold text-foreground shadow-[inset_0_-3px_0_var(--ornament)]"
        data-motion="seal"
      >
        {step}
      </span>
      <h3 className="min-w-0 text-heading-sm font-semibold">{title}</h3>
      {children ? <p className="col-start-2 text-body text-muted">{children}</p> : null}
    </li>
  );
}

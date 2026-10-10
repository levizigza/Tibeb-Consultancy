import type { ReactNode } from "react";

type ProcessStepProps = {
  step: number;
  title: string;
  children?: ReactNode;
};

export function ProcessList({ children }: { children: ReactNode }) {
  return <ol className="flex flex-col gap-6">{children}</ol>;
}

export function ProcessStep({ step, title, children }: ProcessStepProps) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1">
      <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-meta font-semibold text-foreground">
        {step}
      </span>
      <h3 className="text-heading-sm font-semibold">{title}</h3>
      {children ? <p className="col-start-2 text-body text-muted">{children}</p> : null}
    </li>
  );
}

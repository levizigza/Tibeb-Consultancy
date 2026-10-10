import type { ReactNode } from "react";

type EditorialSplitProps = {
  children: ReactNode;
  aside: ReactNode;
};

export function EditorialSplit({ children, aside }: EditorialSplitProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <div className="max-w-content">{children}</div>
      <div className="rounded-md border border-line bg-surface p-md sm:p-lg">{aside}</div>
    </div>
  );
}

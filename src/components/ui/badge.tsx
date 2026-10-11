import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-background px-3 py-1 text-meta text-foreground">
      {children}
    </span>
  );
}

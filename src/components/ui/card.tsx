import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  raised?: boolean;
};

export function Card({ children, raised = false }: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-line bg-surface p-md sm:p-lg",
        raised ? "shadow-raised" : "shadow-rest",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

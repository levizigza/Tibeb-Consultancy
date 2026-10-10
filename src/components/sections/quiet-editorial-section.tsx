import type { ReactNode } from "react";
import { rhythm } from "@/components/sections/rhythm";

export function QuietEditorialSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.quiet} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          <h2 id={id} className="text-heading font-semibold">
            {title}
          </h2>
          <div className="mt-4 flex flex-col gap-4 text-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

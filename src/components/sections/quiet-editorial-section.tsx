import type { ReactNode } from "react";
import { FileMark } from "@/components/brand/file-mark";
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
          <div className="flex items-start gap-4">
            <FileMark />
            <div className="min-w-0">
              <h2 id={id} className="text-heading font-semibold" data-motion="enter">
                {title}
              </h2>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 text-body" data-motion="file">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

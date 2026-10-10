import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";

type SectionProps = {
  id: string;
  heading: string;
  children: ReactNode;
  level?: 2 | 3;
};

export function Section({ id, heading, children, level = 2 }: SectionProps) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-8 sm:py-12">
      <Heading id={id} level={level}>
        {heading}
      </Heading>
      <div className="mt-6">{children}</div>
    </section>
  );
}

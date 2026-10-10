import Link from "next/link";
import type { ReactNode } from "react";
import { rhythm } from "@/components/sections/rhythm";

export type ServiceGridItem = {
  href: string;
  title: string;
  detail: string;
  status: string;
  children?: ReactNode;
};

export function ServiceGridSection({
  id,
  title,
  intro,
  items,
}: {
  id: string;
  title: string;
  intro: string;
  items: ServiceGridItem[];
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.grid} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          <h2 id={id} className="text-heading font-semibold">
            {title}
          </h2>
          <p className="mt-4 text-body">{intro}</p>
        </div>
        <ul className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-2">
          {items.map((item) => (
            <li key={item.href} className="overflow-hidden rounded-lg border border-line bg-surface shadow-rest" data-motion="rise">
              <div className="regal-band" aria-hidden="true" />
              <div className="p-lg">
              <h3 className="text-heading-sm font-semibold">
                <Link href={item.href} className="underline decoration-link/40 underline-offset-4">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-body text-muted">{item.detail}</p>
              <p className="mt-4 text-meta font-medium">{item.status}</p>
              {item.children}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

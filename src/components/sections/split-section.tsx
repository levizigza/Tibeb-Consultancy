import Image from "next/image";
import type { ReactNode } from "react";
import { rhythm } from "@/components/sections/rhythm";

export function SplitSection({
  id,
  title,
  children,
  image,
}: {
  id: string;
  title: string;
  children: ReactNode;
  image?: { src: string; alt: string } | null;
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.split} border-t border-line`}>
      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-start gap-xl px-gutter sm:px-gutter-lg md:grid-cols-2">
        <div className="max-w-content">
          <h2 id={id} className="text-heading font-semibold">
            {title}
          </h2>
          <div className="mt-lg text-body">{children}</div>
        </div>
        {image && image.alt.trim() ? (
          <Image
            src={image.src}
            alt={image.alt.trim()}
            width={1200}
            height={800}
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="aspect-[3/2] w-full rounded-lg border border-line object-cover"
          />
        ) : (
          <div className="flex min-h-48 items-end rounded-lg border border-line bg-surface p-lg">
            <p className="text-meta text-muted">No photograph has been supplied.</p>
          </div>
        )}
      </div>
    </section>
  );
}

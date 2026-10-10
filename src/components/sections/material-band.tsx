import { MaterialFrame } from "@/components/sections/material-frame";
import { rhythm } from "@/components/sections/rhythm";
import { decorativeStills } from "@/content/site/decorative-stills";

export function MaterialBand({ id, title, intro }: { id: string; title: string; intro: string }) {
  return (
    <section aria-labelledby={id} className={`${rhythm.grid} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          <h2 id={id} className="text-heading font-semibold">
            {title}
          </h2>
          <p className="mt-4 text-body">{intro}</p>
        </div>
        <ul className="mt-xl grid grid-cols-1 gap-lg sm:grid-cols-2">
          {decorativeStills.slice(1).map((still) => (
            <li key={still.src}>
              <MaterialFrame
                src={still.src}
                alt={still.alt}
                caption={still.caption}
                width={still.width}
                height={still.height}
                sizes="(min-width: 40rem) 30vw, 100vw"
                aspect="aspect-[3/4]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

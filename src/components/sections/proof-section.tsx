import { rhythm } from "@/components/sections/rhythm";
import { Badge } from "@/components/ui/badge";

export function ProofSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly { label: string; value: string }[];
}) {
  return (
    <section aria-labelledby={id} className={`${rhythm.proof} bg-surface`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <h2 id={id} className="text-heading font-semibold">
          {title}
        </h2>
        {items.length === 0 ? (
          <p className="mt-4 max-w-content text-body">No public proof is approved.</p>
        ) : (
          <dl className="mt-4 grid max-w-content grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.label} className="border-t border-line pt-3">
                <dt className="text-meta text-muted">{item.label}</dt>
                <dd className="mt-2">
                  <Badge>{item.value}</Badge>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

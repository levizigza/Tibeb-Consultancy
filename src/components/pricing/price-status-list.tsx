import type { PublicPricePresentation } from "@/content/services/price-presentation";
import { pricingPage } from "@/content/services/price-presentation";

function formatCad(amount: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
}

const kindLabel = {
  fixed: "Approved fixed price",
  starting: "Verified starting price",
  quotation: "Custom quotation",
} as const;

function PriceCard({ item }: { item: PublicPricePresentation }) {
  return (
    <article className="rounded-lg border border-line bg-surface p-lg shadow-rest">
      <h3 className="text-heading-sm font-semibold">{item.label}</h3>
      <p className="mt-3 text-meta font-medium">{kindLabel[item.kind]}</p>
      {item.amountCad === null ? (
        <p className="mt-2 text-body">No amount is published for this quotation.</p>
      ) : (
        <p className="mt-2 text-body">{formatCad(item.amountCad)}</p>
      )}
      {item.kind === "starting" ? (
        <p className="mt-2 text-body text-muted">This amount is a starting price. It is not a total.</p>
      ) : null}
      {item.inclusions.length > 0 ? (
        <div className="mt-lg">
          <h4 className="text-meta font-semibold">Inclusions</h4>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-body">
            {item.inclusions.map((inclusion) => (
              <li key={inclusion}>{inclusion}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {item.exclusions.length > 0 ? (
        <div className="mt-lg">
          <h4 className="text-meta font-semibold">Exclusions</h4>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-body">
            {item.exclusions.map((exclusion) => (
              <li key={exclusion}>{exclusion}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {item.thirdPartyFees.length > 0 ? (
        <div className="mt-lg">
          <h4 className="text-meta font-semibold">Third-party or government fees</h4>
          <ul className="mt-2 flex flex-col gap-3 text-body">
            {item.thirdPartyFees.map((fee) => (
              <li key={fee.id} className="border-t border-line pt-3">
                <p className="font-medium">{fee.label}</p>
                <p className="text-meta text-muted">
                  {fee.payer === "government" ? "Government fee" : "Third-party fee"}
                  {fee.amountCad === null ? ". Amount not published." : `. ${formatCad(fee.amountCad)}.`}
                </p>
                <p>
                  {fee.includedInServicePrice
                    ? "Included in the service price."
                    : "Not included in the service price."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {item.paymentTerms ? (
        <div className="mt-lg">
          <h4 className="text-meta font-semibold">Payment terms</h4>
          <p className="mt-2 text-body">{item.paymentTerms}</p>
        </div>
      ) : null}
      {item.cancellationTerms ? (
        <div className="mt-lg">
          <h4 className="text-meta font-semibold">Cancellation terms</h4>
          <p className="mt-2 text-body">{item.cancellationTerms}</p>
        </div>
      ) : null}
    </article>
  );
}

export function PriceStatusList({ items }: { items: readonly PublicPricePresentation[] }) {
  if (items.length === 0) {
    return (
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pricingPage.rows.map((row) => (
          <div key={row.id} className="border-t border-line pt-3">
            <dt className="text-meta text-muted">{row.label}</dt>
            <dd className="mt-1 font-medium">{row.status}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-lg lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <PriceCard item={item} />
        </li>
      ))}
    </ul>
  );
}

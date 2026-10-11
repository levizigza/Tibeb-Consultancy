"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/components/sections/faq-item";
import { ChevronIcon, Icon } from "@/components/ui/icon";
import { InlineLink } from "@/components/ui/link";

export type { FaqItem };

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex max-w-content flex-col border-t border-line">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="border-b border-line">
            <h3 className="text-heading-sm font-semibold">
              <button
                id={buttonId}
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 py-3 text-left text-foreground"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <Icon>
                  <ChevronIcon
                    className={[
                      "size-6 transition-transform duration-moderate ease-standard motion-reduce:transition-none",
                      open ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </Icon>
              </button>
            </h3>
            {open ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel pb-4">
                <p className="text-body text-muted">{item.answer}</p>
                {item.links && item.links.length > 0 ? (
                  <ul className="mt-3 flex flex-col gap-2">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <InlineLink href={link.href}>{link.label}</InlineLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

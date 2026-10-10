"use client";

import { useState, type ReactNode } from "react";
import { OpeningSequence } from "@/components/layout/opening-sequence";
import type { LocaleCode } from "@/i18n/locales";

export function SiteShell({ locale, children }: { locale: LocaleCode; children: ReactNode }) {
  const [covered, setCovered] = useState(false);

  return (
    <>
      <OpeningSequence locale={locale} onCoveredChange={setCovered} />
      <div className="flex w-full min-w-0 max-w-full flex-1 flex-col" inert={covered || undefined}>
        {children}
      </div>
    </>
  );
}

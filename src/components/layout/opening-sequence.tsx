"use client";

import { useCallback, useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import type { LocaleCode } from "@/i18n/locales";
import { resolveChrome } from "@/i18n/messages/resolve";

const storageKey = "tibeb-opening";

function rememberOpening() {
  try {
    sessionStorage.setItem(storageKey, "seen");
  } catch {
    // Private browsing can refuse storage. The sequence can still close.
  }
}

export function OpeningSequence({
  locale,
  onCoveredChange,
}: {
  locale: LocaleCode;
  onCoveredChange: (covered: boolean) => void;
}) {
  const [visible, setVisible] = useState(true);
  const skipLabel = resolveChrome(locale).messages.skip;

  const dismiss = useCallback(() => {
    rememberOpening();
    document.documentElement.dataset.opening = "skip";
    setVisible(false);
    onCoveredChange(false);
  }, [onCoveredChange]);

  useEffect(() => {
    if (document.documentElement.dataset.opening === "skip") {
      const frame = window.requestAnimationFrame(() => onCoveredChange(false));
      return () => window.cancelAnimationFrame(frame);
    }

    rememberOpening();
    onCoveredChange(true);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    const fallback = window.setTimeout(dismiss, 3200);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", onKey);
    };
  }, [dismiss, onCoveredChange]);

  if (!visible) return null;

  return (
    <div
      className="opening-sequence fixed inset-0 z-[60] flex items-center justify-center bg-curtain px-gutter text-curtain-ink"
      onAnimationEnd={(event) => {
        if (event.animationName === "opening-curtain") dismiss();
      }}
    >
      <button
        type="button"
        className="opening-skip absolute top-4 right-4 inline-flex min-h-11 items-center px-3 text-meta underline"
        onClick={dismiss}
      >
        {skipLabel}
      </button>
      <Wordmark animated className="h-auto w-[min(22rem,78vw)]" />
    </div>
  );
}

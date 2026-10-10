"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { OpeningSequence } from "@/components/layout/opening-sequence";
import type { LocaleCode } from "@/i18n/locales";

function curtainIsOpen() {
  return document.documentElement.dataset.opening !== "skip";
}

function afterCurtain(run: () => void) {
  if (!curtainIsOpen()) {
    run();
    return;
  }
  const observer = new MutationObserver(() => {
    if (!curtainIsOpen()) {
      run();
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-opening"] });
  window.setTimeout(() => {
    run();
    observer.disconnect();
  }, 2800);
}

export function SiteShell({ locale, children }: { locale: LocaleCode; children: ReactNode }) {
  const pathname = usePathname();
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    function scan() {
      frame = 0;
      for (const element of document.querySelectorAll<HTMLElement>("[data-motion]")) {
        if (element.dataset.motionArmed === "true") {
          element.classList.add("is-moving");
          continue;
        }
        const box = element.getBoundingClientRect();
        const visible = box.height > 0 && box.bottom > window.innerHeight * 0.08 && box.top < window.innerHeight * 0.92;
        if (!visible) continue;
        element.dataset.motionArmed = "true";
        afterCurtain(() => element.classList.add("is-moving"));
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(scan);
    }

    scan();
    const later = window.setInterval(scan, 240);
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearInterval(later);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <OpeningSequence locale={locale} onCoveredChange={setCovered} />
      <div className="flex w-full min-w-0 max-w-full flex-1 flex-col" inert={covered || undefined}>
        {children}
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { FileMark } from "@/components/brand/file-mark";
import { Button, ButtonLink } from "@/components/ui/button";
import { rhythm } from "@/components/sections/rhythm";
import {
  finderIntentById,
  finderIntentRestriction,
  finderIntents,
  finderMessagesForLocale,
  type FinderIntentId,
} from "@/content/site/service-finder";
import type { FinderPublishedLink } from "@/lib/service-finder/match";
import { initialFinderState, reduceFinder } from "@/lib/service-finder/state";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

export function FinderResult({
  locale,
  intentId,
  links,
  resultRef,
  onBack,
  onRestart,
}: {
  locale: LocaleCode;
  intentId: FinderIntentId;
  links: readonly FinderPublishedLink[];
  resultRef?: Ref<HTMLHeadingElement>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const messages = finderMessagesForLocale(locale);
  const intent = finderIntentById(intentId);
  if (!intent) return null;

  return (
    <div className="finder-panel mt-xl max-w-content">
      <p className="text-meta font-medium">{messages.stepResult}</p>
      <h3 ref={resultRef} tabIndex={-1} className="focus-target mt-lg text-heading-sm font-semibold">
        {intent.prompt}
      </h3>
      <p className="mt-4 text-body">{intent.explanation}</p>
      <p className="mt-4 text-body">{intent.boundary}</p>

      {links.length > 0 ? (
        <div className="mt-lg">
          <h4 className="text-body font-semibold">{messages.publishedHeading}</h4>
          <ul className="mt-sm flex flex-col gap-sm">
            {links.map((link) => (
              <li key={link.id} className="rounded-lg border border-line bg-surface p-lg">
                <a href={replaceLocaleInPath(link.path, locale)} className="font-medium text-link underline decoration-link/40 underline-offset-4">
                  {link.name}
                </a>
                <p className="mt-2 text-body text-muted">{link.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-lg text-body">{messages.inquiryWhenPublished}</p>
        </div>
      ) : (
        <div className="mt-lg rounded-lg border border-line bg-notice-surface p-lg">
          <h4 className="text-body font-semibold">{messages.notOfferedHeading}</h4>
          <p className="mt-2 text-body">{finderIntentRestriction(intent.categoryId)}</p>
        </div>
      )}

      <p className="mt-lg text-body">{messages.inquiryNote}</p>
      <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:flex-wrap">
        <ButtonLink href={replaceLocaleInPath("/contact", locale)}>{messages.inquiry}</ButtonLink>
        <Button variant="secondary" onClick={onBack}>
          {messages.back}
        </Button>
        <Button variant="quiet" onClick={onRestart}>
          {messages.restart}
        </Button>
      </div>
    </div>
  );
}

export type FinderChoiceLinks = {
  intentId: FinderIntentId;
  links: FinderPublishedLink[];
};

export function ServiceFinder({
  locale,
  choices,
  initialState = initialFinderState,
}: {
  locale: LocaleCode;
  choices: readonly FinderChoiceLinks[];
  initialState?: typeof initialFinderState;
}) {
  const messages = finderMessagesForLocale(locale);
  const [state, setState] = useState(initialState);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const choiceRefs = useRef<Partial<Record<FinderIntentId, HTMLButtonElement | null>>>({});
  const previousStep = useRef(state.step);

  useEffect(() => {
    if (previousStep.current === state.step) return;
    previousStep.current = state.step;
    if (state.step === "result") {
      resultRef.current?.focus();
      return;
    }
    const target = state.intentId ? choiceRefs.current[state.intentId] : choiceRefs.current[finderIntents[0].id];
    target?.focus();
  }, [state]);

  const intent = state.intentId ? finderIntentById(state.intentId) : undefined;
  const links = choices.find((choice) => choice.intentId === state.intentId)?.links ?? [];

  return (
    <section aria-labelledby="service-finder" lang="en" className={`${rhythm.grid} border-t border-line`}>
      <div className="mx-auto w-full max-w-page px-gutter sm:px-gutter-lg">
        <div className="max-w-content">
          <div className="flex items-start gap-4">
            <FileMark />
            <h2 id="service-finder" className="min-w-0 text-heading font-semibold" data-motion="enter">
              {messages.heading}
            </h2>
          </div>
          <p className="mt-4 text-body">{messages.intro}</p>
        </div>

        {state.step === "choose" || !intent ? (
          <div role="group" aria-labelledby="finder-step" className="mt-xl max-w-content">
            <p id="finder-step" className="text-meta font-medium">
              {messages.stepChoose}
            </p>
            <ul className="mt-lg flex flex-col gap-sm">
              {finderIntents.map((item) => {
                const selected = state.intentId === item.id;
                return (
                  <li key={item.id} data-motion="file">
                    <button
                      ref={(node) => {
                        choiceRefs.current[item.id] = node;
                      }}
                      type="button"
                      aria-pressed={selected}
                      className="flex min-h-16 w-full min-w-0 items-center justify-between gap-md rounded-lg border border-line bg-surface p-lg text-start text-body font-medium shadow-rest transition-shadow duration-fast ease-standard aria-pressed:border-foreground aria-pressed:bg-background"
                      onClick={() => setState((current) => reduceFinder(current, { type: "choose", intentId: item.id }))}
                    >
                      <span className="min-w-0">{item.prompt}</span>
                      {selected ? <span className="shrink-0 text-meta text-muted">{messages.selected}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <FinderResult
            locale={locale}
            intentId={intent.id}
            links={links}
            resultRef={resultRef}
            onBack={() => setState((current) => reduceFinder(current, { type: "back" }))}
            onRestart={() => setState((current) => reduceFinder(current, { type: "restart" }))}
          />
        )}
      </div>
    </section>
  );
}

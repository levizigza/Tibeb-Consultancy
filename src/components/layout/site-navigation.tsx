"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useReducer, useRef } from "react";
import { notoSansEthiopic } from "@/app/fonts";
import { closedNav, menuKeyAction, reduceNav, type MenuName } from "@/components/layout/nav-state";
import { ChevronIcon, Icon } from "@/components/ui/icon";
import { primaryNavigation, serviceFamilies } from "@/content/site/information-architecture";
import { documentLanguage } from "@/i18n/document-language";
import { replaceLocaleInPath } from "@/i18n/href";
import { locales, translationStatusLabel, type LocaleCode } from "@/i18n/locales";
import { resolveChrome } from "@/i18n/messages/resolve";

const linkClass =
  "inline-flex min-h-11 max-w-full items-center whitespace-normal py-1 text-start font-medium text-foreground underline-offset-4 hover:underline";

function currentState(pathname: string, href: string, path: string) {
  const exact = pathname === href || (path === "/" && pathname === `${href}/`);
  const inSection = path !== "/" && (pathname === href || pathname.startsWith(`${href}/`));
  if (exact) return "page" as const;
  if (inSection) return "true" as const;
  return undefined;
}

export function SiteNavigation({ locale, pathname }: { locale: LocaleCode; pathname: string }) {
  const baseId = useId();
  const [state, dispatch] = useReducer(reduceNav, closedNav);
  const servicesRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const languagesRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const languagesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesIndex = useRef(0);
  const languagesIndex = useRef(0);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && state.open) {
        const open = state.open;
        dispatch({ type: "escape" });
        if (open === "mobile") mobileRef.current?.focus();
        if (open === "services") servicesButtonRef.current?.focus();
        if (open === "languages") languagesButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state.open]);

  function move(menu: "services" | "languages", key: string) {
    const count = menu === "services" ? serviceFamilies.length : locales.length;
    const index = menu === "services" ? servicesIndex.current : languagesIndex.current;
    const action = menuKeyAction(key, index, count);
    if (!action) return;
    if (action.type === "close") {
      dispatch({ type: "escape" });
      if (menu === "services") servicesButtonRef.current?.focus();
      else languagesButtonRef.current?.focus();
      return;
    }
    if (menu === "services") {
      servicesIndex.current = action.index;
      servicesRef.current[action.index]?.focus();
    } else {
      languagesIndex.current = action.index;
      languagesRef.current[action.index]?.focus();
    }
  }

  function openMenu(menu: MenuName) {
    dispatch({ type: "open", menu });
    if (menu === "services") {
      servicesIndex.current = 0;
      requestAnimationFrame(() => servicesRef.current[0]?.focus());
    }
    if (menu === "languages") {
      languagesIndex.current = 0;
      requestAnimationFrame(() => languagesRef.current[0]?.focus());
    }
  }

  const chrome = resolveChrome(locale).messages;
  const desktopLinks = primaryNavigation.filter((item) => item.id !== "services");

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 lg:w-auto">
      <div className="flex max-w-full flex-wrap items-center justify-end gap-2">
        <button
          ref={mobileRef}
          type="button"
          className="inline-flex min-h-11 max-w-full items-center whitespace-normal rounded-md border border-line px-3 text-start font-medium lg:hidden"
          aria-expanded={state.open === "mobile"}
          aria-controls={`${baseId}-mobile`}
          onClick={() => dispatch({ type: "toggle", menu: "mobile" })}
        >
          {state.open === "mobile" ? chrome.closeMenu : chrome.menu}
        </button>
        <nav aria-label={chrome.primaryNav} className="hidden lg:block">
          <ul className="flex flex-wrap items-center gap-x-4">
            <li>
              <Link
                href={replaceLocaleInPath("/", locale)}
                aria-current={currentState(pathname, replaceLocaleInPath("/", locale), "/")}
                className={linkClass}
              >
                {chrome.nav.home}
              </Link>
            </li>
            <li className="relative flex items-center gap-1">
              <Link
                href={replaceLocaleInPath("/services", locale)}
                aria-current={currentState(pathname, replaceLocaleInPath("/services", locale), "/services")}
                className={linkClass}
              >
                {chrome.nav.services}
              </Link>
              <button
                ref={servicesButtonRef}
                type="button"
                className="inline-flex min-h-11 max-w-full items-center gap-1 whitespace-normal rounded-md px-2 text-start font-medium"
                aria-expanded={state.open === "services"}
                aria-controls={`${baseId}-services`}
                onClick={() => dispatch({ type: "toggle", menu: "services" })}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    openMenu("services");
                  }
                }}
              >
                {chrome.serviceGroups}
                <Icon>
                  <ChevronIcon
                    className={[
                      "size-6 transition-transform duration-moderate ease-standard motion-reduce:transition-none",
                      state.open === "services" ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </Icon>
              </button>
              <ul
                id={`${baseId}-services`}
                hidden={state.open !== "services"}
                className="absolute top-full left-0 z-10 min-w-72 rounded-md border border-line bg-background p-2 shadow-rest"
                onKeyDown={(event) => move("services", event.key)}
              >
                {serviceFamilies.map((family, index) => (
                  <li key={family.id}>
                    <Link
                      ref={(node) => {
                        servicesRef.current[index] = node;
                      }}
                      href={replaceLocaleInPath(family.path, locale)}
                      className="flex min-h-11 items-center rounded-sm px-3 font-medium hover:bg-surface"
                      onClick={() => dispatch({ type: "close" })}
                    >
                      {family.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {desktopLinks
              .filter((item) => item.id !== "home")
              .map((item) => {
                const href = replaceLocaleInPath(item.path, locale);
                return (
                  <li key={item.id}>
                    <Link
                      href={href}
                      aria-current={currentState(pathname, href, item.path)}
                      className={linkClass}
                    >
                      {chrome.nav[item.id]}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
        <div className="relative">
          <button
            ref={languagesButtonRef}
            type="button"
            className="inline-flex min-h-11 max-w-full items-center gap-1 whitespace-normal rounded-md border border-line px-3 text-start font-medium"
            aria-expanded={state.open === "languages"}
            aria-controls={`${baseId}-languages`}
            onClick={() => dispatch({ type: "toggle", menu: "languages" })}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                openMenu("languages");
              }
            }}
          >
            {chrome.languages}
            <Icon>
              <ChevronIcon
                className={[
                  "size-6 transition-transform duration-moderate ease-standard motion-reduce:transition-none",
                  state.open === "languages" ? "rotate-180" : "",
                ].join(" ")}
              />
            </Icon>
          </button>
          <ul
            id={`${baseId}-languages`}
            hidden={state.open !== "languages"}
            aria-label={chrome.languages}
            className="absolute top-full right-0 z-10 mt-1 min-w-64 rounded-md border border-line bg-background p-2 shadow-rest"
            onKeyDown={(event) => move("languages", event.key)}
          >
            <li className="px-3 py-2 text-meta text-muted" lang="en">
              {chrome.languageMenuNote}
            </li>
            {locales.map((item, index) => {
              const href = replaceLocaleInPath(pathname, item.code);
              const current = pathname === `/${item.code}` || pathname.startsWith(`/${item.code}/`);
              return (
                <li key={item.code}>
                  <Link
                    ref={(node) => {
                      languagesRef.current[index] = node;
                    }}
                    href={href}
                    hrefLang={documentLanguage(item.code)}
                    aria-current={current ? "true" : undefined}
                    className="flex min-h-11 flex-col justify-center rounded-sm px-3 hover:bg-surface"
                    onClick={() => dispatch({ type: "close" })}
                  >
                    <span
                      lang={item.code}
                      className={item.script === "ethiopic" ? notoSansEthiopic.className : undefined}
                    >
                      {item.endonym}
                    </span>
                    <span lang="en" className="text-meta text-muted">
                      {translationStatusLabel[item.translationStatus]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <nav id={`${baseId}-mobile`} aria-label={chrome.mobileNav} hidden={state.open !== "mobile"} className="lg:hidden">
        <ul className="flex flex-col border-t border-line pt-2">
          {primaryNavigation.map((item) => {
            const href = replaceLocaleInPath(item.path, locale);
            return (
              <li key={item.id}>
                <Link
                  href={href}
                  aria-current={currentState(pathname, href, item.path)}
                  className={linkClass}
                  onClick={() => dispatch({ type: "close" })}
                >
                  {chrome.nav[item.id]}
                </Link>
                {item.id === "services" ? (
                  <ul className="mb-2 ml-4 border-l border-line pl-3">
                    {serviceFamilies.map((family) => (
                      <li key={family.id}>
                        <Link
                          href={replaceLocaleInPath(family.path, locale)}
                          className={linkClass}
                          onClick={() => dispatch({ type: "close" })}
                        >
                          {family.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function SiteNavigationClient({ locale }: { locale: LocaleCode }) {
  const pathname = usePathname() ?? `/${locale}`;
  return <SiteNavigation locale={locale} pathname={pathname} />;
}

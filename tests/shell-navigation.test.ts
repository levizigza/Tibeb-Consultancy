import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ variable: "font-sans", className: "font-sans" }),
  Noto_Sans_Ethiopic: () => ({ variable: "font-ethiopic", className: "font-ethiopic" }),
}));
import { buildBreadcrumbs } from "@/components/layout/breadcrumbs";
import { menuKeyAction, nextMenuIndex, reduceNav } from "@/components/layout/nav-state";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { ContactCta } from "@/components/layout/contact-cta";

describe("navigation keyboard state", () => {
  it("opens one menu at a time and closes on escape", () => {
    const opened = reduceNav({ open: null }, { type: "toggle", menu: "mobile" });
    expect(opened.open).toBe("mobile");
    expect(reduceNav(opened, { type: "escape" }).open).toBeNull();
    expect(reduceNav(opened, { type: "toggle", menu: "services" }).open).toBe("services");
    expect(reduceNav({ open: "languages" }, { type: "close" }).open).toBeNull();
  });

  it("moves through a menu with arrow keys and leaves with escape", () => {
    expect(nextMenuIndex(0, 4, "ArrowDown")).toBe(1);
    expect(nextMenuIndex(0, 4, "ArrowUp")).toBe(3);
    expect(nextMenuIndex(2, 4, "Home")).toBe(0);
    expect(nextMenuIndex(2, 4, "End")).toBe(3);
    expect(menuKeyAction("Escape", 1, 4)).toEqual({ type: "close" });
    expect(menuKeyAction("ArrowDown", 1, 4)).toEqual({ type: "index", index: 2 });
    expect(menuKeyAction("Tab", 1, 4)).toBeNull();
  });
});

describe("shell markup", () => {
  it("keeps the mobile menu closed and points every control at a real page", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteNavigation, { locale: "en", pathname: "/en/services" }),
    );

    expect(markup).toContain(">Menu<");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('aria-label="Mobile"');
    expect(markup).toContain("hidden");
    expect(markup).toContain("lg:hidden");
    expect(markup).toContain("hidden lg:block");
    expect(markup).toContain('href="/en/services"');
    expect(markup).toContain('href="/en/services/immigration-citizenship"');
    expect(markup).toContain('href="/en/contact"');
    expect(markup).toContain('aria-current="true"');
    expect(markup).not.toContain('href="#"');
    expect(markup.toLowerCase()).not.toContain("book now");
    expect(markup.toLowerCase()).not.toContain("get started");
    expect(markup.toLowerCase()).not.toContain("buy now");
  });

  it("sends the contact action to the contact page", () => {
    const markup = renderToStaticMarkup(createElement(ContactCta, { locale: "en" }));
    expect(markup).toContain('href="/en/contact"');
    expect(markup).toContain("not open for client work");
    expect(markup.toLowerCase()).not.toContain("book");
  });
});

describe("breadcrumbs", () => {
  it("builds a trail from real routes and hides it on the home page", () => {
    expect(buildBreadcrumbs("/en")).toEqual([]);
    expect(buildBreadcrumbs("/en/services/career-employment/resume-writing")).toEqual([
      { label: "Home", path: "/en" },
      { label: "Services", path: "/en/services" },
      { label: "Career & Employment", path: "/en/services/career-employment" },
      { label: "Resume writing", path: "/en/services/career-employment/resume-writing" },
    ]);
    expect(buildBreadcrumbs("/en/development/design-system").map((crumb) => crumb.label)).toEqual([
      "Home",
      "Development documentation",
      "Design system",
    ]);
  });
});

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FormField } from "@/components/ui/form-field";
import { Icon } from "@/components/ui/icon";
import { ProcessStep } from "@/components/ui/process-step";

function lin(channel: number) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = lin((value >> 16) & 255);
  const green = lin((value >> 8) & 255);
  const blue = lin(value & 255);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function cssVariables() {
  const css = readFileSync("src/app/globals.css", "utf8");
  const light = css.slice(0, css.indexOf("@media (prefers-color-scheme: dark)"));
  const dark = css.slice(css.indexOf("@media (prefers-color-scheme: dark)"));
  const read = (block: string, name: string) => {
    const match = block.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
    if (!match) throw new Error(`Missing ${name}`);
    return match[1];
  };
  return { light, dark, read };
}

function componentSources() {
  const directory = path.join("src", "components");
  const files: string[] = [];
  const walk = (current: string) => {
    for (const entry of readdirSync(current)) {
      const fullPath = path.join(current, entry);
      if (statSync(fullPath).isDirectory()) walk(fullPath);
      else if (entry.endsWith(".tsx")) files.push(readFileSync(fullPath, "utf8"));
    }
  };
  walk(directory);
  return files.join("\n");
}

describe("design tokens", () => {
  it("keeps text and boundaries at WCAG 2.2 AA", () => {
    const { light, dark, read } = cssVariables();
    expect(contrast(read(light, "--foreground"), read(light, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(light, "--muted"), read(light, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(light, "--accent-foreground"), read(light, "--accent"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(light, "--link"), read(light, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(light, "--line"), read(light, "--background"))).toBeGreaterThanOrEqual(3);
    expect(contrast(read(light, "--line"), read(light, "--surface"))).toBeGreaterThanOrEqual(3);
    expect(contrast(read(light, "--focus"), read(light, "--background"))).toBeGreaterThanOrEqual(3);
    expect(contrast(read(dark, "--foreground"), read(dark, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--link"), read(dark, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--muted"), read(dark, "--background"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--line"), read(dark, "--background"))).toBeGreaterThanOrEqual(3);
    expect(contrast(read(light, "--muted"), read(light, "--surface"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--muted"), read(dark, "--surface"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(light, "--foreground"), read(light, "--notice-surface"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--foreground"), read(dark, "--notice-surface"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(read(dark, "--focus"), read(dark, "--background"))).toBeGreaterThanOrEqual(3);
    expect(contrast(read(light, "--ornament"), read(light, "--background"))).toBeLessThan(3);
  });

  it("does not put gold or raw hex colours into components", () => {
    const source = componentSources();
    expect(source).not.toContain("#b6883f");
    expect(source).not.toContain("#B6883F");
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});

describe("design system components", () => {
  it("renders button, badge, field, step, and icon states", () => {
    const button = renderToStaticMarkup(createElement(Button, { disabled: true }, "Unavailable"));
    expect(button).toContain("disabled");
    expect(button).toContain("Unavailable");

    const badge = renderToStaticMarkup(createElement(Badge, null, "Not approved"));
    expect(badge).toContain("Not approved");

    const field = renderToStaticMarkup(
      createElement(FormField, {
        id: "sample",
        label: "Sample label",
        hint: "Hint text",
        error: "This sample field has an error message.",
      }),
    );
    expect(field).toContain('for="sample"');
    expect(field).toContain('aria-invalid="true"');
    expect(field).toContain('role="alert"');
    expect(field).toContain("Hint text");

    const step = renderToStaticMarkup(
      createElement(ProcessStep, { step: 1, title: "Sample step" }, "Visible number"),
    );
    expect(step).toContain(">1<");
    expect(step).toContain("Sample step");

    const named = renderToStaticMarkup(
      // React 19's createElement types require children on this component's props.
      // eslint-disable-next-line react/no-children-prop
      createElement(Icon, { label: "Sample status", children: "mark" }),
    );
    expect(named).toContain('aria-label="Sample status"');
    const decorative = renderToStaticMarkup(createElement(Icon, null, "mark"));
    expect(decorative).toContain('aria-hidden="true"');
  });

  it("keeps questions closed until chosen", () => {
    const markup = renderToStaticMarkup(
      createElement(FaqAccordion, {
        items: [
          { id: "one", question: "Sample question", answer: "Sample answer" },
          { id: "two", question: "Second sample question", answer: "Another sample answer" },
        ],
      }),
    );
    expect(markup).toContain("Sample question");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("Sample answer");
  });
});

import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { notoSansEthiopic } from "@/app/fonts";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContentGrid } from "@/components/ui/content-grid";
import { Divider } from "@/components/ui/divider";
import { EditorialSplit } from "@/components/ui/editorial-split";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FormField } from "@/components/ui/form-field";
import { Heading } from "@/components/ui/heading";
import { ChevronIcon, Icon } from "@/components/ui/icon";
import { InlineLink } from "@/components/ui/link";
import { Measure } from "@/components/ui/container";
import { ProcessList, ProcessStep } from "@/components/ui/process-step";
import { Section } from "@/components/ui/section";
import { Testimonial } from "@/components/ui/testimonial";
import { locales } from "@/i18n/locales";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, "/development/design-system");
}

const swatches = [
  { name: "Ivory", role: "Page background", className: "bg-background" },
  { name: "Ink", role: "Text", className: "bg-foreground" },
  { name: "Stone", role: "Panels", className: "bg-surface" },
  { name: "Muted ink", role: "Secondary text", className: "bg-muted" },
  { name: "Teal", role: "Buttons and light-scheme links", className: "bg-accent" },
  { name: "Line", role: "Borders", className: "bg-line" },
  { name: "Gold", role: "Ornament only. Not for text, links, or focus.", className: "bg-ornament" },
] as const;

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return DesignSystemContent({ params });
}

async function DesignSystemContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <PageContainer>
      <Measure>
        <p className="text-meta font-medium text-muted">Development preview</p>
        <Heading level={1}>Design system</Heading>
        <p className="mt-4 text-body">
          Sample interface states. The words in this preview are not business claims, quotations, or
          published questions.
        </p>
      </Measure>

      <Section id="colour" heading="Colour">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {swatches.map((swatch) => (
            <li key={swatch.name} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-10 shrink-0 rounded-md border border-line ${swatch.className}`}
              />
              <span className="text-body">
                <span className="font-medium">{swatch.name}.</span> {swatch.role}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" heading="Type">
        <div className="flex max-w-content flex-col gap-4">
          <p className="text-title font-semibold">Page title</p>
          <p className="text-heading font-semibold">Section heading</p>
          <p className="text-heading-sm font-semibold">Small heading</p>
          <p className="text-body-lg">Lead sentence in the text face.</p>
          <p className="text-body">Body text stays within the reading measure.</p>
          <p className="text-meta text-muted">Meta label</p>
          <ul className="flex flex-col gap-2">
            {locales.map((item) => (
              <li key={item.code}>
                <span
                  lang={item.code}
                  className={item.script === "ethiopic" ? notoSansEthiopic.className : undefined}
                >
                  {item.endonym}
                </span>
                {item.endonym === item.englishName ? null : (
                  <span className="text-muted"> ({item.englishName})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="actions" heading="Actions">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="quiet">Quiet</Button>
            <Button disabled>Unavailable</Button>
            <Button size="sm">Small</Button>
          </div>
          <p>
            <InlineLink href="#colour">Text link</InlineLink>
          </p>
          <p className="flex items-center gap-2 text-body">
            <Icon label="Sample status">
              <ChevronIcon className="size-6" />
            </Icon>
            Icon with a visible name
          </p>
        </div>
      </Section>

      <Section id="surfaces" heading="Surfaces">
        <ContentGrid>
          <Card>
            <Heading level={3}>Resting card</Heading>
            <p className="mt-2 text-body text-muted">Stone panel, line border, light shadow.</p>
            <div className="mt-4">
              <Badge>Not approved</Badge>
            </div>
          </Card>
          <Card raised>
            <Heading level={3}>Raised card</Heading>
            <p className="mt-2 text-body text-muted">The same surface with a slightly deeper shadow.</p>
          </Card>
          <Card>
            <Heading level={3}>Status</Heading>
            <p className="mt-2 text-body">The badge text carries the status. Colour does not.</p>
          </Card>
        </ContentGrid>
        <div className="mt-8">
          <Divider />
        </div>
      </Section>

      <Section id="fields" heading="Fields">
        <div className="flex flex-col gap-6">
          <FormField id="sample-name" name="sampleName" label="Sample label" hint="Hint text sits under the field." />
          <FormField
            id="sample-error"
            name="sampleError"
            label="Sample label with an error"
            error="This sample field has an error message."
            defaultValue="Sample"
          />
        </div>
      </Section>

      <Section id="layout" heading="Layout">
        <EditorialSplit
          aside={<p className="text-body">A stone panel beside the reading column from the medium breakpoint up.</p>}
        >
          <p className="text-body">
            On a narrow screen this text stacks above the panel. The reading column stays within the
            content measure.
          </p>
        </EditorialSplit>
        <div className="mt-8">
          <ProcessList>
            <ProcessStep step={1} title="Sample step">
              The number is written out, so the step is not shown by colour alone.
            </ProcessStep>
            <ProcessStep step={2} title="Second sample step">
              Steps stack on every width.
            </ProcessStep>
          </ProcessList>
        </div>
      </Section>

      <Section id="quotation" heading="Quotation">
        <Testimonial
          quote="Sample quotation for the component preview. This is not a client statement."
          attribution="Sample attribution"
        />
      </Section>

      <Section id="questions" heading="Questions">
        <FaqAccordion
          items={[
            {
              id: "one",
              question: "Sample question",
              answer: "Sample answer for the component preview. This is not a published question.",
            },
            {
              id: "two",
              question: "Second sample question",
              answer: "Another sample answer. Opening one question closes the other.",
            },
          ]}
        />
      </Section>
    </PageContainer>
  );
}

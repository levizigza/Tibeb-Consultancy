import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { Measure } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { developmentPage } from "@/content/translations/development";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, "/development", developmentPage.title, developmentPage.summary);
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <PageContainer>
      <Measure>
      <h1 className="text-title font-semibold tracking-tight sm:text-title-lg">
        {developmentPage.title}
      </h1>
      <p className="mt-6 text-body">{developmentPage.summary}</p>
      <p className="mt-4 text-body text-muted">{developmentPage.repositoryNote}</p>
      <p className="mt-4 text-body text-muted">{developmentPage.catalogNote}</p>
      <ul className="mt-8 flex flex-col gap-4">
        {developmentPage.docs.map((doc) => (
          <li
            key={doc.path}
            className="rounded-lg border border-line bg-surface px-gutter py-4"
          >
            <code className="font-mono text-meta text-foreground">{doc.path}</code>
            <p className="mt-2 text-body text-muted">{doc.purpose}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <TextLink href={developmentPage.designSystemPath} locale={locale}>
          {developmentPage.designSystemLabel}
        </TextLink>
      </p>
      </Measure>
    </PageContainer>
  );
}

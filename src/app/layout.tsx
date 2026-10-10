import type { Metadata, Viewport } from "next";
import { notoSans, notoSansEthiopic } from "@/app/fonts";
import { SkipLink } from "@/components/layout/skip-link";
import { previewCopy } from "@/content/translations/preview";
import { jsonLdScript } from "@/lib/seo/json-ld";
import { publicSiteOrigin } from "@/lib/seo/origin";
import { organizationJsonLd } from "@/lib/seo/public-graph";
import "./globals.css";

const origin = publicSiteOrigin();
const organization = organizationJsonLd(origin);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  title: {
    default: "TIBEB Consultancy",
    template: "%s · TIBEB Consultancy",
  },
  description: previewCopy.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSansEthiopic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-body text-foreground [overflow-wrap:break-word]">
        {organization ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organization) }} />
        ) : null}
        <SkipLink />
        {children}
      </body>
    </html>
  );
}

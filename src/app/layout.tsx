import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notoSans, notoSansEthiopic } from "@/app/fonts";
import { PageFrame } from "@/components/brand/page-frame";
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
        <Script id="tibeb-opening" strategy="beforeInteractive">
          {`try{var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=sessionStorage.getItem("tibeb-opening")==="seen";if(reduce||seen){document.documentElement.dataset.opening="skip"}else{sessionStorage.setItem("tibeb-opening","seen");var close=function(){document.documentElement.dataset.opening="skip"};document.addEventListener("animationend",function(event){if(event.animationName==="opening-curtain")close()});setTimeout(close,3200)}}catch(e){}`}
        </Script>
        {organization ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organization) }} />
        ) : null}
        <PageFrame />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}

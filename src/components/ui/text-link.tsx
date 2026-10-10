import type { ReactNode } from "react";
import { InlineLink } from "@/components/ui/link";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

type TextLinkProps = {
  href: string;
  locale: LocaleCode;
  children: ReactNode;
};

export function TextLink({ href, locale, children }: TextLinkProps) {
  return <InlineLink href={replaceLocaleInPath(href, locale)}>{children}</InlineLink>;
}

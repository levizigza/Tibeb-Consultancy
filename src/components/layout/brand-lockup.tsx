import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { businessProfile } from "@/content/business/profile";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

export function BrandLockup({ locale }: { locale: LocaleCode }) {
  return (
    <Link href={replaceLocaleInPath("/", locale)} className="block w-fit max-w-full text-foreground">
      <span className="sr-only">{businessProfile.publicName}</span>
      <Wordmark className="h-11 w-auto max-w-full" />
    </Link>
  );
}

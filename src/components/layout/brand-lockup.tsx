import Link from "next/link";
import { businessProfile } from "@/content/business/profile";
import { previewCopy } from "@/content/translations/preview";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

export function BrandLockup({ locale }: { locale: LocaleCode }) {
  const [wordmark, rest] = businessProfile.publicName.split(/ (.+)/);

  return (
    <div className="flex max-w-full flex-col gap-1">
      <p className="max-w-full text-meta text-muted">{previewCopy.previewLabel}</p>
      <Link href={replaceLocaleInPath("/", locale)} className="w-fit text-foreground">
        <span className="block w-fit border-b border-ornament pb-0.5 text-lg font-semibold tracking-[0.14em]">{wordmark}</span>
        {rest ? <span className="block text-meta font-medium">{rest}</span> : null}
      </Link>
    </div>
  );
}

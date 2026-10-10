import Link from "next/link";
import { businessProfile } from "@/content/business/profile";
import { previewCopy } from "@/content/translations/preview";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

export function BrandLockup({ locale }: { locale: LocaleCode }) {
  const [wordmark, rest] = businessProfile.publicName.split(/ (.+)/);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-meta text-muted">{previewCopy.previewLabel}</p>
      <Link href={replaceLocaleInPath("/", locale)} className="w-fit text-foreground">
        <span className="block text-lg font-semibold tracking-[0.04em]">{wordmark}</span>
        {rest ? <span className="block text-meta font-medium">{rest}</span> : null}
      </Link>
    </div>
  );
}

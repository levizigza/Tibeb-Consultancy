import { ButtonLink } from "@/components/ui/button";
import { previewCopy } from "@/content/translations/preview";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

export function ContactCta({ locale, quiet = false }: { locale: LocaleCode; quiet?: boolean }) {
  return (
    <div className="flex max-w-content flex-col items-start gap-3">
      <p className="text-body text-muted">{previewCopy.footerNote}</p>
      <ButtonLink href={replaceLocaleInPath("/contact", locale)} variant={quiet ? "secondary" : "primary"}>
        Contact
      </ButtonLink>
    </div>
  );
}

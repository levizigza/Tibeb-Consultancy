import { notoSansEthiopic } from "@/app/fonts";
import { translationPendingMessage } from "@/content/translations/preview";
import { locales, type LocaleCode } from "@/i18n/locales";

export function TranslationFallback({ locale }: { locale: LocaleCode }) {
  const pending = translationPendingMessage(locale);
  const definition = locales.find((item) => item.code === locale);
  if (!pending || !definition) return null;

  return (
    <p
      id="translation-fallback"
      className="border-b border-line bg-notice-surface px-gutter py-3 text-body text-foreground sm:px-gutter-lg"
    >
      <span
        lang={definition.code}
        className={definition.script === "ethiopic" ? notoSansEthiopic.className : undefined}
      >
        {definition.endonym}
      </span>
      {". "}
      {pending}
    </p>
  );
}

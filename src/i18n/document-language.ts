import type { LocaleCode } from "@/i18n/locales";
import { localeCopyIsPublishable } from "@/i18n/review/validate";

/**
 * Document language follows the language of the rendered copy.
 * A locale URL stays `en` until every review record for that locale can be published.
 */
export function documentLanguage(locale: LocaleCode): LocaleCode {
  if (locale === "en") return "en";
  return localeCopyIsPublishable(locale) ? locale : "en";
}

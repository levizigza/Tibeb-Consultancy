import { resolveChrome } from "@/i18n/messages/resolve";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute left-4 top-4 z-50 inline-flex min-h-11 -translate-y-24 items-center rounded-md bg-accent px-4 text-meta font-medium text-accent-foreground transition-transform duration-fast ease-standard focus:translate-y-0"
    >
      {resolveChrome("en").messages.skip}
    </a>
  );
}

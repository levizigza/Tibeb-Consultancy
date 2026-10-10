import Link from "next/link";
import type { ComponentProps } from "react";

export const linkClassName =
  "font-medium text-link underline decoration-link/40 underline-offset-4 transition-colors duration-fast ease-standard hover:decoration-link";

export function InlineLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={[linkClassName, className].filter(Boolean).join(" ")} {...props} />;
}

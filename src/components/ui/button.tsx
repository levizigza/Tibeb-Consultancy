import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: "sm" | "md";
};

const variants = {
  primary: "border-b-2 border-ornament bg-accent text-accent-foreground shadow-rest hover:shadow-raised",
  secondary: "border border-line bg-background text-foreground hover:bg-surface",
  quiet: "bg-transparent text-link underline decoration-link/40 underline-offset-4 hover:decoration-link",
} as const;

const sizes = {
  sm: "min-h-10 px-3 text-meta",
  md: "min-h-11 px-4 text-body",
} as const;

export function buttonClassName(variant: keyof typeof variants, size: keyof typeof sizes, className?: string) {
  return [
    "inline-flex max-w-full items-center justify-center whitespace-normal rounded-md text-center font-medium transition-shadow duration-fast ease-standard",
    "disabled:cursor-not-allowed disabled:border disabled:border-line disabled:bg-surface disabled:text-muted disabled:shadow-none",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, size, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "quiet";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClassName(variant, size, className)}>
      {children}
    </Link>
  );
}

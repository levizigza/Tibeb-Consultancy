import type { ReactNode } from "react";

const styles = {
  1: "text-title font-semibold tracking-tight sm:text-title-lg",
  2: "text-heading font-semibold tracking-tight",
  3: "text-heading-sm font-semibold",
  4: "text-body font-semibold",
} as const;

type HeadingProps = {
  level: 1 | 2 | 3 | 4;
  id?: string;
  children: ReactNode;
};

export function Heading({ level, id, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={styles[level]}>
      {children}
    </Tag>
  );
}

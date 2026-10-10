import type { ReactNode, SVGProps } from "react";

type IconProps = {
  children: ReactNode;
  label?: string;
};

export function Icon({ children, label }: IconProps) {
  if (label) {
    return (
      <span
        role="img"
        aria-label={label}
        className="inline-flex size-6 shrink-0 items-center justify-center text-current"
      >
        {children}
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="inline-flex size-6 shrink-0 items-center justify-center text-current">
      {children}
    </span>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

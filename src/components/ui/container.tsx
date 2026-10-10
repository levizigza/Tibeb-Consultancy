import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  width?: "page" | "measure";
};

export function Container({ children, width = "page" }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full px-gutter py-10 sm:px-gutter-lg sm:py-16",
        width === "measure" ? "max-w-content" : "max-w-page",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function Measure({ children }: { children: ReactNode }) {
  return <div className="max-w-content">{children}</div>;
}

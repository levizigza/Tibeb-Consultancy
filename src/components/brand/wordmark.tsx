import {
  wordmarkConsultancyPath,
  wordmarkNamePath,
  wordmarkRule,
  wordmarkViewBox,
} from "@/components/brand/wordmark-paths";

export function Wordmark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg aria-hidden="true" className={className} viewBox={wordmarkViewBox} fill="none">
      <path className={animated ? "opening-mark fill-current" : "fill-current"} d={wordmarkNamePath} />
      <rect
        className={animated ? "opening-rule fill-ornament" : "fill-ornament"}
        x={wordmarkRule.x}
        y={wordmarkRule.y}
        width={wordmarkRule.width}
        height={wordmarkRule.height}
      />
      <path
        className={animated ? "opening-sub fill-current" : "fill-current"}
        d={wordmarkConsultancyPath}
      />
    </svg>
  );
}

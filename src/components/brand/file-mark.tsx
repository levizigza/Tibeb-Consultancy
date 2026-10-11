export function FileMark({ className = "h-14 w-11" }: { className?: string }) {
  return (
    <span className={`file-mark relative inline-flex shrink-0 text-foreground ${className}`} aria-hidden="true">
      <span className="file-outline-clip block h-full w-full">
        <svg className="h-full w-full" viewBox="0 0 64 80">
          <path className="file-sheet" d="M10 6 H38 L54 22 V74 H10 Z" />
          <path className="file-fold" d="M38 6 V22 H54" />
        </svg>
      </span>
      <span className="file-writing-clip absolute inset-0 block">
        <svg className="h-full w-full" viewBox="0 0 64 80">
          <path className="file-line" d="M20 34 H42" />
          <path className="file-line" d="M20 44 H36" />
          <path className="file-line" d="M20 54 H40" />
        </svg>
      </span>
      <span className="file-seal-clip absolute inset-0 block">
        <svg className="h-full w-full" viewBox="0 0 64 80">
          <path className="file-seal" d="M44 58 l5 5 -5 5 -5 -5 Z" />
        </svg>
      </span>
    </span>
  );
}

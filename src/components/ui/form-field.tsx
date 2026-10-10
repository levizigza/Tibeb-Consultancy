import type { InputHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({ id, label, hint, error, className, ...inputProps }: FormFieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");

  return (
    <div className="flex max-w-content flex-col gap-2">
      <label htmlFor={id} className="text-meta font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={[
          "min-h-11 w-full rounded-md border border-line bg-background px-3 text-body text-foreground aria-invalid:border-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...inputProps}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-meta text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-meta text-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { serviceFamilies } from "@/content/site/information-architecture";
import { Button } from "@/components/ui/button";
import { locales, type LocaleCode } from "@/i18n/locales";
import { fieldMessage, inquiryMessages, statusMessage } from "@/lib/inquiry/messages";
import { idleInquiryState, type InquiryState } from "@/lib/inquiry/state";
import {
  fieldErrorsFromIssues,
  inquiryFromFormData,
  parseInquiry,
  type InquiryField,
  type InquiryFieldError,
} from "@/lib/validation/contact-inquiry";

const fieldId: Record<InquiryField, string> = {
  fullName: "inquiry-name",
  email: "inquiry-email",
  phone: "inquiry-phone",
  contactMethod: "inquiry-method",
  preferredLanguage: "inquiry-language",
  serviceCategory: "inquiry-category",
  inquiry: "inquiry-note",
  privacyAcknowledgement: "inquiry-privacy",
};

const controlClass =
  "min-h-11 w-full min-w-0 max-w-full rounded-md border border-line bg-background px-3 text-body text-foreground aria-invalid:border-foreground";

async function previewInquiryAction(): Promise<InquiryState> {
  return { status: "not-delivered", fieldErrors: [] };
}

export function InquiryForm({
  locale,
  action = previewInquiryAction,
}: {
  locale: LocaleCode;
  action?: (state: InquiryState, formData: FormData) => Promise<InquiryState>;
}) {
  const baseId = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(action, idleInquiryState);
  const [clientErrors, setClientErrors] = useState<InquiryFieldError[]>([]);
  const errors = clientErrors.length > 0 ? clientErrors : state.fieldErrors;
  const statusText = statusMessage(state.status);

  useEffect(() => {
    if (state.status !== "idle" || clientErrors.length > 0) statusRef.current?.focus();
  }, [state, clientErrors]);

  function errorFor(field: InquiryField): string | undefined {
    const match = errors.find((error) => error.field === field);
    return match ? fieldMessage(match.code) : undefined;
  }

  function describedBy(field: InquiryField, hintId: string): string | undefined {
    const errorId = `${fieldId[field]}-error`;
    return [hintId, errorFor(field) ? errorId : null].filter(Boolean).join(" ") || undefined;
  }

  return (
    <form
      action={formAction}
      className="flex w-full min-w-0 max-w-content flex-col gap-6"
      lang="en"
      noValidate
      onSubmit={(event) => {
        const parsed = parseInquiry(inquiryFromFormData(new FormData(event.currentTarget)));
        if (!parsed.success) {
          const next = fieldErrorsFromIssues(parsed.error);
          if (next.length > 0) {
            event.preventDefault();
            setClientErrors(next);
            statusRef.current?.focus();
            return;
          }
        }
        setClientErrors([]);
      }}
    >
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="assertive"
        aria-atomic="true"
        className="focus-target scroll-mt-6"
      >
        {statusText ? <p className="text-body text-foreground">{statusText}</p> : null}
        {errors.length > 0 ? (
          <div>
            <h3 className="text-body font-semibold">{inquiryMessages.errorsTitle}</h3>
            <ul className="mt-2 list-disc ps-5 text-body">
              {errors.map((error) => (
                <li key={`${error.field}-${error.code}`}>
                  <a href={`#${fieldId[error.field]}`} className="text-link underline underline-offset-4">
                    {fieldMessage(error.code)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <Field label={inquiryMessages.name} hint={inquiryMessages.nameHint} field="fullName" error={errorFor("fullName")} hintId={`${baseId}-name-hint`} required>
        <input id={fieldId.fullName} name="fullName" type="text" autoComplete="name" required maxLength={100} aria-invalid={errorFor("fullName") ? true : undefined} aria-describedby={describedBy("fullName", `${baseId}-name-hint`)} className={controlClass} />
      </Field>

      <fieldset
        id={fieldId.contactMethod}
        className="flex flex-col gap-3"
        aria-invalid={errorFor("contactMethod") ? true : undefined}
        aria-describedby={describedBy("contactMethod", `${baseId}-method-hint`)}
      >
        <legend className="text-meta font-medium">
          {inquiryMessages.method} <span className="text-muted">({inquiryMessages.required})</span>
        </legend>
        <p id={`${baseId}-method-hint`} className="text-meta text-muted">{inquiryMessages.methodHint}</p>
        <div className="flex flex-col gap-2">
          <Radio name="contactMethod" value="email" label={inquiryMessages.methodEmail} />
          <Radio name="contactMethod" value="phone" label={inquiryMessages.methodPhone} />
        </div>
        <FieldError id={`${fieldId.contactMethod}-error`} message={errorFor("contactMethod")} />
      </fieldset>

      <Field label={inquiryMessages.email} hint={inquiryMessages.emailHint} field="email" error={errorFor("email")} hintId={`${baseId}-email-hint`}>
        <input id={fieldId.email} name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} spellCheck={false} aria-invalid={errorFor("email") ? true : undefined} aria-describedby={describedBy("email", `${baseId}-email-hint`)} className={controlClass} />
      </Field>

      <Field label={inquiryMessages.phone} hint={inquiryMessages.phoneHint} field="phone" error={errorFor("phone")} hintId={`${baseId}-phone-hint`}>
        <input id={fieldId.phone} name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} aria-invalid={errorFor("phone") ? true : undefined} aria-describedby={describedBy("phone", `${baseId}-phone-hint`)} className={controlClass} />
      </Field>

      <Field label={inquiryMessages.language} hint={inquiryMessages.languageHint} field="preferredLanguage" error={errorFor("preferredLanguage")} hintId={`${baseId}-language-hint`} required>
        <select id={fieldId.preferredLanguage} name="preferredLanguage" required defaultValue={locale} aria-invalid={errorFor("preferredLanguage") ? true : undefined} aria-describedby={describedBy("preferredLanguage", `${baseId}-language-hint`)} className={controlClass}>
          {locales.map((item) => (
            <option key={item.code} value={item.code} lang={item.code}>
              {item.endonym}
            </option>
          ))}
        </select>
      </Field>

      <Field label={inquiryMessages.category} hint={inquiryMessages.categoryHint} field="serviceCategory" error={errorFor("serviceCategory")} hintId={`${baseId}-category-hint`} required>
        <select id={fieldId.serviceCategory} name="serviceCategory" required defaultValue="not-sure" aria-invalid={errorFor("serviceCategory") ? true : undefined} aria-describedby={describedBy("serviceCategory", `${baseId}-category-hint`)} className={controlClass}>
          {serviceFamilies.map((family) => (
            <option key={family.id} value={family.id}>
              {family.label}
            </option>
          ))}
          <option value="not-sure">{inquiryMessages.categoryUnsure}</option>
        </select>
      </Field>

      <Field label={inquiryMessages.inquiry} hint={inquiryMessages.inquiryHint} field="inquiry" error={errorFor("inquiry")} hintId={`${baseId}-note-hint`}>
        <textarea id={fieldId.inquiry} name="inquiry" rows={5} maxLength={500} aria-invalid={errorFor("inquiry") ? true : undefined} aria-describedby={describedBy("inquiry", `${baseId}-note-hint`)} className={`${controlClass} py-2`} />
      </Field>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId.privacyAcknowledgement} className="flex min-h-11 w-full min-w-0 items-start gap-3 text-body">
          <input id={fieldId.privacyAcknowledgement} name="privacyAcknowledgement" type="checkbox" required className="mt-1 size-6 shrink-0" aria-invalid={errorFor("privacyAcknowledgement") ? true : undefined} aria-describedby={errorFor("privacyAcknowledgement") ? `${fieldId.privacyAcknowledgement}-error` : undefined} />
          <span className="min-w-0">
            {inquiryMessages.privacy} <span className="text-muted">({inquiryMessages.required})</span>
          </span>
        </label>
        <FieldError id={`${fieldId.privacyAcknowledgement}-error`} message={errorFor("privacyAcknowledgement")} />
      </div>

      <div className="absolute h-px w-px overflow-hidden opacity-0 [contain:strict]" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? inquiryMessages.submitting : inquiryMessages.submit}
      </Button>
    </form>
  );
}

function Field({
  label,
  hint,
  hintId,
  field,
  error,
  required = false,
  children,
}: {
  label: string;
  hint: string;
  hintId: string;
  field: InquiryField;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid w-full min-w-0 gap-2">
      <label htmlFor={fieldId[field]} className="text-meta font-medium">
        {label} {required ? <span className="text-muted">({inquiryMessages.required})</span> : null}
      </label>
      <p id={hintId} className="text-meta text-muted">{hint}</p>
      {children}
      <FieldError id={`${fieldId[field]}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-meta text-foreground">
      {message}
    </p>
  );
}

function Radio({ name, value, label }: { name: string; value: string; label: string }) {
  const id = `inquiry-method-${value}`;
  return (
    <label htmlFor={id} className="flex min-h-11 w-full min-w-0 items-center gap-3 text-body">
      <input id={id} name={name} type="radio" value={value} required className="size-6 shrink-0" />
      <span className="min-w-0">{label}</span>
    </label>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, RotateCcw, Send } from "lucide-react";
import { getEnquiryToken, submitEnquiry } from "@@/app/(site)/contact-us/actions";
import Turnstile from "@@/components/contact/Turnstile";
import SubmittingOverlay from "@@/components/common/SubmittingOverlay";
import { Button } from "@@/components/ui/button";
import { enquiryTypes } from "@@/data/contact";
import {
  ENQUIRY_EMAIL_MAX,
  ENQUIRY_MESSAGE_MAX,
  ENQUIRY_MESSAGE_MIN,
  ENQUIRY_NAME_MAX,
  ENQUIRY_PHONE_MAX,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@@/lib/enquiry";
import { HONEYPOT_FIELD, TOKEN_FIELD } from "@@/lib/form-action";
import {
  clearDraft,
  rememberForm,
  saveDraft,
  takeDraft,
  thankYouUrl,
  type SubmitStatus,
} from "@@/lib/thank-you";
import { cn } from "@@/lib/utils";

const EMPTY: EnquiryValues = { name: "", phone: "", email: "", type: "", message: "" };
const FIELD_ORDER: EnquiryField[] = ["name", "phone", "email", "type", "message"];
const LABELS: Record<EnquiryField, string> = {
  name: "Full name",
  phone: "Mobile number",
  email: "Email",
  type: "Enquiry type",
  message: "Message",
};

const controlClass =
  "mt-2 block min-h-11 w-full rounded-md border border-input bg-surface px-3 py-2 text-base text-ink shadow-sm placeholder:text-ink-subtle focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive";

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [restored, setRestored] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useState("");
  const [serverError, setServerError] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // The signed render token comes from a server action, so the page itself stays static.
  const refreshToken = useCallback(() => {
    getEnquiryToken()
      .then(setToken)
      .catch(() => setToken(""));
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    const draft = takeDraft<EnquiryValues>("enquiry");
    if (draft) {
      setValues({ ...EMPTY, ...draft });
      setRestored(true);
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as EnquiryField;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field]
        ? { ...current, [field]: validateEnquiry({ ...EMPTY, [field]: value })[field] }
        : current,
    );
  };

  const showErrors = (nextErrors: EnquiryErrors) => {
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!firstInvalid) {
      return false;
    }
    setShowSummary(true);
    document.getElementById(`enquiry-${firstInvalid}`)?.focus();
    return true;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (showErrors(validateEnquiry(values))) {
      return;
    }

    setServerError("");
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      let status: SubmitStatus = "failed";
      try {
        const result = await submitEnquiry(formData);
        if (!result.ok && result.fieldErrors && showErrors(result.fieldErrors)) {
          return;
        }
        if (!result.ok && (result.code === "expired" || result.code === "rate-limited" || result.code === "verification")) {
          if (result.code === "expired") refreshToken();
          setCaptchaReset((n) => n + 1);
          setServerError(result.error);
          requestAnimationFrame(() => statusRef.current?.focus());
          return;
        }
        status = result.ok ? "success" : "failed";
      } catch {
        status = "failed";
      }
      if (status === "success") {
        clearDraft("enquiry");
      } else {
        saveDraft("enquiry", values);
      }
      rememberForm("enquiry");
      router.push(thankYouUrl(status));
    });
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);
  const messageLength = values.message.trim().length;

  const fieldProps = (field: EnquiryField) => ({
    id: `enquiry-${field}`,
    name: field,
    value: values[field],
    onChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `enquiry-${field}-error` : undefined,
    className: controlClass,
  });

  const fieldError = (field: EnquiryField) =>
    errors[field] ? (
      <p id={`enquiry-${field}-error`} className="mt-2 text-sm font-medium text-destructive">
        {errors[field]}
      </p>
    ) : null;

  const label = (field: EnquiryField, required: boolean) => (
    <label htmlFor={`enquiry-${field}`} className="block text-sm font-semibold text-ink">
      {LABELS[field]}
      {required ? (
        <span className="text-destructive" aria-hidden="true"> *</span>
      ) : (
        <span className="font-normal text-ink-subtle"> (optional)</span>
      )}
    </label>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="enquiry-heading"
      aria-busy={isPending || undefined}
      className="relative scroll-mt-28 rounded-lg border border-border-muted bg-surface p-6 shadow-card sm:p-8"
    >
      <SubmittingOverlay open={isPending} title="Sending your enquiry..." />
      <h2 id="enquiry-heading" className="text-2xl font-bold">
        Send an enquiry
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Fields marked <span className="text-destructive" aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {restored ? (
        <p
          role="status"
          className="mt-6 flex items-start gap-3 rounded-md border border-gold/40 bg-gold/10 p-4 text-sm text-ink animate-in fade-in-0 duration-500 motion-reduce:animate-none"
        >
          <RotateCcw className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
          We&apos;ve restored the details you entered. Check them and press Send enquiry to try again.
        </p>
      ) : null}

      {serverError ? (
        <div
          ref={statusRef}
          role="alert"
          tabIndex={-1}
          className="mt-6 scroll-mt-28 rounded-md border border-destructive/40 bg-destructive/5 p-4 font-semibold text-destructive focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {serverError}
        </div>
      ) : null}

      {showSummary && errorList.length > 0 && (
        <div role="alert" className="mt-6 scroll-mt-28 rounded-md border border-destructive/40 bg-destructive/5 p-4">
          <p className="font-semibold text-destructive">
            Please fix {errorList.length === 1 ? "1 problem" : `${errorList.length} problems`}:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#enquiry-${field}`} className="inline-flex min-h-6 items-center py-0.5 text-destructive underline underline-offset-2">
                  {LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name={TOKEN_FIELD} value={token} readOnly />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("name", true)}
          <input type="text" autoComplete="name" aria-required="true" maxLength={ENQUIRY_NAME_MAX} {...fieldProps("name")} />
          {fieldError("name")}
        </div>

        <div>
          {label("phone", true)}
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            aria-required="true"
            maxLength={ENQUIRY_PHONE_MAX}
            {...fieldProps("phone")}
          />
          {fieldError("phone")}
        </div>

        <div>
          {label("email", true)}
          <input
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-required="true"
            maxLength={ENQUIRY_EMAIL_MAX}
            {...fieldProps("email")}
          />
          {fieldError("email")}
        </div>

        <div className="sm:col-span-2">
          {label("type", true)}
          <div className="relative">
            <select
              aria-required="true"
              {...fieldProps("type")}
              className={cn(
                controlClass,
                "cursor-pointer appearance-none pr-10",
                !values.type && "text-ink-subtle",
              )}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {enquiryTypes.map((type) => (
                <option key={type} value={type} className="text-ink">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted"
            />
          </div>
          {fieldError("type")}
        </div>

        <div className="sm:col-span-2">
          {label("message", true)}
          <div className="mt-1 flex items-center justify-between gap-3 text-sm">
            <p id="enquiry-message-hint" className="text-ink-subtle">
              Minimum {ENQUIRY_MESSAGE_MIN} characters
            </p>
            <p
              id="enquiry-message-count"
              className={cn(
                "tabular-nums transition-colors duration-300",
                messageLength >= ENQUIRY_MESSAGE_MIN ? "font-semibold text-primary" : "text-ink-subtle",
              )}
            >
              {messageLength} / {ENQUIRY_MESSAGE_MIN}
            </p>
          </div>
          <textarea
            rows={5}
            aria-required="true"
            maxLength={ENQUIRY_MESSAGE_MAX}
            {...fieldProps("message")}
            aria-describedby={`enquiry-message-hint enquiry-message-count${errors.message ? " enquiry-message-error" : ""}`}
            className={cn(controlClass, "resize-y")}
          />
          {fieldError("message")}
        </div>
      </div>

      <Turnstile resetKey={captchaReset} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-subtle">We&apos;ll reply to the email address you give us.</p>
        <Button type="submit" size="lg" disabled={isPending} className="hover:bg-primary-deep">
          {isPending ? (
            <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {isPending ? "Sending..." : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

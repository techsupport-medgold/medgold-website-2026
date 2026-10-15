"use client";

import { useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, ChevronDown, Loader2, MessageCircle, Phone, Send } from "lucide-react";
import { submitEnquiry } from "@@/app/(site)/contact-us/actions";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { enquiryTypes } from "@@/data/contact";
import {
  buildEnquiryMessage,
  ENQUIRY_MESSAGE_MIN,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@@/lib/enquiry";
import { HONEYPOT_FIELD } from "@@/lib/form-action";
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
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ email: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const successRef = useRef<HTMLDivElement>(null);
  const sendErrorRef = useRef<HTMLDivElement>(null);

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
    setSendError(null);
    if (showErrors(validateEnquiry(values))) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const result = await submitEnquiry(formData);
        if (result.ok) {
          setShowSummary(false);
          setSent({ email: values.email.trim() });
          setValues(EMPTY);
          requestAnimationFrame(() => successRef.current?.focus());
          return;
        }
        if (result.fieldErrors && showErrors(result.fieldErrors)) {
          return;
        }
        setSendError(result.error);
      } catch {
        setSendError(
          `We couldn't send your enquiry right now. Please try again, or reach us on WhatsApp or call ${SITE.contact.phone}.`,
        );
      }
      requestAnimationFrame(() => sendErrorRef.current?.focus());
    });
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);
  const messageLength = values.message.trim().length;

  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-primary/30 bg-primary/5 p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-700 fill-mode-both focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:animate-none sm:p-8"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Enquiry sent</h2>
        <p className="mt-3 text-ink-muted">
          Thank you for contacting us. Our team will get back to you soon. We&apos;ve emailed a copy of your enquiry
          to <strong className="break-all text-ink">{sent.email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-link underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

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
      className="relative rounded-lg border border-border-muted bg-surface p-6 shadow-card sm:p-8"
    >
      <h2 id="enquiry-heading" className="text-2xl font-bold">
        Send an enquiry
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Fields marked <span className="text-destructive" aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {showSummary && errorList.length > 0 && (
        <div role="alert" className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 p-4">
          <p className="font-semibold text-destructive">
            Please fix {errorList.length === 1 ? "1 problem" : `${errorList.length} problems`}:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#enquiry-${field}`} className="text-destructive underline underline-offset-2">
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

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("name", true)}
          <input type="text" autoComplete="name" aria-required="true" {...fieldProps("name")} />
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
            {...fieldProps("message")}
            aria-describedby={`enquiry-message-hint enquiry-message-count${errors.message ? " enquiry-message-error" : ""}`}
            className={cn(controlClass, "resize-y")}
          />
          {fieldError("message")}
        </div>
      </div>

      {sendError ? (
        <div
          ref={sendErrorRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 p-4 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <p className="font-semibold text-destructive">{sendError}</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/5">
              <a href={whatsappUrl(buildEnquiryMessage(values))} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                Send on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/5">
              <a href={`tel:${SITE.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                Call {SITE.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-subtle">We&apos;ll email you a copy of your enquiry.</p>
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

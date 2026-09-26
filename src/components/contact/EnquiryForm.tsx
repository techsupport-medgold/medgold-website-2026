"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { enquiryTypes } from "@@/data/contact";
import {
  buildEnquiryMessage,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@@/lib/enquiry";
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
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setShowSummary(true);
      document.getElementById(`enquiry-${firstInvalid}`)?.focus();
      return;
    }

    const url = whatsappUrl(buildEnquiryMessage(values));
    window.open(url, "_blank", "noopener,noreferrer");
    setShowSummary(false);
    setSentUrl(url);
    setValues(EMPTY);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

  if (sentUrl) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-primary/30 bg-primary/5 p-6 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-8"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Your enquiry is ready to send</h2>
        <p className="mt-3 text-ink-muted">
          We opened WhatsApp with your message filled in. Press send in WhatsApp to reach our
          team. If it didn&apos;t open, use the button below or call us.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="hover:bg-primary-deep">
            <a href={sentUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Open WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/5 hover:text-primary">
            <a href={`tel:${SITE.contact.phoneHref}`}>
              <Phone aria-hidden="true" />
              Call {SITE.contact.phone}
            </a>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setSentUrl(null)}
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
      className="rounded-lg border border-border-muted bg-surface p-6 shadow-card sm:p-8"
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
          {label("email", false)}
          <input type="email" autoComplete="email" placeholder="name@example.com" {...fieldProps("email")} />
          {fieldError("email")}
        </div>

        <div className="sm:col-span-2">
          {label("type", true)}
          <select aria-required="true" {...fieldProps("type")}>
            <option value="" disabled>
              Choose an option
            </option>
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldError("type")}
        </div>

        <div className="sm:col-span-2">
          {label("message", true)}
          <textarea rows={5} aria-required="true" {...fieldProps("message")} className={cn(controlClass, "resize-y")} />
          {fieldError("message")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-subtle">
          Submitting opens WhatsApp with your message ready to send.
        </p>
        <Button type="submit" size="lg" className="hover:bg-primary-deep">
          <Send aria-hidden="true" />
          Send enquiry
        </Button>
      </div>
    </form>
  );
}

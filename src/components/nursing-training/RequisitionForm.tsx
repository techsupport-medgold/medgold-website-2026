"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Lock, MessageCircle, Phone } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { requisition } from "@@/data/nursingTraining";
import {
  buildRequisitionMessage,
  validateRequisition,
  type RequisitionErrors,
  type RequisitionField,
  type RequisitionValues,
} from "@@/lib/ojtRequisition";
import { cn } from "@@/lib/utils";

const EMPTY: RequisitionValues = {
  facility: "",
  contact: "",
  email: "",
  phone: "",
  aides: "",
  timeline: "",
  challenges: "",
};
const REQUIRED: RequisitionField[] = ["facility", "contact", "email", "phone"];
const LABELS: Record<RequisitionField, string> = {
  facility: "Hospital / Healthcare Facility Name",
  contact: "Contact Official & Designation",
  email: "Official Hospital Email ID",
  phone: "Contact Phone / WhatsApp",
  aides: "Estimated Number of Aides to Train",
  timeline: "Preferred Cohort Start Timeline",
  challenges: "Specific Inpatient Challenges / Priority Areas",
};

const controlClass =
  "mt-1.5 block min-h-11 w-full rounded-md border border-input bg-surface px-3 py-2 text-base text-ink shadow-sm placeholder:text-ink-subtle focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive";

export default function RequisitionForm() {
  const [values, setValues] = useState<RequisitionValues>(EMPTY);
  const [errors, setErrors] = useState<RequisitionErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as RequisitionField;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    setErrors((current) => (current[field] ? { ...current, [field]: validateRequisition(next)[field] } : current));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRequisition(values);
    setErrors(nextErrors);

    const firstInvalid = REQUIRED.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setShowSummary(true);
      document.getElementById(`requisition-${firstInvalid}`)?.focus();
      return;
    }

    const url = whatsappUrl(buildRequisitionMessage(values));
    window.open(url, "_blank", "noopener,noreferrer");
    setShowSummary(false);
    setSentUrl(url);
    setValues(EMPTY);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const errorList = REQUIRED.filter((field) => errors[field]);

  if (sentUrl) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-primary/30 bg-primary/5 p-6 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-8"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Your requisition is ready to send</h3>
        <p className="mt-3 text-ink-muted">
          We opened WhatsApp with your requisition filled in. Press send in WhatsApp to reach our
          training directorate. If it didn&apos;t open, use the button below or call us.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="hover:bg-primary-deep">
            <a href={sentUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Open WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
          >
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
          Send another requisition
        </button>
      </div>
    );
  }

  const fieldProps = (field: RequisitionField) => ({
    id: `requisition-${field}`,
    name: field,
    value: values[field],
    onChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `requisition-${field}-error` : undefined,
    className: controlClass,
  });

  const fieldError = (field: RequisitionField) =>
    errors[field] ? (
      <p id={`requisition-${field}-error`} className="mt-1.5 text-sm font-medium text-destructive">
        {errors[field]}
      </p>
    ) : null;

  const label = (field: RequisitionField) => {
    const required = REQUIRED.includes(field);
    return (
      <label htmlFor={`requisition-${field}`} className="block text-sm font-semibold text-primary-deep">
        {LABELS[field]}
        {required ? (
          <span className="text-destructive" aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-ink-subtle"> (optional)</span>
        )}
      </label>
    );
  };

  const select = (field: "aides" | "timeline", options: readonly string[]) => (
    <div className="relative">
      <select
        {...fieldProps(field)}
        className={cn(controlClass, "cursor-pointer appearance-none pr-10", !values[field] && "text-ink-subtle")}
      >
        <option value="">Choose an option</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} aria-label="In-hospital OJT requisition">
      <p className="text-sm text-ink-muted">
        Fields marked <span className="text-destructive" aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {showSummary && errorList.length > 0 && (
        <div role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/5 p-4">
          <p className="font-semibold text-destructive">
            Please fix {errorList.length === 1 ? "1 problem" : `${errorList.length} problems`}:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#requisition-${field}`} className="text-destructive underline underline-offset-2">
                  {LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          {label("facility")}
          <input
            type="text"
            autoComplete="organization"
            placeholder="e.g. City Care Hospital"
            aria-required="true"
            {...fieldProps("facility")}
          />
          {fieldError("facility")}
        </div>
        <div>
          {label("contact")}
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. A. Kumar, Nursing Director"
            aria-required="true"
            {...fieldProps("contact")}
          />
          {fieldError("contact")}
        </div>
        <div>
          {label("email")}
          <input
            type="email"
            autoComplete="email"
            placeholder="nursing.admin@hospital.org"
            aria-required="true"
            {...fieldProps("email")}
          />
          {fieldError("email")}
        </div>
        <div>
          {label("phone")}
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
          {label("aides")}
          {select("aides", requisition.aidesOptions)}
        </div>
        <div>
          {label("timeline")}
          {select("timeline", requisition.timelineOptions)}
        </div>
        <div className="sm:col-span-2">
          {label("challenges")}
          <textarea
            rows={3}
            placeholder="e.g., Inpatient fall incidence, Tamil/English etiquette issues, lack of proper BMW bin adherence, bed sore turnaround delays..."
            {...fieldProps("challenges")}
            className={cn(controlClass, "resize-y")}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
          <Lock className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
          {requisition.confidential}
        </p>
        <Button type="submit" size="lg" className="hover:bg-primary-deep">
          {requisition.submit}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-3 text-xs text-ink-subtle sm:text-right">{requisition.submitNote}</p>
    </form>
  );
}

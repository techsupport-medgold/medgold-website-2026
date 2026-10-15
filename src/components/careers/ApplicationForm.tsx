"use client";

import { useRef, useState, useTransition, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from "react";
import { CheckCircle2, ChevronDown, FileText, Loader2, MessageCircle, Phone, Send, X } from "lucide-react";
import { submitApplication } from "@@/app/(site)/careers/actions";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { experienceLevels, positions } from "@@/data/careers";
import {
  RESUME_ACCEPT,
  buildApplicationMessage,
  formatFileSize,
  validateApplication,
  validateResume,
  type ApplicationField,
  type ApplicationValues,
} from "@@/lib/application";
import { HONEYPOT_FIELD } from "@@/lib/form-action";
import { cn } from "@@/lib/utils";

type FormField = ApplicationField | "resume";
type FormErrors = Partial<Record<FormField, string>>;

const EMPTY: ApplicationValues = {
  name: "",
  phone: "",
  email: "",
  position: "",
  experience: "",
  qualification: "",
  city: "",
  note: "",
};
const FIELD_ORDER: FormField[] = [
  "name",
  "phone",
  "email",
  "position",
  "experience",
  "qualification",
  "city",
  "resume",
  "note",
];
const LABELS: Record<FormField, string> = {
  name: "Full name",
  phone: "Mobile number",
  email: "Email",
  position: "Position applying for",
  experience: "Years of experience",
  qualification: "Highest qualification",
  city: "Current city",
  resume: "Resume",
  note: "Anything else we should know",
};

const controlClass =
  "mt-2 block min-h-11 w-full rounded-md border border-input bg-surface px-3 py-2 text-base text-ink shadow-sm placeholder:text-ink-subtle focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive";

export default function ApplicationForm() {
  const [values, setValues] = useState<ApplicationValues>(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const successRef = useRef<HTMLDivElement>(null);
  const sendErrorRef = useRef<HTMLDivElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ApplicationField;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: validateApplication({ ...EMPTY, [field]: value })[field] } : current,
    );
  };

  const onResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResume(file);
    setErrors((current) => ({ ...current, resume: file ? (validateResume(file) ?? undefined) : current.resume }));
  };

  const clearResume = () => {
    setResume(null);
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
      resumeInputRef.current.focus();
    }
  };

  const showErrors = (nextErrors: FormErrors) => {
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!firstInvalid) {
      return false;
    }
    setShowSummary(true);
    document.getElementById(`application-${firstInvalid}`)?.focus();
    return true;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(null);
    const resumeError = validateResume(resume);
    const nextErrors: FormErrors = { ...validateApplication(values), ...(resumeError ? { resume: resumeError } : {}) };
    if (showErrors(nextErrors) || !resume) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("resume", resume);

    startTransition(async () => {
      try {
        const result = await submitApplication(formData);
        if (result.ok) {
          setShowSummary(false);
          setSentTo(values.email.trim());
          setValues(EMPTY);
          setResume(null);
          requestAnimationFrame(() => successRef.current?.focus());
          return;
        }
        if (result.fieldErrors && showErrors(result.fieldErrors)) {
          return;
        }
        setSendError(result.error);
      } catch {
        setSendError(
          `We couldn't send your application right now. Please try again, or reach us on WhatsApp or call ${SITE.contact.phone}.`,
        );
      }
      requestAnimationFrame(() => sendErrorRef.current?.focus());
    });
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

  if (sentTo !== null) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-primary/30 bg-primary/5 p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-700 fill-mode-both focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:animate-none sm:p-8"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Application sent</h2>
        <p className="mt-3 text-ink-muted">
          Thank you for applying. We&apos;ve emailed a confirmation to{" "}
          <strong className="break-all text-ink">{sentTo}</strong>. Our team will review your resume and call you if
          your profile matches the role.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-link underline-offset-4 hover:underline"
        >
          Send another application
        </button>
      </div>
    );
  }

  const fieldProps = (field: ApplicationField) => ({
    id: `application-${field}`,
    name: field,
    value: values[field],
    onChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `application-${field}-error` : undefined,
    className: controlClass,
  });

  const fieldError = (field: FormField) =>
    errors[field] ? (
      <p id={`application-${field}-error`} className="mt-2 text-sm font-medium text-destructive">
        {errors[field]}
      </p>
    ) : null;

  const label = (field: FormField, required: boolean) => (
    <label htmlFor={`application-${field}`} className="block text-sm font-semibold text-ink">
      {LABELS[field]}
      {required ? (
        <span className="text-destructive" aria-hidden="true"> *</span>
      ) : (
        <span className="font-normal text-ink-subtle"> (optional)</span>
      )}
    </label>
  );

  const textField = (field: ApplicationField, required: boolean, props: InputHTMLAttributes<HTMLInputElement>) => (
    <>
      {label(field, required)}
      <input aria-required={required || undefined} {...props} {...fieldProps(field)} />
      {fieldError(field)}
    </>
  );

  const selectField = (field: ApplicationField, options: readonly string[]) => (
    <>
      {label(field, true)}
      <div className="relative">
        <select
          aria-required="true"
          {...fieldProps(field)}
          className={cn(controlClass, "cursor-pointer appearance-none pr-10", !values[field] && "text-ink-subtle")}
        >
          <option value="" disabled>
            Choose an option
          </option>
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
      {fieldError(field)}
    </>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="application-heading"
      aria-busy={isPending || undefined}
      className="relative rounded-lg border border-border-muted bg-surface p-6 shadow-card sm:p-8"
    >
      <h2 id="application-heading" className="text-2xl font-bold">
        Apply for a job
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
                <a href={`#application-${field}`} className="text-destructive underline underline-offset-2">
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
        <div className="sm:col-span-2">{textField("name", true, { type: "text", autoComplete: "name" })}</div>
        <div>
          {textField("phone", true, {
            type: "tel",
            inputMode: "tel",
            autoComplete: "tel-national",
            placeholder: "98765 43210",
          })}
        </div>
        <div>
          {textField("email", true, { type: "email", autoComplete: "email", placeholder: "name@example.com" })}
        </div>
        <div>{selectField("position", positions)}</div>
        <div>{selectField("experience", experienceLevels)}</div>
        <div>{textField("qualification", true, { type: "text", placeholder: "e.g. B.Sc Nursing, GNM, DMLT" })}</div>
        <div>{textField("city", false, { type: "text", autoComplete: "address-level2", placeholder: "e.g. Chennai" })}</div>

        <div className="sm:col-span-2">
          {label("resume", true)}
          <p id="application-resume-hint" className="mt-1 text-sm text-ink-subtle">
            PDF, DOC or DOCX, up to 4 MB.
          </p>
          <input
            ref={resumeInputRef}
            id="application-resume"
            type="file"
            accept={RESUME_ACCEPT}
            onChange={onResumeChange}
            aria-required="true"
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={errors.resume ? "application-resume-hint application-resume-error" : "application-resume-hint"}
            className={cn(
              controlClass,
              "cursor-pointer border-dashed py-2.5 text-sm text-ink-muted file:mr-4 file:min-h-9 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary/10 file:px-4 file:text-sm file:font-semibold file:text-primary-deep file:transition-colors hover:file:bg-primary hover:file:text-white",
              resume && "hidden",
            )}
          />
          {resume ? (
            <div className="mt-2 flex items-center gap-3 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 animate-in fade-in-0 duration-300 motion-reduce:animate-none">
              <FileText className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-sm">
                <span className="block truncate font-semibold text-ink">{resume.name}</span>
                <span className="text-ink-subtle">{formatFileSize(resume.size)}</span>
              </p>
              <button
                type="button"
                onClick={clearResume}
                className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-link hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <X className="size-4" aria-hidden="true" />
                Remove<span className="sr-only"> {resume.name}</span>
              </button>
            </div>
          ) : null}
          {fieldError("resume")}
        </div>

        <div className="sm:col-span-2">
          {label("note", false)}
          <textarea rows={4} {...fieldProps("note")} className={cn(controlClass, "resize-y")} />
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
              <a href={whatsappUrl(buildApplicationMessage(values))} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                Apply on WhatsApp
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
        <p className="text-sm text-ink-subtle">We&apos;ll email you a confirmation once your application is sent.</p>
        <Button type="submit" size="lg" disabled={isPending} className="hover:bg-primary-deep">
          {isPending ? (
            <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {isPending ? "Sending..." : "Submit application"}
        </Button>
      </div>
    </form>
  );
}

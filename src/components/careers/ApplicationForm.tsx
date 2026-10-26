"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  RefreshCw,
  RotateCcw,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import { submitApplication } from "@@/app/(site)/careers/actions";
import SubmittingOverlay from "@@/components/common/SubmittingOverlay";
import { Button } from "@@/components/ui/button";
import { experienceLevels, positions } from "@@/data/careers";
import {
  RESUME_ACCEPT,
  formatFileSize,
  validateApplication,
  validateResume,
  type ApplicationField,
  type ApplicationValues,
} from "@@/lib/application";
import { HONEYPOT_FIELD, MAIL_FAILURE_MESSAGE } from "@@/lib/form-action";
import { clearDraft, rememberForm, saveDraft, takeDraft, thankYouUrl } from "@@/lib/thank-you";
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
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [isPending, startTransition] = useTransition();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const draft = takeDraft<ApplicationValues>("application");
    if (draft) {
      setValues({ ...EMPTY, ...draft });
      setRestored(true);
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ApplicationField;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: validateApplication({ ...EMPTY, [field]: value })[field] } : current,
    );
  };

  const pickResume = (file: File | undefined) => {
    if (!file) {
      return;
    }
    const error = validateResume(file);
    setResume(error ? null : file);
    setErrors((current) => ({ ...current, resume: error ?? undefined }));
    if (error && resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const onResumeChange = (event: ChangeEvent<HTMLInputElement>) => pickResume(event.target.files?.[0]);

  const onResumeDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    pickResume(event.dataTransfer.files[0]);
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
    setSubmitError(null);
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
        if (!result.ok) {
          if (result.fieldErrors && showErrors(result.fieldErrors)) {
            return;
          }
          saveDraft("application", values);
          setSubmitError(result.error || MAIL_FAILURE_MESSAGE);
          return;
        }
      } catch {
        saveDraft("application", values);
        setSubmitError(MAIL_FAILURE_MESSAGE);
        return;
      }
      clearDraft("application");
      rememberForm("application");
      router.push(thankYouUrl("success"));
    });
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

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
      <SubmittingOverlay open={isPending} title="Uploading your application..." />
      <h2 id="application-heading" className="text-2xl font-bold">
        Apply for a job
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
          <span>
            We&apos;ve restored the details you entered. <strong>Please attach your resume again</strong>, then press
            Submit application.
          </span>
        </p>
      ) : null}

      {submitError ? (
        <p
          role="alert"
          className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm font-medium text-destructive"
        >
          {submitError}
        </p>
      ) : null}

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
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
        />
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
          <p id="application-resume-label" className="block text-sm font-semibold text-ink">
            {LABELS.resume}
            <span className="text-destructive" aria-hidden="true"> *</span>
          </p>
          <input
            ref={resumeInputRef}
            id="application-resume"
            type="file"
            accept={RESUME_ACCEPT}
            onChange={onResumeChange}
            aria-labelledby="application-resume-label"
            aria-required="true"
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={errors.resume ? "application-resume-hint application-resume-error" : "application-resume-hint"}
            className="peer sr-only"
          />
          {resume ? (
            <div className="mt-2 flex flex-wrap items-center gap-3 rounded-lg border border-primary/30 bg-surface p-4 shadow-sm animate-in fade-in-0 slide-in-from-bottom-1 duration-300 motion-reduce:animate-none sm:flex-nowrap">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <p className="min-w-0 flex-1 text-sm">
                <span className="block truncate font-semibold text-ink">{resume.name}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-ink-subtle">
                  {formatFileSize(resume.size)}
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Ready to send
                  </span>
                </span>
              </p>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-link hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Replace<span className="sr-only"> {resume.name}</span>
                </button>
                <button
                  type="button"
                  onClick={clearResume}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-ink-muted hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <X className="size-4" aria-hidden="true" />
                  Remove<span className="sr-only"> {resume.name}</span>
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="application-resume"
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsDragging(false);
                }
              }}
              onDrop={onResumeDrop}
              className={cn(
                "group mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors duration-300",
                "peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50",
                isDragging
                  ? "border-solid border-primary bg-primary/10"
                  : errors.resume
                    ? "border-destructive/60 bg-destructive/5 hover:bg-destructive/10"
                    : "border-primary/40 bg-primary/[0.04] hover:border-primary hover:bg-primary/[0.08] peer-focus-visible:border-primary peer-focus-visible:bg-primary/[0.08]",
              )}
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform duration-300 ease-spring group-hover:-translate-y-1 motion-reduce:transform-none",
                  isDragging && "-translate-y-1 scale-110",
                )}
                aria-hidden="true"
              >
                <UploadCloud className="size-6" />
              </span>
              <span className="text-base text-ink" aria-hidden="true">
                {isDragging ? (
                  <strong className="font-semibold text-primary-deep">Drop your resume here</strong>
                ) : (
                  <>
                    <strong className="font-semibold text-primary-deep underline-offset-4 group-hover:underline">
                      Click to upload your resume
                    </strong>{" "}
                    <span className="text-ink-muted">or drag and drop it here</span>
                  </>
                )}
              </span>
              <span id="application-resume-hint" className="text-sm text-ink-subtle">
                PDF, DOC or DOCX - up to 4 MB
              </span>
            </label>
          )}
          {resume ? (
            <span id="application-resume-hint" className="sr-only">
              PDF, DOC or DOCX - up to 4 MB
            </span>
          ) : null}
          {fieldError("resume")}
        </div>

        <div className="sm:col-span-2">
          {label("note", false)}
          <textarea rows={4} {...fieldProps("note")} className={cn(controlClass, "resize-y")} />
        </div>
      </div>

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

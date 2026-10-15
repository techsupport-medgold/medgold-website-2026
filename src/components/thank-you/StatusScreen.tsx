import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Check, HeartPulse, Mail, MessageCircle, Phone, RotateCcw, Sparkles } from "lucide-react";
import FailedActions from "@@/components/thank-you/FailedActions";
import { Button } from "@@/components/ui/button";
import { SITE, whatsappUrl } from "@@/config/site";
import { THANK_YOU_CONTENT } from "@@/data/thankYou";
import type { FormKind, SubmitStatus } from "@@/lib/thank-you";
import { cn } from "@@/lib/utils";

const enter = "animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-700 motion-reduce:animate-none";

function StatusBadge({ status, overlap }: { status: SubmitStatus; overlap: boolean }) {
  const success = status === "success";
  return (
    <span
      className={cn(
        "relative mx-auto flex size-24 items-center justify-center",
        overlap && "-mt-12 rounded-full bg-surface",
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-safe:[animation-iteration-count:2]",
          success ? "bg-gold/30" : "bg-destructive/15",
        )}
      />
      <span
        className={cn(
          "relative flex size-24 items-center justify-center rounded-full ring-8 animate-in zoom-in-50 fade-in-0 duration-500 ease-spring motion-reduce:animate-none",
          success ? "bg-primary text-white ring-gold/30" : "bg-destructive/10 text-destructive ring-destructive/10",
        )}
      >
        {success ? <Check className="size-12" strokeWidth={3} /> : <AlertTriangle className="size-11" />}
      </span>
    </span>
  );
}

export default function StatusScreen({ status, form }: { status: SubmitStatus; form: FormKind }) {
  const content = THANK_YOU_CONTENT[form][status];
  const success = status === "success";
  const image = content.image;

  return (
    <section aria-labelledby="status-heading" className="brand-wash py-14 sm:py-20">
      <div className="container">
        <div
          className={cn(
            "mx-auto overflow-hidden rounded-2xl border bg-surface text-center shadow-card",
            success ? "border-primary/15" : "border-destructive/20",
            image ? "max-w-3xl" : "max-w-2xl",
            enter,
          )}
        >
          {image ? (
            <div className="relative aspect-[16/9] sm:aspect-[16/7]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent"
                aria-hidden="true"
              />
              <p className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-pill bg-surface/95 px-4 py-2 text-sm font-semibold text-primary-deep shadow-card">
                <HeartPulse className="size-4 text-gold-ink" aria-hidden="true" />
                {image.badge}
              </p>
            </div>
          ) : null}

          <div className={cn("p-6 sm:p-10", image && "pt-0 sm:pt-0")}>
            <StatusBadge status={status} overlap={Boolean(image)} />

            <p
              className={cn(
                "mt-8 text-xs font-bold uppercase tracking-[0.16em]",
                success ? "text-gold-ink" : "text-destructive",
              )}
            >
              {content.eyebrow}
            </p>
            <span className="gold-rule mx-auto mt-3" aria-hidden="true" />
            <h1
              id="status-heading"
              className={cn("mt-4 text-3xl font-bold text-primary-deep sm:text-4xl", enter, "delay-100")}
            >
              {content.heading}
            </h1>
            <p className={cn("mx-auto mt-4 max-w-xl text-lg text-ink-muted", enter, "delay-200")}>
              {content.intro}
              {content.confirmation ? ` ${content.confirmation}` : null}
            </p>
            {content.encouragement ? (
              <p
                className={cn(
                  "mt-5 inline-flex items-center gap-2 rounded-pill bg-gold/15 px-4 py-2 text-sm font-semibold text-gold-ink",
                  enter,
                  "delay-200",
                )}
              >
                <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                {content.encouragement}
              </p>
            ) : null}
            {content.note ? (
              <p className="mx-auto mt-4 inline-flex rounded-pill bg-gold/15 px-4 py-2 text-sm font-semibold text-gold-ink">
                {content.note}
              </p>
            ) : null}

            {content.steps ? (
              <div className={cn("mt-8 rounded-xl bg-surface-raised p-5 text-left sm:p-6", enter, "delay-300")}>
                <h2 className="text-lg font-bold text-primary-deep">{content.stepsHeading}</h2>
                <ol className="mt-4 grid gap-4">
                  {content.steps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="pt-1 text-sm text-ink-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div
              className={cn(
                "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
                "justify-center",
                enter,
                "delay-300",
              )}
            >
              <Button asChild size="lg" className="group">
                <Link href={content.primary.href}>
                  {success ? (
                    <ArrowLeft
                      className="transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  ) : (
                    <RotateCcw aria-hidden="true" />
                  )}
                  {content.primary.label}
                </Link>
              </Button>
              {success ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
                >
                  <Link href={content.secondary.href}>{content.secondary.label}</Link>
                </Button>
              ) : (
                <>
                  <FailedActions form={form} />
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
                </>
              )}
            </div>

            {success && content.again ? (
              <Link
                href={content.again.href}
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-link underline-offset-4 hover:underline"
              >
                {content.again.label}
              </Link>
            ) : null}
            {!success ? (
              <Link
                href={content.secondary.href}
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-link underline-offset-4 hover:underline"
              >
                {content.secondary.label}
              </Link>
            ) : null}

            <div className="mt-8 border-t border-border-muted pt-6">
              <p className="text-sm font-semibold text-ink">
                {success ? "Need to reach us sooner?" : "Prefer to talk to someone now?"}
              </p>
              <ul
                className={cn(
                  "mt-3 flex flex-col gap-x-6 gap-y-2 text-sm sm:flex-row sm:flex-wrap",
                  "items-center justify-center",
                )}
              >
                <li>
                  <a
                    href={`tel:${SITE.contact.phoneHref}`}
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-link hover:underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {SITE.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-link hover:underline"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="inline-flex min-h-11 items-center gap-2 break-all font-medium text-link hover:underline"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {SITE.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

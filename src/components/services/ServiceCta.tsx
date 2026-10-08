import Link from "next/link";
import { CircleCheck, Lock, Mail, MessageCircle, Phone, Send, type LucideIcon } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE, whatsappUrl } from "@@/config/site";
import { cn } from "@@/lib/utils";

export type ServiceCtaPoint = { icon: LucideIcon; title?: string; text: string };

type ServiceCtaProps = {
  id?: string;
  headingId: string;
  eyebrow: string;
  heading: string;
  subheading?: string;
  intro: string;
  points?: readonly ServiceCtaPoint[];
  shareHeading?: string;
  shareFields?: readonly string[];
  note?: string;
  cta: { label: string; icon?: LucideIcon };
  ctaNote?: string;
  tone?: "surface" | "raised" | "muted";
};

const TONES = {
  surface: "bg-surface",
  raised: "bg-surface-raised",
  muted: "bg-surface-muted",
} as const;

const chipClass =
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-sm font-semibold text-primary-deep transition-colors hover:text-primary hover:underline";

export default function ServiceCta({
  id,
  headingId,
  eyebrow,
  heading,
  subheading,
  intro,
  points,
  shareHeading = "Share with our team",
  shareFields,
  note,
  cta,
  ctaNote = "Opens our Contact Us page.",
  tone = "muted",
}: ServiceCtaProps) {
  const CtaIcon = cta.icon ?? Send;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24 py-16 sm:py-20", TONES[tone])}>
      <div className="container">
        <div className="grid gap-10 rounded-3xl bg-surface p-6 shadow-lg sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-ink">
              <span className="h-0.5 w-6 shrink-0 bg-gold-ink" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id={headingId} className="mt-4 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl">
              {heading}
            </h2>
            {subheading ? <p className="mt-3 text-xl font-semibold text-gold-ink">{subheading}</p> : null}
            <p className="mt-4 text-ink-muted">{intro}</p>

            {points?.length ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {points.map(({ icon: Icon, title, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-ink">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm">
                      {title ? <span className="block font-bold text-primary-deep">{title}</span> : null}
                      <span className={title ? "block text-ink-muted" : "block font-semibold text-primary-deep"}>
                        {text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Contact details">
              <li>
                <a href={`tel:${SITE.contact.phoneHref}`} className={chipClass}>
                  <Phone className="size-4 text-gold-ink" aria-hidden="true" />
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.contact.phoneAltHref}`} className={chipClass}>
                  <Phone className="size-4 text-gold-ink" aria-hidden="true" />
                  {SITE.contact.phoneAlt}
                </a>
              </li>
              <li className="min-w-0">
                <a href={`mailto:${SITE.contact.email}`} className={cn(chipClass, "break-all")}>
                  <Mail className="size-4 shrink-0 text-gold-ink" aria-hidden="true" />
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={chipClass}>
                  <MessageCircle className="size-4 text-gold-ink" aria-hidden="true" />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl bg-surface-raised p-6 sm:p-8 lg:col-span-5">
            {shareFields?.length ? (
              <div>
                <h3 className="text-sm font-semibold text-primary-deep">{shareHeading}</h3>
                <ul className="mt-3 grid gap-2.5 text-sm text-ink-muted">
                  {shareFields.map((field) => (
                    <li key={field} className="flex items-start gap-2.5">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              {note ? (
                <p className="flex items-start gap-2 text-xs font-semibold text-ink-subtle">
                  <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {note}
                </p>
              ) : null}
              <Button
                asChild
                size="lg"
                className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center text-sm font-semibold hover:bg-primary-deep"
              >
                <Link href={DevRoutes.CONTACT}>
                  <CtaIcon aria-hidden="true" />
                  {cta.label}
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-ink-subtle">{ctaNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

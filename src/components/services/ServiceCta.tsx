import Link from "next/link";
import { ArrowRight, CircleCheck, Lock, Send, type LucideIcon } from "lucide-react";
import { Button } from "@@/components/ui/button";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import SectionHeader from "@@/components/ui/section-header";
import { Routes } from "@@/config/routes";
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
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24 py-section", TONES[tone])}>
      <div className="container">
        <Reveal className="relative grid gap-10 overflow-hidden rounded-[1.75rem] border border-border-muted bg-surface p-6 shadow-card-hover sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <span
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative min-w-0 lg:col-span-7">
            <SectionHeader id={headingId} eyebrow={eyebrow} title={heading} className="max-w-none" />
            {subheading ? <p className="mt-3 text-xl font-semibold text-gold-ink">{subheading}</p> : null}
            <p className="mt-4 text-ink-muted">{intro}</p>

            {points?.length ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {points.map(({ icon: Icon, title, text }) => (
                  <li key={text} className="group flex items-start gap-3">
                    <IconBadge icon={Icon} tone="gold" size="sm" className="rounded-full" />
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
          </div>

          <div className="relative flex min-w-0 flex-col justify-between gap-6 rounded-card bg-surface-raised p-6 sm:p-8 lg:col-span-5">
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
                <p className="flex items-start gap-2 text-xs font-semibold text-ink-muted">
                  <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {note}
                </p>
              ) : null}
              <Button
                asChild
                size="lg"
                className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center text-sm font-semibold"
              >
                <Link href={Routes.CONTACT}>
                  <CtaIcon aria-hidden="true" />
                  {cta.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-2 text-center text-xs text-ink-muted">{ctaNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DevRoutes } from "@@/config/routes";

export const metadata: Metadata = {
  title: "Pages in development",
  description: "Pre-launch preview pages for Med Gold.",
};

const PAGES = [
  { href: DevRoutes.HOME, title: "Home", description: "Future homepage." },
  { href: DevRoutes.ABOUT, title: "About", description: "About Med Gold." },
  { href: DevRoutes.SERVICES, title: "Services", description: "Services we offer." },
  {
    href: DevRoutes.STAFFING,
    title: "Healthcare Facility Staffing",
    description: "Hospital manpower supply, staffing and practical training service.",
  },
  {
    href: DevRoutes.PHARMACY_AUDIT,
    title: "Pharmacy Stock Audit & Growth",
    description: "Pharmacy stock audit and profit consulting service.",
  },
  { href: DevRoutes.BRANDING, title: "Hospital & Clinic Branding & Marketing", description: "Placeholder service page." },
  { href: DevRoutes.PATIENT_FEEDBACK, title: "Patient Feedback Systems", description: "Capture touchpoints, 5-stage workflow, deployment estimator and audit demo CTA." },
  { href: DevRoutes.NURSING_TRAINING, title: "Nursing Training", description: "Training pillars, curriculum, cohort planner and hospital assessment CTA." },
  { href: DevRoutes.CAREERS, title: "Careers", description: "Jobs at Med Gold." },
  { href: DevRoutes.CONTACT, title: "Contact Us", description: "Enquiry form and contact details." },
  { href: DevRoutes.PRIVACY, title: "Privacy Policy", description: "Placeholder privacy policy." },
  { href: DevRoutes.TERMS, title: "Terms and Conditions", description: "Placeholder terms of use." },
];

export default function DevIndexPage() {
  return (
    <section aria-labelledby="dev-heading" className="py-16 sm:py-20">
      <div className="container max-w-3xl">
        <span className="gold-rule" aria-hidden="true" />
        <h1 id="dev-heading" className="mt-4 text-3xl font-bold sm:text-4xl">
          Pages in development
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          These previews are reachable by URL only and are hidden from search engines.
        </p>
        <ul className="mt-10 grid gap-4">
          {PAGES.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group flex min-h-11 items-center justify-between rounded-lg border border-border-muted bg-surface p-5 shadow-card transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block font-semibold text-ink">{page.title}</span>
                  <span className="block text-sm text-ink-subtle">
                    {page.description} <span className="text-link">{page.href}</span>
                  </span>
                </span>
                <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

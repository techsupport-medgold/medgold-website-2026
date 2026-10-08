import type { Metadata } from "next";
import Link from "next/link";
import { DevRoutes } from "@@/config/routes";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Hospital operations, audit and growth case studies from Med Gold. This page is in development.",
};

export default function CaseStudiesPage() {
  return (
    <section aria-labelledby="case-studies-heading" className="py-20 sm:py-24">
      <div className="container max-w-3xl">
        <span className="gold-rule" aria-hidden="true" />
        <h1 id="case-studies-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
          Case Studies
        </h1>
        <p className="mt-6 text-lg text-ink-muted">
          This page is in development. Case studies from hospitals and clinics we support will be added before
          launch. To discuss results for your facility,{" "}
          <Link href={DevRoutes.CONTACT} className="text-link underline underline-offset-2 hover:no-underline">
            contact our team
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

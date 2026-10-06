import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { caseStudy } from "@@/data/home";

export default function CaseStudySection() {
  return (
    <section id="case-study" aria-labelledby="case-study-heading" className="scroll-mt-28 bg-surface py-16 sm:py-20">
      <div className="container">
        <div className="grid overflow-hidden rounded-3xl bg-primary-deep text-white shadow-xl lg:grid-cols-12">
          <div className="flex flex-col p-8 sm:p-12 lg:col-span-7">
            <p className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-gold px-2 py-0.5 text-xs font-semibold text-ink">
              <Award className="size-3.5" aria-hidden="true" />
              {caseStudy.badge}
            </p>
            <h2
              id="case-study-heading"
              className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {caseStudy.heading}
            </h2>
            <p className="mt-5 text-white/80">{caseStudy.intro}</p>

            <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-sm text-white/80">{metric.label}</dt>
                  <dd className="order-1 text-4xl font-semibold tracking-tight text-gold">{metric.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal bg-gold py-2.5 text-ink hover:bg-gold/90">
                <Link href={DevRoutes.CONTACT}>{caseStudy.primaryCta}</Link>
              </Button>
              <Link
                href={DevRoutes.CONTACT}
                className="group inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-white hover:underline"
              >
                {caseStudy.secondaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-white/10 bg-white/5 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold">{caseStudy.roadmapHeading}</h3>
            <ol className="mt-6 grid gap-6">
              {caseStudy.roadmap.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                    <p className="mt-1 text-sm text-white/75">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

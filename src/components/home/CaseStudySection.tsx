import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@@/components/ui/button";
import CountUp from "@@/components/ui/count-up";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import { Eyebrow } from "@@/components/ui/section-header";
import Timeline from "@@/components/ui/timeline";
import { DevRoutes } from "@@/config/routes";
import { caseStudy } from "@@/data/home";

export default function CaseStudySection() {
  return (
    <Section id="case-study" aria-labelledby="case-study-heading" className="scroll-mt-28">
      <Reveal className="brand-dark grid overflow-hidden rounded-[1.75rem] shadow-card-hover lg:grid-cols-12">
        <div className="flex flex-col p-8 sm:p-12 lg:col-span-7">
          <p className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-gold px-3 py-1 text-xs font-bold text-ink">
            <Award className="size-3.5" aria-hidden="true" />
            {caseStudy.badge}
          </p>
          <h2 id="case-study-heading" className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {caseStudy.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">{caseStudy.intro}</p>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-sm text-white/80">{metric.label}</dt>
                <dd className="order-1 font-display text-4xl font-extrabold tracking-tight text-gold sm:text-5xl">
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="accent" className="h-auto min-h-12 whitespace-normal px-6 py-3 font-semibold">
              <Link href={DevRoutes.CONTACT}>
                {caseStudy.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href={DevRoutes.CONTACT}
              className="link-underline inline-flex min-h-11 w-fit items-center gap-1.5 px-2 text-sm font-semibold text-white"
            >
              {caseStudy.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
          <Eyebrow tone="dark">{caseStudy.roadmapHeading}</Eyebrow>
          <Timeline
            tone="dark"
            orientation="vertical"
            className="mt-8"
            steps={caseStudy.roadmap.map((step) => ({ title: step.title, text: step.description }))}
          />
        </div>
      </Reveal>
    </Section>
  );
}

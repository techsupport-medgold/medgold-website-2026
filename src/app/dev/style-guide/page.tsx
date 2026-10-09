import type { Metadata } from "next";
import { ArrowRight, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import Breadcrumb from "@@/components/common/Breadcrumb";
import StatsBar from "@@/components/services/StatsBar";
import { DevRoutes } from "@@/config/routes";
import Accordion from "@@/components/ui/accordion";
import { Button } from "@@/components/ui/button";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Pill from "@@/components/ui/pill";
import Reveal from "@@/components/ui/reveal";
import { stagger } from "@@/lib/motion";
import Section from "@@/components/ui/section";
import SectionHeader, { Eyebrow } from "@@/components/ui/section-header";
import Timeline from "@@/components/ui/timeline";
import { colors, faqDemo, imageRules, motionRules, statsDemo, STYLE_GUIDE_SEO, timelineDemo, typeScale } from "@@/data/style-guide";

export const metadata: Metadata = {
  title: STYLE_GUIDE_SEO.title,
  description: STYLE_GUIDE_SEO.description,
};

const CARD_VARIANTS = ["default", "elevated", "outline", "soft"] as const;

export default function StyleGuidePage() {
  return (
    <>
      <Breadcrumb current="Style Guide" path={DevRoutes.STYLE_GUIDE} />
      <Section tone="wash" aria-labelledby="style-guide-heading">
        <SectionHeader
          as="h1"
          id="style-guide-heading"
          size="lg"
          eyebrow="Design system"
          title="Med Gold style guide"
          intro="One source for tokens, typography, components, motion and imagery. Build every page from these pieces so the site stays consistent."
        />
      </Section>

      <Section aria-labelledby="sg-colours">
        <SectionHeader id="sg-colours" eyebrow="Foundations" title="Colour" intro="Contrast ratios are measured against white. Gold is decorative on light backgrounds; use gold ink for text." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color, index) => (
            <Reveal as="li" key={color.token} delay={stagger(index, 50)}>
              <Card padding="none" className="overflow-hidden">
                <span className={`block h-20 ${color.swatch}`} aria-hidden="true" />
                <div className="p-5">
                  <p className="font-display font-bold text-primary-deep">{color.name}</p>
                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {color.token} · {color.hex}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{color.use}</p>
                  <Pill tone="neutral" className="mt-3">
                    {color.contrast}
                  </Pill>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" aria-labelledby="sg-type">
        <SectionHeader id="sg-type" eyebrow="Foundations" title="Typography" intro="Plus Jakarta Sans for headings, Inter for body text. Headings balance, paragraphs avoid orphans." />
        <dl className="mt-10 divide-y divide-border-muted rounded-card bg-surface">
          {typeScale.map((row) => (
            <div key={row.label} className="grid gap-2 p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{row.label}</dt>
              <dd className={row.className}>{row.sample}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section aria-labelledby="sg-buttons">
        <SectionHeader id="sg-buttons" eyebrow="Components" title="Buttons and pills" intro="One primary action per viewport. Trailing arrows nudge on hover; buttons compress slightly when pressed." />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button size="lg">
            Primary action <ArrowRight aria-hidden="true" />
          </Button>
          <Button size="lg" variant="accent">
            Accent action <ArrowRight aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline">
            Secondary
          </Button>
          <Button size="lg" variant="ghost">
            Ghost
          </Button>
          <Button variant="link">Text link</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Pill>Teal pill</Pill>
          <Pill tone="gold">Gold pill</Pill>
          <Pill tone="neutral">Neutral pill</Pill>
          <Pill tone="solid">Solid pill</Pill>
        </div>
        <div className="mt-8 rounded-card brand-dark p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" variant="accent">
              Accent on dark <ArrowRight aria-hidden="true" />
            </Button>
            <Button size="lg" variant="inverse">
              Inverse
            </Button>
            <Pill tone="dark">Dark pill</Pill>
          </div>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="sg-cards">
        <SectionHeader id="sg-cards" eyebrow="Components" title="Cards and icon badges" intro="Interactive cards lift on hover and keyboard focus. Hover any card below." />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARD_VARIANTS.map((variant, index) => (
            <Reveal as="li" key={variant} delay={stagger(index)}>
              <Card variant={variant} interactive className="group h-full">
                <IconBadge icon={[Stethoscope, HeartPulse, ShieldCheck, Stethoscope][index]} tone={index % 2 ? "gold" : "soft"} />
                <h3 className="mt-5 text-lg font-bold capitalize text-primary-deep">{variant} card</h3>
                <p className="mt-2 text-sm text-ink-muted">Use the {variant} variant for {index === 3 ? "quiet supporting content" : "grids of services or features"}.</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="sg-timeline">
        <SectionHeader id="sg-timeline" eyebrow="Patterns" title="Timeline" intro="Processes and step-by-step content. Horizontal on desktop, vertical on mobile." />
        <Timeline steps={timelineDemo} className="mt-12" />
      </Section>

      <StatsBar label="Stat band demo" stats={statsDemo} />

      <Section aria-labelledby="sg-faq">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeader id="sg-faq" eyebrow="Patterns" title="Accordion" intro="Native details and summary, so it works by keyboard and without JavaScript." />
          <Accordion items={faqDemo} />
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="sg-rules">
        <SectionHeader id="sg-rules" eyebrow="Guidelines" title="Motion and imagery" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <Eyebrow>Motion</Eyebrow>
            <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm text-ink-muted">
              {motionRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <Eyebrow>Images</Eyebrow>
            <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm text-ink-muted">
              {imageRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}

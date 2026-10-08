import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  Globe,
  IndianRupee,
  Megaphone,
  MessageSquareQuote,
  MousePointerClick,
  Share2,
  Shield,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { services, type GrowthServiceIcon } from "@@/data/branding";
import { stagger } from "@@/lib/motion";
import { cn } from "@@/lib/utils";

const SERVICE_ICONS: Record<GrowthServiceIcon, LucideIcon> = {
  digital: Megaphone,
  branding: Building2,
  leads: Users,
  ads: MousePointerClick,
  social: Share2,
  website: Globe,
  doctor: Stethoscope,
  orm: Shield,
  reviews: MessageSquareQuote,
  content: FileText,
  business: BriefcaseBusiness,
  revenue: IndianRupee,
};

export default function GrowthServices() {
  return (
    <Section aria-labelledby="growth-services-heading">
      <SectionHeader
        id="growth-services-heading"
        eyebrow={services.eyebrow}
        title={services.heading}
        intro={services.intro}
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item, index) => {
          const Icon = SERVICE_ICONS[item.icon];
          const gold = item.tone === "gold";
          return (
            <Reveal as="li" key={item.title} delay={stagger(index % 3)}>
              <Card interactive className="group h-full overflow-hidden">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none",
                    gold ? "bg-gold" : "bg-gradient-to-r from-primary to-primary-deep",
                  )}
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <IconBadge icon={Icon} tone={gold ? "gold" : "soft"} />
                  <span className="font-mono text-xs font-bold text-ink-subtle" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-primary-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                <div className="mt-auto pt-5">
                  <p
                    className={cn(
                      "flex items-center gap-1.5 border-t border-border-muted pt-4 text-sm font-semibold",
                      gold ? "text-gold-ink" : "text-primary",
                    )}
                  >
                    {item.outcome}
                    <ArrowRight
                      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

import {
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
import { services, type GrowthServiceIcon } from "@@/data/branding";
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
    <section aria-labelledby="growth-services-heading" className="bg-surface-raised py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-ink">{services.eyebrow}</p>
          <h2
            id="growth-services-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-primary-deep sm:text-4xl"
          >
            {services.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{services.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => {
            const Icon = SERVICE_ICONS[item.icon];
            const gold = item.tone === "gold";
            return (
              <li key={item.title} className="flex flex-col rounded-lg bg-surface p-6 shadow-card">
                <span className="flex size-10 items-center justify-center rounded bg-surface-raised">
                  <Icon className={cn("size-5", gold ? "text-gold-ink" : "text-primary-deep")} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-primary-deep">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
                <p className={cn("mt-auto pt-4 text-xs font-semibold", gold ? "text-gold-ink" : "text-primary-deep")}>
                  {item.outcome} <span aria-hidden="true">→</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

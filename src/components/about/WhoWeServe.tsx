import { GraduationCap, Hospital, Landmark, Pill, Stethoscope, type LucideIcon } from "lucide-react";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import ResponsiveImage from "@@/components/ui/responsive-image";
import Section from "@@/components/ui/section";
import SectionHeader from "@@/components/ui/section-header";
import { audiences, type AudienceIcon } from "@@/data/about";
import { stagger } from "@@/lib/motion";

const AUDIENCE_ICONS: Record<AudienceIcon, LucideIcon> = {
  hospital: Hospital,
  clinic: Stethoscope,
  pharmacy: Pill,
  education: GraduationCap,
  public: Landmark,
};

export default function WhoWeServe() {
  return (
    <Section aria-labelledby="serve-heading" containerClassName="grid items-center gap-12 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-6">
        <SectionHeader id="serve-heading" eyebrow={audiences.eyebrow} title={audiences.heading} />
        <ul className="mt-8 grid gap-3">
          {audiences.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.label}
              delay={stagger(index)}
              className="group flex min-h-14 items-center gap-4 rounded-xl border border-border-muted bg-surface px-4 py-3 font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-card motion-reduce:hover:translate-y-0"
            >
              <IconBadge icon={AUDIENCE_ICONS[item.icon]} tone={index % 2 === 0 ? "soft" : "gold"} size="sm" />
              {item.label}
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="relative isolate min-w-0 lg:col-span-6">
        <div
          className="absolute -inset-3 -z-10 rotate-2 rounded-[1.75rem] bg-gradient-to-br from-gold/40 via-gold/10 to-primary/20 sm:-inset-4"
          aria-hidden="true"
        />
        <div className="group overflow-hidden rounded-card shadow-card-hover ring-1 ring-black/5">
          <ResponsiveImage
            src={audiences.image.src}
            alt={audiences.image.alt}
            sizes="(min-width: 1024px) 45vw, 100vw"
            zoom
            className="aspect-[4/3]"
          />
        </div>
      </Reveal>
    </Section>
  );
}

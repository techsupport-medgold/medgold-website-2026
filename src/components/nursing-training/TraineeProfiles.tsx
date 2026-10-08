import {
  Award,
  BriefcaseMedical,
  GraduationCap,
  HeartHandshake,
  ShieldPlus,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import Card from "@@/components/ui/card";
import IconBadge from "@@/components/ui/icon-badge";
import Reveal from "@@/components/ui/reveal";
import Section from "@@/components/ui/section";
import { traineeProfiles, type ProfileIcon } from "@@/data/nursingTraining";
import { stagger } from "@@/lib/motion";

const PROFILE_ICONS: Record<ProfileIcon, LucideIcon> = {
  diploma: GraduationCap,
  anm: ShieldPlus,
  gnm: BriefcaseMedical,
  bsc: Award,
  aide: HeartHandshake,
  ward: Users,
};

export default function TraineeProfiles() {
  return (
    <Section tone="dark" aria-labelledby="profiles-heading">
      <div className="flex flex-col gap-4 border-b border-white/15 pb-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2
          id="profiles-heading"
          className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          <IconBadge icon={UserCheck} tone="dark" />
          {traineeProfiles.heading}
        </h2>
        <p className="flex items-center gap-2.5 text-sm text-white/80 md:max-w-sm md:text-right">
          <span className="status-dot shrink-0" aria-hidden="true" />
          {traineeProfiles.intro}
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {traineeProfiles.profiles.map((profile, index) => (
          <Reveal as="li" key={profile.label} delay={stagger(index, 60)}>
            <Card
              variant="dark"
              padding="sm"
              interactive
              className="group h-full items-center gap-3 text-center text-sm font-semibold hover:border-gold/40 hover:bg-white/[0.1]"
            >
              <IconBadge icon={PROFILE_ICONS[profile.icon]} tone="dark" />
              {profile.label}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

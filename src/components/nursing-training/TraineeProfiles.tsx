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
import { traineeProfiles, type ProfileIcon } from "@@/data/nursingTraining";

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
    <section aria-labelledby="profiles-heading" className="bg-primary-deep py-8 text-white">
      <div className="container">
        <div className="flex flex-col gap-2 border-b border-white/20 pb-3 md:flex-row md:items-center md:justify-between">
          <h2 id="profiles-heading" className="flex items-center gap-2 text-lg font-bold text-white">
            <UserCheck className="size-5 shrink-0 text-gold" aria-hidden="true" />
            {traineeProfiles.heading}
          </h2>
          <p className="text-sm text-white/80">{traineeProfiles.intro}</p>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {traineeProfiles.profiles.map((profile) => {
            const Icon = PROFILE_ICONS[profile.icon];
            return (
              <li
                key={profile.label}
                className="flex flex-col items-center gap-1 rounded bg-white/10 p-3 text-center text-sm font-semibold"
              >
                <Icon className="size-5 text-gold" aria-hidden="true" />
                {profile.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

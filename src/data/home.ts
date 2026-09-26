import { SITE } from "@@/config/site";

/** Copy for the future homepage, previewed at /dev/home. */
export const HOME_SEO = {
  title: "Home",
  description: SITE.description,
};

export const homeHero = {
  eyebrow: `Launching ${SITE.launchYear}`,
  headingLead: "Gold-standard healthcare is",
  headingAccent: "coming soon",
  intro:
    "Med Gold is building a patient-first healthcare experience: experienced doctors, modern diagnostics, and care that fits around your life.",
};

export const homeExpectIntro =
  "We are preparing services designed to make quality care simple, transparent, and personal.";

export const homeExpectItems = [
  {
    icon: "stethoscope",
    title: "Expert consultations",
    description:
      "Unhurried appointments with experienced doctors who listen and explain clearly.",
  },
  {
    icon: "microscope",
    title: "Modern diagnostics",
    description:
      "Accurate lab tests and health screenings with clear, timely reports.",
  },
  {
    icon: "heart-pulse",
    title: "Preventive care",
    description:
      "Health check-up plans that help you and your family stay ahead of illness.",
  },
] as const;

export type ExpectIcon = (typeof homeExpectItems)[number]["icon"];

import { absoluteUrl, SITE } from "@@/config/site";

export const COMING_SOON_PAGE_URL = absoluteUrl("/");

export const COMING_SOON_SEO = {
  title: SITE.title,
  description: SITE.description,
};

export const comingSoonHero = {
  eyebrow: `Launching ${SITE.launchYear}`,
  heading: "Gold-standard healthcare is coming soon",
  intro:
    "Med Gold is building a patient-first healthcare experience: experienced doctors, modern diagnostics, and care that fits around your life. Our website is on its way.",
};

export const comingSoonExpectIntro =
  "We are preparing services designed to make quality care simple, transparent, and personal.";

export const comingSoonExpectItems = [
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

export type ExpectIcon = (typeof comingSoonExpectItems)[number]["icon"];

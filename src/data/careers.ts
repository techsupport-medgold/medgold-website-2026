/** Copy for the careers page. */
export const CAREERS_SEO = {
  title: "Careers",
  description: "Careers at Med Gold. This page is in development.",
};

export const careersHero = {
  heading: "Careers at Med Gold",
  intro: "This page is in development. Open roles will be listed here before launch.",
};

export type Trainer = {
  name: string;
  role: string;
  experienceYears: number;
  bio?: string;
  photo?: { src: string; alt: string };
};

export type Founder = Trainer & { about: string[]; expertise: string[] };

// TODO: replace with real details (experience years and the founder's about text).
export const founder: Founder = {
  name: "Mr. Sundramurthi",
  role: "Founder, MedGold Healthcare",
  experienceYears: 20,
  about: [
    "Mr. Sundramurthi founded MedGold Healthcare to give hospitals and clinics one dependable partner for the operational work that keeps patient care running smoothly.",
    "His experience spans hospital operations, pharmacy stock audits, healthcare staffing and nursing education. He personally guides our training programs and the teams we place with partner facilities.",
  ],
  expertise: [
    "Hospital Operations",
    "Pharmacy Stock Audit",
    "NABH Readiness",
    "Healthcare Staffing",
    "Nursing Training",
    "Patient Feedback Systems",
    "Hospital Branding",
  ],
};

export const trainers = {
  founderHeader: {
    eyebrow: "Learn from experienced leaders",
    heading: "Meet Our Founder",
    intro: "The vision and experience behind MedGold Healthcare's training and operations.",
  },
  staffHeader: {
    eyebrow: "Hands-on nursing education",
    heading: "Our Expert Trainers",
    intro: "Our senior nursing tutors lead classroom and bedside training for every batch.",
  },
  staff: [
    {
      name: "Gajalakshmi N",
      role: "Senior Nursing Tutor",
      experienceYears: 12,
      photo: {
        src: "/images/careers/gajalakshmi-n-senior-nursing-tutor.avif",
        alt: "Gajalakshmi N, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
    {
      name: "Praveena",
      role: "Senior Nursing Tutor",
      experienceYears: 8,
      photo: {
        src: "/images/careers/praveena-senior-nursing-tutor.avif",
        alt: "Praveena, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
  ] satisfies Trainer[] as Trainer[],
};

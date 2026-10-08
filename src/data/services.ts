/** Copy for the services page, previewed at /dev/services. */
export const SERVICES_SEO = {
  title: "Services",
  description: "Healthcare services from Med Gold. This page is in development.",
};

export const servicesHero = {
  heading: "Our services",
  intro: "This page is in development. Details of our services will be added before launch.",
};

export type ServicePlaceholder = { title: string; description: string };

/** Service pages that are planned but not yet written. Each renders through ServicePlaceholderPage. */
export const servicePlaceholders = {
  branding: {
    title: "Hospital & Clinic Branding & Marketing",
    description: "Branding and marketing services for hospitals and clinics from Med Gold. This page is in development.",
  },
  patientFeedback: {
    title: "Patient Feedback Systems",
    description:
      "Patient feedback collection and system integration services from Med Gold. This page is in development.",
  },
  nursingTraining: {
    title: "Nursing Training",
    description: "Nursing assistant training and on-the-job programmes from Med Gold. This page is in development.",
  },
} satisfies Record<string, ServicePlaceholder>;

/** Copy for the careers page. */
export const CAREERS_SEO = {
  title: "Careers",
  description: "Careers at Med Gold. This page is in development.",
};

export const careersHero = {
  heading: "Careers at Med Gold",
  intro: "This page is in development. Open roles will be listed here before launch.",
};

export type Trainer = { name: string; role: string; bio?: string; photo?: { src: string; alt: string } };

export const trainers = {
  eyebrow: "Learn from experienced leaders",
  heading: "Meet Our Founder & Trainers",
  intro: "Our training programs are led by the Med Gold founder and our senior nursing tutors.",
  people: [
    { name: "Mr. Sundramurthi", role: "Founder, MedGold Healthcare" },
    {
      name: "Gajalakshmi N",
      role: "Senior Nursing Tutor",
      photo: {
        src: "/images/careers/gajalakshmi-n-senior-nursing-tutor.avif",
        alt: "Gajalakshmi N, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
    {
      name: "Praveena",
      role: "Senior Nursing Tutor",
      photo: {
        src: "/images/careers/praveena-senior-nursing-tutor.avif",
        alt: "Praveena, Senior Nursing Tutor at MedGold Healthcare",
      },
    },
  ] satisfies Trainer[] as Trainer[],
};

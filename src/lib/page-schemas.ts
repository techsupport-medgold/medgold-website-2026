import { SITE_URL } from "@@/config/site";

/**
 * Page-level JSON-LD graphs supplied by the SEO expert (Oct 26, 2026) for the
 * home, about, contact and staffing pages. Each page renders exactly one graph.
 * Clean-ups vs the expert draft: E.164 phone, en-IN inLanguage, copy rule
 * applied to descriptions and one shared email constant.
 */

/** Email used in schema only. Switch here once the owner picks the public address. */
export const SCHEMA_EMAIL = "sundharmedgold@gmail.com";
export const SCHEMA_PHONE = "+919150937804";
export const SCHEMA_LANGUAGE = "en-IN";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HOME_URL = `${SITE_URL}/`;
const ORG_NAME = "Medgold Healthcare";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Santosh Nagar, Janaki Raman Nagar, Teacher Colony, Kolathur",
  addressLocality: "Chennai",
  addressRegion: "Tamil Nadu",
  postalCode: "600099",
  addressCountry: "IN",
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: HOME_URL,
  name: ORG_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: SCHEMA_LANGUAGE,
};

const orgRef = { "@type": "Organization", "@id": ORG_ID, name: ORG_NAME, url: HOME_URL };

const crumbs = (url: string, name: string, id: string) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
    { "@type": "ListItem", position: 2, name, item: url },
  ],
});

const graph = (nodes: Record<string, unknown>[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeSchemaGraph() {
  return graph([
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG_NAME,
      url: HOME_URL,
      founder: { "@type": "Person", name: "Mr. Sundaramoorthy", jobTitle: "Founder & CEO" },
      telephone: SCHEMA_PHONE,
      email: SCHEMA_EMAIL,
      address: postalAddress,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SCHEMA_PHONE,
        email: SCHEMA_EMAIL,
        contactType: "customer support",
        availableLanguage: ["English", "Tamil"],
      },
      sameAs: ["https://wa.me/919150937804"],
    },
    website,
  ]);
}

export function aboutSchemaGraph() {
  const url = `${SITE_URL}/about-us`;
  return graph([
    {
      "@type": "AboutPage",
      "@id": `${url}#aboutpage`,
      url,
      name: "About Us | Medgold Healthcare",
      description:
        "Learn about Medgold Healthcare, our mission, values and commitment to providing healthcare services.",
      inLanguage: SCHEMA_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    crumbs(url, "About Us", `${url}#breadcrumb`),
    orgRef,
    website,
  ]);
}

export function contactSchemaGraph() {
  const url = `${SITE_URL}/contact-us`;
  return graph([
    {
      "@type": "ContactPage",
      "@id": `${url}#contactpage`,
      url,
      name: "Contact Us | Medgold Healthcare",
      description:
        "Have a question about our services, appointments or careers? Send us an enquiry and our team will get back to you.",
      inLanguage: SCHEMA_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    crumbs(url, "Contact Us", `${url}#breadcrumb`),
    {
      ...orgRef,
      contactPoint: {
        "@type": "ContactPoint",
        name: "Mr. Sundaramoorthy",
        telephone: SCHEMA_PHONE,
        email: SCHEMA_EMAIL,
        contactType: "customer service",
        availableLanguage: ["English", "Tamil"],
      },
      address: postalAddress,
    },
    website,
  ]);
}

export function staffingSchemaGraph() {
  const url = `${SITE_URL}/hospital-healthcare-medical-facility-staffing-services`;
  const name = "Hospital Healthcare Medical Facility Staffing Services";
  return graph([
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      url,
      description:
        "Medgold Healthcare provides staffing services for hospitals, healthcare organizations and medical facilities to support their workforce requirements.",
      serviceType: "Hospital, Healthcare and Medical Facility Staffing Services",
      provider: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: `${name} | Medgold Healthcare`,
      description:
        "Explore Medgold Healthcare's staffing services for hospitals, healthcare organizations and medical facilities.",
      inLanguage: SCHEMA_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    crumbs(url, name, `${url}#breadcrumb`),
    orgRef,
    website,
  ]);
}

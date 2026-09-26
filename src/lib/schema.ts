import { absoluteUrl, SITE, SITE_URL } from "@@/config/site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(SITE.logo),
  },
  image: absoluteUrl("/opengraph-image"),
  description: SITE.description,
  email: SITE.contact.email,
  telephone: SITE.contact.phoneHref,
  address: {
    "@type": "PostalAddress",
    ...SITE.contact.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: SITE.contact.email,
    telephone: SITE.contact.phoneHref,
    areaServed: SITE.contact.address.addressCountry,
    availableLanguage: ["English"],
  },
  ...(SITE.social.length > 0 ? { sameAs: SITE.social } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { "@id": ORGANIZATION_ID },
};

type WebPageSchemaInput = {
  url: string;
  name: string;
  description: string;
};

export function webPageSchema({ url, name, description }: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE.language,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

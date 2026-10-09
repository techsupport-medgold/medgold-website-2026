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
  telephone: SITE.contact.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  hasMap: SITE.mapUrl,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: SITE.contact.phoneHref,
    areaServed: SITE.country,
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

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

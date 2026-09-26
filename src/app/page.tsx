import type { Metadata } from "next";
import ComingSoon from "@@/components/coming-soon/ComingSoon";
import JsonLd from "@@/components/common/JsonLd";
import { COMING_SOON_PAGE_URL, COMING_SOON_SEO } from "@@/data/comingSoon";
import { webPageSchema } from "@@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: COMING_SOON_SEO.title },
  description: COMING_SOON_SEO.description,
  alternates: {
    canonical: COMING_SOON_PAGE_URL,
  },
};

export default function Home() {
  return (
    <>
      <ComingSoon />
      <JsonLd
        id="webpage-schema"
        data={webPageSchema({
          url: COMING_SOON_PAGE_URL,
          name: COMING_SOON_SEO.title,
          description: COMING_SOON_SEO.description,
        })}
      />
    </>
  );
}

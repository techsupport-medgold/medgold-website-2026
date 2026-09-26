import type { Metadata } from "next";
import ComingSoonHero from "@@/components/coming-soon/ComingSoonHero";
import ContactSection from "@@/components/coming-soon/ContactSection";
import ExpectSection from "@@/components/coming-soon/ExpectSection";
import Footer from "@@/components/common/Footer";
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
    <div className="coming-soon-page flex min-h-screen flex-col">
      <main className="flex-1">
        <ComingSoonHero />
        <ExpectSection />
        <ContactSection />
      </main>
      <Footer />
      <JsonLd
        id="webpage-schema"
        data={webPageSchema({
          url: COMING_SOON_PAGE_URL,
          name: COMING_SOON_SEO.title,
          description: COMING_SOON_SEO.description,
        })}
      />
    </div>
  );
}

import type { Metadata } from "next";
import PageSchema from "@@/components/common/PageSchema";
import SiteSchema from "@@/components/common/SiteSchema";
import LegalPage from "@@/components/legal/LegalPage";
import { Routes } from "@@/config/routes";
import { TERMS_LAST_UPDATED, TERMS_SEO, termsSections } from "@@/data/legal";

export const metadata: Metadata = {
  title: TERMS_SEO.title,
  description: TERMS_SEO.description,
  alternates: { canonical: Routes.TERMS },
};

export default function TermsPage() {
  return (
    <>
      <SiteSchema />
      <PageSchema path={Routes.TERMS} name={TERMS_SEO.title} description={TERMS_SEO.description} />
      <LegalPage
        title="Terms of Service"
        path={Routes.TERMS}
        lastUpdated={TERMS_LAST_UPDATED}
        sections={termsSections}
      />
    </>
  );
}

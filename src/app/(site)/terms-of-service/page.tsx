import type { Metadata } from "next";
import LegalPage from "@@/components/legal/LegalPage";
import { Routes } from "@@/config/routes";
import { LEGAL_PLACEHOLDER_NOTE, TERMS_LAST_UPDATED, TERMS_SEO, termsSections } from "@@/data/legal";

export const metadata: Metadata = {
  title: TERMS_SEO.title,
  description: TERMS_SEO.description,
  alternates: { canonical: Routes.TERMS },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path={Routes.TERMS}
      lastUpdated={TERMS_LAST_UPDATED}
      note={LEGAL_PLACEHOLDER_NOTE}
      sections={termsSections}
    />
  );
}

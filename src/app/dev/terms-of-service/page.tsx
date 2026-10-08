import type { Metadata } from "next";
import LegalPage from "@@/components/legal/LegalPage";
import { TERMS_SEO, termsSections } from "@@/data/legal";

export const metadata: Metadata = {
  title: TERMS_SEO.title,
  description: TERMS_SEO.description,
};

export default function TermsPage() {
  return <LegalPage title="Terms of Service" sections={termsSections} />;
}

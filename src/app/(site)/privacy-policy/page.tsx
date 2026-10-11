import type { Metadata } from "next";
import LegalPage from "@@/components/legal/LegalPage";
import { Routes } from "@@/config/routes";
import { PRIVACY_SEO, privacySections } from "@@/data/legal";

export const metadata: Metadata = {
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  alternates: { canonical: Routes.PRIVACY },
};

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" path={Routes.PRIVACY} sections={privacySections} />;
}

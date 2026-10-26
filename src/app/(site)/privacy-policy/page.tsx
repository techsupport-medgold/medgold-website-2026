import type { Metadata } from "next";
import PageSchema from "@@/components/common/PageSchema";
import SiteSchema from "@@/components/common/SiteSchema";
import LegalPage from "@@/components/legal/LegalPage";
import { Routes } from "@@/config/routes";
import { PRIVACY_LAST_UPDATED, PRIVACY_SEO, privacySections } from "@@/data/legal";

export const metadata: Metadata = {
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  alternates: { canonical: Routes.PRIVACY },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteSchema />
      <PageSchema path={Routes.PRIVACY} name={PRIVACY_SEO.title} description={PRIVACY_SEO.description} />
      <LegalPage
        title="Privacy Policy"
        path={Routes.PRIVACY}
        lastUpdated={PRIVACY_LAST_UPDATED}
        sections={privacySections}
      />
    </>
  );
}

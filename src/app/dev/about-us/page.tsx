import type { Metadata } from "next";
import Breadcrumb from "@@/components/common/Breadcrumb";
import { DevRoutes } from "@@/config/routes";

export const metadata: Metadata = {
  title: "About",
  description: "About Med Gold. This page is in development.",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb current="About Us" path={DevRoutes.ABOUT} />
      <section aria-labelledby="about-heading" className="py-20 sm:py-24">
        <div className="container max-w-3xl">
          <span className="gold-rule" aria-hidden="true" />
          <h1 id="about-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
            About Med Gold
          </h1>
          <p className="mt-6 text-lg text-ink-muted">
            This page is in development. Content will be added before launch.
          </p>
        </div>
      </section>
    </>
  );
}

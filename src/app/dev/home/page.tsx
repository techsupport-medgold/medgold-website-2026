import type { Metadata } from "next";
import ContactSection from "@@/components/home/ContactSection";
import ExpectSection from "@@/components/home/ExpectSection";
import HomeHero from "@@/components/home/HomeHero";
import { HOME_SEO } from "@@/data/home";

export const metadata: Metadata = {
  title: HOME_SEO.title,
  description: HOME_SEO.description,
};

export default function DevHomePage() {
  return (
    <>
      <HomeHero />
      <ExpectSection />
      <ContactSection />
    </>
  );
}

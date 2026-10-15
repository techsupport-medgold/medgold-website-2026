import { Routes } from "@@/config/routes";
import { nextSteps as applicationSteps } from "@@/data/careers";
import type { FormKind, SubmitStatus } from "@@/lib/thank-you";

type Link = { href: string; label: string };

export type StatusContent = {
  title: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Shown on the page only; the confirmation email itself skips it. */
  confirmation?: string;
  note?: string;
  encouragement?: string;
  image?: { src: string; alt: string; badge: string };
  stepsHeading?: string;
  steps?: readonly string[];
  primary: Link;
  secondary: Link;
  again?: Link;
};

export const THANK_YOU_CONTENT: Record<FormKind, Record<SubmitStatus, StatusContent>> = {
  enquiry: {
    success: {
      title: "Enquiry Sent",
      eyebrow: "Enquiry received",
      heading: "Thank you! Your enquiry has been sent",
      intro:
        "We've emailed a confirmation to the address you gave. Our team will review your enquiry and get back to you soon.",
      stepsHeading: "What happens next",
      steps: [
        "Our team reads your enquiry and passes it to the right specialist.",
        "We call or email you to understand your needs in more detail.",
        "You receive a clear plan or answer, with no obligation.",
      ],
      primary: { href: Routes.HOME, label: "Back to home" },
      secondary: { href: `${Routes.HOME}#services`, label: "Explore our services" },
      again: { href: Routes.CONTACT, label: "Send another enquiry" },
    },
    failed: {
      title: "Enquiry Not Sent",
      eyebrow: "Something went wrong",
      heading: "We couldn't send your enquiry",
      intro:
        "Your details are safe. This is usually a temporary problem on our side. Please try again, or reach us directly below.",
      primary: { href: Routes.CONTACT, label: "Try again" },
      secondary: { href: Routes.HOME, label: "Back to home" },
    },
  },
  application: {
    success: {
      title: "Application Received",
      eyebrow: "Application received",
      heading: "Your next great opportunity is on its way",
      intro:
        "Thank you for choosing MedGold Healthcare. Healthcare professionals like you make every patient's day better, and we're excited to help you find a role where you can grow and thrive.",
      confirmation: "We've emailed you a confirmation.",
      encouragement: "A wonderful opportunity could be just a call away.",
      image: {
        src: "/images/staffing/nursing.jpg",
        alt: "MedGold Healthcare nurses caring for a patient",
        badge: "Caring careers start here",
      },
      stepsHeading: "What happens next",
      steps: applicationSteps.steps.slice(1),
      primary: { href: Routes.HOME, label: "Back to home" },
      secondary: { href: Routes.ABOUT, label: "Learn about us" },
      again: { href: Routes.CAREERS, label: "Submit another application" },
    },
    failed: {
      title: "Application Not Sent",
      eyebrow: "Something went wrong",
      heading: "We couldn't send your application",
      intro:
        "Your details are safe. This is usually a temporary problem on our side. Please try again, or reach us directly below.",
      note: "Please attach your resume again when you retry.",
      primary: { href: Routes.CAREERS, label: "Try again" },
      secondary: { href: Routes.HOME, label: "Back to home" },
    },
  },
};

export const THANK_YOU_DESCRIPTION =
  "Confirmation of your enquiry or job application to MedGold Healthcare, with next steps and ways to reach our team.";

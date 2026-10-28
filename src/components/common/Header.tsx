import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AccessibilityWidget from "@@/components/common/AccessibilityWidget";
import Logo from "@@/components/common/Logo";
import MobileMenu from "@@/components/common/MobileMenu";
import NavLinks from "@@/components/common/NavLinks";
import ScrollHeader from "@@/components/common/ScrollHeader";
import { Button } from "@@/components/ui/button";
import { Routes } from "@@/config/routes";
import { SITE } from "@@/config/site";

export default function Header() {
  return (
    <ScrollHeader>
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href={Routes.HOME} aria-label={`${SITE.name} home`} className="rounded-md">
          <Logo height={44} loading="eager" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" className="flex items-center gap-1" />
        </nav>

        <div className="flex items-center gap-2">
          <AccessibilityWidget />
          <Button asChild size="lg" className="hidden h-11 px-5 font-semibold sm:inline-flex">
            <Link href={Routes.CONTACT}>
              Contact Us
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </ScrollHeader>
  );
}

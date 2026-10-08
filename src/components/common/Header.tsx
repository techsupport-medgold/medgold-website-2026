import Link from "next/link";
import Logo from "@@/components/common/Logo";
import MobileMenu from "@@/components/common/MobileMenu";
import NavLinks from "@@/components/common/NavLinks";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-muted bg-surface/95 backdrop-blur">
      <div className="bg-surface-muted">
        <div className="container flex justify-center py-1.5">
          <Link
            href={DevRoutes.INDEX}
            className="text-xs font-medium text-ink-muted hover:text-ink"
          >
            Development preview - not public
          </Link>
        </div>
      </div>

      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href={DevRoutes.HOME} aria-label={`${SITE.name} home`} className="rounded-md">
          <Logo height={44} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" className="flex items-center gap-1" />
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden hover:bg-primary-deep sm:inline-flex">
            <Link href={DevRoutes.CONTACT}>Contact Us</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

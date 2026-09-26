import Logo from "@@/components/common/Logo";
import { SITE } from "@@/config/site";

export default function Footer() {
  return (
    <footer className="bg-primary-deep py-10 text-white">
      <div className="container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Logo tone="light" />
        <p className="text-sm text-white/80">
          &copy; {SITE.launchYear} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

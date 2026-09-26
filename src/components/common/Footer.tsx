import Logo from "@@/components/common/Logo";
import { SITE } from "@@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-muted bg-surface-muted py-10">
      <div className="container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Logo height={40} />
        <p className="text-sm text-ink-muted">
          &copy; {SITE.launchYear} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

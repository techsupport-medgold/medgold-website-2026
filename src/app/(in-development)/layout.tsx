import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@@/components/common/Footer";
import Logo from "@@/components/common/Logo";
import { SITE } from "@@/config/site";

/**
 * Pages in this group are reachable by URL but must never be indexed until launch.
 * Their paths must also be listed in DEV_ROUTES (src/config/routes.ts) for the X-Robots-Tag header.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function InDevelopmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border-muted bg-surface">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" aria-label={`${SITE.name} home`} className="rounded-md">
            <Logo priority />
          </Link>
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted">
            Preview
          </span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

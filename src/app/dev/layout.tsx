import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@@/components/common/Footer";
import Logo from "@@/components/common/Logo";
import { DevRoutes } from "@@/config/routes";
import { SITE } from "@@/config/site";

/** Everything under /dev is a pre-launch preview: reachable by URL, never indexed. */
export const metadata: Metadata = {
  title: {
    template: `%s (Preview) | ${SITE.name}`,
    default: `Preview | ${SITE.name}`,
  },
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

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border-muted bg-surface">
        <div className="container flex items-center justify-between gap-4 py-4">
          <Link href={DevRoutes.HOME} aria-label={`${SITE.name} preview home`} className="rounded-md">
            <Logo priority />
          </Link>
          <Link
            href={DevRoutes.INDEX}
            className="inline-flex min-h-11 items-center rounded-full bg-surface-muted px-4 text-xs font-medium text-ink-muted hover:text-ink"
          >
            Development preview - not public
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

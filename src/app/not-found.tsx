import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@@/components/common/Logo";
import { Button } from "@@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <Logo />
      <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-gold-ink">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        Our full website is launching soon. In the meantime, head back to the
        home page to find out more.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}

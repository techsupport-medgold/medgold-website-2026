import Link from "next/link";
import { Button } from "@@/components/ui/button";
import { DevRoutes } from "@@/config/routes";
import type { ServicePlaceholder } from "@@/data/services";

export default function ServicePlaceholderPage({ service }: { service: ServicePlaceholder }) {
  return (
    <section aria-labelledby="service-heading" className="py-20 sm:py-24">
      <div className="container max-w-3xl">
        <span className="gold-rule" aria-hidden="true" />
        <h1 id="service-heading" className="mt-4 text-4xl font-bold sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-6 text-lg text-ink-muted">
          This page is coming soon. Talk to our team to learn how we can help.
        </p>
        <Button asChild size="lg" className="mt-8 hover:bg-primary-deep">
          <Link href={DevRoutes.CONTACT}>Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}

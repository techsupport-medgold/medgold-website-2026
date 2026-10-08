import { BadgeCheck, Clock, IdCard, ShieldCheck, type LucideIcon } from "lucide-react";
import RequisitionForm from "@@/components/nursing-training/RequisitionForm";
import { SITE, SITE_URL } from "@@/config/site";
import { requisition, type AssuranceIcon } from "@@/data/nursingTraining";

const ASSURANCE_ICONS: Record<AssuranceIcon, LucideIcon> = {
  nda: ShieldCheck,
  schedule: Clock,
  card: IdCard,
};

const linkClass = "inline-flex min-h-11 items-center text-white hover:underline sm:min-h-0";

export default function TrainingRequisition() {
  return (
    <section
      id="training-requisition"
      aria-labelledby="requisition-heading"
      className="scroll-mt-24 bg-surface-raised py-16 sm:py-20"
    >
      <div className="container">
        <div className="grid overflow-hidden rounded-lg bg-surface shadow-lg lg:grid-cols-12">
          <div className="flex flex-col gap-8 bg-primary-deep p-6 text-white sm:p-10 lg:col-span-5 lg:p-12">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                <BadgeCheck className="size-4 shrink-0" aria-hidden="true" />
                {requisition.eyebrow}
              </p>
              <h2
                id="requisition-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
              >
                {requisition.heading}
              </h2>
              <p className="mt-4 text-sm text-white/80">{requisition.intro}</p>
              <ul className="mt-6 grid gap-3">
                {requisition.assurances.map((item) => {
                  const Icon = ASSURANCE_ICONS[item.icon];
                  return (
                    <li key={item.text} className="flex items-center gap-3 text-sm">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-primary-deep">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <address className="mt-auto grid gap-1 border-t border-white/20 pt-4 text-xs not-italic text-white/80">
              <span className="font-semibold text-white">{requisition.deskHeading}</span>
              <span>{SITE.address.full}</span>
              <span>
                {requisition.phoneLabel}{" "}
                <a href={`tel:${SITE.contact.phoneHref}`} className={linkClass}>
                  {SITE.contact.phone}
                </a>{" "}
                |{" "}
                <a href={`tel:${SITE.contact.phoneAltHref}`} className={linkClass}>
                  {SITE.contact.phoneAlt}
                </a>
              </span>
              <span className="break-words">
                {requisition.emailLabel}{" "}
                <a href={`mailto:${SITE.contact.email}`} className={linkClass}>
                  {SITE.contact.email}
                </a>{" "}
                | {requisition.webLabel} {new URL(SITE_URL).host}
              </span>
            </address>
          </div>

          <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
            <RequisitionForm />
          </div>
        </div>
      </div>
    </section>
  );
}

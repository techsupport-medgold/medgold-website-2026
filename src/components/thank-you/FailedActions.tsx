"use client";

import type { MouseEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@@/components/ui/button";
import { whatsappUrl } from "@@/config/site";
import { buildApplicationMessage, type ApplicationValues } from "@@/lib/application";
import { buildEnquiryMessage, type EnquiryValues } from "@@/lib/enquiry";
import { peekDraft, type FormKind } from "@@/lib/thank-you";

const EMPTY_ENQUIRY: EnquiryValues = { name: "", phone: "", email: "", type: "", message: "" };
const EMPTY_APPLICATION: ApplicationValues = {
  name: "",
  phone: "",
  email: "",
  position: "",
  experience: "",
  qualification: "",
  city: "",
  note: "",
};

function draftMessage(form: FormKind): string | undefined {
  if (form === "application") {
    const draft = peekDraft<ApplicationValues>("application");
    return draft ? buildApplicationMessage({ ...EMPTY_APPLICATION, ...draft }) : undefined;
  }
  const draft = peekDraft<EnquiryValues>("enquiry");
  return draft ? buildEnquiryMessage({ ...EMPTY_ENQUIRY, ...draft }) : undefined;
}

/** WhatsApp fallback, pre-filled with the details saved before the failed send. */
export default function FailedActions({ form }: { form: FormKind }) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = whatsappUrl(draftMessage(form));
  };

  return (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
    >
      <a href={whatsappUrl()} onClick={onClick} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden="true" />
        Send on WhatsApp
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  );
}

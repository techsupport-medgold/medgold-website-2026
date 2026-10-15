import type { Metadata } from "next";
import Breadcrumb from "@@/components/common/Breadcrumb";
import StatusScreen from "@@/components/thank-you/StatusScreen";
import { Routes } from "@@/config/routes";
import { THANK_YOU_CONTENT, THANK_YOU_DESCRIPTION } from "@@/data/thankYou";
import { parseThankYouParams } from "@@/lib/thank-you";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { status, form } = parseThankYouParams(await searchParams);
  return {
    title: THANK_YOU_CONTENT[form][status].title,
    description: THANK_YOU_DESCRIPTION,
    alternates: { canonical: Routes.THANK_YOU },
    robots: { index: false, follow: true },
  };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { status, form } = parseThankYouParams(await searchParams);

  return (
    <>
      <Breadcrumb current={status === "success" ? "Thank you" : "Not sent"} path={Routes.THANK_YOU} />
      <StatusScreen status={status} form={form} />
    </>
  );
}

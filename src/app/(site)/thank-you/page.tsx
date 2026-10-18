import type { Metadata } from "next";
import { cookies } from "next/headers";
import Breadcrumb from "@@/components/common/Breadcrumb";
import StatusScreen from "@@/components/thank-you/StatusScreen";
import { NOINDEX_FOLLOW } from "@@/config/indexing";
import { Routes } from "@@/config/routes";
import { THANK_YOU_CONTENT, THANK_YOU_DESCRIPTION } from "@@/data/thankYou";
import { FORM_COOKIE, parseForm, parseStatus } from "@@/lib/thank-you";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function readState(searchParams: Props["searchParams"]) {
  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  return { status: parseStatus(params), form: parseForm(cookieStore.get(FORM_COOKIE)?.value) };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { status, form } = await readState(searchParams);
  return {
    title: THANK_YOU_CONTENT[form][status].title,
    description: THANK_YOU_DESCRIPTION,
    alternates: { canonical: Routes.THANK_YOU },
    robots: NOINDEX_FOLLOW,
  };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { status, form } = await readState(searchParams);

  return (
    <>
      <Breadcrumb current={status === "success" ? "Thank you" : "Not sent"} path={Routes.THANK_YOU} />
      <StatusScreen status={status} form={form} />
    </>
  );
}

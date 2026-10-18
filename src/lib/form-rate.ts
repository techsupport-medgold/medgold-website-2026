import "server-only";
import { headers } from "next/headers";
import { checkRateLimit } from "@@/lib/rate-limit";

/** True when this address has already submitted the form too many times. */
export async function isRateLimited(form: "enquiry" | "application"): Promise<boolean> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headerList.get("x-real-ip") || "unknown";
  return !checkRateLimit(`${form}:${ip}`).ok;
}

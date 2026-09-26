"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID } from "@@/config/site";
import { shouldLoadClarity } from "@@/lib/analytics";

export default function ClarityInit() {
  useEffect(() => {
    if (
      shouldLoadClarity({
        hostname: window.location.hostname,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
      })
    ) {
      Clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return null;
}

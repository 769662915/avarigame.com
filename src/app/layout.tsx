import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { BRAND_DESCRIPTION, BRAND_NAME } from "@/utils/brand";

export const metadata: Metadata = {
  applicationName: BRAND_NAME,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}

import { getLocale, getTranslations } from "next-intl/server";

import NotFoundView from "@/components/not-found-view";
import { Locale } from "@/i18n/routing";

export default async function NotFoundPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return (
    <NotFoundView locale={locale} title={t("Title")} />
  );
}

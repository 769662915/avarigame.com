import BaseLayout from "@/components/basic-layout";
import NotFoundView from "@/components/not-found-view";
import { routing } from "@/i18n/routing";

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundView locale={routing.defaultLocale} title="Not Found" />
    </BaseLayout>
  );
}

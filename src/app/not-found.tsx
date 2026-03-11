import NotFoundView from "@/components/not-found-view";
import { Providers } from "@/components/providers";
import { routing } from "@/i18n/routing";

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <Providers>
          <NotFoundView locale={routing.defaultLocale} title="Not Found" />
        </Providers>
      </body>
    </html>
  );
}

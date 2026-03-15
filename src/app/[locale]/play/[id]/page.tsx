import { Locale } from "@/i18n/routing";
import { getGameDetail, getRouteManifest, getStaticLocales } from "@/actions";

interface Props {
  params: {
    locale: Locale;
    id: string;
  };
  searchParams: Record<string, string>;
}

export async function generateStaticParams() {
  const locales = getStaticLocales();
  const params = await Promise.all(
    locales.map(async (locale) => {
      const routes = await getRouteManifest(locale);

      return routes.playIds.map((id) => ({
        locale,
        id,
      }));
    })
  );

  return params.flat();
}

export default async function Page({
  params: { id, locale },
}: Props) {
  const { gameUrl } = await getGameDetail(locale, id);

  return (
    <main style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(gameUrl)});`,
        }}
      />
      <p>Redirecting to the game...</p>
      <p>
        <a href={gameUrl} rel="noopener noreferrer">
          Continue to the game
        </a>
      </p>
    </main>
  );
}

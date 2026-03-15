import { notFound } from "next/navigation";

import {
  getCategories,
  getCategoryPage,
  getRouteManifest,
  getStaticLocales,
} from "@/actions";
import CategoryPageView from "@/components/category-page-view";
import { Locale } from "@/i18n/routing";

interface Props {
  params: {
    locale: Locale;
    slug: string;
    page: string;
  };
}

export async function generateStaticParams() {
  const locales = getStaticLocales();
  const params = await Promise.all(
    locales.map(async (locale) => {
      const routes = await getRouteManifest(locale);

      return Object.entries(routes.categoryPageCounts).flatMap(([slug, totalPages]) => {
        return Array.from({ length: totalPages }, (_, pageIndex) => pageIndex + 1)
          .filter((page) => page > 1)
          .map((page) => ({
            locale,
            slug,
            page: page.toString(),
          }));
      });
    })
  );

  return params.flat();
}

export default async function Page({
  params: { locale, slug, page },
}: Props) {
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage <= 1) {
    return notFound();
  }

  const [categories, pageData] = await Promise.all([
    getCategories(locale),
    getCategoryPage(locale, slug, currentPage),
  ]);

  if (!pageData || !categories.some((item) => item.alias === slug)) {
    return notFound();
  }

  return <CategoryPageView categories={categories} locale={locale} pageData={pageData} />;
}

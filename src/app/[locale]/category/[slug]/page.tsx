import { notFound } from "next/navigation";
import CategoryPageView from "@/components/category-page-view";

import { getCategories, getCategoryPage, getStaticLocales } from "@/actions";
import { Locale } from "@/i18n/routing";

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

export async function generateStaticParams() {
  const locales = getStaticLocales();
  const params = await Promise.all(
    locales.map(async (locale) => {
      const categories = await getCategories(locale);
      return categories.map((category) => ({
        locale,
        slug: category.alias,
      }));
    })
  );

  return params.flat();
}

export default async function Page({
  params: { locale, slug },
}: Props) {
  const categories = await getCategories(locale);
  const pageData = await getCategoryPage(locale, slug, 1);

  if (!pageData || !categories.some((item) => item.alias === slug)) {
    return notFound();
  }

  return <CategoryPageView categories={categories} locale={locale} pageData={pageData} />;
}

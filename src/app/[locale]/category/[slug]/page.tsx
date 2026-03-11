import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Box, Container, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { getCategories, getGames, getStaticLocales } from "@/actions";
import Footer from "@/components/footer";
import GameItem from "@/components/game-item";
import GameList from "@/components/game-list";
import Header from "@/components/header";
import Info from "@/components/info";
import SectionShell from "@/components/section-shell";
import { getCategoryTheme } from "@/configs";
import { Locale } from "@/i18n/routing";
import { randomGames, splitGames } from "@/utils";

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
  const allGames = await getGames(locale);
  const t = await getTranslations({ locale, namespace: "Common" });
  const category = categories.find((item) => item.alias === slug);

  if (!category) {
    return notFound();
  }

  const theme = getCategoryTheme(category.alias);
  const allCategoryGames = allGames.filter((item) => item.categoryId === category.id);
  const categoryByGames = randomGames(allCategoryGames.length, 50)
    .map((item) => allCategoryGames[item])
    .filter(Boolean);

  return (
    <>
      <Suspense fallback={null}>
        <Header categories={categories} />
      </Suspense>
      <Container maxWidth="container.xl" px={{ base: 4, md: 6 }} py={{ base: 5, md: 6, lg: 7 }}>
        <Stack spacing={{ base: 5, md: 6 }}>
          <Box
            position="relative"
            overflow="hidden"
            rounded={{ base: "28px", md: "36px" }}
            border="1px solid"
            borderColor={theme.border}
            bg={theme.hero}
            px={{ base: 5, md: 7, lg: 8 }}
            py={{ base: 6, md: 7, lg: 8 }}
            boxShadow={`0 24px 80px ${theme.glow}`}
          >
            <Box
              position="absolute"
              inset="auto -30px -80px auto"
              w="260px"
              h="260px"
              rounded="full"
              bg={theme.accent}
              filter="blur(100px)"
              opacity={0.16}
            />
            <Stack spacing={4} position="relative" zIndex={1}>
              <Text
                fontSize="10px"
                fontWeight={700}
                textTransform="uppercase"
                letterSpacing="0.34em"
                color={theme.accent}
              >
                {t("Category")}
              </Text>
              <Text
                as="h2"
                fontFamily="heading"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                lineHeight={0.92}
                letterSpacing="0.06em"
                textTransform="uppercase"
                color={theme.text}
                maxW="10ch"
              >
                {category.name}
              </Text>
              <Flex gap={3} flexWrap="wrap" align="center">
                <Text
                  px={4}
                  py={2}
                  rounded="full"
                  bg={theme.accentSoft}
                  border="1px solid"
                  borderColor={theme.border}
                  color={theme.text}
                  fontWeight={700}
                >
                  {allCategoryGames.length}
                </Text>
                <Text color={theme.muted}>{t("Games", { category: category.name })}</Text>
              </Flex>
            </Stack>
          </Box>

          <SectionShell title={t("Games", { category: category.name })} accent={theme.accent}>
            <Stack spacing={{ base: 5, md: 6 }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 3, md: 4, lg: 6 }}>
                {splitGames(categoryByGames.slice(0, 18)).map((sliceGames, sliceIndex) => {
                  const spans = [0, 1, 3];
                  return (
                    <GameList
                      key={sliceIndex}
                      data={sliceGames}
                      locale={locale}
                      spanIndex={spans[sliceIndex]}
                      accent={theme.accent}
                    />
                  );
                })}
              </SimpleGrid>

              <SimpleGrid
                gap={{ base: 3, md: 4, lg: 5 }}
                columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
              >
                {categoryByGames.slice(18).map((item) => (
                  <GameItem
                    key={item.id}
                    data={item}
                    locale={locale}
                    accent={theme.accent}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          </SectionShell>

          <Info locale={locale} />
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

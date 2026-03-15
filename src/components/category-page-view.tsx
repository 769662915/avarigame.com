import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Box, Container, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import CategoryPagination from "@/components/category-pagination";
import Footer from "@/components/footer";
import GameItem from "@/components/game-item";
import GameList from "@/components/game-list";
import Header from "@/components/header";
import Info from "@/components/info";
import SectionShell from "@/components/section-shell";
import { getCategoryTheme } from "@/configs";
import { Locale } from "@/i18n/routing";
import { CategoryPageRecord, CategoryRecord } from "@/services/data";
import { splitGames } from "@/utils";

interface CategoryPageViewProps {
  categories: CategoryRecord[];
  locale: Locale;
  pageData: CategoryPageRecord;
}

export default async function CategoryPageView({
  categories,
  locale,
  pageData,
}: CategoryPageViewProps) {
  const t = await getTranslations({ locale, namespace: "Common" });
  const theme = getCategoryTheme(pageData.category.alias);

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
                {pageData.category.name}
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
                  {pageData.totalItems}
                </Text>
                <Text color={theme.muted}>{t("Games", { category: pageData.category.name })}</Text>
                <Text color="whiteAlpha.540">/</Text>
                <Text color={theme.muted}>
                  {t("PageOf", { page: pageData.page, total: pageData.totalPages })}
                </Text>
              </Flex>
            </Stack>
          </Box>

          <SectionShell
            title={t("Games", { category: pageData.category.name })}
            accent={theme.accent}
            action={(
              <CategoryPagination
                alias={pageData.category.alias}
                currentPage={pageData.page}
                totalPages={pageData.totalPages}
                locale={locale}
              />
            )}
          >
            <Stack spacing={{ base: 5, md: 6 }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 3, md: 4, lg: 6 }}>
                {splitGames(pageData.items.slice(0, 18)).map((sliceGames, sliceIndex) => {
                  const spans = [0, 1, 3];

                  return (
                    <GameList
                      key={`${pageData.category.alias}-${pageData.page}-${sliceIndex}`}
                      data={sliceGames}
                      locale={locale}
                      spanIndex={spans[sliceIndex] ?? 0}
                      accent={theme.accent}
                    />
                  );
                })}
              </SimpleGrid>

              <SimpleGrid
                gap={{ base: 3, md: 4, lg: 5 }}
                columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
              >
                {pageData.items.slice(18).map((item) => (
                  <GameItem
                    key={item.id}
                    data={item}
                    locale={locale}
                    accent={theme.accent}
                  />
                ))}
              </SimpleGrid>

              <CategoryPagination
                alias={pageData.category.alias}
                currentPage={pageData.page}
                totalPages={pageData.totalPages}
                locale={locale}
              />
            </Stack>
          </SectionShell>

          <Info locale={locale} />
        </Stack>
      </Container>
      <Footer locale={locale} />
    </>
  );
}

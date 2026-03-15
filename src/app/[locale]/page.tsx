import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";

import { getCategories, getGameDetail, getHomeData } from "@/actions";
import Footer from "@/components/footer";
import GameItem from "@/components/game-item";
import GameList from "@/components/game-list";
import Header from "@/components/header";
import Info from "@/components/info";
import SectionShell from "@/components/section-shell";
import { ADSENSE_CLIENT, ADSENSE_SLOTS, getCategoryTheme, LOCALE_OPTIONS } from "@/configs";
import { Locale } from "@/i18n/routing";
import { getTargetHref, splitGames } from "@/utils";
import { getBrandContext } from "@/utils/brand";

const ElTemplate = dynamic(() => import("@/components/el-temlplate"), { ssr: false });

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function Page({
  params: { locale },
}: Props) {
  const { brandDescription, brandTagline, brandWordmark } = getBrandContext();
  const [categories, homeData] = await Promise.all([
    getCategories(locale),
    getHomeData(locale),
  ]);
  const t = await getTranslations({ locale, namespace: "Common" });
  const heroGames = await Promise.all(
    homeData.heroGameIds.map((id) => getGameDetail(locale, id))
  );
  const categoryMap = new Map(categories.map((category) => [category.alias, category]));
  const featuredSections = homeData.featuredCategories
    .map((section) => {
      const category = categoryMap.get(section.alias);

      if (!category || section.items.length === 0) {
        return null;
      }

      return {
        category,
        items: section.items,
      };
    })
    .filter(Boolean);

  const stats = [
    { label: t("Category"), value: categories.length },
    { label: t("Locales"), value: LOCALE_OPTIONS.length },
    { label: t("Top"), value: homeData.topGameCards.length },
    { label: t("New"), value: homeData.newGameCards.length },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <Header categories={categories} />
      </Suspense>
      <Container maxWidth="container.xl" px={{ base: 4, md: 6 }} py={{ base: 5, md: 6, lg: 7 }}>
        <VStack alignItems="stretch" gap={{ base: 5, md: 6 }}>
          <Box
            rounded={{ base: "24px", md: "30px" }}
            border="1px solid"
            borderColor="whiteAlpha.100"
            bg="rgba(9, 16, 32, 0.72)"
            px={{ base: 3, md: 4 }}
            py={{ base: 2, md: 3 }}
            boxShadow="0 18px 48px rgba(0, 0, 0, 0.24)"
          >
            <ElTemplate
              id="goplaygame-Home-Banner"
              className="adsbygoogle"
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={ADSENSE_SLOTS.homeBanner}
              data-ad-format="auto"
              data-full-width-responsive="true"
              style={{ display: "block" }}
            />
          </Box>

          <Box
            position="relative"
            overflow="hidden"
            rounded={{ base: "28px", md: "36px" }}
            border="1px solid"
            borderColor="whiteAlpha.120"
            bg="linear-gradient(135deg, rgba(8, 16, 32, 0.98), rgba(8, 22, 44, 0.92) 50%, rgba(7, 49, 60, 0.72))"
            px={{ base: 5, md: 7, lg: 8 }}
            py={{ base: 5, md: 7, lg: 8 }}
            boxShadow="0 28px 90px rgba(0, 0, 0, 0.36)"
          >
            <Box
              position="absolute"
              top="-120px"
              right="-40px"
              w="280px"
              h="280px"
              rounded="full"
              bg="brand.300"
              opacity={0.16}
              filter="blur(110px)"
              pointerEvents="none"
            />
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 6, lg: 8 }} position="relative" zIndex={1}>
              <Stack spacing={{ base: 5, md: 6 }} gridColumn={{ lg: "span 7" }}>
                <Box>
                  <Text
                    fontSize="10px"
                    fontWeight={700}
                    textTransform="uppercase"
                    letterSpacing="0.34em"
                    color="brand.300"
                    mb={3}
                  >
                    {t("Games", { category: t("Recommend") })}
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight={700}
                    textTransform="uppercase"
                    letterSpacing="0.24em"
                    color="whiteAlpha.620"
                    mb={2}
                  >
                    {brandTagline}
                  </Text>
                  <Text
                    as="h2"
                    fontFamily="heading"
                    fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                    lineHeight={0.9}
                    letterSpacing="0.06em"
                    textTransform="uppercase"
                    color="whiteAlpha.980"
                    maxW="9ch"
                  >
                    {brandWordmark}
                  </Text>
                  <Text mt={4} maxW="2xl" color="whiteAlpha.720" lineHeight={1.8}>
                    {brandDescription}
                  </Text>
                </Box>

                <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
                  {stats.map((stat) => (
                    <Stat
                      key={stat.label}
                      rounded="2xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      bg="rgba(255, 255, 255, 0.04)"
                      px={4}
                      py={3}
                    >
                      <StatNumber fontSize={{ base: "2xl", md: "3xl" }} color="whiteAlpha.980">
                        {stat.value}
                      </StatNumber>
                      <StatLabel
                        mt={1}
                        mb={0}
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="0.24em"
                        color="whiteAlpha.620"
                      >
                        {stat.label}
                      </StatLabel>
                    </Stat>
                  ))}
                </SimpleGrid>

                <HStack spacing={3} flexWrap="wrap">
                  {categories.map((category) => {
                    const theme = getCategoryTheme(category.alias);

                    return (
                      <Button
                        key={category.id}
                        as="a"
                        href={getTargetHref(locale, `/category/${category.alias}`)}
                        size="sm"
                        h="40px"
                        px={4}
                        borderRadius="full"
                        bg={theme.accentSoft}
                        border="1px solid"
                        borderColor={theme.border}
                        color={theme.text}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: `0 0 28px ${theme.glow}`,
                        }}
                      >
                        {category.name}
                      </Button>
                    );
                  })}
                </HStack>

                <HStack spacing={3} flexWrap="wrap">
                  <Button
                    as="a"
                    href="#new-games"
                    bg="brand.300"
                    color="canvas.900"
                    _hover={{ bg: "brand.200", transform: "translateY(-2px)" }}
                  >
                    {t("Games", { category: t("New") })}
                  </Button>
                  <Button
                    as="a"
                    href="#top-games"
                    variant="outline"
                    borderColor="whiteAlpha.220"
                    color="whiteAlpha.940"
                    _hover={{ bg: "whiteAlpha.120", borderColor: "whiteAlpha.280" }}
                  >
                    {t("Games", { category: t("Top") })}
                  </Button>
                </HStack>
              </Stack>

              <Grid
                gridColumn={{ lg: "span 5" }}
                templateColumns="repeat(2, minmax(0, 1fr))"
                gap={4}
                alignSelf="stretch"
              >
                <GridItem colSpan={2}>
                  <GameItem
                    data={heroGames[0]}
                    locale={locale}
                    variant="featured"
                    accent="#4CF3FF"
                  />
                </GridItem>
                <GridItem>
                  <GameItem
                    data={heroGames[1]}
                    locale={locale}
                    accent="#BCFF46"
                  />
                </GridItem>
                <GridItem>
                  <GameItem
                    data={heroGames[2]}
                    locale={locale}
                    accent="#FFB25B"
                  />
                </GridItem>
              </Grid>
            </SimpleGrid>
          </Box>

          <SectionShell id="new-games" title={t("Games", { category: t("New") })} accent="#4CF3FF">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 3, md: 4, lg: 6 }}>
              {splitGames(homeData.newGameCards).map((sliceGames, sliceIndex) => {
                const spans = [0, 3, 1];

                return (
                  <GameList
                    key={sliceIndex}
                    data={sliceGames}
                    locale={locale}
                    spanIndex={spans[sliceIndex]}
                    accent="#4CF3FF"
                  />
                );
              })}
            </SimpleGrid>
          </SectionShell>

          <SectionShell id="top-games" title={t("Games", { category: t("Top") })} accent="#FF6B5B">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 3, md: 4, lg: 6 }}>
              {splitGames(homeData.topGameCards).map((sliceGames, sliceIndex) => {
                const spans = [0, 3, 1];

                return (
                  <GameList
                    key={sliceIndex}
                    data={sliceGames}
                    locale={locale}
                    spanIndex={spans[sliceIndex]}
                    accent="#FF6B5B"
                  />
                );
              })}
            </SimpleGrid>
          </SectionShell>

          {featuredSections.map((section, categoryIndex) => {
            if (!section) {
              return null;
            }

            const { category, items } = section;
            const theme = getCategoryTheme(category.alias);

            if (!items.length) {
              return null;
            }

            return (
              <SectionShell
                key={category.alias}
                title={t("Games", { category: category.name })}
                accent={theme.accent}
                action={
                  <Button
                    as="a"
                    href={getTargetHref(locale, `/category/${category.alias}`)}
                    variant="ghost"
                    size="sm"
                    color={theme.text}
                    border="1px solid"
                    borderColor={theme.border}
                    bg={theme.accentSoft}
                    _hover={{ bg: theme.accentSoft }}
                  >
                    {t("More")}
                  </Button>
                }
              >
                <Stack spacing={{ base: 4, md: 6 }}>
                  <Flex gap={3} flexWrap="wrap">
                    <Text
                      fontSize="10px"
                      fontWeight={700}
                      textTransform="uppercase"
                      letterSpacing="0.28em"
                      color={theme.accent}
                    >
                      {category.name}
                    </Text>
                    <Text color="whiteAlpha.540">/</Text>
                    <Text fontSize="sm" color="whiteAlpha.620">
                      {category.count}
                    </Text>
                  </Flex>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 3, md: 4, lg: 6 }}>
                    {splitGames(items.slice(0, 18)).map((sliceGames, sliceIndex) => {
                      let spans = [0, 1, 3];
                      if (categoryIndex % 2) {
                        spans = [1, 3, 4];
                      }
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
                </Stack>
              </SectionShell>
            );
          })}

          <Info locale={locale} />
        </VStack>
      </Container>
      <Footer locale={locale} />
    </>
  );
}

import dynamic from "next/dynamic";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

import {
  getCategories,
  getCategoryPage,
  getGameDetail,
  getRouteManifest,
  getStaticLocales,
} from "@/actions";
import Footer from "@/components/footer";
import GameItem from "@/components/game-item";
import Header from "@/components/header";
import Info from "@/components/info";
import SectionShell from "@/components/section-shell";
import StarRating from "@/components/star-rating";
import { ADSENSE_CLIENT, ADSENSE_SLOTS, getCategoryTheme } from "@/configs";
import { Locale } from "@/i18n/routing";
import { getTargetHref, sanitizeGameDescription } from "@/utils";

const ElTemplate = dynamic(() => import("@/components/el-temlplate"), { ssr: false });

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
      const routes = await getRouteManifest(locale);

      return routes.detailIds.map((id) => ({
        locale,
        slug: id,
      }));
    })
  );

  return params.flat();
}

const getLikes = () => {
  const min = 3;
  const max = 5;
  const number = Math.random() * (max - min) + min;
  return parseFloat(number.toFixed(1));
};

export default async function Page({
  params: { locale, slug },
}: Props) {
  const [categories, game] = await Promise.all([
    getCategories(locale),
    getGameDetail(locale, slug),
  ]);
  const t = await getTranslations({ locale, namespace: "Common" });

  const category = categories.find((item) => item.id === game.categoryId);
  if (!category) {
    return null;
  }

  const theme = getCategoryTheme(category.alias);
  const description = sanitizeGameDescription(game.description);
  const recommendationPage = await getCategoryPage(locale, category.alias, 1);
  const typeGames = (recommendationPage?.items ?? [])
    .filter((item) => item.id !== slug)
    .slice(0, 18);

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
            boxShadow={`0 24px 80px ${theme.glow}`}
          >
            <Box
              position="absolute"
              inset={0}
              bgImage={`linear-gradient(135deg, rgba(5, 11, 23, 0.84), rgba(5, 11, 23, 0.68)), url(${game.image})`}
              bgSize="cover"
              bgPosition="center"
              opacity={0.72}
              filter="saturate(1.08)"
            />
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 0, lg: 8 }} position="relative" zIndex={1}>
              <Box
                gridColumn={{ lg: "span 4" }}
                px={{ base: 5, md: 7 }}
                py={{ base: 5, md: 7, lg: 8 }}
                display="flex"
                justifyContent={{ base: "center", lg: "flex-start" }}
                alignItems="center"
              >
                <Box
                  rounded={{ base: "26px", md: "30px" }}
                  overflow="hidden"
                  border="1px solid"
                  borderColor={theme.border}
                  boxShadow={`0 0 0 1px ${theme.accent} inset, 0 0 40px ${theme.glow}`}
                  maxW={{ base: "240px", md: "280px", lg: "320px" }}
                  w="full"
                >
                  <Image
                    alt={game.name}
                    width={640}
                    height={640}
                    src={game.image}
                    priority={false}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </Box>
              </Box>

              <Stack
                gridColumn={{ lg: "span 8" }}
                spacing={5}
                px={{ base: 5, md: 7 }}
                py={{ base: 5, md: 6, lg: 8 }}
              >
                <Stack spacing={3}>
                  <Text
                    fontSize="10px"
                    fontWeight={700}
                    textTransform="uppercase"
                    letterSpacing="0.34em"
                    color={theme.accent}
                  >
                    {category.name}
                  </Text>
                  <Text
                    as="h2"
                    fontFamily="heading"
                    fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                    lineHeight={0.96}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    color={theme.text}
                    maxW="12ch"
                  >
                    {game.name}
                  </Text>
                </Stack>

                <HStack spacing={4} flexWrap="wrap" align="center">
                  <StarRating size="14px" rating={getLikes()} color={theme.text} />
                  <Tag
                    px={3}
                    py={1.5}
                    rounded="full"
                    bg={theme.accentSoft}
                    border="1px solid"
                    borderColor={theme.border}
                    color={theme.text}
                    fontSize="xs"
                    fontWeight={700}
                  >
                    {category.name}
                  </Tag>
                </HStack>

                <Text maxW="3xl" lineHeight={1.9} color={theme.muted}>
                  {description}
                </Text>

                <Box>
                  <Button
                    bg={theme.accent}
                    color="canvas.900"
                    size="lg"
                    minW={{ base: "100%", sm: "280px" }}
                    rounded="full"
                    as="a"
                    rel="noopener noreferrer"
                    href={getTargetHref(locale, `/play/${slug}`)}
                    rightIcon={<FaCirclePlay />}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: `0 0 32px ${theme.glow}`,
                    }}
                  >
                    {t("Play")}
                  </Button>
                </Box>
              </Stack>
            </SimpleGrid>
          </Box>

          <SectionShell
            title={t("Games", { category: t("Recommend") })}
            accent={theme.accent}
            description={t("Introduction")}
          >
            <Box
              mb={{ base: 4, md: 5 }}
              rounded={{ base: "24px", md: "28px" }}
              border="1px solid"
              borderColor={theme.border}
              bg="rgba(9, 16, 32, 0.64)"
              px={{ base: 3, md: 4 }}
              py={{ base: 2, md: 3 }}
              boxShadow={`0 18px 48px ${theme.glow}`}
            >
              <ElTemplate
                id={`goplaygame-detail-recommend-${slug}`}
                className="adsbygoogle"
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={ADSENSE_SLOTS.detailRecommend}
                data-ad-format="autorelaxed"
                style={{ display: "block" }}
              />
            </Box>
            <SimpleGrid gap={{ base: 3, md: 4, lg: 5 }} columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
              {typeGames.map((item) => (
                <GameItem
                  key={item.id}
                  data={item}
                  locale={locale}
                  accent={theme.accent}
                />
              ))}
            </SimpleGrid>
          </SectionShell>

          <Info locale={locale} />
        </Stack>
      </Container>
      <Footer locale={locale} />
    </>
  );
}

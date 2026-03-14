import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

import { getCategories } from "@/actions";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Locale } from "@/i18n/routing";
import { BRAND_DOMAIN, BRAND_EMAIL, getBrandContext } from "@/utils/brand";

interface Props {
  params: {
    locale: Locale;
  };
}

const sectionKeys = [
  "overview",
  "collect",
  "use",
  "ads",
  "cookies",
  "children",
  "retention",
  "rights",
  "changes",
  "contact",
] as const;

const isDefined = (value: string | null): value is string => value !== null;

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPolicyPage({
  params: { locale },
}: Props) {
  const categories = await getCategories(locale);
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
  const { brandName } = getBrandContext();

  const cards = [
    {
      key: "website",
      label: t("cards.websiteLabel"),
      value: BRAND_DOMAIN,
      detail: t("cards.websiteDetail"),
    },
    {
      key: "contact",
      label: t("cards.contactLabel"),
      value: BRAND_EMAIL,
      detail: t("cards.contactDetail"),
    },
    {
      key: "services",
      label: t("cards.servicesLabel"),
      value: t("cards.servicesValue"),
      detail: t("cards.servicesDetail"),
    },
  ];

  const sections = sectionKeys.map((key) => ({
    key,
    title: t(`sections.${key}.title`),
    paragraphs: [
      t(`sections.${key}.body1`, {
        brandName,
        domain: BRAND_DOMAIN,
        email: BRAND_EMAIL,
      }),
      t.has(`sections.${key}.body2`)
        ? t(`sections.${key}.body2`, {
            brandName,
            domain: BRAND_DOMAIN,
            email: BRAND_EMAIL,
          })
        : null,
      t.has(`sections.${key}.body3`)
        ? t(`sections.${key}.body3`, {
            brandName,
            domain: BRAND_DOMAIN,
            email: BRAND_EMAIL,
          })
        : null,
      t.has(`sections.${key}.body4`)
        ? t(`sections.${key}.body4`, {
            brandName,
            domain: BRAND_DOMAIN,
            email: BRAND_EMAIL,
          })
        : null,
    ].filter(isDefined),
  }));

  return (
    <>
      <Suspense fallback={null}>
        <Header categories={categories} />
      </Suspense>
      <Container maxW="container.xl" px={{ base: 4, md: 6 }} py={{ base: 5, md: 6, lg: 7 }}>
        <Stack spacing={{ base: 5, md: 6 }}>
          <Box
            position="relative"
            overflow="hidden"
            rounded={{ base: "28px", md: "36px" }}
            border="1px solid"
            borderColor="whiteAlpha.120"
            bg="linear-gradient(140deg, rgba(7, 14, 29, 0.98), rgba(8, 28, 54, 0.94) 45%, rgba(14, 71, 78, 0.72))"
            px={{ base: 5, md: 7, lg: 8 }}
            py={{ base: 5, md: 7, lg: 8 }}
            boxShadow="0 28px 90px rgba(0, 0, 0, 0.36)"
          >
            <Box
              position="absolute"
              top="-110px"
              right="-30px"
              w="280px"
              h="280px"
              rounded="full"
              bg="rgba(76, 243, 255, 0.22)"
              filter="blur(110px)"
              pointerEvents="none"
            />
            <Stack spacing={{ base: 5, md: 6 }} position="relative" zIndex={1}>
              <Stack spacing={3} maxW="4xl">
                <Text
                  fontSize="10px"
                  fontWeight={700}
                  textTransform="uppercase"
                  letterSpacing="0.34em"
                  color="brand.300"
                >
                  {t("eyebrow")}
                </Text>
                <Text
                  as="h1"
                  fontFamily="heading"
                  fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                  lineHeight={0.96}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  color="whiteAlpha.980"
                  maxW="12ch"
                >
                  {t("title", { brandName })}
                </Text>
                <Text maxW="4xl" color="whiteAlpha.760" lineHeight={1.9}>
                  {t("summary", { domain: BRAND_DOMAIN })}
                </Text>
                <Tag
                  alignSelf="flex-start"
                  px={4}
                  py={2}
                  rounded="full"
                  bg="rgba(76, 243, 255, 0.14)"
                  border="1px solid"
                  borderColor="rgba(76, 243, 255, 0.28)"
                  color="whiteAlpha.960"
                  fontSize="sm"
                  fontWeight={600}
                >
                  {t("updatedLabel")}: {t("updatedAt")}
                </Tag>
              </Stack>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {cards.map((card) => (
                  <Box
                    key={card.key}
                    rounded="28px"
                    border="1px solid"
                    borderColor="whiteAlpha.120"
                    bg="rgba(255, 255, 255, 0.05)"
                    px={{ base: 4, md: 5 }}
                    py={{ base: 4, md: 5 }}
                    boxShadow="0 18px 48px rgba(0, 0, 0, 0.18)"
                  >
                    <Text
                      fontSize="10px"
                      fontWeight={700}
                      textTransform="uppercase"
                      letterSpacing="0.28em"
                      color="whiteAlpha.620"
                    >
                      {card.label}
                    </Text>
                    <Text
                      mt={3}
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight={700}
                      color="whiteAlpha.980"
                      wordBreak="break-word"
                    >
                      {card.value}
                    </Text>
                    <Text mt={2} fontSize="sm" lineHeight={1.8} color="whiteAlpha.720">
                      {card.detail}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>

              <Stack spacing={3}>
                <Text
                  fontSize="10px"
                  fontWeight={700}
                  textTransform="uppercase"
                  letterSpacing="0.28em"
                  color="whiteAlpha.620"
                >
                  {t("tocLabel")}
                </Text>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} gap={3}>
                  {sections.map((section) => (
                    <Box
                      as="a"
                      key={section.key}
                      href={`#${section.key}`}
                      rounded="full"
                      border="1px solid"
                      borderColor="whiteAlpha.120"
                      bg="rgba(255, 255, 255, 0.05)"
                      px={4}
                      py={3}
                      fontSize="sm"
                      fontWeight={600}
                      color="whiteAlpha.900"
                      _hover={{
                        bg: "rgba(76, 243, 255, 0.12)",
                        borderColor: "rgba(76, 243, 255, 0.28)",
                      }}
                    >
                      {section.title}
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={4}>
            {sections.map((section) => (
              <Box
                id={section.key}
                key={section.key}
                rounded={{ base: "24px", md: "28px" }}
                border="1px solid"
                borderColor="whiteAlpha.120"
                bg="rgba(9, 18, 36, 0.82)"
                px={{ base: 4, md: 5, lg: 6 }}
                py={{ base: 4, md: 5, lg: 6 }}
                boxShadow="0 18px 48px rgba(0, 0, 0, 0.22)"
                scrollMarginTop="96px"
              >
                <Stack spacing={3.5}>
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight={700}
                    color="whiteAlpha.980"
                  >
                    {section.title}
                  </Text>
                  <Stack spacing={3}>
                    {section.paragraphs.map((paragraph, index) => (
                      <Text key={`${section.key}-${index}`} lineHeight={1.9} color="whiteAlpha.760">
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Footer locale={locale} />
    </>
  );
}

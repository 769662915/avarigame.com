import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";

import { Box, Container, Flex, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";

import { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/routing";
import { getBrandContext } from "@/utils/brand";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Common" });
  const { brandName, brandEmail, brandTagline } = getBrandContext();
  const privacyHref = getPathname({ locale, href: "/privacy-policy" });

  return (
    <Box
      as="footer"
      w="full"
      borderTop="1px solid"
      borderColor="whiteAlpha.140"
      bg="rgba(6, 13, 26, 0.82)"
      backdropFilter="blur(14px)"
    >
      <Container maxW="container.xl" py={{ base: 6, md: 7 }} px={{ base: 4, md: 6 }}>
        <Flex
          rounded="28px"
          border="1px solid"
          borderColor="whiteAlpha.140"
          bg="rgba(11, 20, 39, 0.82)"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 5 }}
          align="center"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={3}
        >
          <Stack spacing={1} align={{ base: "center", md: "flex-start" }}>
            <Text
              fontSize="10px"
              textTransform="uppercase"
              letterSpacing="0.32em"
              color="brand.300"
            >
              {brandTagline}
            </Text>
            <Text color="whiteAlpha.960" fontWeight={700}>
              {brandName}
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ base: "center", sm: "center" }}
              gap={{ base: 1.5, sm: 3 }}
            >
              <ChakraLink
                href={privacyHref}
                color="brand.300"
                fontSize="sm"
                fontWeight={600}
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                {t("PrivacyPolicy")}
              </ChakraLink>
              <ChakraLink
                href={`mailto:${brandEmail}`}
                color="whiteAlpha.760"
                fontSize="sm"
                _hover={{ color: "whiteAlpha.960" }}
              >
                {brandEmail}
              </ChakraLink>
            </Flex>
          </Stack>
          <Text textAlign="center" color="rgba(232, 242, 255, 0.82)">
            © {dayjs().format("YYYY")} {brandName}. {brandTagline}.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

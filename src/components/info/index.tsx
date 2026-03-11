import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

import { Locale } from "@/i18n/routing";
import { BRAND_NAME, getBrandContext } from "@/utils/brand";

const sectionCardStyles = {
  bg: "rgba(9, 18, 36, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  rounded: "28px",
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
};

export default async function Info({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Info" });
  const { baseUrl } = getBrandContext();

  const renderLink = (_text: string | ReactNode) => (
    <Link
      fontSize="inherit"
      href={baseUrl}
      color="brand.300"
      fontWeight={700}
      textDecoration="underline"
      textUnderlineOffset="4px"
    >
      {BRAND_NAME}
    </Link>
  );

  const sections = [
    {
      key: "section1",
      title: t.rich("section1.title", {
        hostname: baseUrl,
        brandName: BRAND_NAME,
        tagname: renderLink,
      }),
      paragraphs: [
        t("section1.paragraph1"),
        t("section1.paragraph2"),
        t("section1.paragraph3"),
        t("section1.paragraph4"),
        t("section1.paragraph5", {
          brandName: BRAND_NAME,
        }),
      ],
    },
    {
      key: "section2",
      title: t.rich("section2.title", {
        hostname: baseUrl,
        tagname: renderLink,
      }),
      paragraphs: [
        t.rich("section2.paragraph1", {
          hostname: baseUrl,
          tagname: renderLink,
        }),
        t("section2.paragraph2"),
        t("section2.paragraph3"),
        t("section2.paragraph4"),
        t("section2.paragraph5"),
        t("section2.paragraph6"),
        t("section2.paragraph7"),
        t("section2.paragraph8"),
        t("section2.paragraph9"),
        t("section2.paragraph10"),
        t("section2.paragraph11"),
        t("section2.paragraph12"),
      ],
    },
    {
      key: "section3",
      title: t.rich("section3.title", {
        hostname: baseUrl,
        tagname: renderLink,
      }),
      paragraphs: [
        t.rich("section3.paragraph1", {
          hostname: baseUrl,
          tagname: renderLink,
        }),
        t.rich("section3.paragraph2", {
          hostname: baseUrl,
          tagname: renderLink,
        }),
        t("section3.paragraph3"),
        t("section3.paragraph4"),
        t.rich("section3.paragraph5", {
          hostname: baseUrl,
          tagname: renderLink,
        }),
      ],
    },
  ];

  return (
    <Box py={{ base: 2, md: 4, lg: 6 }}>
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={{ base: 4, lg: 5 }}>
        {sections.map((section, index) => (
          <Card key={section.key} {...sectionCardStyles}>
            <CardBody p={{ base: 3, md: 4 }}>
              <Accordion allowToggle defaultIndex={index === 0 ? [0] : []}>
                <AccordionItem>
                  <AccordionButton
                    px={{ base: 3, md: 4 }}
                    py={{ base: 3.5, md: 4 }}
                    rounded="22px"
                    bg="rgba(255, 255, 255, 0.06)"
                    border="1px solid"
                    borderColor="whiteAlpha.140"
                    _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <Stack align="start" flex={1} spacing={2} textAlign="left">
                      <Text
                        fontSize="10px"
                        fontWeight={700}
                        textTransform="uppercase"
                        letterSpacing="0.3em"
                        color="brand.300"
                      >
                        0{index + 1}
                      </Text>
                      <Box
                        color="rgba(244, 250, 255, 0.96)"
                        fontWeight={700}
                        fontSize={{ base: "md", md: "lg" }}
                      >
                        {section.title}
                      </Box>
                    </Stack>
                    <AccordionIcon color="rgba(244, 250, 255, 0.82)" />
                  </AccordionButton>
                  <AccordionPanel px={{ base: 2, md: 3 }} pt={4} pb={2}>
                    <Stack spacing={3}>
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <Text
                          key={`${section.key}-${paragraphIndex}`}
                          fontSize="sm"
                          lineHeight={1.85}
                          color="rgba(230, 241, 255, 0.84)"
                        >
                          {paragraph}
                        </Text>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

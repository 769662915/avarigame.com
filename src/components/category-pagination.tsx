import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

import { Locale } from "@/i18n/routing";
import { getTargetHref } from "@/utils";

const buildCategoryPageHref = (alias: string, page: number) => {
  if (page <= 1) {
    return `/category/${alias}`;
  }

  return `/category/${alias}/page/${page}`;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((left, right) => left - right);
};

interface CategoryPaginationProps {
  alias: string;
  currentPage: number;
  totalPages: number;
  locale: Locale;
}

export default async function CategoryPagination({
  alias,
  currentPage,
  totalPages,
  locale,
}: CategoryPaginationProps) {
  const t = await getTranslations({ locale, namespace: "Common" });

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <HStack
      spacing={2}
      flexWrap="wrap"
      justify={{ base: "center", md: "space-between" }}
      align="center"
    >
      <Text fontSize="sm" color="whiteAlpha.680">
        {t("PageOf", { page: currentPage, total: totalPages })}
      </Text>
      <HStack spacing={2} flexWrap="wrap" justify="center">
        <Button
          as="a"
          size="sm"
          variant="outline"
          borderColor="whiteAlpha.200"
          color="whiteAlpha.860"
          href={getTargetHref(locale, buildCategoryPageHref(alias, currentPage - 1))}
          visibility={currentPage > 1 ? "visible" : "hidden"}
          _hover={{ bg: "whiteAlpha.120", borderColor: "whiteAlpha.260" }}
        >
          {t("Previous")}
        </Button>
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showGap = previousPage && page - previousPage > 1;
          const isActive = page === currentPage;

          return (
            <Box key={page} display="contents">
              {showGap ? (
                <Text px={1.5} color="whiteAlpha.520">
                  ...
                </Text>
              ) : null}
              <Button
                as="a"
                size="sm"
                minW="42px"
                href={getTargetHref(locale, buildCategoryPageHref(alias, page))}
                bg={isActive ? "brand.300" : "transparent"}
                color={isActive ? "canvas.900" : "whiteAlpha.900"}
                border="1px solid"
                borderColor={isActive ? "brand.300" : "whiteAlpha.200"}
                _hover={{
                  bg: isActive ? "brand.300" : "whiteAlpha.120",
                  borderColor: isActive ? "brand.300" : "whiteAlpha.260",
                }}
              >
                {page}
              </Button>
            </Box>
          );
        })}
        <Button
          as="a"
          size="sm"
          variant="outline"
          borderColor="whiteAlpha.200"
          color="whiteAlpha.860"
          href={getTargetHref(locale, buildCategoryPageHref(alias, currentPage + 1))}
          visibility={currentPage < totalPages ? "visible" : "hidden"}
          _hover={{ bg: "whiteAlpha.120", borderColor: "whiteAlpha.260" }}
        >
          {t("Next")}
        </Button>
      </HStack>
    </HStack>
  );
}

"use client";

import { PropsWithChildren } from "react";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";

import BrandLockup from "@/components/brand-lockup";
import { getCategoryTheme } from "@/configs";
import { Link } from "@/i18n/routing";
import { CategoryRecord } from "@/services/data";
import { getNavigationHref } from "@/utils";

import LocaleSwitcher from "./locale-switcher";
import SideNav from "./side-nav";

function DesktopNavlink({
  href,
  children,
  active,
  accent,
}: PropsWithChildren<{
  href: string;
  active?: boolean;
  accent?: string;
}>) {
  return (
    <Button
      as={Link}
      href={href}
      size="sm"
      h="42px"
      px={4}
      borderRadius="full"
      border="1px solid"
      borderColor={active ? accent : "whiteAlpha.160"}
      bg={active ? "whiteAlpha.120" : "whiteAlpha.060"}
      color="whiteAlpha.940"
      boxShadow={active ? `0 0 0 1px ${accent} inset, 0 0 26px ${accent}33` : "none"}
      _hover={{
        bg: "whiteAlpha.120",
        borderColor: accent ?? "brand.300",
      }}
    >
      {children}
    </Button>
  );
}

export default function Header({
  categories,
}: {
  categories: CategoryRecord[];
}) {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const channel = searchParams.get("channel");
  const activeCategory = pathname.match(/\/category\/([^/?#]+)/)?.[1];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      backdropFilter="blur(24px)"
      bg="rgba(5, 11, 23, 0.76)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 14px 40px rgba(0, 0, 0, 0.28)"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        gap={{ base: 3, md: 5 }}
      >
        <Box
          as={Link}
          href={getNavigationHref("/", channel)}
          minW={0}
          maxW="calc(100vw - 112px)"
          rounded="24px"
          border="1px solid"
          borderColor="rgba(76, 243, 255, 0.18)"
          bg="linear-gradient(135deg, rgba(10, 22, 42, 0.96), rgba(8, 18, 34, 0.82))"
          px={{ base: 3, md: 4 }}
          py={{ base: 2.5, md: 3.5 }}
          boxShadow="0 18px 44px rgba(0, 0, 0, 0.24)"
          overflow="hidden"
        >
          <BrandLockup />
        </Box>

        <Flex flex={1} hideBelow="lg" justify="space-between" align="center" gap={4}>
          <HStack spacing={3} flexWrap="wrap">
            {categories.map((category) => {
              const theme = getCategoryTheme(category.alias);

              return (
                <DesktopNavlink
                  href={getNavigationHref(`/category/${category.alias}`, channel)}
                  key={category.id}
                  active={activeCategory === category.alias}
                  accent={theme.accent}
                >
                  {category.name}
                </DesktopNavlink>
              );
            })}
          </HStack>
          <LocaleSwitcher />
        </Flex>

        <Flex hideFrom="lg" justifyContent="flex-end" flex={1}>
          <SideNav categories={categories} />
        </Flex>
      </Flex>
    </Box>
  );
}

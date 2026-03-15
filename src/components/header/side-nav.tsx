"use client";

import { motion, useCycle } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";

import BrandLockup from "@/components/brand-lockup";
import { getCategoryTheme, LOCALE_OPTIONS } from "@/configs";
import { Link, Locale, usePathname as useLocalePathname, useRouter } from "@/i18n/routing";
import { CategoryRecord } from "@/services/data";
import { getNavigationHref } from "@/utils";

const SideNav = ({
  categories,
}: {
  categories: CategoryRecord[];
}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const locale = useLocale() as Locale;
  const pathname = usePathname() ?? "";
  const localePathname = useLocalePathname();
  const router = useRouter();
  const t = useTranslations("Common");
  const searchParams = useSearchParams();
  const activeCategory = pathname.match(/\/category\/([^/?#]+)/)?.[1];

  const onChange = (nextLocale: Locale) => {
    const search = searchParams.toString();
    const href = search ? `${localePathname}?${search}` : localePathname;
    router.replace(href, { locale: nextLocale });
    if (isOpen) {
      toggleOpen();
    }
  };

  return (
    <>
      <Button
        as={motion.button}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        size="md"
        variant="ghost"
        p={0}
        w="46px"
        h="46px"
        rounded="full"
        border="1px solid"
        borderColor="whiteAlpha.160"
        bg="whiteAlpha.080"
        color="whiteAlpha.940"
        onClick={() => {
          toggleOpen();
        }}
      >
        <Box w={6} h={6} pos="relative">
          <Box
            as={motion.span}
            variants={{
              open: {
                top: "0.6875rem",
                transform: "rotate(45deg)",
              },
            }}
            pos="absolute"
            w="1.125rem"
            h="0.125rem"
            top="0.4375rem"
            left="0.1875rem"
            rounded="full"
            bg="currentcolor"
            transition="all .12s"
          />
          <Box
            as={motion.span}
            variants={{
              open: {
                bottom: "0.6875rem",
                transform: "rotate(-45deg)",
              },
            }}
            pos="absolute"
            w="1.125rem"
            h="0.125rem"
            bottom="0.4375rem"
            left="0.1875rem"
            rounded="full"
            bg="currentcolor"
            transition="all .12s"
          />
        </Box>
      </Button>
      <Drawer
        placement="right"
        isOpen={isOpen}
        onClose={() => {
          toggleOpen();
        }}
      >
        <DrawerOverlay bg="rgba(3, 7, 18, 0.82)" backdropFilter="blur(10px)" />
        <DrawerContent maxW="340px">
          <DrawerHeader px={5} pt={5}>
            <DrawerCloseButton size="lg" top={4} right={4} color="whiteAlpha.820" />
            <VStack align="stretch" spacing={2}>
              <BrandLockup size="sm" />
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.28em" color="whiteAlpha.520">
                {t("Play")} · {t("Category")}
              </Text>
            </VStack>
          </DrawerHeader>
          <DrawerBody px={5} pb={8}>
            <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.28em" color="whiteAlpha.760">
              {t("Category")}
            </Text>
            <VStack gap={3} align="stretch" my={4}>
              {categories.map(({ id, name, alias }) => {
                const theme = getCategoryTheme(alias);
                const active = activeCategory === alias;

                return (
                  <Button
                    key={id}
                    justifyContent="space-between"
                    variant="ghost"
                    as={Link}
                    href={getNavigationHref(`/category/${alias}`, searchParams.get("channel"))}
                    rounded="2xl"
                    h="60px"
                    px={4}
                    border="1px solid"
                    borderColor={active ? theme.border : "whiteAlpha.120"}
                    bg={active ? theme.accentSoft : "rgba(255, 255, 255, 0.04)"}
                    color={active ? theme.text : "rgba(236, 244, 255, 0.9)"}
                    boxShadow={active ? `0 0 0 1px ${theme.accent} inset, 0 0 24px ${theme.glow}` : "none"}
                    _hover={{
                      bg: theme.accentSoft,
                      color: theme.text,
                    }}
                  >
                    <Text color="inherit" fontWeight={active ? 700 : 600}>
                      {name}
                    </Text>
                    <HStack spacing={2}>
                      <Box
                        w={2}
                        h={2}
                        rounded="full"
                        bg={theme.accent}
                        boxShadow={`0 0 16px ${theme.glow}`}
                      />
                    </HStack>
                  </Button>
                );
              })}
            </VStack>
            <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.28em" color="whiteAlpha.520">
              {t("Locales")}
            </Text>
            <VStack gap={3} align="stretch" my={4}>
              {LOCALE_OPTIONS.map(({ value, label }) => (
                <Button
                  key={value}
                  justifyContent="start"
                  variant="ghost"
                  rounded="2xl"
                  h="52px"
                  px={4}
                  border="1px solid"
                  borderColor={value === locale ? "brand.300" : "whiteAlpha.120"}
                  bg={value === locale ? "rgba(76, 243, 255, 0.12)" : "rgba(255, 255, 255, 0.04)"}
                  color={value === locale ? "rgba(236, 250, 255, 0.96)" : "rgba(236, 244, 255, 0.86)"}
                  fontWeight={value === locale ? 700 : 500}
                  cursor={value === locale ? "default" : "pointer"}
                  _hover={{
                    bg: value === locale ? "rgba(76, 243, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
                  }}
                  onClick={() => {
                    if (value !== locale) {
                      onChange(value);
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;

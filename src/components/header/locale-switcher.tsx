"use client";

import { useLocale } from "next-intl";
import { GrLanguage } from "react-icons/gr";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

import { LOCALE_OPTIONS } from "@/configs";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

const LocaleSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale =
    LOCALE_OPTIONS.find((item) => item.value === locale)?.label ?? locale;

  const onChange = (nextLocale: Locale) => {
    const search = searchParams.toString();
    const href = search ? `${pathname}?${search}` : pathname;
    router.replace(href, { locale: nextLocale });
  };
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        aria-label="Options"
        leftIcon={<GrLanguage color="#4CF3FF" size="16px" />}
        size="sm"
        h="42px"
        px={4}
        minW="152px"
        border="1px solid"
        borderColor="rgba(76, 243, 255, 0.24)"
        bg="rgba(8, 18, 36, 0.9)"
        color="whiteAlpha.960"
        boxShadow="0 0 0 1px rgba(76, 243, 255, 0.12) inset, 0 16px 34px rgba(0, 0, 0, 0.24)"
        backdropFilter="blur(16px)"
        fontSize="sm"
        fontWeight={700}
        textShadow="0 1px 0 rgba(0, 0, 0, 0.28)"
        iconSpacing={3}
        _hover={{
          bg: "rgba(10, 25, 48, 0.96)",
          borderColor: "brand.300",
          transform: "translateY(-1px)",
          boxShadow: "0 0 0 1px rgba(76, 243, 255, 0.18) inset, 0 20px 38px rgba(0, 0, 0, 0.28)",
        }}
        _expanded={{
          bg: "rgba(10, 25, 48, 0.98)",
          borderColor: "brand.300",
          color: "white",
          boxShadow: "0 0 0 1px rgba(76, 243, 255, 0.24) inset, 0 22px 42px rgba(0, 0, 0, 0.3)",
        }}
        _active={{
          bg: "rgba(10, 25, 48, 0.98)",
        }}
      >
        {currentLocale}
      </MenuButton>
      <MenuList
        minW="176px"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.12)"
        bg="rgba(7, 14, 29, 0.96)"
        backdropFilter="blur(18px)"
        p={2}
      >
        {LOCALE_OPTIONS.map(({ value, label }) => (
          <MenuItem
            isDisabled={locale === value}
            key={value}
            value={value}
            color="whiteAlpha.900"
            bg={locale === value ? "rgba(255, 255, 255, 0.08)" : "transparent"}
            fontWeight={locale === value ? 700 : 600}
            borderRadius="16px"
            px={4}
            py={3}
            mb={1}
            _hover={{
              bg: "rgba(76, 243, 255, 0.12)",
              color: "white",
            }}
            _focus={{
              bg: "rgba(76, 243, 255, 0.12)",
              color: "white",
            }}
            _disabled={{
              opacity: 1,
              color: "whiteAlpha.620",
              cursor: "default",
            }}
            onClick={() => {
              onChange(value);
            }}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default LocaleSwitcher;

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
        leftIcon={<GrLanguage />}
        variant="outline"
        size="sm"
        h="42px"
        px={4}
        borderColor="whiteAlpha.220"
        bg="whiteAlpha.060"
        color="whiteAlpha.920"
        _hover={{
          bg: "whiteAlpha.120",
          borderColor: "brand.300",
        }}
        _expanded={{
          bg: "whiteAlpha.120",
          borderColor: "brand.300",
        }}
      >
        {currentLocale}
      </MenuButton>
      <MenuList minW="fit-content">
        {LOCALE_OPTIONS.map(({ value, label }) => (
          <MenuItem
            isDisabled={locale === value}
            key={value}
            value={value}
            color="whiteAlpha.900"
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

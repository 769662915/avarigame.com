import { Box, HStack, Stack, Text } from "@chakra-ui/react";

import { BRAND_TAGLINE, BRAND_WORDMARK } from "@/utils/brand";

interface BrandLockupProps {
  size?: "sm" | "md";
}

const sizes = {
  sm: {
    badge: "42px",
    dot: "8px",
    title: "lg",
    subtitle: "9px",
    gap: 3,
    spacing: 0.5,
  },
  md: {
    badge: "50px",
    dot: "9px",
    title: "xl",
    subtitle: "10px",
    gap: 3.5,
    spacing: 0.5,
  },
} as const;

export default function BrandLockup({ size = "md" }: BrandLockupProps) {
  const current = sizes[size];

  return (
    <HStack spacing={current.gap} align="center">
      <Box
        position="relative"
        w={current.badge}
        h={current.badge}
        rounded="18px"
        border="1px solid"
        borderColor="rgba(76, 243, 255, 0.32)"
        bg="linear-gradient(145deg, rgba(7, 20, 38, 0.96), rgba(8, 31, 58, 0.84))"
        boxShadow="0 0 0 1px rgba(76, 243, 255, 0.12) inset, 0 18px 40px rgba(0, 0, 0, 0.28)"
        overflow="hidden"
        flexShrink={0}
      >
        <Box
          position="absolute"
          inset="-18px auto auto -8px"
          w="36px"
          h="36px"
          rounded="full"
          bg="rgba(76, 243, 255, 0.32)"
          filter="blur(14px)"
        />
        <Box
          position="absolute"
          top="9px"
          left="9px"
          w={current.dot}
          h={current.dot}
          rounded="full"
          bg="brand.300"
          boxShadow="0 0 18px rgba(76, 243, 255, 0.72)"
        />
        <Box
          position="absolute"
          top="50%"
          left="10px"
          right="10px"
          h="2px"
          bgGradient="linear(to-r, rgba(76, 243, 255, 0.0), rgba(76, 243, 255, 0.9), rgba(255, 178, 91, 0.85))"
          transform="translateY(-50%) rotate(-28deg)"
          transformOrigin="center"
        />
        <Box
          position="absolute"
          right="9px"
          bottom="9px"
          w={current.dot}
          h={current.dot}
          rounded="full"
          bg="accent.orange"
          boxShadow="0 0 20px rgba(255, 178, 91, 0.62)"
        />
      </Box>

      <Stack spacing={current.spacing} minW={0}>
        <Text
          fontFamily="heading"
          fontSize={{ base: size === "sm" ? "md" : "lg", md: current.title }}
          lineHeight={0.94}
          letterSpacing={{ base: "0.08em", md: "0.14em" }}
          textTransform="uppercase"
          color="whiteAlpha.980"
          whiteSpace="nowrap"
        >
          {BRAND_WORDMARK}
        </Text>
        <Text
          display={{ base: size === "sm" ? "none" : "none", sm: "block" }}
          fontSize={current.subtitle}
          lineHeight={1.2}
          textTransform="uppercase"
          letterSpacing={{ base: "0.18em", md: "0.28em" }}
          color="whiteAlpha.620"
          whiteSpace="nowrap"
        >
          {BRAND_TAGLINE}
        </Text>
      </Stack>
    </HStack>
  );
}

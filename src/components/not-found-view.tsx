import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

import { Locale } from "@/i18n/routing";
import { getBrandContext } from "@/utils/brand";
import { getTargetHref } from "@/utils";

export default function NotFoundView({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const { brandName } = getBrandContext();

  return (
    <Container maxW="container.lg" px={{ base: 4, md: 6 }} py={{ base: 16, md: 24 }}>
      <Box
        position="relative"
        overflow="hidden"
        rounded={{ base: "28px", md: "36px" }}
        border="1px solid"
        borderColor="whiteAlpha.140"
        bg="rgba(9, 16, 32, 0.86)"
        boxShadow="0 24px 90px rgba(0, 0, 0, 0.42)"
        px={{ base: 6, md: 10 }}
        py={{ base: 10, md: 14 }}
      >
        <Box
          position="absolute"
          inset="auto auto -80px -40px"
          w="240px"
          h="240px"
          rounded="full"
          bg="brand.300"
          filter="blur(90px)"
          opacity={0.14}
        />
        <Stack spacing={5} position="relative" zIndex={1}>
          <Text
            fontSize="xs"
            fontWeight={700}
            textTransform="uppercase"
            letterSpacing="0.36em"
            color="brand.300"
          >
            404
          </Text>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            lineHeight={0.96}
            textTransform="uppercase"
            color="whiteAlpha.960"
          >
            {title}
          </Heading>
          <Text maxW="2xl" color="whiteAlpha.720">
            {brandName}
          </Text>
          <Box>
            <Button
              as="a"
              href={getTargetHref(locale, "/")}
              bg="brand.300"
              color="canvas.900"
              _hover={{
                bg: "brand.200",
                transform: "translateY(-2px)",
              }}
            >
              {brandName}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

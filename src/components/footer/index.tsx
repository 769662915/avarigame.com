import dayjs from "dayjs";

import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";

import { getBrandContext } from "@/utils/brand";

export default function Footer() {
  const { brandName, brandTagline } = getBrandContext();

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
          </Stack>
          <Text textAlign="center" color="rgba(232, 242, 255, 0.82)">
            © {dayjs().format("YYYY")} {brandName}. {brandTagline}.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

import { ReactNode } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface SectionShellProps {
  id?: string;
  title: ReactNode;
  accent?: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

export default function SectionShell({
  id,
  title,
  accent = "#4CF3FF",
  description,
  action,
  children,
}: SectionShellProps) {
  return (
    <Box
      id={id}
      position="relative"
      overflow="hidden"
      rounded={{ base: "28px", md: "32px" }}
      border="1px solid"
      borderColor="whiteAlpha.120"
      bg="rgba(9, 16, 32, 0.82)"
      boxShadow="0 24px 80px rgba(0, 0, 0, 0.34)"
      backdropFilter="blur(18px)"
      _before={{
        content: '""',
        position: "absolute",
        insetX: 0,
        top: 0,
        h: "1px",
        bgGradient: `linear(to-r, transparent, ${accent}, transparent)`,
        opacity: 0.9,
      }}
    >
      <Box
        position="absolute"
        top="-80px"
        right="-40px"
        w="220px"
        h="220px"
        rounded="full"
        bg={accent}
        filter="blur(90px)"
        opacity={0.12}
        pointerEvents="none"
      />
      <Box p={{ base: 4, md: 6, lg: 7 }}>
        <Flex
          gap={4}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          mb={{ base: 4, md: 5 }}
        >
          <Box>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              lineHeight={1.1}
              letterSpacing="0.03em"
              color="whiteAlpha.960"
              textTransform="uppercase"
            >
              {title}
            </Heading>
            {description ? (
              <Text mt={2} maxW="3xl" color="whiteAlpha.700" fontSize="sm">
                {description}
              </Text>
            ) : null}
          </Box>
          {action}
        </Flex>
        {children}
      </Box>
    </Box>
  );
}

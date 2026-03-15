import { Locale } from "@/i18n/routing";
import { GameCardRecord } from "@/services/data";
import { getTargetHref } from "@/utils";
import { AspectRatio, Box, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Image from "next/image";

const GameItem = ({
  data,
  locale,
  channel,
  variant = "default",
  accent = "#4CF3FF",
}: {
  data: GameCardRecord;
  locale: Locale;
  channel?: string;
  variant?: "default" | "featured";
  accent?: string;
}) => {
  if (!data) {
    return null;
  }

  const featured = variant === "featured";

  return (
    <LinkBox
      role="group"
      h="full"
      rounded={{ base: "2xl", md: "3xl" }}
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor={featured ? `${accent}66` : "whiteAlpha.120"}
      bg="rgba(12, 19, 36, 0.9)"
      boxShadow={featured ? `0 0 0 1px ${accent} inset, 0 0 34px ${accent}2e` : "0 16px 42px rgba(0, 0, 0, 0.22)"}
      _hover={{
        transform: "translateY(-4px)",
        borderColor: `${accent}88`,
        boxShadow: `0 0 0 1px ${accent} inset, 0 24px 54px rgba(0, 0, 0, 0.34), 0 0 38px ${accent}24`,
      }}
      transition="all .22s ease"
    >
      <AspectRatio ratio={1} bg="canvas.800">
        <Image
          alt={data.name}
          width={420}
          height={420}
          src={data.image}
          priority={false}
          style={{ objectFit: "cover" }}
        />
      </AspectRatio>
      <Box
        position="absolute"
        inset={0}
        bgGradient={
          featured
            ? "linear(to-t, rgba(5, 11, 23, 0.94), rgba(5, 11, 23, 0.2) 42%, transparent)"
            : "linear(to-t, rgba(5, 11, 23, 0.95), rgba(5, 11, 23, 0.08) 48%, transparent)"
        }
      />
      <Box
        position="absolute"
        top={3}
        left={3}
        h="6px"
        w={featured ? "56px" : "40px"}
        rounded="full"
        bg={accent}
        boxShadow={`0 0 18px ${accent}`}
      />
      <LinkOverlay
        href={getTargetHref(locale, `/detail/${data.id}`, channel)}
        display="block"
        h="full"
      >
        <Box position="absolute" left={0} right={0} bottom={0} zIndex={2} px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
          <Heading
            width="full"
            noOfLines={featured ? 2 : 1}
            as="h5"
            lineHeight={featured ? 1.15 : 1.35}
            fontSize={featured ? { base: "sm", md: "md" } : "xs"}
            color="white"
            textShadow="0 8px 18px rgba(0, 0, 0, 0.55)"
          >
            {data.name}
          </Heading>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default GameItem;

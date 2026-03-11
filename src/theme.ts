import { defineStyle, extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  fonts: {
    heading:
      '"Orbitron", "Eurostile", "Bank Gothic", "Trebuchet MS", sans-serif',
    body: '"IBM Plex Sans", "Segoe UI", sans-serif',
  },
  semanticTokens: {
    colors: {
      brand: {
        50: "#d7fbff",
        100: "#9cf8ff",
        200: "#68f5ff",
        300: "#4cf3ff",
        400: "#17d6e3",
        500: "#0aa8c0",
        600: "#087a93",
        700: "#065668",
        800: "#043946",
        900: "#021f28",
      },
      canvas: {
        900: "#060b16",
        800: "#091122",
        700: "#0d1830",
        600: "#111f3d",
      },
      accent: {
        lime: "#bcff46",
        orange: "#ffb25b",
        coral: "#ff6b5b",
        violet: "#8a7bff",
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 700,
        letterSpacing: "0.04em",
        borderRadius: "full",
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "28px",
          border: "1px solid",
          borderColor: "whiteAlpha.100",
          bg: "rgba(10, 18, 36, 0.82)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.38)",
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "rgba(8, 15, 30, 0.96)",
          borderColor: "whiteAlpha.200",
          borderRadius: "20px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.42)",
          p: 2,
        },
        item: {
          borderRadius: "14px",
          _hover: {
            bg: "whiteAlpha.120",
          },
          _focus: {
            bg: "whiteAlpha.120",
          },
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "rgba(8, 15, 30, 0.98)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    Accordion: {
      baseStyle: {
        container: {
          border: "none",
        },
      },
    },
  },
  styles: {
    global: defineStyle({
      "html, body": {
        minHeight: "100%",
        scrollBehavior: "smooth",
        bg: "canvas.900",
        overflowX: "clip",
      },
      body: {
        minW: "320px",
        bg: "radial-gradient(circle at top, rgba(12, 46, 82, 0.45), transparent 30%), linear-gradient(180deg, #060b16 0%, #091122 55%, #060914 100%)",
        color: "whiteAlpha.900",
        position: "relative",
        fontFeatureSettings: '"ss01" on, "cv01" on',
      },
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        bgImage:
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        bgSize: "36px 36px",
        maskImage: "linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.9))",
        opacity: 0.28,
      },
      "::selection": {
        bg: "rgba(76, 243, 255, 0.24)",
        color: "white",
      },
      a: {
        transition: "all .2s ease",
      },
      ".star": {
        "&.full": {
          background: "url(/static/images/star/star.png) no-repeat",
          backgroundSize: "auto 100%",
        },
        "&.empty": {
          background: "url(/static/images/star/empty-star.png) no-repeat",
          backgroundSize: "auto 100%",
        },
        "&.half": {
          background: "url('/static/images/star/half-star.png') no-repeat, url('/static/images/star/empty-star.png') no-repeat",
          backgroundSize: "auto 100%, auto 100%",
        },
      },
      ".ad-placeholder": {
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      },
      ".ad-placeholder > ins": {
        display: "block",
        maxWidth: "100% !important",
      },
      ".ad-placeholder iframe": {
        maxWidth: "100% !important",
      },
      ".ad-placeholder > ins[data-ad-status='unfilled']": {
        display: "none !important",
      },
      ".ad-placeholder > ins[data-ad-status='unfilled'] + script + *": {
        display: "none !important",
      },
      "#description a": {
        color: "brand.300",
      },
    }),
  },
});

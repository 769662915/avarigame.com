import { Locale } from "./i18n/routing";

export interface LocaleRecord {
  value: Locale;
  label: string;
}

export interface CategoryTheme {
  accent: string;
  accentSoft: string;
  surface: string;
  border: string;
  glow: string;
  text: string;
  muted: string;
  hero: string;
}

export const ADSENSE_CLIENT = "ca-pub-5694251034801452";

export const ADSENSE_SLOTS = {
  homeBanner: "2548934105",
  detailRecommend: "4217384783",
} as const;

export const LOCALE_OPTIONS: Array<LocaleRecord> = [
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "ja-JP",
    label: "日本語",
  },
];

export const DEFAULT_CATEGORY_THEME: CategoryTheme = {
  accent: "#4CF3FF",
  accentSoft: "rgba(76, 243, 255, 0.14)",
  surface: "linear-gradient(145deg, rgba(10, 18, 36, 0.94), rgba(15, 27, 48, 0.82))",
  border: "rgba(76, 243, 255, 0.28)",
  glow: "rgba(76, 243, 255, 0.32)",
  text: "#EBFDFF",
  muted: "rgba(235, 253, 255, 0.72)",
  hero: "linear-gradient(135deg, rgba(5, 14, 30, 0.98), rgba(11, 35, 61, 0.88) 45%, rgba(13, 90, 119, 0.62))",
};

export const CATEGORY_THEME_MAP: Record<string, CategoryTheme> = {
  action: {
    accent: "#4CF3FF",
    accentSoft: "rgba(76, 243, 255, 0.16)",
    surface: "linear-gradient(145deg, rgba(7, 20, 38, 0.96), rgba(8, 31, 58, 0.82))",
    border: "rgba(76, 243, 255, 0.28)",
    glow: "rgba(76, 243, 255, 0.34)",
    text: "#E8FCFF",
    muted: "rgba(232, 252, 255, 0.72)",
    hero: "linear-gradient(140deg, rgba(5, 12, 27, 0.98), rgba(8, 31, 58, 0.9) 45%, rgba(25, 154, 200, 0.48))",
  },
  adventure: {
    accent: "#BCFF46",
    accentSoft: "rgba(188, 255, 70, 0.14)",
    surface: "linear-gradient(145deg, rgba(14, 24, 20, 0.96), rgba(22, 36, 28, 0.84))",
    border: "rgba(188, 255, 70, 0.24)",
    glow: "rgba(188, 255, 70, 0.24)",
    text: "#F5FFE1",
    muted: "rgba(245, 255, 225, 0.72)",
    hero: "linear-gradient(140deg, rgba(7, 14, 18, 0.98), rgba(18, 31, 24, 0.92) 45%, rgba(108, 168, 33, 0.42))",
  },
  boys: {
    accent: "#FFB25B",
    accentSoft: "rgba(255, 178, 91, 0.14)",
    surface: "linear-gradient(145deg, rgba(27, 18, 12, 0.96), rgba(48, 29, 18, 0.84))",
    border: "rgba(255, 178, 91, 0.26)",
    glow: "rgba(255, 178, 91, 0.28)",
    text: "#FFF1DD",
    muted: "rgba(255, 241, 221, 0.72)",
    hero: "linear-gradient(140deg, rgba(11, 12, 22, 0.98), rgba(36, 24, 16, 0.92) 45%, rgba(255, 150, 65, 0.42))",
  },
  shooting: {
    accent: "#FF6B5B",
    accentSoft: "rgba(255, 107, 91, 0.16)",
    surface: "linear-gradient(145deg, rgba(27, 14, 16, 0.96), rgba(48, 18, 23, 0.84))",
    border: "rgba(255, 107, 91, 0.28)",
    glow: "rgba(255, 107, 91, 0.3)",
    text: "#FFF1EF",
    muted: "rgba(255, 241, 239, 0.72)",
    hero: "linear-gradient(140deg, rgba(11, 12, 22, 0.98), rgba(44, 14, 18, 0.92) 45%, rgba(255, 97, 72, 0.4))",
  },
  stickman: {
    accent: "#8A7BFF",
    accentSoft: "rgba(138, 123, 255, 0.16)",
    surface: "linear-gradient(145deg, rgba(16, 15, 31, 0.96), rgba(26, 24, 52, 0.84))",
    border: "rgba(138, 123, 255, 0.28)",
    glow: "rgba(138, 123, 255, 0.32)",
    text: "#F0EEFF",
    muted: "rgba(240, 238, 255, 0.72)",
    hero: "linear-gradient(140deg, rgba(8, 11, 24, 0.98), rgba(19, 18, 44, 0.92) 45%, rgba(109, 88, 255, 0.42))",
  },
};

export const getCategoryTheme = (alias?: string | null): CategoryTheme => {
  if (!alias) {
    return DEFAULT_CATEGORY_THEME;
  }

  return CATEGORY_THEME_MAP[alias] ?? DEFAULT_CATEGORY_THEME;
};

const FALLBACK_BASE_URL = "https://topworldspots.com";

export const BRAND_NAME = "TopWorldSpots";
export const BRAND_WORDMARK = "TOPWORLDSPOTS";
export const BRAND_TAGLINE = "Curated browser arcade";
export const BRAND_DESCRIPTION =
  "TopWorldSpots is a free browser gaming hub with curated picks, instant play, and zero downloads.";

const sanitizeBaseUrl = (value?: string) => {
  if (!value) {
    return FALLBACK_BASE_URL;
  }

  return value.trim().replace(/^['"]+|['"]+$/g, "");
};

export const getBaseUrl = () => sanitizeBaseUrl(process.env.BASE_URL);

export const getBrandContext = () => {
  const baseUrl = getBaseUrl();
  const { hostname } = new URL(baseUrl);

  return {
    baseUrl,
    hostname,
    brandName: BRAND_NAME,
    brandWordmark: BRAND_WORDMARK,
    brandTagline: BRAND_TAGLINE,
    brandDescription: BRAND_DESCRIPTION,
  };
};

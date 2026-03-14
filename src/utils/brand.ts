export const BRAND_NAME = "AvariGame";
export const BRAND_WORDMARK = "AVARIGAME";
export const BRAND_DOMAIN = "avarigame.com";
export const BRAND_EMAIL = "avarigame@gmail.com";
export const BRAND_TAGLINE = "Free browser arcade";
export const BRAND_DESCRIPTION =
  `${BRAND_NAME} is a free browser gaming hub on ${BRAND_DOMAIN} with curated picks, instant play, and zero downloads.`;

export const getBrandContext = () => {
  return {
    brandName: BRAND_NAME,
    brandWordmark: BRAND_WORDMARK,
    brandDomain: BRAND_DOMAIN,
    brandEmail: BRAND_EMAIL,
    brandTagline: BRAND_TAGLINE,
    brandDescription: BRAND_DESCRIPTION,
  };
};

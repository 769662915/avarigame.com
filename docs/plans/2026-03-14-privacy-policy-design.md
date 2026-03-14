# Privacy Policy Page Design

## Goal

Add a localized privacy policy page for `avarigame.com` and align the visible brand across the site so the legal page, footer, metadata, and homepage all reference the same brand identity.

## Scope

- Add a new localized route at `/[locale]/privacy-policy`
- Add footer navigation to the privacy policy page
- Update brand constants from `TopWorldSpots` to `AvariGame`
- Reference the active domain `avarigame.com`
- Publish a site-specific policy that mentions:
  - Google AdSense
  - TikTok Pixel
  - Cookies and similar technologies
  - Redirects to third-party game providers
  - Privacy contact email `avarigame@gmail.com`

## Page Structure

The page should reuse the existing site shell:

- Sticky `Header`
- Main `Container` with a branded hero block
- Three quick-reference cards for website, privacy contact, and third-party services
- Anchor chips for fast navigation between sections
- Policy sections rendered as stacked cards
- Shared `Footer`

## Content Strategy

The copy should be concise, plain-language, and specific to how the site works today:

- Browsing game lists on the site
- Seeing ads and analytics scripts
- Being redirected to external game hosts when launching a game

Two locales are included:

- `en-US`
- `ja-JP`

## SEO

The privacy page should expose localized metadata with a clear title and description so the page is discoverable and consistent with the rest of the static export.

# Hint Marketplace listing kit (AiFax)

Everything for the AiFax listing in the Hint Marketplace. The copy is in
`listing.json`; the images are in this folder. The same content is already
applied to the sandbox product "AiFax" (sbx-ppro-TkV3zAqrupdE) through the
partner API, so it can be previewed in the sandbox Marketplace.

The same content is applied to the LIVE product "AiFax" (ppro-UYCHrW1uvpgR,
slug ai-fax) through the partner API (2026-11-10, read back OK). It is not
submitted for review; submit from the portal Dashboard once the agreements
are signed.

| Portal field | Value |
|---|---|
| Company details: email | info@aifax.net (fills the blank in "Please email them at") |
| Product name | AiFax |
| Product type | Integration |
| Slug (fixed by Hint) | ai-fax (aifax.net links to https://www.hint.com/marketplace/ai-fax) |
| Summary (80 max) | `summary` in listing.json |
| Built by | AiFax, https://www.aifax.net |
| Icon (square, no text) | aifax-hint-icon.svg, or aifax-hint-icon-800.png |
| Horizontal logo (3:1) | aifax-logo-horizontal-1200x400.png |
| Overview | `overview` in listing.json, images overview-1-flow.png and overview-2-summary.png |
| Highlights (4) | `highlights` in listing.json, images highlight-*.png |
| Links | `links` in listing.json (email only for support, no phone) |
| Categories | Medical Records & Data Exchange; Workflow Automation |
| Precondition | External account: https://www.aifax.net/pricing |

Rules the copy follows: both ways to start, switching to AiFax first; chart
filing always says "within what Hint allows"; no em dashes.

Regenerate the PNGs: `node render.js` in this folder (needs Playwright and
network access for Google Fonts).

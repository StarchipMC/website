# StarchipMC Website

Static single-page Night Market prototype for StarchipMC, rebuilt directly from the approved raster mockup.

The website is public. The Minecraft server is not open to public registration.

## Stack

- Semantic HTML
- Hand-authored responsive CSS
- Small progressive-enhancement JavaScript
- GitHub Pages deployment through GitHub Actions
- FormSubmit contact delivery with first-use email activation

There is no package manager or production build step.

## Preview locally

From this directory, start any static HTTP server. For example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

Do not judge clipboard behavior from a `file://` URL; the browser Clipboard API requires a secure context or localhost.

## Before launch

### Connect the contact form

The contact form uses FormSubmit's no-account email endpoint. The first submitted message sends an activation email to the configured recipient; open that message and confirm the form. After confirmation, future submissions are delivered to the same inbox. FormSubmit keeps CAPTCHA enabled and the site also includes a hidden honeypot field.

The form works without JavaScript through its normal POST action.

### GitHub Pages

The public source repository is `StarchipMC/website`. GitHub Pages publishes directly from the root of `main`, so every push deploys automatically without a build workflow.

Staging URL: `https://starchipmc.github.io/website/`

1. Review the default staging URL before attaching the custom domain.
2. Configure `starchipmc.com` under **Settings → Pages → Custom domain** only after the GoDaddy DNS zone is backed up.
3. Follow the DNS and HTTPS sequence in the StarchipMC Technical Launch Plan.

Configure the production domain in Pages settings during DNS launch. GitHub will manage the corresponding `CNAME` file when branch publishing is active.

## Content and privacy rules

- Never describe StarchipMC as open to the public.
- Never commit player names, child-related information, server administration data, allowlists, or credentials.
- Keep form collection limited to a name, reply email, and message. Never collect passwords or other sensitive
  account details.
- Keep UI copy and controls in HTML rather than raster images.
- Preserve `play.starchipmc.com` when editing DNS.

## Screenshot replacements needed

Capture three new screenshots before the final image pass:

- Skyblocks world card
- PvP world card
- Contact section

The current images in those locations are temporary.

## Fonts

Silkscreen and Chakra Petch are self-hosted under the SIL Open Font License. The active font files and licenses live in `assets/night-market-v2/fonts/`.

## Design source

The active page references only the isolated `assets/night-market-v2/` package. Its canonical raster reference, generated scene sources, deterministic build script, and asset manifest live in `../design/assets/night-market-v2/`.

The inherited prototype was preserved outside the publishable website directory at `../prototypes/temporary-inherited-prototype-2026-09-02/`.

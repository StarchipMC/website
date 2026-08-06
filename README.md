# StarchipMC Website

Static single-page marketing site for StarchipMC, a private Minecraft server shared by Starfire and her real-world friends.

The website is public. The Minecraft server is not open to public registration.

## Stack

- Semantic HTML
- Hand-authored responsive CSS
- Small progressive-enhancement JavaScript
- GitHub Pages deployment through GitHub Actions
- Formspree contact endpoint once configured

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

Create a Formspree form owned by the approved private StarchipMC project mailbox, then replace `REPLACE_FORM_ID` in `index.html` with the public form ID. The expected action format is:

```text
https://formspree.io/f/FORM_ID
```

Then:

1. Restrict accepted submissions to `starchipmc.com` in Formspree.
2. Confirm that the `_gotcha` honeypot is enabled.
3. Submit a real test from the production domain.
4. Confirm receipt and reply from the StarchipMC Proton identity.
5. Delete the test submission.

The page intentionally blocks submission while the placeholder form ID remains.

### GitHub Pages

1. Create a clean public GitHub repository and copy this directory into its root.
2. Push the default branch as `main`.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. Let the included workflow deploy the temporary Pages URL.
5. Test the temporary URL before attaching the custom domain.
6. Follow the DNS and HTTPS sequence in the StarchipMC Technical Launch Plan.

The `CNAME` file sets the production domain to `starchipmc.com`.

## Content and privacy rules

- Never describe StarchipMC as open to the public.
- Never commit player names, child-related information, server administration data, allowlists, or credentials.
- Keep form collection limited to an adult’s name, reply email, and message.
- Keep UI copy and controls in HTML rather than raster images.
- Preserve `play.starchipmc.com` when editing DNS.

## Fonts

Silkscreen and Chakra Petch are self-hosted under the SIL Open Font License. Their license texts are stored beside the font files in `assets/fonts/`.

# Museum of Cool Science

Ethan's Museum of Cool Science: a personal collection put on display. Nothing here is for sale.

The name comes from a museum I ran as a kid (coins, toys, rocks, pressed pennies). The collection has grown well past
science, but the original name stays.

## Wings

The lobby branches straight into one wing per collection, with no umbrella categories in between:

| Wing                           | id                |
| ------------------------------ | ----------------- |
| Nintendo Consoles & Cartridges | `nintendo`        |
| Star Trek Memorabilia          | `star-trek`       |
| Comic Books                    | `comic-books`     |
| Pokémon Cards                  | `pokemon-cards`   |
| Pressed Pennies                | `pressed-pennies` |
| DVDs                           | `dvds`            |
| Books                          | `books`           |

Wings live in [`src/content/wings.json`](src/content/wings.json). To add a wing, add an entry there. It gets a lobby
button and a page at `/<id>/`.

## Curating

To add exhibits, change wings, or understand the content model, see [CONTRIBUTING.md](CONTRIBUTING.md). Visitors can
find how to read the site at [museum.etok.me/guide](https://museum.etok.me/guide/).

## Development

Requires Node 22.23.4 or later.

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # type-check .astro files and content
npm run build    # static site in dist/
```

Internal links go through `withBase()` from [`src/lib/paths.ts`](src/lib/paths.ts), never a bare `"/..."`, so the
site also works when built under a sub-path (`BASE_PATH=/some/path/ npm run build`).

## Deploys

The site is a static-assets-only Cloudflare Worker ([`wrangler.jsonc`](wrangler.jsonc)), served at
[museum.etok.me](https://museum.etok.me) and
[museum-of-cool-science.ethan-r-davidson.workers.dev](https://museum-of-cool-science.ethan-r-davidson.workers.dev).
[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) deploys it straight from this repo, so
GitHub holds no Cloudflare secrets:

- **Production:** every push to `main` runs `npm run check && npm run build`, then `npx wrangler deploy`, which also
  attaches the `museum.etok.me` custom domain.
- **PR previews:** every other branch builds the same way and runs `npx wrangler preview`, which serves it at
  `https://<branch>.preview.museum.etok.me/`. Cloudflare comments the link on the PR. Preview hosts send
  `X-Robots-Tag: noindex` ([`public/_headers`](public/_headers)).

Build settings live on the Worker in the Cloudflare dashboard (Settings → Builds).

To deploy by hand: `npm run build && npx wrangler deploy`.

## Interface

The look is the
[LCARS Inspired Website Template by www.TheLCARS.com](https://www.thelcars.com), with modifications. It is used under the
template's [EULA](https://www.thelcars.com/license/), which allows personal, non-commercial use with attribution and
forbids hotlinking the template's files. Under those terms:

- The site serves its own copy of the Classic theme stylesheet,
  [`src/styles/vendor/lcars-classic.css`](src/styles/vendor/lcars-classic.css). Don't edit it by hand. Regenerate it
  from a fresh download with `npm run vendor:lcars -- <path-to-classic.css>`. The script
  ([`scripts/vendor-lcars.mjs`](scripts/vendor-lcars.mjs)) drops the template's `@font-face` rules and lets
  `<a class="lcars">` links take the button styles.
- Fonts come from [`@fontsource/antonio`](https://fontsource.org/fonts/antonio) (SIL OFL), not from the template's
  font files.
- The template's sound effects and script are not used. [`src/lib/lcars.ts`](src/lib/lcars.ts) re-implements the
  stardate readout and the screen-top button.
- The site footer carries the attribution and the Star Trek trademark notice. Keep it.
- Keep the site non-commercial: no ads, no affiliate links, no sales.

STAR TREK® and related marks are trademarks of CBS Studios Inc. This project is in no way affiliated with CBS Studios
Inc. LCARS was designed by graphic artist Michael Okuda.

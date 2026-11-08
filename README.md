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

## Adding an exhibit

1. Copy [`src/content/exhibits/_template.md`](src/content/exhibits/_template.md) to
   `src/content/exhibits/<wing>/<slug>.md`.
2. Fill in the frontmatter. Only `title` and `wing` are required. To add a photo, put it next to the file and set
   `image: ./photo.jpg` and `imageAlt`.
3. The exhibit appears at `/<wing>/<slug>/`, in its wing, and in the catalog. Set `featured: true` to list it in the
   lobby, or `draft: true` to keep it off the site.

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

GitHub Pages serves the `gh-pages` branch at [museum.etok.me](https://museum.etok.me).

- **Production:** every push to `main` builds the site and deploys it to the root of `gh-pages`
  ([`deploy.yaml`](.github/workflows/deploy.yaml)).
- **PR previews:** every pull request from a branch in this repo builds under `/pr-preview/pr-<n>/` and gets a comment
  with the link ([`preview.yaml`](.github/workflows/preview.yaml)). Closing the PR removes the preview. PRs from forks
  don't get previews.

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

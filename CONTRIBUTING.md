# Curating the museum

The Museum of Cool Science is a personal collection, and the curator decides what goes on display. This guide covers
how exhibits and wings work and how a change gets from a branch to [museum.etok.me](https://museum.etok.me).

For how visitors read the site, see the [visitor guide](https://museum.etok.me/guide/).

## The model

| Thing   | Lives in                                   | Shows up at                              |
| ------- | ------------------------------------------ | ---------------------------------------- |
| Wing    | an entry in `src/content/wings.json`       | a lobby button and `/<wing>/`            |
| Exhibit | `src/content/exhibits/<wing>/<slug>.md`    | its wing, the catalog, `/<wing>/<slug>/` |
| Photo   | next to its exhibit's `.md` file           | the exhibit page, resized at build time  |

The schema is in [`src/content.config.ts`](src/content.config.ts). The build checks every file against it, so a typo,
an unknown wing or a missing photo fails the build and never reaches the live site.

## Add an exhibit

1. Start a branch:

   ```sh
   git checkout -b add-game-boy-color
   ```

2. Copy [`src/content/exhibits/_template.md`](src/content/exhibits/_template.md) to
   `src/content/exhibits/<wing>/<slug>.md`. The slug becomes the URL, so use lowercase words and hyphens:
   `src/content/exhibits/nintendo/game-boy-color.md` → `/nintendo/game-boy-color/`.

3. Fill in the frontmatter, then write the exhibit's story below it in Markdown:

   ```markdown
   ---
   title: Game Boy Color (Atomic Purple)
   wing: nintendo
   maker: Nintendo
   year: 1998
   acquired: "1999"
   provenance: Birthday present
   condition: well loved
   image: ./game-boy-color.jpg
   imageAlt: A translucent purple Game Boy Color
   tags: [handheld]
   ---

   The story goes here.
   ```

4. Put the photo next to the file (see [Photos](#photos)).

5. Optionally, check it locally with `npm run dev` (http://localhost:4321).

6. Push and open a pull request. Cloudflare builds the branch, runs the type check, and comments a preview link on the
   PR: `https://<branch>.preview.museum.etok.me/`. Preview pages are marked `noindex`, so search engines skip them.

7. Merge. Cloudflare deploys `main` to museum.etok.me within a minute or two, and the preview goes away once the branch
   is deleted.

One PR can hold any number of exhibits. Committing straight to `main` also works; it just skips the preview.

## Fields

| Field        | Required | Notes                                                                                     |
| ------------ | -------- | ----------------------------------------------------------------------------------------- |
| `title`      | yes      | The exhibit's name.                                                                       |
| `wing`       | yes      | A wing `id` from `wings.json`. This field, not the folder, decides where the exhibit goes. |
| `maker`      |          | Company, publisher, studio or mint.                                                       |
| `year`       |          | Release or minting year, as a number.                                                     |
| `acquired`   |          | When it joined the collection, as text: `"1999"`, `"Summer 2019"`.                        |
| `provenance` |          | Where it came from.                                                                       |
| `condition`  |          | One of `mint`, `near mint`, `excellent`, `good`, `fair`, `well loved`.                    |
| `image`      |          | Path to the photo, relative to the `.md` file: `./photo.jpg`.                             |
| `imageAlt`   |          | What the photo shows, for screen readers. Defaults to the title.                          |
| `tags`       |          | A list of loose labels: `[handheld, limited edition]`.                                    |
| `featured`   |          | `true` lists it under "Featured exhibits" in the lobby.                                   |
| `draft`      |          | `true` keeps it off the site but keeps the file.                                          |

Wings list exhibits newest `year` first; the catalog lists them A to Z.

## Photos

- JPEG, PNG or WebP, at least 800 px wide. The site resizes and compresses them, so the original from your phone is
  fine.
- Name the photo after the exhibit's slug: `game-boy-color.jpg`.
- Use photos you took yourself.

## Change the collection

- **Hide an exhibit:** set `draft: true`. Delete the file to remove it for good.
- **Move an exhibit to another wing:** change its `wing` field. Move the file into the matching folder too, to keep
  things tidy.
- **Add a wing:** add an entry to `src/content/wings.json`:

  ```json
  {
    "id": "coins",
    "title": "Coins",
    "code": "COIN",
    "order": 8,
    "color": "barley",
    "summary": "One line about the collection."
  }
  ```

  `code` is at most 6 characters. `order` sets the wing's place in the lobby. `color` is one of the LCARS palette names
  listed in `src/content.config.ts`.

- **Reorder the lobby:** change the wings' `order` numbers.

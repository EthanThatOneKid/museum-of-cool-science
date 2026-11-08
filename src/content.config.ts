import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

/** LCARS palette names from the vendored Classic theme (`--<color>` custom properties). */
const lcarsColor = z.enum([
  "african-violet",
  "almond",
  "almond-creme",
  "barley",
  "bluey",
  "butterscotch",
  "dusty-mauve",
  "lilac",
  "orange",
  "red",
  "subdued-sienna",
  "true-mauve",
]);

/** A wing is one collection: Nintendo, Star Trek, pressed pennies, and so on. */
const wings = defineCollection({
  loader: file("src/content/wings.json"),
  schema: z.object({
    title: z.string(),
    /** Short LCARS readout label, e.g. "NIN" — shown on buttons. */
    code: z.string().max(6),
    /** Lobby order. */
    order: z.number().int(),
    color: lcarsColor,
    summary: z.string(),
  }),
});

/**
 * An exhibit is one item (or one set) on display. Files live at
 * `src/content/exhibits/<wing>/<slug>.md`; the folder is for tidiness, the
 * `wing` field is what places the exhibit.
 */
const exhibits = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/exhibits" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      wing: reference("wings"),
      /** Maker, publisher, mint, or studio. */
      maker: z.string().optional(),
      /** Release or minting year. */
      year: z.number().int().optional(),
      /** When it joined the collection, free-form ("2004", "Summer 2019"). */
      acquired: z.string().optional(),
      /** Where it came from — a place, a person, a story. */
      provenance: z.string().optional(),
      condition: z.enum(["mint", "near mint", "excellent", "good", "fair", "well loved"]).optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** Show on the lobby's featured strip. */
      featured: z.boolean().default(false),
      /** Hide from the built site while writing it up. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { wings, exhibits };

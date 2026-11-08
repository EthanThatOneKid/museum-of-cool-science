import { getCollection, type CollectionEntry } from "astro:content";

export type Wing = CollectionEntry<"wings">;
export type Exhibit = CollectionEntry<"exhibits">;

export async function getWings(): Promise<Wing[]> {
  const wings = await getCollection("wings");
  return wings.sort((a, b) => a.data.order - b.data.order);
}

/** Published exhibits, newest year first, then by title. */
export async function getExhibits(wingId?: string): Promise<Exhibit[]> {
  const exhibits = await getCollection(
    "exhibits",
    ({ data }) => !data.draft && (wingId === undefined || data.wing.id === wingId),
  );
  return exhibits.sort(
    (a, b) => (b.data.year ?? 0) - (a.data.year ?? 0) || a.data.title.localeCompare(b.data.title),
  );
}

/** The URL slug of an exhibit within its wing: the file name without its folder. */
export function exhibitSlug(exhibit: Exhibit): string {
  return exhibit.id.split("/").at(-1)!;
}

export function exhibitHref(exhibit: Exhibit): string {
  return `/${exhibit.data.wing.id}/${exhibitSlug(exhibit)}/`;
}

/**
 * Deterministic filler digits for the LCARS data cascade, so every build of a
 * page renders the same readout.
 */
export function dataCascade(seed: string, columns = 24, rows = 9): string[][] {
  let state = [...seed].reduce((h, c) => (Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0), 2166136261);
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
  return Array.from({ length: columns }, () =>
    Array.from({ length: rows }, () => {
      const digits = 2 + (next() % 6);
      return String(next() % 10 ** digits).padStart(digits, "0");
    }),
  );
}

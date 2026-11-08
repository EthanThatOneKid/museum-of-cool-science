// The site can be built under a sub-path (BASE_PATH=/some/path/ npm run build),
// so internal links go through these helpers instead of hard-coding "/".

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a site-root path such as "/about/" with the configured base. */
export function withBase(path: `/${string}`): string {
  return `${base}${path}`;
}

/** Inverse of withBase: the site-root path of a request pathname. */
export function stripBase(pathname: string): string {
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
}

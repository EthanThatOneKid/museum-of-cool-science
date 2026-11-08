// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://museum.etok.me",
  // Optional sub-path builds (BASE_PATH=/some/path/). Production and previews both serve from the root of their host.
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
});

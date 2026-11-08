// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://museum.etok.me",
  // PR previews are served from /pr-preview/pr-<n>/; see .github/workflows/preview.yaml.
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
});

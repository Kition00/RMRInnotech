// astro.config.mjs
// Configured for Cloudflare Pages deployment via GitHub integration

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Static output — no adapter needed for Cloudflare Pages static hosting
  output: 'static',

  // Integrations
  integrations: [tailwind()],

  // Site URL — update with your actual domain before deploying
  site: 'https://rmrinnotech.com',
});

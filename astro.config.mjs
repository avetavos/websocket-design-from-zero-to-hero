// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/websocket-design-from-zero-to-hero',
  output: 'static',
  integrations: [starlight({
      title: 'WebSocket Design — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/websocket-design-from-zero-to-hero/enhance.js' } },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/websocket-design-from-zero-to-hero' }],
      sidebar: [
        { label: 'WebSocket Foundations', items: [{ autogenerate: { directory: 'websocket-foundations' } }] },
        { label: 'The Client API', items: [{ autogenerate: { directory: 'the-client-api' } }] },
        { label: 'Message Design', items: [{ autogenerate: { directory: 'message-design' } }] },
        { label: 'Connection Lifecycle', items: [{ autogenerate: { directory: 'connection-lifecycle' } }] },
        { label: 'Server Design', items: [{ autogenerate: { directory: 'server-design' } }] },
        { label: 'Scaling & Pub/Sub', items: [{ autogenerate: { directory: 'scaling-and-pubsub' } }] },
        { label: 'Security', items: [{ autogenerate: { directory: 'security' } }] },
        { label: 'Patterns & Alternatives', items: [{ autogenerate: { directory: 'patterns-and-alternatives' } }] },
      ],
      }), preact()],
});
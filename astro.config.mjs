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
        { tag: 'link', attrs: { rel: 'manifest', href: '/websocket-design-from-zero-to-hero/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/websocket-design-from-zero-to-hero/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/websocket-design-from-zero-to-hero/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#F97316' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "WebSocket Design" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/websocket-design-from-zero-to-hero/sw.js',{scope:'/websocket-design-from-zero-to-hero/'}).catch(function(){})})}" },
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
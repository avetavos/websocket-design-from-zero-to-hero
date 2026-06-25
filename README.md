# WebSocket Design — From Zero to Hero

A bilingual (EN/TH), standalone, beginner→advanced course on **designing real-time systems with WebSockets**, taught with **TypeScript**. From the upgrade handshake & the client API through message design, the connection lifecycle (heartbeats/reconnection), server design, scaling & pub/sub, security, and patterns/alternatives + a working `ws` implementation. **WebSockets run in the browser** — client demos use a faithful in-page echo socket with the real `WebSocket` API, and full Node `ws` servers open in StackBlitz. Diagrams are **Mermaid**, and there's a **read-mode** toggle.

All content is original.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Hands-on | **`<NodeRunner>`** runs JS in a sandboxed iframe with console capture. Client demos use a small in-page echo socket with the **same API** as the browser's `WebSocket` (`onopen`/`onmessage`/`send`/`close`/`readyState`) so they run anywhere. `node` mode opens a runnable Node **`ws`** server in StackBlitz (`node-runner.ts` builds the project; lesson `code` is the body of the `wss.on('connection', (ws, req) => { … })` handler). |
| Diagrams | Client-side, theme-aware **Mermaid** (`<Mermaid>` + `public/enhance.js`) |
| Reading | **Read-mode** toggle (hides sidebar/TOC, widens content) via `public/enhance.js` |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

## Content Structure

```
src/content/docs/
  en/                              # English — served at /en/...
    websocket-foundations/         # what WebSockets are, the handshake, frames
    the-client-api/                # new WebSocket, events & readyState, send/receive, binary
    message-design/                # framing, JSON vs binary, request/response, versioning
    connection-lifecycle/          # heartbeats, dead connections, reconnection, close codes
    server-design/                 # the ws library, connection state, rooms/broadcast, backpressure
    scaling-and-pubsub/            # why scaling is hard, pub/sub backplane, presence, sticky vs stateless
    security/                      # origin & handshake auth, authorization, rate limiting, TLS & DoS
    patterns-and-alternatives/     # pub/sub & rooms, RPC over WS, WS vs SSE vs WebTransport, building an app
    index.mdx                      # EN landing (splash)
  th/                              # Thai — served at /th/...
    (same module directories)
    index.mdx
```

## Components & Lesson Template

- **`NodeRunner.tsx`** `{ code, node? }` — sandboxed-iframe JS runner with console capture. Client demos define a small in-page echo socket inside the hoisted `export const ...Code` and use the real `WebSocket` API; `node` mode → a runnable Node `ws` StackBlitz project (`node-runner.ts`). Use `<NodeRunner code={...} />` (in-page) or `<NodeRunner node code={...} />` (real `ws` server, where `code` is the connection-handler body).
- **`Mermaid.astro`** `{ code, title }`, **`Callout.astro`** `{ title }`, **`Quiz.tsx`** `{ id, questions }` (0-based `answer`, field `q`), **`ProgressTracker.tsx`** `{ id }`.

Per-lesson order: frontmatter → imports → concept intro → prose (fenced `ts`/`http` + `<Mermaid>`) → `export const ...Code` + `<NodeRunner>` → `<Callout>` → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`.

> **⚠️ Authoring notes:**
> - **Runnable demos use an in-page echo socket** (real `WebSocket` API surface) so they run with no backend; a `node` demo runs a genuine `ws` server in StackBlitz. External public echo servers proved unreliable (`echo.websocket.events` was down), so the in-page socket is the durable choice.
> - **In `export const` snippets:** escape `${`→`\${` and nested backticks as `` \` ``; double-escape `\\n`. Prefer string concatenation over template interpolation in demo code to avoid escaping. Fenced blocks are literal; handshake headers go in ` ```http `.
> - **Never a bare `{...}`/`${...}` in prose** — JS objects / JSON message envelopes live in code spans / fenced blocks / `export const`. **Diagrams are Mermaid, not ASCII.**
> - **Internal links include the base path and matching locale** (`/websocket-design-from-zero-to-hero/en/...` on EN, `/th/...` on TH).
> - Use **current real-time practice** (the WS upgrade handshake, close codes, ping/pong heartbeats, backoff + jitter reconnection, rooms/broadcast, a pub/sub backplane, handshake auth, token-bucket rate limiting, WS vs SSE vs WebTransport, the `ws` library).

## Deployment

Fully static → `dist/`. Base path in `astro.config.mjs`: `site: 'https://avetavos.github.io'`, `base: '/websocket-design-from-zero-to-hero'`.

Deployed to GitHub Pages via **branch-source** (`gh-pages`): build `dist/`, add `.nojekyll`, push to `gh-pages`, set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/`**, then **request a Pages build** (`gh api -X POST repos/<owner>/<repo>/pages/builds`) — flipping the source alone does not trigger one. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.

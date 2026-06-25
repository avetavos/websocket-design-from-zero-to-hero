export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre><script>(async function(){' +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'try{\n' + safe + '\n}catch(e){w("Error: "+((e&&e.message)||e));}' +
    '})();</script></body></html>'
  );
}

// Convention for how lesson `code` slots into the StackBlitz project:
// The lesson `code` is the BODY of the `connection` handler. It runs once per
// client connection with these identifiers already in scope:
//   - `ws`  : the connected WebSocket (this client's socket)
//   - `wss` : the WebSocketServer instance (for broadcast / wss.clients)
//   - `req` : the upgrade HTTP request
// So a lesson typically does `ws.on('message', ...)`, `ws.send(...)`, etc.
// `server.ts` owns the WebSocketServer boilerplate and mounts the lesson code;
// `client.ts` connects, sends a message, and logs whatever comes back.
export function buildNodeProject(code: string): StackBlitzProject {
  const serverTs =
    `import { WebSocketServer, WebSocket } from 'ws';\n` +
    `import type { IncomingMessage } from 'node:http';\n\n` +
    `const PORT = Number(process.env.PORT) || 8080;\n` +
    `const wss = new WebSocketServer({ port: PORT });\n\n` +
    `wss.on('listening', () => console.log(\`WebSocket server listening on ws://localhost:\${PORT}\`));\n\n` +
    `wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {\n` +
    `  console.log('client connected');\n` +
    `  // --- lesson code (body of the connection handler; ws, wss, req in scope) ---\n` +
    indent(code, '  ') + `\n` +
    `  // --- end lesson code ---\n` +
    `});\n`;

  const clientTs =
    `import { WebSocket } from 'ws';\n\n` +
    `const url = process.env.WS_URL || 'ws://localhost:8080';\n` +
    `const ws = new WebSocket(url);\n\n` +
    `ws.on('open', () => {\n` +
    `  console.log('connected to', url);\n` +
    `  ws.send('hello from client');\n` +
    `});\n` +
    `ws.on('message', (data) => console.log('received:', data.toString()));\n` +
    `ws.on('close', () => console.log('connection closed'));\n` +
    `ws.on('error', (err) => console.error('client error:', err.message));\n`;

  const readme =
    `# WebSocket \`ws\` server starter\n\n` +
    `\`\`\`bash\nnpm install\nnpm start        # runs the server (server.ts)\nnpm run client   # in a second terminal: connects & sends a message\n\`\`\`\n\n` +
    `The lesson code is the body of the \`wss.on('connection', (ws, req) => { ... })\`\n` +
    `handler in \`server.ts\`. \`ws\`, \`wss\`, and \`req\` are in scope.\n`;

  return {
    title: 'WebSocket ws server',
    description: 'WebSocket Design — From Zero to Hero — runnable ws server starter',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'ws-server-starter',
          type: 'module',
          scripts: {
            start: 'tsx server.ts',
            client: 'tsx client.ts',
          },
          dependencies: { ws: '^8.18.0' },
          devDependencies: { '@types/ws': '^8.5.13', tsx: '^4.19.2' },
        },
        null, 2,
      ),
      'server.ts': serverTs,
      'client.ts': clientTs,
      'README.md': readme,
    },
  };
}

function indent(text: string, pad: string): string {
  return text
    .split('\n')
    .map((line) => (line.length ? pad + line : line))
    .join('\n');
}

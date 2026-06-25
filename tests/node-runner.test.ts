import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildNodeProject } from '../src/components/node-runner';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
});

describe('buildNodeProject', () => {
  it('builds a ws server starter mounting the lesson code in the connection handler', () => {
    const p = buildNodeProject("ws.send('pong');");
    expect(p.template).toBe('node');
    // lesson code is embedded inside server.ts's connection handler
    expect(p.files['server.ts']).toContain("ws.send('pong');");
    expect(p.files['server.ts']).toContain('WebSocketServer');
    expect(p.files['server.ts']).toContain("wss.on('connection'");
    // package.json wires up ws + @types/ws + a tsx start script
    expect(p.files['package.json']).toContain('"type": "module"');
    expect(p.files['package.json']).toContain('"ws"');
    expect(p.files['package.json']).toContain('@types/ws');
    expect(p.files['package.json']).toContain('tsx server.ts');
    // a client is provided to connect, send, and log
    expect(p.files['client.ts']).toContain('new WebSocket');
  });
});

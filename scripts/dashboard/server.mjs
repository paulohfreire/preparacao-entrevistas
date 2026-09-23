import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { execFile } from 'node:child_process';

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const dashboardDir = join(root, 'dashboard');
const dataPath = join(root, 'candidaturas', 'status.json');
const port = Number(process.env.DASHBOARD_PORT || 4173);

await import('./build-data.mjs');

const send = (response, status, type, body) => {
  response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  response.end(body);
};

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
    if (pathname === '/data/status.json') {
      return send(response, 200, 'application/json; charset=utf-8', await readFile(dataPath));
    }
    if (pathname === '/' || pathname === '/index.html') {
      return send(response, 200, 'text/html; charset=utf-8', await readFile(join(dashboardDir, 'index.html')));
    }
    if (pathname === '/app.js') {
      return send(response, 200, 'text/javascript; charset=utf-8', await readFile(join(dashboardDir, 'app.js')));
    }
    if (pathname === '/styles.css') {
      return send(response, 200, 'text/css; charset=utf-8', await readFile(join(dashboardDir, 'styles.css')));
    }
    return send(response, 404, 'text/plain; charset=utf-8', 'Not found');
  } catch (error) {
    return send(response, 500, 'text/plain; charset=utf-8', error.message);
  }
});

server.listen(port, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${port}`;
  console.log(`Dashboard disponível em ${url}`);
  if (process.platform === 'win32') spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
  else if (process.platform === 'darwin') execFile('open', [url]);
  else execFile('xdg-open', [url], { windowsHide: true }, () => {});
});

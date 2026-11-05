// SPDX-License-Identifier: Apache-2.0
// Minimal static server for ui/dist (fetching the .wasm needs http://, not file://).
//   node scripts/serve.mjs [port]      default port 8791
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".wasm": "application/wasm",
  ".map": "application/json",
};

export const serve = (port = 0) =>
  new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
      const rel = normalize(path === "/" ? "/index.html" : path).replace(/^([/\\])+/, "");
      if (rel.startsWith("..")) {
        res.writeHead(403).end();
        return;
      }
      try {
        const body = await readFile(join(dist, rel));
        res.writeHead(200, { "content-type": TYPES[extname(rel)] ?? "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    server.listen(port, "127.0.0.1", () => resolve(server));
  });

const self = fileURLToPath(import.meta.url).toLowerCase();
if (process.argv[1] && resolve(process.argv[1]).toLowerCase() === self) {
  const server = await serve(Number(process.argv[2] ?? 8791));
  console.log(`serving ${dist} at http://127.0.0.1:${server.address().port}/`);
}

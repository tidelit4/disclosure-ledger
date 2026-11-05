// SPDX-License-Identifier: Apache-2.0
// Browser smoke test: serve ui/dist, open it in headless Chrome/Chromium/Edge
// with ?selftest=1 and check the page's own verdict. The page runs the whole
// story plus the attack attempts through the compiled contract (WebAssembly
// runtime) and writes <body data-selftest="pass"> only if every assert holds.
//
// The browser is found via $CHROME_PATH, then common install locations.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { serve } from "./serve.mjs";

const candidates = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("no Chrome/Chromium/Edge found; set CHROME_PATH");
  process.exit(1);
}

const server = await serve(0);
const url = `http://127.0.0.1:${server.address().port}/?selftest=1`;
console.log(`browser: ${browser}\nopening ${url}`);

// The browser must run asynchronously: the static server lives in this process.
const profile = mkdtempSync(join(tmpdir(), "dl-smoke-"));
const r = await new Promise((resolve) => {
  const child = spawn(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      "--virtual-time-budget=30000",
      "--dump-dom",
      url,
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (d) => (stdout += d));
  child.stderr.on("data", (d) => (stderr += d));
  const timer = setTimeout(() => child.kill(), 120_000);
  child.on("close", () => {
    clearTimeout(timer);
    resolve({ stdout, stderr });
  });
});
server.close();
rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });

const dom = r.stdout ?? "";
const verdict = /data-selftest="([^"]*)"/.exec(dom)?.[1];
const entries = (dom.match(/<tr class="[^"]*">\s*<td>#\d+<\/td>/g) ?? []).length;
console.log(`selftest verdict: ${verdict ?? "(none)"}; ledger rows rendered: ${entries}`);
const log = [...dom.matchAll(/<li class="(ok|bad)">([\s\S]*?)<\/li>/g)]
  .map((m) => `  [${m[1]}] ${m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()}`)
  .reverse();
if (log.length) console.log(`circuit calls made in the page:\n${log.join("\n")}`);
if (verdict !== "pass") {
  console.error(r.stderr?.slice(-4000));
  console.error("UI smoke test FAILED");
  process.exit(1);
}
console.log("UI smoke test passed");

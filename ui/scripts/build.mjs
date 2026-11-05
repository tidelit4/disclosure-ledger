// SPDX-License-Identifier: Apache-2.0
// Bundle the browser demo into ui/dist: index.html, app.js, and the Midnight
// onchain-runtime WebAssembly module that @midnight-ntwrk/compact-runtime uses.
//
// The runtime's own "browser" entry imports the .wasm file as an ES module
// (wasm-bindgen bundler target). esbuild cannot do that natively, so a tiny
// plugin replaces the entry with a loader that fetches the .wasm next to
// app.js and instantiates it against the package's own JS glue. That is the
// same thing the package's Node entry does with readFileSync.
import { build } from "esbuild";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ui = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(ui, "dist");

const findPackage = (name) => {
  for (let dir = ui; ; dir = dirname(dir)) {
    const candidate = join(dir, "node_modules", ...name.split("/"));
    if (existsSync(candidate)) return candidate;
    if (dirname(dir) === dir) throw new Error(`cannot find ${name} in node_modules`);
  }
};

const runtimeDir = findPackage("@midnight-ntwrk/onchain-runtime-v3");
const glue = join(runtimeDir, "midnight_onchain_runtime_wasm_bg.js").replaceAll("\\", "/");
const WASM_NAME = "onchain_runtime_bg.wasm";

const onchainRuntimeBrowser = {
  name: "onchain-runtime-browser",
  setup(b) {
    b.onResolve({ filter: /^@midnight-ntwrk\/onchain-runtime-v3$/ }, () => ({
      path: "onchain-runtime-v3",
      namespace: "onchain-runtime",
    }));
    b.onLoad({ filter: /.*/, namespace: "onchain-runtime" }, () => ({
      loader: "js",
      resolveDir: runtimeDir,
      contents: `
import * as glue from ${JSON.stringify(glue)};
export * from ${JSON.stringify(glue)};
const response = await fetch(new URL(${JSON.stringify("./" + WASM_NAME)}, import.meta.url));
if (!response.ok) throw new Error("could not load ${WASM_NAME}: HTTP " + response.status);
const { instance } = await WebAssembly.instantiate(await response.arrayBuffer(), {
  "./midnight_onchain_runtime_wasm_bg.js": glue,
});
glue.__wbg_set_wasm(instance.exports);
instance.exports.__wbindgen_start();
`,
    }));
  },
};

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const result = await build({
  entryPoints: [join(ui, "src", "main.ts")],
  outfile: join(dist, "app.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  sourcemap: true,
  minify: false,
  metafile: true,
  logLevel: "info",
  plugins: [onchainRuntimeBrowser],
});

copyFileSync(join(runtimeDir, "midnight_onchain_runtime_wasm_bg.wasm"), join(dist, WASM_NAME));
copyFileSync(join(ui, "index.html"), join(dist, "index.html"));
copyFileSync(join(ui, "src", "style.css"), join(dist, "style.css"));

const inputs = Object.keys(result.metafile.inputs);
const compiled = inputs.filter((p) => p.includes("managed/disclosure-ledger/contract"));
if (compiled.length === 0) {
  throw new Error("bundle does not contain the compiled contract (contract/dist/managed)");
}
console.log(`bundled ${inputs.length} modules, including the compiled contract:`);
for (const p of compiled) console.log(`  ${p}`);
console.log(`wrote ${dist}`);

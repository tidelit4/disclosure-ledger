// SPDX-License-Identifier: Apache-2.0
// Cross-platform build: compile TypeScript, then ship the compiler output
// (JS bindings, ZK keys, ZKIR) and the contract source next to it.
import { execSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const managed = join(root, "src", "managed");
if (!existsSync(managed)) {
  console.error("src/managed is missing: run `npm run compact` first");
  process.exit(1);
}
rmSync(join(root, "dist"), { recursive: true, force: true });
execSync("npx tsc -p tsconfig.build.json", { cwd: root, stdio: "inherit" });
cpSync(managed, join(root, "dist", "managed"), { recursive: true });
cpSync(
  join(root, "src", "disclosure-ledger.compact"),
  join(root, "dist", "disclosure-ledger.compact"),
);
console.log("built contract package into dist/");

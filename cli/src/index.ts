#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/*
 * disclosure-ledger CLI
 *
 *   demo                       walk through the full researcher/vendor story
 *                              against the contract running in the simulator
 *   digest <file>              sha256 of a report file (what gets committed)
 *   commitment <digest> <salt> the public commitment for a private opening
 */

import { readFileSync } from "node:fs";
import {
  DisclosureLedgerSimulator,
  Status,
  commitmentOf,
  earliestCommitment,
  fromHex,
  prepareReport,
  sha256,
  toHex,
  verifyOpening,
} from "@disclosure-ledger/contract";

const short = (b: Uint8Array): string => `${toHex(b).slice(0, 16)}…`;
const when = (s: bigint): string => new Date(Number(s) * 1000).toISOString();
const step = (n: number, text: string): void => console.log(`\n[${n}] ${text}`);

async function demo(): Promise<void> {
  const t0 = BigInt(Math.floor(Date.now() / 1000));
  const sim = new DisclosureLedgerSimulator("alice", undefined, t0);

  const aliceReport = "Vault.withdraw() is re-entrant: balance is zeroed after the external call.";
  const bobReport = "Re-entrancy in Vault withdraw (independent finding).";

  step(1, "Alice finds a bug. Her DApp hashes the report and picks a random salt (private state).");
  const alice = await prepareReport(aliceReport);
  console.log(`    digest ${short(alice.digest)}  salt ${short(alice.salt)}   <- never leave her machine`);

  step(2, "Alice commits. The circuit proves the commitment was built from her private draft.");
  const ca = sim.stage(alice).commitReport(t0 + 600n);
  const ea = sim.getEntry(ca);
  console.log(`    public: commitment ${short(ca)}  owner ${short(ea.owner)}`);
  console.log(`            ordinal #${ea.ordinal}, on chain before ${when(ea.notAfter)}`);

  step(3, "An hour later Bob finds the same bug and commits his own (different) report.");
  sim.setBlockTime(t0 + 3_600n);
  const bob = await prepareReport(bobReport);
  const cb = sim.as("bob").stage(bob).commitReport(t0 + 3_600n + 600n);
  console.log(`    public: commitment ${short(cb)}  ordinal #${sim.getEntry(cb).ordinal}`);
  console.log("    observers cannot tell the two entries are about the same bug, or who made them");

  step(4, "Bob reports to the vendor first. Alice privately sends the vendor her report + salt.");
  const v = verifyOpening(sim.getLedger(), alice);
  if (!v.found) throw new Error("demo: Alice's opening not found");
  console.log(`    vendor recomputes the commitment locally -> found, ordinal #${v.ordinal},`);
  console.log(`    committed before ${when(v.notAfter)}. Nothing was written on chain.`);
  const first = earliestCommitment(sim.getLedger(), [bob, alice]);
  console.log(`    duplicate dispute: earliest = ${first === 1 ? "Alice" : "Bob"}`);

  step(5, "Alice proves on chain that her entry matches the digest the vendor published.");
  sim.as("alice").setBlockTime(t0 + 86_400n);
  sim.proveMatch(ca, await sha256(aliceReport));
  console.log(`    entry #${sim.getEntry(ca).ordinal} status=${Status[sim.getEntry(ca).status]}, digest ${short(sim.getEntry(ca).digest)}`);
  console.log("    the salt stays private; the report text never touches the chain");

  step(6, "Bob tries to tamper with Alice's entry.");
  try {
    sim.as("bob").markResolved(ca);
  } catch (e) {
    console.log(`    rejected: ${(e as Error).message}`);
  }

  step(7, "The vendor ships a fix and pays Alice; she closes her entry.");
  sim.as("alice").markResolved(ca);
  console.log(`    entry #${sim.getEntry(ca).ordinal} status=${Status[sim.getEntry(ca).status]}`);

  console.log(`\nLedger: ${sim.getLedger().entryCount} entries. Demo complete.`);
}

async function main(argv: string[]): Promise<void> {
  const [cmd, ...args] = argv;
  switch (cmd) {
    case "demo":
      return demo();
    case "digest": {
      if (!args[0]) throw new Error("usage: digest <file>");
      console.log(toHex(await sha256(new Uint8Array(readFileSync(args[0])))));
      return;
    }
    case "commitment": {
      if (args.length !== 2) throw new Error("usage: commitment <digestHex> <saltHex>");
      console.log(toHex(commitmentOf({ digest: fromHex(args[0]), salt: fromHex(args[1]) })));
      return;
    }
    default:
      console.log("usage: disclosure-ledger <demo | digest <file> | commitment <digest> <salt>>");
      process.exitCode = cmd ? 1 : 0;
  }
}

main(process.argv.slice(2)).catch((e: unknown) => {
  console.error((e as Error).message);
  process.exit(1);
});

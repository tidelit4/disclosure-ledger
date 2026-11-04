// SPDX-License-Identifier: Apache-2.0
import { describe, it, expect, beforeEach } from "vitest";
import { DisclosureLedgerSimulator } from "../simulator.js";
import { Status } from "../managed/disclosure-ledger/contract/index.js";
import {
  commitmentOf,
  earliestCommitment,
  prepareReport,
  sha256,
  verifyOpening,
} from "../report.js";
import { bytesEqual, fromHex, isZero, randomBytes, toHex } from "../bytes.js";

const T0 = 1_790_000_000n; // a fixed block time (UNIX seconds)
const WINDOW = 600n; // researcher asks for inclusion within 10 minutes

const REPORT_A = `# Reentrancy in Vault.withdraw()
withdraw() sends ETH before zeroing balances[msg.sender]; a malicious receiver
re-enters and drains the vault. PoC attached.`;
const REPORT_B = `Vault withdraw can be re-entered (found independently).`;

describe("Disclosure Ledger: commitReport", () => {
  let sim: DisclosureLedgerSimulator;
  beforeEach(() => {
    sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
  });

  it("starts with an empty public ledger", () => {
    const state = sim.getLedger();
    expect(state.entryCount).toEqual(0n);
    expect(state.entries.isEmpty()).toBe(true);
    expect(sim.getPrivateState().draft).toBeNull();
  });

  it("generates the same initial ledger for the same key", () => {
    const key = randomBytes(32);
    const a = new DisclosureLedgerSimulator("a", key, T0).getLedger();
    const b = new DisclosureLedgerSimulator("b", key, T0).getLedger();
    expect(a.entryCount).toEqual(b.entryCount);
    expect(a.entries.size()).toEqual(b.entries.size());
  });

  it("publishes only the commitment, owner key, ordinal and deadline", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);

    const state = sim.getLedger();
    expect(state.entryCount).toEqual(1n);
    expect(state.entries.size()).toEqual(1n);
    expect(state.entries.member(c)).toBe(true);

    const entry = sim.getEntry(c);
    expect(entry.ordinal).toEqual(1n);
    expect(entry.notAfter).toEqual(T0 + WINDOW);
    expect(entry.status).toEqual(Status.committed);
    expect(isZero(entry.digest)).toBe(true);
    expect(entry.owner).toEqual(sim.ownerKey(c));

    // Neither the report digest, the salt nor the secret key is on the ledger.
    const secrets = [opening.digest, opening.salt, sim.getPrivateState().secretKey];
    for (const [key, value] of state.entries) {
      for (const field of [key, value.owner, value.digest]) {
        for (const secret of secrets) expect(bytesEqual(field, secret)).toBe(false);
      }
    }
  });

  it("computes the same commitment in the circuit and in TypeScript", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);
    expect(c).toEqual(commitmentOf(opening));
  });

  it("moves the draft into private state under its commitment", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);
    const ps = sim.getPrivateState();
    expect(ps.draft).toBeNull();
    expect(ps.reports[toHex(c)]).toEqual(opening);
  });

  it("refuses a deadline that is not in the future", async () => {
    sim.stage(await prepareReport(REPORT_A));
    expect(() => sim.commitReport(T0)).toThrow("failed assert: Deadline has already passed");
    expect(() => sim.commitReport(T0 - 1n)).toThrow("Deadline has already passed");
    // the failed attempts left the draft staged and the ledger untouched
    expect(sim.getPrivateState().draft).not.toBeNull();
    expect(sim.getLedger().entryCount).toEqual(0n);
    // one second of slack is enough
    sim.commitReport(T0 + 1n);
    expect(sim.getLedger().entryCount).toEqual(1n);
  });

  it("refuses to commit the same report twice, even from another researcher", async () => {
    const opening = await prepareReport(REPORT_A);
    sim.stage(opening).commitReport(T0 + WINDOW);
    sim.as("mallory").stage(opening);
    expect(() => sim.commitReport(T0 + WINDOW)).toThrow(
      "failed assert: This report is already committed",
    );
  });

  it("fails cleanly when nothing is staged", () => {
    expect(() => sim.commitReport(T0 + WINDOW)).toThrow("No draft report in private state");
  });

  it("orders commitments globally and gives every entry an unlinkable owner key", async () => {
    const a1 = sim.stage(await prepareReport(REPORT_A)).commitReport(T0 + WINDOW);
    const a2 = sim.stage(await prepareReport("second report")).commitReport(T0 + WINDOW);
    const b1 = sim.as("bob").stage(await prepareReport(REPORT_B)).commitReport(T0 + WINDOW);

    expect(sim.getEntry(a1).ordinal).toEqual(1n);
    expect(sim.getEntry(a2).ordinal).toEqual(2n);
    expect(sim.getEntry(b1).ordinal).toEqual(3n);
    // the same researcher's two entries do not share an owner key
    expect(sim.getEntry(a1).owner).not.toEqual(sim.getEntry(a2).owner);
  });
});

describe("Disclosure Ledger: selective disclosure", () => {
  let sim: DisclosureLedgerSimulator;
  beforeEach(() => {
    sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
  });

  it("lets the owner prove the commitment matches the vendor's digest", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);
    const before = sim.getPrivateState();

    const vendorDigest = await sha256(REPORT_A); // what the vendor computes from the report it holds
    sim.setBlockTime(T0 + 86_400n);
    sim.proveMatch(c, vendorDigest);

    const entry = sim.getEntry(c);
    expect(entry.status).toEqual(Status.disclosed);
    expect(entry.digest).toEqual(vendorDigest);
    // the original timestamp and ordinal are preserved
    expect(entry.notAfter).toEqual(T0 + WINDOW);
    expect(entry.ordinal).toEqual(1n);
    // the salt is still private and private state did not change
    expect(sim.getPrivateState()).toEqual(before);
  });

  it("rejects a vendor digest for a different report", async () => {
    const c = sim.stage(await prepareReport(REPORT_A)).commitReport(T0 + WINDOW);
    const digest1 = await sha256(REPORT_B);
    expect(() => sim.proveMatch(c, digest1)).toThrow(
      "failed assert: Committed report does not match the vendor-supplied digest",
    );
    expect(sim.getEntry(c).status).toEqual(Status.committed);
  });

  it("rejects disclosure by anyone but the owner, even one who knows the opening", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);
    // mallory obtained the report and salt and plants them in her own private state
    sim.as("mallory");
    sim.setPrivateState({
      ...sim.getPrivateState(),
      reports: { [toHex(c)]: opening },
    });
    const digest2 = await sha256(REPORT_A);
    expect(() => sim.proveMatch(c, digest2)).toThrow(
      "failed assert: Only the researcher who committed this report can change it",
    );
  });

  it("rejects a tampered private opening", async () => {
    const opening = await prepareReport(REPORT_A);
    const c = sim.stage(opening).commitReport(T0 + WINDOW);
    const forged = { digest: await sha256(REPORT_B), salt: opening.salt };
    sim.setPrivateState({
      ...sim.getPrivateState(),
      reports: { [toHex(c)]: forged },
    });
    expect(() => sim.proveMatch(c, forged.digest)).toThrow(
      "failed assert: Private opening does not match the commitment",
    );
  });

  it("rejects an unknown commitment", async () => {
    expect(() => sim.proveMatch(randomBytes(32), randomBytes(32))).toThrow(
      "failed assert: Unknown commitment",
    );
  });

  it("only allows one disclosure per entry", async () => {
    const c = sim.stage(await prepareReport(REPORT_A)).commitReport(T0 + WINDOW);
    const d = await sha256(REPORT_A);
    sim.proveMatch(c, d);
    expect(() => sim.proveMatch(c, d)).toThrow(
      "failed assert: Report is not in the committed state",
    );
  });
});

describe("Disclosure Ledger: lifecycle", () => {
  let sim: DisclosureLedgerSimulator;
  let c: Uint8Array;
  beforeEach(async () => {
    sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
    c = sim.stage(await prepareReport(REPORT_A)).commitReport(T0 + WINDOW);
  });

  it("resolves a disclosed report and keeps its digest", async () => {
    const d = await sha256(REPORT_A);
    sim.proveMatch(c, d);
    sim.markResolved(c);
    expect(sim.getEntry(c).status).toEqual(Status.resolved);
    expect(sim.getEntry(c).digest).toEqual(d);
  });

  it("cannot resolve a report that was never disclosed", () => {
    expect(() => sim.markResolved(c)).toThrow(
      "failed assert: Only a disclosed report can be resolved",
    );
  });

  it("does not let another researcher resolve or withdraw", async () => {
    sim.proveMatch(c, await sha256(REPORT_A));
    sim.as("bob");
    expect(() => sim.markResolved(c)).toThrow("Only the researcher who committed");
    expect(() => sim.withdraw(c)).toThrow("Only the researcher who committed");
  });

  it("withdraws a committed report, which then cannot be disclosed", async () => {
    sim.withdraw(c);
    expect(sim.getEntry(c).status).toEqual(Status.withdrawn);
    const digest3 = await sha256(REPORT_A);
    expect(() => sim.proveMatch(c, digest3)).toThrow(
      "Report is not in the committed state",
    );
    expect(() => sim.withdraw(c)).toThrow("Only a committed report can be withdrawn");
  });
});

describe("Disclosure Ledger: vendor verification (off-chain, private)", () => {
  it("confirms a researcher's opening and the time bound", async () => {
    const sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
    const opening = await prepareReport(REPORT_A);
    sim.stage(opening).commitReport(T0 + WINDOW);

    const v = verifyOpening(sim.getLedger(), opening);
    expect(v.found).toBe(true);
    if (!v.found) return;
    expect(v.ordinal).toEqual(1n);
    expect(v.notAfter).toEqual(T0 + WINDOW);
    expect(v.status).toEqual(Status.committed);
    expect(v.publicDigest).toBeNull();

    sim.proveMatch(v.commitment, opening.digest);
    const after = verifyOpening(sim.getLedger(), opening);
    expect(after.found && after.publicDigest).toEqual(opening.digest);
  });

  it("does not find an opening with the wrong salt or report", async () => {
    const sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
    const opening = await prepareReport(REPORT_A);
    sim.stage(opening).commitReport(T0 + WINDOW);
    expect(verifyOpening(sim.getLedger(), { ...opening, salt: randomBytes(32) }).found).toBe(false);
    expect(
      verifyOpening(sim.getLedger(), { ...opening, digest: await sha256(REPORT_B) }).found,
    ).toBe(false);
  });

  it("settles a duplicate dispute by ordinal", async () => {
    const sim = new DisclosureLedgerSimulator("alice", randomBytes(32), T0);
    const alice = await prepareReport(REPORT_A);
    const bob = await prepareReport(REPORT_B);
    const ca = sim.stage(alice).commitReport(T0 + WINDOW);
    sim.setBlockTime(T0 + 3_600n);
    sim.as("bob").stage(bob).commitReport(T0 + 3_600n + WINDOW);
    const stranger = await prepareReport("never committed");

    // The vendor holds both openings; Bob submitted to the vendor first, but Alice committed first.
    expect(earliestCommitment(sim.getLedger(), [bob, alice, stranger])).toEqual(1);
    expect(earliestCommitment(sim.getLedger(), [stranger])).toEqual(-1);

    // A withdrawn commitment does not count.
    sim.as("alice").withdraw(ca);
    expect(earliestCommitment(sim.getLedger(), [bob, alice])).toEqual(0);
  });
});

describe("helpers", () => {
  it("sha256 matches the standard test vector", async () => {
    expect(toHex(await sha256("abc"))).toEqual(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("hex round-trips", () => {
    const b = randomBytes(32);
    expect(fromHex(toHex(b))).toEqual(b);
    expect(fromHex("0x00ff")).toEqual(new Uint8Array([0, 255]));
    expect(() => fromHex("abc")).toThrow("Not a hex string");
  });
});

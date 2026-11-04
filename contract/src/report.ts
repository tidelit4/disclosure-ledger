// SPDX-License-Identifier: Apache-2.0
/*
 * Off-chain helpers shared by researchers and vendors.
 *
 * The report digest is plain SHA-256 of the report bytes, so a vendor can
 * reproduce it with any standard tool (`sha256sum report.md`) without trusting
 * this code. The on-chain commitment is persistentCommit(digest, salt), computed
 * by the contract's own pure circuit so both sides hash identically.
 */

import {
  type Ledger,
  type ReportOpening,
  Status,
  pureCircuits,
} from "./managed/disclosure-ledger/contract/index.js";
import { isZero, randomBytes } from "./bytes.js";

export const sha256 = async (data: Uint8Array | string): Promise<Uint8Array> => {
  // Copy into a fresh ArrayBuffer-backed view (what WebCrypto's typings expect).
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  const hash = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return new Uint8Array(hash);
};

/** Turn a report into the private opening that will be committed. */
export const prepareReport = async (
  report: Uint8Array | string,
  salt: Uint8Array = randomBytes(32),
): Promise<ReportOpening> => ({ digest: await sha256(report), salt });

export const commitmentOf = (opening: ReportOpening): Uint8Array =>
  pureCircuits.reportCommitment(opening.digest, opening.salt);

export type Verification =
  | { found: false; commitment: Uint8Array }
  | {
      found: true;
      commitment: Uint8Array;
      ordinal: bigint;
      /** The commitment was on chain before this UNIX time (seconds). */
      notAfter: bigint;
      status: Status;
      /** Digest published on the ledger by proveMatch, if any. */
      publicDigest: Uint8Array | null;
    };

/**
 * Vendor-side, fully private check: given the opening a researcher sent them
 * (report + salt), recompute the commitment and read its public entry. Nothing
 * is written to the chain and no one else learns that the check happened.
 */
export const verifyOpening = (state: Ledger, opening: ReportOpening): Verification => {
  const commitment = commitmentOf(opening);
  if (!state.entries.member(commitment)) {
    return { found: false, commitment };
  }
  const entry = state.entries.lookup(commitment);
  return {
    found: true,
    commitment,
    ordinal: entry.ordinal,
    notAfter: entry.notAfter,
    status: entry.status,
    publicDigest: isZero(entry.digest) ? null : entry.digest,
  };
};

/**
 * Duplicate dispute: several researchers each hand the vendor an opening for
 * what turns out to be the same bug. Returns the index of the earliest valid,
 * non-withdrawn commitment (lowest ordinal), or -1 if none is on the ledger.
 */
export const earliestCommitment = (state: Ledger, openings: ReportOpening[]): number => {
  let best = -1;
  let bestOrdinal = 0n;
  openings.forEach((opening, i) => {
    const v = verifyOpening(state, opening);
    if (!v.found || v.status === Status.withdrawn) return;
    if (best === -1 || v.ordinal < bestOrdinal) {
      best = i;
      bestOrdinal = v.ordinal;
    }
  });
  return best;
};

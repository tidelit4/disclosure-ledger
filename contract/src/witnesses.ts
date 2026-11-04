// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

/*
 * Private state and witnesses for the Disclosure Ledger contract.
 *
 * Everything in DisclosurePrivateState stays on the researcher's machine
 * (in a Midnight DApp it lives in the private state provider, never on chain).
 * The contract reads it only through the three witnesses below, and the
 * zero-knowledge proof shows the values were used correctly without revealing
 * them.
 */

import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import {
  type Ledger,
  type ReportOpening,
  pureCircuits,
} from "./managed/disclosure-ledger/contract/index.js";
import { toHex } from "./bytes.js";

export type DisclosurePrivateState = {
  /** Long-term secret key. Ownership of every entry is derived from it. */
  readonly secretKey: Uint8Array;
  /** The report about to be committed: set by the DApp, consumed by commitReport. */
  readonly draft: ReportOpening | null;
  /** Openings of reports already committed, keyed by hex commitment. */
  readonly reports: Readonly<Record<string, ReportOpening>>;
};

export const createPrivateState = (
  secretKey: Uint8Array,
): DisclosurePrivateState => ({
  secretKey,
  draft: null,
  reports: {},
});

/** Stage a report (digest + salt) so the next commitReport call commits it. */
export const withDraft = (
  state: DisclosurePrivateState,
  draft: ReportOpening,
): DisclosurePrivateState => ({ ...state, draft });

type Ctx = WitnessContext<Ledger, DisclosurePrivateState>;

export const witnesses = {
  localSecretKey: ({ privateState }: Ctx): [DisclosurePrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  /*
   * Hands the staged draft to the circuit and, in the same step, files its
   * opening under the commitment it is about to produce. The new private state
   * is only kept if the transaction succeeds, so a failed commit leaves the
   * draft in place.
   */
  draftReport: ({ privateState }: Ctx): [DisclosurePrivateState, ReportOpening] => {
    const draft = privateState.draft;
    if (draft === null) {
      throw new Error("No draft report in private state: stage one with withDraft()");
    }
    const commitment = toHex(pureCircuits.reportCommitment(draft.digest, draft.salt));
    return [
      {
        ...privateState,
        draft: null,
        reports: { ...privateState.reports, [commitment]: draft },
      },
      draft,
    ];
  },

  reportOpening: (
    { privateState }: Ctx,
    commitment: Uint8Array,
  ): [DisclosurePrivateState, ReportOpening] => {
    const opening = privateState.reports[toHex(commitment)];
    if (opening === undefined) {
      throw new Error(`No private opening for commitment ${toHex(commitment)}`);
    }
    return [privateState, opening];
  },
};

// SPDX-License-Identifier: Apache-2.0
/*
 * In-process simulator for the Disclosure Ledger contract.
 *
 * It runs the compiled circuits with @midnight-ntwrk/compact-runtime exactly as
 * a DApp would before proving, but keeps the public ledger state in memory, so
 * tests and the CLI demo need no node, indexer or proof server. Several
 * researchers can share one ledger: each has their own private state, and
 * `as(name)` switches who is signing.
 */

import {
  type CircuitContext,
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Entry,
  type Ledger,
  type ReportOpening,
  ledger,
} from "./managed/disclosure-ledger/contract/index.js";
import {
  type DisclosurePrivateState,
  createPrivateState,
  withDraft,
  witnesses,
} from "./witnesses.js";
import { randomBytes } from "./bytes.js";

const nowSeconds = (): bigint => BigInt(Math.floor(Date.now() / 1000));

export class DisclosureLedgerSimulator {
  readonly contract: Contract<DisclosurePrivateState>;
  circuitContext: CircuitContext<DisclosurePrivateState>;
  private readonly wallets = new Map<string, DisclosurePrivateState>();
  private currentUser: string;

  constructor(
    user = "alice",
    secretKey: Uint8Array = randomBytes(32),
    blockTime: bigint = nowSeconds(),
  ) {
    this.contract = new Contract<DisclosurePrivateState>(witnesses);
    const { currentPrivateState, currentContractState, currentZswapLocalState } =
      this.contract.initialState(
        createConstructorContext(createPrivateState(secretKey), "0".repeat(64)),
      );
    this.circuitContext = createCircuitContext(
      sampleContractAddress(),
      currentZswapLocalState,
      currentContractState,
      currentPrivateState,
    );
    this.currentUser = user;
    this.setBlockTime(blockTime);
  }

  // ---- users and private state -------------------------------------------

  get user(): string {
    return this.currentUser;
  }

  /** Switch to another researcher, creating their private state on first use. */
  as(user: string, secretKey?: Uint8Array): this {
    if (user === this.currentUser) return this;
    this.wallets.set(this.currentUser, this.circuitContext.currentPrivateState);
    const next =
      this.wallets.get(user) ?? createPrivateState(secretKey ?? randomBytes(32));
    this.circuitContext = { ...this.circuitContext, currentPrivateState: next };
    this.currentUser = user;
    return this;
  }

  getPrivateState(): DisclosurePrivateState {
    return this.circuitContext.currentPrivateState;
  }

  /** Replace the current user's private state (tests use it to simulate tampering). */
  setPrivateState(state: DisclosurePrivateState): this {
    this.circuitContext = { ...this.circuitContext, currentPrivateState: state };
    return this;
  }

  /** Stage a report in the current user's private state. */
  stage(opening: ReportOpening): this {
    this.circuitContext = {
      ...this.circuitContext,
      currentPrivateState: withDraft(this.circuitContext.currentPrivateState, opening),
    };
    return this;
  }

  // ---- chain environment --------------------------------------------------

  /** Set the block time (UNIX seconds) that blockTimeLt() is checked against. */
  setBlockTime(seconds: bigint): this {
    const qc = this.circuitContext.currentQueryContext;
    qc.block = { ...qc.block, secondsSinceEpoch: seconds };
    return this;
  }

  getBlockTime(): bigint {
    return this.circuitContext.currentQueryContext.block.secondsSinceEpoch;
  }

  getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  getEntry(commitment: Uint8Array): Entry {
    return this.getLedger().entries.lookup(commitment);
  }

  // ---- circuits -----------------------------------------------------------

  commitReport(notAfter: bigint): Uint8Array {
    const time = this.getBlockTime();
    const { result, context } = this.contract.impureCircuits.commitReport(
      this.circuitContext,
      notAfter,
    );
    this.circuitContext = context;
    this.setBlockTime(time);
    return result;
  }

  proveMatch(commitment: Uint8Array, vendorDigest: Uint8Array): Ledger {
    return this.run((ctx) =>
      this.contract.impureCircuits.proveMatch(ctx, commitment, vendorDigest).context,
    );
  }

  markResolved(commitment: Uint8Array): Ledger {
    return this.run((ctx) =>
      this.contract.impureCircuits.markResolved(ctx, commitment).context,
    );
  }

  withdraw(commitment: Uint8Array): Ledger {
    return this.run((ctx) => this.contract.impureCircuits.withdraw(ctx, commitment).context);
  }

  ownerKey(commitment: Uint8Array): Uint8Array {
    return this.contract.circuits.ownerKey(
      this.circuitContext,
      this.getPrivateState().secretKey,
      commitment,
    ).result;
  }

  private run(
    step: (ctx: CircuitContext<DisclosurePrivateState>) => CircuitContext<DisclosurePrivateState>,
  ): Ledger {
    const time = this.getBlockTime();
    this.circuitContext = step(this.circuitContext);
    this.setBlockTime(time);
    return this.getLedger();
  }
}

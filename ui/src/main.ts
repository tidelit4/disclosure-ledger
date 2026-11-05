// SPDX-License-Identifier: Apache-2.0
/*
 * Browser demo for the Disclosure Ledger.
 *
 * Every action below calls the compiled Compact circuits (contract/src/managed,
 * produced by `compact compile`) through @midnight-ntwrk/compact-runtime, using
 * the same DisclosureLedgerSimulator as the test suite and the CLI. The ledger
 * lives in memory in this tab. No proofs are generated and nothing leaves the
 * page: a deployed DApp would hand the same circuit call to a proof server and
 * submit the resulting transaction through a wallet.
 *
 * URL parameters (used by CI and for recording the demo video):
 *   ?run=N           perform the first N story steps on load
 *   ?play=a,b,c      perform these action ids on load, in order
 *   ?selftest=1      run the whole story plus the attack attempts and assert
 *                    the outcomes; the result is written to <body data-selftest>
 */

import {
  type DisclosurePrivateState,
  DisclosureLedgerSimulator,
  type Entry,
  type ReportOpening,
  Status,
  earliestCommitment,
  prepareReport,
  sha256,
  toHex,
  verifyOpening,
} from "@disclosure-ledger/contract";

// ---- helpers ----------------------------------------------------------------

const $ = (id: string): HTMLElement => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el;
};
const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const short = (b: Uint8Array, n = 12): string => `${toHex(b).slice(0, n)}…`;
const when = (s: bigint): string =>
  new Date(Number(s) * 1000).toISOString().replace("T", " ").replace(".000Z", "Z");
const statusName = (s: Status): string => Status[s] ?? String(s);

// ---- state --------------------------------------------------------------------

const DEFAULT_ALICE =
  "Vault.withdraw() is re-entrant: the balance is zeroed after the external call, " +
  "so a malicious receiver can withdraw repeatedly.";
const DEFAULT_BOB = "Re-entrancy in Vault withdraw (independent finding).";

type LogItem = { actor: string; call: string; ok: boolean; detail: string };

type AppState = {
  sim: DisclosureLedgerSimulator;
  t0: bigint;
  views: Record<string, DisclosurePrivateState>;
  alice?: ReportOpening;
  bob?: ReportOpening;
  aliceText: string;
  bobText: string;
  ca?: Uint8Array;
  cb?: Uint8Array;
  vendor?: {
    digest: Uint8Array;
    commitment: Uint8Array;
    found: boolean;
    ordinal?: bigint;
    notAfter?: bigint;
    status?: Status;
    earliest: string;
    entriesBefore: bigint;
    entriesAfter: bigint;
  };
  done: Set<string>;
  log: LogItem[];
  results: Record<string, LogItem>;
  highlight?: string;
  lastError?: string;
};

const fresh = (aliceText = DEFAULT_ALICE, bobText = DEFAULT_BOB): AppState => {
  const t0 = BigInt(Math.floor(Date.now() / 1000));
  const sim = new DisclosureLedgerSimulator("alice", undefined, t0);
  return {
    sim,
    t0,
    views: { alice: sim.getPrivateState() },
    aliceText,
    bobText,
    done: new Set(),
    log: [],
    results: {},
  };
};

let S: AppState = fresh();

const remember = (): void => {
  S.views[S.sim.user] = S.sim.getPrivateState();
};

/** Run one circuit call; record success or the circuit's assert message. */
const call = (actor: string, label: string, fn: () => string): boolean => {
  try {
    const detail = fn();
    S.log.unshift({ actor, call: label, ok: true, detail });
    S.lastError = undefined;
    return true;
  } catch (e) {
    const msg = (e as Error).message;
    S.log.unshift({ actor, call: label, ok: false, detail: `rejected: ${msg}` });
    S.lastError = msg;
    return false;
  } finally {
    remember();
  }
};

// ---- the story ----------------------------------------------------------------

type Action = {
  id: string;
  actor: "Alice" | "Bob" | "Vendor";
  title: string;
  explain: string;
  needs: string[];
  run: () => Promise<void>;
};

const story: Action[] = [
  {
    id: "commit-alice",
    actor: "Alice",
    title: "Commit the report privately",
    explain:
      "sha256(report) and a random salt go into private state. commitReport(notAfter) publishes only the commitment, an unlinkable owner key, an ordinal and the deadline.",
    needs: [],
    run: async () => {
      S.alice = await prepareReport(S.aliceText);
      const sim = S.sim.as("alice");
      const notAfter = sim.getBlockTime() + 600n;
      call("Alice", `commitReport(notAfter = ${when(notAfter)})`, () => {
        S.ca = sim.stage(S.alice!).commitReport(notAfter);
        return `commitment ${short(S.ca)} is entry #${sim.getEntry(S.ca).ordinal}`;
      });
      S.highlight = S.ca && toHex(S.ca);
    },
  },
  {
    id: "commit-bob",
    actor: "Bob",
    title: "One hour later, Bob commits the same bug",
    explain:
      "Bob has his own secret key and his own wording. On the ledger the two entries look unrelated: nobody can tell they describe the same bug, or who made them.",
    needs: ["commit-alice"],
    run: async () => {
      S.bob = await prepareReport(S.bobText);
      const sim = S.sim.as("bob");
      sim.setBlockTime(S.t0 + 3_600n);
      const notAfter = sim.getBlockTime() + 600n;
      call("Bob", `commitReport(notAfter = ${when(notAfter)})`, () => {
        S.cb = sim.stage(S.bob!).commitReport(notAfter);
        return `commitment ${short(S.cb)} is entry #${sim.getEntry(S.cb).ordinal}`;
      });
      S.highlight = S.cb && toHex(S.cb);
    },
  },
  {
    id: "vendor-verify",
    actor: "Vendor",
    title: "Vendor checks priority, off-chain",
    explain:
      "Bob reported first, so the vendor says 'duplicate'. Alice privately sends the vendor her report and salt. The vendor hashes the report itself, recomputes the commitment and reads the ledger. No transaction.",
    needs: ["commit-bob"],
    run: async () => {
      const before = S.sim.getLedger().entryCount;
      const digest = await sha256(S.aliceText);
      const opening = { digest, salt: S.alice!.salt };
      const v = verifyOpening(S.sim.getLedger(), opening);
      const first = earliestCommitment(S.sim.getLedger(), [S.bob!, opening]);
      S.vendor = {
        digest,
        commitment: v.commitment,
        found: v.found,
        ordinal: v.found ? v.ordinal : undefined,
        notAfter: v.found ? v.notAfter : undefined,
        status: v.found ? v.status : undefined,
        earliest: first === 1 ? "Alice" : first === 0 ? "Bob" : "none",
        entriesBefore: before,
        entriesAfter: S.sim.getLedger().entryCount,
      };
      S.log.unshift({
        actor: "Vendor",
        call: "verifyOpening(report, salt)  [local computation, not a circuit call]",
        ok: v.found,
        detail: v.found
          ? `found entry #${v.ordinal}, on chain before ${when(v.notAfter)}; earliest of the two = ${S.vendor.earliest}`
          : "no such commitment on the ledger",
      });
      S.highlight = toHex(v.commitment);
    },
  },
  {
    id: "prove-match",
    actor: "Alice",
    title: "Disclose selectively: proveMatch",
    explain:
      "The vendor publishes sha256 of the report. Alice's circuit checks, against her private opening, that her entry opens to exactly that digest. The salt and the report stay private.",
    needs: ["vendor-verify"],
    run: async () => {
      const sim = S.sim.as("alice");
      sim.setBlockTime(S.t0 + 86_400n);
      const digest = S.vendor!.digest;
      call("Alice", `proveMatch(${short(S.ca!, 8)}, vendorDigest = ${short(digest, 8)})`, () => {
        sim.proveMatch(S.ca!, digest);
        return `entry #${sim.getEntry(S.ca!).ordinal} is now ${statusName(sim.getEntry(S.ca!).status)}`;
      });
      S.highlight = toHex(S.ca!);
    },
  },
  {
    id: "bob-tamper",
    actor: "Bob",
    title: "Bob tries to close Alice's entry",
    explain:
      "Owner-only circuits re-derive the owner key from the caller's secret key inside the circuit. Bob's key gives a different owner key, so the assert fails.",
    needs: ["prove-match"],
    run: async () => {
      const sim = S.sim.as("bob");
      call("Bob", `markResolved(${short(S.ca!, 8)})`, () => {
        sim.markResolved(S.ca!);
        return "resolved (this should not happen)";
      });
      S.highlight = toHex(S.ca!);
    },
  },
  {
    id: "resolve",
    actor: "Alice",
    title: "Fixed and paid: Alice closes the entry",
    explain: "markResolved moves Alice's entry from disclosed to resolved. Only she can do it.",
    needs: ["prove-match"],
    run: async () => {
      const sim = S.sim.as("alice");
      call("Alice", `markResolved(${short(S.ca!, 8)})`, () => {
        sim.markResolved(S.ca!);
        return `entry #${sim.getEntry(S.ca!).ordinal} is now ${statusName(sim.getEntry(S.ca!).status)}`;
      });
      S.highlight = toHex(S.ca!);
    },
  },
];

const attacks: Action[] = [
  {
    id: "x-wrong-digest",
    actor: "Bob",
    title: "Bob claims his entry matches Alice's digest",
    explain: "proveMatch(Bob's entry, Alice's digest): his private opening has a different digest.",
    needs: ["vendor-verify"],
    run: async () => {
      const sim = S.sim.as("bob");
      call("Bob", `proveMatch(${short(S.cb!, 8)}, vendorDigest = ${short(S.vendor!.digest, 8)})`, () => {
        sim.proveMatch(S.cb!, S.vendor!.digest);
        return "disclosed (this should not happen)";
      });
      S.highlight = toHex(S.cb!);
    },
  },
  {
    id: "x-late-commit",
    actor: "Bob",
    title: "Bob back-dates a new commitment",
    explain: "commitReport with notAfter one second in the past: blockTimeLt(notAfter) fails.",
    needs: ["commit-alice"],
    run: async () => {
      const sim = S.sim.as("bob");
      const saved = sim.getPrivateState();
      const draft = await prepareReport("A back-dated claim");
      const notAfter = sim.getBlockTime() - 1n;
      call("Bob", `commitReport(notAfter = ${when(notAfter)})`, () => {
        sim.stage(draft).commitReport(notAfter);
        return "committed (this should not happen)";
      });
      sim.setPrivateState(saved); // the failed transaction leaves no draft behind
      remember();
    },
  },
];

const allActions = [...story, ...attacks];
const byId = (id: string): Action => {
  const a = allActions.find((x) => x.id === id);
  if (!a) throw new Error(`unknown action ${id}`);
  return a;
};
const ready = (a: Action): boolean => !S.done.has(a.id) && a.needs.every((n) => S.done.has(n));

let busy = false;
const perform = async (id: string): Promise<void> => {
  const a = byId(id);
  if (!ready(a)) throw new Error(`action ${id} is not available yet`);
  if (id === "commit-alice") {
    S.aliceText = (document.getElementById("alice-text") as HTMLTextAreaElement | null)?.value ?? S.aliceText;
    S.bobText = (document.getElementById("bob-text") as HTMLTextAreaElement | null)?.value ?? S.bobText;
  }
  const logged = S.log.length;
  await a.run();
  if (S.log.length > logged) S.results[id] = S.log[0];
  S.done.add(id);
  render();
};

// ---- rendering ------------------------------------------------------------------

const renderSteps = (): void => {
  const cards = story
    .map((a, i) => {
      const state = S.done.has(a.id) ? "done" : ready(a) ? "ready" : "locked";
      return `<div class="step ${state}">
        <div class="num">${i + 1}</div>
        <div class="actor ${a.actor.toLowerCase()}">${a.actor}</div>
        <div class="title">${esc(a.title)}</div>
        <p>${esc(a.explain)}</p>
        <button data-action="${a.id}" ${state === "ready" && !busy ? "" : "disabled"}>${
          state === "done" ? "Done" : "Run"
        }</button>
      </div>`;
    })
    .join("");
  $("steps").innerHTML = `<div class="controls">
      <button id="play" ${busy ? "disabled" : ""}>Play the whole story</button>
      <button id="reset" ${busy ? "disabled" : ""}>Reset</button>
      <span class="clock">block time: ${when(S.sim.getBlockTime())}</span>
    </div><div class="cards">${cards}</div>`;
};

const renderPrivate = (): void => {
  const person = (name: string, key: string, text: string, opening?: ReportOpening): string => {
    const ps = S.views[key];
    const reports = ps ? Object.entries(ps.reports) : [];
    const editable = !S.done.has("commit-alice");
    return `<div class="person ${key}">
      <h3>${name}</h3>
      <label>Report text <small>(stays local; only sha256 of it enters private state)</small></label>
      ${
        editable
          ? `<textarea id="${key}-text" rows="3">${esc(text)}</textarea>`
          : `<div class="report">${esc(text)}</div>`
      }
      <dl>
        <dt>secret key</dt><dd>${ps ? `${short(ps.secretKey, 8)} <i>(32 bytes, hidden)</i>` : "<i>created on first use</i>"}</dd>
        <dt>digest</dt><dd>${opening ? short(opening.digest, 24) : "<i>-</i>"}</dd>
        <dt>salt</dt><dd>${opening ? short(opening.salt, 24) : "<i>-</i>"}</dd>
        <dt>openings</dt><dd>${
          reports.length
            ? reports.map(([c]) => `commitment ${c.slice(0, 12)}…`).join("<br>")
            : "<i>none</i>"
        }</dd>
      </dl>
    </div>`;
  };
  $("private").innerHTML =
    person("Alice", "alice", S.aliceText, S.alice) + person("Bob", "bob", S.bobText, S.bob);
};

const renderChain = (): void => {
  const ledger = S.sim.getLedger();
  const rows: [Uint8Array, Entry][] = [...ledger.entries];
  rows.sort((a, b) => Number(a[1].ordinal - b[1].ordinal));
  const body = rows.length
    ? rows
        .map(([c, e]) => {
          const hex = toHex(c);
          const zero = e.digest.every((x) => x === 0);
          return `<tr class="${S.highlight === hex ? "hl" : ""}">
            <td>#${e.ordinal}</td>
            <td><code>${hex.slice(0, 16)}…</code></td>
            <td><code>${short(e.owner, 10)}</code></td>
            <td>${when(e.notAfter)}</td>
            <td><span class="status s-${statusName(e.status)}">${statusName(e.status)}</span></td>
            <td>${zero ? "<i>hidden</i>" : `<code>${short(e.digest, 10)}</code>`}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td colspan="6" class="empty">no entries yet</td></tr>`;
  $("chain").innerHTML = `<table>
      <thead><tr><th>ordinal</th><th>commitment</th><th>owner key</th><th>committed before</th><th>status</th><th>digest</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
    <p class="count">entryCount = ${ledger.entryCount}. Report text, salts and secret keys appear nowhere in this table.</p>`;

  $("attacks").innerHTML = attacks
    .map((a) => {
      const state = S.done.has(a.id) ? "done" : ready(a) ? "ready" : "locked";
      const r = S.results[a.id];
      return `<div class="attack ${state}">
        <button data-action="${a.id}" ${state === "ready" && !busy ? "" : "disabled"}>${esc(a.title)}</button>
        <span>${esc(a.explain)}</span>
        ${r ? `<div class="result ${r.ok ? "ok" : "bad"}">${esc(r.detail)}</div>` : ""}
      </div>`;
    })
    .join("");
};

const renderVendor = (): void => {
  const v = S.vendor;
  if (!v) {
    $("vendor").innerHTML = `<p class="muted">The vendor has received two reports of the same bug.
      Bob's arrived first. Alice says she found it earlier. Step 3 shows how the vendor settles it
      without anything being published.</p>`;
    return;
  }
  $("vendor").innerHTML = `<dl class="prose">
      <dt>received from Alice</dt><dd>report text + salt, over a private channel</dd>
      <dt>sha256(report)</dt><dd><code>${short(v.digest, 24)}</code><br><small>any tool works: <code>sha256sum report.md</code></small></dd>
      <dt>recomputed commitment</dt><dd><code>${short(v.commitment, 24)}</code></dd>
      <dt>on the ledger?</dt><dd>${
        v.found
          ? `<b class="ok">yes: entry #${v.ordinal}, committed before ${when(v.notAfter!)}</b>`
          : `<b class="bad">no</b>`
      }</dd>
      <dt>duplicate dispute</dt><dd><b>earliest valid commitment: ${v.earliest}</b> (lowest ordinal, withdrawn entries ignored)</dd>
      <dt>chain writes</dt><dd>none (entryCount ${v.entriesBefore} before, ${v.entriesAfter} after)</dd>
    </dl>`;
};

const renderLog = (): void => {
  $("log").innerHTML = S.log
    .map(
      (l) => `<li class="${l.ok ? "ok" : "bad"}"><span class="actor ${l.actor.toLowerCase()}">${l.actor}</span>
        <code>${esc(l.call)}</code> <span class="arrow">→</span> ${esc(l.detail)}</li>`,
    )
    .join("");
};

const render = (): void => {
  renderSteps();
  renderPrivate();
  renderChain();
  renderVendor();
  renderLog();
};

// ---- wiring ---------------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

document.addEventListener("click", (ev) => {
  const t = ev.target as HTMLElement;
  if (!(t instanceof HTMLButtonElement) || t.disabled) return;
  if (t.dataset.action) {
    void perform(t.dataset.action);
  } else if (t.id === "reset") {
    S = fresh(S.aliceText, S.bobText);
    render();
  } else if (t.id === "play") {
    void (async () => {
      busy = true;
      render();
      try {
        for (const a of story) {
          if (S.done.has(a.id)) continue;
          await perform(a.id);
          await sleep(1200);
        }
      } finally {
        busy = false;
        render();
      }
    })();
  }
});

const expect = (cond: boolean, what: string): void => {
  if (!cond) throw new Error(`selftest: ${what}`);
};

const selftest = async (): Promise<void> => {
  const ids = [...story.map((a) => a.id)];
  // attacks need the right moment: wrong digest before Alice resolves is fine
  // (it targets Bob's still-committed entry); late commit any time.
  for (const id of ids) await perform(id);
  const tamper = S.log.find((l) => l.call.startsWith("markResolved") && l.actor === "Bob");
  expect(!!tamper && !tamper.ok && tamper.detail.includes("Only the researcher"), "Bob's tamper must be rejected by the ownership assert");
  await perform("x-wrong-digest");
  expect(S.lastError?.includes("does not match the vendor-supplied digest") ?? false, "wrong digest must be rejected");
  await perform("x-late-commit");
  expect(S.lastError?.includes("Deadline has already passed") ?? false, "late commit must be rejected");
  const ledger = S.sim.getLedger();
  expect(ledger.entryCount === 2n, `entryCount should be 2, got ${ledger.entryCount}`);
  const ea = ledger.entries.lookup(S.ca!);
  const eb = ledger.entries.lookup(S.cb!);
  expect(ea.ordinal === 1n && eb.ordinal === 2n, "ordinals 1 and 2");
  expect(ea.status === Status.resolved, `Alice's entry should be resolved, is ${statusName(ea.status)}`);
  expect(eb.status === Status.committed, "Bob's entry should still be committed");
  expect(toHex(ea.digest) === toHex(await sha256(S.aliceText)), "published digest = sha256(Alice's report)");
  expect(eb.digest.every((x) => x === 0), "Bob's digest must stay hidden");
  expect(S.vendor?.earliest === "Alice" && S.vendor.entriesAfter === S.vendor.entriesBefore, "vendor check: Alice first, no writes");
  expect(Object.keys(S.views.bob?.reports ?? {}).length === 1, "Bob's failed transactions left his private state unchanged");
};

const start = async (): Promise<void> => {
  render();
  const params = new URLSearchParams(location.search);
  try {
    if (params.has("selftest")) {
      await selftest();
      document.body.dataset.selftest = "pass";
      console.log("SELFTEST PASS");
    } else if (params.has("run")) {
      const n = Number(params.get("run"));
      for (const a of story.slice(0, n)) await perform(a.id);
    } else if (params.has("play")) {
      for (const id of (params.get("play") ?? "").split(",").filter(Boolean)) await perform(id);
    }
  } catch (e) {
    document.body.dataset.selftest = `fail: ${(e as Error).message}`;
    console.error("SELFTEST FAIL", e);
  }
  document.body.dataset.ready = "1";
};

void start();

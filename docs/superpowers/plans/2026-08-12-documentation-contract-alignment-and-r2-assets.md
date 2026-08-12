# Documentation Contract Alignment and R2 Asset Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align current documentation and metadata with the shipped asset state, upload only the nine Selected Works visual assets to R2, and push the authorized worktree changes.

**Architecture:** Keep runtime catalog paths local to the Next.js public tree while publishing reusable visual assets under the existing R2 prefix used by the standalone prompt. Treat `metadata.preview` as the catalog fallback contract and keep source delivery separate from repository source availability.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node test runner, Wrangler R2 CLI, Git.

## Global Constraints

- `Material Office` and `4 Selected Works (1)` are shipped and use metadata status `published`.
- Homepage placeholder language refers only to unreleased landing-page cards.
- Access values are exactly `Free` and `Premium`.
- `sourceAvailable` means repository/prompt source exists; it does not promise downloads or licensing.
- Upload only eight WebP studies and `preview.mp4` under `sections/4-selected-works-1/`; do not upload `master-prompt.md`.
- Do not alter unrelated existing worktree changes or inspect/push GitHub configuration beyond the authorized current branch push.

---

### Task 1: Reconcile metadata and current-truth documentation

**Files:**
- Modify: `library/sections/material-office/metadata.ts`
- Modify: `library/sections/4-selected-works-1/metadata.ts`
- Modify: `docs/framefield-overview.md`
- Modify: `docs/element-implementation.md`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/superpowers/plans/2026-08-11-4-selected-works-codebase-cleanup.md`
- Modify: `docs/superpowers/specs/2026-08-11-selected-works-codebase-cleanup-design.md`

- [ ] Set both asset metadata records to `status: "published"`.
- [ ] Replace ambiguous “placeholder catalog” wording with “homepage landing catalog placeholders” and state that two real catalog entries are implemented.
- [ ] Document that `metadata.preview` is the required fallback image path, while its filename may differ from `preview.webp` when a video or study image is used.
- [ ] Document `sourceAvailable` as repository/prompt availability, explicitly separate from download/licensing delivery.
- [ ] Normalize the metadata contract example and access wording to `Free | Premium`.
- [ ] Add historical-snapshot labels to the completed cleanup plan/spec and mark old path references as historical/superseded context.

### Task 2: Validate source/docs consistency

**Files:**
- Test: `tests/selected-works.test.mjs`

- [ ] Run `node --test tests/selected-works.test.mjs`.
- [ ] Run `node --test tests/*.mjs`.
- [ ] Run `npm run build` after any development server is stopped.
- [ ] Run `git diff --check` and inspect `git diff --stat`.

### Task 3: Publish Selected Works visual assets to R2

**Files:**
- Read/upload: `public/library/sections/4-selected-works-1/auralis/visual-01.webp`
- Read/upload: `public/library/sections/4-selected-works-1/auralis/visual-02.webp`
- Read/upload: `public/library/sections/4-selected-works-1/cinder-bureau/visual-01.webp`
- Read/upload: `public/library/sections/4-selected-works-1/cinder-bureau/visual-02.webp`
- Read/upload: `public/library/sections/4-selected-works-1/stillhouse/visual-01.webp`
- Read/upload: `public/library/sections/4-selected-works-1/stillhouse/visual-02.webp`
- Read/upload: `public/library/sections/4-selected-works-1/vela-objects/visual-01.webp`
- Read/upload: `public/library/sections/4-selected-works-1/vela-objects/visual-02.webp`
- Read/upload: `public/library/sections/4-selected-works-1/preview.mp4`

- [ ] Upload the nine files to bucket `framefield-assets` under `sections/4-selected-works-1/` with matching content types.
- [ ] Do not upload `master-prompt.md`.
- [ ] List the prefix and confirm exactly the nine expected visual keys are present.

### Task 4: Commit and push the authorized worktree

**Files:**
- All current tracked and untracked worktree changes within `D:\Productivity\Coding\Websites\Framefield`.

- [ ] Review status and diff for accidental secrets or unrelated changes.
- [ ] Commit all requested work on the current `main` branch.
- [ ] Push the current `main` branch to `origin`.
- [ ] Re-check status and record the resulting commit/push state.

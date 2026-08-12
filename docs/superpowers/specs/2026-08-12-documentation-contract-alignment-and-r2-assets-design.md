# Documentation Contract Alignment and R2 Asset Delivery — Design Spec

> Status: Historical snapshot. Decisions from this spec are reflected in the current source-of-truth docs and asset metadata.

## Goal

Remove documentation ambiguity around shipped assets, landing-page placeholders, preview fallbacks, access labels, source availability, and the R2 delivery boundary for `4 Selected Works (1)`.

## Decisions

- `Material Office` and `4 Selected Works (1)` use metadata status `published` and are treated as shipped assets.
- “Placeholder catalog” refers only to the unreleased cards on the homepage landing catalog. The two real catalog entries are Material Office and `4 Selected Works (1)`.
- `metadata.preview` is the required catalog fallback image path. The filename does not have to be `preview.webp`; `previewVideo` is optional and may be the primary catalog playback source.
- `sourceAvailable: true` means the implementation and/or standalone prompt source exists in the repository. It does not mean user download, licensing, authentication, or payment delivery exists.
- Asset access values use the exact strings `Free` and `Premium`.
- Only visual assets for `4 Selected Works (1)` are uploaded to R2 under `sections/4-selected-works-1/`: eight WebP studies and `preview.mp4`. `master-prompt.md` remains served from the repository public path and is not uploaded to R2.

## Documentation changes

- Update `docs/framefield-overview.md` to distinguish implemented catalog entries from homepage placeholders and clarify source delivery scope.
- Update `docs/element-implementation.md` to describe the fallback-image contract, exact access values, and `sourceAvailable` semantics.
- Update `docs/documentation-audit.md` to reconcile `published` metadata with the shipped ledger and mark historical path references as superseded context.
- Mark the completed Selected Works cleanup plan/spec as historical snapshots.

## Validation

- Focused Selected Works tests.
- Full Node test suite.
- Production build.
- R2 upload verification by listing and checking the nine expected object keys.
- `git diff --check` before commit.

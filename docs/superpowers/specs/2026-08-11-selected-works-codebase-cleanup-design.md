# 4 Selected Works (1) Codebase Cleanup and Master Prompt — Design Spec

## Goal

Make the `4 Selected Works (1)` package easier to maintain while preserving its current visual output, routes, interactions, and fictional case-study content. Add a standalone code-first master prompt that lets another AI agent recreate the section using the canonical implementation and hosted assets.

## Naming contract

- User-facing title: `4 Selected Works (1)`.
- Internal package folder: `library/sections/4-selected-works-1/`.
- Public asset folder: `public/library/sections/4-selected-works-1/`.
- Route slug: `/library/sections/4-selected-works-1`.
- R2 prefix: `sections/4-selected-works-1/`.
- The old `selected-works` package/path is migrated completely; no compatibility alias is retained unless a production dependency requires it.

## Scope

### In scope

- Move the active package from `selected-works` to `4-selected-works-1`.
- Update metadata, homepage catalog wiring, route imports, tests, docs, and public paths.
- Split the implementation into focused source modules:
  - `source/SelectedWorks.tsx` — stable barrel exports and shared package entry.
  - `source/SelectedWorksPreview.tsx` — masthead, four-card index, and universal return control.
  - `source/SelectedWorkDetail.tsx` — archive detail page, narrative, gallery, and previous/next navigation.
  - `source/selected-works-motion.ts` — easing constants and entrance prop helpers.
  - `source/selected-works.css` — one scoped stylesheet retained as the canonical visual contract.
- Remove orphan SVG asset directories that are no longer referenced by the active four-project registry:
  - `material-office`
  - `quiet-form`
  - `ritual-objects`
  - `signal-house`
- Keep the eight active WebP visual studies and the catalog preview video, relocating them under the new public path.
- Create `master-prompt.md` in the package and a public copy served to catalog users.
- Update docs so current paths and current project names are authoritative. Historical audit entries remain, but old names are explicitly marked superseded.

### Out of scope

- No redesign of the preview or detail layout.
- No new project content, image generation, or visual replacement.
- No navbar addition.
- No `Copy Prompt` CTA or `Back to library` instruction inside the standalone master prompt.
- No change to the four project slugs: `cinder-bureau`, `auralis`, `stillhouse`, and `vela-objects`.

## Architecture

The Next.js routes continue to be thin adapters. They import the package barrel, while `metadata.ts` remains the single source of truth for the section and its four child projects. The preview and detail components share only typed metadata, motion helpers, and the scoped stylesheet. The output DOM and class names remain stable unless a module boundary requires an import-only change.

The package uses local raster studies in development and exact hosted URLs in the standalone prompt:

```text
https://assets.framefield.my.id/sections/4-selected-works-1/preview.mp4
https://assets.framefield.my.id/sections/4-selected-works-1/<slug>/visual-01.webp
https://assets.framefield.my.id/sections/4-selected-works-1/<slug>/visual-02.webp
```

## Master prompt contract

`master-prompt.md` is a standalone, code-first instruction. It must:

1. State the required Next.js App Router, React, TypeScript, `motion/react`, `lucide-react`, and scoped CSS stack.
2. Require the exact package files or equivalent host paths.
3. Include the four-project data registry and the five required routes.
4. Use the hosted R2 URLs above for all visual studies; do not recreate them with SVG, CSS gradients, stock imagery, or placeholders.
5. Embed the canonical TSX source and CSS source, including responsive rules, focus behavior, reduced-motion behavior, and stagger timing.
6. Explain that the four projects are fictional case studies and must remain one section template with nested child routes.
7. Explicitly prohibit Framefield branding, catalog controls, `Copy Prompt`, navbar, and `Back to library` from the standalone implementation.

The prompt may describe the host integration separately, but the canonical implementation itself must not depend on the Framefield repository.

## Documentation updates

- `library/sections/4-selected-works-1/design.md` becomes the package source of truth.
- `docs/element-implementation.md` and `docs/development-workflow.md` use the new package/path naming and state the URL-safe naming convention.
- `docs/framefield-overview.md` points to the new package and routes.
- `docs/documentation-audit.md` updates the active ledger and records the migration, orphan-asset removal, and prompt addition. Earlier entries are retained as historical records with `superseded` wording where their old project names or paths are no longer active.
- `docs/README.md` links to the new design contract if it references the package path.

## Validation

- Focused `tests/selected-works.test.mjs` verifies the new package path, route slug, registry, eight WebP assets, R2 prompt URLs, barrel exports, and absence of orphan SVG directories.
- Full suite: `node --test tests/*.mjs`.
- Production build: `npm run build`.
- Formatting/integrity: `git diff --check`.
- Runtime smoke paths:
  - `/library/sections/4-selected-works-1`
  - `/library/sections/4-selected-works-1/cinder-bureau`
  - `/library/sections/4-selected-works-1/auralis`
  - `/library/sections/4-selected-works-1/stillhouse`
  - `/library/sections/4-selected-works-1/vela-objects`


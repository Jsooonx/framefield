# 4 Selected Works (1) — Codebase Cleanup

> Status: Historical snapshot. Current truth lives in `docs/framefield-overview.md`, `docs/element-implementation.md`, `docs/documentation-audit.md`, and `library/sections/4-selected-works-1/`.

## Scope

Maintain `4 Selected Works (1)` as one independent library section with four fictional child project routes. Its URL-safe package, public asset, and R2 prefix is `4-selected-works-1`.

## Package contract

- Registry and project data: `library/sections/4-selected-works-1/metadata.ts`.
- Main preview: `/library/sections/4-selected-works-1`.
- Project routes: `/library/sections/4-selected-works-1/<slug>`.
- Raster studies: `public/library/sections/4-selected-works-1/<slug>/`.
- The standalone prompt must mirror to the public asset path and exclude Framefield host controls.

## Verification

1. Run `node --test tests/selected-works.test.mjs`.
2. Run `npm run build`.
3. Open the parent route and every generated child route.
4. Confirm catalog ordering, video preview, and the universal Back to library control.

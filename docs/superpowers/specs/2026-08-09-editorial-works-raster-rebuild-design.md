# Editorial Works Raster Rebuild — Design Specification

## Intent

Rebuild `Selected Works` as a fresh Framefield section template rather than an extension of the earlier fictional case studies. The template retains one Library asset, one full preview route, and four nested detail pages, but replaces all project names, SVG studies, and preview composition with a closer editorial interpretation of the supplied reference.

## Approved visual direction

Use photographic editorial imagery as the visual language. The surface is a light, nearly white portfolio canvas with a quiet top navigation, a centered oversized `Projects.` masthead, and a two-column index. Each work owns a compact white metadata rail above one wide image. The design borrows only the structural rhythm of the reference, never its logo, names, or imagery.

The viewport is framed as a complete desktop canvas: the header stays at the top, the masthead fills the upper third, and the first two cards begin inside the first viewport at 1440×900. Mobile becomes one image-led column without retaining desktop whitespace.

## Fictional projects and raster studies

| Work | Fictional practice | Cover image | Detail image |
| --- | --- | --- | --- |
| Cinder Bureau | Brand and spatial design practice | Black folded paper, mineral surface, oblique studio light | Close detail of graphite material and embossed typography forms |
| Auralis | Human-centred research laboratory | Editorial macro portrait with a cyan iris and refracted light | Hands, translucent glass, and luminous signal reflections |
| Stillhouse | Architecture studio | Quiet concrete interior with a deep single sunbeam | Architectural detail of plaster, staircase, and warm shadow |
| Vela Objects | Contemporary object label | Sculptural lacquer object in oxidized red on a pale plinth | Tactile product grouping with brushed metal and paper texture |

Every image is a generated raster asset with no text, watermark, logos, UI, or embedded project name. The cover image is 16:10-ish editorial landscape; the detail image is suitable for the larger narrative gallery.

## Reusable preview shell

`Back to library` becomes the universal Framefield preview control: the exact compact glass pill used by the Material Office hero, including its circular lime left-arrow, glass surface, hover response, and desktop bottom-right placement. This action replaces the textual header action and is used on the overview and nested detail pages. `All projects` remains a contextual return to the section index.

## Interactions

- Hover/focus is isolated to an individual media tile: modest image scale, a dark readable veil, and local project lockup.
- Title rails do not animate with the media.
- The universal back pill has a 44px touch target and its arrow shifts left subtly on hover.
- All nonessential motion honors reduced-motion.

## Architecture and constraints

- Preserve `/library/sections/selected-works` and four nested child routes.
- Replace all `visual-01.svg` and `visual-02.svg` references with workspace-local raster assets.
- Do not add the works section to the Framefield homepage.
- Keep the current static metadata approach; no CMS or new dependency is needed.
- Update the section design contract and documentation ledger so no SVG studies remain described as current truth.

## Validation

- Regression tests assert no selected-work raster paths end in `.svg`, four fresh work names exist, and the preview still has one catalog entry with four nested pages.
- Browser inspection at a desktop viewport and a mobile viewport verifies composition, images, and the universal back control.
- Full Node test suite and `npm run build` pass.

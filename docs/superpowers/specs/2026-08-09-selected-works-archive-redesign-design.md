# Selected Works Archive Redesign — Design Spec

## Goal

Rebuild the Selected Works visual world and its nested project detail pages so they feel like an original Framefield art-directed archive rather than a close interpretation of the supplied project-index reference.

## Scope

- Keep one Library asset at `/library/sections/selected-works`.
- Keep four nested project routes under that section: Cinder Bureau, Auralis, Stillhouse, and Vela Objects.
- Replace all eight active project images with newly generated raster WebP studies.
- Recompose the detail page shared template for a more asymmetric archive layout.
- Add proper staged entrance motion for header, index, hero, metadata, narrative, gallery, and navigation.
- Preserve the universal Material Office-style `Back to library` control.
- Do not add new dependencies or move the works section into the homepage.

## Visual direction

The new visual language is an art-directed case-study archive: less generic editorial grid, more collected artifact. Project imagery uses distinct subjects and compositions per identity:

- Cinder Bureau: graphite rubbings, folded paper, mineral dust, and tactile print fragments.
- Auralis: transparent optical forms, electric cyan refraction, and human-adjacent abstract perception.
- Stillhouse: architectural fragments, hard directional light, and cropped spatial geometry.
- Vela Objects: red lacquer, object silhouettes, hard shadows, and extreme still-life crops.

Images must contain no readable typography, logo, interface, watermark, or reference brand identity.

## Detail page composition

- Header remains quiet and utility-led.
- A small archive index marker and `Fictional case study` label establish context before the title.
- The project title becomes an oversized offset lockup with the project number integrated into the composition, not a standard left-column heading.
- The lead image becomes a dominant visual field with a floating caption marker; text and image do not sit in the reference's predictable split-screen arrangement.
- Metadata becomes a horizontal/stacked archive strip below the lead visual.
- The brief and direction use two editorial modules with different type scales, a pull quote-like statement, and a small label rail.
- The second visual is presented as a narrow image study beside a “Built from Framefield” module on desktop, then stacked on mobile.
- Previous/next navigation becomes a large archive index at the bottom, with the current project's number and neighboring project identity.

## Motion

- Use Motion's `motion` primitives already present in the project.
- On initial load, animate semantic chunks independently: header, context marker, title lines, lead image, summary, metadata strip, narrative modules, gallery module, and navigation.
- Use a single calm cubic-bezier and stagger intervals in the 80–130ms range; no bounce or delayed blink.
- Images enter with opacity plus a restrained scale from `1.04` to `1`, while text enters with opacity and a short vertical clip/reveal.
- Gallery content uses `whileInView` with `once: true` and respects `useReducedMotion`.
- Keep hover motion interruptible and property-specific; do not use `transition: all`.

## Responsive behavior

- Desktop target: 1440×900. The detail page should reveal the project context, title, and most of the lead image in the first viewport.
- Mobile target: 390×844. Content becomes one column, title remains readable, metadata wraps without overflow, and the universal back pill remains reachable.
- No horizontal scroll at either target.

## Success criteria

- The eight active images are newly generated raster WebP assets and are clearly different from the supplied reference imagery.
- All four child routes share the redesigned detail composition while preserving their data-driven content.
- Entrance motion is visible, staggered, reduced-motion aware, and free from blink/jitter artifacts.
- Tests cover fresh image paths, detail composition hooks, staggered motion hooks, route preservation, and universal back control.
- Docs describe the new archive direction as current truth.

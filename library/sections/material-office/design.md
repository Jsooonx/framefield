# Element Design Brief: Material Office

> Status: review
> Type: section
> Slug: `material-office`
> Owner: Framefield
> Last updated: 2026-08-10

## 1. Intent

`Material Office` adalah hero section mandiri yang memperlihatkan sebuah fictional design studio secara penuh, dengan menu overlay sebagai pasangan interaksinya. Asset ini ditujukan sebagai starting point untuk creative studio, portfolio, dan agency website yang membutuhkan first impression image-led tanpa bergantung pada layout SaaS generik.

Tujuan preview adalah memperlihatkan pengalaman yang siap direkam: visual video sebagai panggung utama, hierarchy tipografi besar, service index ringkas, dan menu yang dapat dibuka langsung.

## 2. References

| File | Apa yang dirujuk | Bagian yang dipertahankan |
| --- | --- | --- |
| `references/reference-hero.png` | Hero studio monochrome dengan type besar dan informasi yang tersebar di frame | Rounded browser-like canvas, visual-led hero, oversized wordmark, service index, dan card di sudut bawah kanan |
| `references/reference-menu.png` | Menu full-screen dengan hierarchy editorial | Menu links besar di tengah, utilitas/contact di bawah, dan screenshot/visual strip sebagai transisi ke hero |

Referensi hanya dipakai sebagai grammar layout. Tidak ada brand, copy, foto portrait, atau identitas `fabrica` yang akan dipakai ulang.

## 3. Rebrand / rebuild direction

### Pertahankan

- Satu visual hero besar yang memenuhi canvas dan menjadi fokus utama.
- Kontras tajam antara type display dan informasi sekunder.
- Navigation yang berubah menjadi menu editorial full-screen.
- Informasi utility yang rendah kontras dan berada di pinggir frame.

### Ubah

- Brand menjadi `MATERIAL / OFFICE`, sebuah studio fiktif dengan orientasi material, image-making, dan digital direction.
- Background menjadi video abstrak/tactile: kertas, serat, tinta, grafit, dan shadow movement. Tidak memakai video manusia atau portrait.
- Service list menjadi: `Brand Systems`, `Digital Experiences`, `Motion Direction`, `Editorial Web`.
- Contact portrait card diganti menjadi availability card agar visual tidak tergantung aset manusia.
- Palet Material Office memakai charcoal/cream sebagai dasar dengan acid lime kecil hanya untuk interaction signal atau status.

### Buang

- Nama, trademark, email, nomor telepon, dan claim bisnis dari referensi.
- Grayscale stock portrait dan CTA `Let's talk`.
- Rounded card putih yang terasa seperti layout agency template.

### Tambahkan

- Native muted video slot dengan poster fallback; asset video berasal dari Google Flow dan dioptimalkan untuk delivery web.
- Control menu yang accessible: keyboard, focus state, Escape untuk close, dan scroll lock saat overlay terbuka.
- Return control universal di kanan bawah: action `Back to library`.
- Status `Available for select work` sebagai identitas UI pada availability card.
- CTA `Copy Prompt` yang menyalin master prompt elemen dan menampilkan state `Copied` sementara.

## 4. Visual system

- **Mode:** Experience. Karya dan moving image didahulukan; UI menghilang ke pinggir.
- **Typography:** sans display sangat besar, dense, dan sedikit condensed pada wordmark. Informasi pendukung memakai sans kecil dengan line-height rapat.
- **Color:** `#101214` charcoal, `#F3F0E7` warm cream, `#C8FF4A` lime sebagai accent tunggal. Overlay menu cream dengan ink hampir hitam.
- **Spacing:** ruang besar di pusat untuk wordmark, detail menempel pada tepi aman canvas. Gunakan 24px/32px desktop dan 16px/20px mobile sebagai padding minimum.
- **Shape/radius:** outer canvas 28px desktop, 20px mobile. Inner media mengikuti radius canvas secara concentric. Elemen utility berbentuk capsule hanya jika memang control.
- **Depth:** dark video memakai overlay gradient dan grain CSS ringan; tidak memakai border card tebal atau glassmorphism.
- **Image/visual treatment:** video muted, high contrast, monochrome-warm, bertekstur, tanpa logo/teks di dalam visual.

## 5. Content direction

- **Brand line:** `MATERIAL®` dengan `OFFICE` sebagai subline/anchor yang lebih kecil.
- **Supporting copy:** `A studio for brands with a physical point of view.`
- **Service labels:** `Brand Systems`, `Digital Experiences`, `Motion Direction`, `Editorial Web`.
- **Availability card:** `Now booking / Q4 2026` dan `Select collaborations`.
- **Menu:** `Home`, `Studio`, `Projects`, `Notes`, `Contact`.
- **Utility:** `Jakarta / Global`, `hello@materialoffice.studio`, `Privacy`, `Terms`.
- **CTA:** `Copy Prompt` adalah action utama elemen; `Back to library` tetap menjadi satu-satunya koneksi navigasi ke Framefield.
- **Content that must not be invented:** testimonial, client logos, results metrics, awards, people, dan foto client.

## 6. Layout and responsive behavior

### Desktop

- Canvas mengisi viewport dengan margin tipis; min-height setara viewport dan tidak bergantung pada fixed browser chrome.
- Header: material mark kiri, section navigation tengah, menu toggle kanan.
- Wordmark berada besar di kiri/tengah. `OFFICE` menjadi anchor lebih kecil di bawah atau setelah wordmark.
- Service index berada di kanan atas/tengah, supporting copy kiri bawah, availability card kanan bawah.
- Preview return control fixed di kanan bawah, di atas media namun tidak menghalangi availability card.

### Mobile

- Canvas tetap image-led tetapi memakai `min-height: 100svh`.
- Header hanya mark dan menu control; service index disederhanakan menjadi satu detail line atau disembunyikan secara visual tanpa menghapus kontennya dari accessibility tree bila perlu.
- Wordmark dapat wrap maksimal dua baris dan tidak lebih kecil dari keterbacaan display.
- Supporting copy dan availability card tersusun vertikal di area bawah; preview shell berada setelah safe area.
- Menu full-screen memakai link besar dengan ukuran yang tidak overflow pada 320px.

### Edge cases

- **Missing video:** tampilkan poster still generatif dengan gradient/grain CSS yang sama.
- **Video gagal dimuat:** jangan blok content; hero tetap legible di atas poster.
- **Reduced motion:** jangan autoplay video; gunakan poster static dan transisi menu/focus instan atau sangat minimal.
- **Long copy:** text body dibatasi lebar dan card tidak memotong line-height.
- **Narrow viewport:** control tetap minimum 44x44px, menggunakan safe-area inset pada perangkat dengan notch.

## 7. Interaction and motion

- Menu toggle beralih antara icon menu dan close secara local, interruptible, tanpa bounce.
- Menu overlay memakai opacity + translate kecil; links masuk sebagai stagger yang pendek. Saat close, exit lebih pendek dan tidak meloncat keluar layar.
- Video berjalan `muted`, `loop`, `playsInline`, `preload="metadata"`; tidak ada audio control untuk asset ini.
- Availability card memiliki hover opacity/elevation ringan saja; tidak ada rolling text karena ia bukan CTA utama.
- Semua control memiliki visible focus ring lime dan active press `scale(0.96)`.
- `prefers-reduced-motion` mematikan autoplay visual dan menghilangkan stagger/transform motion.

## 8. Implementation contract

- **Full preview route:** `/library/sections/material-office`
- **Source entry point:** `library/sections/material-office/source/MaterialOffice.tsx`
- **Styles:** `library/sections/material-office/source/material-office.css`
- **Preview shell:** route-level wrapper dengan return control `Back to library` ke `/#library`.
- **Media paths:**
  - Poster R2: `https://assets.framefield.my.id/sections/material-office/hero-poster.webp`
  - MP4 R2: `https://assets.framefield.my.id/sections/material-office/hero-video.mp4`
  - WebM: `/library/sections/material-office/hero-video.webm`
  - Catalog preview: `/library/sections/material-office/preview.webp`
- **Master prompt:** `library/sections/material-office/master-prompt.md`, published for the CTA at `/library/sections/material-office/master-prompt.md`.
- **Catalog video:** `/library/sections/material-office/preview.mp4`, dimainkan muted dan looping di kartu katalog dengan `preview.webp` sebagai fallback image.
- **Fallback behavior:** hero route memakai poster jika hero video tidak tersedia; catalog card memakai WebP jika catalog video gagal dimuat. Media slot tetap tidak mengubah DOM layout.
- **Metadata:** `library/sections/material-office/metadata.ts`, status saat ini `review` karena menunggu visual/technical QA; asset sudah memiliki route, video, WebP, metadata, dan dokumentasi lengkap.
- **Preview recording viewport:** desktop 1440x960 dan mobile 390x844. Source recording 1440x810, 30 fps, 5.37 detik, tanpa audio; catalog WebP adalah still frame tervalidasi 960x540.
- **Dependencies:** Next.js 15, React 19, TypeScript, Motion, Lucide React; tidak perlu backend/CMS/database.

## 9. Definition of done

```text
[x] Design direction approved
[x] References stored
[x] Source implementation complete
[x] Full preview route works
[x] Desktop checked
[x] Mobile checked
[ ] Reduced-motion checked
[x] Poster fallback generated
[x] Video integrated after Google Flow export
[x] Preview WebP recorded
[x] Metadata registered in catalog
[x] Copy Prompt CTA added to dedicated preview and catalog card
[x] Hero MP4 uploaded to R2 and wired as primary source
[x] Tests/build pass
[x] Documentation audit updated
```

## 10. Decision log

### 2026-08-05 — Material Office direction approved

- Decision: Build Material Office as an original hero and menu overlay, informed by the compositional grammar of the supplied references.
- Reason: It proves the dedicated full-preview pipeline with a visually distinctive, video-ready section while avoiding a generic component-library aesthetic.
- Impact: The first asset package will establish the preview shell, metadata, fallback media, and catalog handoff pattern for future sections.

### 2026-08-05 — Poster fallback and full preview implemented

- Decision: Ship the first preview with an original material-study WebP poster while `HERO_VIDEO.available` remains `false`.
- Reason: The dedicated route must remain fully usable before the external Google Flow video is generated, without requesting a missing media file.
- Impact: Replacing the fallback is a contained asset update: add MP4/WebM files at the documented paths and set `HERO_VIDEO.available` to `true`, then record `preview.webp`.

### 2026-08-05 — Editorial Index menu rework

- Decision: Replace the centered menu list with a split Editorial Index: numbered, left-aligned navigation on a warm paper panel and a narrow material-poster strip on the right.
- Reason: The menu now carries the same authored, material-led character as the hero while keeping the navigation direct and easy to scan.
- Impact: Mobile collapses to one column with the poster as a shallow band above the utility links. The desktop refinement below narrows hover feedback to the text label only.

### 2026-08-05 — Right-side desktop drawer

- Decision: Desktop navigation uses a 34vw right drawer, capped at 520px, while mobile retains the full-screen Editorial Index.
- Reason: The hero remains visible as the experience and the menu becomes a precise control surface rather than a replacement screen.
- Impact: The desktop poster strip is hidden; an exposed shaded hero closes the drawer and joins the existing header-toggle and Escape close paths.

### 2026-08-05 — Drawer close control and label-only hover

- Decision: Align the desktop drawer close button to the panel’s top-right and scope menu hover motion to the text label only.
- Reason: The hidden desktop index track centered the close control, and row-level hover feedback made sequence metadata move with the label.
- Impact: Sequence numbers and the menu row remain visually stable while only the text label tints and shifts slightly; the label uses intrinsic width so its hover trigger matches the visible text bounds.

### 2026-08-05 — Drawer close motion

- Decision: Animate the menu drawer back to the right when it closes, while the existing layer fades out.
- Reason: Opening had a clear directional transition, but closing previously removed the panel without matching motion.
- Impact: Close button, Escape, backdrop, and menu-link dismissal now share the same coherent exit transition.

### 2026-08-05 — Back-to-library control polish

- Decision: Replace the floating arrow mark with a compact glass pill using a semantic left-arrow icon.
- Reason: The previous tiny circular mark read as an isolated logo detail instead of a clear navigation control.
- Impact: The control is more legible against the material background and gets a restrained icon-led hover response.

### 2026-08-05 — Hero wordmark alignment

- Decision: Offset the complete hero wordmark slightly left and use a smaller optical inset on `OFFICE` so the lockup aligns with `INDEPENDENT DESIGN PRACTICE`.
- Reason: Matching the hero container box alone left the visible glyphs too far right, while the `M` and `O` side-bearings still differed.
- Impact: Desktop and mobile now share the same optical left edge for the full primary hero lockup.

### 2026-08-05 — Hero video integrated

- Decision: Add the supplied Google Flow animation as the active hero background, renamed to the package-standard `hero-video` assets.
- Reason: The dedicated preview now has its final motion asset and should render the moving material study instead of only the poster fallback.
- Impact: MP4 and WebM are muted, 1280×720, and audio-free for web delivery; the poster remains the hero fallback. Catalog preview recording kemudian diselesaikan pada entry `Catalog preview recorded`.

### 2026-08-05 — Hero entrance stagger

- Decision: Reveal the Material Office preview in a short authored sequence: navbar, superline, wordmark, services, supporting copy, availability card, then the universal back control.
- Reason: The static first frame felt disconnected from the intentional motion language already used by the menu.
- Impact: Each semantic element enters with a restrained opacity/translate transition, services receive a shorter internal stagger, and reduced-motion users receive an immediate reveal.

### 2026-08-05 — Catalog preview recorded

- Decision: Add the supplied preview recording as `preview.mp4` for package-level source reference and a lightweight first-frame `preview.webp` for the library card.
- Reason: The dedicated route now has a lightweight discovery preview that follows the catalog contract.
- Impact: The original download remains untouched; the source video is 1440×810, 30 fps, 5.37 seconds, and audio-free, while the catalog WebP is a validated 960×540 still frame.

### 2026-08-05 — Catalog card uses the preview recording

- Decision: Feed the catalog card from `preview.mp4` and use `preview.webp` as its fallback image instead of pointing directly at the hero poster.
- Reason: The card had the correct preview asset on disk but its catalog entry still referenced the dedicated-route poster, so the supplied recording was not visible in the library.
- Impact: Material Office now renders as a muted looping video in the catalog while retaining a lightweight image fallback.

### 2026-08-05 — Catalog circle removed from Material Office preview

- Decision: Disable the generic catalog thumbnail circle for the `material-office` card.
- Reason: That decorative pseudo-element belonged to the placeholder thumbnail system and sat on top of the supplied recording.
- Impact: The video preview now shows only the recorded Material Office composition; the generic decoration remains available to other placeholder cards.

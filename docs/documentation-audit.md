# Documentation Audit

Dokumen ini menjaga agar dokumentasi Framefield tetap menjadi sistem yang bisa dipercaya. Audit bukan sekadar mengecek typo; audit memastikan fitur yang dibuang, ditambah, atau berubah tidak hilang dari sejarah dan tidak ditulis ulang di banyak tempat.

## 1. Satu informasi, satu sumber utama

Gunakan aturan berikut:

| Jenis informasi | Sumber utama |
| --- | --- |
| Product promise, audience, scope, shipped/planned | `docs/framefield-overview.md` |
| Brand voice, palette, visual guardrails | `branding.md` |
| Asset package, route, metadata, preview | `docs/element-implementation.md` |
| Urutan kerja harian/feature delivery | `docs/development-workflow.md` |
| Detail keputusan visual satu asset | `<asset>/design.md` |
| Fitur yang ditambah/dibuang dan alasan perubahannya | `docs/documentation-audit.md` |

Dokumen lain harus menaut ke sumber utama, bukan menyalin isi lengkapnya.

## 2. Feature ledger

Setiap perubahan product-level harus masuk ke ledger ini atau ke entry baru di bagian change log.

| Feature / capability | Status | First documented | Current source | Notes |
| --- | --- | --- | --- | --- |
| Homepage editorial shell | Shipped | `framefield-overview.md` | `src/app/page.tsx` | Hero, library, pricing, footer |
| Placeholder catalog | Shipped temporarily | `framefield-overview.md` | `src/app/page.tsx` | Akan digantikan asset registry bertahap |
| Dedicated full preview routes | Shipped | `element-implementation.md` | `src/app/library/sections/material-office/page.tsx` | Pertama tersedia di `/library/sections/material-office`; production smoke test sudah mencakup route ini |
| Material Office hero + menu | Shipped (video active) | `library/sections/material-office/design.md` | `library/sections/material-office/source/MaterialOffice.tsx` | Video dan catalog WebP sudah tersedia |
| Selected Works template | Shipped | `library/sections/selected-works/design.md` | `library/sections/selected-works/metadata.ts`, `src/app/library/sections/selected-works/` | Satu template editorial dengan empat fictional child project dan delapan visual WebP lokal |
| WebP preview recording | Shipped (asset pertama) | `element-implementation.md` | `public/library/sections/material-office/preview.webp` | Dibuat dari export preview route |
| User upload/CMS | Out of scope | `framefield-overview.md` | Tidak ada | Repository tetap jadi sumber awal |
| Payment/subscription backend | Out of scope | `framefield-overview.md` | Tidak ada | Jangan mendokumentasikan seolah sudah tersedia |

Status yang valid:

- `Shipped` — tersedia dan sudah diverifikasi.
- `In progress` — sedang dikerjakan dan sudah punya scope.
- `Planned` — disepakati tetapi belum diimplementasikan.
- `Proposed` — ide yang belum disetujui sebagai scope.
- `Out of scope` — sengaja tidak dibangun pada fase ini.
- `Archived` — pernah ada atau pernah direncanakan, lalu dihentikan.

`Shipped` pada feature ledger berarti implementation dan route sudah tersedia di repository. `review` pada `metadata.ts` berarti asset belum dianggap final published karena masih menunggu visual/technical QA. Keduanya boleh muncul bersamaan, tetapi statusnya harus dijelaskan di source document.

## 3. Change log keputusan

Gunakan entry singkat, bukan menulis ulang seluruh dokumen.

Format:

```md
### YYYY-MM-DD — Judul perubahan

- Type: Added | Changed | Removed | Deferred
- Area: Product | UI | Asset pipeline | Infrastructure | Documentation
- Decision: Apa yang berubah.
- Reason: Kenapa berubah.
- Source of truth updated: File yang menjadi sumber utama.
- Follow-up: Test, migration, atau docs lain yang harus diperbarui.
```

Contoh perubahan yang wajib dicatat:

- Menambah tipe asset baru.
- Menghapus route atau flow yang sebelumnya direncanakan.
- Mengubah format metadata.
- Mengubah cara preview direcord.
- Mengubah status dari placeholder ke published.
- Menunda fitur karena scope atau resource.

## 4. Audit sebelum dan sesudah perubahan

### Sebelum implementasi

- Cari apakah fitur sudah pernah didokumentasikan.
- Tentukan satu dokumen sumber utama.
- Cek apakah perubahan menambah atau menghapus scope.
- Pastikan tidak ada proposal lama yang bertentangan.

### Sesudah implementasi

- Update status di `framefield-overview.md` atau dokumen sumber terkait.
- Tambahkan change-log entry bila keputusan product/architecture berubah.
- Hapus atau ubah status fitur yang tidak jadi dibuat.
- Hapus paragraf yang sudah obsolete; jangan menumpuk catatan baru di atas catatan lama.
- Cari duplikasi istilah dan deskripsi dengan `rg`.
- Jalankan test dan build jika perubahan menyentuh source atau route.

## 5. Checklist audit dokumentasi

```text
[ ] Apakah setiap fitur punya satu source of truth?
[ ] Apakah statusnya jelas: shipped, in progress, planned, proposed, out of scope, atau archived?
[ ] Apakah ada fitur yang sudah dibuang tetapi masih ditulis sebagai rencana aktif?
[ ] Apakah ada fitur baru di code yang belum ada di docs?
[ ] Apakah ada paragraf yang mengulang isi dokumen lain?
[ ] Apakah link antar-docs masih valid?
[ ] Apakah contoh folder/route sesuai dengan implementasi aktual?
[ ] Apakah acceptance criteria masih bisa diverifikasi?
[ ] Apakah change log menjelaskan alasan perubahan penting?
[ ] Apakah docs menyebut sesuatu sebagai shipped padahal belum diuji?
```

## 6. Frekuensi audit

- **Setiap feature change:** audit source of truth dan status terkait.
- **Setiap asset published:** audit asset docs, metadata, preview, dan route.
- **Sebelum milestone:** audit seluruh feature ledger dan broken links.
- **Saat terjadi scope change:** tulis change log sebelum coding lanjutan.

Audit tidak perlu membuat dokumen baru setiap kali. Jika perubahan kecil, update dokumen utama dan tambahkan satu entry singkat di change log.

## 7. Change log

### 2026-08-05 — First section direction: Material Office

- Type: Added
- Area: Asset pipeline | UI
- Decision: Material Office dipilih sebagai asset section pertama; berisi video-ready hero dan editorial menu overlay dengan dedicated full preview route.
- Reason: Membuktikan pipeline asset package dan preview fullscreen dengan visual yang lebih rare daripada katalog komponen generik.
- Source of truth updated: `library/sections/material-office/design.md` dan tabel feature ledger ini.
- Follow-up: Selesai pada 2026-08-05 melalui integrasi hero video dan catalog preview recording.

### 2026-08-05 — Material Office preview shipped

- Type: Added
- Area: UI | Asset pipeline
- Decision: Menambahkan source hero/menu, poster fallback generatif, metadata, catalog entry, dan route `/library/sections/material-office`.
- Reason: Memberikan asset nyata pertama yang dapat dibuka full-screen dan menjadi pola delivery section berikutnya.
- Source of truth updated: `library/sections/material-office/design.md`, `library/sections/material-office/metadata.ts`, dan `src/app/library/sections/material-office/page.tsx`.
- Follow-up: Selesai pada 2026-08-05; detail final ada di `library/sections/material-office/design.md`.

### 2026-08-05 — Documentation system introduced

- Type: Added
- Area: Documentation | Asset pipeline
- Decision: Menambahkan overview website, element implementation contract, workflow, documentation audit, dan reusable element design template.
- Reason: Framefield akan berkembang dari single-page catalog menjadi library dengan full preview per asset; aturan dan status perlu terdokumentasi tanpa pengulangan.
- Source of truth updated: `docs/README.md`, `docs/framefield-overview.md`, `docs/element-implementation.md`, `docs/development-workflow.md`, dan `docs/documentation-audit.md`.
- Follow-up: Saat elemen pertama dimulai, buat package asset dan `design.md` berdasarkan kontrak ini.

### 2026-08-05 — Selected Works / 04 shipped

- Type: Added
- Area: Product | UI | Asset pipeline
- Decision: Menambahkan satu template section `Selected Works` ke Library, lalu empat child detail page fictional: Material Office, Signal House, Quiet Form, dan Ritual Objects.
- Reason: Framefield membutuhkan showcase yang lebih rare daripada katalog placeholder, sekaligus contoh bagaimana section dan visual dapat dirakit menjadi full website direction.
- Source of truth updated: `library/sections/selected-works/metadata.ts`, `library/sections/selected-works/design.md`, `src/app/page.tsx`, `src/app/library/sections/selected-works/`, dan docs terkait.
- Follow-up: Disupersesi untuk visual dan identitas project oleh entry 2026-08-09; route contract satu template tetap dipertahankan.

### 2026-08-05 — Selected Works consolidated into one section template

- Type: Changed
- Area: Product | UI | Asset pipeline
- Decision: Mengganti empat catalog entry dan root route `/works/<slug>` menjadi satu asset `Selected Works` di Library dengan child route `/library/sections/selected-works/<slug>`.
- Reason: Empat project adalah konten dari satu template section works, bukan empat template yang dijual atau dipreview secara terpisah.
- Source of truth updated: `library/sections/selected-works/metadata.ts`, `library/sections/selected-works/design.md`, `src/app/library/sections/selected-works/`, dan `src/app/page.tsx`.
- Follow-up: Root route lama dan registry terpisah telah dihapus; package ini mengikuti kontrak asset section Framefield.

## 8. Current audit result

Per 2026-08-09:

- Homepage shell sudah ada.
- Catalog masih berisi placeholder untuk asset lain; Material Office sudah menjadi asset live pertama.
- Selected Works tersedia sebagai satu template di Library, dengan empat static-generated child route, delapan visual WebP lokal, dan preview project index editorial terang.
- Material Office memiliki package, poster fallback, metadata, catalog entry, source, dan full preview route yang sudah diverifikasi.
- Automated WebP recording pipeline belum ada; Material Office sudah memiliki recording source dan catalog WebP hasil proses manual.
- CMS, upload, auth, payment, dan source delivery backend belum masuk scope.
- Video recording katalog untuk Selected Works belum masuk scope; halaman memakai WebP raster studies yang ringan dan full-preview ready.
- Dokumen baru sudah memisahkan product overview, element contract, workflow, dan audit rules agar tidak saling mengulang.

### 2026-08-05 — Material Office menu became an Editorial Index

- Type: Changed
- Area: UI
- Decision: Mengganti daftar link menu yang terpusat dengan index bernomor, utilitas ringkas, dan material poster strip yang responsif.
- Reason: Menyatukan overlay menu dengan bahasa visual hero tanpa menambah card atau CTA baru yang tidak diperlukan.
- Source of truth updated: `library/sections/material-office/design.md`, `library/sections/material-office/source/MaterialOffice.tsx`, dan `library/sections/material-office/source/material-office.css`.
- Follow-up: Status video/WebP kemudian diselesaikan pada entry `Material Office hero video integrated` dan `Material Office catalog preview recorded`.

### 2026-08-05 — Material Office desktop menu became a right drawer

- Type: Changed
- Area: UI
- Decision: Pada desktop, menu berpindah dari overlay full canvas menjadi drawer kanan `34vw` dengan batas lebar `520px`; menu mobile tetap full-screen.
- Reason: Hero tetap menjadi visual utama dan drawer menjadi control surface yang lebih ringkas.
- Source of truth updated: `library/sections/material-office/design.md`, `library/sections/material-office/source/MaterialOffice.tsx`, dan `library/sections/material-office/source/material-office.css`.
- Follow-up: Status video/WebP kemudian diselesaikan pada entry `Material Office hero video integrated` dan `Material Office catalog preview recorded`.

### 2026-08-05 — Material Office drawer control and hover refinement

- Type: Changed
- Area: UI
- Decision: Tombol close desktop dirapikan ke pojok kanan atas drawer; hover menu hanya mengubah label teks saat pointer berada di atas bounding box text, tanpa menggeser sequence number, row, atau poster strip.
- Reason: Posisi close sebelumnya mengikuti kolom indeks yang disembunyikan, sementara feedback row-level terasa terlalu lebar.
- Source of truth updated: `library/sections/material-office/design.md`, `library/sections/material-office/source/MaterialOffice.tsx`, `library/sections/material-office/source/material-office.css`, dan `tests/material-office.test.mjs`.
- Follow-up: Tidak ada fitur yang dibuang dari scope produk; hanya motion hover yang dipersempit dan kontrak test diperbarui agar sesuai perilaku final.

### 2026-08-05 — Material Office drawer close animation

- Type: Changed
- Area: Motion
- Decision: Drawer menu sekarang memiliki exit transition ke kanan sebelum layer ditutup.
- Reason: Membuat arah masuk dan keluar konsisten pada tombol close, Escape, click-away, dan klik link.
- Source of truth updated: `library/sections/material-office/source/MaterialOffice.tsx`, `tests/material-office.test.mjs`, dan `library/sections/material-office/design.md`.
- Follow-up: Tidak ada perubahan route, metadata, atau konten menu.

### 2026-08-05 — Material Office back control polish

- Type: Changed
- Area: UI
- Decision: Mengganti back control kecil dengan compact glass pill dan icon panah kiri yang lebih semantik.
- Reason: Mark `↗` sebelumnya terlihat seperti elemen dekoratif yang melayang, bukan navigasi kembali.
- Source of truth updated: `library/sections/material-office/source/MaterialOffice.tsx`, `library/sections/material-office/source/material-office.css`, `tests/material-office.test.mjs`, dan `library/sections/material-office/design.md`.
- Follow-up: Destination tetap `/#library`; tidak ada perubahan routing.

### 2026-08-05 — Material Office hero video integrated

- Type: Added
- Area: Asset pipeline
- Decision: Menambahkan video Google Flow yang sudah dikompres, tanpa audio, sebagai `hero-video.mp4` dan `hero-video.webm`; `HERO_VIDEO.available` diaktifkan.
- Reason: Preview route sekarang memiliki motion asset final, sementara poster tetap dibutuhkan sebagai fallback.
- Source of truth updated: `public/library/sections/material-office/hero-video.mp4`, `public/library/sections/material-office/hero-video.webm`, `library/sections/material-office/source/MaterialOffice.tsx`, dan `library/sections/material-office/design.md`.
- Follow-up: Selesai pada 2026-08-05; `preview.mp4` dan `preview.webp` sudah masuk ke package Material Office.

### 2026-08-05 — Material Office hero wordmark alignment

- Type: Changed
- Area: UI
- Decision: Menggeser lockup hero sedikit ke kiri dan memakai optical inset lebih kecil pada `OFFICE` agar batas visualnya sejajar dengan `INDEPENDENT DESIGN PRACTICE`.
- Reason: Box CSS hero belum sama dengan tepi glyph yang terlihat, dan side-bearing glyph `M` dan `O` tidak sama.
- Source of truth updated: `library/sections/material-office/source/material-office.css`, `tests/material-office.test.mjs`, dan `library/sections/material-office/design.md`.
- Follow-up: Tidak ada perubahan route, metadata, media, atau kontrak preview.

### 2026-08-05 — Next.js development cache isolation

- Type: Fixed
- Area: Build/runtime
- Decision: `next dev` memakai `.next-dev`, sementara production build/start tetap memakai `.next`.
- Reason: Dev server dan production build sebelumnya dapat menulis folder `.next` yang sama dan menghasilkan runtime Webpack yang merujuk chunk yang belum tersedia.
- Source of truth updated: `next.config.mjs`, `tests/next-cache-isolation.test.mjs`, dan bagian Validation di `docs/development-workflow.md`.
- Follow-up: Cache lama dipindahkan ke folder `.next-stale-*` dan `.next-dev-stale-*` yang dapat dihapus setelah tidak diperlukan.

### 2026-08-05 — Material Office hero entrance stagger

- Type: Changed
- Area: Motion
- Decision: Menambahkan staggered entrance untuk navbar, superline, wordmark, services, supporting copy, availability, dan back control dengan reduced-motion fallback.
- Reason: Memberi urutan visual yang lebih terarah saat full preview pertama kali dibuka tanpa menggerakkan background video.
- Source of truth updated: `library/sections/material-office/source/MaterialOffice.tsx`, `tests/material-office.test.mjs`, dan `library/sections/material-office/design.md`.
- Follow-up: Menu overlay tetap memakai sequence motion terpisah; tidak ada perubahan route atau asset.

### 2026-08-05 — Material Office catalog preview recorded

- Type: Added
- Area: Asset pipeline
- Decision: Menambahkan `preview.mp4` sebagai package source dan `preview.webp` sebagai discovery preview ringan untuk kartu katalog Material Office.
- Reason: Full preview route sudah siap direcord dan metadata memang mengarah ke `preview.webp`.
- Source of truth updated: `public/library/sections/material-office/preview.mp4`, `public/library/sections/material-office/preview.webp`, `library/sections/material-office/design.md`, dan `docs/framefield-overview.md`.
- Follow-up: Review visual final pada kartu katalog; tidak perlu mengubah source route.

### 2026-08-05 — Material Office catalog card preview wiring

- Type: Fixed
- Area: Catalog rendering
- Decision: Menghubungkan `materialOfficeAsset.previewVideo` ke `AssetCard` dan memakai `materialOfficeAsset.preview` sebagai fallback image.
- Reason: Kartu katalog sebelumnya masih hardcode ke `hero-poster.webp`, sehingga `preview.mp4` yang sudah tersedia tidak pernah dirender.
- Source of truth updated: `library/sections/material-office/metadata.ts`, `src/app/page.tsx`, dan `tests/material-office.test.mjs`.
- Follow-up: Video katalog tetap muted, looping, dan inline; route dedicated tidak berubah.

### 2026-08-05 — Material Office catalog circle removed

- Type: Fixed
- Area: Catalog rendering
- Decision: Menonaktifkan pseudo-element circle generik hanya pada `.thumbnail.material-office`.
- Reason: Circle tersebut adalah dekorasi sistem placeholder lama yang menimpa video preview.
- Source of truth updated: `src/app/globals.css`, `tests/material-office.test.mjs`, dan `library/sections/material-office/design.md`.
- Follow-up: Dekorasi placeholder untuk asset lain tidak berubah.

### 2026-08-05 — Documentation current-truth sync

- Type: Changed
- Area: Documentation
- Decision: Menyelaraskan overview, element contract, workflow, Material Office design contract, dan audit result dengan implementasi preview video yang sudah live.
- Reason: Beberapa dokumen masih menggambarkan `preview/preview.webp`, belum mengenal `previewVideo`, atau menyebut recording sebagai deferred.
- Source of truth updated: `docs/README.md`, `docs/framefield-overview.md`, `docs/element-implementation.md`, `docs/development-workflow.md`, `library/sections/material-office/design.md`, dan `docs/documentation-audit.md`.
- Follow-up: Plan/spec di `docs/superpowers/` dipertahankan sebagai snapshot historis dan tidak digunakan sebagai current truth.

### 2026-08-06 — Selected Works light editorial rework

- Type: Changed
- Area: UI | Documentation
- Decision: Preview `Selected Works` dirework menjadi project index editorial terang: header utilitas, masthead `Works.`/`©2026`, title rail putih, dan grid media dua kolom.
- Reason: Menyelaraskan template dengan ritme dan hierarchy dua referensi yang diberikan tanpa menjadikan empat work sebagai entry katalog terpisah.
- Source of truth updated: `library/sections/selected-works/source/SelectedWorks.tsx`, `library/sections/selected-works/source/selected-works.css`, dan `library/sections/selected-works/design.md`.
- Follow-up: Route contract, metadata, dan child detail pages tetap; validasi test, build, serta audit visual desktop/mobile diperlukan.

### 2026-08-09 — Selected Works raster editorial rebuild

- Type: Changed
- Area: UI | Asset pipeline | Documentation
- Decision: Mengganti empat nama fictional lama dan seluruh SVG study aktif dengan Cinder Bureau, Auralis, Stillhouse, serta Vela Objects; setiap project sekarang memakai cover dan detail WebP lokal. Index direkomposisi menjadi masthead `Projects.`/`©2026` dengan `(04)`, title rail, dan grid dua kolom yang masuk first viewport desktop. `Back to library` disatukan menjadi glass pill fixed yang mengikuti kontrak Material Office hero pada index dan child page.
- Reason: Menjadikan Selected Works sebagai template baru yang lebih dekat pada ritme editorial referensi, memakai visual raster original, dan menjaga navigation return konsisten di seluruh full preview.
- Source of truth updated: `library/sections/selected-works/design.md`, `library/sections/selected-works/metadata.ts`, `library/sections/selected-works/source/SelectedWorks.tsx`, `library/sections/selected-works/source/selected-works.css`, `tests/selected-works.test.mjs`, dan `public/library/sections/selected-works/`.
- Follow-up: Visual diverifikasi pada 1440×900 dan 390×844; tetap gunakan package ini untuk perubahan work berikutnya, bukan membuat empat catalog asset baru.

### 2026-08-09 — Selected Works art-directed archive detail redesign

- Type: Changed
- Area: UI | Motion | Documentation
- Decision: Mengubah child project page dari split hero, narrative biasa, dan two-column footer menjadi art-directed archive: offset title lockup, dominant lead field, metadata strip, story module asimetris, gallery/build module, dan archive navigation. Entrance dipecah per semantic chunk dengan Motion, `whileInView` sekali untuk section bawah, clip reveal untuk first viewport, dan reduced-motion fallback.
- Reason: Detail page masih terlalu dekat dengan komposisi referensi dan membutuhkan hierarchy yang lebih khas Framefield, dengan motion yang terasa staged tanpa jitter atau double blink.
- Source of truth updated: `library/sections/selected-works/design.md`, `library/sections/selected-works/source/SelectedWorks.tsx`, `library/sections/selected-works/source/selected-works.css`, `tests/selected-works.test.mjs`, dan `docs/superpowers/specs/2026-08-09-selected-works-archive-redesign-design.md`.
- Follow-up: Validasi desktop 1440×900 dan mobile 390×844 dilakukan setelah build; project routes tetap nested di section yang sama.

### 2026-08-10 — Selected Works section navbar removed

- Type: Changed
- Area: UI | Documentation
- Decision: Menghapus `PreviewHeader` dan seluruh style navbar dari overview serta child detail Selected Works. Navbar full preview sekarang menjadi pola khusus Hero; Selected Works tetap memakai `All projects`, archive navigation, dan universal `Back to library`.
- Reason: Section selain Hero tidak perlu mengulang navigation shell sehingga visual project menjadi fokus utama.
- Source of truth updated: `library/sections/selected-works/source/SelectedWorks.tsx`, `library/sections/selected-works/source/selected-works.css`, `library/sections/selected-works/design.md`, `docs/framefield-overview.md`, dan `tests/selected-works.test.mjs`.
- Follow-up: Tidak ada perubahan route, metadata, atau homepage catalog.

### 2026-08-10 â€” Selected Works masthead repositioned

- Type: Changed
- Area: UI | Documentation
- Decision: Mengubah masthead desktop menjadi komposisi tiga kolom: `(04)` berada rendah di kiri, `Projects.` berada di area tengah-kiri, dan `©2026` berdiri independen di kanan bawah. Mobile tetap memakai satu kolom.
- Reason: Posisi title dan year sebelumnya terlalu menyerupai referensi karena tersusun sebagai lockup terpusat; komposisi baru memberi signature layout yang lebih khas Framefield.
- Source of truth updated: `library/sections/selected-works/source/selected-works.css`, `library/sections/selected-works/design.md`, dan `tests/selected-works.test.mjs`.
- Follow-up: Tidak ada perubahan route, metadata, grid, atau child detail pages.

### 2026-08-10 â€” New element independence contract clarified

- Type: Changed
- Area: Documentation | Workflow
- Decision: Menetapkan bahwa setiap elemen baru adalah library package yang fresh dan mandiri. Referensi hanya menjadi acuan layout/inspirasi; identity, content, imagery, dan final composition wajib dibangun ulang. Universal `Back to library` tetap dipakai sebagai return control, sementara navbar untuk sementara hanya terintegrasi pada Hero.
- Reason: Mencegah implementasi elemen baru dianggap sebagai turunan Framefield atau replika referensi. Elemen seperti Pricing berikutnya harus memiliki ide, route, package, dan design contract sendiri.
- Source of truth updated: `docs/element-implementation.md`, `docs/development-workflow.md`, `docs/framefield-overview.md`, `docs/templates/element-design.md`, dan `docs/README.md`.
- Follow-up: Setiap intake referensi baru wajib mencatat bagian yang dipakai sebagai inspirasi, bagian yang dibuang, serta keputusan fresh pada `design.md` package terkait.

### 2026-08-10 â€” New element contract made strict

- Type: Changed
- Area: Documentation | UI | Content
- Decision: Menetapkan `Back to library` sebagai satu-satunya koneksi Framefield pada elemen baru. Brand identity, palette, logo, copy, imagery, homepage layout, dan asset lain tidak boleh ikut terbawa. Copy Selected Works yang menyebut `Framefield archive`, `Built from Framefield`, dan `created for Framefield` diubah menjadi copy independent concept.
- Reason: Menutup celah interpretasi bahwa elemen baru boleh tetap menjadi extension atau sub-brand Framefield.
- Source of truth updated: `library/sections/selected-works/metadata.ts`, `library/sections/selected-works/source/SelectedWorks.tsx`, `tests/selected-works.test.mjs`, dan docs terkait.
- Follow-up: Terapkan kontrak ini pada setiap package baru; `Homepage Pricing` dan `Pricing section` library tetap menjadi scope terpisah.

### 2026-08-10 — Material Office prompt CTA and R2 media

- Type: Added | Changed
- Area: UI | Asset pipeline | Documentation
- Decision: Mengganti CTA catalog `Get source` menjadi `Copy Prompt`; dedicated Material Office preview awalnya sempat menerima CTA yang sama, lalu keputusan itu dibatalkan pada audit berikutnya. Master prompt disimpan di package elemen dan dipublikasikan sebagai markdown. Hero MP4 1.81 MB di-upload ke R2 sebagai source utama.
- Reason: Elemen belum memiliki jalur prompt yang bisa langsung dipakai ulang, sementara source code belum menjadi delivery flow. R2 dipakai untuk media production tanpa memasukkan video besar ke runtime Worker.
- Source of truth updated: `src/app/page.tsx`, `library/sections/material-office/source/MaterialOffice.tsx`, `library/sections/material-office/source/material-office.css`, `library/sections/material-office/master-prompt.md`, `public/library/sections/material-office/master-prompt.md`, `library/sections/material-office/design.md`, dan `docs/framefield-overview.md`.
- Follow-up: Jika format master prompt berubah, sinkronkan file package dan file public sebelum deploy; setelah beberapa elemen tersedia, evaluasi ekstraksi CTA/prompt loader bersama.

### 2026-08-10 — Master prompt made standalone and code-first

- Type: Changed
- Area: Prompt product | Documentation
- Decision: Mengganti isi master prompt Material Office menjadi prompt rebuild code-first yang siap ditempel ke Lovable, Codex, atau AI coding agent lain. Prompt sekarang membawa canonical TSX, canonical CSS, exact DOM structure, class names, timing, easing, breakpoint, interaction logic, dan URL asset R2 yang sama dengan implementation.
- Reason: Pixel-perfect reproduction tidak dapat dicapai dari prose visual saja. Prompt harus membawa struktur kode dan asset source-of-truth sehingga agent lain dapat merekonstruksi lokasi, layout, dan motion secara exact tanpa repo Framefield.
- Source of truth updated: `library/sections/material-office/master-prompt.md`, `public/library/sections/material-office/master-prompt.md`, `library/sections/material-office/design.md`, dan `tests/material-office.test.mjs`.
- Follow-up: Master prompt elemen berikutnya wajib diperlakukan sebagai artefak standalone code-first; setiap prompt harus menyertakan exact asset mapping dan canonical source code, sementara detail katalog tetap dicatat di docs/implementation package.

### 2026-08-10 — Material Office preview CTA removed

- Type: Fixed | Changed
- Area: UI | Prompt product | Documentation
- Decision: Menghapus `Copy Prompt` dari dedicated Material Office preview. CTA hanya hidup di kartu katalog Framefield, yang sekarang mengambil isi master prompt publik secara langsung. Master prompt canonical juga dibersihkan dari clipboard logic dan CTA katalog.
- Reason: CTA katalog adalah wrapper milik Framefield, bukan bagian dari section standalone yang akan direbuild oleh user lain.
- Source of truth updated: `library/sections/material-office/source/MaterialOffice.tsx`, `library/sections/material-office/source/material-office.css`, kedua salinan `master-prompt.md`, `src/app/page.tsx`, `library/sections/material-office/design.md`, `docs/framefield-overview.md`, dan `tests/material-office.test.mjs`.
- Follow-up: Section prompt berikutnya wajib memisahkan implementasi section dari fitur delivery milik katalog.

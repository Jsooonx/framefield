# Framefield Overview

## 1. Ringkasan produk

Framefield adalah curated library untuk modern builders: art-directed website builds, reusable sections, visual assets, prompts, dan production-ready source code.

Janji utamanya:

> Help modern builders find a better starting point, then ship faster.

Framefield bukan template dump dan bukan AI agency. Nilainya ada pada titik awal yang sudah punya taste, arah visual, dan jalur implementasi yang jelas.

## 2. Audiens utama

- Indie hackers dan founders yang sedang meluncurkan produk.
- Frontend developers yang membutuhkan starting point visual dan teknis.
- Designers yang memakai AI untuk eksplorasi dan pembangunan website.
- Freelancers dan agencies yang perlu membangun client site dengan cepat tanpa mulai dari nol.

Pengunjung harus merasa confident, inspired, dan ready to start—bukan kewalahan oleh katalog yang tidak dikurasi.

## 3. Website yang sudah berjalan

Saat ini website masih berbentuk single-page homepage di `src/app/page.tsx` dengan urutan:

1. **Hero** — positioning, headline, category ticker, dan CTA utama.
2. **Library** — filter, search, empty/placeholder catalog, dan asset card shell.
3. **Homepage Pricing** — penjelasan free vs premium dan CTA library untuk landing page Framefield.
4. **Footer** — brand closing, navigasi, dan back-to-top.

Selected Works adalah satu template section di dalam Library. Ia menampilkan empat fictional case studies di full preview dan menjadi pintu masuk ke child route `/library/sections/selected-works/<slug>`.

Komponen utama yang sudah ada:

- `Navigation`
- `Hero`
- `Library`
- `AssetCard`
- `Pricing`
- `Footer`
- `RollingText` untuk CTA per-letter
- `TypeTicker` untuk kategori website di hero
- `library/sections/selected-works/metadata.ts` sebagai source of truth untuk empat child project fictional
- Frame dan section reveal motion

## 4. Status pengembangan

| Area | Status | Catatan |
| --- | --- | --- |
| Rebrand Stackframe → Framefield | Selesai | Nama, positioning, metadata, dan visual identity sudah diganti. |
| Homepage editorial shell | Selesai | Hero, navigation, library, pricing, dan footer tersedia. |
| Lichen Editorial color palette | Selesai | Palette aktif dipakai di `src/app/globals.css`. |
| Framefield logo mark | Selesai | Asset berada di `public/framefield-mark.png`. |
| Placeholder catalog | Selesai sementara | Catalog berisi placeholder entries agar bentuk katalog dapat diuji tanpa template final. |
| Empty/placeholder states | Selesai | Card menampilkan `Coming soon` dan `Preview soon` sesuai status; source CTA sudah dikonversi menjadi `Copy Prompt`. |
| CTA hover motion | Selesai | Semua CTA utama memakai per-letter rolling track dan contrast color swap. |
| Dedicated route per element | Selesai (asset pertama) | Material Office tersedia di `/library/sections/material-office`. |
| Asset package per element | Selesai (asset pertama) | Material Office memiliki references, design contract, source, metadata, dedicated route, poster fallback, dan catalog media di `library/sections/material-office/`. |
| Full preview recording → WebP | Selesai (asset pertama) | Material Office memiliki `preview.webp` sebagai fallback katalog dan `preview.mp4` sebagai live catalog preview source. |
| Selected Works template section | Selesai | Library memiliki satu asset card `Selected Works` yang membuka full preview section. |
| Fictional case-study child routes | Selesai | Empat route project berada di bawah `/library/sections/selected-works/<slug>` dan static-generated saat build. |
| Prompt copy flow | Selesai (asset pertama) | Catalog card Material Office menyediakan CTA `Copy Prompt` yang mengambil master prompt code-first; dedicated preview tidak membawa CTA katalog. |
| Source delivery/download flow | Belum dimulai | Belum ada backend, auth, licensing, atau payment flow. |
| CMS/admin input | Belum dimulai | Untuk fase awal, asset registry masih dikelola dari repository. |

## 5. Batasan scope saat ini

Yang termasuk scope saat ini:

- Website katalog Framefield.
- Section dan website implementation yang bisa dibuka full-screen.
- Preview ringan berbentuk WebP.
- Prompt dan visual assets sebagai tipe asset katalog.
- Dokumentasi desain dan implementasi per asset.
- Fictional case studies sebagai showcase terkurasi; ini bukan marketplace client work.

Yang belum termasuk scope:

- User account dan authentication.
- Seller marketplace atau upload dashboard.
- Payment dan subscription backend.
- Automated source-code packaging.
- CMS eksternal.
- Live collaboration.

Fitur yang masuk atau keluar dari scope harus dicatat di [Documentation Audit](./documentation-audit.md), bukan hanya disebut di chat.

## 6. Keputusan desain yang sudah dikunci

- Visual direction: dark, editorial, tool-like.
- Acid lime hanya sebagai accent dan action signal.
- Preview asset harus menjadi visual focus; shell katalog tidak boleh mengalahkan karya.
- Navbar full preview hanya dipakai oleh Hero; section preview lain tidak merender navbar section tambahan.
- Setiap elemen baru dibuat sebagai library package yang fresh dan mandiri. Referensi hanya menjadi acuan layout/inspirasi; identity, content, palette, imagery, logo, dan final composition harus dibangun ulang tanpa membawa bagian dari Framefield.
- Universal return control adalah satu-satunya koneksi Framefield pada elemen baru dan memakai label `Back to library`; navbar bukan bagian dari shell default dan untuk sementara hanya terintegrasi di Hero.
- `Homepage Pricing` dan `Pricing section` library adalah dua scope berbeda; asset library tidak otomatis mengambil isi atau layout dari homepage pricing.
- CTA feedback harus lokal, cepat, interruptible, dan menghormati reduced motion.
- Asset kosong boleh ditampilkan sebagai placeholder selama sistem katalog sedang disiapkan.
- Original Stackframe tetap dianggap project terpisah dan tidak menjadi target perubahan.
- Selected Works memakai delapan visual WebP fictional original (dua per case study) dan detail page archive dengan staggered Motion entrance, sehingga halaman dapat dipreview penuh tanpa SVG study atau dependensi remote.

Detail brand yang lebih lengkap tetap berada di [Brand Foundation](../branding.md); dokumen ini hanya menyimpan keputusan yang dibutuhkan untuk memahami product scope dan status.

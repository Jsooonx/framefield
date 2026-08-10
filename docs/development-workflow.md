# Framefield Development Workflow

Workflow ini adalah prosedur utama untuk pengembangan website dan asset library Framefield. Untuk scope/status product gunakan [Framefield Overview](./framefield-overview.md). Untuk detail package elemen gunakan [Element Implementation](./element-implementation.md). Jangan menyalin aturan dari dua dokumen itu ke sini.

## 1. Inspect

Sebelum mengubah apa pun:

1. Baca `AGENTS.md`, README, docs terkait, dan source yang akan disentuh.
2. Cek status worktree dan proses development yang sedang berjalan.
3. Cari implementation atau feature yang sudah ada dengan `rg` sebelum membuat pola baru.
4. Tentukan apakah perubahan menyentuh homepage shell, asset package, route, preview, atau dokumentasi.

## 2. Intake referensi elemen

Untuk elemen baru, input awal harus berupa:

- Screenshot atau image reference.
- Nama/jenis elemen jika sudah ada.
- Bagian yang ingin dipertahankan.
- Bagian yang ingin direbrand, dibangun ulang, atau dibuang.
- Target penggunaan: website, section, visual, atau prompt.

Kita bahas arah rebrand/rebuild sebelum source folder dibuat. Jangan langsung menganggap referensi sebagai brief final.

Aturan penting: elemen baru selalu dimulai sebagai library package yang fresh dan mandiri. Referensi dipecah menjadi acuan layout/inspirasi, bukan blueprint yang disalin. Sebelum lanjut, pastikan sudah jelas:

- identity, nama, copy, dan visual direction baru yang membedakan elemen dari referensi;
- layout atau interaction apa yang hanya dijadikan inspirasi;
- bagian yang sengaja dibuang agar hasil tidak menjadi replika;
- dedicated route dan package baru yang tidak bergantung pada homepage, asset lain, atau brand identity Framefield;
- penggunaan `Back to library` sebagai satu-satunya return control Framefield;
- tidak ada navbar pada section preview baru, kecuali elemen tersebut adalah Hero.

## 3. Design contract

Setelah arah disepakati:

1. Buat asset package sesuai [Element Implementation](./element-implementation.md).
2. Simpan semua referensi di `references/`.
3. Isi `design.md` dari [template](./templates/element-design.md).
4. Catat keputusan penting, batasan, dan definition of done.
5. Tunggu approval design contract sebelum implementasi.

## 4. Implement

Implementasi harus mengikuti design contract dan tetap terisolasi dari homepage shell selama memungkinkan.

- Gunakan source component dan styles di package elemen.
- Buat dedicated full preview route.
- Gunakan hanya return control universal `Back to library`; jangan menambahkan Framefield brand shell, logo, atau visual identity ke asset baru.
- Perlakukan return control sebagai kontrak navigasi bersama saja; visual, content, dan layout elemen tetap harus original.
- Jangan menambahkan navbar ke section preview selain Hero. Jika elemen baru adalah Hero, navbar boleh menjadi bagian dari design contract-nya.
- Jangan memasukkan elemen ke katalog sebagai published sebelum full preview stabil.
- Perubahan yang menambah/menghapus scope harus masuk [Documentation Audit](./documentation-audit.md).

### 4A. Workflow Selected Works

Untuk fictional case study, gunakan urutan berikut:

1. Tentukan identity, category, brief, visual direction, dan dua visual study.
2. Buat satu package section di `library/sections/selected-works/`; metadata menyimpan semua project record tanpa membuat asset registry terpisah.
3. Simpan visual study lokal di `public/library/sections/selected-works/<slug>/` dan pertahankan label fictional pada detail page.
4. Pastikan card template di Library hanya memberi micro-interaction lokal: preview image, action state, focus-visible, dan press feedback.
5. Pastikan detail page memiliki hierarchy hero → metadata → narrative → gallery → built-from → previous/next.
6. Uji semua slug dari registry, bukan hanya work yang sedang dibuka.

## 5. Preview dan recording

Setelah implementation selesai:

1. Buka dedicated route.
2. Cek desktop, mobile, focus/hover, dan reduced motion.
3. Record preview dari route yang sama.
4. Export `preview.webp` dan simpan di `public/library/sections/<slug>/`.
5. Jika recording video ingin dimainkan langsung di kartu, simpan juga `preview.mp4` dan isi field `previewVideo` di metadata.
6. Isi metadata dan hubungkan asset ke registry/catalog.
7. Pastikan kartu katalog membuka full preview yang sama dengan source.

Preview WebP bukan pengganti implementation. Jika keduanya berbeda, source route harus dianggap benar dan preview harus di-update.

## 6. Validation

Minimal validation sebelum handoff:

- Test focused untuk area yang berubah.
- Full test suite: `node --test tests/*.mjs`.
- Production build: `npm run build`.
- Smoke test route utama dan route preview.
- Smoke test `/library/sections/selected-works` beserta empat child route project-nya.
- Visual check pada desktop/mobile.
- Audit dokumentasi dan feature ledger.

Jangan menjalankan `npm run build` bersamaan dengan `npm run dev` karena keduanya dapat berbagi `.next`. Hentikan dev server sebelum production build, lalu jalankan satu dev server fresh setelah validasi selesai.

## 7. Documentation handoff

Setiap perubahan harus meninggalkan docs dalam keadaan bisa dipercaya:

1. Update source-of-truth document.
2. Tandai fitur sebagai shipped, in progress, planned, proposed, out of scope, atau archived.
3. Catat fitur yang dibuang atau ditunda di [Documentation Audit](./documentation-audit.md).
4. Hapus paragraf lama yang sudah obsolete.
5. Cari link dan istilah yang rusak dengan `rg`.
6. Hand off file yang berubah, validasi yang dijalankan, dan status runtime.

## 8. Handoff format

Handoff singkat harus menyebut:

- Outcome yang selesai.
- File utama yang berubah.
- Route yang bisa diuji.
- Test/build yang pass atau gagal.
- Fitur yang sengaja belum dibuat.
- Dokumentasi yang di-update.

## 9. Cairn

Sync Cairn memory hanya mengikuti `.cairn.json` dan workflow repository yang berlaku. Jangan membuat memory/project state baru sebagai bagian dari perubahan biasa jika konfigurasi project tidak memintanya.

# Element Implementation

Dokumen ini mendefinisikan kontrak untuk setiap asset yang akan masuk ke library Framefield. Fokusnya adalah full preview yang dapat dibuka sendiri, bukan sekadar thumbnail atau potongan code di halaman katalog.

## 0. Kontrak independensi elemen baru

Setiap elemen baru adalah package library yang fresh dan mandiri. Elemen tersebut tidak dianggap sebagai turunan dari homepage Framefield, section sebelumnya, atau brand pada referensi. Contoh: `Pricing` berikutnya akan menjadi ide dan implementation pricing baru di package sendiri, bukan lanjutan dari pricing homepage.

Referensi hanya menjadi acuan untuk layout, hierarchy, ritme, interaction, atau visual mood yang telah disepakati. Jangan menyalin brand, nama, copy, imagery, asset, komposisi persis, spacing persis, atau behavior persis dari referensi. Setiap package wajib memiliki identity, content direction, dan layout decisions sendiri.

Kontrak yang berlaku untuk semua elemen baru:

- Buat library package dan dedicated route baru untuk elemen tersebut.
- Jangan otomatis menambahkan elemen ke homepage atau menghubungkannya dengan package lain.
- Gunakan satu-satunya koneksi universal ke Framefield: return control berlabel `Back to library` untuk kembali ke katalog.
- Jangan membawa brand identity, copy, palette, imagery, logo, atau layout homepage Framefield ke dalam elemen baru.
- Jangan menambahkan navbar ke preview section kecuali elemen tersebut memang Hero; untuk sementara navbar adalah integrasi khusus Hero.
- Detail exception, dependency, dan keputusan rebrand harus ditulis di `design.md` package tersebut.

## 1. Tipe elemen

Framefield mengenal empat tipe asset:

| Tipe | Contoh | Output utama |
| --- | --- | --- |
| `website` | Full landing page atau complete website build | Full preview + source implementation |
| `section` | Hero, about, work, pricing, testimonials, footer | Full preview section + reusable source |
| `visual` | Background, poster, art direction, visual prompt | Preview image/WebP + source prompt/asset |
| `prompt` | Prompt untuk menghasilkan atau memodifikasi design | Copyable prompt + visual reference bila ada |

`section` adalah unit pertama yang paling cocok untuk pipeline awal karena ukurannya terukur dan mudah direcord. Beberapa section hanya boleh dikomposisikan menjadi `website` jika ada scope website build yang disetujui secara eksplisit; package section tidak saling bergantung secara default.

`Pricing` pada homepage adalah landing-page pricing shell untuk produk Framefield. `Pricing section` di library adalah asset baru yang berbeda, dengan ide, package, route, dan design contract sendiri.

## 1A. Selected Works / fictional case studies

`4 Selected Works (1)` adalah satu template section portfolio dengan empat project fictional sebagai child page, bukan empat asset catalog terpisah. Metadata dan project registry hidup di `library/sections/4-selected-works-1/metadata.ts`; preview route berada di `src/app/library/sections/4-selected-works-1/page.tsx`; visual study lokal berada di `public/library/sections/4-selected-works-1/<slug>/`. Folder dan R2 prefix memakai nama URL-safe `4-selected-works-1`, sementara title yang tampil tetap `4 Selected Works (1)`.

Setiap work memiliki child detail page di `/library/sections/4-selected-works-1/<slug>` yang memuat brief, direction, stack, visual study, komponen yang dipakai oleh package, serta link previous/next. Label `Fictional case study` wajib dipertahankan agar showcase tidak disalahpahami sebagai client work.

## 1B. NORTHSTAR Testimonials / fictional proof section

`NORTHSTAR Testimonials` adalah satu section proof dengan overview route `/library/sections/northstar-testimonials` dan satu fictional Atlas House detail route. Overview menyatukan bento testimonial dan metrics story inline; tidak ada navbar atau footer. Metadata, fictional content, source, dan route hidup di `library/sections/northstar-testimonials/`.

Package ini memakai empat WebP original untuk full preview dan `preview.mp4` untuk live catalog preview. Kelima visual asset dipublikasikan ke R2 pada `sections/northstar-testimonials/`; master prompt code-first tersedia di package/public path dan tidak masuk R2.

## 2. Struktur asset package

Struktur yang direkomendasikan:

```text
library/
  sections/
    hero-editorial/
      design.md
      references/
        reference-01.png
        reference-02.png
      source/
        Section.tsx
        styles.css
        assets/
      metadata.ts
public/
  library/
    sections/
      hero-editorial/
        preview.webp
        preview.mp4       # optional live catalog preview
        hero-poster.webp  # optional implementation fallback
```

Source, references, design contract, dan metadata hidup di package `library/`. File yang harus dikirim browser hidup di `public/library/`; katalog image dan video memakai path publik yang sama.

### Tanggung jawab tiap bagian

- `design.md` — design contract dan keputusan yang disetujui sebelum coding.
- `references/` — screenshot, image reference, atau material visual yang menjadi dasar pembahasan.
- `source/` — implementation asset yang benar-benar dirender oleh full preview route.
- `public/library/sections/<slug>/preview.webp` — pola file ringan yang umum dipakai sebagai fallback/kartu katalog; implementasi dapat memakai file image lain selama `metadata.preview` menunjuk ke fallback yang benar.
- `public/library/sections/<slug>/preview.mp4` — optional video recording untuk kartu katalog yang mendukung live preview.
- `metadata.ts` — informasi yang dibutuhkan registry/katalog: slug, title, type, tags, status, preview path, dan source availability.

## 3. Full preview route

Setiap asset yang memiliki implementation harus dapat dibuka melalui route sendiri:

```text
/library/<type>/<slug>
```

Contoh:

```text
/library/sections/hero-editorial
/library/websites/saas-launch-01
```

Full preview route harus:

- Merender implementation asli, bukan screenshot yang dibesarkan.
- Menampilkan asset sebagai pengalaman utuh dalam viewport.
- Memiliki action universal `Back to library`.
- Tetap usable pada desktop dan mobile viewport.
- Tidak membawa toolbar katalog, filter, atau pricing section ke dalam preview.
- Tidak merender navbar section secara default; navbar hanya dipakai oleh Hero untuk sementara.
- Menyediakan state yang stabil untuk proses recording.

Shell preview boleh memakai wrapper ringan untuk navigasi, tetapi visual asset harus tetap menjadi fokus utama.

## 4. Metadata contract

Minimal metadata untuk satu asset:

```ts
export const asset = {
  slug: "hero-editorial",
  title: "Hero Editorial",
  type: "section",
  category: "Hero",
  status: "draft",
  access: "Free",
  tags: ["editorial", "hero", "dark"],
  preview: "/library/sections/hero-editorial/preview.webp", // required catalog fallback image; filename may differ
  previewVideo: "/library/sections/hero-editorial/preview.mp4", // optional
  sourceAvailable: true,
};
```

Nilai `status` yang dipakai:

- `draft` — sedang dibangun dan belum masuk katalog publik.
- `review` — implementation sudah ada, menunggu visual/technical QA.
- `published` — full preview, catalog fallback image, metadata, dan dokumentasi sudah lengkap.
- `archived` — tidak ditampilkan di katalog aktif, tetapi source dan sejarahnya dipertahankan.

Jangan menambahkan field baru ke setiap `metadata.ts` tanpa memperbarui kontrak registry dan dokumentasi audit.

`sourceAvailable: true` berarti implementation dan/atau standalone prompt tersedia di repository. Ini tidak berarti source sudah dapat diunduh user dan tidak mencakup licensing, authentication, payment, atau delivery backend. Nilai `access` yang valid adalah `Free` atau `Premium`.

## 5. Design contract sebelum implementasi

Sebelum `source/` dibuat, `design.md` harus menjelaskan:

- Apa yang menjadi referensi.
- Apa yang dipertahankan.
- Apa yang direbrand atau dibuang.
- Struktur visual dan hierarchy.
- Typography, color, spacing, dan shape.
- Copy/content direction.
- Responsive behavior.
- Interaction dan motion.
- Definition of done.

Gunakan [Element Design Template](./templates/element-design.md). Design contract harus disetujui sebelum implementation dimulai agar coding tidak berubah menjadi interpretasi tanpa batas.

## 6. Preview recording contract

Setelah implementation stabil:

1. Buka dedicated route.
2. Pilih viewport target dan scroll sequence.
3. Record visual tanpa browser chrome.
4. Export catalog fallback image dengan ukuran yang cukup untuk kartu katalog; `preview.webp` adalah konvensi umum, bukan nama file wajib jika `metadata.preview` menunjuk ke image lain.
5. Jika kartu memakai live preview, simpan recording sebagai `preview.mp4` di folder publik asset.
6. Hubungkan `preview` dan optional `previewVideo` di `metadata.ts`.
7. Buka kartu katalog dan pastikan preview click-through ke full route.

File WebP adalah discovery preview, bukan source of truth implementation. Jika preview berbeda dengan full route, full route dan source harus dianggap benar lalu WebP harus direcord ulang.

## 7. Definition of done

Satu asset dapat disebut `published` jika:

- `design.md` lengkap dan sesuai dengan implementation.
- Semua reference file tersimpan di folder asset.
- Dedicated full preview route bisa dibuka langsung.
- Jika asset berupa `4 Selected Works (1)`, satu route preview `/library/sections/4-selected-works-1` dan seluruh child route project harus tersedia dari package yang sama.
- Mobile dan desktop preview sudah dicek.
- Universal `Back to library` tersedia sebagai satu-satunya koneksi ke Framefield.
- `metadata.preview` menunjuk ke catalog fallback image yang tersedia dan tidak rusak.
- Metadata terdaftar di registry.
- Source availability dan access state jelas.
- Test/build lulus.
- Perubahan fitur atau keputusan baru sudah masuk documentation audit.

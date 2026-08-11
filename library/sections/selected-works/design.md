# Selected Works — Design Contract

## Intent

`4 Selected Works (1)` adalah satu template section portfolio. Ia merender index empat project dan menyediakan halaman detail untuk tiap project di dalam route section yang sama. Empat project adalah konten demonstratif, bukan empat template terpisah dan bukan client work.

## Reference

- `references/reference-project-index.png` — hierarchy judul project besar dan card visual dua kolom.
- `references/reference-project-grid.png` — ritme editorial antara label project, visual, dan navigasi.

## Rebrand direction

- Preview adalah project index editorial terang tanpa navbar section: masthead `Projects.` dengan `©2026`, penanda `(04)`, lalu grid empat project dua kolom. Pada desktop, `(04)` duduk rendah di kiri, `Projects.` mengunci area tengah-kiri, dan `©2026` berdiri terpisah di kanan bawah supaya komposisinya tidak mengikuti title/year stack referensi. Di mobile, masthead runtuh menjadi satu kolom. Navbar hanya menjadi bagian dari Hero. Entry katalog memakai preview video `public/library/sections/selected-works/preview.mp4`.
- Pada desktop 1440×900, title rail dan awal visual pertama harus sudah masuk first viewport. Pada mobile 390×844, grid berubah menjadi satu kolom tanpa horizontal overflow.
- Setiap project memakai title rail putih tipis di atas visual; hover hanya memperkuat veil, zoom media sedikit, dan mengangkat lockup pada card terkait. Rail dan seluruh row tidak ikut berubah.
- Surface memakai off-white, tipografi hampir hitam, outline media hitam transparan, dan radius hanya untuk menyatukan rail dengan media. Tidak ada identitas atau copy dari referensi.
- Keempat project adalah fictional case studies baru: Cinder Bureau, Auralis, Stillhouse, dan Vela Objects. Detail page memperluas narasi, metadata, gallery, dan tautan ke library tanpa mengubahnya menjadi empat asset catalog.
- Detail page memakai arah `art-directed case study archive`: title lockup offset dengan nomor archive, lead image sebagai dominant visual field, metadata strip, story module asimetris, lalu gallery/build module dan archive navigation.

## Visual asset contract

- Setiap project memiliki dua visual raster original: cover dan detail.
- Aset live wajib berupa WebP di `public/library/sections/selected-works/<slug>/visual-01.webp` dan `visual-02.webp`.
- Visual tidak boleh membawa teks, logo, UI, watermark, atau dependensi remote. SVG studies lama bukan bagian dari implementasi aktif.
- Cinder Bureau memakai graphite rubbing, deckled paper, mineral dust, dan thread vermilion; Auralis memakai acrylic prism dan optical membrane cyan; Stillhouse memakai fragment arsitektur plaster/basalt; Vela Objects memakai lacquer merah, ceramic forms, dan shadow keras.

## Route contract

```text
/library/sections/selected-works
/library/sections/selected-works/cinder-bureau
/library/sections/selected-works/auralis
/library/sections/selected-works/stillhouse
/library/sections/selected-works/vela-objects
```

`/library/sections/selected-works` adalah full preview utama. Halaman project adalah child page dari template itu, bukan entry katalog masing-masing.

## Interaction and motion

- Overlay nama project dan zoom ringan hanya muncul saat hover/focus pada media card terkait; title rail tidak ikut berubah.
- `Open project` dan `View project` memberi feedback lokal; tidak ada cursor custom atau hover satu row penuh.
- Detail gallery memakai zoom ringan; previous/next arrow hanya bergerak pada link terkait.
- `Back to library` selalu tersedia sebagai glass pill fixed di kanan bawah, memakai kontrak visual Material Office hero (lingkaran panah kiri, blur, dan active scale). Pada detail page, `All projects` tetap menjadi navigasi kontekstual ke index template.
- Selected Works tidak merender navbar; navigasi internal cukup memakai `All projects`, previous/next archive links, dan universal `Back to library`.
- Detail entrance dipecah menjadi context, archive index, title, summary, lead image, metadata, story, gallery/build, dan navigation. Bagian first viewport memakai opacity + translate yang tidak memotong glyph; bagian bawah memakai `whileInView` sekali dengan stagger 80–130ms.
- Lead dan detail image masuk dari scale `1.04` ke `1`; reduced motion mematikan perpindahan dan tetap mempertahankan keterbacaan.
- Reduced motion mematikan transform hover dan transition yang tidak esensial.

## Definition of done

- Satu asset catalog entry `4 Selected Works (1)` membuka preview section.
- Empat project muncul di preview dan setiap project membuka nested child route.
- Delapan visual WebP berada di `public/library/sections/selected-works/` dan seluruh metadata aktif mengarah ke aset tersebut.
- References, metadata, source, CSS, route, test, dan docs tersedia.
- Tidak ada `/works/<slug>` root route atau empat catalog card terpisah.

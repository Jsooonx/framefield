# Framefield Documentation

Dokumentasi Framefield dibagi berdasarkan tanggung jawab. Setiap keputusan hanya punya satu rumah utama supaya isi docs tidak berulang atau saling bertentangan.

## Peta dokumentasi

| Dokumen | Menjawab pertanyaan | Sumber kebenaran untuk |
| --- | --- | --- |
| [Framefield Overview](./framefield-overview.md) | Apa produk ini, bagaimana website-nya tersusun, dan sejauh mana progress-nya? | Product scope, current status, shipped vs planned |
| [Element Implementation](./element-implementation.md) | Bagaimana setiap section/visual/prompt dibangun dan dibuka sebagai full preview? | Asset package, route, metadata, preview contract |
| [4 Selected Works (1) Design Contract](../library/sections/4-selected-works-1/design.md) | Bagaimana satu template works dan empat child project-nya disusun? | Work identities, nested route contract, visual and interaction rules |
| [Development Workflow](./development-workflow.md) | Bagaimana proses kerja dari referensi sampai asset masuk katalog? | End-to-end delivery workflow |
| [Documentation Audit](./documentation-audit.md) | Bagaimana memastikan docs tetap akurat dan tidak mengulang? | Feature ledger, change log, review checklist |
| [Element Design Template](./templates/element-design.md) | Apa isi `design.md` untuk satu elemen? | Per-asset design brief |
| [Brand Foundation](../branding.md) | Bagaimana personality, voice, visual direction, dan guardrails Framefield? | Brand and design decisions |
| [Design Taste](./design-taste.md) | Detail rasa UI apa yang harus dipertahankan? | Interaction and polish principles |

Aturan inti untuk elemen baru: setiap elemen dibuat sebagai library package yang fresh dan mandiri. Satu-satunya koneksi ke Framefield adalah universal `Back to library`; elemen tidak membawa brand identity, copy, palette, imagery, atau layout homepage Framefield. Referensi hanya dipakai sebagai inspirasi layout/hierarchy, dan navbar untuk sementara hanya menjadi bagian dari Hero. Detail kontraknya ada di [Element Implementation](./element-implementation.md), dan langkah kerjanya ada di [Development Workflow](./development-workflow.md).

Dokumen di [`docs/superpowers/README.md`](./superpowers/README.md) menjelaskan status snapshot historis untuk plan/spec lama.

## Aturan sumber kebenaran

- Product scope dan status website dicatat di `framefield-overview.md`.
- Format asset dan full preview dicatat di `element-implementation.md`.
- Urutan kerja dicatat di `development-workflow.md`.
- Perubahan fitur, fitur yang dibuang, dan audit silang dicatat di `documentation-audit.md`.
- `branding.md` tetap menjadi sumber kebenaran brand; jangan menyalin seluruh brand guide ke docs lain.
- Detail visual satu elemen hanya dicatat di folder elemen tersebut, dalam `design.md`.

Jika sebuah informasi tidak tahu harus ditaruh di mana, tambahkan ke dokumen yang paling dekat dengan pertanyaannya, lalu tambahkan link ke dokumen itu dari index ini. Jangan menyalin paragraf yang sama ke beberapa file.

## Status dokumentasi

Dokumen-dokumen ini menjadi sistem kerja aktif untuk pengembangan asset Framefield. Material Office adalah implementasi Hero pertama dan `4 Selected Works (1)` adalah template works pertama; keduanya mengikuti kontrak package, route, metadata, asset, prompt, dan audit yang sama.

Dokumen di `docs/superpowers/plans/` dan `docs/superpowers/specs/` adalah snapshot historis dari keputusan sebelum implementasi. Jika isinya berbeda dengan status terbaru, gunakan `framefield-overview.md`, `element-implementation.md`, asset `design.md`, dan `documentation-audit.md` sebagai current truth.

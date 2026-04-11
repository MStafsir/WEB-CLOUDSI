Lanjutan Batch 1-3. Komponen global sudah tersedia.
Fokus batch ini: tiga halaman konten.

=== TUGAS BATCH INI ===

TUGAS 1 — Buat src/pages/tentang.astro + src/components/sections/Timeline.astro

  Halaman Tentang — Konsep Visual:
    "Perjalanan Cloudsi seperti langit yang terus bergerak — 
     setiap momen terekam, setiap langkah bermakna."
    
  Hero section halaman:
    - Judul: "Tentang Cloudsi"
    - Subjudul: "Sejak 4 Agustus 2025"
    - Background: canvas WebGL sama (sudah global)
    - Tinggi: 50vh (bukan fullscreen)
    
  Timeline Component:
    Tata letak: Garis vertikal di tengah (desktop) / kiri (mobile)
    Garis: 2px, gradient dari --color-water-light ke --color-accent-gold
    
    Tiap entry timeline:
      - Posisi: alternating kiri-kanan (desktop), semua kanan (mobile)
      - Glass card container dengan border --glass-border
      - Tanggal: --color-accent-gold, font-display, italic
      - Judul: white, font-display, 1.3rem
      - Deskripsi: opacity 0.7, font-body
      - Dot di garis: 12px circle, --color-water-light, pulsing animation
      
    Animasi timeline:
      - Garis: stroke-dasharray animation (menggambar garis dari atas ke bawah)
      - Tiap card: slide-in dari kiri/kanan, trigger ScrollTrigger
      - Dot: scale 0→1 saat card masuk
      
    Data dari Supabase: getTimeline()
    Fallback jika kosong: tampilkan hanya "4 Agustus 2025 — Cloudsi Berdiri"
    
  Visi & Misi section:
    - 2 glass card berdampingan
    - Card Visi: icon langit ✦, heading "Visi"
    - Card Misi: icon air ◈, heading "Misi" + list poin-poin
    - Konten: [PLACEHOLDER — diisi admin kemudian]

TUGAS 2 — Buat src/pages/galeri.astro + Masonry Grid Component

  Layout galeri: Masonry grid (bukan grid biasa)
    Implementasi: CSS columns (bukan JavaScript masonry)
    column-count: 4 (desktop) / 3 (tablet) / 2 (mobile)
    column-gap: 12px
    
  Tiap foto:
    - Glass overlay dengan opacity 0 → visible on hover
    - Hover: zoom 1.03, overlay muncul dengan nama event
    - Klik: buka lightbox (lihat di bawah)
    - border-radius: 12px
    - margin-bottom: 12px (CSS columns trick)
    
  Lightbox:
    - Full-screen overlay glass dark (--color-sky-deep opacity 0.95)
    - Foto centered, max 90vw × 85vh
    - Tutup: klik overlay / tombol X / Escape key
    - Navigasi: tombol panah prev/next
    - Caption: nama event di bawah foto
    - Animasi buka: scale 0.8→1 + fade-in, 300ms
    - Implementasi: pure JavaScript (tanpa library eksternal)
    
  Filter tab per event:
    - Tab horizontal scroll (mobile friendly)
    - Glass pill buttons
    - Active state: --color-water-surface background
    - Filter: JavaScript DOM manipulation (tampilkan/sembunyikan item)
    - Smooth: opacity + height transition saat filter

TUGAS 3 — Buat src/pages/acara.astro

  Layout: Card grid 3 kolom (desktop) / 2 (tablet) / 1 (mobile)
  
  Event Card:
    - Foto cover: aspect-ratio 16/9, object-fit cover
    - Glass info panel di bawah foto:
        - Tanggal: --color-accent-gold, 0.8rem
        - Judul event: font-display, 1.2rem
        - Deskripsi: 2 baris, text-overflow ellipsis
        - Tombol "Lihat Foto" → href ke galeri dengan filter event tersebut
    - Hover: card lift (translateY -4px), shadow lebih dalam
    
  Data dari Supabase: getEvents()
  Fallback empty state: glass card dengan pesan 
    "Acara akan segera ditambahkan"
    
  Sorting: terbaru di atas (sudah di-handle di getEvents())

=== ATURAN KETAT ===
1. Lightbox WAJIB: trap focus saat terbuka (aksesibilitas)
2. Lightbox WAJIB: menutup saat Escape key ditekan
3. Masonry grid TIDAK BOLEH menggunakan JavaScript untuk layout
   (pakai CSS columns saja — lebih performant)
4. Semua tanggal WAJIB diformat dalam Bahasa Indonesia:
   "4 Agustus 2025" bukan "2025-08-04"
   Gunakan: new Date(date).toLocaleDateString('id-ID', {
     day: 'numeric', month: 'long', year: 'numeric'
   })

=== OUTPUT YANG DIHARAPKAN ===
Seluruh isi semua file + checklist:
□ Timeline animasi tidak patah di mobile
□ Masonry grid bekerja tanpa JS layout
□ Lightbox accessible (keyboard navigable)
□ Empty states tersedia di semua halaman
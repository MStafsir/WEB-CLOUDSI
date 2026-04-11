Lanjutan dari Batch 1. Kamu sedang membangun layer WebGL dan sistem 
navigasi untuk Cloudsi Connect.

=== KONTEKS (Sudah Ada dari Batch 1) ===
- Design tokens sudah ada di src/styles/tokens.css
- BaseLayout.astro sudah ada dengan slot WaterRipple
- Library yang digunakan: ogl (bukan Three.js — lebih ringan ~30KB)

=== TUGAS BATCH INI ===

TUGAS 1 — Buat src/components/canvas/WaterRipple.astro
  
  SPESIFIKASI TEKNIS EFEK AIR (KRITIS — JANGAN ABAIKAN):
  
  Algoritma yang WAJIB digunakan:
    Height Map Fluid Simulation menggunakan adjacent cell averaging:
    
    Formula update per frame:
    next[x][y] = (
      current[x-1][y] + current[x+1][y] +
      current[x][y-1] + current[x][y+1]
    ) / 2 - previous[x][y]
    
    next[x][y] *= DAMPING  (DAMPING = 0.985 — nilai ini menghasilkan 
                             gelombang yang tenang dan melambat natural)
    
  Ini menghasilkan efek GELOMBANG TIPIS MERAMBAT yang benar-benar 
  simulasi fisika air — BUKAN animasi lingkaran CSS.

  Implementasi dengan ogl:
    - Buat dua texture (ping-pong buffer): bufferA dan bufferB
    - Fragment shader membaca bufferA, menghitung simulasi, 
      menulis ke bufferB
    - Setiap frame: swap bufferA ↔ bufferB
    - Output render: distortion dari bufferB diaplikasikan ke 
      background texture (sky gradient)
    
  GLSL Fragment Shader ripple.frag (wajib implementasikan):
    uniform sampler2D uCurrent;   // heightmap saat ini
    uniform sampler2D uPrevious;  // heightmap sebelumnya  
    uniform vec2 uResolution;     // ukuran canvas
    uniform vec2 uDropPos;        // posisi klik (normalized 0-1)
    uniform float uDropRadius;    // radius tetesan = 0.012
    uniform float uDropStrength;  // kekuatan = 0.8
    uniform float uDamping;       // = 0.985
    uniform bool uAddDrop;        // trigger saat klik
    
    // Output: vec4 di mana channel R = ketinggian gelombang

  Visualisasi akhir (vertex displacement):
    - PlaneGeometry mengisi seluruh viewport
    - Vertex shader mendisplace Y berdasarkan heightmap
    - Fragment shader: warna langit + refleksi subtle (Fresnel-like)
    - Warna air: mix antara --color-sky-deep dan --color-water-light
      berdasarkan ketinggian displacement

  Event handling:
    - 'click' dan 'touchstart' → injectDrop(normalizedX, normalizedY)
    - Pointer move saat drag (mousedown) → trail drops setiap 50ms
    
  Performance safeguard (WAJIB):
    - Cek GPU tier saat init:
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) → fallback mode (CSS only, tidak ada WebGL)
    - Resolusi simulasi: 512×512 (bukan resolusi layar penuh)
      Rendering ke layar full-size, tapi simulasi di texture kecil
    - requestAnimationFrame dengan frame budget check:
      jika deltaTime > 33ms (di bawah 30fps) → kurangi kualitas otomatis
    - Battery API check: navigator.getBattery() → jika level < 0.2, 
      pause animasi WebGL

  Fallback (CSS-only mode):
    - Background: linear-gradient animasi slow (3 warna langit bergerak)
    - Klik: ripple CSS biasa sebagai fallback visual
    - Class `.webgl-fallback` ditambahkan ke body

  Canvas styling:
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    z-index: 0; pointer-events: none;
    (pointer-events diaktifkan hanya untuk event propagation via JS)

TUGAS 2 — Buat src/components/layout/Header.astro

  Spesifikasi Visual:
    - Posisi: fixed top-0, width 100%, z-index: 100
    - Background: glass effect (--glass-bg dengan --blur-glass-heavy)
    - Border-bottom: 1px solid --glass-border
    - Tinggi: 72px desktop, 60px mobile
    - Padding horizontal: var(--gutter)
    
  Logo (kiri):
    - Text "CLOUDSI" dengan font var(--font-display), weight 600
    - Font size: 1.5rem desktop, 1.2rem mobile
    - Letter-spacing: 0.2em
    - Warna: white dengan opacity 0.95
    - Subtext di bawah: "Sistem Informasi '25" — font-body, 
      font-size 0.65rem, opacity 0.5
    - Tidak ada gambar/logo icon — pure typography
    
  Navigasi Desktop (kanan):
    - 6 menu items: Beranda | Tentang | Galeri | Anggota | Acara | Kontak
    - Font: var(--font-body), font-size 0.85rem, letter-spacing 0.05em
    - Warna normal: hsla(0, 0%, 100%, 0.65)
    - Warna hover: white, dengan underline animated (width 0→100% dari kiri)
    - Active state: white + gold dot (2px, --color-accent-gold) di bawah teks
    - Gap antar item: 2rem
    - Highlight active route menggunakan Astro.url.pathname
    
  Mobile Navigation (hamburger):
    - Hamburger icon: 3 garis, animated ke X saat open
    - Menu overlay: full screen, background --color-sky-deep dengan opacity 0.97
    - backdrop-filter: blur(20px)
    - Menu items: centered, font-size 2rem, var(--font-display)
    - Animasi open: slide-in dari kanan, stagger tiap item 80ms
    - Breakpoint tutup hamburger: 768px
    
  Scroll behavior:
    - Saat scroll > 20px: tambah box-shadow var(--shadow-glass)
    - Transisi smooth via IntersectionObserver atau scroll event throttled

TUGAS 3 — Buat src/components/layout/Footer.astro

  Spesifikasi:
    - Background: gradient dari transparent ke --color-sky-deep
    - Konten: 3 kolom grid
      Kolom 1: Logo CLOUDSI + deskripsi singkat (max 2 baris)
      Kolom 2: Navigasi ulang (6 links)
      Kolom 3: Social links (Instagram angkatan, jika ada)
    - Copyright: "© 2025 Cloudsi — Sistem Informasi"
    - Garis pemisah top: 1px solid --glass-border
    - Font size: 0.85rem, warna: hsla(0,0%,100%,0.5)
    - Mobile: stack vertikal, centered

TUGAS 4 — Buat src/components/layout/PageTransition.astro

  Implementasikan Astro View Transitions dengan custom overlay:
  
  Transition overlay element:
    - <div id="page-transition-overlay">
    - position: fixed, fullscreen, z-index: 9999
    - pointer-events: none saat tidak aktif
    
  Animasi masuk halaman baru (::view-transition-new):
    Liquid wipe dari bawah ke atas:
    @keyframes liquidWipeIn {
      from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
      to   { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%); }
    }
    duration: 600ms, easing: var(--ease-water)
    
  Animasi keluar halaman lama (::view-transition-old):
    @keyframes liquidWipeOut {
      from { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%); }
      to   { clip-path: polygon(0 0%, 100% 0%, 100% 0%, 0 0%); }
    }
    duration: 400ms, easing: var(--ease-glass)
    
  Warna overlay: var(--color-water-surface) dengan opacity 0.15
  Efek: seolah air menyapu layar saat berpindah halaman

=== ATURAN KETAT ===
1. ogl diimport dari CDN: https://cdn.jsdelivr.net/npm/ogl@1.0.5/dist/ogl.mjs
   (gunakan import map di BaseLayout.astro)
2. Seluruh kode WebGL HARUS ada di dalam <script> tag dengan
   is:inline di Astro — BUKAN file terpisah yang di-bundle
3. WAJIB ada error boundary: jika WebGL init gagal, tidak boleh 
   crash halaman — silent fallback ke CSS
4. Komentar GLSL shader wajib menjelaskan setiap uniform dan operasi

=== OUTPUT YANG DIHARAPKAN ===
Tampilkan SELURUH isi file. Jangan diringkas dengan "// ... rest of code".
Setelah selesai, buat checklist verifikasi:
□ WebGL context berhasil dibuat
□ Ping-pong buffer diimplementasikan
□ Fallback CSS tersedia
□ Header responsive di 320px, 768px, 1440px
□ View Transitions aktif
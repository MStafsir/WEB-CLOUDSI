Lanjutan dari Batch 1 & 2. Kamu membangun halaman utama Cloudsi Connect.
Semua design tokens, WebGL, Header, Footer sudah tersedia.

=== TUGAS BATCH INI ===

TUGAS 1 — Setup Lenis Smooth Scroll (global, dimuat di BaseLayout.astro)

  Konfigurasi Lenis:
    new Lenis({
      duration: 1.4,           // inersia scroll (detik)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: false,      // MATIKAN di touch device (menyebabkan lag)
      touchMultiplier: 1.5,
    })
    
  Integrasi GSAP ScrollTrigger:
    Lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    
  Mobile override: jika (window.innerWidth < 768) → Lenis dinonaktifkan,
  scroll native digunakan (mencegah lag di mobile)

TUGAS 2 — Buat src/components/sections/Hero.astro

  Layout:
    - Fullscreen (100svh) — gunakan svh bukan vh untuk mobile browser bar
    - Content centered secara vertikal dan horizontal
    - z-index: 10 (di atas canvas WebGL)
    
  Konten (dari atas ke bawah):
    1. Badge kecil: "ANGKATAN 2025 · SISTEM INFORMASI"
       - Pill shape dengan glass effect
       - Font: var(--font-body), 0.7rem, letter-spacing 0.15em
       - Animated masuk: fade-in + slide-up, delay 200ms setelah load
       
    2. Heading utama: "CLOUDSI"
       - Font: var(--font-display), var(--font-size-hero)
       - Font-weight: 300 (tipis, elegan)
       - Letter-spacing: 0.15em
       - Gradient text: linear-gradient(135deg, #ffffff 0%, 
         var(--color-water-light) 50%, var(--color-accent-gold) 100%)
       - background-clip: text; -webkit-background-clip: text;
       - Animated masuk: fade-in + scale dari 0.95→1, delay 400ms
       
    3. Subheading: "Cloud · Sky · Information"
       - Font: var(--font-body), clamp(0.9rem, 2vw, 1.2rem)
       - Opacity: 0.6
       - Letter-spacing: 0.3em
       - Text transform: uppercase
       - Delay: 600ms
       
    4. Deskripsi singkat (1 kalimat):
       "75 jiwa, satu angkatan, satu langit yang sama."
       - Font: var(--font-display), 1.2rem, italic, opacity 0.75
       - Delay: 800ms
       
    5. Dua tombol CTA berdampingan:
       Tombol A: "Kenali Kami" → href="/anggota"
         - Glass style dengan border --glass-border
         - Hover: background --glass-bg-hover, border --glass-border-hover
       Tombol B: "Perjalanan Kami" → href="/tentang"
         - Border transparan, warna --color-accent-gold
         - Hover: background tipis gold (opacity 0.08)
       - Gap: 1rem, delay animasi: 1000ms
       
    6. Scroll indicator bawah:
       - Icon chevron/arrow ke bawah
       - Animasi bounce infinite (translateY 0→8px→0, 2s loop)
       - Opacity: 0.4
       - Fade-out saat user mulai scroll (IntersectionObserver)
       
  Parallax pada Hero:
    - Heading bergerak di Y: scrollY * -0.3 (bergerak lebih lambat dari scroll)
    - Badge bergerak di Y: scrollY * -0.5
    - Implementasi via GSAP ScrollTrigger scrub: 1

TUGAS 3 — Buat src/components/sections/MemberPreview.astro

  Deskripsi: Section di Beranda yang menampilkan preview 6 anggota featured
  (diambil dari Supabase: 1 Ketua + 5 anggota random atau urutan pertama)
  
  Layout:
    - Heading section: "Wajah Cloudsi"
    - Subheading: "75 Anggota · Sistem Informasi · 2025"
    - Grid 6 card: 3 kolom × 2 baris (desktop), 2×3 (tablet), 1×6 (mobile)
    
  Member Card (preview, bukan full detail):
    - Ukuran: aspect-ratio 3/4
    - Background: foto anggota (object-fit: cover)
    - Overlay gradient: linear-gradient(to top, 
        hsla(210,60%,6%,0.9) 0%, 
        hsla(210,60%,6%,0.3) 50%, 
        transparent 100%)
    - Glass badge di pojok kiri atas: Role anggota
    - Nama di bawah: font-display, white, font-size 1rem
    - Hover:
        - Scale: 1.02
        - Border: 1px solid --glass-border-hover
        - Overlay opacity berkurang (foto lebih terlihat)
    - view-transition-name: "member-card-{id}" (untuk shared transition)
    
  Animasi masuk section:
    - Stagger: tiap card muncul dengan delay 80ms
    - Effect: fade-in + translateY(30px→0)
    - Trigger: ScrollTrigger saat section masuk viewport 80%
    
  CTA di bawah grid:
    "Lihat Semua Anggota →" → href="/anggota"

TUGAS 4 — Buat src/components/sections/StatsSection.astro

  Strip horizontal antara Hero dan MemberPreview:
  
  4 angka animasi (count-up saat masuk viewport):
    75     → "Anggota Aktif"
    2025   → "Tahun Angkatan"  
    1      → "Semangat Bersama"
    ∞      → "Kenangan"
    
  Count-up implementasi: GSAP Counter dari 0 ke target nilai,
  duration 2s, ease "power2.out", trigger ScrollTrigger
  
  Layout: flex row, glass container, border-bottom & top glass border
  Background: var(--glass-bg) dengan blur ringan

TUGAS 5 — Assembling src/pages/index.astro

  Urutan section:
    1. <Hero />
    2. <StatsSection />  
    3. <MemberPreview /> (fetch data dari Supabase di sini dengan Astro.glob
       atau getMembers() — gunakan top-level await di frontmatter)
    4. Section teaser "Galeri" — 3 foto placeholder dengan glass overlay 
       dan text "Momen Cloudsi →"
    5. <Footer />
    
  Data fetching (di frontmatter Astro):
    const members = await getMembers();
    const featured = [
      members.find(m => m.role === 'Ketua'),
      ...members.filter(m => m.role === 'Anggota').slice(0, 5)
    ].filter(Boolean);

=== ATURAN KETAT ===
1. Semua animasi WAJIB diperiksa dengan prefers-reduced-motion:
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
     // skip semua GSAP animations, tampilkan elemen langsung
   }
2. Foto anggota di MemberCard WAJIB menggunakan Cloudinary srcset:
   srcset={buildSrcSet(member.photo_url)}
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
3. Loading attribute: foto pertama (above-fold) = "eager", 
   sisanya = "lazy"
4. Tidak boleh ada layout shift: semua gambar WAJIB punya 
   width dan height attribute (atau aspect-ratio CSS)

=== OUTPUT YANG DIHARAPKAN ===
Seluruh isi semua file. Sertakan checklist:
□ LCP < 1.2s (jelaskan bagaimana dicapai)
□ Scroll animation bekerja tanpa jank
□ Responsive di 320px, 768px, 1440px
□ Foto menggunakan lazy loading dengan benar
□ prefers-reduced-motion diimplementasikan
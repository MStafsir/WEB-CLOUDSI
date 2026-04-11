Kamu adalah Staff Engineer senior yang membangun website "Cloudsi Connect" — 
platform profil angkatan Sistem Informasi dengan tema langit dan air, 
liquid glassmorphism, dan WebGL water ripple.

=== KONTEKS PROYEK ===
- Framework  : Astro 4.x (Island Architecture)
- Styling    : Tailwind CSS v3 + CSS Custom Properties
- Database   : Supabase (PostgreSQL)
- Image CDN  : Cloudinary
- Hosting    : Vercel
- Animasi    : GSAP 3.x, Lenis (smooth scroll), ogl (WebGL ringan ~30KB)
- Font       : Cormorant Garamond (display/heading) + Plus Jakarta Sans (body)

=== TUGAS BATCH INI ===

TUGAS 1 — Inisialisasi project Astro dengan konfigurasi berikut:
  - Buat struktur folder lengkap:
    src/
    ├── components/
    │   ├── layout/        (Header, Footer, PageTransition)
    │   ├── ui/            (GlassCard, MemberCard, Button)
    │   ├── canvas/        (WaterRipple.astro)
    │   └── sections/      (Hero, About, Gallery, Members, Events, Contact)
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── tentang.astro
    │   ├── galeri.astro
    │   ├── anggota.astro
    │   ├── acara.astro
    │   └── kontak.astro
    ├── styles/
    │   ├── global.css
    │   └── tokens.css
    ├── lib/
    │   ├── supabase.ts
    │   └── cloudinary.ts
    └── types/
        └── index.ts

TUGAS 2 — Buat file tokens.css dengan sistem desain lengkap:
  WAJIB mengandung CSS Custom Properties berikut (TIDAK BOLEH diubah nilainya):

  /* COLOR SYSTEM */
  --color-sky-deep      : hsl(210, 60%, 6%);
  --color-sky-mid       : hsl(205, 55%, 14%);
  --color-sky-surface   : hsl(200, 50%, 22%);
  --color-water-surface : hsl(195, 70%, 35%);
  --color-water-light   : hsl(190, 65%, 55%);
  --color-accent-gold   : hsl(45, 85%, 65%);
  
  /* GLASS SYSTEM */
  --glass-bg            : hsla(200, 60%, 80%, 0.06);
  --glass-bg-hover      : hsla(200, 60%, 80%, 0.10);
  --glass-border        : hsla(200, 80%, 85%, 0.12);
  --glass-border-hover  : hsla(200, 80%, 90%, 0.22);
  --blur-glass          : blur(18px);
  --blur-glass-heavy    : blur(28px);
  
  /* TYPOGRAPHY */
  --font-display        : 'Cormorant Garamond', Georgia, serif;
  --font-body           : 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-size-hero      : clamp(3rem, 8vw, 7rem);
  --font-size-h1        : clamp(2rem, 5vw, 4rem);
  --font-size-h2        : clamp(1.5rem, 3vw, 2.5rem);
  --font-size-body      : clamp(0.9rem, 1.5vw, 1.1rem);
  
  /* SPACING */
  --section-padding     : clamp(4rem, 10vw, 10rem);
  --container-max       : 1400px;
  --gutter              : clamp(1rem, 4vw, 2rem);
  
  /* ANIMATION */
  --ease-glass          : cubic-bezier(0.23, 1, 0.32, 1);
  --ease-water          : cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast       : 200ms;
  --duration-normal     : 500ms;
  --duration-slow       : 900ms;
  --duration-ripple     : 1800ms;
  
  /* SHADOW */
  --shadow-glass        : 0 8px 32px hsla(210, 60%, 4%, 0.4),
                          inset 0 1px 0 hsla(0, 0%, 100%, 0.08);
  --shadow-glass-hover  : 0 16px 48px hsla(210, 60%, 4%, 0.6),
                          inset 0 1px 0 hsla(0, 0%, 100%, 0.12);

TUGAS 3 — Buat global.css dengan:
  - CSS Reset modern (tidak pakai Normalize, pakai pendekatan modern)
  - Import @font-face untuk Cormorant Garamond + Plus Jakarta Sans dari Google Fonts
    dengan `font-display: swap` dan `preload` strategy
  - Base body style: background var(--color-sky-deep), overflow-x hidden
  - Utility class `.glass` yang mengimplementasikan:
    background: var(--glass-bg);
    backdrop-filter: var(--blur-glass);
    -webkit-backdrop-filter: var(--blur-glass);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-glass);
    border-radius: 16px;
    transition: all var(--duration-normal) var(--ease-glass);
  - @supports check untuk backdrop-filter fallback
  - @media (prefers-reduced-motion: reduce) yang menonaktifkan SEMUA animasi

TUGAS 4 — Buat src/types/index.ts dengan TypeScript interfaces:

  interface Member {
    id: string;
    full_name: string;
    nickname?: string;
    role: 'Ketua' | 'Wakil Ketua' | 'Sekretaris' | 'Bendahara' | 'Anggota';
    quote?: string;
    photo_url: string;
    social_ig?: string;
    social_in?: string;
    is_visible: boolean;
  }

  interface Event {
    id: string;
    title: string;
    date: string;
    description?: string;
    cover_image: string;
    slug: string;
  }

  interface TimelineEntry {
    id: string;
    date: string;
    title: string;
    description?: string;
    order_index: number;
  }

  interface GalleryImage {
    id: string;
    event_id: string;
    image_url: string;
  }

TUGAS 5 — Buat src/lib/supabase.ts:
  - Setup Supabase client menggunakan environment variable:
    SUPABASE_URL dan SUPABASE_ANON_KEY (dari import.meta.env Astro)
  - Export typed query functions:
    getMembers()     → Member[] (hanya is_visible=true, order by role lalu full_name)
    getEvents()      → Event[] (order by date DESC)
    getTimeline()    → TimelineEntry[] (order by order_index ASC)
    getGallery(event_id: string) → GalleryImage[]

TUGAS 6 — Buat src/lib/cloudinary.ts:
  - Export function buildImageUrl(publicId: string, options: {
      width: number;
      height?: number;
      quality?: 'auto' | number;
      format?: 'avif' | 'webp' | 'auto';
      crop?: 'fill' | 'thumb';
      gravity?: 'face' | 'center';
    }) → string
  - Implementasikan srcset generator: buildSrcSet(publicId: string) → string
    yang menghasilkan 3 ukuran: 400w, 800w, 1200w
  - Semua output format wajib 'avif' dengan fallback 'webp'

TUGAS 7 — Buat BaseLayout.astro:
  - Props: { title: string; description?: string; ogImage?: string }
  - Head section WAJIB mengandung:
    · <link rel="preconnect"> ke fonts.googleapis.com dan fonts.gstatic.com
    · <link rel="preload"> untuk font Cormorant Garamond (weight: 300,400,600)
    · Meta OG tags lengkap (og:title, og:description, og:image, og:type)
    · <meta name="theme-color" content="hsl(210, 60%, 6%)">
    · Import tokens.css dan global.css
    · Astro View Transitions: <ViewTransitions />
  - Body: slot untuk konten halaman
  - WaterRipple canvas component dimuat di sini (posisi fixed, z-index: 0)
  - Pastikan canvas TIDAK menghalangi interaksi UI (pointer-events: none)

=== ATURAN KETAT ===
1. TIDAK BOLEH ada hardcoded color value di luar tokens.css
2. TIDAK BOLEH ada inline style kecuali untuk nilai dinamis JavaScript
3. Semua komponen Astro menggunakan TypeScript strict mode
4. Setiap file WAJIB ada komentar header: nama file, tujuan, dependencies
5. Environment variables TIDAK BOLEH di-commit — buat .env.example saja

=== OUTPUT YANG DIHARAPKAN ===
Tampilkan SELURUH isi setiap file yang dibuat. Jangan diringkas.
Setelah semua file selesai, tampilkan struktur folder final dengan command:
tree src/ --show-structure

Nyatakan secara eksplisit jika ada keputusan arsitektur yang dibuat
di luar instruksi di atas dengan format:
[KEPUTUSAN: <nama> — <alasan>]
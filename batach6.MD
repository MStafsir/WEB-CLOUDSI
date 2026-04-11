Batch penutup. Fokus: Supabase schema, deployment config, dan audit final.

=== TUGAS BATCH INI ===

TUGAS 1 — Buat SQL migration lengkap untuk Supabase

  Jalankan di Supabase SQL Editor, urutan wajib diikuti:

  -- STEP 1: Extensions
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  -- STEP 2: Enum types
  CREATE TYPE member_role AS ENUM (
    'Ketua', 'Wakil Ketua', 'Sekretaris', 'Bendahara', 'Anggota'
  );
  
  -- STEP 3: Tables (urutan penting untuk FK)
  
  -- Members
  CREATE TABLE members (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim         VARCHAR(20) UNIQUE,       -- tidak ditampilkan publik
    full_name   VARCHAR(100) NOT NULL,
    nickname    VARCHAR(50),
    role        member_role NOT NULL DEFAULT 'Anggota',
    quote       TEXT CHECK (char_length(quote) <= 200),
    photo_url   TEXT NOT NULL,            -- Cloudinary public ID
    email       VARCHAR(100) UNIQUE,      -- tidak ditampilkan publik
    social_ig   VARCHAR(100),             -- username saja, tanpa @
    social_in   VARCHAR(200),             -- full LinkedIn URL
    is_visible  BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ NULL
  );
  
  -- Events
  CREATE TABLE events (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title        VARCHAR(150) NOT NULL,
    date         DATE NOT NULL,
    description  TEXT,
    cover_image  TEXT NOT NULL,
    slug         VARCHAR(150) UNIQUE NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  
  -- Gallery
  CREATE TABLE event_gallery (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL,
    caption     VARCHAR(200),
    order_index INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  
  -- Timeline
  CREATE TABLE timeline_events (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date        DATE NOT NULL,
    title       VARCHAR(150) NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  
  -- Contact Logs (rate limiting)
  CREATE TABLE contact_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address  INET NOT NULL,
    email       VARCHAR(100),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  
  -- STEP 4: Indexes
  CREATE INDEX idx_members_role ON members(role) WHERE deleted_at IS NULL;
  CREATE INDEX idx_members_visible ON members(is_visible) WHERE deleted_at IS NULL;
  CREATE INDEX idx_members_name ON members(full_name) WHERE deleted_at IS NULL;
  CREATE INDEX idx_events_date ON events(date DESC) WHERE is_published = TRUE;
  CREATE INDEX idx_gallery_event ON event_gallery(event_id, order_index);
  CREATE INDEX idx_timeline_order ON timeline_events(order_index ASC);
  CREATE INDEX idx_contact_ip ON contact_logs(ip_address, submitted_at);
  
  -- STEP 5: Auto-update updated_at trigger
  CREATE OR REPLACE FUNCTION update_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE TRIGGER members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  
  -- STEP 6: Row Level Security (RLS)
  ALTER TABLE members ENABLE ROW LEVEL SECURITY;
  ALTER TABLE events ENABLE ROW LEVEL SECURITY;
  ALTER TABLE event_gallery ENABLE ROW LEVEL SECURITY;
  ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
  
  -- Public read policies (hanya field aman, bukan NIM/email)
  CREATE POLICY "members_public_read" ON members
    FOR SELECT USING (is_visible = TRUE AND deleted_at IS NULL);
  
  CREATE POLICY "events_public_read" ON events
    FOR SELECT USING (is_published = TRUE);
  
  CREATE POLICY "gallery_public_read" ON event_gallery
    FOR SELECT USING (TRUE);
  
  CREATE POLICY "timeline_public_read" ON timeline_events
    FOR SELECT USING (TRUE);
  
  -- STEP 7: Seed data awal (1 entry timeline wajib)
  INSERT INTO timeline_events (date, title, description, order_index)
  VALUES (
    '2025-08-04',
    'Cloudsi Berdiri',
    'Angkatan Sistem Informasi 2025 resmi terbentuk.',
    1
  );

TUGAS 2 — Buat file konfigurasi deployment

  File: vercel.json
    {
      "buildCommand": "astro build",
      "outputDirectory": "dist",
      "framework": "astro",
      "headers": [
        {
          "source": "/(.*)",
          "headers": [
            { "key": "X-Content-Type-Options", "value": "nosniff" },
            { "key": "X-Frame-Options", "value": "DENY" },
            { "key": "X-XSS-Protection", "value": "1; mode=block" },
            { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
            { "key": "Permissions-Policy", 
              "value": "camera=(), microphone=(), geolocation=()" }
          ]
        },
        {
          "source": "/fonts/(.*)",
          "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
        },
        {
          "source": "/_astro/(.*)",
          "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
        }
      ]
    }
    
  File: .env.example (BUKAN .env — jangan commit secret)
    SUPABASE_URL=https://your-project.supabase.co
    SUPABASE_ANON_KEY=your-anon-key-here
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    RESEND_API_KEY=re_your-api-key
    ADMIN_EMAIL=admin@example.com
    
  File: astro.config.mjs — konfigurasi final:
    - output: 'static' (SSG murni)
    - integrations: [tailwind(), sitemap()]
    - vite.build.rollupOptions untuk code splitting optimal
    - Aktifkan prefetch untuk semua internal links

TUGAS 3 — Buat CHECKLIST_QA.md — Dokumen audit final

  Buat dokumen markdown lengkap berisi checklist:
  
  ## Performance
  □ Lighthouse Mobile Performance > 90
  □ LCP < 1.2s (terukur dengan Web Vitals)
  □ CLS = 0 (tidak ada layout shift)
  □ Total JS bundle < 200KB (sebelum WebGL)
  □ Total CSS < 30KB (gzipped)
  □ Semua gambar anggota menggunakan AVIF + lazy loading
  □ Font menggunakan preload + font-display: swap
  
  ## Visual & UX
  □ Water ripple effect berjalan 60fps di laptop modern
  □ Fallback CSS berjalan di device tanpa WebGL
  □ Glassmorphism konsisten di Chrome, Safari, Firefox
  □ Mobile layout tidak ada overflow horizontal di 320px
  □ Smooth scroll bekerja di desktop, native scroll di mobile
  □ Page transitions tidak ada flash of white
  □ Semua hover states bekerja
  □ Semua animasi dinonaktifkan saat prefers-reduced-motion
  
  ## Functionality
  □ Semua 6 halaman dapat diakses
  □ Navigasi aktif state benar di setiap halaman
  □ Search anggota bekerja real-time
  □ Filter role anggota bekerja
  □ Lightbox galeri buka/tutup dan navigasi berfungsi
  □ Form kontak berhasil kirim email
  □ Honeypot bot trap aktif
  □ Rate limiting form kontak aktif
  
  ## Security & Accessibility
  □ NIM dan email anggota tidak tampil di HTML publik
  □ Security headers terpasang (vercel.json)
  □ Semua gambar punya alt text yang deskriptif
  □ Lightbox dapat ditutup dengan keyboard (Escape)
  □ Form dapat disubmit dengan keyboard saja
  □ Kontras warna memenuhi WCAG AA (4.5:1 untuk body text)

=== OUTPUT YANG DIHARAPKAN ===
Seluruh isi setiap file.
Setelah selesai, nyatakan:
"CLOUDSI CONNECT — SIAP DEPLOY"
beserta ringkasan: total file yang dibuat, ukuran estimasi bundle,
dan daftar environment variables yang wajib diisi sebelum deploy.
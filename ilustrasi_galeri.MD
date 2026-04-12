<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Album Kenangan – [Nama Angkatan]</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Fonts: Playfair untuk judul elegan, DM Sans untuk body -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap" rel="stylesheet">

  <style>
    /* =====================================================
       ALBUM KENANGAN — Glassmorphism + Water Theme
       ===================================================== */

    * { box-sizing: border-box; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: linear-gradient(160deg, #010d1e 0%, #021428 35%, #03264d 70%, #062e5a 100%);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Ambient orbs water effect */
    body::before, body::after {
      content: '';
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
    body::before {
      width: 50vw; height: 50vw;
      top: -10%; left: -15%;
      background: radial-gradient(circle, rgba(0,80,160,0.12) 0%, transparent 70%);
      animation: drift1 12s ease-in-out infinite;
    }
    body::after {
      width: 40vw; height: 40vw;
      bottom: 5%; right: -10%;
      background: radial-gradient(circle, rgba(0,160,180,0.08) 0%, transparent 70%);
      animation: drift2 15s ease-in-out infinite 2s;
    }
    @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
    @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,15px)} }

    /* ─────────────────────────────────────────
       GLASSMORPHISM
    ───────────────────────────────────────── */
    .glass {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    /* ─────────────────────────────────────────
       PHOTO FRAME — core scroll animation
    ───────────────────────────────────────── */
    .photo-frame {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.09);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      cursor: pointer;
      position: relative;
      will-change: transform, opacity;

      /* === ANIMASI MASUK: state awal (berserakan) === */
      opacity: 0;
      transform: translateY(70px) rotate(var(--rot, 0deg)) scale(0.88);

      /*
        Penjelasan:
        - translateY(70px)  → foto datang dari bawah
        - rotate(--rot)     → sedikit miring acak
        - scale(0.88)       → sedikit kecil

        Ketika class .is-visible ditambahkan, semua kembali ke posisi normal.
        cubic-bezier(.34,1.56,.64,1) → efek "spring/bouncy" yang natural
      */
      transition:
        opacity 0.65s ease,
        transform 0.95s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.35s ease,
        border-color 0.35s ease;
    }

    /* === State setelah masuk viewport === */
    .photo-frame.is-visible {
      opacity: 1;
      transform: translateY(0) rotate(var(--rot-end, 0deg)) scale(1);
    }

    /* === Hover glow effect === */
    .photo-frame:hover {
      border-color: rgba(100, 200, 255, 0.35) !important;
      box-shadow:
        0 20px 60px rgba(0, 100, 255, 0.22),
        0 0 0 1px rgba(100, 200, 255, 0.12) !important;
      z-index: 20;
    }

    /* ─────────────────────────────────────────
       INNER PHOTO CONTENT
    ───────────────────────────────────────── */
    .photo-inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding: 12px;
      position: relative;
    }

    /* Overlay gradient di bawah untuk caption terbaca */
    .photo-inner::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%);
      pointer-events: none;
    }

    /*
      === CARA PAKAI FOTO ASLI ===
      Ganti div .photo-placeholder dengan:

        <img src="foto/namafile.jpg" alt="deskripsi"
             style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">

      Atau jika pakai Next.js Image:
        <Image src="/foto/namafile.jpg" fill alt="..." style="object-fit:cover" />
    */

    .photo-inner img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .caption {
      position: relative;
      z-index: 1;
      font-size: 11px;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(0, 10, 30, 0.55);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
      white-space: nowrap;
    }

    /* ─────────────────────────────────────────
       BENTO GRID LAYOUT
    ───────────────────────────────────────── */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .item-large { grid-column: span 2; grid-row: span 2; }
    .item-tall  { grid-row: span 2; }
    .item-wide  { grid-column: span 2; }

    @media (max-width: 640px) {
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .item-large   { grid-column: span 2; grid-row: span 1; }
    }

    /* ─────────────────────────────────────────
       TYPOGRAPHY
    ───────────────────────────────────────── */
    .album-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2.6rem, 6vw, 4.8rem);
      color: white;
      font-weight: 400;
      line-height: 1.1;
    }
    .album-title em {
      font-style: italic;
      color: rgba(120, 210, 255, 0.9);
    }
    .eyebrow {
      font-size: 11px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(100, 200, 255, 0.45);
    }

    /* ─────────────────────────────────────────
       DIVIDER
    ───────────────────────────────────────── */
    .water-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(100,200,255,0.3), transparent);
    }

    /* ─────────────────────────────────────────
       BUTTON
    ───────────────────────────────────────── */
    .btn-ghost {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(100, 200, 255, 0.2);
      color: rgba(180, 230, 255, 0.8);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      letter-spacing: 0.12em;
      padding: 13px 38px;
      border-radius: 40px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-ghost:hover {
      background: rgba(100, 200, 255, 0.09);
      border-color: rgba(100, 200, 255, 0.4);
      box-shadow: 0 0 28px rgba(100, 200, 255, 0.08);
    }

    /* ─────────────────────────────────────────
       SCROLL INDICATOR
    ───────────────────────────────────────── */
    @keyframes scrollBounce {
      0%,100%{transform:translateY(0);opacity:.35}
      50%{transform:translateY(8px);opacity:.75}
    }
    .scroll-hint { animation: scrollBounce 2.5s ease-in-out infinite; }

    /* ─────────────────────────────────────────
       PLACEHOLDER COLORS (hapus jika pakai foto asli)
    ───────────────────────────────────────── */
    .ph-1{background-color:#0a2544}
    .ph-2{background-color:#0c3560}
    .ph-3{background-color:#0e3d6a}
    .ph-4{background-color:#092038}
    .ph-5{background-color:#0b2d50}
    .ph-6{background-color:#0d3258}
    .ph-7{background-color:#081a30}

    /* Section wrapper */
    section { position: relative; z-index: 1; }
  </style>
</head>

<body>

  <!-- ──────────────────────────────────────────────────────
       CONTOH HERO SECTION (opsional — bisa dihapus)
  ────────────────────────────────────────────────────── -->
  <section style="height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">
    <div>
      <p class="eyebrow" style="margin-bottom: 16px;">[Nama Angkatan] · [Tahun]</p>
      <h1 class="album-title">Kita <em>Bersama</em></h1>
      <div class="scroll-hint" style="margin-top: 40px; color: rgba(255,255,255,0.3); font-size: 13px; letter-spacing:.15em;">
        SCROLL TO EXPLORE ↓
      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════════════
       ALBUM SECTION — SALIN MULAI DARI SINI
  ══════════════════════════════════════════════════════ -->
  <section id="album-section" style="padding: 90px 20px 120px;">

    <div style="max-width: 960px; margin: 0 auto;">

      <!-- ── HEADER ── -->
      <div style="text-align: center; margin-bottom: 64px;">
        <p class="eyebrow" style="margin-bottom: 14px;">Kenangan Indah · 2021–2024</p>
        <h2 class="album-title">
          Album <em>Kenangan</em>
        </h2>
        <p style="color:rgba(255,255,255,0.3);margin-top:18px;font-size:15px;font-weight:300;font-family:'DM Sans',sans-serif;">
          Setiap foto menyimpan cerita yang tak terlupakan
        </p>
        <div class="water-line" style="margin-top: 44px;"></div>
      </div>

      <!-- ── BENTO PHOTO GRID ──
           Layout (3 kolom):
           [ FOTO 1 (2×2) ][ FOTO 2    ][ FOTO 3    ]
           [               ][ FOTO 4    ][ (tall)    ]
           [ FOTO 5 (wide)  ][ FOTO 5   ][ FOTO 6    ][ FOTO 7 ]

           Urutan elemen di HTML menentukan posisi di grid.
           Ubah class untuk mengubah ukuran:
             item-large  = 2 kolom × 2 baris (feature photo)
             item-tall   = 1 kolom × 2 baris
             item-wide   = 2 kolom × 1 baris
             (tanpa class) = 1×1 standar
      ── -->

      <div class="gallery-grid" id="galleryGrid">

        <!-- FOTO 1: Feature photo (besar, atas-kiri) -->
        <!--
          CARA GANTI FOTO:
          1. Hapus div.photo-placeholder
          2. Tambah: <img src="./foto/ospek-2021.jpg" alt="Ospek 2021" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
        -->
        <div class="photo-frame item-large"
             style="--rot:-13deg; --rot-end:-1.5deg; transition-delay:0ms;">
          <div class="photo-inner ph-1" style="min-height:360px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:13px;font-family:monospace;">📷 foto1.jpg</div>
            <span class="caption">Ospek 2021</span>
          </div>
        </div>

        <!-- FOTO 2 -->
        <div class="photo-frame"
             style="--rot:10deg; --rot-end:1deg; transition-delay:80ms;">
          <div class="photo-inner ph-2" style="min-height:170px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto2.jpg</div>
            <span class="caption">KKN 2023</span>
          </div>
        </div>

        <!-- FOTO 3: Tall (kanan, 2 baris) -->
        <div class="photo-frame item-tall"
             style="--rot:-7deg; --rot-end:1.5deg; transition-delay:160ms;">
          <div class="photo-inner ph-3" style="min-height:360px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto3.jpg</div>
            <span class="caption">Study Trip</span>
          </div>
        </div>

        <!-- FOTO 4 -->
        <div class="photo-frame"
             style="--rot:9deg; --rot-end:-1deg; transition-delay:120ms;">
          <div class="photo-inner ph-4" style="min-height:170px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto4.jpg</div>
            <span class="caption">Wisuda 2024</span>
          </div>
        </div>

        <!-- FOTO 5: Wide (bawah, 2 kolom) -->
        <div class="photo-frame item-wide"
             style="--rot:-5deg; --rot-end:0.5deg; transition-delay:200ms;">
          <div class="photo-inner ph-5" style="min-height:160px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto5.jpg</div>
            <span class="caption">Malam Keakraban</span>
          </div>
        </div>

        <!-- FOTO 6 -->
        <div class="photo-frame"
             style="--rot:14deg; --rot-end:-2deg; transition-delay:240ms;">
          <div class="photo-inner ph-6" style="min-height:160px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto6.jpg</div>
            <span class="caption">Lomba Debat</span>
          </div>
        </div>

        <!-- FOTO 7 -->
        <div class="photo-frame"
             style="--rot:-9deg; --rot-end:1deg; transition-delay:280ms;">
          <div class="photo-inner ph-7" style="min-height:160px;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(100,180,255,0.15);font-size:12px;font-family:monospace;">📷 foto7.jpg</div>
            <span class="caption">Pelepasan</span>
          </div>
        </div>

        <!--
          === TAMBAH FOTO BARU ===
          Copy salah satu blok di atas, ganti:
            - data-d="..." → delay animasi dalam ms (tambahkan 40ms per foto baru)
            - --rot  → rotasi awal acak (mis: 6deg, -11deg, 4deg)
            - --rot-end → rotasi akhir (kecil, mis: 1deg, -0.5deg)
            - class item-large/tall/wide → opsional untuk ukuran berbeda
            - .ph-X → warna placeholder (hapus jika pakai foto asli)
            - caption → nama event/momen
        -->

      </div>
      <!-- end galleryGrid -->


      <!-- ── TOMBOL LIHAT SEMUA ── -->
      <div style="text-align:center; margin-top: 60px;">
        <p style="color:rgba(255,255,255,0.2);font-size:13px;margin-bottom:20px;letter-spacing:.05em;">
          Menampilkan 7 dari 84 foto
        </p>
        <button class="btn-ghost" onclick="alert('Tambahkan logika load more di sini')">
          LIHAT SEMUA FOTO ↗
        </button>
      </div>

    </div>
  </section>
  <!-- ══ AKHIR ALBUM SECTION ══ -->


  <!-- ══════════════════════════════════════════════════════
       JAVASCRIPT — Salin bagian ini juga
       Taruh sebelum </body>
  ══════════════════════════════════════════════════════ -->
  <script>
  (function() {
    'use strict';

    // ── Ambil semua photo frames ──
    const frames = document.querySelectorAll('#galleryGrid .photo-frame');

    // ── 1. INTERSECTION OBSERVER: animasi saat foto masuk viewport ──
    //    Ketika foto masuk ke area yang terlihat (threshold 12%),
    //    tambah class .is-visible → CSS transition mulai berjalan
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'  // trigger sedikit sebelum foto di bawah layar
      }
    );

    frames.forEach(function(frame) {
      observer.observe(frame);
    });


    // ── 2. PARALLAX SCROLL: setiap foto bergerak dengan kecepatan beda ──
    //    Ini menciptakan efek kedalaman (depth) yang terasa seperti air
    var speeds = [0.018, -0.022, 0.012, -0.016, 0.008, -0.020, 0.015, 0.010, -0.014];

    function onScroll() {
      var scrollY = window.scrollY;

      frames.forEach(function(frame, i) {
        if (!frame.classList.contains('is-visible')) return;

        var speed = speeds[i % speeds.length];
        var offsetY = scrollY * speed;
        var rotEnd = frame.style.getPropertyValue('--rot-end') || '0deg';

        // Reset transitionDelay setelah animasi masuk selesai
        frame.style.transitionDelay = '0ms';
        frame.style.transform = 'translateY(' + offsetY + 'px) rotate(' + rotEnd + ') scale(1)';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });


    // ── 3. HOVER TILT: efek 3D tilt saat kursor di atas foto ──
    frames.forEach(function(frame, index) {

      frame.addEventListener('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width / 2);   // -1 hingga 1
        var dy = (e.clientY - cy) / (rect.height / 2);  // -1 hingga 1

        this.style.transform =
          'perspective(700px) rotateY(' + (dx * 7) + 'deg) rotateX(' + (-dy * 7) + 'deg) scale(1.04) translateZ(8px)';
        this.style.transitionDelay = '0ms';
        this.style.transition = 'transform 0.12s ease, box-shadow 0.12s ease, border-color 0.3s';
      });

      frame.addEventListener('mouseleave', function() {
        var i = Array.from(frames).indexOf(this);
        var speed = speeds[i % speeds.length];
        var offsetY = window.scrollY * speed;
        var rotEnd = this.style.getPropertyValue('--rot-end') || '0deg';

        this.style.transform =
          'translateY(' + offsetY + 'px) rotate(' + rotEnd + ') scale(1)';
        this.style.transition =
          'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.35s';
      });
    });

  })();
  </script>

</body>
</html>
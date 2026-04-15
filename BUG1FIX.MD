Saya akan membuat prompt teknis yang detail dan lengkap untuk Anda gunakan di Antigravity. Berikut struktur prompt yang optimal:Baik, saya buatkan **prompt teknis yang sangat detail dan lengkap** untuk Antigravity agar langsung bisa eksekusi perubahan pada `Header.astro`:

---

## 🎯 PROMPT TEKNIS UNTUK ANTIGRAVITY

```
TASK: Refactor src/components/layout/Header.astro untuk fix CSS Containing Block Trap

MASALAH:
- .mobile-drawer dan .mobile-backdrop saat ini berada DALAM <header class="header-nav">
- <header> memiliki backdrop-filter: blur(12px) yang membuat containing block baru
- Akibatnya: position: fixed pada .mobile-drawer mengacu ke <header> bukan viewport
- Drawer terpotong dan tidak fullscreen ❌

SOLUSI:
- Pindahkan .mobile-drawer dan .mobile-backdrop KELUAR dari <header>
- Keduanya harus menjadi sibling langsung, di level yang sama dengan <header>
- Dengan begini position: fixed akan mengacu ke viewport ✓

---

📋 INSTRUKSI PERUBAHAN DETAIL:

1️⃣ HAPUS dari dalam <header>:
   Buang baris-baris ini dari dalam blok <header class="header-nav">...</header>:
   
   ❌ HAPUS:
   ```
   <!-- Mobile Morphing Navigation Drawer & Backdrop -->
   <div class="mobile-backdrop" id="mobile-backdrop" aria-hidden="true"></div>
   <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile menu" aria-hidden="true">
     <div class="mobile-drawer-header">
       <button id="close-drawer-btn" class="close-drawer-btn glass-btn" aria-label="Close menu">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <line x1="18" y1="6" x2="6" y2="18"></line>
           <line x1="6" y1="6" x2="18" y2="18"></line>
         </svg>
       </button>
     </div>
     <ul class="mobile-nav-list">
       {navLinks.map((link) => (
         <li>
           <a 
             href={link.href} 
             class:list={['mobile-nav-link', { 'active': link.href === currentPath || (link.href !== '/' && currentPath.startsWith(link.href)) }]}
           >
             {link.label}
           </a>
         </li>
       ))}
     </ul>
   </nav>
   ```

2️⃣ TAMBAHKAN setelah </header> ditutup:
   Masukkan kode ini TEPAT SETELAH tag penutup </header> (still dalam frontmatter section):
   
   ✅ TAMBAHKAN:
   ```
   <!-- Mobile Overlay — SENGAJA DI LUAR <header> -->
   <!-- Backdrop (dimmer + blur layer) -->
   <div
     class="mobile-backdrop"
     id="mobile-backdrop"
     aria-hidden="true"
   ></div>

   <!-- Drawer Navigation -->
   <nav
     class="mobile-drawer"
     id="mobile-drawer"
     aria-label="Mobile menu"
     aria-hidden="true"
   >
     <div class="mobile-drawer-header">
       <button
         id="close-drawer-btn"
         class="close-drawer-btn glass-btn"
         aria-label="Close menu"
       >
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
           <line x1="18" y1="6" x2="6" y2="18"></line>
           <line x1="6" y1="6" x2="18" y2="18"></line>
         </svg>
       </button>
     </div>

     <ul class="mobile-nav-list">
       {navLinks.map((link) => (
         <li>
           <a
             href={link.href}
             class:list={['mobile-nav-link', {
               'active': link.href === currentPath ||
                         (link.href !== '/' && currentPath.startsWith(link.href))
             }]}
           >
             {link.label}
           </a>
         </li>
       ))}
     </ul>
   </nav>
   ```

3️⃣ UPDATE hamburger button attributes:
   Ubah tombol hamburger agar lebih accessible:
   
   SEBELUM:
   ```
   <button id="hamburger-btn" class="hamburger-btn glass-btn" aria-label="Open menu" aria-expanded="false">
   ```
   
   SESUDAH:
   ```
   <button
     id="hamburger-btn"
     class="hamburger-btn glass-btn"
     aria-label="Open menu"
     aria-expanded="false"
     aria-controls="mobile-drawer"
   >
   ```

4️⃣ UPDATE CSS untuk .mobile-drawer:
   Di dalam blok <style is:global>...</style>, GANTI bagian .mobile-drawer:
   
   ❌ SEBELUM:
   ```css
   .mobile-drawer {
     display: none;
     position: fixed;
     top: var(--header-height-mobile);
     left: 0;
     right: 0;
     width: 100%;
     background: linear-gradient(...);
     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
     z-index: 999;
     max-height: calc(100vh - var(--header-height-mobile));
     overflow-y: auto;
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
   }

   .mobile-drawer.active {
     display: block;
   }

   @media (max-width: 1023px) {
     .mobile-drawer {
       display: block;
     }
   }
   ```
   
   ✅ SESUDAH:
   ```css
   .mobile-drawer {
     display: none;
     position: fixed;
     top: var(--header-height-mobile);
     left: 0;
     right: 0;
     width: 100%;
     max-height: calc(100dvh - var(--header-height-mobile));
     overflow-y: auto;
     background: linear-gradient(
       180deg,
       rgba(5, 20, 40, 0.95) 0%,
       rgba(15, 40, 80, 0.85) 100%
     );
     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
     z-index: 999;
     /* Drawer tertutup — sembunyikan dengan visibility + opacity */
     visibility: hidden;
     opacity: 0;
     transform: translateY(-8px);
     transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0.25s;
   }

   .mobile-drawer.active {
     visibility: visible;
     opacity: 1;
     transform: translateY(0);
     transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0s;
   }

   @media (max-width: 1023px) {
     .mobile-drawer { display: block; }
   }
   ```

5️⃣ FIX typo di .mobile-nav-link.active:
   Ubah format warna yang salah:
   
   ❌ SEBELUM:
   ```css
   .mobile-nav-link.active {
     background: rgba(210, 100%, 60%, 0.1);
     color: var(--nav-active-color);
     font-weight: 600;
     border-left: 3px solid var(--nav-active-color);
     padding-left: calc(1.5rem - 3px);
   }
   ```
   
   ✅ SESUDAH:
   ```css
   .mobile-nav-link.active {
     background: hsla(210, 100%, 60%, 0.1);
     color: var(--nav-active-color);
     font-weight: 600;
     border-left: 3px solid var(--nav-active-color);
     padding-left: calc(1.5rem - 3px);
   }
   ```

6️⃣ REFACTOR JavaScript untuk mendukung Astro View Transitions:
   Ganti seluruh blok <script>...</script> dengan:
   
   ✅ GANTI DENGAN:
   ```javascript
   <script>
     /**
      * Mobile drawer controller.
      * Mendukung Astro View Transitions — cleanup + re-init pada setiap swap.
      */
     function initMobileNav() {
       const hamburgerBtn  = document.getElementById('hamburger-btn');
       const mobileDrawer  = document.getElementById('mobile-drawer');
       const mobileBackdrop = document.getElementById('mobile-backdrop');
       const closeDrawerBtn = document.getElementById('close-drawer-btn');
       const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

       if (!hamburgerBtn || !mobileDrawer) return;

       function openDrawer() {
         hamburgerBtn.classList.add('active');
         hamburgerBtn.setAttribute('aria-expanded', 'true');
         mobileDrawer.classList.add('active');
         mobileDrawer.setAttribute('aria-hidden', 'false');
         mobileBackdrop?.classList.add('active');
         document.body.style.overflow = 'hidden';
       }

       function closeDrawer() {
         hamburgerBtn.classList.remove('active');
         hamburgerBtn.setAttribute('aria-expanded', 'false');
         mobileDrawer.classList.remove('active');
         mobileDrawer.setAttribute('aria-hidden', 'true');
         mobileBackdrop?.classList.remove('active');
         document.body.style.overflow = '';
       }

       hamburgerBtn.addEventListener('click', openDrawer);
       closeDrawerBtn?.addEventListener('click', closeDrawer);
       mobileBackdrop?.addEventListener('click', closeDrawer);
       mobileNavLinks.forEach((link) => link.addEventListener('click', closeDrawer));

       // Tutup drawer setiap kali Astro view transition terjadi
       document.addEventListener('astro:before-swap', closeDrawer, { once: true });
     }

     // Init on first load
     document.addEventListener('DOMContentLoaded', initMobileNav);
     // Re-init setelah setiap page swap (View Transitions)
     document.addEventListener('astro:after-swap', initMobileNav);
   </script>
   ```

---

🔍 RINGKASAN PERUBAHAN:

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| **Lokasi .mobile-drawer** | Inside `<header>` | Outside `<header>` ✓ |
| **Lokasi .mobile-backdrop** | Inside `<header>` | Outside `<header>` ✓ |
| **position: fixed acuan** | Parent header (containing block) ❌ | Viewport ✓ |
| **max-height** | `calc(100vh - ...)` | `calc(100dvh - ...)` (dynamic viewport height) ✓ |
| **Animasi buka/tutup** | `display: none/block` | `visibility + opacity + transform` (smooth) ✓ |
| **Color format .active** | `rgba(210, 100%, 60%, 0.1)` (salah) | `hsla(210, 100%, 60%, 0.1)` ✓ |
| **Script handler** | Hanya DOMContentLoaded | DOMContentLoaded + astro:after-swap ✓ |

---

📌 VALIDATION CHECKLIST:

Setelah perubahan selesai, verifikasi:
- [ ] Header masih fixed di atas
- [ ] Mobile drawer terbuka fullscreen hingga ke bawah ✓
- [ ] Mobile drawer NOT terpotong lagi
- [ ] Backdrop blur bekerja
- [ ] Hamburger icon rotate dengan smooth
- [ ] Drawer nutup saat klik link/backdrop
- [ ] Semua smooth transition berjalan
- [ ] Page navigation (View Transitions) masih work, drawer auto-close

---

🚀 PERINTAH:
Eksekusi perubahan tepat di file: src/components/layout/Header.astro
Simpan dan commit dengan message: "fix: resolve CSS containing block trap by moving mobile drawer outside header"
```

---

## 📤 COPY-PASTE LENGKAP UNTUK ANTIGRAVITY

Jika ingin langsung copy-paste full file yang sudah diupdate, berikut adalah **complete Header.astro** dengan semua perbaikan:

```astro name="Header.astro (FINAL FIX)" url="https://github.com/MStafsir/WEB-CLOUDSI/blob/main/src/components/layout/Header.astro"
---
/**
 * Header.astro
 * Navigasi utama Cloudsi Connect — Bifurcated responsive morphing menu
 *
 * FIX: CSS Containing Block Trap (backdrop-filter)
 * .mobile-drawer & .mobile-backdrop dipindahkan ke LUAR <header>.
 * Keduanya kini sibling langsung di DOM level halaman, bukan child dari
 * .header-nav yang memiliki backdrop-filter (penyebab containing block baru).
 * Referensi: https://www.w3.org/TR/css-transforms-1/#containing-block-for-all-fixed
 */
const currentPath = Astro.url.pathname;
const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/anggota', label: 'Anggota' },
  { href: '/acara', label: 'Acara' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/lagu', label: 'Lagu Angkatan' },
];
---

<!-- ═══════════════════════════════════════════════════════════════
     HEADER — Hanya berisi logo + desktop nav + hamburger button.
     Tidak ada lagi .mobile-drawer / .mobile-backdrop di sini.
     Dengan begitu backdrop-filter pada .header-nav tidak lagi
     membentuk containing block yang menjebak elemen fixed di bawah.
     ═══════════════════════════════════════════════════════════════ -->
<header class="header-nav" id="main-header">
  <div class="header-container">

    <!-- Logo Typography -->
    <a href="/" class="header-logo-group">
      <img src="/logo-angkatan-25.webp" alt="Logo Cloudsi" class="header-logo-img" />
      <div class="header-logo-text-group">
        <h1 class="header-logo-text">CLOUDSI</h1>
        <span class="header-logo-sub">Sistem Informasi UNTAN</span>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav" aria-label="Desktop menu">
      <ul class="nav-list">
        {navLinks.map((link) => (
          <li>
            <a
              href={link.href}
              class:list={['nav-link', {
                'active': link.href === currentPath ||
                          (link.href !== '/' && currentPath.startsWith(link.href))
              }]}
            >
              {link.label}
              <span class="underline-hover"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <!-- Hamburger Toggle (Mobile/Tablet Only) -->
    <button
      id="hamburger-btn"
      class="hamburger-btn glass-btn"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobile-drawer"
    >
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
    </button>

  </div>
</header>

<!-- ═══════════════════════════════════════════════════════════════
     MOBILE OVERLAY — SENGAJA DI LUAR <header>.
     
     WHY THIS WORKS:
     Kedua elemen ini sekarang hidup di dalam <body> langsung
     (atau wrapper .relative.z-10 di BaseLayout), bukan di dalam
     elemen yang punya backdrop-filter. Tidak ada lagi containing
     block palsu — position: fixed kembali mengacu ke viewport.
     ═══════════════════════════════════════════════════════════════ -->

<!-- Backdrop (dimmer + blur layer) -->
<div
  class="mobile-backdrop"
  id="mobile-backdrop"
  aria-hidden="true"
></div>

<!-- Drawer Navigation -->
<nav
  class="mobile-drawer"
  id="mobile-drawer"
  aria-label="Mobile menu"
  aria-hidden="true"
>
  <div class="mobile-drawer-header">
    <button
      id="close-drawer-btn"
      class="close-drawer-btn glass-btn"
      aria-label="Close menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <ul class="mobile-nav-list">
    {navLinks.map((link) => (
      <li>
        <a
          href={link.href}
          class:list={['mobile-nav-link', {
            'active': link.href === currentPath ||
                      (link.href !== '/' && currentPath.startsWith(link.href))
          }]}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

<style is:global>
  /* ═══════════════════════════════════════════════════════════════
   * HEADER NAVIGATION
   * Desktop (>= 1024px): Horizontal nav
   * Mobile/Tablet (< 1024px): Hamburger + fullscreen drawer
   * ═══════════════════════════════════════════════════════════════ */

  :root {
    --header-height: 80px;
    --header-height-mobile: 72px;
    --nav-item-padding: 0.75rem 1rem;
    --nav-item-font-size: 1rem;
    --nav-active-color: hsl(210, 100%, 60%);
    --nav-hover-color: hsl(210, 100%, 70%);
  }

  /* ── Header bar ── */
  .header-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: var(--header-height);
    background: linear-gradient(
      180deg,
      rgba(5, 20, 40, 0.8) 0%,
      rgba(5, 20, 40, 0.5) 100%
    );
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 998;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    /* NOTE: backdrop-filter di sini sudah aman karena .mobile-drawer
       dan .mobile-backdrop bukan lagi child dari elemen ini. */
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 100%;
    max-width: 100%;
  }

  /* ── Logo ── */
  .header-logo-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    flex-shrink: 0;
    flex-wrap: wrap;
    transition: opacity 0.3s ease;
  }

  .header-logo-group:hover { opacity: 0.8; }

  .header-logo-img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 8px;
  }

  .header-logo-text-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .header-logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #fff;
    margin: 0;
    line-height: 1;
  }

  .header-logo-sub {
    font-size: 0.65rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ── Desktop nav ── */
  .desktop-nav {
    display: none;
    flex: 1;
    justify-content: center;
    margin: 0 2rem;
  }

  @media (min-width: 1024px) {
    .desktop-nav { display: flex; }
  }

  .nav-list {
    display: flex;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    padding: var(--nav-item-padding);
    font-size: var(--nav-item-font-size);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    position: relative;
    white-space: nowrap;
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .nav-link:hover        { color: var(--nav-hover-color); }
  .nav-link.active       { color: var(--nav-active-color); }

  .underline-hover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--nav-active-color);
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .nav-link:hover .underline-hover,
  .nav-link.active .underline-hover {
    opacity: 1;
    transform: scaleX(1);
  }

  /* ── Hamburger ── */
  .hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.4rem;
    width: 48px;
    height: 48px;
    padding: 0;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .hamburger-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 1024px) {
    .hamburger-btn { display: none; }
  }

  .line {
    width: 20px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  .hamburger-btn.active .line-1 { transform: translateY(8px)  rotate(45deg); }
  .hamburger-btn.active .line-2 { opacity: 0; }
  .hamburger-btn.active .line-3 { transform: translateY(-8px) rotate(-45deg); }

  /* ═══════════════════════════════════════════════════════════════
   * MOBILE OVERLAY — Backdrop + Drawer
   *
   * CRITICAL: Kedua aturan ini menggunakan position: fixed dengan
   * acuan VIEWPORT (bukan parent), karena elemen-elemen ini sudah
   * berada di luar <header> yang punya backdrop-filter.
   * ═══════════════════════════════════════════════════════════════ */

  /* ── Backdrop ── */
  .mobile-backdrop {
    display: none;                     /* hidden on desktop */
    position: fixed;
    inset: 0;                          /* top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 997;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .mobile-backdrop.active {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 1023px) {
    .mobile-backdrop { display: block; }
  }

  /* ── Drawer ── */
  .mobile-drawer {
    display: none;                     /* hidden on desktop by default */
    position: fixed;
    top: var(--header-height-mobile);
    left: 0;
    right: 0;
    width: 100%;
    max-height: calc(100dvh - var(--header-height-mobile));
    overflow-y: auto;
    background: linear-gradient(
      180deg,
      rgba(5, 20, 40, 0.95) 0%,
      rgba(15, 40, 80, 0.85) 100%
    );
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 999;
    /* Drawer tertutup — sembunyikan dengan visibility + opacity
       agar tidak mengganggu pointer events saat tidak aktif */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0.25s;
  }

  .mobile-drawer.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0s;
  }

  @media (max-width: 1023px) {
    /* Pastikan drawer bisa di-toggle di breakpoint mobile */
    .mobile-drawer { display: block; }
  }

  /* ── Drawer inner ── */
  .mobile-drawer-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .close-drawer-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
  }

  .close-drawer-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .mobile-nav-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-nav-link {
    display: block;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--nav-hover-color);
  }

  .mobile-nav-link.active {
    background: hsla(210, 100%, 60%, 0.1);
    color: var(--nav-active-color);
    font-weight: 600;
    border-left: 3px solid var(--nav-active-color);
    padding-left: calc(1.5rem - 3px);
  }
</style>

<script>
  /**
   * Mobile drawer controller.
   * Mendukung Astro View Transitions — cleanup + re-init pada setiap swap.
   */
  function initMobileNav() {
    const hamburgerBtn  = document.getElementById('hamburger-btn');
    const mobileDrawer  = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburgerBtn || !mobileDrawer) return;

    function openDrawer() {
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileBackdrop?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileBackdrop?.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    closeDrawerBtn?.addEventListener('click', closeDrawer);
    mobileBackdrop?.addEventListener('click', closeDrawer);
    mobileNavLinks.forEach((link) => link.addEventListener('click', closeDrawer));

    // Tutup drawer setiap kali Astro view transition terjadi
    document.addEventListener('astro:before-swap', closeDrawer, { once: true });
  }

  // Init on first load
  document.addEventListener('DOMContentLoaded', initMobileNav);
  // Re-init setelah setiap page swap (View Transitions)
  document.addEventListener('astro:after-swap', initMobileNav);
</script>
```

---

## 🎯 OPSI KIRIM KE ANTIGRAVITY

**Pilih salah satu format yang paling nyaman:**

### **Opsi 1: Gunakan Prompt Teknis (Recommended)**
Copy seluruh section **PROMPT TEKNIS UNTUK ANTIGRAVITY** di atas, paste ke Antigravity interface dengan instruksi:

```
Baca prompt teknis ini dengan SANGAT DETAIL dan eksekusi
SEMUA perubahan yang diminta pada file src/components/layout/Header.astro.
Jangan lewatkan SATU PUN dari langkah-langkah yang dijelaskan.
```

### **Opsi 2: Full File Replacement**
Jika Antigravity support "replace entire file", gunakan **Copy-Paste Lengkap** di atas.

### **Opsi 3: Step-by-Step via Chat**
Copy section **📋 INSTRUKSI PERUBAHAN DETAIL** dan jalankan step-by-step.

---

**Mana yang akan Anda gunakan?** 🚀
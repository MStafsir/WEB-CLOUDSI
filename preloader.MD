---
/**
 * Preloader.astro — FIXED v2
 * Bug fixes:
 * - Removed import('ogl') from critical assets (was causing infinite hang)
 * - Added per-asset timeout wrapper (no single asset can block forever)
 * - Fixed fake interval ceiling (was capped at 60, now 85)
 * - Reduced safety timeout 6000ms → 3500ms
 * - Glass wipe transition logic untouched (was working)
 */
---

<!-- BYPASS INSTAN: Jika sudah pernah load, skip preloader -->
<script is:inline>
  if (sessionStorage.getItem('cloudsi_loaded')) {
    document.documentElement.classList.add('is-loaded');
  }
</script>

<style is:global>
  html.is-loaded #initial-preloader {
    display: none !important;
  }
</style>

<!-- ============================================
     1. INITIAL PRELOADER
     ============================================ -->
<div id="initial-preloader" class="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[hsl(210,60%,6%)]" style="transition: opacity 800ms ease-in-out;">
  <div class="text-center flex flex-col items-center gap-2">
    <div class="relative mb-2">
      <img src="/logo-angkatan-25.png" alt="Cloudsi" width="60" height="60"
        class="animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
    </div>
    <h2 class="font-serif text-3xl font-light tracking-[0.45em] text-white/90 m-0">CLOUDSI</h2>
    <p class="font-sans text-[0.65rem] tracking-[0.35em] uppercase text-[#66b3cc]/70 m-0">Cloud · Sky · Information</p>

    <div class="w-[200px] h-[2px] bg-[#1a2f42] rounded-full overflow-hidden mt-5">
      <div id="preloader-bar" class="h-full w-0 rounded-full bg-gradient-to-r from-[#1785a6] to-[#60bfe0]"
        style="transition: width 300ms ease-out;"></div>
    </div>
    <p id="preloader-text" class="font-sans text-[0.7rem] tracking-[0.15em] text-[#3d8b9e] mt-2">0%</p>
  </div>
</div>

<!-- ============================================
     2. GLASSMORPHISM PAGE TRANSITION
     ============================================ -->
<div id="glass-wipe" transition:persist="glass-wipe"
  class="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center"
  style="transform: translateY(100%); transition: transform 600ms cubic-bezier(0.76,0,0.24,1);">
  <div class="absolute inset-0 bg-white/10 backdrop-blur-xl border-t border-b border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)]">
    <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
      style="transform: translateX(-100%); animation: shimmer 1.5s infinite;"></div>
  </div>
  <div class="relative">
    <h2 class="font-serif text-2xl tracking-[0.6em] text-white/90 uppercase drop-shadow-md">Cloudsi</h2>
  </div>
</div>

<style>
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
</style>

<script is:inline>
(function () {
  'use strict';

  /**
   * FIX UTAMA: Bungkus setiap promise dengan timeout
   * Jika asset tidak selesai dalam N ms, anggap selesai (resolve paksa)
   * Ini mencegah 1 asset hang memblokir seluruh loading screen
   */
  function withTimeout(promise, ms) {
    var timeout = new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
    return Promise.race([promise, timeout]);
  }

  function dismiss(initialEl) {
    if (!initialEl) return;
    initialEl.style.opacity = '0';
    initialEl.style.pointerEvents = 'none';
    sessionStorage.setItem('cloudsi_loaded', 'true');
    setTimeout(function () {
      if (initialEl.parentNode) initialEl.parentNode.removeChild(initialEl);
    }, 850);
  }

  function initLogic() {
    var initialEl = document.getElementById('initial-preloader');
    var isFirstVisit = !sessionStorage.getItem('cloudsi_loaded');

    if (!isFirstVisit) return;
    if (!initialEl) return;

    var barEl = document.getElementById('preloader-bar');
    var textEl = document.getElementById('preloader-text');
    var progress = 0;
    var dismissed = false;

    function setProgress(val) {
      progress = Math.min(Math.round(val), 100);
      if (barEl) barEl.style.width = progress + '%';
      if (textEl) textEl.textContent = progress + '%';
    }

    // --- BANGUN DAFTAR ASET KRITIS ---
    // PENTING: OGL *tidak* dimasukkan ke sini karena:
    // 1. Bukan aset yang user lihat langsung
    // 2. Load dari unpkg.com bisa lambat/timeout → menyebabkan progress stuck
    // OGL akan tetap load sendiri di background saat dibutuhkan

    var criticalAssets = [];

    // Asset 1: Logo (paling cepat, biasanya < 200ms)
    var img = new Image();
    img.src = '/logo-angkatan-25.png';
    criticalAssets.push(
      withTimeout(
        new Promise(function (resolve) {
          if (img.complete) return resolve();
          img.onload = resolve;
          img.onerror = resolve;
        }),
        2000 // max 2 detik untuk logo
      )
    );

    // Asset 2: Font Cormorant Garamond
    if (document.fonts && document.fonts.load) {
      criticalAssets.push(
        withTimeout(
          document.fonts.load('300 1em "Cormorant Garamond"').catch(function () {}),
          2500 // max 2.5 detik untuk font
        )
      );
    }

    // Asset 3: Video background (opsional, timeout cepat)
    var videoEl = document.getElementById('bg-hero-video');
    if (videoEl) {
      criticalAssets.push(
        withTimeout(
          new Promise(function (resolve) {
            // readyState >= 2 = sudah punya metadata, cukup untuk mulai play
            if (videoEl.readyState >= 2) return resolve();
            videoEl.addEventListener('loadeddata', resolve, { once: true });
            videoEl.addEventListener('error', resolve, { once: true });
          }),
          3000 // max 3 detik untuk video, lalu lanjut saja
        )
      );
    }

    // --- FAKE PROGRESS SAAT MENUNGGU ASET ---
    // Naik smooth dari 0 ke 85, sisanya tunggu assets selesai
    var fakeInterval = setInterval(function () {
      if (progress < 85) {
        // Makin lambat makin mendekati 85 (easing natural)
        var increment = (85 - progress) * 0.04 + 0.3;
        setProgress(progress + increment);
      } else {
        clearInterval(fakeInterval);
      }
    }, 80);

    var loaded = 0;
    var total = criticalAssets.length;

    criticalAssets.forEach(function (p) {
      p.then(function () {
        loaded++;
        // Progress real dari asset: dari 85 ke 98
        var realProgress = 85 + ((loaded / total) * 13);
        if (realProgress > progress) setProgress(realProgress);
      });
    });

    // Saat semua selesai (atau timeout masing-masing sudah terpenuhi)
    Promise.all(criticalAssets).then(function () {
      if (dismissed) return;
      dismissed = true;
      clearInterval(fakeInterval);
      setProgress(100);
      setTimeout(function () { dismiss(initialEl); }, 400);
    });

    // SAFETY NET: Jika dalam 4 detik belum selesai, paksa dismiss
    // Sebelumnya 6000ms — terlalu lama, user menunggu 6 detik di 0%
    setTimeout(function () {
      if (dismissed) return;
      dismissed = true;
      clearInterval(fakeInterval);
      setProgress(100);
      dismiss(initialEl);
    }, 4000);
  }

  // --- GLASSMORPHISM PAGE TRANSITION ---
  function initPageTransition() {
    if (window.__cloudsiWipeInit) return;
    window.__cloudsiWipeInit = true;

    document.addEventListener('astro:before-preparation', function () {
      var glassWipe = document.getElementById('glass-wipe');
      if (glassWipe) {
        glassWipe.style.transition = 'transform 600ms cubic-bezier(0.76,0,0.24,1)';
        glassWipe.style.transform = 'translateY(0)';
      }
    });

    document.addEventListener('astro:after-swap', function () {
      var glassWipe = document.getElementById('glass-wipe');
      if (!glassWipe) return;

      setTimeout(function () {
        glassWipe.style.transform = 'translateY(-100%)';

        setTimeout(function () {
          glassWipe.style.transition = 'none';
          glassWipe.style.transform = 'translateY(100%)';
          setTimeout(function () {
            glassWipe.style.transition = 'transform 600ms cubic-bezier(0.76,0,0.24,1)';
          }, 50);
        }, 620);
      }, 50);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initLogic();
      initPageTransition();
    });
  } else {
    initLogic();
    initPageTransition();
  }

})();
</script>
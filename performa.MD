Halo, ini adalah bug report performa lanjutan berdasarkan Firefox Profiler (Graphics + Network layer).
Perbaiki semua poin berikut. Ada temuan BARU yang kritis.

===================================================================
[TEMUAN BARU KRITIS] LOGO ANGKATAN DI-REQUEST 8× — CASCADING LOOP
===================================================================
Dari Network Requests di Marker Chart terlihat:
  - /logo-angkatan-25.webp di-request 8+ kali dalam satu session
  - Pola cascading bertingkat di waterfall = ada loop/trigger berulang

AUDIT segera:
  1. Cari semua onload/onerror handler yang meng-assign .src → tidak boleh assign .src di dalam callback load
  2. Cari @keyframes yang menggunakan url() di dalamnya → pindahkan ke class CSS statis, jangan di dalam keyframes
  3. Cari JS/GSAP yang manipulasi src atau background-image di dalam ScrollTrigger atau rAF loop
  4. Tambahkan di : 
  5. Test: Network tab → Disable Cache DIMATIKAN → logo harus muncul SEKALI (200), selanjutnya dari cache (304/disk)

===================================================================
[TEMUAN BARU] FORCED SYNCHRONOUS REFLOW
===================================================================
Dari Marker Chart: "Reflow (sync)" terdeteksi → JS membaca layout property
setelah menulis style di loop yang sama.

CARI dan PERBAIKI pattern ini di seluruh codebase:
  PATTERN SALAH: forEach loop yang membaca offsetHeight/getBoundingClientRect
                 lalu langsung menulis style di iterasi yang sama

  CARA FIX: Pisahkan jadi dua pass:
    Pass 1: Baca semua nilai layout yang dibutuhkan → simpan ke array
    Pass 2: Tulis semua style → gunakan nilai dari array

  KEYWORD yang harus dicari: offsetWidth, offsetHeight, offsetTop,
  getBoundingClientRect(), getComputedStyle(), scrollTop, clientHeight

===================================================================
[TEMUAN BARU] SetNeedStyleFlush TERUS-MENERUS
===================================================================
Dari Graphics Marker: SetNeedStyleFlush + DoFlushPendingNotifications
firing setiap frame = ada CSS property non-composite dianimasikan.

FIX:
  - Audit semua gsap.to() dan CSS transition/animation
  - HAPUS animasi pada property: width, height, top, left, margin, padding
  - IZINKAN animasi hanya pada: transform, opacity (GPU composite)
  - Tambahkan will-change: transform, opacity HANYA pada elemen yang dianimasikan
  - JANGAN gunakan will-change: all

===================================================================
[SEBELUMNYA] GSAP — ScrollTrigger semua section
===================================================================
  - Tambahkan once: true di SEMUA ScrollTrigger
  - Gunakan ScrollTrigger.batch() untuk section berulang
  - Hero/top section: init langsung, bukan ScrollTrigger
  - TEST: Disable GSAP total → kalau smooth = GSAP penyebab utama

===================================================================
[SEBELUMNYA] Lenis — Pause saat idle
===================================================================
  - lenis.stop() saat init
  - lenis.start() saat ada scroll event
  - setTimeout 150ms setelah scroll berhenti → lenis.stop()

===================================================================
[SEBELUMNYA] OGL Water Reflection
===================================================================
  - cancelAnimationFrame by default
  - Aktifkan hanya saat pointerenter/touchstart
  - Matikan saat pointerleave/touchend + IntersectionObserver

===================================================================
[SEBELUMNYA] CSS Bounce/CloudSI Animation
===================================================================
  - Ganti infinite → forwards atau 1 iteration
  - animation-play-state: paused by default
  - Aktifkan via IntersectionObserver saat elemen masuk viewport

===================================================================
[SEBELUMNYA] Foto Member — Cache setelah load
===================================================================
  - Map-based image cache untuk mencegah re-fetch
  - Kalau pakai Astro View Transitions: tambahkan transition:persist
  - Cache-Control header: public, max-age=86400

===================================================================
URUTAN PRIORITAS EKSEKUSI:
===================================================================
  1. [KRITIS] Fix logo cascading loop dulu → verifikasi di Network tab
  2. [KRITIS] Fix forced reflow (audit read-write pattern)
  3. [HIGH]   SetNeedStyleFlush → audit CSS properties dianimasikan
  4. [HIGH]   GSAP: tambahkan once:true semua ScrollTrigger
  5. [HIGH]   OGL: tambahkan gating pointerenter + IntersectionObserver
  6. [HIGH]   Lenis: pause/resume berdasarkan scroll
  7. [MED]    CSS animation: batasi iteration count
  8. [MED]    Member photos: cache strategy

VALIDASI setiap fix dengan Firefox Profiler:
  → RefreshDriverTick harus tidak lagi solid bar
  → SetNeedStyleFlush harus berkurang drastis
  → Network Requests: logo harus 1× request saja
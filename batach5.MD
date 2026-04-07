Batch terakhir konten. Ini adalah halaman paling kompleks secara data.

=== TUGAS BATCH INI ===

TUGAS 1 — Buat src/pages/anggota.astro + MemberCard component lengkap

  Hero section:
    - Judul: "Anggota Cloudsi"
    - Counter: "75 Jiwa · Satu Angkatan"
    - Tinggi: 40vh
    
  Search & Filter bar (glass style):
    - Input search: cari berdasarkan nama atau nickname
      Implementasi: client-side filter pada array data yang sudah di-fetch
      Debounce: 300ms setelah user berhenti mengetik
    - Filter dropdown Role:
      "Semua" | "Pengurus" (Ketua/Wakil/Sekretaris/Bendahara) | "Anggota"
    - Hasil pencarian: animated (fade + reflow smooth)
    
  Grid anggota:
    Ukuran card: aspect-ratio 2/3
    Desktop: 5 kolom
    Tablet : 3 kolom
    Mobile : 2 kolom
    Gap    : 1rem
    
  MemberCard Component (src/components/ui/MemberCard.astro):
    Front state (default):
      - Foto penuh dengan gradient overlay bawah
      - Nama (font-display, white, 1rem) di bawah
      - Role badge di pojok kiri atas (glass pill)
      - view-transition-name: `member-${member.id}`
      
    Hover state (CSS only — no JavaScript):
      - Glass info panel slide-up dari bawah (translateY 100%→0)
      - Panel height: ~40% dari card
      - Konten panel:
          · Nama lengkap (bold)
          · Nickname dalam tanda kurung (italic, opacity 0.7)
          · Quote (max 2 baris, font-display, italic, kecil)
          · 2 icon social (Instagram, LinkedIn) jika ada — glass icon button
      
    Mobile tap behavior:
      - First tap: tampilkan panel (toggle class)
      - Second tap di area lain: tutup panel
      
    Photo loading:
      - src: Cloudinary URL 400w AVIF
      - srcset: buildSrcSet(member.photo_url)
      - sizes: "(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
      - loading: "lazy" untuk semua karena di-scroll
      - Fallback onerror: tampilkan inisial nama di background gradient
        (warna background: hash dari nama → hue yang konsisten)
      
    Inisial fallback generator (JavaScript):
      function getInitials(name: string): string {
        return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
      }
      function nameToHue(name: string): number {
        return name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
      }
      
  Sorting default: Pengurus duluan (urutan: Ketua→Wakil→Sekretaris→
    Bendahara→Anggota), lalu alphabetical per grup
    
  Pagination: TIDAK digunakan — tampilkan semua 75 sekaligus
    (75 card dengan lazy loading = performa tetap baik)

TUGAS 2 — Buat src/pages/kontak.astro

  Layout: 2 kolom (desktop) / 1 kolom (mobile)
  
  Kolom kiri — Info:
    - Judul: "Hubungi Kami"
    - Deskripsi singkat
    - 2-3 info kontak (Instagram angkatan, email — gunakan placeholder)
    - Tiap info: icon + text, glass row style
    
  Kolom kanan — Form:
    Glass container dengan border --glass-border
    
    Fields:
      1. Nama Lengkap (required, min 2 karakter)
      2. Email (required, format email valid)
      3. Pesan (required, min 10 karakter, max 500 karakter)
         - Textarea, min-height 120px, resize vertical only
         - Character counter: "X / 500" di pojok kanan bawah
    
    Submit button:
      - Full width
      - Text: "Kirim Pesan"
      - Loading state: spinner + "Mengirim..."
      - Success state: checkmark + "Pesan Terkirim!"
      - Error state: "Gagal mengirim. Coba lagi."
      
    Backend: Supabase Edge Function atau Resend API
      Jika menggunakan Resend:
        - POST ke /api/contact (Astro API route)
        - Rate limit check: simpan IP + timestamp ke Supabase table `contact_logs`
        - Reject jika IP sama submit > 3× dalam 1 jam
        - Honeypot field: <input name="website" class="sr-only" tabindex="-1">
          Jika field ini terisi → reject silently (bot trap)
          
    Validasi client-side:
      - Real-time: border merah + pesan error per field
      - Semua validasi menggunakan Constraint Validation API native browser
      - Tidak ada library form validation eksternal
      
    Buat src/pages/api/contact.ts (Astro API Route):
      - Method: POST only (reject GET dengan 405)
      - Parse body: nama, email, pesan, website (honeypot)
      - Validasi ulang di server (jangan hanya percaya client)
      - Kirim email via Resend ke email admin (ENV: ADMIN_EMAIL)
      - Response: JSON { success: boolean, message: string }

=== ATURAN KETAT ===
1. Search/filter WAJIB bekerja tanpa request network tambahan
   (semua data sudah di-fetch saat build, filter di DOM/JS)
2. MemberCard hover panel WAJIB pakai CSS :hover saja untuk desktop,
   JavaScript hanya untuk mobile tap toggle
3. Form WAJIB ada loading/success/error state yang jelas
4. Honeypot field WAJIB ada — wajib punya class "sr-only" agar 
   tidak terlihat user normal tapi terisi bot
5. Tidak boleh ada NIM atau email anggota yang tampil di halaman publik ini

=== OUTPUT YANG DIHARAPKAN ===
Seluruh isi semua file + checklist final:
□ 75 card ter-render dengan lazy loading
□ Search filter bekerja real-time
□ Fallback inisial aktif jika foto gagal load
□ Form submit berhasil dan ada feedback state
□ Honeypot bot trap aktif
□ Rate limiting kontak aktif
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

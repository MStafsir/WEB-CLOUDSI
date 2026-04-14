/**
 * src/types/index.ts
 * TypeScript interfaces untuk seluruh data model Cloudsi Connect
 * Digunakan oleh: supabase.ts, komponen Member, Event, Gallery, Timeline
 * Dependencies: Tidak ada (pure type definitions)
 */

/** Anggota angkatan — profil dengan role dan sosial media */
export interface Member {
  id: number;
  full_name: string;
  nickname?: string;
  role: 'Ketua' | 'Wakil Ketua' | 'Sekretaris' | 'Bendahara' | 'Anggota' | 'DEV';
  quote?: string;
  photo_url: string;
  social_ig?: string;
  social_in?: string;
  social_gh?: string;
  is_visible: boolean;
}

/** Acara/kegiatan angkatan */
export interface Event {
  id: number;
  title: string;
  date: string;
  description?: string;
  cover_image: string;
  slug: string;
}

/** Entry timeline — milestone kronologis angkatan */
export interface TimelineEntry {
  id: number;
  date: string;
  title: string;
  description?: string;
  order_index: number;
}

/** Gambar galeri — terkait dengan event tertentu */
export interface GalleryImage {
  id: number;
  event_id: number;
  image_url: string;
}

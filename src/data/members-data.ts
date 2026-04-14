/**
 * src/data/members-data.ts
 * Data lokal anggota Cloudsi — digunakan sebagai sumber data utama
 * Foto: public/members/{id}.jpg
 * Urutan: Pengurus Inti → DEV (Srilintang) → Anggota by NIM ascending
 */

import type { Member } from '../types/index';

export const MEMBERS_DATA: Member[] = [
  // === PENGURUS INTI (Posisi 1-6) ===
  { id: 1, full_name: "Phasacola Grey Kalista", nickname: "Phasacola", role: "Ketua", quote: "", photo_url: "/members/1.webp", social_ig: "https://www.instagram.com/phasacola?igsh=azlhNzRiZHYxMWdl", social_in: "phasacola-grey", is_visible: true },
  { id: 2, full_name: "Rifkitio Hardiono", nickname: "Rifkitio", role: "Wakil Ketua", quote: "", photo_url: "/members/2.webp", social_ig: "", social_in: "rifkitio-hardiono", is_visible: true },
  { id: 3, full_name: "Ellen Fitri Shanika Karrin Malau", nickname: "Ellen", role: "Sekretaris", quote: "", photo_url: "/members/3.webp", social_ig: "https://www.instagram.com/shaskyrell8?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", social_in: "ellen-fitri-shanika", is_visible: true },
  { id: 4, full_name: "Dhini Zakiyatul Wafa", nickname: "Dhini", role: "Sekretaris", quote: "", photo_url: "/members/4.webp", social_ig: "https://www.instagram.com/zkwaf.xz?igsh=NTJqaTFqcm96dTg2", social_in: "dhini-zakiyatul-wafa", is_visible: true },
  { id: 5, full_name: "Syarifah Putri", nickname: "Syarifah", role: "Bendahara", quote: "", photo_url: "/members/5.webp", social_ig: "https://www.instagram.com/syarifahpuutri/", social_in: "syarifah-putri", is_visible: true },
  { id: 6, full_name: "Andini Putri Malaya", nickname: "Andini", role: "Bendahara", quote: "", photo_url: "/members/6.webp", social_ig: "https://www.instagram.com/layaaya__?igsh=ajlrMm5zcXJiNzdv", social_in: "andini-putri-malaya", is_visible: true },

  // === DEV — Posisi 7 (Baris 2 Kolom 3) ===
  { id: 24, full_name: "MUHAMAD SHOLICHIN TAFSIR SRILINTANG", nickname: "SRILINTANG", role: "DEV", quote: "", photo_url: "/members/24.webp", social_ig: "https://www.instagram.com/srilintang_/", social_in: "https://www.linkedin.com/in/muhamad-sholichin-tafsir-srilintang-b89867379/?skipRedirect=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpCER9gozQuK0wfkqOfftKA%3D%3D", social_gh: "https://github.com/MStafsir", is_visible: true },

  // === ANGGOTA — Diurutkan berdasarkan NIM terkecil ke terbesar ===
  // NIM: H1101251002
  { id: 17, full_name: "Nova Amelia", nickname: "Nova", role: "Anggota", quote: "", photo_url: "/members/17.webp", social_ig: "https://www.instagram.com/_____novaaaa?igsh=MTY2OWQ3czBuMmdsZw==", social_in: "nova-amelia", is_visible: true },
  // NIM: H1101251003
  { id: 25, full_name: "M. Hafizh Al Fitra", nickname: "Hafizh", role: "Anggota", quote: "", photo_url: "/members/25.webp", social_ig: "https://www.instagram.com/apiz_o2?igsh=a3ZjYXhlNzY5M3Ux", social_in: "hafizh-al-fitra", is_visible: true },
  // NIM: H1101251004
  { id: 26, full_name: "Dimas Luthfi Salim", nickname: "Dimas", role: "Anggota", quote: "", photo_url: "/members/26.webp", social_ig: "https://www.instagram.com/diimmrlyn?igsh=dGc5YmViamVwZGFx", social_in: "dimas-luthfi-salim", is_visible: true },
  // NIM: H1101251006
  { id: 14, full_name: "Sri Wahyuni", nickname: "Sri", role: "Anggota", quote: "", photo_url: "/members/14.webp", social_ig: "https://www.instagram.com/sriwwhn?igsh=NzQyaDJlOHloeG93", social_in: "sri-wahyuni", is_visible: true },
  // NIM: H1101251007
  { id: 27, full_name: "Neisya Fadilla", nickname: "Neisya", role: "Anggota", quote: "", photo_url: "/members/27.webp", social_ig: "https://www.instagram.com/nsa.sya/", social_in: "neisya-fadilla", is_visible: true },
  // NIM: H1101251008
  { id: 28, full_name: "Akmal Pasha", nickname: "Akmal", role: "Anggota", quote: "", photo_url: "/members/28.webp", social_ig: "https://www.instagram.com/im_arnev/", social_in: "akmal-pasha", is_visible: true },
  // NIM: H1101251009
  { id: 29, full_name: "Fahriello Ardhayana", nickname: "Fahriello", role: "Anggota", quote: "", photo_url: "/members/29.webp", social_ig: "https://www.instagram.com/riloo._?igsh=NTUzbTdodTQxd3Ew", social_in: "fahriello-ardhayana", is_visible: true },
  // NIM: H1101251010
  { id: 16, full_name: "Nasywa Akmalia Hanif", nickname: "Nasywa", role: "Anggota", quote: "", photo_url: "/members/16.webp", social_ig: "https://www.instagram.com/nnassh._?igsh=NmgxeG12aWhrNXNm", social_in: "nasywa-akmalia-hanif", is_visible: true },
  // NIM: H1101251011
  { id: 30, full_name: "Gendis Setyawan", nickname: "Gendis", role: "Anggota", quote: "", photo_url: "/members/30.webp", social_ig: "https://www.instagram.com/genndisn/", social_in: "gendis-setyawan", is_visible: true },
  // NIM: H1101251012
  { id: 31, full_name: "Charles Wong", nickname: "Charles", role: "Anggota", quote: "", photo_url: "/members/31.webp", social_ig: "https://www.instagram.com/chrleswg?igsh=MXVlM25sanY4NzY3dw==", social_in: "charles-wong", is_visible: true },
  // NIM: H1101251015
  { id: 32, full_name: "Ahmad Rahman", nickname: "Ahmad", role: "Anggota", quote: "", photo_url: "/members/32.webp", social_ig: "https://www.instagram.com/rahmnsye?igsh=MXd0dTA0N2o3bGN1ag%3D%3D&utm_source=qr", social_in: "ahmad-rahman", is_visible: true },
  // NIM: H1101251017
  { id: 33, full_name: "M. Hizbullah Pohan", nickname: "Hizbullah", role: "Anggota", quote: "", photo_url: "/members/33.webp", social_ig: "", social_in: "hizbullah-pohan", is_visible: true },
  // NIM: H1101251018
  { id: 34, full_name: "Tiara Maritza", nickname: "Tiara", role: "Anggota", quote: "", photo_url: "/members/34.webp", social_ig: "https://www.instagram.com/tiaramrtzaa?igsh=M2U0OHM1OWRjNTE3", social_in: "tiara-maritza", is_visible: true },
  // NIM: H1101251019
  { id: 35, full_name: "Shinta Ayuwidati", nickname: "Shinta", role: "Anggota", quote: "", photo_url: "/members/35.webp", social_ig: "https://www.instagram.com/shntayyu/", social_in: "shinta-ayuwidati", is_visible: true },
  // NIM: H1101251021
  { id: 36, full_name: "M. Iqbal Dzakwani", nickname: "Iqbal", role: "Anggota", quote: "", photo_url: "/members/36.webp", social_ig: "https://www.instagram.com/iqbll_d?igsh=MWk2c3ZyeThsajJ5YQ==", social_in: "iqbal-dzakwani", is_visible: true },
  // NIM: H1101251022
  { id: 23, full_name: "Muhammad Ghifari Rubiyanto", nickname: "Ghifari", role: "Anggota", quote: "", photo_url: "/members/23.webp", social_ig: "https://www.instagram.com/ghifari.rbyto?igsh=dzMwM2NvZHMwY3c=", social_in: "ghifari-rubiyanto", is_visible: true },
  // NIM: H1101251023
  { id: 15, full_name: "Desty Ayudya", nickname: "Desty", role: "Anggota", quote: "", photo_url: "/members/15.webp", social_ig: "https://www.instagram.com/pinkshvangogh/", social_in: "desty-ayudya", is_visible: true },
  // NIM: H1101251024
  { id: 37, full_name: "Uray Diana", nickname: "Diana", role: "Anggota", quote: "", photo_url: "/members/37.webp", social_ig: "https://www.instagram.com/uraydiana17?igsh=MWxlMXg5a24yOWoydg==", social_in: "uray-diana", is_visible: true },
  // NIM: H1101251025
  { id: 38, full_name: "Lia Rarasari", nickname: "Lia", role: "Anggota", quote: "", photo_url: "/members/38.webp", social_ig: "https://www.instagram.com/lia_rarsri16?igsh=NDVianRpeTF3bnJw", social_in: "lia-rarasari", is_visible: true },
  // NIM: H1101251026
  { id: 39, full_name: "Derriel Mulya Ramadhan", nickname: "Derriel", role: "Anggota", quote: "", photo_url: "/members/39.webp", social_ig: "https://www.instagram.com/drlhysm?igsh=eGdsbGVlejhmaDN6", social_in: "derriel-mulya-ramadhan", is_visible: true },
  // NIM: H1101251028
  { id: 40, full_name: "Utin Dita Atyana", nickname: "Utin", role: "Anggota", quote: "", photo_url: "/members/40.webp", social_ig: "https://www.instagram.com/ataaryn_?igsh=Zm9vcWJpMzd6MzVk", social_in: "utin-dita-atyana", is_visible: true },
  // NIM: H1101251029
  { id: 9, full_name: "Ferdi", nickname: "Ferdi", role: "Anggota", quote: "", photo_url: "/members/9.webp", social_ig: "https://www.instagram.com/tutu.ferdi?igsh=bXh2cDQyM2hsMzd3", social_in: "ferdi", is_visible: true },
  // NIM: H1101251030
  { id: 7, full_name: "Najwa Aulia Putri", nickname: "Najwa", role: "Anggota", quote: "", photo_url: "/members/7.webp", social_ig: "https://www.instagram.com/njwaauptrii_", social_in: "najwa-aulia-putri", is_visible: true },
  // NIM: H1101251031
  { id: 20, full_name: "Syarif Hizra Muhammad Zacky", nickname: "Syarif", role: "Anggota", quote: "", photo_url: "/members/20.webp", social_ig: "https://www.instagram.com/rivelza.zkysan?igsh=MW41NHRwaDZpMWI1ZQ%3D%3D&utm_source=qr", social_in: "syarif-hizra-zacky", is_visible: true },
  // NIM: H1101251032
  { id: 41, full_name: "Rezki Firmansyah", nickname: "Rezki", role: "Anggota", quote: "", photo_url: "/members/41.webp", social_ig: "https://www.instagram.com/headless_dreamer100?igsh=MThyczE2eDA1NjV3bA==", social_in: "rezki-firmansyah", is_visible: true },
  // NIM: H1101251033
  { id: 42, full_name: "Alfonsius Pernandes Roby", nickname: "Alfonsius", role: "Anggota", quote: "", photo_url: "/members/42.webp", social_ig: "https://www.instagram.com/alfonzhs.robb?igsh=MWxsN3JrbmJ0eWhydA==", social_in: "alfonsius-pernandes-roby", is_visible: true },
  // NIM: H1101251034
  { id: 43, full_name: "Chelsea Zalianti", nickname: "Chelsea", role: "Anggota", quote: "", photo_url: "/members/43.webp", social_ig: "https://www.instagram.com/cseazln?igsh=bDY5YzRiOWV0ancz&utm_source=qr", social_in: "chelsea-zalianti", is_visible: true },
  // NIM: H1101251035
  { id: 44, full_name: "M. Farras Haidar", nickname: "Farras", role: "Anggota", quote: "", photo_url: "/members/44.webp", social_ig: "https://www.instagram.com/prazz.sh/", social_in: "farras-haidar", is_visible: true },
  // NIM: H1101251036
  { id: 45, full_name: "Deslo Aldo Anggoro", nickname: "Deslo", role: "Anggota", quote: "", photo_url: "/members/45.webp", social_ig: "https://www.instagram.com/desloal?igsh=MXkxcXFoMzZiaXhvNw==", social_in: "deslo-aldo-anggoro", is_visible: true },
  // NIM: H1101251038
  { id: 46, full_name: "Mercello Januarius Erick", nickname: "Mercello", role: "Anggota", quote: "", photo_url: "/members/46.webp", social_ig: "https://www.instagram.com/marcjrk?igsh=MWhzbmRsM2s4dDZ6cA==", social_in: "mercello-januarius-erick", is_visible: true },
  // NIM: H1101251039
  { id: 11, full_name: "Nikoleta Febrina Listya Priyono", nickname: "Nikoleta", role: "Anggota", quote: "", photo_url: "/members/11.webp", social_ig: "https://www.instagram.com/feat.listy?igsh=OHl4cTFtcnVvZTR1", social_in: "nikoleta-febrina-listy", is_visible: true },
  // NIM: H1101251040
  { id: 47, full_name: "Nabila Pracita Ramadhanti", nickname: "Nabila", role: "Anggota", quote: "", photo_url: "/members/47.webp", social_ig: "https://www.instagram.com/nblaprct?igsh=MTR3OWU1bWFqN3VqZA%3D%3D&utm_source=qr", social_in: "nabila-pracita-ramadhanti", is_visible: true },
  // NIM: H1101251041
  { id: 48, full_name: "Rasya Akmal Sakhi", nickname: "Rasya", role: "Anggota", quote: "", photo_url: "/members/48.webp", social_ig: "https://www.instagram.com/rsya.ll", social_in: "rasya-akmal-sakhi", is_visible: true },
  // NIM: H1101251042
  { id: 49, full_name: "Riton Stefano", nickname: "Riton", role: "Anggota", quote: "", photo_url: "/members/49.webp", social_ig: "https://www.instagram.com/rxstf_67?igsh=dnRoZzQ3NjJnZGxm", social_in: "riton-stefano", is_visible: true },
  // NIM: H1101251043
  { id: 50, full_name: "Novitasari", nickname: "Novita", role: "Anggota", quote: "", photo_url: "/members/50.webp", social_ig: "https://www.instagram.com/vitazsrr?igsh=MXF1NzUxcDJhdWhuYg%3D%3D&utm_source=qr", social_in: "novitasari", is_visible: true },
  // NIM: H1101251044
  { id: 22, full_name: "Zahratussita", nickname: "Zahra", role: "Anggota", quote: "", photo_url: "/members/22.webp", social_ig: "https://www.instagram.com/ztstt_?igsh=MTRrNWx5MGFqemwwMg==", social_in: "zahratussita", is_visible: true },
  // NIM: H1101251045
  { id: 10, full_name: "Felix Faustine", nickname: "Felix", role: "Anggota", quote: "", photo_url: "/members/10.webp", social_ig: "", social_in: "felix-faustine", is_visible: true },
  // NIM: H1101251046
  { id: 21, full_name: "Aldan Putra Setiawan", nickname: "Aldan", role: "Anggota", quote: "", photo_url: "/members/21.webp", social_ig: "", social_in: "aldan-putra-setiawan", is_visible: true },
  // NIM: H1101251047
  { id: 51, full_name: "Melly", nickname: "Melly", role: "Anggota", quote: "", photo_url: "/members/51.webp", social_ig: "https://www.instagram.com/mellyanp.r?igsh=dHFhN3dzdnlsZGt3&utm_source=qr", social_in: "melly", is_visible: true },
  // NIM: H1101251048
  { id: 52, full_name: "Hubert Melville Prince M.", nickname: "Hubert", role: "Anggota", quote: "", photo_url: "/members/52.webp", social_ig: "https://www.instagram.com/melvlls?igsh=MTRhdWh1aW1mZmZ2Zg==", social_in: "hubert-melville-prince", is_visible: true },
  // NIM: H1101251049
  { id: 53, full_name: "Raihan Ikram M.", nickname: "Raihan", role: "Anggota", quote: "", photo_url: "/members/53.webp", social_ig: "https://www.instagram.com/raihanikram_?igsh=MTQyOHl1MTVlNm04dQ%3D%3D&utm_source=qr", social_in: "raihan-ikram", is_visible: true },
  // NIM: H1101251050
  { id: 54, full_name: "Wilham Dhani Prasetyo", nickname: "Wilham", role: "Anggota", quote: "", photo_url: "/members/54.webp", social_ig: "https://www.instagram.com/wilham.wdp?igsh=MXc1cmdheThjdzBtNQ==", social_in: "wilham-dhani-prasetyo", is_visible: true },
  // NIM: H1101251051
  { id: 55, full_name: "Adli Anara Sofian", nickname: "Adli", role: "Anggota", quote: "", photo_url: "/members/55.webp", social_ig: "https://www.instagram.com/adlianara?igsh=NTUzbTdodTQxd3Ew", social_in: "adli-anara-sofian", is_visible: true },
  // NIM: H1101251053
  { id: 56, full_name: "Velixza Gracia E.", nickname: "Velixza", role: "Anggota", quote: "", photo_url: "/members/56.webp", social_ig: "", social_in: "velixza-gracia", is_visible: true },
  // NIM: H1101251054
  { id: 13, full_name: "Fitri Amelia Oktaviani", nickname: "Fitri", role: "Anggota", quote: "", photo_url: "/members/13.webp", social_ig: "https://www.instagram.com/ccaramelz?igsh=MTE0dHZyYTh2aWI4aw==", social_in: "fitri-amelia-oktaviani", is_visible: true },
  // NIM: H1101251055
  { id: 57, full_name: "Aiffy Ragta A.", nickname: "Aiffy", role: "Anggota", quote: "", photo_url: "/members/57.webp", social_ig: "https://www.instagram.com/arctaa/", social_in: "aiffy-ragta", is_visible: true },
  // NIM: H1101251056
  { id: 8, full_name: "Chayara Alima", nickname: "Chayara", role: "Anggota", quote: "", photo_url: "/members/8.webp", social_ig: "https://www.instagram.com/chaaayyr?igsh=YWtyYnV4anhidzN4", social_in: "chayara-alima", is_visible: true },
  // NIM: H1101251057
  { id: 12, full_name: "Khairunisa Ansyari Ramadhan", nickname: "Khairunisa", role: "Anggota", quote: "", photo_url: "/members/12.webp", social_ig: "https://www.instagram.com/khacikaa?igsh=MTM1amw1bGc0NTdnbQ%3D%3D&utm_source=qr", social_in: "khairunisa-ansyari", is_visible: true },
  // NIM: H1101251058
  { id: 58, full_name: "Salsabilla Fitri Nur R.", nickname: "Salsabilla", role: "Anggota", quote: "", photo_url: "/members/58.webp", social_ig: "", social_in: "salsabilla-fitri-nur", is_visible: true },
  // NIM: H1101251059
  { id: 19, full_name: "Lika Lidia Astutik", nickname: "Lika", role: "Anggota", quote: "", photo_url: "/members/19.webp", social_ig: "https://www.instagram.com/likaaldast?igsh=MTJ4YTk0M3VpYzA0bg%3D%3D&utm_source=qr", social_in: "lika-lidia-astutik", is_visible: true },
  // NIM: H1101251060
  { id: 59, full_name: "M. Dimas Aditya", nickname: "Dimas A.", role: "Anggota", quote: "", photo_url: "/members/59.webp", social_ig: "https://www.instagram.com/dimaadty", social_in: "dimas-aditya", is_visible: true },
  // NIM: H1101251061
  { id: 60, full_name: "Rizqi Ikhwani", nickname: "Rizqi", role: "Anggota", quote: "", photo_url: "/members/60.webp", social_ig: "https://www.instagram.com/rizqwnii_12?igsh=MXVzaWZ3OGR5cTBtbA==", social_in: "rizqi-ikhwani", is_visible: true },
  // NIM: H1101251062
  { id: 61, full_name: "Iren Meiliani Taslim", nickname: "Iren", role: "Anggota", quote: "", photo_url: "/members/61.webp", social_ig: "https://www.instagram.com/irnnn_21?igsh=M3Fpcnc4cXVmem1y", social_in: "iren-meiliani-taslim", is_visible: true },
  // NIM: H1101251063
  { id: 62, full_name: "Maulana Malik Ibrahim", nickname: "Maulana", role: "Anggota", quote: "", photo_url: "/members/62.webp", social_ig: "https://www.instagram.com/maulanamllk_?igsh=MTd0aTR1bWNvOXBpNA==", social_in: "maulana-malik-ibrahim", is_visible: true },
  // NIM: H1101251064
  { id: 63, full_name: "Elki Donggala", nickname: "Elki", role: "Anggota", quote: "", photo_url: "/members/63.webp", social_ig: "https://www.instagram.com/elkii_d?igsh=aDFmY3R5OTJ2dnp1", social_in: "elki-donggala", is_visible: true },
  // NIM: H1101251065
  { id: 64, full_name: "Riko", nickname: "Riko", role: "Anggota", quote: "", photo_url: "/members/64.webp", social_ig: "https://www.instagram.com/rikqyou?igsh=eWFlNWhxNG43bG04", social_in: "riko", is_visible: true },
  // NIM: H1101251066
  { id: 65, full_name: "Andini Salsabilla", nickname: "Andini S.", role: "Anggota", quote: "", photo_url: "/members/65.webp", social_ig: "https://www.instagram.com/dinisyblaa?igsh=YnQzYzY1cGZkMjlr&utm_source=qr", social_in: "andini-salsabilla", is_visible: true },
  // NIM: H1101251067
  { id: 66, full_name: "Luqmanurhakim", nickname: "Luqman", role: "Anggota", quote: "", photo_url: "/members/66.webp", social_ig: "https://www.instagram.com/nerf.hakim?igsh=MXB3cm54c2FhbmZ1bQ==", social_in: "luqmanurhakim", is_visible: true },
  // NIM: H1101251068
  { id: 67, full_name: "Zuhayr Aljabar", nickname: "Zuhayr", role: "Anggota", quote: "", photo_url: "/members/67.webp", social_ig: "https://www.instagram.com/juherr1.12?igsh=a2ZraDY3Nmx1dzEw", social_in: "zuhayr-aljabar", is_visible: true },
  // NIM: H1101251069
  { id: 68, full_name: "Chattama Albiantoro", nickname: "Chattama", role: "Anggota", quote: "", photo_url: "/members/68.webp", social_ig: "https://www.instagram.com/chttmaa/", social_in: "chattama-albiantoro", is_visible: true },
  // NIM: H1101251070
  { id: 69, full_name: "Khalindra Maulita S.", nickname: "Khalindra", role: "Anggota", quote: "", photo_url: "/members/69.webp", social_ig: "https://www.instagram.com/_klnmltsyftri?igsh=MXFiNmFnZXI0MmEzaQ==", social_in: "khalindra-maulita", is_visible: true },
  // NIM: H1101251071
  { id: 18, full_name: "Vita Ervina Dzalfa", nickname: "Vita", role: "Anggota", quote: "", photo_url: "/members/18.webp", social_ig: "https://www.instagram.com/vitadzalfaa?igsh=MXE0dDc0cjByMDFmbA==", social_in: "vita-ervina-dzalfa", is_visible: true },
  // NIM: H1101251072
  { id: 70, full_name: "Alnelka Parisha N.", nickname: "Alnelka", role: "Anggota", quote: "", photo_url: "/members/70.webp", social_ig: "", social_in: "alnelka-parisha", is_visible: true },
  // NIM: H1101251073
  { id: 71, full_name: "Ibnu Khaidir Rahman", nickname: "Ibnu", role: "Anggota", quote: "", photo_url: "/members/71.webp", social_ig: "https://www.instagram.com/03.00.a_m?igsh=MWF2dTFpZ21sYzR3ZQ%3D%3D&utm_source=qr", social_in: "ibnu-khaidir-rahman", is_visible: true },
  // NIM: H1101251074
  { id: 72, full_name: "Bona Tua Sagala", nickname: "Bona", role: "Anggota", quote: "", photo_url: "/members/72.webp", social_ig: "https://www.instagram.com/bonz_gala/", social_in: "bona-tua-sagala", is_visible: true },
  // NIM: H1101251075
  { id: 73, full_name: "Maulana Ardhi", nickname: "Ardhi", role: "Anggota", quote: "", photo_url: "/members/73.webp", social_ig: "", social_in: "maulana-ardhi", is_visible: true },
  // NIM: H1101251076
  { id: 74, full_name: "Pierre Tristan L.", nickname: "Pierre", role: "Anggota", quote: "", photo_url: "/members/74.webp", social_ig: "https://www.instagram.com/titancloss?igsh=MTh5a3RxaXRhajAzaQ==", social_in: "pierre-tristan", is_visible: true },
  // NIM: H1101251077
  { id: 75, full_name: "Indra Prianto", nickname: "Indra", role: "Anggota", quote: "", photo_url: "/members/75.webp", social_ig: "", social_in: "indra-prianto", is_visible: true },
  // NIM: H1101251078
  { id: 76, full_name: "Febriano Farrel Naufal", nickname: "Febriano", role: "Anggota", quote: "", photo_url: "/members/76.webp", social_ig: "https://www.instagram.com/oldest_dreammmmm?igsh=OW4zajI4eGo3ZDU=", social_in: "febriano-farrel-naufal", is_visible: true },
];

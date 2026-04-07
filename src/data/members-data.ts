/**
 * src/data/members-data.ts
 * Data lokal anggota Cloudsi — digunakan sebagai sumber data utama
 * Foto: public/members/{id}.jpg
 */

import type { Member } from '../types/index';

export const MEMBERS_DATA: Member[] = [
  // === PENGURUS INTI ===
  { id: "1001", full_name: "Phasacola Grey Kalista", nickname: "Phasacola", role: "Ketua", quote: "", photo_url: "/members/1001.jpg", social_ig: "phasacola_grey", social_in: "phasacola-grey", is_visible: true },
  { id: "1002", full_name: "Rifkitio Hardiono", nickname: "Rifkitio", role: "Wakil Ketua", quote: "", photo_url: "/members/1002.jpg", social_ig: "rifkitio_har", social_in: "rifkitio-hardiono", is_visible: true },
  { id: "1003", full_name: "Ellen Fitri Shanika Karrin Malau", nickname: "Ellen", role: "Sekretaris", quote: "", photo_url: "/members/1003.jpg", social_ig: "ellen_fit", social_in: "ellen-fitri-shanika", is_visible: true },
  { id: "1004", full_name: "Dhini Zakiyatul Wafa", nickname: "Dhini", role: "Sekretaris", quote: "", photo_url: "/members/1004.jpg", social_ig: "dhini_waf", social_in: "dhini-zakiyatul-wafa", is_visible: true },
  { id: "1005", full_name: "Syarifah Putri", nickname: "Syarifah", role: "Bendahara", quote: "", photo_url: "/members/1005.jpg", social_ig: "syarifah_put", social_in: "syarifah-putri", is_visible: true },
  { id: "1006", full_name: "Andini Putri Malaya", nickname: "Andini", role: "Bendahara", quote: "", photo_url: "/members/1006.jpg", social_ig: "andini_put", social_in: "andini-putri-malaya", is_visible: true },

  // === KOORDINATOR DIVISI ===
  { id: "1007", full_name: "Najwa Aulia Putri", nickname: "Najwa", role: "Anggota", quote: "", photo_url: "/members/1007.jpg", social_ig: "najwa_aul", social_in: "najwa-aulia-putri", is_visible: true },
  { id: "1008", full_name: "Chayara Alima", nickname: "Chayara", role: "Anggota", quote: "", photo_url: "/members/1008.jpg", social_ig: "chayara_ali", social_in: "chayara-alima", is_visible: true },
  { id: "1009", full_name: "Ferdi", nickname: "Ferdi", role: "Anggota", quote: "", photo_url: "/members/1009.jpg", social_ig: "ferdi_fer", social_in: "ferdi", is_visible: true },

  // === ANGGOTA DIVISI DIGITAL & KREATIF ===
  { id: "1010", full_name: "Felix Faustine", nickname: "Felix", role: "Anggota", quote: "", photo_url: "/members/1010.jpg", social_ig: "felix_fau", social_in: "felix-faustine", is_visible: true },
  { id: "1011", full_name: "Nikoleta Febrina Listya Priyono", nickname: "Nikoleta", role: "Anggota", quote: "", photo_url: "/members/1011.jpg", social_ig: "nikoleta_feb", social_in: "nikoleta-febrina-listy", is_visible: true },
  { id: "1012", full_name: "Khairunisa Ansyari Ramadhan", nickname: "Khairunisa", role: "Anggota", quote: "", photo_url: "/members/1012.jpg", social_ig: "khairunisa_ans", social_in: "khairunisa-ansyari", is_visible: true },
  { id: "1013", full_name: "Fitri Amelia Oktaviani", nickname: "Fitri", role: "Anggota", quote: "", photo_url: "/members/1013.jpg", social_ig: "fitri_ame", social_in: "fitri-amelia-oktaviani", is_visible: true },
  { id: "1014", full_name: "Sri Wahyuni", nickname: "Sri", role: "Anggota", quote: "", photo_url: "/members/1014.jpg", social_ig: "sri_wah", social_in: "sri-wahyuni", is_visible: true },
  { id: "1015", full_name: "Desty Ayudya", nickname: "Desty", role: "Anggota", quote: "", photo_url: "/members/1015.jpg", social_ig: "desty_ayu", social_in: "desty-ayudya", is_visible: true },
  { id: "1016", full_name: "Nasywa Akmalia Hanif", nickname: "Nasywa", role: "Anggota", quote: "", photo_url: "/members/1016.jpg", social_ig: "nasywa_han", social_in: "nasywa-akmalia-hanif", is_visible: true },
  { id: "1017", full_name: "Nova Amelia", nickname: "Nova", role: "Anggota", quote: "", photo_url: "/members/1017.jpg", social_ig: "nova_ame", social_in: "nova-amelia", is_visible: true },

  // === ANGGOTA DIVISI MINAT & BAKAT ===
  { id: "1018", full_name: "Vita Ervina Dzalfa", nickname: "Vita", role: "Anggota", quote: "", photo_url: "/members/1018.jpg", social_ig: "vita_erv", social_in: "vita-ervina-dzalfa", is_visible: true },
  { id: "1019", full_name: "Lika Lidia Astutik", nickname: "Lika", role: "Anggota", quote: "", photo_url: "/members/1019.jpg", social_ig: "lika_lid", social_in: "lika-lidia-astutik", is_visible: true },
  { id: "1020", full_name: "Syarif Hizra Muhammad Zacky", nickname: "Syarif", role: "Anggota", quote: "", photo_url: "/members/1020.jpg", social_ig: "syarif_hiz", social_in: "syarif-hizra-zacky", is_visible: true },

  // === ANGGOTA DIVISI HUMAS ===
  { id: "1021", full_name: "Aldan Putra Setiawan", nickname: "Aldan", role: "Anggota", quote: "", photo_url: "/members/1021.jpg", social_ig: "aldan_put", social_in: "aldan-putra-setiawan", is_visible: true },
  { id: "1022", full_name: "Zahratussita", nickname: "Zahra", role: "Anggota", quote: "", photo_url: "/members/1022.jpg", social_ig: "zahratuss", social_in: "zahratussita", is_visible: true },
  { id: "1023", full_name: "Muhammad Ghifari Rubiyanto", nickname: "Ghifari", role: "Anggota", quote: "", photo_url: "/members/1023.jpg", social_ig: "ghifari_rub", social_in: "ghifari-rubiyanto", is_visible: true },

  // === ANGGOTA BIASA ===
  { id: "1024", full_name: "M. Sholichin Tafsir Srilintang", nickname: "Sholichin", role: "Anggota", quote: "", photo_url: "/members/1024.jpg", social_ig: "srilintang_", social_in: "sholichin-tafsir", is_visible: true },
  { id: "1025", full_name: "M. Hafizh Al Fitra", nickname: "Hafizh", role: "Anggota", quote: "", photo_url: "/members/1025.jpg", social_ig: "hafizh_fit", social_in: "hafizh-al-fitra", is_visible: true },
  { id: "1026", full_name: "Dimas Luthfi Salim", nickname: "Dimas", role: "Anggota", quote: "", photo_url: "/members/1026.jpg", social_ig: "dimas_sal", social_in: "dimas-luthfi-salim", is_visible: true },
  { id: "1027", full_name: "Neisya Fadilla", nickname: "Neisya", role: "Anggota", quote: "", photo_url: "/members/1027.jpg", social_ig: "neisya_fad", social_in: "neisya-fadilla", is_visible: true },
  { id: "1028", full_name: "Akmal Pasha", nickname: "Akmal", role: "Anggota", quote: "", photo_url: "/members/1028.jpg", social_ig: "akmal_pas", social_in: "akmal-pasha", is_visible: true },
  { id: "1029", full_name: "Fahriello Ardhayana", nickname: "Fahriello", role: "Anggota", quote: "", photo_url: "/members/1029.jpg", social_ig: "fahriello_ard", social_in: "fahriello-ardhayana", is_visible: true },
  { id: "1030", full_name: "Gendis Setyawan", nickname: "Gendis", role: "Anggota", quote: "", photo_url: "/members/1030.jpg", social_ig: "gendis_set", social_in: "gendis-setyawan", is_visible: true },
  { id: "1031", full_name: "Charles Wong", nickname: "Charles", role: "Anggota", quote: "", photo_url: "/members/1031.jpg", social_ig: "charles_won", social_in: "charles-wong", is_visible: true },
  { id: "1032", full_name: "Ahmad Rahman", nickname: "Ahmad", role: "Anggota", quote: "", photo_url: "/members/1032.jpg", social_ig: "ahmad_rah", social_in: "ahmad-rahman", is_visible: true },
  { id: "1033", full_name: "M. Hizbullah Pohan", nickname: "Hizbullah", role: "Anggota", quote: "", photo_url: "/members/1033.jpg", social_ig: "hizbullah_poh", social_in: "hizbullah-pohan", is_visible: true },
  { id: "1034", full_name: "Tiara Maritza", nickname: "Tiara", role: "Anggota", quote: "", photo_url: "/members/1034.jpg", social_ig: "tiara_mar", social_in: "tiara-maritza", is_visible: true },
  { id: "1035", full_name: "Shinta Ayuwidati", nickname: "Shinta", role: "Anggota", quote: "", photo_url: "/members/1035.jpg", social_ig: "shinta_ayu", social_in: "shinta-ayuwidati", is_visible: true },
  { id: "1036", full_name: "M. Iqbal Dzakwani", nickname: "Iqbal", role: "Anggota", quote: "", photo_url: "/members/1036.jpg", social_ig: "iqbal_dza", social_in: "iqbal-dzakwani", is_visible: true },
  { id: "1037", full_name: "Uray Diana", nickname: "Diana", role: "Anggota", quote: "", photo_url: "/members/1037.jpg", social_ig: "uray_dia", social_in: "uray-diana", is_visible: true },
  { id: "1038", full_name: "Lia Rarasari", nickname: "Lia", role: "Anggota", quote: "", photo_url: "/members/1038.jpg", social_ig: "lia_rar", social_in: "lia-rarasari", is_visible: true },
  { id: "1039", full_name: "Derriel Mulya Ramadhan", nickname: "Derriel", role: "Anggota", quote: "", photo_url: "/members/1039.jpg", social_ig: "derriel_mul", social_in: "derriel-mulya-ramadhan", is_visible: true },
  { id: "1040", full_name: "Utin Dita Atyana", nickname: "Utin", role: "Anggota", quote: "", photo_url: "/members/1040.jpg", social_ig: "utin_dit", social_in: "utin-dita-atyana", is_visible: true },
  { id: "1041", full_name: "Rezki Firmansyah", nickname: "Rezki", role: "Anggota", quote: "", photo_url: "/members/1041.jpg", social_ig: "rezki_fir", social_in: "rezki-firmansyah", is_visible: true },
  { id: "1042", full_name: "Alfonsius Pernandes Roby", nickname: "Alfonsius", role: "Anggota", quote: "", photo_url: "/members/1042.jpg", social_ig: "alfonsius_per", social_in: "alfonsius-pernandes-roby", is_visible: true },
  { id: "1043", full_name: "Chelsea Zalianti", nickname: "Chelsea", role: "Anggota", quote: "", photo_url: "/members/1043.jpg", social_ig: "chelsea_zal", social_in: "chelsea-zalianti", is_visible: true },
  { id: "1044", full_name: "M. Farras Haidar", nickname: "Farras", role: "Anggota", quote: "", photo_url: "/members/1044.jpg", social_ig: "farras_hai", social_in: "farras-haidar", is_visible: true },
  { id: "1045", full_name: "Deslo Aldo Anggoro", nickname: "Deslo", role: "Anggota", quote: "", photo_url: "/members/1045.jpg", social_ig: "deslo_ald", social_in: "deslo-aldo-anggoro", is_visible: true },
  { id: "1046", full_name: "Mercello Januarius Erick", nickname: "Mercello", role: "Anggota", quote: "", photo_url: "/members/1046.jpg", social_ig: "mercello_jan", social_in: "mercello-januarius-erick", is_visible: true },
  { id: "1047", full_name: "Nabila Pracita Ramadhanti", nickname: "Nabila", role: "Anggota", quote: "", photo_url: "/members/1047.jpg", social_ig: "nabila_prac", social_in: "nabila-pracita-ramadhanti", is_visible: true },
  { id: "1048", full_name: "Rasya Akmal Sakhi", nickname: "Rasya", role: "Anggota", quote: "", photo_url: "/members/1048.jpg", social_ig: "rasya_akm", social_in: "rasya-akmal-sakhi", is_visible: true },
  { id: "1049", full_name: "Riton Stefano", nickname: "Riton", role: "Anggota", quote: "", photo_url: "/members/1049.jpg", social_ig: "riton_ste", social_in: "riton-stefano", is_visible: true },
  { id: "1050", full_name: "Novi Aulia", nickname: "Novi", role: "Anggota", quote: "", photo_url: "/members/1050.jpg", social_ig: "novi_aul", social_in: "novi-aulia", is_visible: true },
  { id: "1051", full_name: "Melly", nickname: "Melly", role: "Anggota", quote: "", photo_url: "/members/1051.jpg", social_ig: "melly_mel", social_in: "melly", is_visible: true },
  { id: "1052", full_name: "Hubert Melville Prince M.", nickname: "Hubert", role: "Anggota", quote: "", photo_url: "/members/1052.jpg", social_ig: "hubert_mel", social_in: "hubert-melville-prince", is_visible: true },
  { id: "1053", full_name: "Raihan Ikram M.", nickname: "Raihan", role: "Anggota", quote: "", photo_url: "/members/1053.jpg", social_ig: "raihan_ikr", social_in: "raihan-ikram", is_visible: true },
  { id: "1054", full_name: "Wilham Dhani Prasetyo", nickname: "Wilham", role: "Anggota", quote: "", photo_url: "/members/1054.jpg", social_ig: "wilham_dha", social_in: "wilham-dhani-prasetyo", is_visible: true },
  { id: "1055", full_name: "Adli Anara Sofian", nickname: "Adli", role: "Anggota", quote: "", photo_url: "/members/1055.jpg", social_ig: "adli_ana", social_in: "adli-anara-sofian", is_visible: true },
  { id: "1056", full_name: "Velixza Gracia E.", nickname: "Velixza", role: "Anggota", quote: "", photo_url: "/members/1056.jpg", social_ig: "velixza_gra", social_in: "velixza-gracia", is_visible: true },
  { id: "1057", full_name: "Aiffy Ragta A.", nickname: "Aiffy", role: "Anggota", quote: "", photo_url: "/members/1057.jpg", social_ig: "aiffy_rag", social_in: "aiffy-ragta", is_visible: true },
  { id: "1058", full_name: "Salsabilla Fitri Nur R.", nickname: "Salsabilla", role: "Anggota", quote: "", photo_url: "/members/1058.jpg", social_ig: "salsabilla_fit", social_in: "salsabilla-fitri-nur", is_visible: true },
  { id: "1059", full_name: "M. Dimas Aditya", nickname: "Dimas A.", role: "Anggota", quote: "", photo_url: "/members/1059.jpg", social_ig: "dimas_adi", social_in: "dimas-aditya", is_visible: true },
  { id: "1060", full_name: "Rizqi Ikhwani", nickname: "Rizqi", role: "Anggota", quote: "", photo_url: "/members/1060.jpg", social_ig: "rizqi_ikh", social_in: "rizqi-ikhwani", is_visible: true },
  { id: "1061", full_name: "Iren Meiliani Taslim", nickname: "Iren", role: "Anggota", quote: "", photo_url: "/members/1061.jpg", social_ig: "iren_mei", social_in: "iren-meiliani-taslim", is_visible: true },
  { id: "1062", full_name: "Maulana Malik Ibrahim", nickname: "Maulana", role: "Anggota", quote: "", photo_url: "/members/1062.jpg", social_ig: "maulana_mal", social_in: "maulana-malik-ibrahim", is_visible: true },
  { id: "1063", full_name: "Elki Donggala", nickname: "Elki", role: "Anggota", quote: "", photo_url: "/members/1063.jpg", social_ig: "elki_don", social_in: "elki-donggala", is_visible: true },
  { id: "1064", full_name: "Riko", nickname: "Riko", role: "Anggota", quote: "", photo_url: "/members/1064.jpg", social_ig: "riko_rik", social_in: "riko", is_visible: true },
  { id: "1065", full_name: "Andini Salsabilla", nickname: "Andini S.", role: "Anggota", quote: "", photo_url: "/members/1065.jpg", social_ig: "andini_sal", social_in: "andini-salsabilla", is_visible: true },
  { id: "1066", full_name: "Luqmanurhakim", nickname: "Luqman", role: "Anggota", quote: "", photo_url: "/members/1066.jpg", social_ig: "luqman_urh", social_in: "luqmanurhakim", is_visible: true },
  { id: "1067", full_name: "Zuhayr Aljabar", nickname: "Zuhayr", role: "Anggota", quote: "", photo_url: "/members/1067.jpg", social_ig: "zuhayr_alj", social_in: "zuhayr-aljabar", is_visible: true },
  { id: "1068", full_name: "Chattama Albiantoro", nickname: "Chattama", role: "Anggota", quote: "", photo_url: "/members/1068.jpg", social_ig: "chattama_alb", social_in: "chattama-albiantoro", is_visible: true },
  { id: "1069", full_name: "Khalindra Maulita S.", nickname: "Khalindra", role: "Anggota", quote: "", photo_url: "/members/1069.jpg", social_ig: "khalindra_mau", social_in: "khalindra-maulita", is_visible: true },
  { id: "1070", full_name: "Alnelka Parisha N.", nickname: "Alnelka", role: "Anggota", quote: "", photo_url: "/members/1070.jpg", social_ig: "alnelka_par", social_in: "alnelka-parisha", is_visible: true },
  { id: "1071", full_name: "Ibnu Khaidir Rahman", nickname: "Ibnu", role: "Anggota", quote: "", photo_url: "/members/1071.jpg", social_ig: "ibnu_kha", social_in: "ibnu-khaidir-rahman", is_visible: true },
  { id: "1072", full_name: "Bona Tua Sagala", nickname: "Bona", role: "Anggota", quote: "", photo_url: "/members/1072.jpg", social_ig: "bona_tua", social_in: "bona-tua-sagala", is_visible: true },
  { id: "1073", full_name: "Maulana Ardhi", nickname: "Ardhi", role: "Anggota", quote: "", photo_url: "/members/1073.jpg", social_ig: "maulana_ard", social_in: "maulana-ardhi", is_visible: true },
  { id: "1074", full_name: "Pierre Tristan L.", nickname: "Pierre", role: "Anggota", quote: "", photo_url: "/members/1074.jpg", social_ig: "pierre_tris", social_in: "pierre-tristan", is_visible: true },
  { id: "1075", full_name: "Indra Prianto", nickname: "Indra", role: "Anggota", quote: "", photo_url: "/members/1075.jpg", social_ig: "indra_pri", social_in: "indra-prianto", is_visible: true },
  { id: "1076", full_name: "Febriano Farrel Naufal", nickname: "Febriano", role: "Anggota", quote: "", photo_url: "/members/1076.jpg", social_ig: "febriano_far", social_in: "febriano-farrel-naufal", is_visible: true },
];

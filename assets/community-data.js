/* Cinta Masjid — data contoh Ruang Jamaah (media sosial berbasis masjid). Semua fiktif. */
window.CM = window.CM || {};

CM.REACTIONS = [
  ['aamiin', 'Aamiin', '🤲'], ['alhamdulillah', 'Alhamdulillah', '🌿'], ['masyaallah', 'MasyaAllah', '✨'], ['barakallah', 'Barakallah', '🎉'], ['jazakallah', 'Jazakallah', '💚'],
];
CM.POST_TYPES = {
  kabar: { label: 'Kabar', icon: 'chat', tone: '' },
  doa: { label: 'Titip Doa', icon: 'hand', tone: 'brand' },
  gembira: { label: 'Kabar Gembira', icon: 'gift', tone: 'gold' },
  hilang: { label: 'Kehilangan & Temuan', icon: 'search', tone: 'warn' },
  ajakan: { label: 'Ajakan Kebaikan', icon: 'heart', tone: 'ok' },
  tanya: { label: 'Pertanyaan Umum', icon: 'info', tone: 'info' },
  resmi: { label: 'Resmi', icon: 'shield', tone: 'brand' },
};

CM.commSeed = () => ({
  v: 2,
  member: 'anggota', // tamu | menunggu | anggota
  joinedDays: 136,
  prefs: { hidePhoto: false, hideHistory: false, notifReaksi: true, quiet: true, weekly: true, nResmi: true, nBalasan: true, nGrup: true, nKegiatan: true },
  settings: { join: 'manual', post: '7hari', mod: 'campuran', foto: 'semua', akhwat: true, pemilu: true, tvDoa: false, bacaDoa: false,
    types: { kabar: true, doa: true, gembira: true, hilang: true, ajakan: true, tanya: true, pasar: true },
    integr: { pengumuman: true, duka: true, kajian: true, khutbah: true, kampanye: true, laporan: true, lumbung: true } },
  keywords: ['coblos', 'nomor urut', 'paslon', 'pinjol', 'cair cepat', 'investasi pasti untung'],
  posts: [
    { id: 'r1', type: 'resmi', official: true, pinned: true, src: ['Keuangan', 'Laporan kas November terbit', '#/situs/laporan'], author: 'DKM Masjid Al-Ikhlas', time: '2 jam lalu', body: 'Alhamdulillah, laporan kas November sudah terbit. Pemasukan Rp21,2 jt, pengeluaran Rp16,9 jt. Terima kasih atas amanah jamaah.', react: { alhamdulillah: 64, jazakallah: 38 }, comments: [] },
    { id: 'r2', type: 'resmi', official: true, pinned: true, src: ['Komunikasi', 'Berita duka', '#/situs/beranda'], author: 'DKM Masjid Al-Ikhlas', time: 'Kemarin', body: 'Innalillahi wa inna ilaihi raji\'un. Telah berpulang Bpk. Darsono bin Karta (RT 04). Shalat jenazah ba\'da Dzuhur di masjid.', react: { aamiin: 118 }, comments: [{ who: 'Agus Wibowo', t: 'Allahummaghfirlahu warhamhu. Semoga keluarga diberi kesabaran.', time: 'Kemarin' }] },
    { id: 'p1', type: 'doa', author: 'Hamba Allah', anon: true, time: '35 menit lalu', body: 'Mohon doakan ibu saya yang sedang dirawat di ruang ICU karena stroke. Semoga Allah beri kesembuhan.', react: { aamiin: 47 }, prays: 23, prayed: false, followUp: null, comments: [{ who: 'Siti Aminah', t: 'Syafakillah, semoga lekas pulih. Aamiin.', time: '20 menit lalu' }] },
    { id: 'p2', type: 'gembira', author: 'Rina Marlina', badges: [], time: '3 jam lalu', body: 'Alhamdulillah, putri kedua kami lahir tadi subuh dengan selamat. Mohon doanya semoga menjadi anak shalihah. 🤍', photos: ['Bayi'], react: { barakallah: 41, alhamdulillah: 22, masyaallah: 9 }, comments: [{ who: 'Dewi Lestari', t: 'Barakallahu lakuma, selamat Bu Rina!', time: '2 jam lalu', replies: [{ who: 'Rina Marlina', t: 'Aamiin, jazakillah khairan Bu Dewi.' }] }] },
    { id: 'p3', type: 'ajakan', author: 'Rahmat Hidayat', badges: ['Pengurus', 'Relawan'], time: '5 jam lalu', body: 'Sabtu ini kerja bakti angkat dan jemur karpet ruang utama. Butuh 10 orang, mulai 07.00. Sarapan disediakan ibu-ibu majelis taklim.', slots: { need: 10, taken: 7, mine: false, when: 'Sabtu, 28 Nov · 07.00' }, react: { masyaallah: 18, jazakallah: 12 }, comments: [] },
    { id: 'r3', type: 'resmi', official: true, src: ['Ibadah & Kegiatan', 'Kajian baru', '#/situs/kajian/a1'], author: 'DKM Masjid Al-Ikhlas', time: '6 jam lalu', body: 'Kajian Tafsir Juz \'Amma bersama Ust. Hasan Basri, Kamis ba\'da Maghrib. Tema pekan ini: Surat An-Naba.', rsvp: { hadir: 54, mungkin: 12, mine: null }, react: { masyaallah: 26 }, comments: [] },
    { id: 'p4', type: 'hilang', author: 'Ust. Hasan Basri', badges: ['Ustadz Terverifikasi'], time: '8 jam lalu', body: 'Ditemukan kunci motor (gantungan hijau) di tempat wudhu pria setelah Isya. Bisa diambil di ruang marbot.', status: 'aktif', archiveIn: 13, react: { jazakallah: 7 }, comments: [] },
    { id: 'p5', type: 'tanya', author: 'Budi Santoso', time: 'Kemarin', body: 'Ada yang tahu tukang las yang dekat sini? Pagar rumah ada yang patah. Jazakumullah.', react: {}, comments: [{ who: 'Agus Wibowo', t: 'Pak Darto di Gg. 5, bengkel las depan warung. Rapi kerjanya.', time: 'Kemarin' }, { who: 'Rahmat Hidayat', t: 'Saya juga pernah pakai Pak Darto, recommended.', time: 'Kemarin' }], mine: true },
    { id: 'p6', type: 'kabar', author: 'Remaja Masjid Al-Ikhlas', badges: ['Pengelola Grup'], time: '2 hari lalu', body: 'Pojok baca di serambi sekarang sudah punya 120 buku hasil donasi jamaah. Silakan dipinjam, catat di buku tamu ya.', photos: ['Pojok baca', 'Rak buku'], react: { masyaallah: 33, jazakallah: 21 }, comments: [] },
    { id: 'r4', type: 'resmi', official: true, src: ['Kepedulian Umat', 'Kebutuhan lumbung', '#/situs/layanan'], author: 'DKM Masjid Al-Ikhlas', time: '2 hari lalu', body: 'Lumbung pangan butuh gula (7/20 kg) dan telur (4/15 kg) untuk pembagian 30 November. Donasi barang bisa diantar ke sekretariat.', react: { jazakallah: 15 }, comments: [] },
  ],
  groups: [
    { id: 'g1', name: 'Remaja Masjid Al-Ikhlas', type: 'terbuka', members: 41, desc: 'Kegiatan pemuda, pojok baca, dan kepanitiaan PHBI.', meet: 'Sabtu malam, 2 pekan sekali', joined: true },
    { id: 'g2', name: 'Majelis Taklim Ibu-Ibu', type: 'akhwat', members: 56, desc: 'Ruang akhwat: kajian muslimah dan arisan sosial.', meet: 'Sabtu pekan pertama, 09.00', joined: false },
    { id: 'g3', name: 'Halaqah Tahsin', type: 'tertutup', members: 18, desc: 'Belajar memperbaiki bacaan Al-Qur\'an bersama ustadz.', meet: 'Selasa ba\'da Isya', joined: false, absen: '14/18 hadir pekan lalu' },
    { id: 'g4', name: 'Wali Santri TPQ', type: 'tertutup', members: 29, desc: 'Terhubung ke kelas TPQ. Kabar santri diposting pengurus.', meet: '—', joined: true, linked: 'TPA/TPQ' },
    { id: 'g5', name: 'Alumni Kuliah Subuh', type: 'terbuka', members: 64, desc: 'Rangkuman kajian dan diskusi ringan selepas subuh.', meet: 'Ahad ba\'da Subuh', joined: false },
  ],
  events: [
    { id: 'e1', title: 'Kajian Tafsir Juz \'Amma', when: 'Kamis, 26 Nov · ba\'da Maghrib', who: 'Ust. Hasan Basri', hadir: 54, mungkin: 12, mine: null },
    { id: 'e2', title: 'Kerja bakti jemur karpet', when: 'Sabtu, 28 Nov · 07.00', who: 'Bidang Sosial', hadir: 7, mungkin: 3, mine: null, slots: { need: 10, taken: 7 } },
    { id: 'e3', title: 'Pembagian lumbung pangan', when: 'Senin, 30 Nov · 16.00', who: 'Bidang Sosial', hadir: 9, mungkin: 2, mine: null, slots: { need: 6, taken: 4 } },
    { id: 'e4', title: 'Kajian Muslimah: Fiqih Thaharah', when: 'Sabtu, 6 Des · 09.00', who: 'Ustadzah Fatimah Az-Zahra', hadir: 38, mungkin: 6, mine: null, akhwat: true },
  ],
  listings: [
    { id: 'l1', title: 'Nasi kuning & lontong sayur', cat: 'Makanan', price: 'Rp15.000', who: 'Bu Ratna', exp: 24, color: 'gold' },
    { id: 'l2', title: 'Jasa servis AC & kulkas', cat: 'Jasa', price: 'Mulai Rp75.000', who: 'Hendra Gunawan', exp: 18, color: 'brand' },
    { id: 'l3', title: 'Sepeda anak 16" bekas, masih bagus', cat: 'Barang bekas', price: 'Rp350.000', who: 'Dewi Lestari', exp: 9, color: '' },
    { id: 'l4', title: 'Lowongan: kasir toko kelontong', cat: 'Lowongan', price: '—', who: 'Toko Berkah', exp: 27, color: 'brand' },
    { id: 'l5', title: 'Les mengaji privat anak (iqra\')', cat: 'Jasa', price: 'Rp150.000/bln', who: 'Nur Halimah', exp: 21, color: 'gold' },
  ],
  mosques: [
    { name: 'Musholla An-Nur', dist: '450 m', members: 64, active: true, follow: true },
    { name: 'Masjid Baitul Rahman', dist: '1,2 km', members: 188, active: true, follow: false },
    { name: 'Masjid Al-Hikmah', dist: '2,6 km', members: 241, active: true, follow: false },
    { name: 'Masjid Nurul Falah', dist: '3,1 km', members: 0, active: false, follow: false },
  ],
  queue: [
    { id: 'q1', why: 'Deteksi otomatis · politik praktis (Mode Pemilu)', kind: 'Postingan pra-tayang', who: 'Joko S.', strikes: 0, reports: 0, body: 'Ayo bapak-bapak, coblos nomor urut 2 biar jalan kampung kita diaspal!', age: '40 menit', heavy: false },
    { id: 'q2', why: 'Kategori terlarang · pinjol', kind: 'Iklan Pasar', who: 'Akun baru (3 hari)', strikes: 1, reports: 4, body: 'Pinjaman cepat cair tanpa agunan, bunga ringan, cukup KTP. Hubungi WA…', age: '2 jam', heavy: true, escalated: true },
    { id: 'q3', why: 'Laporan jamaah (2) · ghibah', kind: 'Komentar', who: 'Tono W.', strikes: 1, reports: 2, body: 'Pantesan rumahnya sepi, kan anaknya yang itu sering pulang malam…', age: '5 jam', heavy: false },
    { id: 'q4', why: 'Pra-tayang · anggota baru (< 7 hari) dengan tautan', kind: 'Postingan pra-tayang', who: 'Lina M.', strikes: 0, reports: 0, body: 'Info beasiswa tahfiz untuk SMP, pendaftaran di tautan berikut: bit.ly/…', age: '6 jam', heavy: false },
    { id: 'q5', why: 'Banding atas penghapusan', kind: 'Banding', who: 'Tono W.', strikes: 1, reports: 0, body: '"Komentar saya hanya bercanda, mohon ditinjau ulang."', age: '1 hari', heavy: false, appeal: true },
  ],
  members: {
    pending: [
      { name: 'Ahmad Fauzi', note: 'RT 05 · warga Jl. Melati', match: true, days: 0 },
      { name: 'Siska Amalia', note: 'Kos dekat masjid (mahasiswi)', match: false, days: 1 },
      { name: 'Wawan Setiawan', note: 'RT 02', match: true, days: 2 },
    ],
    list: [
      { name: 'Rahmat Hidayat', role: 'Moderator Komunitas', since: 'Mar 2026', strikes: 0 },
      { name: 'Dewi Lestari', role: 'Moderator (Sekretaris)', since: 'Mar 2026', strikes: 0 },
      { name: 'Fikri Ramadhan', role: 'Pengelola Grup · Remaja Masjid', since: 'Apr 2026', strikes: 0 },
      { name: 'Rina Marlina', role: 'Anggota', since: 'Mei 2026', strikes: 0 },
      { name: 'Budi Santoso', role: 'Anggota', since: 'Jul 2026', strikes: 0 },
    ],
    muted: [{ name: 'Tono W.', until: '1 Des 2026 (7 hari)', why: 'Ghibah di komentar' }],
    removed: [{ name: 'Akun "Rezeki Barokah"', why: 'Iklan pinjol berulang · dieskalasi ke platform' }],
  },
  guideline: `Pedoman Komunitas Ruang Jamaah Masjid Al-Ikhlas

1. Berkata baik atau diam. Gunakan bahasa yang santun.
2. Dilarang ghibah, fitnah, dan menyebarkan aib orang lain.
3. Dilarang konten SARA dan ujaran kebencian.
4. Tabayyun: periksa kebenaran berita sebelum membagikan.
5. Dilarang berjualan di luar Pasar Jamaah.
6. Dilarang kampanye politik praktis. Masjid netral.
7. Pertanyaan hukum agama diajukan lewat Tanya Ustadz.

Pelanggaran dapat berujung peringatan, dibisukan, hingga dikeluarkan.`,
});

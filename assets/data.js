/* Cinta Masjid — data contoh (mock) untuk prototipe. Semua nama fiktif. */
window.CM = window.CM || {};

CM.seed = () => ({
  profile: {
    name: 'Masjid Al-Ikhlas',
    short: 'Al-Ikhlas',
    tagline: 'Memakmurkan masjid, menguatkan jamaah',
    address: 'Jl. Cempaka Raya No. 12, RW 07, Sukajadi, Bandung',
    city: 'Bandung',
    lat: -6.8915, lng: 107.5890,
    founded: 1987,
    capacity: 650,
    logoImg: null,
    subdomain: 'alikhlas',
    customDomain: 'masjidalikhlas.id',
    domainStatus: 'aktif',
    bank: { name: 'BSI', no: '7123 4567 89', holder: 'DKM Masjid Al-Ikhlas' },
  },
  theme: { preset: 'zamrud', brand: '#0B5D4B', accent: '#C2A15A', bg: '#FAF7F0', ink: '#17231F', font: 'elegan', radius: 'lembut', layout: 'klasik', ornament: true },
  textSize: 'normal',
  modules: { zis: true, warga: true, ibadah: true, aset: true, komunikasi: true, kepedulian: true, komunitas: true },
  approvalThreshold: 1000000,
  kas: [
    { id: 'umum', name: 'Kas Umum', saldoAwal: 18450000, terikat: false, color: '#0B5D4B' },
    { id: 'bangun', name: 'Pembangunan', saldoAwal: 142300000, terikat: true, color: '#C2A15A', allowed: ['Pembangunan & Material', 'Pemeliharaan'] },
    { id: 'yatim', name: 'Anak Yatim', saldoAwal: 9250000, terikat: true, color: '#7A8B5A', allowed: ['Penyaluran Bantuan'] },
    { id: 'ramadhan', name: 'Ramadhan', saldoAwal: 4100000, terikat: true, color: '#3E6E8C', allowed: ['Kegiatan', 'Konsumsi'] },
    { id: 'lumbung', name: 'Lumbung Pangan', saldoAwal: 2300000, terikat: true, color: '#9C5B3B', allowed: ['Belanja Sembako'] },
    { id: 'tpq', name: 'TPQ', saldoAwal: 3150000, terikat: true, color: '#6B5B95', allowed: ['Honor Petugas', 'Kegiatan'] },
  ],
  kategori: {
    masuk: ['Infak Jumat', 'Kotak Amal', 'Donasi Online', 'Sedekah Subuh', 'Zakat', 'SPP TPQ', 'Sewa Aula', 'Lainnya'],
    keluar: ['Listrik & Air', 'Kebersihan', 'Honor Petugas', 'Kegiatan', 'Pemeliharaan', 'Pembangunan & Material', 'Penyaluran Bantuan', 'Belanja Sembako', 'Konsumsi', 'Lainnya'],
  },
  tx: [
    { id: 't1', date: '2026-11-21', type: 'masuk', kas: 'umum', cat: 'Infak Jumat', amount: 4725000, note: 'Jumat pekan ke-3', status: 'disetujui', by: 'Siti Aminah', nota: false },
    { id: 't2', date: '2026-11-21', type: 'masuk', kas: 'bangun', cat: 'Kotak Amal', amount: 1860000, note: 'Kotak pembangunan', status: 'disetujui', by: 'Siti Aminah', nota: false },
    { id: 't3', date: '2026-11-20', type: 'keluar', kas: 'umum', cat: 'Listrik & Air', amount: 1240000, note: 'Token PLN November', status: 'disetujui', by: 'Siti Aminah', nota: true },
    { id: 't4', date: '2026-11-19', type: 'masuk', kas: 'umum', cat: 'Donasi Online', amount: 950000, note: 'Transfer via QRIS', status: 'disetujui', by: 'Sistem', nota: false },
    { id: 't5', date: '2026-11-18', type: 'keluar', kas: 'umum', cat: 'Honor Petugas', amount: 1500000, note: 'Marbot & kebersihan', status: 'disetujui', by: 'Siti Aminah', nota: true },
    { id: 't6', date: '2026-11-17', type: 'masuk', kas: 'yatim', cat: 'Lainnya', amount: 2500000, note: 'Santunan dari Majelis Taklim', status: 'disetujui', by: 'Siti Aminah', nota: false },
    { id: 't7', date: '2026-11-16', type: 'masuk', kas: 'umum', cat: 'Sedekah Subuh', amount: 642000, note: 'Akumulasi pekan ke-2', status: 'disetujui', by: 'Sistem', nota: false },
    { id: 't8', date: '2026-11-15', type: 'keluar', kas: 'lumbung', cat: 'Belanja Sembako', amount: 875000, note: 'Beras 50 kg + minyak', status: 'disetujui', by: 'Rahmat Hidayat', nota: true },
    { id: 't9', date: '2026-11-14', type: 'masuk', kas: 'umum', cat: 'Infak Jumat', amount: 4310000, note: 'Jumat pekan ke-2', status: 'disetujui', by: 'Siti Aminah', nota: false },
    { id: 't10', date: '2026-11-12', type: 'keluar', kas: 'umum', cat: 'Kebersihan', amount: 380000, note: 'Sabun, karbol, pewangi karpet', status: 'disetujui', by: 'Siti Aminah', nota: true },
    { id: 't11', date: '2026-11-10', type: 'masuk', kas: 'tpq', cat: 'SPP TPQ', amount: 1650000, note: 'SPP 33 santri', status: 'disetujui', by: 'Nur Halimah', nota: false },
    { id: 't12', date: '2026-11-07', type: 'masuk', kas: 'umum', cat: 'Infak Jumat', amount: 4580000, note: 'Jumat pekan ke-1', status: 'disetujui', by: 'Siti Aminah', nota: false },
    { id: 't13', date: '2026-11-05', type: 'keluar', kas: 'bangun', cat: 'Pembangunan & Material', amount: 12500000, note: 'Keramik lantai 2 (termin 1)', status: 'disetujui', by: 'Siti Aminah', nota: true },
    { id: 't14', date: '2026-11-22', type: 'keluar', kas: 'umum', cat: 'Pemeliharaan', amount: 3200000, note: 'Servis 4 unit AC ruang utama', status: 'menunggu', by: 'Siti Aminah', nota: true },
    { id: 't15', date: '2026-11-23', type: 'keluar', kas: 'bangun', cat: 'Pembangunan & Material', amount: 8750000, note: 'Cat & plafon lantai 2', status: 'menunggu', by: 'Siti Aminah', nota: true },
  ],
  monthly: [
    { m: 'Jun', in: 18.2, out: 11.4 }, { m: 'Jul', in: 21.5, out: 14.8 }, { m: 'Agu', in: 19.1, out: 22.6 },
    { m: 'Sep', in: 20.4, out: 12.9 }, { m: 'Okt', in: 23.8, out: 16.2 }, { m: 'Nov', in: 21.2, out: 16.9 },
  ],
  agenda: [
    { id: 'a1', date: '2026-11-26', time: "Ba'da Maghrib", title: 'Kajian Tafsir Juz Amma', who: 'Ust. Hasan Basri', type: 'Kajian', place: 'Ruang utama' },
    { id: 'a2', date: '2026-11-27', time: '11.45', title: 'Shalat Jumat', who: 'Khatib: Ust. Fauzan Akbar', type: 'Ibadah', place: 'Ruang utama' },
    { id: 'a3', date: '2026-11-28', time: '08.00', title: 'Kerja Bakti Bersih Masjid', who: 'Remaja Masjid', type: 'Kegiatan', place: 'Halaman' },
    { id: 'a4', date: '2026-11-29', time: "Ba'da Subuh", title: 'Kuliah Subuh: Adab Bertetangga', who: 'Ust. Ahmad Zaki', type: 'Kajian', place: 'Ruang utama' },
    { id: 'a5', date: '2026-11-30', time: '16.00', title: 'Pembagian Paket Lumbung Pangan', who: 'Bidang Sosial', type: 'Sosial', place: 'Aula' },
    { id: 'a6', date: '2026-12-02', time: "Ba'da Isya", title: 'Rapat Pleno DKM', who: 'Pengurus', type: 'Rapat', place: 'Ruang rapat' },
    { id: 'a7', date: '2026-12-06', time: '09.00', title: "Kajian Muslimah: Fiqih Thaharah", who: 'Ustadzah Fatimah Az-Zahra', type: 'Kajian', place: 'Aula' },
  ],
  jumat: [
    { date: '2026-11-27', imam: 'Ust. Fauzan Akbar', khatib: 'Ust. Fauzan Akbar', muadzin: 'Ridwan Maulana', bilal: 'Dimas Pratama', confirmed: [true, true, true, false] },
    { date: '2026-12-04', imam: 'KH. Abdul Malik', khatib: 'KH. Abdul Malik', muadzin: 'Fikri Ramadhan', bilal: 'Ridwan Maulana', confirmed: [true, true, false, false] },
    { date: '2026-12-11', imam: 'Ust. Hasan Basri', khatib: 'Ust. Hasan Basri', muadzin: 'Dimas Pratama', bilal: 'Fikri Ramadhan', confirmed: [false, false, false, false] },
  ],
  prayer: [
    { id: 'subuh', name: 'Subuh', time: '03:58', iq: 12, adj: 0 },
    { id: 'terbit', name: 'Terbit', time: '05:14', iq: 0, adj: 0 },
    { id: 'dzuhur', name: 'Dzuhur', time: '11:36', iq: 10, adj: 0 },
    { id: 'ashar', name: 'Ashar', time: '14:58', iq: 10, adj: 0 },
    { id: 'maghrib', name: 'Maghrib', time: '17:53', iq: 7, adj: 0 },
    { id: 'isya', name: 'Isya', time: '19:07', iq: 10, adj: 0 },
  ],
  hadith: [
    { ar: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', id: 'Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya.', src: 'HR. Bukhari', grade: 'Shahih' },
    { ar: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ', id: 'Kata-kata yang baik adalah sedekah.', src: 'HR. Bukhari & Muslim', grade: 'Shahih' },
    { ar: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ', id: 'Sedekah tidak akan mengurangi harta.', src: 'HR. Muslim', grade: 'Shahih' },
    { ar: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ', id: 'Amalan yang paling dicintai Allah adalah yang paling rutin, meskipun sedikit.', src: 'HR. Bukhari & Muslim', grade: 'Shahih' },
    { ar: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ', id: 'Senyummu di hadapan saudaramu adalah sedekah.', src: 'HR. Tirmidzi', grade: 'Hasan' },
  ],
  announcements: [
    { id: 'p1', title: 'Pembangunan lantai 2 memasuki tahap pengecatan', body: 'Jazakumullah khairan atas dukungan jamaah. Progres fisik 72%.', date: '2026-11-23', channels: ['situs', 'tv', 'push'], pinned: true },
    { id: 'p2', title: 'Kajian Tafsir Juz Amma setiap Kamis malam', body: "Bersama Ust. Hasan Basri, ba'da Maghrib di ruang utama.", date: '2026-11-20', channels: ['situs', 'tv'] },
    { id: 'p3', title: 'Pendaftaran Qurban 1448 H telah dibuka', body: 'Tersedia tabungan qurban dengan cicilan bulanan. Daftar di situs atau sekretariat.', date: '2026-11-15', channels: ['situs', 'tv', 'push', 'wa'] },
  ],
  campaigns: [
    { id: 'c1', title: 'Pembangunan Lantai 2', desc: 'Menambah kapasitas 300 jamaah untuk shalat Jumat dan kajian.', target: 450000000, raised: 324600000, donors: 812, deadline: '2027-03-31', kas: 'bangun', color: 'brand' },
    { id: 'c2', title: 'Santunan Yatim Akhir Tahun', desc: 'Paket sekolah dan santunan untuk 48 anak yatim di sekitar masjid.', target: 36000000, raised: 21750000, donors: 164, deadline: '2026-12-20', kas: 'yatim', color: 'gold' },
    { id: 'c3', title: 'Karpet Baru Ruang Utama', desc: 'Mengganti karpet yang sudah berusia 9 tahun.', target: 65000000, raised: 12300000, donors: 57, deadline: '2027-01-31', kas: 'umum', color: 'brand' },
  ],
  subscribers: [
    { name: 'Hamba Allah', amount: 2000, freq: 'Harian', status: 'aktif', since: '2026-08-02', total: 228000 },
    { name: 'Budi Santoso', amount: 5000, freq: 'Harian', status: 'aktif', since: '2026-07-12', total: 670000 },
    { name: 'Dewi Lestari', amount: 10000, freq: 'Jumat saja', status: 'aktif', since: '2026-06-05', total: 250000 },
    { name: 'Hamba Allah', amount: 2000, freq: 'Harian', status: 'gagal', since: '2026-10-01', total: 84000, fails: 2 },
    { name: 'Arif Rahman', amount: 20000, freq: 'Mingguan', status: 'dijeda', since: '2026-05-20', total: 540000 },
    { name: 'Rina Marlina', amount: 3000, freq: 'Harian', status: 'aktif', since: '2026-09-15', total: 216000 },
  ],
  zakat: {
    fitrah: { beras: 2.5, uang: 45000, tahun: '1447 H' },
    nisabEmas: 85, hargaEmas: 1580000,
    muzakki: [
      { name: 'Keluarga H. Sudirman', jiwa: 5, bentuk: 'Uang', nominal: 225000, date: '2026-03-27', jenis: 'Fitrah' },
      { name: 'Bpk. Agus Wibowo', jiwa: 0, bentuk: 'Uang', nominal: 6250000, date: '2026-10-11', jenis: 'Mal' },
      { name: 'Ibu Ratna Sari', jiwa: 3, bentuk: 'Beras', nominal: 7.5, date: '2026-03-28', jenis: 'Fitrah' },
      { name: 'Bpk. Yusuf Hakim', jiwa: 0, bentuk: 'Uang', nominal: 3400000, date: '2026-11-02', jenis: 'Mal' },
    ],
    asnaf: [
      { name: 'Fakir', count: 14 }, { name: 'Miskin', count: 31 }, { name: 'Amil', count: 6 }, { name: 'Mualaf', count: 3 },
      { name: 'Riqab', count: 0 }, { name: 'Gharimin', count: 4 }, { name: 'Fisabilillah', count: 5 }, { name: 'Ibnu Sabil', count: 1 },
    ],
    distributions: [
      { to: 'Ibu Sumiati (RT 03)', asnaf: 'Miskin', amount: 750000, date: '2026-11-10', foto: true },
      { to: 'Bpk. Karta (RT 05)', asnaf: 'Fakir', amount: 1000000, date: '2026-11-10', foto: true },
      { to: 'Sdr. Kevin (mualaf)', asnaf: 'Mualaf', amount: 500000, date: '2026-11-04', foto: false },
    ],
  },
  qurban: {
    periode: '1448 H', hari: '2027-05-16', hargaSapi: 24500000, hargaBagian: 3500000, hargaKambing: 3200000,
    groups: [
      { id: 'S1', animal: 'Sapi Limosin', members: ['H. Sudirman', 'Agus Wibowo', 'Yusuf Hakim', 'Dewi Lestari', 'Rahmat Hidayat', 'Fikri Ramadhan', 'Ratna Sari'] },
      { id: 'S2', animal: 'Sapi Bali', members: ['Budi Santoso', 'Arif Rahman', 'Siti Aminah', 'Hendra Gunawan', 'Lina Marlina'] },
      { id: 'S3', animal: 'Sapi Bali', members: ['Ahmad Fauzi', 'Rina Marlina'] },
    ],
    kambing: [
      { name: 'Keluarga Wahyudi', status: 'lunas' }, { name: 'Bpk. Joko Susilo', status: 'cicil' }, { name: 'Ibu Hartini', status: 'lunas' },
    ],
    tabungan: [
      { name: 'Hendra Gunawan', target: 3500000, paid: 2100000, cicilan: 350000, next: '2026-12-01' },
      { name: 'Bpk. Joko Susilo', target: 3200000, paid: 1600000, cicilan: 400000, next: '2026-12-01' },
      { name: 'Lina Marlina', target: 3500000, paid: 3500000, cicilan: 350000, next: '-' },
      { name: 'Rina Marlina', target: 3500000, paid: 700000, cicilan: 350000, next: '2026-12-01' },
    ],
  },
  wakaf: [
    { name: 'Tanah & bangunan masjid', type: 'Tanah', size: '1.240 m²', cert: 'AIW W.2/117/1987', nazhir: 'Yayasan Al-Ikhlas', loc: 'Jl. Cempaka Raya 12' },
    { name: 'Tanah parkir sebelah utara', type: 'Tanah', size: '310 m²', cert: 'AIW W.2/045/2014', nazhir: 'Yayasan Al-Ikhlas', loc: 'Jl. Cempaka Raya 14' },
    { name: 'Mushaf Al-Qur\'an (240 eks.)', type: 'Benda bergerak', size: '240 eks.', cert: '—', nazhir: 'DKM', loc: 'Rak ruang utama' },
  ],
  households: [
    { id: 'k1', kk: 'Sudirman', rt: '03', rw: '07', members: 5, labels: ['muzakki'], wa: '0812-xxxx-1101' },
    { id: 'k2', kk: 'Sumiati', rt: '03', rw: '07', members: 4, labels: ['dhuafa', 'yatim'], wa: '0813-xxxx-2210' },
    { id: 'k3', kk: 'Karta', rt: '05', rw: '07', members: 3, labels: ['dhuafa', 'lansia'], wa: '0857-xxxx-0321' },
    { id: 'k4', kk: 'Agus Wibowo', rt: '01', rw: '07', members: 4, labels: ['muzakki', 'relawan'], wa: '0812-xxxx-7754' },
    { id: 'k5', kk: 'Hartini', rt: '02', rw: '07', members: 2, labels: ['lansia'], wa: '0878-xxxx-1190' },
    { id: 'k6', kk: 'Kevin Wijaya', rt: '04', rw: '07', members: 1, labels: ['mualaf'], wa: '0819-xxxx-6612' },
    { id: 'k7', kk: 'Rahmat Hidayat', rt: '05', rw: '07', members: 5, labels: ['relawan'], wa: '0821-xxxx-4410' },
    { id: 'k8', kk: 'Wahyudi', rt: '06', rw: '07', members: 6, labels: ['dhuafa'], wa: '0813-xxxx-8823' },
  ],
  labels: [
    { id: 'dhuafa', name: 'Dhuafa', count: 38, sys: true }, { id: 'yatim', name: 'Yatim', count: 48, sys: true }, { id: 'lansia', name: 'Lansia', count: 62, sys: true },
    { id: 'mualaf', name: 'Mualaf', count: 3, sys: true }, { id: 'relawan', name: 'Relawan', count: 27, sys: true }, { id: 'muzakki', name: 'Muzakki', count: 94, sys: true },
    { id: 'remaja', name: 'Remaja Masjid', count: 41, sys: false }, { id: 'majelis', name: 'Majelis Taklim', count: 56, sys: false },
  ],
  ustadz: [
    { name: 'Ust. Hasan Basri', bidang: 'Tafsir', wa: '0812-xxxx-0011', kajian: 'Kamis malam' },
    { name: 'Ust. Ahmad Zaki', bidang: 'Akhlak & Adab', wa: '0813-xxxx-0022', kajian: 'Ahad subuh' },
    { name: 'Ustadzah Fatimah Az-Zahra', bidang: 'Fiqih Muslimah', wa: '0857-xxxx-0033', kajian: 'Sabtu pekan 1' },
    { name: 'Ust. Fauzan Akbar', bidang: 'Khatib', wa: '0821-xxxx-0044', kajian: '—' },
    { name: 'KH. Abdul Malik', bidang: 'Fiqih', wa: '0812-xxxx-0055', kajian: 'Jumat pekan 1' },
  ],
  santri: [
    { name: 'Aisyah Putri', kelas: 'Iqra 4', wali: 'Ibu Sumiati', hadir: 18, spp: 'lunas', hafalan: 'An-Naba (30)', prog: 64 },
    { name: 'Muhammad Rizki', kelas: "Al-Qur'an", wali: 'Bpk. Agus', hadir: 20, spp: 'lunas', hafalan: 'Al-Mulk (29)', prog: 82 },
    { name: 'Zahra Nabila', kelas: 'Iqra 2', wali: 'Ibu Ratna', hadir: 15, spp: 'belum bayar', hafalan: 'Al-Fil', prog: 30 },
    { name: 'Farhan Hakim', kelas: 'Iqra 6', wali: 'Bpk. Yusuf', hadir: 19, spp: 'lunas', hafalan: 'Al-Insyiqaq', prog: 71 },
    { name: 'Nayla Azzahra', kelas: 'Iqra 1', wali: 'Ibu Hartini', hadir: 12, spp: 'belum bayar', hafalan: 'An-Nas', prog: 12 },
  ],
  sermons: [
    { id: 's1', date: '2026-11-20', khatib: 'Ust. Fauzan Akbar', title: 'Menjaga Lisan di Era Media Sosial', tags: ['Akhlak'], dur: '18:42', plays: 214, status: 'terbit', summary: 'Khatib mengingatkan bahwa setiap tulisan di media sosial akan dimintai pertanggungjawaban, sama seperti ucapan lisan.' },
    { id: 's2', date: '2026-11-13', khatib: 'KH. Abdul Malik', title: 'Keutamaan Sedekah yang Rutin', tags: ['Muamalah', 'Sedekah'], dur: '21:05', plays: 302, status: 'terbit', summary: 'Amalan yang paling dicintai Allah adalah yang terus-menerus walau sedikit. Sedekah harian kecil lebih bermakna daripada sesekali.' },
    { id: 's3', date: '2026-11-06', khatib: 'Ust. Hasan Basri', title: 'Birrul Walidain: Berbakti Saat Orang Tua Menua', tags: ['Keluarga'], dur: '19:30', plays: 188, status: 'terbit', summary: 'Berbakti kepada orang tua lansia adalah ladang pahala yang sering terlewat karena kesibukan.' },
    { id: 's4', date: '2026-10-30', khatib: 'Ust. Ahmad Zaki', title: 'Hak Tetangga dalam Islam', tags: ['Akhlak', 'Sosial'], dur: '17:12', plays: 156, status: 'terbit', summary: 'Rasulullah ﷺ menekankan hak tetangga hingga para sahabat mengira tetangga akan mendapat warisan.' },
    { id: 's5', date: '2026-11-27', khatib: 'Ust. Fauzan Akbar', title: 'Persiapan Menyambut Rajab', tags: ['Ibadah'], dur: '—', plays: 0, status: 'draf', summary: '' },
  ],
  assets: [
    { name: 'Keranda jenazah', qty: 2, kondisi: 'baik', loc: 'Gudang belakang', loanable: true, avail: 1 },
    { name: 'Tenda 4×6 m', qty: 3, kondisi: 'baik', loc: 'Gudang belakang', loanable: true, avail: 3 },
    { name: 'Kursi lipat', qty: 150, kondisi: 'baik', loc: 'Gudang aula', loanable: true, avail: 110 },
    { name: 'Sound system portabel', qty: 1, kondisi: 'rusak ringan', loc: 'Ruang marbot', loanable: true, avail: 1 },
    { name: 'AC split 2 PK', qty: 6, kondisi: 'perlu cek', loc: 'Ruang utama', loanable: false, avail: 0 },
    { name: 'Proyektor', qty: 1, kondisi: 'baik', loc: 'Ruang rapat', loanable: true, avail: 1 },
  ],
  loans: [
    { item: 'Keranda jenazah', who: 'Keluarga Alm. Bpk. Darsono', from: '2026-11-24', to: '2026-11-25', status: 'dipinjam' },
    { item: 'Kursi lipat (40)', who: 'RT 04 — Syukuran', from: '2026-11-22', to: '2026-11-23', status: 'terlambat' },
    { item: 'Tenda 4×6 m', who: 'Ibu Hartini — Aqiqah', from: '2026-11-29', to: '2026-11-30', status: 'menunggu' },
    { item: 'Proyektor', who: 'Remaja Masjid', from: '2026-11-08', to: '2026-11-09', status: 'kembali' },
  ],
  bookings: [
    { date: '2026-11-28', room: 'Aula', title: 'Akad nikah — Fikri & Annisa', time: '08.00–11.00', fee: 750000, status: 'disetujui' },
    { date: '2026-11-30', room: 'Aula', title: 'Pembagian Lumbung Pangan', time: '15.00–18.00', fee: 0, status: 'disetujui' },
    { date: '2026-12-02', room: 'Ruang rapat', title: 'Rapat Pleno DKM', time: '19.30–21.30', fee: 0, status: 'disetujui' },
    { date: '2026-12-05', room: 'Aula', title: 'Walimah — Keluarga Wahyudi', time: '10.00–14.00', fee: 1500000, status: 'menunggu' },
  ],
  questions: [
    { code: 'TU-7K3Q', cat: 'Shalat', body: 'Bagaimana hukum menjamak shalat karena macet parah di perjalanan dalam kota?', status: 'diteruskan', date: '2026-11-23', faq: true, to: 'KH. Abdul Malik', flag: false },
    { code: 'TU-2M9X', cat: 'Zakat', body: 'Apakah tabungan untuk biaya kuliah anak tetap wajib dizakati jika sudah mencapai nisab?', status: 'diterima', date: '2026-11-24', faq: true, flag: false },
    { code: 'TU-8P1L', cat: 'Keluarga', body: '(Disembunyikan — ditandai perlu tindak lanjut)', status: 'diterima', date: '2026-11-24', faq: false, flag: true },
    { code: 'TU-5H4D', cat: 'Muamalah', body: 'Bolehkah membeli barang dengan sistem paylater?', status: 'dijawab', date: '2026-11-18', faq: true, to: 'Ust. Hasan Basri', flag: false },
  ],
  faq: [
    { cat: 'Muamalah', q: 'Bolehkah membeli barang dengan sistem paylater?', a: 'Pada dasarnya jual beli tidak tunai diperbolehkan. Yang perlu dihindari adalah denda keterlambatan yang bersifat bunga. Pilih layanan tanpa bunga dan pastikan mampu membayar tepat waktu.', by: 'Ust. Hasan Basri' },
    { cat: 'Shalat', q: 'Apakah boleh shalat sambil duduk di kursi karena sakit lutut?', a: 'Boleh. Kerjakan semampunya: berdiri jika mampu, lalu duduk ketika rukuk dan sujud terasa berat. Posisikan kursi agar tidak memutus shaf.', by: 'KH. Abdul Malik' },
    { cat: 'Zakat', q: 'Zakat fitrah boleh dibayar dengan uang?', a: 'Sebagian ulama membolehkan dengan uang senilai makanan pokok, dan ini yang dipakai banyak lembaga zakat di Indonesia. DKM menerima beras maupun uang.', by: 'KH. Abdul Malik' },
    { cat: 'Keluarga', q: 'Bagaimana adab menasihati orang tua yang lebih tua?', a: 'Gunakan kata yang lembut, pilih waktu yang tepat, dan jangan di depan orang lain. Doakan mereka di setiap shalat.', by: 'Ust. Ahmad Zaki' },
  ],
  pengurus: {
    periode: '2025–2028',
    struktur: [
      { jabatan: 'Ketua DKM', name: 'H. Sudirman', role: 'Ketua' },
      { jabatan: 'Wakil Ketua', name: 'Agus Wibowo', role: 'Ketua' },
      { jabatan: 'Sekretaris', name: 'Dewi Lestari', role: 'Sekretaris' },
      { jabatan: 'Bendahara', name: 'Siti Aminah', role: 'Bendahara' },
      { jabatan: 'Bidang Sosial', name: 'Rahmat Hidayat', role: 'Bidang' },
      { jabatan: 'Bidang TPQ', name: 'Nur Halimah', role: 'Bidang' },
      { jabatan: 'Bidang Ramadhan & PHBI', name: 'Fikri Ramadhan', role: 'Bidang' },
      { jabatan: 'Imam Rawatib', name: 'Ust. Hasan Basri', role: 'Ustadz' },
    ],
    arsip: ['2021–2024', '2017–2020'],
  },
  logs: [
    { who: 'Siti Aminah', what: 'Mengajukan pengeluaran Rp8.750.000 (Cat & plafon lantai 2)', mod: 'Keuangan', at: '2026-11-23 20:14' },
    { who: 'Siti Aminah', what: 'Mengajukan pengeluaran Rp3.200.000 (Servis AC)', mod: 'Keuangan', at: '2026-11-22 09:41' },
    { who: 'H. Sudirman', what: 'Mempublikasikan laporan Oktober 2026', mod: 'Keuangan', at: '2026-11-03 07:02' },
    { who: 'Rahmat Hidayat', what: 'Memberi pengecualian kuota penyaluran: Kel. Wahyudi (alasan: anggota sakit)', mod: 'Lumbung', at: '2026-11-15 16:40' },
    { who: 'Dewi Lestari', what: 'Mengekspor data warga RT 03 (Excel)', mod: 'Warga', at: '2026-11-12 13:22' },
    { who: 'Siti Aminah', what: 'Transaksi pembalik t-0912: salah input nominal (Rp450.000 → Rp45.000)', mod: 'Keuangan', at: '2026-11-08 10:05' },
    { who: 'Dewi Lestari', what: 'Mengubah label Kel. Karta: + lansia', mod: 'Warga', at: '2026-11-06 19:30' },
  ],
  lumbung: {
    items: [
      { name: 'Beras', unit: 'kg', stock: 40, need: 100, min: 30 },
      { name: 'Minyak goreng', unit: 'liter', stock: 18, need: 40, min: 10 },
      { name: 'Gula pasir', unit: 'kg', stock: 7, need: 20, min: 8 },
      { name: 'Mi instan', unit: 'bungkus', stock: 96, need: 120, min: 40 },
      { name: 'Telur', unit: 'kg', stock: 4, need: 15, min: 5 },
    ],
    paket: { name: 'Paket Keluarga', isi: '5 kg beras · 1 L minyak · 1 kg gula · 5 bungkus mi', per: '2 pekan' },
    beneficiaries: [
      { name: 'Kel. Sumiati', rt: '03', last: '2026-11-15', ok: false, token: 'LB-93KD' },
      { name: 'Kel. Karta', rt: '05', last: '2026-11-01', ok: true, token: 'LB-1XQ7' },
      { name: 'Kel. Wahyudi', rt: '06', last: '2026-11-15', ok: false, token: 'LB-55TR' },
      { name: 'Kel. Darsono', rt: '04', last: '2026-10-30', ok: true, token: 'LB-0PZA' },
      { name: 'Kel. Mulyani', rt: '02', last: '2026-11-08', ok: true, token: 'LB-7HJ2' },
    ],
    moves: [
      { date: '2026-11-22', dir: 'masuk', item: 'Beras', qty: 25, src: 'Donasi barang — Bpk. Agus' },
      { date: '2026-11-15', dir: 'keluar', item: 'Paket Keluarga', qty: 14, src: 'Penyaluran 14 keluarga' },
      { date: '2026-11-15', dir: 'masuk', item: 'Beras', qty: 50, src: 'Pembelian dari kas Lumbung' },
      { date: '2026-11-10', dir: 'masuk', item: 'Mi instan', qty: 40, src: 'Donasi barang — Majelis Taklim' },
    ],
  },
  me: {
    name: 'Budi Santoso', wa: '0812-xxxx-3321', loggedIn: false,
    donations: [
      { date: '2026-11-21', what: 'Pembangunan Lantai 2', amount: 250000 },
      { date: '2026-11-16', what: 'Sedekah Subuh (7 hari)', amount: 35000 },
      { date: '2026-11-09', what: 'Sedekah Subuh (7 hari)', amount: 35000 },
      { date: '2026-10-28', what: 'Santunan Yatim', amount: 100000 },
    ],
    sub: { amount: 5000, freq: 'Harian', status: 'aktif', day: 136 },
    zakat: [{ year: '1447 H', what: 'Zakat Fitrah 4 jiwa', amount: 180000 }],
    tabungan: { target: 3500000, paid: 1050000, cicilan: 350000 },
  },
});

/* ---------- state ---------- */
const STORE_KEY = 'cinta-masjid-proto-v1';
CM.load = () => {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s && s.profile) return Object.assign(CM.seed(), s); } catch (e) {}
  return CM.seed();
};
CM.state = CM.load();
CM.save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(CM.state)); } catch (e) {} };
CM.reset = () => { localStorage.removeItem(STORE_KEY); CM.state = CM.seed(); };

/* ---------- turunan ---------- */
CM.saldo = (kasId) => {
  const k = CM.state.kas.find((x) => x.id === kasId);
  return CM.state.tx.filter((t) => t.kas === kasId && t.status === 'disetujui')
    .reduce((s, t) => s + (t.type === 'masuk' ? t.amount : -t.amount), k ? k.saldoAwal : 0);
};
CM.totalSaldo = () => CM.state.kas.reduce((s, k) => s + CM.saldo(k.id), 0);
CM.monthSum = (type, kas) => CM.state.tx.filter((t) => t.type === type && t.status === 'disetujui' && t.date.startsWith('2026-11') && (!kas || t.kas === kas)).reduce((s, t) => s + t.amount, 0);
CM.kasName = (id) => (CM.state.kas.find((k) => k.id === id) || {}).name || id;
CM.pending = () => CM.state.tx.filter((t) => t.status === 'menunggu');

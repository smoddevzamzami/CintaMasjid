/* Cinta Masjid — Situs utama platform (cintamasjid.or.id) · Yayasan Cinta Sedekah
   Catatan: angka, kutipan pengurus, dan data lembaga di sini adalah CONTOH untuk prototipe. */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;
const D = CM.CD;

CM.webTheme = { preset: 'web', brand: '#0B5D4B', accent: '#C2A15A', bg: '#FAF7F0', ink: '#17231F', font: 'elegan', radius: 'lembut', layout: 'klasik', ornament: true };
CM.W = { pages: {} };
const YAYASAN = 'Yayasan Cinta Sedekah';
const CS = `<a href="https://cintasedekah.org/" target="_blank" rel="noopener" class="cs-link">Cinta Sedekah</a>`;
const TAGLINE = 'Memakmurkan masjid, menguatkan jamaah';
const fmt = (n) => CM.num(n);
const slug = (s) => s.toLowerCase().replace(/^(kota|kab\.)\s*/, (m) => (m.startsWith('kota') ? 'kota-' : 'kab-')).replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

/* direktori publik: data konsol + contoh tambahan untuk Kota Bandung */
const EXTRA = [
  { id: 'w1', name: 'Masjid At-Taubah', type: 'Jami', kab: 'Kota Bandung', prov: 'Jawa Barat', src: 'SIMAS', status: 'aktif', x: 35, y: 59 },
  { id: 'w2', name: 'Musholla Al-Barokah', type: 'Musholla', kab: 'Kota Bandung', prov: 'Jawa Barat', src: 'OpenStreetMap', status: 'belum bergabung', x: 36, y: 58 },
  { id: 'w3', name: 'Masjid Nurul Iman', type: 'Jami', kab: 'Kota Bandung', prov: 'Jawa Barat', src: 'SIMAS', status: 'belum bergabung', x: 34.5, y: 60 },
  { id: 'w4', name: 'Masjid Al-Muttaqin', type: 'Besar', kab: 'Kota Bandung', prov: 'Jawa Barat', src: 'SIMAS', status: 'terverifikasi', x: 37, y: 59.5 },
  { id: 'w5', name: 'Musholla Darul Ilmi', type: 'Musholla', kab: 'Kota Bandung', prov: 'Jawa Barat', src: 'Usulan publik', status: 'belum bergabung', x: 35.5, y: 61 },
];
const DIR = () => D.directory.concat(EXTRA.filter((e) => !D.directory.find((d) => d.id === e.id)));
const joined = (d) => d.status === 'aktif' || d.status === 'terverifikasi';
const stLabel = (d) => joined(d) ? (d.status === 'terverifikasi' ? `<span class="badge brand">${I('shield', 12)} Terverifikasi</span>` : U.badge('Sudah bergabung', 'ok'))
  : d.status === 'diklaim' ? U.badge('Sedang diklaim', 'warn') : d.status === 'nonaktif' ? U.badge('Tidak aktif', '') : U.badge('Belum bergabung', '');

/* ================= SHELL ================= */
const NAV = [['fitur', 'Fitur'], ['cari', 'Cari Masjid'], ['biaya', 'Tanpa Biaya'], ['panduan', 'Panduan'], ['tentang', 'Tentang Kami']];
const header = (page) => `
  <header class="web-top">
    <a class="web-brand" href="#/"><span class="web-mark">${I('mosque', 20)}</span><span><b>Cinta Masjid</b><small>Sistem Manajemen Masjid</small></span></a>
    <nav class="web-nav" aria-label="Menu utama">${NAV.map(([p, l]) => `<a href="#/${p}" class="${p === page ? 'active' : ''}" ${p === page ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    <span class="grow"></span>
    <button class="btn sm ghost web-login" data-act="webLogin">Masuk</button>
    <a class="btn sm primary web-cta" href="#/cari">Klaim masjid</a>
    <button class="icon-btn web-menu" data-act="webMenu" aria-label="Buka menu">${I('menu')}</button>
  </header>`;
const footer = () => `
  <footer class="web-foot ornament">
    <div class="web-in web-foot-grid">
      <div class="foot-about">
        <div class="web-brand" style="color:#fff"><span class="web-mark" style="background:var(--accent);color:var(--brand-deep)">${I('mosque', 20)}</span><span><b>Cinta Masjid</b><small style="color:rgb(255 255 255 / .7)">Sistem Manajemen Masjid</small></span></div>
        <p class="small" style="margin-top:12px;opacity:.8;max-width:340px">${TAGLINE}. Program kontribusi ${CS} untuk umat Islam di Indonesia, gratis untuk semua masjid.</p>
        <a class="btn sm accent" style="margin-top:14px" data-act="webWa" href="javascript:void(0)">${I('chat', 16)} Tanya lewat WhatsApp</a>
      </div>
      ${[['Layanan', [['#/fitur', 'Fitur'], ['#/cari', 'Cari masjid'], ['#/biaya', 'Tanpa biaya'], ['#/onboarding', 'Daftar masjid baru']]],
         ['Bantuan', [['#/panduan', 'Panduan & tanya jawab'], ['javascript:void(0)', 'Status layanan'], ['#/kebijakan/privasi', 'Kebijakan privasi'], ['#/kebijakan/syarat', 'Syarat layanan']]],
         ['Lembaga', [['#/tentang', 'Tentang program'], ['https://cintasedekah.org/', 'Cinta Sedekah'], ['#/kebijakan/pedoman', 'Pedoman komunitas'], ['#/prototipe', 'Jelajah prototipe']]]]
        .map(([h, ls]) => `<div><div class="foot-h">${h}</div>${ls.map(([u, l]) => `<a href="${u}">${l}</a>`).join('')}</div>`).join('')}
    </div>
    <div class="web-in web-foot-bottom"><span>© ${new Date().getFullYear()} ${YAYASAN} · cintamasjid.or.id · Program amal, tanpa biaya</span><span>Dana jamaah tidak pernah melewati Cinta Masjid.</span></div>
  </footer>`;
CM.W.shell = (page, body) => `<div class="web">${header(page)}<main>${body}</main>${footer()}<a class="proto-pill" href="#/prototipe">${I('grid', 14)} Menu prototipe</a></div>`;
CM.W.render = (page, sub) => CM.W.shell(page || 'beranda', (CM.W.pages[page || 'beranda'] || CM.W.pages.beranda)(sub));

CM.act.webMenu = () => U.sheet({ title: 'Menu', body: `<div class="card pad-0"><div class="list">${[['', 'Beranda', 'home']].concat(NAV.map(([p, l]) => [p, l, { fitur: 'grid', cari: 'search', biaya: 'tag', panduan: 'book', tentang: 'info' }[p]])).map(([p, l, ic]) => `<a class="list-item" href="#/${p}" data-act="close">${I(ic, 18)}<span class="grow title">${l}</span>${I('right', 16)}</a>`).join('')}</div></div><div class="stack" style="--gap:8px;margin-top:14px"><a class="btn primary block lg" href="#/cari" data-act="close">Cari & klaim masjid</a><button class="btn block lg" data-act="webLogin">Masuk</button></div>` });
CM.act.webLogin = () => U.sheet({ title: 'Masuk sebagai', body: `<div class="stack" style="--gap:10px">${[
  ['#/admin', 'building', 'Pengurus DKM', 'Kelola keuangan, kegiatan, dan situs masjid'],
  ['#/situs/akun', 'user', 'Jamaah', 'Riwayat donasi, sedekah subuh, Ruang Jamaah'],
  ['#/console', 'shield', 'Tim pengelola', 'Khusus tim Cinta Masjid · pengelola.cintamasjid.or.id']].map(([h, ic, t, d]) => `<a class="card row" href="${h}" data-act="close" style="--gap:14px"><span class="icon-tile">${I(ic)}</span><span class="grow"><b>${t}</b><br><span class="small muted">${d}</span></span>${I('right', 18)}</a>`).join('')}<p class="xs muted" style="text-align:center">Masuk dengan kode OTP WhatsApp, tanpa kata sandi.</p></div>` });
CM.act.webWa = () => U.toast('Membuka WhatsApp tim bantuan Cinta Masjid…', 'chat');

/* ================= BERANDA ================= */
const heroVisual = () => {
  const k = CM.KJ ? CM.KJ.get('a1') : null;
  return `<div class="hero-visual" aria-hidden="true">
    <div class="hv-phone"><div class="hv-screen">
      <div class="hv-top"><b>Masjid Al-Ikhlas</b><span>Bendahara</span></div>
      <div class="hv-saldo"><span>Total saldo semua kas</span><b>${CM.rp(CM.totalSaldo())}</b><div class="hv-chips"><i>Kas Umum</i><i>Pembangunan</i><i>Yatim</i></div></div>
      ${[['in', 'Infak Jumat', '+Rp4.725.000'], ['out', 'Token listrik', '−Rp1.240.000'], ['in', 'Donasi QRIS', '+Rp950.000']].map(([t, l, v]) => `<div class="hv-row"><span class="hv-ic ${t}">${I(t === 'in' ? 'in' : 'out', 14)}</span><span class="grow">${l}</span><b class="${t}">${v}</b></div>`).join('')}
      <div class="hv-fab">${I('camera', 16)} Foto nota</div>
    </div></div>
    <div class="hv-card hv-report"><span class="icon-tile sm ok">${I('check', 16)}</span><div><b>Laporan kas November</b><br><span>Terpublikasi di situs masjid</span></div></div>
    ${k ? `<div class="hv-flyer">${CM.KJ.flyer(k, 'klasik')}</div>` : ''}
  </div>`;
};
const SAYINGS = [
  { q: 'Dulu laporan kas baru selesai seminggu setelah akhir bulan. Sekarang tinggal tekan Publikasikan, jamaah langsung bisa lihat.', who: 'Siti Aminah', role: 'Bendahara · Masjid Al-Ikhlas, Bandung' },
  { q: 'Pengurus kami kebanyakan sudah sepuh. Masuk pakai kode WhatsApp, tulisannya besar, jadi tidak ada yang kesulitan.', who: 'H. Sudirman', role: 'Ketua DKM · Masjid Al-Ikhlas, Bandung' },
  { q: 'Pembagian sembako jadi tertib. Warga cukup tunjukkan QR, tidak perlu antre dan tidak ada yang terdata dua kali.', who: 'Rahmat Hidayat', role: 'Bidang Sosial · Masjid Al-Ikhlas, Bandung' },
];
const FAQ = [
  ['Apakah benar-benar gratis?', 'Ya, tanpa syarat dan tanpa fitur berbayar. Cinta Masjid adalah program amal dari Cinta Sedekah untuk umat Islam di Indonesia, tidak mencari keuntungan.', 'Biaya'],
  ['Masjid kami sudah punya domain sendiri, bisa dipakai?', 'Bisa. Kirim nama domainnya ke tim kami, nanti kami bantu atur sampai situs masjid tampil di alamat itu. Gratis.', 'Domain'],
  ['Kami belum paham soal domain atau server, bisa dibantu?', 'Bisa. Kami dampingi membeli domain di penyedia resmi atas nama masjid. Biaya domain dibayar langsung ke penyedia; Cinta Masjid tidak mengambil keuntungan. Tanpa domain sendiri pun, situs tetap aktif di alamat gratis.', 'Domain'],
  ['Apakah uang infak lewat Cinta Masjid?', 'Tidak. Infak, zakat, dan donasi selalu masuk langsung ke rekening atau QRIS milik masjid. Cinta Masjid hanya membantu pencatatan.', 'Keuangan'],
  ['Bagaimana kalau ketua DKM berganti?', 'Kepemilikan akun masjid bisa dialihkan ke ketua baru dengan melampirkan SK kepengurusan yang baru. Data dan riwayat tetap utuh.', 'Akun'],
  ['Musholla kecil bisa pakai?', 'Bisa. Nyalakan hanya modul yang dibutuhkan, misalnya Keuangan dan Jadwal Shalat saja.', 'Umum'],
  ['Siapa yang bisa melihat data warga?', 'Hanya pengurus masjid dengan hak akses. Data warga tidak pernah tampil di situs jamaah dan tidak bisa dibuka oleh tim Cinta Masjid.', 'Privasi'],
  ['Masjid kami belum ada di daftar, bagaimana?', 'Daftarkan sebagai masjid baru. Prosesnya sekitar 5 menit dan situs masjid langsung aktif.', 'Akun'],
];
const faqList = (items) => items.map(([q, a]) => `<details class="faq"><summary>${E(q)}${I('down', 18, 'faint')}</summary><p>${E(a)}</p></details>`).join('');

CM.W.pages.beranda = () => {
  const k = D.kpi;
  return `
  <section class="web-hero ornament"><div class="web-in web-hero-grid">
    <div class="web-hero-copy">
      <div class="eyebrow" style="color:var(--accent)">Program amal · gratis untuk semua masjid</div>
      <h1>${TAGLINE}.</h1>
      <p class="lead">Catat kas dari HP, terbitkan laporan untuk jamaah, umumkan kajian, dan kelola zakat serta qurban. Situs masjid Anda aktif dalam 5 menit.</p>
      <form class="hero-search" onsubmit="return false" role="search">
        ${I('search', 20)}<input class="input" id="heroQ" placeholder="Ketik nama masjid atau kota…" aria-label="Cari masjid Anda">
        <button class="btn accent" data-act="heroSearch">Cari masjid</button>
      </form>
      <div class="row wrap" style="--gap:14px;margin-top:14px"><a class="hero-link" href="#/situs">${I('eye', 16)} Lihat contoh situs masjid</a><a class="hero-link" href="#/onboarding">${I('plus', 16)} Daftarkan masjid baru</a></div>
    </div>
    ${heroVisual()}
  </div></section>

  <section class="web-sec tight"><div class="web-in">
    <div class="web-stats">${[[fmt(k.claimed), 'masjid & musholla bergabung'], ['1.688', 'laporan kas dipublikasikan'], [fmt(k.directory), 'masjid di direktori nasional'], ['2.140', 'keluarga terbantu lumbung pangan']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
    <p class="xs muted" style="text-align:center;margin-top:8px">Angka contoh untuk prototipe.</p>
  </div></section>

  <section class="web-sec"><div class="web-in">
    <div class="web-head"><div class="eyebrow">Kenapa Cinta Masjid</div><h2>Masalah yang sering dialami pengurus masjid</h2></div>
    <div class="grid sm-3">${[['book', 'Kas masih di buku tulis', 'Laporan terlambat, jamaah sulit melihat ke mana infak digunakan.', 'Catat dari HP, laporan bulanan jadi otomatis dan siap tempel di mading.'], ['users', 'Data tercecer di banyak orang', 'Data warga, mustahik, dan shohibul qurban tersimpan di HP pengurus masing-masing.', 'Satu tempat yang aman, dengan hak akses per pengurus.'], ['globe', 'Belum punya situs', 'Jadwal kajian dan pengumuman hanya beredar di grup WhatsApp.', 'Situs masjid gratis dengan jadwal shalat, agenda, dan infak QRIS.']].map(([ic, t, p, s]) => `<div class="card problem"><span class="icon-tile gold">${I(ic)}</span><h3>${t}</h3><p class="small muted">${p}</p><p class="small solve">${I('check', 14)} ${s}</p></div>`).join('')}</div>
  </div></section>

  <section class="web-sec alt"><div class="web-in">
    <div class="web-head"><div class="eyebrow">Fitur</div><h2>Satu aplikasi untuk seluruh urusan masjid</h2><p>Nyalakan hanya yang dibutuhkan. Masjid kecil cukup Keuangan dan Jadwal Shalat.</p></div>
    <div class="grid sm-2 lg-3">${FEATS.map((f) => `<a class="card feat" href="#/fitur" data-act="featGo" data-id="${f.id}"><span class="icon-tile">${I(f.icon)}</span><h3>${f.title}</h3><p class="small muted">${f.short}</p></a>`).join('')}</div>
    <div style="text-align:center;margin-top:18px"><a class="btn" href="#/fitur">Lihat semua fitur ${I('right', 16)}</a></div>
  </div></section>

  <section class="web-sec"><div class="web-in">
    <div class="web-head"><div class="eyebrow">Cara mulai</div><h2>Tiga langkah, tanpa perlu ahli komputer</h2></div>
    <ol class="steps3">${[['search', 'Cari & klaim masjid Anda', 'Lebih dari 800 ribu masjid sudah ada di direktori. Kirim bukti sebagai pengurus, kami verifikasi kurang dari 1×24 jam.'], ['wallet', 'Isi lokasi & kas awal', 'Jadwal shalat langsung muncul. Kategori kas sudah disiapkan.'], ['share', 'Bagikan link ke jamaah', 'Kirim alamat situs masjid ke grup WhatsApp. Selesai.']].map(([ic, t, d], i) => `<li><span class="step-n">${i + 1}</span><div><h3>${t}</h3><p class="small muted">${d}</p></div></li>`).join('')}</ol>
    <div style="text-align:center;margin-top:20px"><a class="btn primary lg" href="#/cari">Mulai dengan mencari masjid</a></div>
  </div></section>

  <section class="web-sec trust ornament"><div class="web-in">
    <div class="web-head light"><div class="eyebrow" style="color:var(--accent)">Amanah</div><h2>Kenapa bisa dipercaya</h2></div>
    <div class="grid sm-2 lg-4">${[['shield', 'Dana tidak lewat kami', 'Infak dan zakat langsung masuk ke rekening/QRIS masjid.'], ['lock', 'Data warga milik masjid', 'Sesuai UU PDP. Tim kami tidak bisa membuka data warga.'], ['x', 'Tanpa iklan', 'Tidak ada iklan dan tidak ada penjualan data.'], ['heart', 'Program amal', 'Dibiayai Cinta Sedekah dan para donatur. Tanpa biaya, tanpa iklan, tanpa mencari keuntungan.']].map(([ic, t, d]) => `<div class="trust-card"><span class="icon-tile">${I(ic)}</span><h3>${t}</h3><p class="small">${d}</p></div>`).join('')}</div>
    <div style="text-align:center;margin-top:18px"><a class="btn on-dark" href="#/tentang">Tentang ${YAYASAN} ${I('right', 16)}</a></div>
  </div></section>

  <section class="web-sec"><div class="web-in">
    <div class="web-head"><div class="eyebrow">Cerita masjid</div><h2>Kata para pengurus</h2></div>
    <div class="grid lg-3">${SAYINGS.map((s) => `<figure class="card saying"><blockquote>“${E(s.q)}”</blockquote><figcaption class="row" style="--gap:10px">${U.avatar(s.who)}<span><b class="small">${E(s.who)}</b><br><span class="xs muted">${E(s.role)}</span></span></figcaption></figure>`).join('')}</div>
    <p class="xs muted" style="text-align:center;margin-top:10px">Kutipan contoh untuk prototipe.</p>
  </div></section>

  <section class="web-sec alt"><div class="web-in web-narrow">
    <div class="web-head"><div class="eyebrow">Tanya jawab</div><h2>Yang sering ditanyakan</h2></div>
    ${faqList(FAQ.slice(0, 5))}
    <div style="text-align:center;margin-top:16px"><a class="btn" href="#/panduan">Panduan lengkap ${I('right', 16)}</a></div>
  </div></section>

  <section class="web-sec"><div class="web-in"><div class="final-cta ornament">
    <h2>Siap memakmurkan masjid Anda?</h2><p>Gratis tanpa syarat, aktif dalam 5 menit, dan bisa dikerjakan dari HP.</p>
    <div class="row wrap" style="--gap:10px;justify-content:center"><a class="btn accent lg" href="#/cari">Cari & klaim masjid</a><button class="btn on-dark lg" data-act="webWa">${I('chat', 18)} Tanya lewat WhatsApp</button></div>
  </div></div></section>`;
};
CM.act.heroSearch = () => { CM.W.q = document.getElementById('heroQ').value; location.hash = '#/cari'; };

/* ================= FITUR ================= */
const FEATS = [
  { id: 'keuangan', icon: 'wallet', title: 'Keuangan & laporan', short: 'Catat kas dari HP, foto nota, persetujuan ketua, laporan bulanan siap mading.', pts: ['Beberapa kas terpisah: umum, pembangunan, anak yatim', 'Dana terikat tidak bisa tercampur', 'Pengeluaran besar perlu persetujuan ketua', 'Laporan bulanan sekali tekan, tampil di situs tanpa nama donatur'] },
  { id: 'jadwal', icon: 'tv', title: 'Jadwal shalat & Mode TV', short: 'Jadwal otomatis sesuai lokasi, layar TV masjid dengan hitung mundur iqamah.', pts: ['Jadwal dari koordinat masjid, bisa dikoreksi per menit', 'Hitung mundur adzan & iqamah di TV masjid', 'Tetap jalan tanpa internet setelah dimuat', 'Pengingat waktu shalat di HP jamaah'] },
  { id: 'zis', icon: 'heart', title: 'Zakat, infak & qurban', short: 'Kalkulator zakat, kampanye donasi, sedekah subuh otomatis, kelompok sapi & kupon QR.', pts: ['QRIS masjid tampil di situs', 'Sedekah Subuh mulai Rp2.000 per hari', 'Tabungan qurban dengan pengingat cicilan', 'Kupon daging ber-QR, satu kupon sekali pakai'] },
  { id: 'kajian', icon: 'mic', title: 'Kajian & khutbah', short: 'Jadwal kajian, rekaman, rangkuman poin, flyer otomatis, siap dibagikan ke WA.', pts: ['Halaman detail tiap kajian dengan konfirmasi hadir', 'Rekaman dengan penanda bab', 'Rangkuman dibantu AI, selalu ditinjau ustadz', 'Flyer otomatis dengan warna & logo masjid'] },
  { id: 'komunitas', icon: 'users', title: 'Ruang Jamaah', short: 'Media sosial khusus jamaah masjid: kabar, titip doa, grup, relawan, pasar.', pts: ['Hanya anggota yang disetujui DKM', 'Saling mendoakan, nama yang mendoakan dirahasiakan', 'Tanpa pesan pribadi, tanpa algoritma viral', 'Mode Pemilu menjaga masjid tetap netral'] },
  { id: 'kepedulian', icon: 'basket', title: 'Kepedulian umat', short: 'Lumbung pangan digital: stok sembako, penerima dengan QR, tanpa antre.', pts: ['Stok sembako dari donasi warga', 'Kuota per keluarga, tidak terdata ganda', 'QR penerima tanpa data pribadi', 'Situs menampilkan kebutuhan stok, bukan nama penerima'] },
];
const featVisual = (id) => {
  if (id === 'jadwal') return `<div class="fv-tv">${CM.TV.html(true)}</div>`;
  if (id === 'kajian' && CM.KJ) return `<div class="fv-flyer">${CM.KJ.flyer(CM.KJ.get('k0'), 'klasik')}</div>`;
  if (id === 'komunitas' && CM.R) { const p = (S().comm || CM.commSeed()).posts.find((x) => x.id === 'p2'); return `<div class="fv-post">${CM.R.post(p, true)}</div>`; }
  if (id === 'keuangan') return `<div class="card fv-card"><div class="eyebrow">Laporan Kas Umum · November 2026</div><div class="stack" style="--gap:8px;margin-top:12px">${[['Saldo awal', CM.rp(18450000)], ['Infak Jumat', '+' + CM.rp(13615000)], ['Listrik & Air', '−' + CM.rp(1240000)], ['Honor Petugas', '−' + CM.rp(1500000)]].map(([a, b]) => `<div class="row between small"><span>${a}</span><b class="num">${b}</b></div>`).join('')}<hr class="hairline"><div class="row between"><b>Saldo akhir</b><b class="display num" style="font-size:1.3rem">${CM.rp(CM.saldo('umum'))}</b></div></div><div class="badge ok" style="margin-top:12px"><span class="dot"></span>Terpublikasi untuk jamaah</div></div>`;
  if (id === 'zis') return `<div class="card fv-card">${S().campaigns.slice(0, 2).map((c) => `<div style="margin-bottom:14px"><div class="row between small"><b>${E(c.title)}</b><span class="muted">${Math.round((c.raised / c.target) * 100)}%</span></div><div style="margin-top:6px">${U.progress((c.raised / c.target) * 100)}</div></div>`).join('')}<div class="row" style="--gap:10px;padding:12px;border-radius:var(--r-sm);background:var(--accent-soft)"><span class="icon-tile sm gold">${I('sunrise', 16)}</span><span class="small"><b>128 jamaah</b> rutin sedekah subuh</span></div></div>`;
  return `<div class="card fv-card">${S().lumbung.items.slice(0, 4).map((i) => `<div style="margin-bottom:12px"><div class="row between small"><b>${i.name}</b><span class="num muted">${i.stock}/${i.need} ${i.unit}</span></div><div style="margin-top:6px">${U.progress((i.stock / i.need) * 100, 'gold')}</div></div>`).join('')}</div>`;
};
CM.W.pages.fitur = () => `
  <section class="web-sub ornament"><div class="web-in"><div class="eyebrow" style="color:var(--accent)">Fitur</div><h1>Semua yang dibutuhkan pengurus masjid</h1><p>Dirancang untuk dipakai dari HP, dengan tulisan besar dan bahasa sehari-hari. Bisa dinyalakan satu per satu sesuai kebutuhan masjid.</p></div></section>
  <div class="web-in">
    <nav class="chips feat-nav" aria-label="Lompat ke fitur">${FEATS.map((f) => `<a class="chip" href="javascript:void(0)" data-act="featJump" data-id="${f.id}">${f.title}</a>`).join('')}</nav>
    ${FEATS.map((f, i) => `<section class="feat-row ${i % 2 ? 'rev' : ''}" id="f-${f.id}">
      <div class="feat-copy"><span class="icon-tile lg">${I(f.icon, 24)}</span><h2>${f.title}</h2><p class="muted">${f.short}</p><ul class="ticks">${f.pts.map((p) => `<li>${I('check', 16)}<span>${p}</span></li>`).join('')}</ul></div>
      <div class="feat-visual">${featVisual(f.id)}</div>
    </section>`).join('')}
    <section class="feat-more"><h2>Dan masih banyak lagi</h2><div class="row wrap" style="--gap:8px;justify-content:center">${['Data warga per KK', 'TPA/TPQ & SPP', 'Arsip khutbah', 'Tanya Ustadz', 'Peminjaman alat', 'Pemesanan aula', 'Berita duka', 'Mode Ramadhan', 'Hadits harian', 'Struktur pengurus', 'Situs atas nama masjid', 'Domain sendiri, dibantu atur'].map((t) => `<span class="badge brand" style="font-size:.85rem;padding:6px 12px">${t}</span>`).join('')}</div></section>
  </div>
  <section class="web-sec"><div class="web-in"><div class="final-cta ornament"><h2>Coba langsung contohnya</h2><p>Lihat situs jamaah dan panel pengurus Masjid Al-Ikhlas (contoh).</p><div class="row wrap" style="--gap:10px;justify-content:center"><a class="btn accent lg" href="#/situs">Situs jamaah</a><a class="btn on-dark lg" href="#/admin">Panel pengurus</a></div></div></div></section>`;
CM.act.featGo = (el) => { CM.W.jump = el.dataset.id; location.hash = '#/fitur'; };
CM.W.mountFitur = () => { if (CM.W.jump) { const id = CM.W.jump; CM.W.jump = null; setTimeout(() => document.getElementById('f-' + id)?.scrollIntoView({ block: 'start' }), 30); } };
CM.act.featJump = (el) => document.getElementById('f-' + el.dataset.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ================= CARI MASJID ================= */
CM.W.pages.cari = (sub) => {
  const all = DIR();
  const kota = sub ? all.find((d) => slug(d.kab) === sub)?.kab : null;
  const q = (CM.W.q || '').toLowerCase();
  const f = CM.W.f || 'semua';
  let list = all.filter((d) => (!kota || d.kab === kota) && (!q || (d.name + ' ' + d.kab + ' ' + d.prov).toLowerCase().includes(q)));
  if (f === 'gabung') list = list.filter(joined); if (f === 'belum') list = list.filter((d) => !joined(d));
  const cities = [...new Set(all.map((d) => d.kab))];
  const cityCount = (c) => all.filter((d) => d.kab === c).length;
  return `
  <section class="web-sub ornament"><div class="web-in">
    ${kota ? `<a class="back-link" href="#/cari" style="color:var(--accent)">${I('left', 16)} Semua wilayah</a>` : ''}
    <div class="eyebrow" style="color:var(--accent)">Direktori masjid Indonesia</div>
    <h1>${kota ? `Masjid di ${E(kota)}` : 'Cari masjid'}</h1>
    <p>${kota ? `Daftar masjid dan musholla di ${E(kota)}, dari data SIMAS Kemenag, OpenStreetMap, dan usulan masyarakat.` : `${fmt(D.kpi.directory)} masjid dan musholla dari seluruh Indonesia. Temukan masjid terdekat, atau klaim masjid Anda.`}</p>
    <div class="hero-search" style="margin-top:16px">${I('search', 20)}<input class="input" id="dirQ" value="${E(CM.W.q || '')}" placeholder="Nama masjid, kelurahan, atau kota…" aria-label="Cari masjid"></div>
  </div></section>
  <div class="web-in" style="padding-top:18px">
    <div class="row between wrap" style="--gap:10px;margin-bottom:14px">
      <div class="chips">${[['semua', 'Semua'], ['gabung', 'Sudah bergabung'], ['belum', 'Belum bergabung']].map(([v, l]) => `<button class="chip ${f === v ? 'active' : ''}" data-act="dirFilter" data-v="${v}">${l}</button>`).join('')}</div>
      <span class="small muted">${list.length} hasil${q ? ` untuk “${E(CM.W.q)}”` : ''}</span>
    </div>
    <div class="cari-grid">
      <div class="stack" style="--gap:10px">${list.map((d) => `<button class="card dir-card" data-act="dirOpen" data-id="${d.id}">
        <span class="icon-tile ${joined(d) ? '' : 'ink'}">${I('mosque', 20)}</span>
        <span class="grow" style="min-width:0"><b class="dir-name">${E(d.name)}</b><span class="small muted" style="display:block">${d.type} · ${E(d.kab)}, ${E(d.prov)}</span><span style="display:block;margin-top:6px">${stLabel(d)}</span></span>
        <span class="dir-act">${joined(d) ? `<span class="small" style="color:var(--brand);font-weight:700">Kunjungi ${I('right', 14)}</span>` : d.status === 'belum bergabung' || d.status === 'ditolak' ? `<span class="small" style="color:var(--accent-deep);font-weight:700">Klaim ${I('right', 14)}</span>` : ''}</span>
      </button>`).join('') || `<div class="card">${U.empty('search', 'Masjid tidak ditemukan', 'Coba kata lain, atau daftarkan masjid Anda sebagai masjid baru.', '<a class="btn primary" href="#/onboarding">Daftarkan masjid baru</a>')}</div>`}</div>
      <aside class="stack" style="--gap:14px">
        <div class="card pad-0"><div class="map nusantara" style="min-height:260px" role="img" aria-label="Peta sebaran hasil pencarian">
          <div class="isle" style="left:4%;top:14%;width:22%;height:30%;transform:rotate(-38deg)"></div><div class="isle" style="left:26%;top:54%;width:38%;height:11%;transform:rotate(4deg)"></div><div class="isle" style="left:40%;top:24%;width:20%;height:30%"></div><div class="isle" style="left:62%;top:30%;width:10%;height:30%;transform:rotate(12deg)"></div><div class="isle" style="left:58%;top:62%;width:16%;height:6%"></div><div class="isle" style="left:80%;top:32%;width:18%;height:22%"></div>
          ${list.map((d) => `<span class="dotp" style="left:${d.x}%;top:${d.y}%;background:${joined(d) ? 'var(--brand)' : '#9AA29E'}"></span>`).join('')}
        </div><div class="row wrap xs" style="padding:10px 14px;--gap:14px"><span class="row" style="--gap:6px"><i style="width:10px;height:10px;border-radius:50%;background:var(--brand)"></i>Sudah bergabung</span><span class="row" style="--gap:6px"><i style="width:10px;height:10px;border-radius:50%;background:#9AA29E"></i>Belum bergabung</span></div></div>
        <div class="card"><div class="foot-h" style="color:var(--accent-deep)">Masjid per kota</div><div class="stack" style="--gap:2px;margin-top:6px">${cities.map((c) => `<a class="city-link ${c === kota ? 'on' : ''}" href="#/cari/${slug(c)}"><span>${E(c)}</span><span class="xs muted">${cityCount(c)}</span></a>`).join('')}</div></div>
        <div class="card accent"><b class="small">Masjid Anda belum ada?</b><p class="xs muted" style="margin:4px 0 10px">Daftarkan sebagai masjid baru, sekitar 5 menit.</p><a class="btn sm primary" href="#/onboarding">Daftarkan masjid</a></div>
      </aside>
    </div>
  </div>`;
};
CM.W.mountCari = () => { const i = document.getElementById('dirQ'); if (!i) return; i.addEventListener('input', () => { CM.W.q = i.value; const pos = i.selectionStart; CM.render(); const n = document.getElementById('dirQ'); n.focus(); n.setSelectionRange(pos, pos); }); };
CM.act.dirFilter = (el) => { CM.W.f = el.dataset.v; CM.render(); };
CM.act.dirOpen = (el) => {
  const d = DIR().find((x) => x.id === el.dataset.id);
  const pt = CM.prayerTimes().filter((p) => p.id !== 'terbit');
  const isDemo = d.id === 'd1';
  U.sheet({
    title: d.name,
    body: `<div class="stack">
      <div class="row wrap" style="--gap:6px">${stLabel(d)}${U.badge(d.type, '')}</div>
      <div class="row small" style="--gap:8px;align-items:flex-start">${I('pin', 16)}<span>${E(d.kab)}, ${E(d.prov)}</span></div>
      <div class="card soft"><div class="xs muted" style="margin-bottom:8px">Perkiraan jadwal shalat hari ini di wilayah ini</div><div class="prayers" style="grid-template-columns:repeat(5,1fr)">${pt.map((p) => `<div class="prayer" style="padding:8px 4px"><div class="n">${p.name}</div><div class="t" style="font-size:.95rem">${p.shown}</div></div>`).join('')}</div></div>
      <p class="xs muted">Sumber data: ${E(d.src)}. Ada yang keliru? <button class="link-btn" data-act="dirFix">Ajukan koreksi</button></p>
    </div>`,
    foot: joined(d)
      ? `<button class="btn" data-act="toastOnly" data-msg="Membuka petunjuk arah…">${I('pin', 18)} Arah</button><a class="btn primary" href="${isDemo ? '#/situs' : 'javascript:void(0)'}" ${isDemo ? 'data-act="close"' : 'data-act="toastOnly" data-msg="Situs masjid contoh (prototipe)"'}>${I('globe', 18)} Kunjungi situs masjid</a>`
      : d.status === 'diklaim' ? `<span class="small muted grow" style="align-self:center">Masjid ini sedang dalam proses klaim oleh pengurusnya.</span>`
      : `<button class="btn" data-act="toastOnly" data-msg="Membuka petunjuk arah…">${I('pin', 18)} Arah</button><button class="btn primary" data-act="dirClaim" data-id="${d.id}">Ini masjid saya, klaim</button>`,
  });
};
CM.act.dirFix = () => { U.close(); U.sheet({ title: 'Ajukan koreksi', body: `<div class="stack">${U.field('Yang perlu diperbaiki', U.select('k', ['Nama masjid', 'Alamat / lokasi', 'Jenis (masjid/musholla)', 'Masjid sudah tidak ada', 'Lainnya']))}${U.field('Keterangan', '<textarea class="textarea"></textarea>')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Terima kasih, koreksi akan ditinjau tim kami">Kirim</button>` }); };
CM.act.dirClaim = (el) => {
  U.close();
  if (!D.directory.find((x) => x.id === el.dataset.id)) D.directory.push(EXTRA.find((x) => x.id === el.dataset.id));
  CM.C.claimSel = el.dataset.id; CM.C.claimStep = 2; location.hash = '#/klaim';
};

/* ================= TANPA BIAYA (program amal) ================= */
const DUKUNG = `<a class="btn accent" href="https://cintasedekah.org/" target="_blank" rel="noopener">${I('heart', 18)} Dukung lewat Cinta Sedekah ${I('external', 14)}</a>`;
CM.W.pages.biaya = () => `
  <section class="web-sub ornament"><div class="web-in"><div class="eyebrow" style="color:var(--accent)">Program amal</div><h1>Gratis, tanpa biaya apa pun</h1><p>Cinta Masjid adalah program kontribusi Cinta Sedekah untuk umat Islam di Indonesia. Tidak ada biaya langganan, tidak ada fitur berbayar, dan tidak ada iklan.</p></div></section>
  <div class="web-in" style="padding:24px 16px 8px">
    <div class="price-grid">
      <div class="card price main"><div class="eyebrow">Untuk semua masjid & musholla</div><h2>Semuanya gratis</h2><div class="price-v">Rp0 <span>tanpa syarat</span></div>
        <ul class="ticks">${['Semua modul: keuangan, ZIS & qurban, kajian, warga, Ruang Jamaah, lumbung', 'Situs masjid di alamat namamasjid.cintamasjid.or.id', 'Memakai domain milik masjid sendiri, dibantu atur', 'Mode TV untuk layar masjid', 'Jumlah pengurus & transaksi tanpa batas', 'Jatah pesan WhatsApp setiap bulan', 'Satu panel untuk yayasan dengan banyak masjid (segera)', 'Bantuan lewat WhatsApp & pendampingan Duta Wilayah'].map((p) => `<li>${I('check', 16)}<span>${p}</span></li>`).join('')}</ul>
        <a class="btn primary block lg" href="#/cari">Mulai sekarang</a></div>
      <div class="stack" style="--gap:14px">
        <div class="card" id="bantuan-domain"><div class="row" style="--gap:12px"><span class="icon-tile">${I('globe')}</span><h3>Bantuan domain</h3></div>
          <div class="dom-path"><b class="small">Sudah punya domain?</b><p class="small muted">Kirim nama domainnya ke tim kami. Kami bantu atur sampai situs masjid tampil di alamat itu. Gratis.</p></div>
          <div class="dom-path"><b class="small">Belum paham soal domain atau server?</b><p class="small muted">Kami dampingi langkah demi langkah membeli domain di penyedia resmi atas nama masjid. Biaya domain dibayar langsung oleh masjid ke penyedia. Cinta Masjid tidak mengambil keuntungan apa pun.</p></div>
          <p class="xs muted" style="margin-top:6px">Tanpa domain sendiri pun, situs masjid tetap aktif di alamat gratis.</p>
          <button class="btn block" style="margin-top:12px" data-act="webWa">${I('chat', 18)} Minta bantuan domain</button></div>
        <div class="card"><div class="row" style="--gap:12px"><span class="icon-tile">${I('chat')}</span><h3>Pesan WhatsApp</h3></div><p class="small muted" style="margin-top:8px">Setiap masjid mendapat jatah pesan WhatsApp setiap bulan. Masjid yang membutuhkan lebih bisa mengajukan tambahan; tim kami meninjau dan membantu tanpa biaya.</p></div>
      </div>
    </div>
  </div>
  <section class="web-sec"><div class="web-in web-narrow"><div class="card soft funder">
    <div class="eyebrow">Siapa yang membiayai</div>
    <h2 class="display" style="font-size:1.45rem;margin-top:6px">Sepenuhnya dari kontribusi untuk umat</h2>
    <p style="margin-top:8px">Cinta Masjid dibiayai oleh ${CS} melalui dana kontribusi dan para donatur yang peduli pada kemakmuran masjid. Biaya server, pesan WhatsApp, dan tim pendamping ditanggung program ini, bukan oleh masjid.</p>
    <ul class="ticks" style="margin-top:12px">${['Tidak ada iklan dan tidak ada penjualan data', 'Tidak mengambil potongan dari infak jamaah', 'Penggunaan dana program dilaporkan terbuka setiap tahun'].map((p) => `<li>${I('check', 16)}<span>${p}</span></li>`).join('')}</ul>
    <div class="row wrap" style="--gap:10px;margin-top:16px">${DUKUNG}<a class="btn" href="#/tentang">Tentang program ${I('right', 16)}</a></div>
  </div></div></section>`;

/* ================= PANDUAN ================= */
CM.W.pages.panduan = () => `
  <section class="web-sub ornament"><div class="web-in"><div class="eyebrow" style="color:var(--accent)">Panduan & bantuan</div><h1>Belajar dalam 1 menit per fitur</h1><p>Video singkat, tanya jawab, dan tim bantuan yang siap membalas lewat WhatsApp.</p></div></section>
  <div class="web-in" style="padding:24px 16px">
    <div class="web-head" style="text-align:left;margin-bottom:12px"><h2 style="font-size:1.4rem">Video singkat</h2></div>
    <div class="grid sm-2 lg-3">${[['Daftar & klaim masjid', '1:10'], ['Mencatat transaksi dari HP', '0:58'], ['Menerbitkan laporan bulanan', '0:52'], ['Memasang Mode TV di masjid', '1:05'], ['Menyusun jadwal petugas Jumat', '0:49'], ['Mengundang pengurus lain', '0:41']].map(([t, d], i) => `<button class="card video" data-act="toastOnly" data-msg="Memutar video: ${t}"><span class="media ${i % 2 ? 'gold' : ''}" style="aspect-ratio:16/9"><span class="play-b">${I('play', 22)}</span><span class="cap">${d}</span></span><b class="small" style="display:block;margin-top:10px;text-align:left">${t}</b></button>`).join('')}</div>
    <div class="grid lg-2-1" style="margin-top:28px;align-items:start">
      <div><div class="web-head" style="text-align:left;margin-bottom:12px"><h2 style="font-size:1.4rem">Tanya jawab</h2></div>${faqList(FAQ)}</div>
      <aside class="stack" style="--gap:14px">
        <div class="card"><span class="icon-tile" style="background:#1FA855;color:#fff">${I('chat')}</span><h3 style="margin-top:10px">Tanya tim bantuan</h3><p class="small muted">Senin–Sabtu, 08.00–20.00 WIB. Biasanya dibalas dalam 1 jam.</p><button class="btn primary block" style="margin-top:12px" data-act="webWa">Chat WhatsApp</button></div>
        <div class="card"><div class="row between"><b class="small">Status layanan</b><span class="badge ok"><span class="dot"></span>Normal</span></div><p class="xs muted" style="margin-top:6px">status.cintamasjid.or.id</p></div>
        <div class="card accent"><b class="small">Butuh pendampingan langsung?</b><p class="xs muted" style="margin:4px 0 10px">Duta Wilayah kami siap membantu di beberapa kota.</p><button class="btn sm" data-act="toastOnly" data-msg="Permintaan pendampingan terkirim">Minta pendampingan</button></div>
      </aside>
    </div>
  </div>`;

/* ================= TENTANG ================= */
const ph = (t) => `<span class="placeholder">[${t}]</span>`;
CM.W.pages.tentang = () => `
  <section class="web-sub ornament"><div class="web-in"><div class="eyebrow" style="color:var(--accent)">Tentang kami</div><h1>Program amal untuk masjid Indonesia</h1><p>Cinta Masjid adalah program kontribusi Cinta Sedekah (cintasedekah.org) kepada umat Islam di Indonesia, dikelola oleh ${YAYASAN}. Tujuannya membantu pengurus masjid mengelola masjid dengan amanah, rapi, dan terbuka, tanpa biaya apa pun.</p></div></section>
  <div class="web-in" style="padding:24px 16px">
    <div class="grid lg-2" style="align-items:start">
      <div class="card"><h2 class="display" style="font-size:1.35rem">Visi</h2><p style="margin-top:8px">${TAGLINE}: masjid kembali menjadi pusat kehidupan jamaah, dengan pengelolaan yang amanah dan transparan.</p>
        <h2 class="display" style="font-size:1.35rem;margin-top:18px">Misi</h2><ul class="ticks" style="margin-top:8px">${['Menyediakan alat pengelolaan masjid yang gratis dan mudah dipakai pengurus', 'Mendorong laporan keuangan masjid yang terbuka bagi jamaah', 'Menjaga amanah data jamaah sesuai syariat dan UU Perlindungan Data Pribadi', 'Menghubungkan masjid dengan kebaikan: zakat, qurban, dan kepedulian sosial'].map((p) => `<li>${I('check', 16)}<span>${p}</span></li>`).join('')}</ul></div>
      <div class="stack" style="--gap:14px">
        <div class="card accent"><div class="eyebrow">Bagian dari Cinta Sedekah</div><p class="small" style="margin-top:6px">Seluruh biaya program ditanggung dari dana kontribusi ${CS} dan donatur. Masjid tidak dikenai biaya apa pun.</p><div style="margin-top:12px">${DUKUNG}</div></div>
        <div class="card"><h3>Legalitas</h3><div class="stack small" style="--gap:6px;margin-top:10px"><div class="row between"><span class="muted">Badan hukum</span><b>${YAYASAN}</b></div><div class="row between"><span class="muted">Akta pendirian</span>${ph('nomor & tanggal akta')}</div><div class="row between"><span class="muted">SK Kemenkumham</span>${ph('nomor SK')}</div><div class="row between"><span class="muted">Alamat</span>${ph('alamat kantor yayasan')}</div></div></div>
        <div class="card"><h3>Pengurus & penasihat syariah</h3><div class="grid cols-2" style="--gap:10px;margin-top:10px">${['Ketua Yayasan', 'Sekretaris', 'Bendahara', 'Penasihat Syariah'].map((r) => `<div class="row" style="--gap:10px"><span class="avatar sm" style="background:var(--surface-2)">${I('user', 14)}</span><div><div class="xs muted">${r}</div>${ph('nama')}</div></div>`).join('')}</div></div>
      </div>
    </div>
    <div class="grid sm-3" style="margin-top:16px">${[['shield', 'Dana tidak lewat kami', 'Semua infak, zakat, dan donasi jamaah masuk langsung ke rekening masjid.'], ['lock', 'Data milik masjid', 'Masjid adalah pemilik data warganya. Kami hanya memproses sesuai izin.'], ['file', 'Laporan dana terbuka', 'Sumber dan penggunaan dana program dipublikasikan setiap tahun.']].map(([ic, t, d]) => `<div class="card"><span class="icon-tile gold">${I(ic)}</span><h3 style="margin-top:10px">${t}</h3><p class="small muted">${d}</p></div>`).join('')}</div>
    <div class="card" style="margin-top:16px"><div class="row between wrap" style="--gap:10px"><div><h3>Laporan keuangan lembaga</h3><p class="small muted">Sumber dan penggunaan dana program Cinta Masjid.</p></div><span class="badge">${ph('laporan tahun pertama menyusul')}</span></div></div>
    <div class="card soft" style="margin-top:16px"><div class="row between wrap" style="--gap:10px"><div><h3>Ikut berkontribusi</h3><p class="small muted">Donatur, lembaga, ormas, dan relawan Duta Wilayah yang ingin ikut memakmurkan masjid.</p></div><div class="row wrap" style="--gap:8px">${DUKUNG}<button class="btn" data-act="toastOnly" data-msg="Formulir relawan Duta Wilayah (segera)">Jadi Duta Wilayah</button></div></div></div>
    <p class="xs muted" style="margin-top:12px">Teks dalam [kurung siku] perlu diisi dengan data resmi yayasan sebelum situs diterbitkan.</p>
  </div>`;

/* ================= KEBIJAKAN ================= */
const POLICIES = {
  privasi: ['Kebijakan privasi', [
    ['Siapa pemilik data', 'Masjid (DKM) adalah pemilik dan pengendali data warganya. Cinta Masjid hanya memproses data sesuai perintah masjid, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.'],
    ['Data yang kami kumpulkan', 'Nomor WhatsApp untuk masuk, data profil masjid, serta data yang dimasukkan pengurus. Kami mengumpulkan data seminimal mungkin.'],
    ['Yang tidak pernah kami lakukan', 'Menjual data, memasang iklan, atau membuka data warga, mustahik, penanya Tanya Ustadz, dan penerima bantuan untuk tim kami.'],
    ['Hak Anda', 'Anda bisa meminta melihat, memperbaiki, atau menghapus data Anda lewat pengurus masjid atau tim kami. Kami membantu meneruskannya ke masjid terkait.'],
    ['Keamanan', 'Data dienkripsi, akses pengurus dibatasi sesuai peran, dan setiap perubahan penting tercatat.'],
  ]],
  syarat: ['Syarat layanan', [
    ['Layanan', 'Cinta Masjid adalah program amal Cinta Sedekah yang menyediakan alat pengelolaan masjid secara gratis, tanpa fitur berbayar dan tanpa iklan.'],
    ['Domain', 'Domain milik masjid tetap milik masjid. Bantuan pengaturan dan pendampingan pembelian domain diberikan gratis; biaya domain dibayar langsung oleh masjid kepada penyedia domain.'],
    ['Dana', 'Cinta Masjid tidak menampung dana. Seluruh infak, zakat, dan donasi masuk langsung ke rekening atau QRIS masjid, dan menjadi tanggung jawab DKM.'],
    ['Tanggung jawab pengurus', 'DKM bertanggung jawab atas kebenaran data, laporan keuangan, dan konten yang dipublikasikan di situs masjid.'],
    ['Larangan', 'Dilarang memakai layanan untuk penipuan, penggalangan dana palsu, kampanye politik praktis atas nama masjid, atau konten yang melanggar hukum.'],
    ['Pengalihan akun', 'Saat kepengurusan berganti, akun masjid dialihkan dengan bukti SK kepengurusan yang baru.'],
  ]],
  pedoman: ['Pedoman komunitas', (CM.commSeed ? CM.commSeed().guideline : '').split('\n').filter((l) => /^\d\./.test(l)).map((l) => [l.replace(/^\d\.\s*/, '').split('.')[0], l.replace(/^\d\.\s*/, '')])],
};
CM.W.pages.kebijakan = (sub) => {
  const key = POLICIES[sub] ? sub : 'privasi';
  const [title, items] = POLICIES[key];
  return `<section class="web-sub ornament"><div class="web-in"><div class="eyebrow" style="color:var(--accent)">Kebijakan</div><h1>${title}</h1><p>Ringkasan dalam bahasa sehari-hari. Dokumen hukum lengkap disusun bersama penasihat hukum yayasan.</p></div></section>
  <div class="web-in web-narrow" style="padding:24px 16px">
    <nav class="chips" style="margin-bottom:18px">${Object.entries(POLICIES).map(([k, [t]]) => `<a class="chip ${k === key ? 'active' : ''}" href="#/kebijakan/${k}">${t}</a>`).join('')}</nav>
    <div class="stack" style="--gap:12px">${items.map(([h, p], i) => `<div class="card policy"><span class="step-n sm">${i + 1}</span><div><h3>${E(h)}</h3><p class="small" style="margin-top:4px">${E(p)}</p></div></div>`).join('')}</div>
    <p class="xs muted" style="margin-top:14px">Terakhir diperbarui: ${CM.tgl('2026-11-25')} · Pertanyaan: ${ph('email resmi yayasan')}</p>
  </div>`;
};

/* halaman klaim memakai kerangka situs utama */
CM.W.pages.klaim = () => CM.claimPage();
})();

/* Cinta Masjid — Admin: Aset, Komunikasi, Kepedulian, Pengurus, Pengaturan (Studio Tampilan) */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;
const listCard = (rows) => `<div class="card pad-0"><div class="list">${rows}</div></div>`;

/* ================= ASET & LAYANAN ================= */
CM.A.reg({
  id: 'aset', label: 'Aset & Layanan', icon: 'box', toggle: 'aset',
  tabs: [{ id: 'inventaris', label: 'Inventaris' }, { id: 'pinjam', label: 'Peminjaman' }, { id: 'booking', label: 'Pemesanan Ruang' }],
  render(tab) {
    if (tab === 'inventaris') return `${U.pageHead('Inventaris', 'Barang milik masjid, kondisi, dan lokasi penyimpanan.', `<button class="btn primary" data-act="toastOnly" data-msg="Form barang (simulasi)">${I('plus', 18)} Barang</button>`)}
      <div class="grid sm-2 lg-3">${S().assets.map((a) => `<div class="card"><div class="row" style="--gap:12px"><div class="media" style="width:56px;aspect-ratio:1;flex:none;border-radius:var(--r-sm)"></div><div class="grow" style="min-width:0"><div style="font-weight:700" class="truncate">${a.name}</div><div class="small muted">${a.loc}</div></div></div>
        <div class="row between small" style="margin-top:14px"><span>Jumlah <b>${a.qty}</b></span>${U.status(a.kondisi)}</div>
        ${a.loanable ? `<div class="row between small" style="margin-top:6px"><span class="muted">Tersedia dipinjam</span><b>${a.avail}</b></div>` : '<div class="small muted" style="margin-top:6px">Tidak dipinjamkan</div>'}</div>`).join('')}</div>`;
    if (tab === 'pinjam') return `${U.pageHead('Peminjaman', 'Jamaah mengajukan dari situs publik → admin menyetujui → status dipinjam/kembali, dengan pengingat jatuh tempo.')}
      ${listCard(S().loans.map((l) => `<div class="list-item" style="flex-wrap:wrap"><div class="icon-tile sm ${l.status === 'terlambat' ? 'bad' : 'ink'}">${I('box', 18)}</div><div class="grow" style="min-width:0"><div class="title">${l.item}</div><div class="meta">${E(l.who)} · ${CM.tgl(l.from, { short: true, year: false })}–${CM.tgl(l.to, { short: true, year: false })}</div></div>${U.status(l.status)}
        ${l.status === 'menunggu' ? `<div class="row" style="--gap:6px"><button class="btn sm" data-act="toastOnly" data-msg="Ditolak">Tolak</button><button class="btn sm primary" data-act="toastOnly" data-msg="Disetujui · peminjam dikabari via WA">Setujui</button></div>` : l.status !== 'kembali' ? `<button class="btn sm" data-act="toastOnly" data-msg="Ditandai sudah kembali">Tandai kembali</button>` : ''}</div>`).join(''))}`;
    const booked = S().bookings.map((b) => b.date);
    const days = []; for (let i = 0; i < 35; i++) { const d = new Date(2026, 10, 1 + i - 0); days.push(d); }
    const first = new Date(2026, 10, 1).getDay();
    return `${U.pageHead('Pemesanan ruang', 'Kalender aula & ruang rapat. Sistem mencegah jadwal bentrok; biaya sewa opsional masuk ke kas.', `<button class="btn primary" data-act="toastOnly" data-msg="Form pemesanan (simulasi)">${I('plus', 18)} Pesan ruang</button>`)}
      <div class="grid lg-2">
        <div class="card"><div class="card-head"><h3>November 2026</h3><div class="row" style="--gap:4px"><button class="btn sm icon">${I('left', 16)}</button><button class="btn sm icon">${I('right', 16)}</button></div></div>
          <div class="cal">${['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => `<div class="dow">${d}</div>`).join('')}${Array.from({ length: first }, () => '<div></div>').join('')}${Array.from({ length: 30 }, (_, i) => { const iso = `2026-11-${String(i + 1).padStart(2, '0')}`; return `<div class="d ${i + 1 === 25 ? 'today' : ''} ${booked.includes(iso) ? 'booked full' : ''}">${i + 1}</div>`; }).join('')}</div>
          <div class="legend" style="margin-top:12px"><span><i style="background:var(--accent)"></i>Sudah dipesan</span><span><i style="background:transparent;border:1.5px solid var(--brand)"></i>Hari ini</span></div>
        </div>
        ${listCard(S().bookings.map((b) => `<div class="list-item"><div class="icon-tile sm gold">${I('calendar', 18)}</div><div class="grow" style="min-width:0"><div class="title truncate">${E(b.title)}</div><div class="meta">${b.room} · ${CM.tgl(b.date, { short: true, year: false })} · ${b.time}${b.fee ? ' · ' + CM.rp(b.fee) : ''}</div></div>${U.status(b.status)}</div>`).join(''))}
      </div>`;
  },
});

/* ================= KOMUNIKASI ================= */
CM.A.reg({
  id: 'komunikasi', label: 'Komunikasi', icon: 'megaphone', toggle: 'komunikasi',
  tabs: [{ id: 'pengumuman', label: 'Pengumuman' }, { id: 'broadcast', label: 'Siaran WA' }, { id: 'duka', label: 'Berita Duka' }, { id: 'hadits', label: 'Hadits Harian' }, { id: 'tanya', label: 'Tanya Ustadz' }],
  render(tab) { return K[tab](); },
});
const chIcon = { situs: ['globe', 'Situs'], tv: ['tv', 'TV'], push: ['bell', 'Notifikasi HP'], wa: ['chat', 'WA'] };
const K = {
  pengumuman() {
    return `${U.pageHead('Pengumuman', 'Satu kali tulis, tampil di situs, Mode TV, dan notifikasi di HP jamaah.', `<button class="btn primary" data-act="newAnn">${I('plus', 18)} Pengumuman</button>`)}
    <div class="stack">${S().announcements.map((a) => `<div class="card"><div class="row between" style="align-items:flex-start"><div class="grow"><div class="row" style="--gap:8px">${a.pinned ? U.badge('Disematkan', 'gold') : ''}<span class="xs muted">${CM.tgl(a.date)}</span></div><div style="font-weight:700;font-size:1.05rem;margin-top:4px">${E(a.title)}</div><div class="small muted" style="margin-top:2px">${E(a.body)}</div></div><button class="icon-btn" aria-label="Opsi">${I('dots')}</button></div>
      <div class="row wrap" style="--gap:6px;margin-top:12px">${a.channels.map((c) => `<span class="badge brand">${I(chIcon[c][0], 13)} ${chIcon[c][1]}</span>`).join('')}</div></div>`).join('')}</div>`;
  },
  broadcast() {
    return `${U.pageHead('Siaran WhatsApp', 'Kirim pesan ke banyak jamaah sekaligus lewat WhatsApp resmi. Ada jatah gratis tiap bulan; bila kurang, masjid bisa mengajukan tambahan tanpa biaya.', U.badge('Fase 3', 'gold'))}
    <div class="grid lg-2-1">
      <div class="card"><div class="stack">
        ${U.field('Segmen penerima', `<div class="chips" style="flex-wrap:wrap">${['Semua jamaah · 1.104', 'RT 03 · 182', 'Label: lansia · 62', 'Label: relawan · 27', 'Pengurus · 14'].map((s, i) => `<button class="chip ${i === 0 ? 'active' : ''}" type="button">${s}</button>`).join('')}</div>`)}
        ${U.field('Contoh pesan', U.select('tpl', ['Pengumuman kegiatan', 'Pengingat kajian', 'Laporan kas bulanan', 'Undangan rapat']))}
        ${U.field('Pesan', '<textarea class="textarea">Assalamu\'alaikum warga RW 07. Kerja bakti bersih masjid Sabtu, 28 November pukul 08.00. Jazakumullah khairan.</textarea>')}
        <div class="row" style="--gap:10px"><button class="btn">${I('clock', 18)} Jadwalkan</button><button class="btn primary grow" data-act="toastOnly" data-msg="Pesan siaran dikirim ke 1.104 jamaah">${I('send', 18)} Kirim sekarang</button></div>
      </div></div>
      <div class="stack">
        <div class="card"><div class="label">Jatah gratis November</div><div class="display num" style="font-size:1.8rem;margin:4px 0 8px">1.640 <span class="small muted" style="font-family:var(--font-body)">/ 2.000 pesan</span></div>${U.progress(82, 'gold')}<button class="btn sm block" style="margin-top:12px" data-act="toastOnly" data-msg="Pengajuan kuota tambahan terkirim · ditinjau tim, tanpa biaya">Ajukan tambahan (gratis)</button></div>
        ${listCard(['Laporan kas Oktober · 1.098 terkirim', 'Pengingat qurban · 1.102 terkirim', 'Berita duka Bpk. Darsono · 1.104 terkirim'].map((t) => `<div class="list-item"><span class="icon-tile sm ok">${I('check', 16)}</span><span class="grow small">${t}</span></div>`).join(''))}
      </div>
    </div>`;
  },
  duka() {
    return `${U.pageHead('Berita duka', 'Isi formulir, lalu sekali klik untuk dikirim lewat WA dan tampil di Mode TV.')}
    <div class="grid lg-2">
      <div class="card"><div class="stack">
        <div class="seg block"><button class="active" type="button">Almarhum</button><button type="button">Almarhumah</button></div>
        ${U.field('Nama', '<input class="input" name="nm" value="Bpk. Darsono bin Karta">')}
        <div class="grid cols-2" style="--gap:12px">${U.field('Wafat', '<input class="input" value="Selasa, 24 Nov 2026 · 21.10">')}${U.field('Usia', '<input class="input" value="72 tahun">')}</div>
        ${U.field('Rumah duka', '<input class="input" value="Jl. Cempaka Gg. 4 No. 7, RT 04">')}
        <div class="grid cols-2" style="--gap:12px">${U.field('Shalat jenazah', "<input class='input' value=\"Ba'da Dzuhur, Masjid Al-Ikhlas\">")}${U.field('Pemakaman', '<input class="input" value="TPU Sirnaraga, 13.30">')}</div>
        <div class="row" style="--gap:10px"><label class="check"><input type="checkbox" checked><span class="small">Kirim lewat WA</span></label><label class="check"><input type="checkbox" checked><span class="small">Tampil di Mode TV</span></label></div>
        <button class="btn primary" data-act="toastOnly" data-msg="Berita duka disiarkan">${I('send', 18)} Siarkan</button>
      </div></div>
      <div class="card" style="background:#1d2320;color:#eee;text-align:center;padding:28px;border:0">
        <div class="arab" style="font-size:1.5rem;color:var(--accent)">إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</div>
        <div class="small" style="opacity:.7;margin:6px 0 16px">Telah berpulang ke rahmatullah</div>
        <div class="display" style="font-size:1.6rem">Bpk. Darsono bin Karta</div>
        <div class="small" style="opacity:.7">72 tahun · Selasa, 24 November 2026</div>
        <hr class="hairline" style="margin:18px 0">
        <div class="small" style="line-height:1.9">Rumah duka: Jl. Cempaka Gg. 4 No. 7, RT 04<br>Shalat jenazah: Ba'da Dzuhur, Masjid Al-Ikhlas<br>Pemakaman: TPU Sirnaraga, 13.30</div>
        <div class="xs" style="opacity:.5;margin-top:16px">Pratinjau tampilan TV & pesan WA</div>
      </div>
    </div>`;
  },
  hadits() {
    return `${U.pageHead('Hadits harian', 'Bank konten dikelola tim Cinta Masjid, lengkap dengan sumber dan derajat. Pilih rotasi otomatis atau jadwalkan sendiri.', `<div class="seg"><button class="active">Rotasi otomatis</button><button>Jadwal manual</button></div>`)}
    <div class="stack">${S().hadith.map((h, i) => `<div class="card hadith ${i === new Date().getDate() % S().hadith.length ? 'soft' : ''}"><div class="row between" style="margin-bottom:6px"><span class="xs muted">${i === new Date().getDate() % S().hadith.length ? '<b style="color:var(--brand)">Tayang hari ini</b>' : 'Tayang ' + CM.tgl(new Date(Date.UTC(2026, 10, 26 + i)).toISOString().slice(0, 10), { short: true, year: false })}</span>${U.badge(h.grade, 'ok')}</div><div class="arab">${h.ar}</div><blockquote>“${E(h.id)}”</blockquote><cite>${h.src}</cite></div>`).join('')}</div>`;
  },
  tanya() {
    return `${U.pageHead('Tanya Ustadz', 'Pertanyaan anonim dari jamaah. Moderasi → teruskan ke ustadz → jawaban (jika diizinkan) menjadi FAQ.', U.badge('Fase 2', 'gold'))}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">${U.stat({ label: 'Baru', value: '2', icon: 'chat', tone: 'warn' })}${U.stat({ label: 'Diteruskan', value: '1', icon: 'send', tone: '' })}${U.stat({ label: 'Dijawab bulan ini', value: '17', icon: 'check', tone: 'ok' })}${U.stat({ label: 'FAQ publik', value: '42', icon: 'book', tone: 'gold' })}</div>
    <div class="stack">${S().questions.map((q) => `<div class="card" ${q.flag ? 'style="border-color:var(--bad)"' : ''}>
      <div class="row between wrap" style="--gap:8px"><div class="row" style="--gap:8px"><span class="kbd">${q.code}</span>${U.badge(q.cat, 'brand')}${q.faq ? U.badge('Boleh jadi FAQ', '') : ''}${q.flag ? U.badge('Perlu tindak lanjut', 'bad') : ''}</div>${U.status(q.status)}</div>
      <p style="margin:10px 0 4px;font-size:1.02rem">${E(q.body)}</p>
      <div class="xs muted">${CM.tgl(q.date)} · identitas penanya disembunyikan${q.to ? ' · ke ' + q.to : ''}</div>
      ${q.flag ? `<div class="notice bad" style="margin-top:10px">${I('shield', 18)}<span>Menyangkut keselamatan. Tindak lanjuti dengan rujukan layanan yang sesuai (mis. UPTD PPA / SAPA 129), jangan dijawab di FAQ.</span></div>` : ''}
      ${q.status === 'diterima' && !q.flag ? `<div class="row wrap" style="--gap:8px;margin-top:12px"><button class="btn sm danger" data-act="toastOnly" data-msg="Ditolak sebagai spam">Tolak</button><button class="btn sm">Gabungkan duplikat</button><button class="btn sm primary" data-act="toastOnly" data-msg="Diteruskan ke ustadz via WA">${I('send', 16)} Teruskan ke ustadz</button></div>` : ''}
    </div>`).join('')}</div>`;
  },
};
CM.act.newAnn = () => U.sheet({
  title: 'Pengumuman baru',
  body: `<div class="stack">${U.field('Judul', '<input class="input" name="title" placeholder="mis. Kerja bakti Sabtu pagi">')}${U.field('Isi', '<textarea class="textarea" name="body"></textarea>')}
    <div class="field"><label>Tampilkan di</label><div class="grid cols-2" style="--gap:8px">${Object.entries(chIcon).map(([k, [ic, l]]) => `<label class="option-card"><input type="checkbox" name="ch_${k}" ${k !== 'wa' ? 'checked' : ''}><div class="row" style="--gap:8px">${I(ic, 18)}<b class="small">${l}</b></div></label>`).join('')}</div></div></div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveAnn">Terbitkan</button>`,
});
CM.act.saveAnn = () => {
  const d = U.formData(document.querySelector('.sheet'));
  if (!d.title) return;
  S().announcements.unshift({ id: 'p' + CM.uid(), title: d.title, body: d.body, date: '2026-11-25', channels: Object.keys(chIcon).filter((k) => d['ch_' + k]) });
  CM.save(); U.close(); CM.render(); U.toast('Pengumuman terbit di situs & TV');
};

/* ================= KEPEDULIAN UMAT ================= */
CM.A.reg({
  id: 'kepedulian', label: 'Kepedulian Umat', icon: 'basket', toggle: 'kepedulian',
  tabs: [{ id: 'stok', label: 'Lumbung Pangan' }, { id: 'penerima', label: 'Penerima' }, { id: 'salur', label: 'Penyaluran' }],
  render(tab) {
    const L = S().lumbung;
    if (tab === 'stok') return `${U.pageHead('Lumbung Pangan Digital', 'Stok sembako dari donasi warga. Situs publik hanya menampilkan kebutuhan stok, tanpa data penerima.', `<button class="btn" data-act="toastOnly" data-msg="Pengecekan stok dimulai">${I('list', 18)} Cek stok</button><button class="btn primary" data-act="stockIn">${I('plus', 18)} Stok masuk</button>`)}
      <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Keluarga terlayani November', value: '29', sub: 'agregat · 2 putaran', icon: 'users', tone: 'ok' })}${U.stat({ label: 'Saldo kas Lumbung', value: CM.rp(CM.saldo('lumbung')), icon: 'wallet', tone: 'gold' })}${U.stat({ label: 'Paket standar', value: L.paket.name, sub: L.paket.isi, icon: 'gift' })}</div>
      <div class="grid lg-2-1">
        <div class="card"><div class="card-head"><h3>Stok saat ini</h3><span class="small muted">Stok tidak boleh negatif</span></div>
          <div class="stack" style="--gap:16px">${L.items.map((i) => `<div><div class="row between"><b>${i.name}</b><span class="small">${i.stock < i.min ? U.status('menipis') : ''} <b class="num">${i.stock}</b> <span class="muted">/ ${i.need} ${i.unit}</span></span></div><div style="margin-top:6px">${U.progress((i.stock / i.need) * 100, i.stock < i.min ? 'gold' : '')}</div><div class="xs muted" style="margin-top:3px">Ambang peringatan ${i.min} ${i.unit}</div></div>`).join('')}</div>
        </div>
        <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Pergerakan stok</h3></div><div class="list" style="margin-top:6px">${L.moves.map((m) => `<div class="list-item"><span class="icon-tile sm ${m.dir === 'masuk' ? 'ok' : 'gold'}">${I(m.dir === 'masuk' ? 'in' : 'out', 16)}</span><div class="grow" style="min-width:0"><div class="title small">${m.dir === 'masuk' ? '+' : '−'}${m.qty} ${m.item}</div><div class="meta truncate">${E(m.src)} · ${CM.tgl(m.date, { short: true, year: false })}</div></div></div>`).join('')}</div></div>
      </div>`;
    if (tab === 'penerima') return `${U.pageHead('Penerima', `Diambil dari warga berlabel dhuafa. Kuota: 1 ${L.paket.name.toLowerCase()} per ${L.paket.per}. QR berisi token acak, bukan data pribadi.`, `<button class="btn primary" data-act="toastOnly" data-msg="Pilih dari data warga (simulasi)">${I('plus', 18)} Penerima</button>`)}
      ${listCard(L.beneficiaries.map((b) => `<div class="list-item" style="flex-wrap:wrap">${U.avatar(b.name.replace('Kel. ', ''))}<div class="grow" style="min-width:0"><div class="title">${b.name}</div><div class="meta">RT ${b.rt} · terakhir ambil ${CM.tgl(b.last, { short: true, year: false })}</div></div>${b.ok ? U.badge('Kuota tersedia', 'ok') : U.badge('Sudah ambil periode ini', '')}<button class="btn sm" data-act="benQR" data-t="${b.token}" data-n="${b.name}">${I('qr', 16)} QR</button></div>`).join(''))}`;
    return `${U.pageHead('Penyaluran', 'Relawan memindai QR penerima dari HP. Hasil scan saat tidak ada sinyal disimpan, lalu dikirim begitu ada internet.')}
      <div class="grid lg-2">
        <div class="card" style="text-align:center">
          <div class="scanner"><div class="frame"></div><div class="laser"></div></div>
          <div class="row" style="justify-content:center;--gap:8px;margin-top:14px"><button class="btn primary" data-act="scan" data-t="LB-1XQ7">${I('scan', 18)} Simulasi scan (kuota ada)</button><button class="btn" data-act="scan" data-t="LB-93KD">Scan (sudah ambil)</button></div>
          <div class="row small muted" style="justify-content:center;margin-top:10px;--gap:6px">${I('wifi', 16)} Bisa dipakai tanpa sinyal · 0 data belum terkirim</div>
        </div>
        <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Riwayat penyaluran (agregat)</h3></div><div class="list" style="margin-top:6px">${[['15 Nov', 14], ['1 Nov', 15], ['18 Okt', 13], ['4 Okt', 12]].map(([d, n]) => `<div class="list-item"><span class="icon-tile sm gold">${I('gift', 16)}</span><span class="grow">Putaran ${d}</span><b>${n} keluarga</b></div>`).join('')}</div></div>
      </div>`;
  },
});
CM.act.benQR = (el) => U.sheet({ title: 'Kartu QR penerima', body: `<div style="text-align:center" class="stack"><div class="card brand ornament" style="--orn-color:#fff;--orn-opacity:.07;max-width:320px;margin:0 auto;text-align:center"><div class="eyebrow" style="color:var(--accent)">Lumbung Pangan</div><div class="display" style="font-size:1.2rem">${E(S().profile.name)}</div><div class="qr" style="margin:14px auto">${U.qr(el.dataset.t, 150)}</div><div class="mono small">${el.dataset.t}</div></div><p class="small muted">Kartu tidak memuat nama atau alamat. Token bisa dicabut dan dibuat ulang.</p></div>`, foot: `<button class="btn" data-act="toastOnly" data-msg="Token dibuat ulang · QR lama tidak berlaku">${I('refresh', 18)} Buat ulang</button><button class="btn primary" data-act="closeToast" data-msg="Dikirim via WA">${I('send', 18)} Kirim WA</button>` });
CM.act.scan = (el) => {
  const b = S().lumbung.beneficiaries.find((x) => x.token === el.dataset.t);
  U.sheet({
    title: b.ok ? 'Kuota tersedia' : 'Kuota sudah dipakai',
    body: b.ok ? `<div class="stack" style="text-align:center"><div class="icon-tile lg ok" style="margin:0 auto">${I('check', 28)}</div><div class="display" style="font-size:1.4rem">${b.name}</div><div class="card soft">${S().lumbung.paket.isi}</div><p class="small muted">Konfirmasi untuk mencatat penyaluran dan mengurangi stok.</p></div>`
      : `<div class="stack" style="text-align:center"><div class="icon-tile lg bad" style="margin:0 auto">${I('x', 28)}</div><div class="display" style="font-size:1.4rem">${b.name}</div><p class="muted">Sudah mengambil pada ${CM.tgl(b.last)}. Periode berikutnya mulai ${CM.tgl('2026-11-29')}.</p>${U.field('Tetap berikan, dengan alasan (tercatat di log)', '<input class="input" placeholder="mis. anggota keluarga sakit">')}</div>`,
    foot: b.ok ? `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Penyaluran tercatat · stok dikurangi">Serahkan paket</button>` : `<button class="btn" data-act="close">Tutup</button><button class="btn" data-act="closeToast" data-msg="Pengecualian tercatat di Log Aktivitas">Tetap berikan</button>`,
  });
};
CM.act.stockIn = () => U.sheet({ title: 'Stok masuk', body: `<div class="stack"><div class="seg block"><button class="active" type="button">Donasi barang</button><button type="button">Pembelian dari kas</button></div>${U.field('Barang', U.select('i', S().lumbung.items.map((i) => i.name)))}${U.field('Jumlah', '<input class="input" type="number" value="10">')}${U.field('Dari', '<input class="input" placeholder="Nama donatur (opsional)">')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Stok bertambah">Simpan</button>` });

/* ================= PENGURUS ================= */
CM.A.reg({
  id: 'pengurus', label: 'Pengurus', icon: 'shield',
  tabs: [{ id: 'struktur', label: 'Struktur & Periode' }, { id: 'anggota', label: 'Anggota & Peran' }, { id: 'log', label: 'Log Aktivitas' }],
  render(tab) {
    const P = S().pengurus;
    if (tab === 'struktur') return `${U.pageHead('Struktur DKM', `Periode ${P.periode}. Periode lama diarsipkan.`, `<select class="select" style="width:auto"><option>${P.periode} (aktif)</option>${P.arsip.map((a) => `<option>${a} (arsip)</option>`).join('')}</select>`)}
      <div class="card brand ornament" style="--orn-color:#fff;--orn-opacity:.06;text-align:center;max-width:360px;margin:0 auto 16px"><span class="avatar lg" style="margin:0 auto 8px;background:var(--accent);color:var(--brand-deep)">HS</span><div class="display" style="font-size:1.3rem">${P.struktur[0].name}</div><div class="muted small">${P.struktur[0].jabatan}</div></div>
      <div class="grid sm-2 lg-4">${P.struktur.slice(1).map((s) => `<div class="card" style="text-align:center">${U.avatar(s.name, 'lg').replace('class="avatar lg"', 'class="avatar lg" style="margin:0 auto 8px"')}<div style="font-weight:700">${E(s.name)}</div><div class="small muted">${s.jabatan}</div></div>`).join('')}</div>`;
    if (tab === 'anggota') {
      const mods = ['Keuangan', 'ZIS & Qurban', 'Lumbung', 'Warga', 'Ibadah', 'Komunikasi', 'Pengaturan'];
      const m = { Ketua: ['Kelola + setujui', 'Kelola', 'Kelola', 'Kelola', 'Kelola', 'Kelola', 'Kelola'], Bendahara: ['Kelola', 'Kelola', 'Kelola', 'Lihat', 'Lihat', '–', '–'], Sekretaris: ['Lihat', 'Lihat', 'Lihat', 'Kelola', 'Kelola', 'Kelola', 'Lihat'], Bidang: ['Ajukan', 'Sesuai bidang', 'Kelola (sosial)', 'Lihat', 'Kelola', 'Ajukan', '–'], Ustadz: ['–', '–', '–', '–', 'Unggah khutbah', 'Jawab', '–'] };
      return `${U.pageHead('Anggota & peran', 'Hak akses diatur per orang, per masjid, dan per peran. Ketua & Bendahara wajib verifikasi 2 langkah lewat kode OTP WA.', `<button class="btn primary" data-act="invite">${I('plus', 18)} Undang via WA</button>`)}
      ${listCard(P.struktur.map((s) => `<div class="list-item">${U.avatar(s.name)}<div class="grow" style="min-width:0"><div class="title truncate">${E(s.name)}</div><div class="meta">${s.jabatan}</div></div>${U.badge(s.role, s.role === 'Ketua' ? 'gold' : 'brand')}${['Ketua', 'Bendahara'].includes(s.role) ? `<span class="hide-mobile" title="Verifikasi 2 langkah aktif" style="color:var(--ok)">${I('lock', 16)}</span>` : ''}<button class="icon-btn" aria-label="Opsi">${I('dots')}</button></div>`).join(''))}
      <div class="section-title" style="margin-top:22px">Tabel hak akses</div>
      <div class="card pad-0"><div class="table-wrap"><table class="table perm"><thead><tr><th>Modul</th>${Object.keys(m).map((r) => `<th style="text-align:center">${r}</th>`).join('')}</tr></thead><tbody>${mods.map((md, i) => `<tr><td>${md}</td>${Object.values(m).map((v) => `<td>${v[i] === '–' ? '<span class="faint">–</span>' : v[i].startsWith('Kelola') ? `<span class="badge brand">${v[i]}</span>` : `<span class="badge">${v[i]}</span>`}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    }
    return `${U.pageHead('Log aktivitas', 'Siapa, apa, kapan — tidak bisa diubah untuk modul keuangan, ZIS, lumbung, dan data warga.', `<button class="btn" data-act="exportX">${I('download', 18)} Ekspor</button>`)}
      ${listCard(S().logs.map((l) => `<div class="list-item" style="align-items:flex-start">${U.avatar(l.who, 'sm')}<div class="grow" style="min-width:0"><div class="small"><b>${E(l.who)}</b> ${E(l.what)}</div><div class="meta">${l.at} · ${l.mod}</div></div>${U.badge(l.mod, l.mod === 'Keuangan' ? 'brand' : l.mod === 'Lumbung' ? 'gold' : '')}</div>`).join(''))}`;
  },
});
CM.act.invite = () => U.sheet({ title: 'Undang pengurus', body: `<div class="stack">${U.field('Nomor WhatsApp', '<input class="input" inputmode="tel" placeholder="08xx xxxx xxxx">', 'Mereka cukup masuk dengan kode OTP WhatsApp, tanpa kata sandi.')}${U.field('Peran', U.select('r', ['Bendahara', 'Sekretaris', 'Pengurus Bidang', 'Ustadz', 'Petugas']))}${U.field('Jabatan', '<input class="input" placeholder="mis. Bidang Pemuda">')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Undangan terkirim via WhatsApp">${I('send', 18)} Kirim undangan</button>` });

/* ================= PENGATURAN ================= */
CM.A.reg({
  id: 'pengaturan', label: 'Pengaturan', icon: 'settings',
  tabs: [{ id: 'tampilan', label: 'Tampilan & Identitas' }, { id: 'profil', label: 'Profil' }, { id: 'domain', label: 'Domain' }, { id: 'rekening', label: 'Rekening & QRIS' }, { id: 'modul', label: 'Modul' }],
  render(tab) { return G[tab](); },
  mount(tab) { if (tab === 'tampilan') G.mountStudio(); },
});
const swatch = (p) => `<div class="swatch"><i style="background:${p.brand}"></i><i style="background:${p.accent}"></i><i style="background:${p.bg}"></i></div>`;
const G = {
  tampilan() {
    const t = S().theme, p = S().profile;
    const opt = (name, val, cur, inner) => `<label class="option-card"><input type="radio" name="${name}" value="${val}" ${val === cur ? 'checked' : ''} data-theme="${name}">${inner}</label>`;
    const ratio = CM.contrast(t.brand, '#ffffff');
    return `${U.pageHead('Atur tampilan', 'Jadikan Cinta Masjid terasa milik masjid sendiri. Perubahan langsung berlaku di panel admin, situs jamaah, dan Mode TV.', `<button class="btn" data-act="resetTheme">${I('refresh', 18)} Kembalikan awal</button><a class="btn primary" href="#/situs" >${I('external', 18)} Lihat situs</a>`, 'Tampil atas nama masjid')}
    <div class="grid lg-2" style="align-items:start">
      <div class="stack" id="studio">
        <div class="card"><div class="card-head"><h3>Logo & nama</h3></div>
          <div class="row" style="--gap:14px;align-items:center">
            <label style="cursor:pointer;flex:none"><input type="file" accept="image/*" hidden data-act="logo">
              ${p.logoImg ? `<img src="${p.logoImg}" alt="Logo" style="width:72px;height:72px;border-radius:var(--r-sm);object-fit:cover;border:1px solid var(--line)">` : `<span class="icon-tile lg" style="width:72px;height:72px">${I('upload', 24)}</span>`}
            </label>
            <div class="grow stack" style="--gap:8px">
              <input class="input" value="${E(p.name)}" data-profile="name" aria-label="Nama masjid">
              <div class="row" style="--gap:8px"><span class="xs muted grow">PNG/SVG persegi, latar transparan. Tanpa logo, nama tampil sebagai teks.</span>${p.logoImg ? '<button class="btn sm ghost danger" data-act="rmLogo">Hapus logo</button>' : ''}</div>
            </div>
          </div>
        </div>

        <div class="card"><div class="card-head"><h3>Palet warna</h3>${U.badge('Bawaan: Zamrud & Emas', 'gold')}</div>
          <div class="grid cols-2 sm-3" style="--gap:10px">${CM.presets.map((pr) => opt('preset', pr.id, t.preset, `<div>${swatch(pr)}<div class="small" style="font-weight:600;margin-top:8px">${pr.name}</div></div>`)).join('')}</div>
          <hr class="hairline" style="margin:18px 0">
          <div class="label" style="margin-bottom:10px">Warna kustom</div>
          <div class="grid sm-3" style="--gap:12px">
            ${[['brand', 'Utama'], ['accent', 'Aksen'], ['bg', 'Latar']].map(([k, l]) => `<label class="row" style="--gap:10px"><input type="color" class="color-input" value="${t[k]}" data-color="${k}"><span><span class="small" style="font-weight:600;display:block">${l}</span><span class="xs muted mono" data-hex="${k}">${t[k].toUpperCase()}</span></span></label>`).join('')}
          </div>
          <div class="notice ${ratio >= 4.5 ? 'ok' : ratio >= 3 ? 'warn' : 'bad'}" style="margin-top:14px" id="contrastNote">${I(ratio >= 4.5 ? 'check' : 'alert', 18)}<span>Kontras teks di atas warna utama ${ratio.toFixed(1)}:1 — ${ratio >= 4.5 ? 'mudah dibaca, nyaman untuk lansia' : ratio >= 3 ? 'cukup untuk teks besar saja' : 'terlalu terang, sistem otomatis memakai teks gelap'}</span></div>
        </div>

        <div class="card"><div class="card-head"><h3>Jenis huruf</h3></div>
          <div class="grid sm-3" style="--gap:10px">${Object.entries(CM.fonts).map(([k, f]) => opt('font', k, t.font, `<div><div style="font-family:${f.display.replace(/"/g, "'")};font-size:1.5rem;font-weight:600;line-height:1.1">Aa</div><div class="small" style="font-weight:600;margin-top:6px">${f.label}</div><div class="xs muted">${f.desc}</div></div>`)).join('')}</div>
        </div>

        <div class="card"><div class="card-head"><h3>Tata letak situs jamaah</h3></div>
          <div class="grid sm-3" style="--gap:10px">${Object.entries(CM.layouts).map(([k, l]) => opt('layout', k, t.layout, `<div>${G.wire(k)}<div class="small" style="font-weight:600;margin-top:8px">${l.label}</div><div class="xs muted">${l.desc}</div></div>`)).join('')}</div>
          <div class="grid sm-2" style="--gap:16px;margin-top:16px">
            <div class="field"><label>Bentuk sudut</label><div class="seg block">${Object.entries(CM.radii).map(([k, r]) => `<button type="button" class="${t.radius === k ? 'active' : ''}" data-act="radius" data-v="${k}">${r.label}</button>`).join('')}</div></div>
            <div class="field"><label>Ornamen geometri Islami</label><label class="row card" style="padding:8px 14px;min-height:46px;--gap:10px;box-shadow:none"><span class="grow small">${t.ornament ? 'Ditampilkan' : 'Disembunyikan'}</span>${U.switch('', t.ornament, 'ornament')}</label></div>
          </div>
        </div>
      </div>

      <div style="position:sticky;top:90px" class="stack">
        <div class="row between"><div class="label">Pratinjau langsung · ${E(CM.siteUrl())}</div><div class="seg" id="pvSeg"><button class="active" data-act="pv" data-v="beranda">Beranda</button><button data-act="pv" data-v="donasi">Donasi</button><button data-act="pv" data-v="tv">TV</button></div></div>
        <div id="preview"></div>
      </div>
    </div>`;
  },
  wire(k) {
    const b = 'var(--brand)', l = 'color-mix(in oklab,var(--ink) 12%,transparent)';
    const box = (inner) => `<div style="aspect-ratio:1.25;border-radius:var(--r-xs);border:1px solid var(--line);background:var(--bg);padding:6px;display:flex;flex-direction:column;gap:4px">${inner}</div>`;
    if (k === 'klasik') return box(`<div style="flex:1.3;border-radius:4px;background:${b};display:grid;place-items:center"><div style="width:30%;height:60%;border:1.5px solid var(--accent);border-radius:20px 20px 0 0;opacity:.8"></div></div><div style="height:6px;background:${l};border-radius:3px"></div><div style="height:6px;width:70%;background:${l};border-radius:3px"></div>`);
    if (k === 'modern') return box(`<div style="flex:1.3;border-radius:4px;border:1px solid ${l};display:flex;overflow:hidden"><div style="flex:1;padding:4px"><div style="height:5px;width:80%;background:${l};border-radius:3px"></div><div style="height:9px;width:60%;background:${b};border-radius:3px;margin-top:4px"></div></div><div style="width:40%;background:${b};border-radius:50% 0 0 50%"></div></div><div style="display:flex;gap:4px;flex:1"><div style="flex:1;background:${l};border-radius:3px"></div><div style="flex:1;background:${l};border-radius:3px"></div></div>`);
    return box(`<div style="height:24%;border-radius:4px;background:${b}"></div>${`<div style="height:6px;background:${l};border-radius:3px"></div>`.repeat(4)}`);
  },
  renderPreview(which = G.pv || 'beranda') {
    const el = document.getElementById('preview'); if (!el) return;
    if (which === 'tv') { el.innerHTML = `<div style="aspect-ratio:16/9;border-radius:var(--radius);overflow:hidden;position:relative;border:8px solid #111;box-shadow:var(--shadow-lg)">${CM.TV.html(true)}</div><a class="btn block" style="margin-top:12px" href="#/tv" target="_blank">${I('tv', 18)} Buka Mode TV layar penuh</a>`; return; }
    el.innerHTML = `<div class="device"><div class="device-screen">${CM.P.embed(which)}</div></div>`;
  },
  mountStudio() {
    G.renderPreview();
    const root = document.getElementById('studio');
    root.addEventListener('input', (e) => {
      const c = e.target.dataset.color;
      if (c) { CM.setTheme({ [c]: e.target.value, preset: 'kustom' }); root.querySelector(`[data-hex="${c}"]`).textContent = e.target.value.toUpperCase(); root.querySelectorAll('input[name=preset]').forEach((r) => (r.checked = false)); G.updateContrast(); }
      if (e.target.dataset.profile) { S().profile[e.target.dataset.profile] = e.target.value; CM.save(); G.renderPreview(); }
    });
    root.addEventListener('change', (e) => {
      const k = e.target.dataset.theme; if (!k) return;
      if (k === 'preset') { const pr = CM.presets.find((p) => p.id === e.target.value); CM.setTheme({ preset: pr.id, brand: pr.brand, accent: pr.accent, bg: pr.bg, ink: pr.ink }); root.querySelectorAll('[data-color]').forEach((i) => { i.value = pr[i.dataset.color]; root.querySelector(`[data-hex="${i.dataset.color}"]`).textContent = pr[i.dataset.color].toUpperCase(); }); G.updateContrast(); }
      else { CM.setTheme({ [k]: e.target.value }); }
      G.renderPreview();
    });
  },
  updateContrast() {
    const r = CM.contrast(S().theme.brand, '#ffffff'), n = document.getElementById('contrastNote'); if (!n) return;
    n.className = `notice ${r >= 4.5 ? 'ok' : r >= 3 ? 'warn' : 'bad'}`;
    n.innerHTML = `${I(r >= 4.5 ? 'check' : 'alert', 18)}<span>Kontras teks di atas warna utama ${r.toFixed(1)}:1 — ${r >= 4.5 ? 'mudah dibaca, nyaman untuk lansia' : r >= 3 ? 'cukup untuk teks besar saja' : 'terlalu terang, sistem otomatis memakai teks gelap'}</span>`;
  },
  profil() {
    const p = S().profile;
    return `${U.pageHead('Profil masjid', 'Tampil di halaman Profil situs jamaah.')}
    <div class="card" style="max-width:760px"><form class="stack" id="profForm" onsubmit="return false">
      <div class="grid sm-2" style="--gap:14px">${U.field('Nama masjid', U.input('name', p.name))}${U.field('Nama singkat', U.input('short', p.short))}</div>
      ${U.field('Tagline', U.input('tagline', p.tagline))}
      ${U.field('Alamat', U.input('address', p.address))}
      <div class="grid sm-3" style="--gap:14px">${U.field('Kota', U.input('city', p.city))}${U.field('Tahun berdiri', U.input('founded', p.founded))}${U.field('Kapasitas jamaah', U.input('capacity', p.capacity))}</div>
      ${U.field('Sejarah singkat', `<textarea class="textarea" name="history">Masjid Al-Ikhlas dibangun secara swadaya oleh warga RW 07 pada tahun 1987 di atas tanah wakaf keluarga H. Rachmat. Renovasi besar dilakukan pada 2009, dan kini sedang dibangun lantai 2.</textarea>`)}
      <div class="field"><label>Lokasi (untuk jadwal shalat)</label><div class="map" style="min-height:180px"><span class="pin" style="left:52%;top:55%">${I('pin', 36)}</span></div><div class="hint">${p.lat}, ${p.lng} · geser pin untuk mengubah</div></div>
      <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="saveProfile">Simpan</button></div>
    </form></div>`;
  },
  domain() {
    const p = S().profile;
    return `${U.pageHead('Domain', 'Alamat situs gratis selamanya. Punya domain sendiri? Tim kami bantu atur, gratis.')}
    <div class="grid lg-2" style="align-items:start">
      <div class="card"><div class="row between"><div class="row" style="--gap:12px"><div class="icon-tile">${I('globe')}</div><div><div class="label">Alamat gratis</div><div style="font-weight:700" class="mono">${p.subdomain}.cintamasjid.or.id</div></div></div>${U.badge('Aktif', 'ok')}</div>
        <div class="field" style="margin-top:16px"><label>Ganti alamat gratis</label><div class="row" style="--gap:0"><input class="input" value="${p.subdomain}" style="border-radius:var(--r-sm) 0 0 var(--r-sm)"><span class="input" style="width:auto;border-left:0;border-radius:0 var(--r-sm) var(--r-sm) 0;background:var(--surface-2);color:var(--muted);display:flex;align-items:center;white-space:nowrap">.cintamasjid.or.id</span></div></div>
      </div>
      <div class="card"><div class="row between"><div class="row" style="--gap:12px"><div class="icon-tile gold">${I('star')}</div><div><div class="label">Domain milik masjid</div><div style="font-weight:700" class="mono">${p.customDomain}</div></div></div>${U.badge('Tersambung', 'ok')}</div>
        <div class="timeline" style="margin-top:18px">
          <div class="t done"><b>Domain milik masjid</b><div class="xs muted">Terdaftar atas nama masjid di penyedia domain · perpanjang sebelum 12 Okt 2027</div></div>
          <div class="t done"><b>Dibantu diatur tim Cinta Masjid</b><div class="xs muted">www → ${p.subdomain}.cintamasjid.or.id · gratis</div></div>
          <div class="t done"><b>Gembok keamanan (SSL) aktif otomatis</b><div class="xs muted">Sertifikat diperbarui otomatis</div></div>
        </div>
        <div class="notice" style="margin-top:8px">${I('bell', 18)}<span>Kami akan mengingatkan ketua lewat WA 30 hari sebelum domain perlu diperpanjang di penyedianya.</span></div>
        <details class="tech"><summary class="small">Rincian untuk teknisi</summary><div class="table-wrap" style="margin-top:8px;border:1px solid var(--line);border-radius:var(--r-sm)"><table class="table"><thead><tr><th>Tipe</th><th>Nama</th><th>Nilai</th></tr></thead><tbody><tr><td class="mono">CNAME</td><td class="mono">www</td><td class="mono">${p.subdomain}.cintamasjid.or.id</td></tr><tr><td class="mono">A</td><td class="mono">@</td><td class="mono">76.76.21.xx</td></tr></tbody></table></div></details>
        <div class="row wrap" style="margin-top:14px;--gap:8px"><button class="btn sm primary" data-act="domainHelp">${I('chat', 16)} Minta bantuan domain</button><button class="btn sm" data-act="toastOnly" data-msg="Sambungan domain diperiksa ulang · OK">${I('refresh', 16)} Cek ulang</button></div>
      </div>
    </div>`;
  },
  rekening() {
    const b = S().profile.bank;
    return `${U.pageHead('Rekening & QRIS', 'Platform tidak menampung dana. Semua donasi masuk langsung ke rekening atau QRIS milik masjid.')}
    <div class="grid lg-3" style="align-items:start">
      <div class="card"><div class="card-head"><h3>Rekening masjid</h3></div><div class="stack" style="--gap:12px">${U.field('Bank', U.input('bank', b.name))}${U.field('No. rekening', U.input('no', b.no))}${U.field('Atas nama', U.input('holder', b.holder))}<button class="btn primary" data-act="toastOnly" data-msg="Rekening disimpan">Simpan</button></div></div>
      <div class="card" style="text-align:center"><div class="card-head"><h3>QRIS statis</h3>${U.badge('Fase 1', 'ok')}</div><div class="qr" style="border:1px solid var(--line)">${U.qr('qris-' + S().profile.subdomain, 160)}</div><label class="btn block" style="margin-top:14px;cursor:pointer"><input type="file" hidden accept="image/*" data-act="toastFile">${I('upload', 18)} Unggah gambar QRIS</label></div>
      <div class="card"><div class="card-head"><h3>Pembayaran online otomatis</h3>${U.badge('Fase 2', 'gold')}</div><p class="small muted">Agar donasi tercatat otomatis dan Sedekah Subuh bisa ditagih rutin. Dana langsung masuk ke rekening masjid.</p>
        <div class="stack" style="--gap:8px;margin-top:14px">${['Xendit', 'Midtrans', 'DOKU'].map((g) => `<div class="row between" style="padding:10px 12px;border:1px solid var(--line);border-radius:var(--r-sm)"><b class="small">${g}</b><span class="xs muted">dalam evaluasi</span></div>`).join('')}</div></div>
    </div>`;
  },
  modul() {
    const m = S().modules;
    const list = [['zis', 'heart', 'ZIS & Qurban', 'Zakat, kampanye, sedekah subuh, qurban, wakaf'], ['warga', 'users', 'Jamaah & Warga', 'Database KK, label, peta, impor Excel'], ['ibadah', 'moon', 'Ibadah & Kegiatan', 'Petugas, kajian, TPQ, khutbah, Ramadhan'], ['aset', 'box', 'Aset & Layanan', 'Inventaris, peminjaman, pemesanan ruang'], ['komunikasi', 'megaphone', 'Komunikasi', 'Pengumuman, siaran WA, berita duka, Tanya Ustadz'], ['kepedulian', 'basket', 'Kepedulian Umat', 'Lumbung pangan digital & penyaluran QR'], ['komunitas', 'chat', 'Komunitas (Ruang Jamaah)', 'Media sosial berbasis masjid: kabar, doa, grup, pasar']];
    return `${U.pageHead('Modul', 'Nyalakan hanya yang dibutuhkan. Masjid kecil cukup Keuangan + Jadwal Shalat.')}
    <div class="card pad-0" style="max-width:760px"><div class="list">
      ${[['wallet', 'Keuangan', 'Selalu aktif'], ['clock', 'Jadwal Shalat & Mode TV', 'Selalu aktif']].map(([ic, t, d]) => `<div class="list-item"><span class="icon-tile">${I(ic)}</span><div class="grow"><div class="title">${t}</div><div class="meta">${d}</div></div>${U.badge('Inti', 'brand')}</div>`).join('')}
      ${list.map(([k, ic, t, d]) => `<label class="list-item" style="cursor:pointer"><span class="icon-tile ${m[k] ? '' : 'ink'}">${I(ic)}</span><div class="grow"><div class="title">${t}</div><div class="meta">${d}</div></div>${U.switch('', m[k], 'toggleMod', `data-k="${k}"`)}</label>`).join('')}
    </div></div>`;
  },
};
CM.act.pv = (el) => { G.pv = el.dataset.v; document.querySelectorAll('#pvSeg button').forEach((b) => b.classList.toggle('active', b === el)); G.renderPreview(); };
CM.act.radius = (el) => { CM.setTheme({ radius: el.dataset.v }); el.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === el)); G.renderPreview(); };
CM.act.ornament = (el) => { CM.setTheme({ ornament: el.checked }); el.closest('label').querySelector('.grow').textContent = el.checked ? 'Ditampilkan' : 'Disembunyikan'; };
CM.act.resetTheme = () => { const d = CM.seed(); S().theme = d.theme; S().profile.logoImg = null; S().profile.name = d.profile.name; CM.applyTheme(); CM.save(); CM.render(); U.toast('Kembali ke Zamrud & Emas'); };
CM.act.logo = (el) => {
  const f = el.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { S().profile.logoImg = r.result; CM.save(); CM.render(); U.toast('Logo diperbarui di semua halaman'); };
  r.readAsDataURL(f);
};
CM.act.rmLogo = () => { S().profile.logoImg = null; CM.save(); CM.render(); };
CM.act.saveProfile = () => { const d = U.formData(document.getElementById('profForm')); ['name', 'short', 'tagline', 'address', 'city', 'founded', 'capacity'].forEach((k) => (S().profile[k] = d[k])); CM.save(); CM.render(); U.toast('Profil disimpan'); };
CM.act.toggleMod = (el) => { S().modules[el.dataset.k] = el.checked; CM.save(); CM.render(); U.toast(el.checked ? 'Modul dinyalakan' : 'Modul disembunyikan dari menu'); };
})();

(() => {
const { icon: I, ui: U } = CM;
CM.act.domainHelp = () => U.sheet({
  title: 'Bantuan domain (gratis)',
  body: `<div class="stack">
    <div class="field"><label>Kondisi masjid</label>
      ${[['punya', 'Sudah punya domain', 'Tim kami bantu atur sampai situs tampil di domain itu.'], ['belum', 'Belum punya, ingin punya', 'Kami dampingi membeli di penyedia resmi atas nama masjid.'], ['pindah', 'Ganti/pindahkan domain', 'Misalnya domain lama yang dulu dipakai situs lain.']].map(([v, t, d], i) => `<label class="option-card"><input type="radio" name="dk" value="${v}" ${i === 0 ? 'checked' : ''}><div><b class="small">${t}</b><div class="xs muted">${d}</div></div></label>`).join('')}
    </div>
    ${U.field('Nama domain (jika sudah ada)', '<input class="input mono" placeholder="mis. masjidalikhlas.id">')}
    ${U.field('No. WhatsApp yang bisa dihubungi', '<input class="input" inputmode="tel" value="0812 xxxx 1101">')}
    <div class="notice ok">${I('info', 18)}<span>Bantuan ini gratis. Bila membeli domain baru, biayanya dibayar langsung oleh masjid kepada penyedia domain; Cinta Masjid tidak mengambil keuntungan.</span></div>
  </div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Permintaan terkirim · tim kami menghubungi lewat WA">Kirim permintaan</button>`,
});
})();

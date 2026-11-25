/* Cinta Masjid — Admin: ZIS & Qurban, Jamaah & Warga, Ibadah & Kegiatan */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;
const listCard = (rows) => `<div class="card pad-0"><div class="list">${rows}</div></div>`;

/* ================= ZIS & QURBAN ================= */
CM.A.reg({
  id: 'zis', label: 'ZIS & Qurban', icon: 'heart', toggle: 'zis',
  tabs: [{ id: 'zakat', label: 'Zakat' }, { id: 'kampanye', label: 'Infak & Kampanye' }, { id: 'subuh', label: 'Sedekah Subuh' }, { id: 'qurban', label: 'Qurban' }, { id: 'wakaf', label: 'Wakaf' }],
  render(tab) { return Z[tab](); },
});
const Z = {
  zakat() {
    const z = S().zakat;
    const mal = z.muzakki.filter((m) => m.jenis === 'Mal').reduce((s, m) => s + m.nominal, 0);
    const nisab = z.nisabEmas * z.hargaEmas;
    return `${U.pageHead('Zakat', 'Pencatatan muzakki, mustahik per asnaf, dan penyaluran dengan tanda terima digital.', `<button class="btn" data-act="zakatCalc">${I('chart', 18)} Kalkulator</button><button class="btn primary" data-act="zakatAdd">${I('plus', 18)} Catat zakat</button>`)}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">
      ${U.stat({ label: 'Muzakki tercatat', value: '94', sub: 'tahun 1448 H', icon: 'users' })}
      ${U.stat({ label: 'Zakat mal terkumpul', value: CM.rpShort(mal), icon: 'wallet', tone: 'ok' })}
      ${U.stat({ label: 'Zakat fitrah 1447 H', value: '1.284 jiwa', sub: '2,1 ton beras + Rp31 jt', icon: 'basket', tone: 'gold' })}
      ${U.stat({ label: 'Nisab saat ini', value: CM.rpShort(nisab), sub: `${z.nisabEmas} g emas × ${CM.rp(z.hargaEmas)}`, icon: 'star' })}
    </div>
    <div class="grid lg-2-1">
      <div class="stack">
        <div class="card pad-0">
          <div class="card-head" style="padding:16px 18px 0"><h3>Muzakki terbaru</h3><button class="btn sm ghost">Semua ${I('right', 14)}</button></div>
          <div class="list" style="margin-top:6px">${z.muzakki.map((m) => `<div class="list-item">${U.avatar(m.name)}<div class="grow" style="min-width:0"><div class="title truncate">${E(m.name)}</div><div class="meta">Zakat ${m.jenis}${m.jiwa ? ` · ${m.jiwa} jiwa` : ''} · ${CM.tgl(m.date, { short: true })}</div></div><div style="text-align:right"><div class="amount">${m.bentuk === 'Beras' ? m.nominal + ' kg' : CM.rp(m.nominal)}</div><button class="btn sm ghost" style="min-height:28px;padding:0 6px" data-act="receipt" data-n="${E(m.name)}">${I('send', 14)} Tanda terima</button></div></div>`).join('')}</div>
        </div>
        <div class="card pad-0">
          <div class="card-head" style="padding:16px 18px 0"><h3>Penyaluran</h3><button class="btn sm" data-act="toastOnly" data-msg="Form penyaluran (simulasi)">${I('plus', 16)} Salurkan</button></div>
          <div class="list" style="margin-top:6px">${z.distributions.map((d) => `<div class="list-item"><div class="icon-tile sm ok">${I('hand', 18)}</div><div class="grow"><div class="title">${E(d.to)}</div><div class="meta">${d.asnaf} · ${CM.tgl(d.date, { short: true })}${d.foto ? ' · bukti foto ✓' : ''}</div></div><div class="amount">${CM.rp(d.amount)}</div></div>`).join('')}</div>
        </div>
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>Mustahik per asnaf</h3><a class="small" href="#/admin/warga/label" style="color:var(--brand);font-weight:600">Dari data warga</a></div>
          <div class="grid cols-2" style="--gap:8px">${z.asnaf.map((a) => `<div style="padding:10px 12px;border-radius:var(--r-sm);background:var(--surface-2);border:1px solid var(--line)"><div class="xs muted">${a.name}</div><div style="font-weight:700;font-size:1.15rem">${a.count}</div></div>`).join('')}</div>
        </div>
        <div class="card accent">
          <div class="eyebrow">Zakat fitrah ${z.fitrah.tahun}</div>
          <div class="row between" style="margin-top:10px"><span>Beras per jiwa</span><b>${z.fitrah.beras} kg</b></div>
          <div class="row between" style="margin-top:6px"><span>Uang per jiwa</span><b>${CM.rp(z.fitrah.uang)}</b></div>
          <button class="btn sm block" style="margin-top:14px" data-act="toastOnly" data-msg="Nilai fitrah ditetapkan per tahun oleh DKM">Ubah nilai</button>
        </div>
      </div>
    </div>`;
  },
  kampanye() {
    return `${U.pageHead('Infak & Kampanye', 'QRIS statis milik masjid tampil di situs. Dana selalu masuk langsung ke rekening masjid.', `<button class="btn primary" data-act="toastOnly" data-msg="Form kampanye baru (simulasi)">${I('plus', 18)} Kampanye baru</button>`)}
    <div class="grid lg-2-1">
      <div class="stack">${S().campaigns.map((c) => { const pct = (c.raised / c.target) * 100; return `<div class="card">
        <div class="row" style="--gap:14px;align-items:flex-start"><div class="media ${c.color === 'gold' ? 'gold' : ''}" style="width:88px;aspect-ratio:1;flex:none"></div>
        <div class="grow"><div class="row between"><div style="font-weight:700;font-size:1.05rem">${E(c.title)}</div>${U.badge('Aktif', 'ok')}</div><div class="small muted" style="margin:2px 0 10px">${E(c.desc)}</div>
        ${U.progress(pct)}<div class="row between small" style="margin-top:8px"><span><b class="num">${CM.rp(c.raised)}</b> <span class="muted">dari ${CM.rpShort(c.target)}</span></span><span class="muted">${Math.round(pct)}% · ${c.donors} donatur</span></div>
        <div class="row wrap small muted" style="margin-top:8px;--gap:12px"><span>${I('calendar', 14)} s.d. ${CM.tgl(c.deadline, { short: true })}</span><span>${I('wallet', 14)} ${CM.kasName(c.kas)}</span></div></div></div>
      </div>`; }).join('')}</div>
      <div class="card" style="text-align:center">
        <div class="card-head"><h3>QRIS masjid</h3>${U.badge('Statis', '')}</div>
        <div class="qr" style="border:1px solid var(--line)">${U.qr('qris-' + S().profile.subdomain, 180)}</div>
        <div style="font-weight:700;margin-top:10px">${E(S().profile.name)}</div><div class="xs muted">NMID ID10202611xxxx</div>
        <a class="btn sm block" style="margin-top:14px" href="#/admin/pengaturan/rekening">Ganti gambar QRIS</a>
      </div>
    </div>`;
  },
  subuh() {
    const subs = S().subscribers;
    return `${U.pageHead('Sedekah Subuh Otomatis', 'Jamaah berlangganan sedekah harian kecil. Tagihan diakumulasi mingguan agar biaya layanan pembayaran tetap hemat.', U.badge('Fase 2 · butuh layanan pembayaran online', 'gold'))}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">
      ${U.stat({ label: 'Pelanggan aktif', value: '128', sub: '<span class="delta-up">+14</span> bulan ini', icon: 'users', tone: 'ok' })}
      ${U.stat({ label: 'Terkumpul November', value: 'Rp2,6 jt', sub: 'masuk ke Kas Umum', icon: 'sunrise', tone: 'gold' })}
      ${U.stat({ label: 'Rata-rata / hari', value: 'Rp3.400', sub: 'per pelanggan', icon: 'chart' })}
      ${U.stat({ label: 'Gagal tagih', value: '1', sub: 'dijeda otomatis setelah 3×', icon: 'alert', tone: 'bad' })}
    </div>
    <div class="notice gold" style="margin-bottom:16px">${I('info', 20)}<div>Contoh: Rp2.000/hari ditagih <b>Rp14.000 setiap Jumat</b>. Jamaah tetap melihatnya sebagai sedekah harian, dan pukul 04.30 menerima pesan opsional "Sedekah subuhmu hari ke-N tercatat".</div></div>
    <div class="card pad-0"><div class="table-wrap"><table class="table">
      <thead><tr><th>Jamaah</th><th>Nominal</th><th>Frekuensi</th><th>Sejak</th><th class="r">Total</th><th>Status</th></tr></thead>
      <tbody>${subs.map((s) => `<tr><td><div class="row" style="--gap:10px">${U.avatar(s.name, 'sm')}<b>${E(s.name)}</b></div></td><td class="num">${CM.rp(s.amount)}</td><td>${s.freq}</td><td class="muted">${CM.tgl(s.since, { short: true })}</td><td class="r num">${CM.rp(s.total)}</td><td>${U.status(s.status)}${s.fails ? `<div class="xs muted">gagal ${s.fails}×</div>` : ''}</td></tr>`).join('')}</tbody>
    </table></div></div>`;
  },
  qurban() {
    const q = S().qurban;
    const slots = (g) => Array.from({ length: 7 }, (_, i) => g.members[i] ? `<span class="avatar sm" title="${E(g.members[i])}">${CM.initials(g.members[i])}</span>` : `<span class="avatar sm" style="background:transparent;border:1.5px dashed var(--line-strong);color:var(--faint)">+</span>`).join('');
    return `${U.pageHead(`Qurban ${q.periode}`, `Perkiraan Idul Adha ${CM.tgl(q.hari)}. Kelompok sapi terisi otomatis, admin bisa memindahkan peserta.`, `<button class="btn" data-act="coupon">${I('qr', 18)} Kupon daging</button><button class="btn primary" data-act="toastOnly" data-msg="Form pendaftaran shohibul qurban (simulasi)">${I('plus', 18)} Daftarkan</button>`)}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">
      ${U.stat({ label: 'Sapi', value: q.groups.length + ' ekor', sub: `${q.groups.reduce((s, g) => s + g.members.length, 0)}/21 bagian terisi`, icon: 'cow', tone: 'gold' })}
      ${U.stat({ label: 'Kambing/domba', value: q.kambing.length + ' ekor', icon: 'cow' })}
      ${U.stat({ label: 'Harga per bagian sapi', value: CM.rpShort(q.hargaBagian), sub: 'Kambing ' + CM.rpShort(q.hargaKambing), icon: 'tag' })}
      ${U.stat({ label: 'Tabungan qurban', value: q.tabungan.length + ' penabung', sub: CM.rpShort(q.tabungan.reduce((s, t) => s + t.paid, 0)) + ' terkumpul', icon: 'wallet', tone: 'ok' })}
    </div>
    <div class="grid lg-2">
      <div class="card">
        <div class="card-head"><h3>Kelompok sapi</h3>${U.badge('maks. 7 orang', '')}</div>
        <div class="stack" style="--gap:12px">${q.groups.map((g) => `<div style="padding:12px;border:1px solid var(--line);border-radius:var(--r-sm)"><div class="row between" style="margin-bottom:8px"><b>${g.id} · ${g.animal}</b><span class="small ${g.members.length === 7 ? '' : 'muted'}">${g.members.length === 7 ? U.badge('Penuh', 'ok') : `sisa ${7 - g.members.length} tempat`}</span></div><div class="row wrap" style="--gap:6px">${slots(g)}</div></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Tabungan qurban</h3><span class="small muted">Pengingat WA tiap tgl 1</span></div>
        <div class="stack" style="--gap:14px">${q.tabungan.map((t) => `<div><div class="row between small"><b>${E(t.name)}</b><span class="num">${CM.rp(t.paid)} <span class="muted">/ ${CM.rpShort(t.target)}</span></span></div><div style="margin:6px 0 4px">${U.progress((t.paid / t.target) * 100, t.paid >= t.target ? '' : 'gold')}</div><div class="xs muted">${t.paid >= t.target ? 'Lunas ✓' : `Cicilan ${CM.rp(t.cicilan)} · berikutnya ${CM.tgl(t.next, { short: true, year: false })}`}</div></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Jadwal penyembelihan</h3></div>
        <div class="timeline">
          ${[['done', '06.30', 'Shalat Idul Adha'], ['now', '08.00', 'Penyembelihan sapi S1–S3 · Tim Ust. Hasan'], ['', '09.30', 'Penyembelihan kambing'], ['', '11.00', 'Pengemasan 420 paket'], ['', '13.00', 'Pembagian dengan kupon QR']].map(([c, t, x]) => `<div class="t ${c}"><b class="num">${t}</b> <span class="muted">—</span> ${x}</div>`).join('')}
        </div>
      </div>
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Kambing / domba</h3></div><div class="list" style="margin-top:6px">${q.kambing.map((k) => `<div class="list-item">${U.avatar(k.name, 'sm')}<span class="grow title">${E(k.name)}</span>${U.status(k.status)}</div>`).join('')}</div></div>
    </div>`;
  },
  wakaf() {
    return `${U.pageHead('Wakaf', 'Data aset wakaf, sertifikat/AIW, nazhir, dan dokumen pendukung.', `${U.badge('Fase 4', 'gold')}<button class="btn primary" data-act="toastOnly" data-msg="Form aset wakaf (simulasi)">${I('plus', 18)} Aset wakaf</button>`)}
    <div class="grid lg-3">${S().wakaf.map((w) => `<div class="card"><div class="icon-tile gold" style="margin-bottom:12px">${I(w.type === 'Tanah' ? 'pin' : 'book')}</div><div style="font-weight:700">${E(w.name)}</div><div class="small muted" style="margin-bottom:12px">${E(w.loc)}</div>
      ${[['Jenis', w.type], ['Luas/jumlah', w.size], ['Sertifikat / AIW', w.cert], ['Nazhir', w.nazhir]].map(([a, b]) => `<div class="row between small" style="padding:6px 0;border-top:1px solid var(--line)"><span class="muted">${a}</span><b>${E(b)}</b></div>`).join('')}
      <button class="btn sm block" style="margin-top:12px">${I('file', 16)} Dokumen (2)</button></div>`).join('')}</div>`;
  },
};
CM.act.toastOnly = (el) => U.toast(el.dataset.msg || 'Simulasi prototipe', 'info');
CM.act.receipt = (el) => U.toast('Tanda terima dikirim via WA ke ' + el.dataset.n, 'send');
CM.act.zakatAdd = () => U.sheet({
  title: 'Catat zakat',
  body: `<div class="stack">
    <div class="seg block"><button class="active" type="button">Zakat fitrah</button><button type="button">Zakat mal</button></div>
    ${U.field('Nama muzakki', '<input class="input" name="n" placeholder="Cari dari data warga atau ketik nama">')}
    <div class="grid cols-2" style="--gap:12px">${U.field('Jumlah jiwa', '<input class="input" type="number" value="4" min="1">')}${U.field('Bentuk', U.select('b', ['Uang', 'Beras']))}</div>
    <div class="card soft row between"><span>Total (4 × ${CM.rp(S().zakat.fitrah.uang)})</span><b class="display" style="font-size:1.3rem">${CM.rp(4 * S().zakat.fitrah.uang)}</b></div>
    <label class="check"><input type="checkbox" checked><span>Kirim tanda terima digital via WhatsApp</span></label>
  </div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Zakat tercatat · tanda terima terkirim">Simpan</button>`,
});
CM.act.closeToast = (el) => { U.close(); U.toast(el.dataset.msg || 'Tersimpan'); };
CM.act.zakatCalc = () => {
  const z = S().zakat;
  U.sheet({
    title: 'Kalkulator zakat mal',
    body: `<div class="stack" id="zc">
      ${U.field('Emas & perak (nilai rupiah)', U.money('emas', '0'))}
      ${U.field('Tabungan & deposito', U.money('tab', '120.000.000'))}
      ${U.field('Aset perdagangan', U.money('dag', '0'))}
      ${U.field('Utang jatuh tempo', U.money('utang', '0'))}
      <div class="card brand" id="zcRes"></div>
      <p class="xs muted">Nisab ${z.nisabEmas} gram emas × ${CM.rp(z.hargaEmas)}/g = ${CM.rp(z.nisabEmas * z.hargaEmas)}. Harga emas diperbarui admin. Hasil bersifat perkiraan.</p>
    </div>`,
    onMount: (el) => { const f = () => { const d = U.formData(el); const net = d.emas + d.tab + d.dag - d.utang; const nis = z.nisabEmas * z.hargaEmas; document.getElementById('zcRes').innerHTML = net >= nis ? `<div class="muted small">Harta bersih ${CM.rp(net)} · mencapai nisab</div><div class="display num" style="font-size:2rem">${CM.rp(net * 0.025)}</div><div class="small muted">zakat 2,5% per tahun</div>` : `<div class="muted small">Harta bersih ${CM.rp(net)}</div><div class="display" style="font-size:1.4rem">Belum mencapai nisab</div>`; }; el.addEventListener('input', f); f(); },
    foot: `<button class="btn primary" data-act="close">Selesai</button>`,
  });
};
CM.act.coupon = () => U.sheet({
  title: 'Kupon daging ber-QR',
  body: `<div class="stack">
    <p class="muted">Dibuat dari daftar penerima. Relawan memindai saat pembagian; satu kupon hanya berlaku sekali.</p>
    <div class="grid cols-2" style="--gap:10px">${['Kel. Sumiati · RT 03', 'Kel. Karta · RT 05', 'Kel. Wahyudi · RT 06', 'Kel. Darsono · RT 04'].map((n, i) => `<div class="card" style="padding:12px;text-align:center;border-style:dashed"><div class="eyebrow" style="font-size:.62rem">Kupon Qurban 1448 H</div><div class="qr" style="padding:6px;margin:8px 0">${U.qr('kupon' + i, 96)}</div><div class="xs" style="font-weight:700">${n}</div><div class="xs muted mono">QB-${(4821 + i * 7)}</div></div>`).join('')}</div>
    <div class="row between card soft"><span><b>420 kupon</b> siap dicetak</span><span class="small muted">A4 · 12 per lembar</span></div>
  </div>`,
  foot: `<button class="btn" data-act="toastOnly" data-msg="Kupon dikirim via WA (simulasi)">${I('send', 18)} Kirim WA</button><button class="btn primary" data-act="closeToast" data-msg="PDF kupon diunduh">${I('download', 18)} Cetak PDF</button>`,
});

/* ================= JAMAAH & WARGA ================= */
CM.A.reg({
  id: 'warga', label: 'Jamaah & Warga', icon: 'users', toggle: 'warga',
  tabs: [{ id: 'keluarga', label: 'Keluarga (KK)' }, { id: 'warga', label: 'Warga' }, { id: 'label', label: 'Label' }, { id: 'peta', label: 'Peta' }, { id: 'impor', label: 'Impor Excel' }],
  render(tab) { return W[tab](); },
});
const lblTone = { dhuafa: 'warn', yatim: 'info', lansia: '', mualaf: 'brand', relawan: 'ok', muzakki: 'gold' };
const W = {
  keluarga() {
    return `${U.pageHead('Keluarga (KK)', '412 KK · 1.538 warga di RW 07. Data warga tidak pernah tampil di situs publik.', `<a class="btn" href="#/admin/warga/impor">${I('upload', 18)} Impor</a><button class="btn primary" data-act="toastOnly" data-msg="Form keluarga baru (simulasi)">${I('plus', 18)} Tambah KK</button>`)}
    <div class="row wrap" style="margin-bottom:12px;--gap:8px"><div class="adm-search" style="max-width:320px;flex:1">${I('search', 18)}<input class="input" placeholder="Cari nama kepala keluarga"></div><select class="select" style="width:auto"><option>Semua RT</option>${['01', '02', '03', '04', '05', '06'].map((r) => `<option>RT ${r}</option>`).join('')}</select></div>
    ${listCard(S().households.map((h) => `<button class="list-item" data-act="kkDetail" data-id="${h.id}">${U.avatar(h.kk)}<span class="grow" style="min-width:0"><span class="title" style="display:block">Kel. ${E(h.kk)}</span><span class="meta">RT ${h.rt}/RW ${h.rw} · ${h.members} anggota</span></span><span class="row wrap hide-mobile" style="--gap:6px;justify-content:flex-end">${h.labels.map((l) => U.badge(l, lblTone[l])).join('')}</span>${I('right', 16, 'faint')}</button>`).join(''))}
    <div class="notice" style="margin-top:14px">${I('lock', 18)}<span>Sesuai UU PDP: no. WA & alamat dienkripsi, ekspor hanya untuk Ketua & Sekretaris dan tercatat di log.</span></div>`;
  },
  warga() {
    const people = [['Sudirman', 'L', 61, '03', ['muzakki']], ['Siti Aminah', 'P', 44, '03', ['relawan']], ['Sumiati', 'P', 52, '03', ['dhuafa']], ['Aisyah Putri', 'P', 9, '03', ['yatim']], ['Karta', 'L', 74, '05', ['dhuafa', 'lansia']], ['Kevin Wijaya', 'L', 27, '04', ['mualaf']], ['Agus Wibowo', 'L', 48, '01', ['muzakki', 'relawan']], ['Hartini', 'P', 69, '02', ['lansia']]];
    return `${U.pageHead('Warga', 'Data per individu, terhubung ke keluarga, mustahik, dan distribusi.')}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Nama</th><th>L/P</th><th>Usia</th><th>RT</th><th>Label</th></tr></thead><tbody>
    ${people.map(([n, g, a, rt, l]) => `<tr><td><div class="row" style="--gap:10px">${U.avatar(n, 'sm')}<b>${n}</b></div></td><td>${g}</td><td>${a}</td><td>${rt}</td><td><div class="row wrap" style="--gap:4px">${l.map((x) => U.badge(x, lblTone[x])).join('')}</div></td></tr>`).join('')}
    </tbody></table></div></div>`;
  },
  label() {
    return `${U.pageHead('Label', 'Label sistem terhubung ke mustahik zakat, distribusi qurban, dan penerima lumbung pangan.', `<button class="btn primary" data-act="toastOnly" data-msg="Label baru (simulasi)">${I('plus', 18)} Label</button>`)}
    <div class="grid sm-2 lg-4">${S().labels.map((l) => `<div class="card"><div class="row between"><div class="icon-tile sm ${l.sys ? 'gold' : 'ink'}">${I('tag', 18)}</div>${l.sys ? U.badge('Sistem', 'gold') : U.badge('Bebas', '')}</div><div style="font-weight:700;margin-top:12px">${l.name}</div><div class="display" style="font-size:1.6rem">${l.count} <span class="small muted" style="font-family:var(--font-body)">warga</span></div>${['dhuafa', 'yatim', 'lansia', 'mualaf'].includes(l.id) ? '<div class="xs muted">→ mustahik & penerima bantuan</div>' : l.id === 'relawan' ? '<div class="xs muted">→ petugas scan QR</div>' : ''}</div>`).join('')}</div>`;
  },
  peta() {
    const dots = S().households.map((h, i) => ({ x: 14 + ((i * 37) % 74), y: 18 + ((i * 53) % 66), l: h.labels[0] }));
    const col = { dhuafa: 'var(--warn)', yatim: 'var(--info)', lansia: '#777', mualaf: 'var(--brand)', relawan: 'var(--ok)', muzakki: 'var(--accent)' };
    return `${U.pageHead('Peta sebaran warga', 'Berdasarkan pin alamat · OpenStreetMap / Leaflet (tanpa biaya API).', U.badge('Fase 2', 'gold'))}
    <div class="card pad-0"><div class="map" style="min-height:420px;border-radius:0">
      <span class="pin" style="left:50%;top:50%">${I('mosque', 40)}</span>
      ${dots.concat(dots.map((d) => ({ x: (d.x + 23) % 90 + 5, y: (d.y + 31) % 80 + 8, l: d.l }))).map((d) => `<span class="dotp" style="left:${d.x}%;top:${d.y}%;background:${col[d.l]}"></span>`).join('')}
    </div><div class="row wrap" style="padding:14px 18px;--gap:14px">${Object.entries(col).map(([k, c]) => `<span class="small row" style="--gap:6px"><i style="width:10px;height:10px;border-radius:50%;background:${c}"></i>${k}</span>`).join('')}</div></div>`;
  },
  impor() {
    return `${U.pageHead('Impor dari Excel', 'Unggah file sesuai contoh format, periksa pratinjau, lalu simpan.')}
    <div class="grid lg-2">
      <div class="stack">
        <div class="steps"><i class="on"></i><i class="on"></i><i></i></div>
        <label class="card dashed" style="text-align:center;padding:36px;cursor:pointer"><input type="file" hidden accept=".xlsx,.csv" data-act="toastFile"><div class="icon-tile lg" style="margin:0 auto 12px">${I('upload', 24)}</div><b>Pilih file .xlsx atau .csv</b><div class="small muted">atau seret ke sini</div></label>
        <button class="btn">${I('download', 18)} Unduh contoh format</button>
      </div>
      <div class="card">
        <div class="card-head"><h3>Pratinjau · warga_rt03.xlsx</h3>${U.badge('48 baris', '')}</div>
        <div class="stack" style="--gap:8px">
          <div class="notice ok">${I('check', 18)}<span>45 baris valid</span></div>
          <div class="notice warn">${I('alert', 18)}<span>2 baris: no. WA tidak valid (baris 12, 30)</span></div>
          <div class="notice bad">${I('x', 18)}<span>1 baris duplikat dengan Kel. Sudirman (baris 7)</span></div>
        </div>
        <button class="btn primary block" style="margin-top:14px" data-act="toastOnly" data-msg="45 warga berhasil diimpor">Simpan 45 baris valid</button>
      </div>
    </div>`;
  },
};
CM.act.toastFile = () => U.toast('File diterima · memvalidasi…', 'upload');
CM.act.kkDetail = (el) => {
  const h = S().households.find((x) => x.id === el.dataset.id);
  U.sheet({
    title: 'Kel. ' + h.kk,
    body: `<div class="stack">
      <div class="row wrap" style="--gap:6px">${h.labels.map((l) => U.badge(l, lblTone[l])).join('')}</div>
      <div class="card pad-0"><div class="list">${[['Alamat', 'Jl. Cempaka Gg. ' + h.rt + ', RT ' + h.rt + '/RW ' + h.rw], ['No. WA', h.wa], ['Anggota', h.members + ' orang'], ['Persetujuan data', 'Disetujui 12 Mar 2026']].map(([a, b]) => `<div class="list-item"><span class="grow small muted">${a}</span><b class="small">${b}</b></div>`).join('')}</div></div>
      <div class="section-title">Riwayat bantuan</div>
      <div class="card pad-0"><div class="list"><div class="list-item"><span class="icon-tile sm gold">${I('basket', 16)}</span><span class="grow small">Paket lumbung pangan</span><span class="xs muted">15 Nov</span></div><div class="list-item"><span class="icon-tile sm ok">${I('heart', 16)}</span><span class="grow small">Zakat mal Rp750.000</span><span class="xs muted">10 Nov</span></div></div></div>
    </div>`,
    foot: `<button class="btn danger" data-act="toastOnly" data-msg="Permintaan hapus data (hak UU PDP) dicatat">Hak hapus data</button><button class="btn primary" data-act="close">Tutup</button>`,
  });
};

/* ================= IBADAH & KEGIATAN ================= */
CM.A.reg({
  id: 'ibadah', label: 'Ibadah & Kegiatan', icon: 'moon', toggle: 'ibadah',
  tabs: [{ id: 'jadwal', label: 'Jadwal Shalat' }, { id: 'petugas', label: 'Petugas' }, { id: 'kajian', label: 'Kajian' }, { id: 'tpq', label: 'TPA/TPQ' }, { id: 'khutbah', label: 'Arsip Khutbah' }, { id: 'ramadhan', label: 'Ramadhan' }],
  render(tab) { return B[tab](); },
  mount() { CM.every(() => { const el = document.querySelector('[data-countdown]'); if (el) el.textContent = CM.fmtCountdown(CM.nextPrayer().diffSec); }, 1000); },
});
const B = {
  jadwal() {
    const pt = CM.prayerTimes(), nx = CM.nextPrayer();
    return `${U.pageHead('Jadwal shalat', `Dihitung otomatis dari koordinat masjid (${S().profile.lat}, ${S().profile.lng}). Parameter Kemenag RI: Subuh 20°, Isya 18°, ihtiyath 2 menit.`, `<a class="btn" href="#/tv" target="_blank">${I('tv', 18)} Buka Mode TV</a>`)}
    <div class="card brand ornament" style="--orn-color:#fff;--orn-opacity:.06;margin-bottom:16px">
      <div class="row between wrap"><div><div class="muted small">Berikutnya</div><div class="display" style="font-size:2rem">${nx.name} ${nx.shown}</div></div><div style="text-align:right"><div class="muted small">hitung mundur</div><div class="num" style="font-size:2rem;font-weight:700" data-countdown>${CM.fmtCountdown(nx.diffSec)}</div></div></div>
    </div>
    <div class="card pad-0">
      <div class="card-head" style="padding:16px 18px 4px"><h3>Koreksi & jeda iqamah</h3><span class="small muted">${CM.tgl('2026-11-25', { day: true })}</span></div>
      <div class="list">${pt.map((p) => `<div class="list-item" style="flex-wrap:wrap">
        <div class="icon-tile sm ${p.id === nx.id ? '' : 'ink'}">${I(p.id === 'terbit' ? 'sunrise' : p.id === 'dzuhur' || p.id === 'ashar' ? 'sun' : 'moon', 18)}</div>
        <div class="grow"><div class="title">${p.name}</div><div class="meta">Hitungan ${p.time}${p.adj ? ` · koreksi ${p.adj > 0 ? '+' : ''}${p.adj} mnt` : ''}</div></div>
        <div class="display num" style="font-size:1.35rem;width:70px;text-align:right">${p.shown}</div>
        <div class="row" style="--gap:6px">
          <span class="xs muted">Koreksi</span><button class="btn sm icon" data-act="adj" data-id="${p.id}" data-d="-1" aria-label="Kurangi">${I('minus', 16)}</button><button class="btn sm icon" data-act="adj" data-id="${p.id}" data-d="1" aria-label="Tambah">${I('plus', 16)}</button>
        </div>
        ${p.id !== 'terbit' ? `<div class="row" style="--gap:6px"><span class="xs muted">Iqamah</span><select class="select" style="min-height:36px;width:auto;padding:4px 10px" data-act="iq" data-id="${p.id}">${[5, 7, 10, 12, 15, 20].map((v) => `<option ${v === p.iq ? 'selected' : ''} value="${v}">${v} mnt</option>`).join('')}</select></div>` : '<div style="width:130px"></div>'}
      </div>`).join('')}</div>
    </div>
    <div class="notice warn" style="margin-top:14px">${I('alert', 18)}<span>Wajib diverifikasi terhadap jadwal resmi Bimas Islam Kemenag sebelum dipakai. Pengingat waktu shalat dikirim ke HP jamaah yang mengaktifkannya.</span></div>`;
  },
  petugas() {
    const roles = ['Imam', 'Khatib', 'Muadzin', 'Bilal'];
    return `${U.pageHead('Petugas Jumat & tarawih', 'Pengingat WhatsApp otomatis dikirim H-1 dan H-0 pagi.', `<button class="btn primary" data-act="toastOnly" data-msg="Jadwal petugas baru (simulasi)">${I('plus', 18)} Jadwal petugas</button>`)}
    <div class="stack">${S().jumat.map((j, idx) => `<div class="card">
      <div class="row between" style="margin-bottom:12px"><div><div class="eyebrow">Jumat</div><div class="display" style="font-size:1.25rem">${CM.tgl(j.date)}</div></div>${idx === 0 ? U.badge('Pekan ini', 'brand') : ''}</div>
      <div class="grid sm-2" style="--gap:10px">${roles.map((r, i) => { const n = [j.imam, j.khatib, j.muadzin, j.bilal][i]; return `<div class="row" style="--gap:10px;padding:10px;border:1px solid var(--line);border-radius:var(--r-sm)">${U.avatar(n, 'sm')}<div class="grow" style="min-width:0"><div class="xs muted">${r}</div><div class="small truncate" style="font-weight:600">${E(n)}</div></div>${j.confirmed[i] ? U.badge('OK', 'ok') : U.badge('Belum', 'warn')}</div>`; }).join('')}</div>
    </div>`).join('')}
    <div class="card"><div class="row between"><div><b>Jadwal imam tarawih</b><div class="small muted">Aktif saat Mode Ramadhan dinyalakan</div></div><a class="btn sm" href="#/admin/ibadah/ramadhan">Atur</a></div></div></div>`;
  },
  kajian() {
    return `${U.pageHead('Kajian & kegiatan', 'Jadwal rutin atau sekali, tampil otomatis di Agenda situs publik.', `<button class="btn primary" data-act="toastOnly" data-msg="Form kajian (simulasi)">${I('plus', 18)} Kajian</button>`)}
    <div class="grid lg-2-1">
      ${listCard(S().agenda.map((a) => `<div class="list-item"><div style="width:52px;text-align:center;flex:none;padding:6px 0;border-radius:var(--r-sm);background:var(--brand-soft)"><div class="xs" style="color:var(--brand);font-weight:700">${CM.BULAN[new Date(a.date).getMonth()].slice(0, 3).toUpperCase()}</div><div class="display" style="font-size:1.3rem;line-height:1">${new Date(a.date).getDate()}</div></div><div class="grow" style="min-width:0"><div class="title truncate">${E(a.title)}</div><div class="meta truncate">${a.time} · ${E(a.who)} · ${a.place}</div></div>${U.badge(a.type, a.type === 'Kajian' ? 'brand' : '')}</div>`).join(''))}
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Data ustadz</h3></div><div class="list" style="margin-top:6px">${S().ustadz.map((u) => `<div class="list-item">${U.avatar(u.name, 'sm')}<div class="grow" style="min-width:0"><div class="title truncate small">${E(u.name)}</div><div class="meta">${u.bidang} · ${u.kajian}</div></div></div>`).join('')}</div></div>
    </div>`;
  },
  tpq() {
    return `${U.pageHead('TPA/TPQ Al-Ikhlas', '33 santri · 3 pengajar · SPP masuk ke Kas TPQ.', `<button class="btn" data-act="toastOnly" data-msg="Absensi hari ini disimpan">${I('check', 18)} Absensi hari ini</button><button class="btn primary" data-act="toastOnly" data-msg="Form santri (simulasi)">${I('plus', 18)} Santri</button>`)}
    <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Kehadiran bulan ini', value: '87%', icon: 'check', tone: 'ok' })}${U.stat({ label: 'SPP November', value: '31/33 lunas', sub: CM.rp(1650000) + ' masuk', icon: 'wallet', tone: 'gold' })}${U.stat({ label: 'Khatam Iqra', value: '6 santri', sub: 'semester ini', icon: 'star' })}</div>
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Santri</th><th>Kelas</th><th>Wali</th><th>Hadir</th><th>Progres hafalan</th><th>SPP</th></tr></thead><tbody>
      ${S().santri.map((s) => `<tr><td><div class="row" style="--gap:10px">${U.avatar(s.name, 'sm')}<b>${s.name}</b></div></td><td>${s.kelas}</td><td class="muted">${s.wali}</td><td class="num">${s.hadir}/21</td><td style="min-width:160px"><div class="xs muted" style="margin-bottom:4px">${s.hafalan}</div>${U.progress(s.prog, 'gold')}</td><td>${U.status(s.spp)}</td></tr>`).join('')}
    </tbody></table></div></div>`;
  },
  khutbah() {
    return `${U.pageHead('Arsip khutbah', 'Audio dikompres ke ±64 kbps dan diputar bertahap. Khutbah draf tidak tampil di publik.', `<button class="btn primary" data-act="uploadSermon">${I('upload', 18)} Unggah khutbah</button>`)}
    ${listCard(S().sermons.map((s) => `<div class="list-item" style="align-items:flex-start"><div class="icon-tile ${s.status === 'draf' ? 'ink' : ''}">${I('mic')}</div><div class="grow" style="min-width:0"><div class="row between" style="--gap:8px"><div class="title">${E(s.title)}</div>${U.status(s.status)}</div><div class="meta">${CM.tgl(s.date, { short: true })} · ${E(s.khatib)} · ${s.dur}${s.plays ? ` · ${s.plays}× diputar` : ''}</div>${s.summary ? `<div class="small" style="margin-top:6px;color:color-mix(in oklab,var(--ink) 80%,var(--bg))">${E(s.summary)}</div>` : '<div class="small muted" style="margin-top:6px">Menunggu persetujuan sekretaris · diunggah oleh khatib</div>'}<div class="row wrap" style="--gap:6px;margin-top:8px">${s.tags.map((t) => U.badge(t, 'brand')).join('')}</div></div></div>`).join(''))}`;
  },
  ramadhan() {
    return `${U.pageHead('Mode Ramadhan', 'Aktifkan per periode. Menambah imsakiyah, jadwal imam tarawih, takjil, i\'tikaf, dan buka bersama.', `<label class="row card" style="padding:8px 14px;--gap:10px"><span class="small" style="font-weight:600">Aktif</span>${U.switch('', false, 'toastSwitch')}</label>`)}
    <div class="notice gold" style="margin-bottom:16px">${I('moon', 20)}<span>Perkiraan 1 Ramadhan 1448 H: <b>Senin, 8 Februari 2027</b>. Mode akan menyala otomatis 3 hari sebelumnya.</span></div>
    <div class="grid sm-2 lg-4">${[['calendar', 'Jadwal imsakiyah', '30 hari, otomatis dari jadwal shalat'], ['users', 'Jadwal imam tarawih', '8 imam · 30 malam'], ['gift', 'Takjil per donatur', '24 dari 30 hari terisi'], ['moon', "I'tikaf & bukber", 'Pendaftaran 10 malam terakhir']].map(([ic, t, d]) => `<div class="card"><div class="icon-tile gold" style="margin-bottom:12px">${I(ic)}</div><b>${t}</b><div class="small muted">${d}</div></div>`).join('')}</div>`;
  },
};
CM.act.toastSwitch = (el) => U.toast(el.checked ? 'Diaktifkan' : 'Dinonaktifkan', el.checked ? 'check' : 'x');
CM.act.adj = (el) => { const p = S().prayer.find((x) => x.id === el.dataset.id); p.adj = (p.adj || 0) + Number(el.dataset.d); CM.save(); CM.render(); };
CM.act.iq = (el) => { S().prayer.find((x) => x.id === el.dataset.id).iq = Number(el.value); CM.save(); U.toast('Jeda iqamah diperbarui'); };
CM.act.uploadSermon = () => U.sheet({
  title: 'Unggah khutbah',
  body: `<div class="stack">
    <label class="card dashed" style="text-align:center;cursor:pointer"><input type="file" hidden accept="audio/*" data-act="toastFile"><div class="icon-tile" style="margin:0 auto 8px">${I('mic')}</div><b>Pilih audio</b><div class="xs muted">mp3 / m4a / wav · maks. 100 MB</div></label>
    ${U.field('Judul', '<input class="input" placeholder="mis. Keutamaan Sedekah yang Rutin">')}
    <div class="grid cols-2" style="--gap:12px">${U.field('Tanggal', '<input class="input" type="date" value="2026-11-27">')}${U.field('Khatib', U.select('k', S().ustadz.map((u) => u.name)))}</div>
    ${U.field('Tema', '<input class="input" placeholder="Akhlak, Muamalah, Keluarga…">')}
    ${U.field('Ringkasan', '<textarea class="textarea" placeholder="3–5 kalimat inti khutbah"></textarea>', 'Ringkasan otomatis dengan AI (Fase 4) akan selalu berupa draf yang ditinjau manusia.')}
  </div>`,
  foot: `<button class="btn" data-act="close">Simpan draf</button><button class="btn primary" data-act="closeToast" data-msg="Khutbah diterbitkan di /khutbah">Terbitkan</button>`,
});
})();

/* Cinta Masjid — Konsol: Trust & Safety, Mitra, Insight, Produk & Support, Sistem
   + halaman publik "Klaim Masjid Anda" + alur akses bantuan (impersonate) */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const D = CM.CD;
const S = () => CM.state;
const fmt = (n) => CM.num(n);
const listCard = (rows) => `<div class="card pad-0"><div class="list">${rows}</div></div>`;
const kGate = CM.C.kGate;
const nowHM = () => new Date().toTimeString().slice(0, 5);

/* ---------------- 7. TRUST & SAFETY ---------------- */
const anTone = { baru: 'bad', ditinjau: 'warn', aman: 'ok', ditindak: 'info' };
CM.C.reg({
  id: 'trust', label: 'Keamanan & Moderasi', icon: 'shield', badge: () => D.moderation.length + D.anomalies.filter((a) => a.status === 'baru').length,
  tabs: [{ id: 'moderasi', label: 'Moderasi' }, { id: 'anomali', label: 'Kejanggalan Keuangan' }, { id: 'verifikasi', label: 'Verifikasi & Tanda Resmi' }, { id: 'data', label: 'Permintaan Data Pribadi' }],
  render(tab) { return TS[tab](); },
});
const TS = {
  moderasi() {
    return `${U.pageHead('Antrean moderasi', 'Setiap keputusan wajib disertai alasan dan tercatat di Catatan Aktivitas.', U.badge('Target: 0 kampanye palsu lolos > 24 jam', 'brand'))}
    <div class="stack">${D.moderation.map((m) => `<div class="card"><div class="row between wrap" style="--gap:8px"><div class="row" style="--gap:8px"><span class="kbd">${m.id}</span>${U.badge(m.src, m.src.startsWith('Kampanye') ? 'warn' : '')}</div><span class="xs muted">${m.age} lalu</span></div>
      <p style="margin:10px 0 2px;font-weight:600">${E(m.what)}</p><div class="small muted">${E(m.tenant)}</div>
      <div class="row wrap" style="--gap:8px;margin-top:12px">${[['Setujui', 'primary', 'Disetujui · tampil di publik'], ['Minta revisi', '', 'Permintaan revisi dikirim ke DKM'], ['Sembunyikan', '', 'Konten disembunyikan sementara'], ['Tolak', 'danger', 'Ditolak · DKM dinotifikasi'], ['Teruskan ke Pemilik', 'ghost', 'Diteruskan ke Pemilik']].map(([l, c, msg]) => `<button class="btn sm ${c}" data-act="modDecide" data-l="${l}" data-msg="${msg}">${l}</button>`).join('')}</div></div>`).join('')}</div>`;
  },
  anomali() {
    return `${U.pageHead('Deteksi kejanggalan keuangan', 'Sistem memberi tanda bila ada pola mencurigakan. Setiap tanda punya status dan penanggung jawab.', `<button class="btn" data-act="toastOnly" data-msg="Editor aturan (simulasi)">${I('plus', 18)} Aturan</button>`)}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Aturan</th><th>Masjid</th><th>Tindakan otomatis</th><th>Status</th><th>Penanggung jawab</th><th></th></tr></thead><tbody>
    ${D.anomalies.map((a, i) => `<tr><td><b class="small">${a.rule}</b></td><td>${E(a.tenant)}</td><td class="small muted">${a.act}</td><td><span class="badge ${anTone[a.status]}"><span class="dot"></span>${a.status[0].toUpperCase() + a.status.slice(1)}</span></td><td class="small">${a.owner}</td><td class="r">${a.status === 'baru' ? `<button class="btn sm primary" data-act="takeAnomaly" data-i="${i}">Ambil</button>` : ''}</td></tr>`).join('')}
    </tbody></table></div></div>
    <div class="section-title" style="margin-top:20px">Aturan aktif</div>
    <div class="grid sm-2">${['Rekening/QRIS diganti saat ada kampanye aktif → jeda kampanye + konfirmasi WA ke ketua', 'Target kampanye jauh di atas riwayat masjid → moderasi sebelum tampil', 'Banyak transaksi pembalik dalam waktu singkat → beri tahu Tim Keamanan', 'Nama/logo mirip masjid terverifikasi → tandai potensi peniruan', 'Pengurus baru ubah rekening < 24 jam → tahan 24 jam + kabari pengurus lama'].map((r) => `<div class="card row" style="--gap:12px;align-items:flex-start"><span class="icon-tile sm warn">${I('zap', 16)}</span><span class="small">${r}</span></div>`).join('')}</div>`;
  },
  verifikasi() {
    return `${U.pageHead('Verifikasi & tanda resmi', 'Tanda "Masjid Terverifikasi" tampil di situs publik masjid dan direktori. Bisa dicabut bila ada pelanggaran.')}
    <div class="grid lg-2">${D.verifications.map((v) => { const all = Object.values(v.docs).every(Boolean); return `<div class="card"><div class="row between"><b>${E(v.tenant)}</b><span class="xs muted">${v.age} lalu</span></div>
      <div class="stack" style="--gap:8px;margin:12px 0">${Object.entries(v.docs).map(([d, ok]) => `<div class="row small" style="--gap:8px"><span style="color:${ok ? 'var(--ok)' : 'var(--bad)'}">${I(ok ? 'check' : 'x', 16)}</span><span class="grow">${d}</span><button class="btn sm ghost" data-act="toastOnly" data-msg="Membuka ${d}">Lihat</button></div>`).join('')}</div>
      <div class="row" style="--gap:8px">${all ? `<button class="btn primary grow" data-act="audit" data-msg="Tanda Terverifikasi diberikan">${I('shield', 16)} Beri tanda resmi</button>` : `<button class="btn grow" data-act="toastOnly" data-msg="Permintaan dokumen rekening dikirim">Minta dokumen yang kurang</button>`}</div></div>`; }).join('')}
      <div class="card"><div class="card-head"><h3>Pratinjau tanda resmi</h3></div><div class="row" style="--gap:10px;padding:14px;border-radius:var(--r-sm);background:var(--surface-2)"><b class="display" style="font-size:1.1rem">Masjid Al-Ikhlas</b><span class="verified">${I('shield', 13)} Terverifikasi</span></div><p class="xs muted" style="margin-top:10px">Tampil di header situs jamaah dan kartu direktori. <a href="#/situs" style="font-weight:700">Lihat di situs</a></p><button class="btn sm danger" style="margin-top:10px" data-act="revokeBadge">Cabut tanda resmi…</button></div>
    </div>`;
  },
  data() {
    return `${U.pageHead('Permintaan data pribadi', 'Permintaan melihat/menghapus data dari perorangan (UU PDP) diteruskan ke masjid sebagai pemilik data. Cinta Masjid memantau tenggatnya.', `<button class="btn primary" data-act="toastOnly" data-msg="Form permintaan baru (simulasi)">${I('plus', 18)} Catat permintaan</button>`)}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Jenis</th><th>Masjid (pemilik data)</th><th>Diterima</th><th>Tenggat</th><th>Status</th></tr></thead><tbody>
    ${D.dsr.map((d) => `<tr><td class="mono">${d.id}</td><td>${d.type}</td><td>${E(d.tenant)}</td><td class="muted">${CM.tgl(d.received, { short: true })}</td><td>${CM.tgl(d.due, { short: true })} ${d.status === 'menunggu' ? U.badge('1 hari lagi', 'bad') : ''}</td><td>${U.status(d.status === 'diteruskan' ? 'diteruskan' : d.status)}</td></tr>`).join('')}
    </tbody></table></div></div>
    <div class="notice" style="margin-top:14px">${I('info', 18)}<span>Identitas pemohon disimpan terpisah dan hanya dikirim ke DKM terkait. Panel ini tidak membuka data warga untuk memenuhi permintaan.</span></div>`;
  },
};
CM.act.modDecide = (el) => CM.C.needReason(`${el.dataset.l} item moderasi`, el.dataset.l, el.dataset.msg);
CM.act.takeAnomaly = (el) => { const a = D.anomalies[el.dataset.i]; a.status = 'ditinjau'; a.owner = 'Anda'; CM.render(); U.toast('Ditangani oleh Anda · status Ditinjau'); };
CM.act.revokeBadge = () => CM.C.needReason('Cabut tanda terverifikasi', 'Cabut tanda', 'Tanda resmi dicabut · DKM diberi tahu', `<div class="notice bad">${I('alert', 18)}<span>Tanda langsung hilang dari situs jamaah dan direktori.</span></div>`);

/* ---------------- 8. MITRA ---------------- */
CM.C.reg({
  id: 'mitra', label: 'Mitra', icon: 'link',
  tabs: [{ id: 'duta', label: 'Duta Wilayah' }, { id: 'lembaga', label: 'Lembaga' }, { id: 'vendor', label: 'Penyedia Jasa' }],
  render(tab) {
    if (tab === 'lembaga') return `${U.pageHead('Lembaga mitra', 'BAZNAS/LAZ, ormas, dan Kemenag daerah mendapat dashboard gabungan wilayah lewat perjanjian kerja sama.', U.badge('Fase 4', 'gold'))}
      <div class="grid lg-2">${[['BAZNAS Kota Bandung', 'Total zakat tersalurkan, jumlah masjid aktif', 'Penjajakan'], ['Kemenag Kab. Sleman', 'Peta masjid aktif & transparansi', 'Draf PKS']].map(([n, s, st]) => `<div class="card"><div class="row between"><b>${n}</b>${U.badge(st, 'warn')}</div><div class="small muted" style="margin-top:4px">Akses: ${s}</div><div class="notice" style="margin-top:12px">${I('lock', 16)}<span class="small">Hanya data gabungan tingkat kabupaten ke atas. Syarat penggunaan melarang pemakaian politis.</span></div></div>`).join('')}</div>`;
    if (tab === 'vendor') return `${U.pageHead('Penyedia jasa pilihan', 'Daftar penyedia jasa untuk masjid, dengan ulasan dari DKM.', U.badge('Fase 4', 'gold'))}
      <div class="grid sm-2 lg-3">${[['Sound system', 'Akustika Audio', 4.8, 31], ['Karpet masjid', 'Sajadah Nusantara', 4.6, 54], ['Renovasi & kubah', 'Kubah Prima', 4.3, 12]].map(([c, n, r, q]) => `<div class="card"><div class="xs muted">${c}</div><b>${n}</b><div class="small" style="margin-top:6px;color:var(--accent-deep)">${I('star', 14)} ${String(r).replace('.', ',')} · ${q} ulasan DKM</div></div>`).join('')}</div>`;
    const rows = [...D.ambassadors].sort((a, b) => b.done / b.target - a.done / a.target);
    return `${U.pageHead('Duta Wilayah', 'Relawan per kota/kabupaten yang membantu masjid bergabung dan memeriksa klaim. Hanya bisa melihat data wilayahnya.', `<button class="btn primary" data-act="toastOnly" data-msg="Undangan Duta Wilayah dikirim">${I('plus', 18)} Undang duta</button>`)}
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Peringkat target pendampingan</h3><span class="xs muted">kuartal ini</span></div><div class="list" style="margin-top:6px">${rows.map((a, i) => { const p = (a.done / a.target) * 100; return `<div class="list-item" style="flex-wrap:wrap"><span class="rank ${i < 3 ? 'top' : ''}">${i + 1}</span>${U.avatar(a.name, 'sm')}<div class="grow" style="min-width:140px"><div class="title">${E(a.name)}</div><div class="meta">${a.region}</div></div><div style="width:min(220px,100%)"><div class="row between xs"><span>${a.done}/${a.target} masjid</span><b>${Math.round(p)}%</b></div>${U.progress(p, p >= 85 ? '' : 'gold')}</div>${p >= 85 ? `<button class="btn sm" data-act="toastOnly" data-msg="Sertifikat apresiasi dibuat (PDF)">${I('star', 14)} Sertifikat</button>` : ''}</div>`; }).join('')}</div></div>`;
  },
});

/* ---------------- 9. INSIGHT ---------------- */
CM.C.reg({
  id: 'insight', label: 'Wawasan Data', icon: 'chart',
  tabs: [{ id: 'indeks', label: 'Indeks Kemakmuran' }, { id: 'kebutuhan', label: 'Peta Kebutuhan Umat' }, { id: 'tren', label: 'Tren' }],
  render(tab) {
    const banner = `<div class="notice" style="margin-bottom:14px">${I('lock', 18)}<span>Semua wawasan memakai data gabungan tingkat kabupaten ke atas. Angka dari kurang dari 10 masjid/keluarga disembunyikan. Tidak ada data perorangan.</span></div>`;
    if (tab === 'kebutuhan') return `${U.pageHead('Peta kebutuhan umat', 'Gabungan anonim kebutuhan stok Lumbung Pangan dan jumlah mustahik per wilayah, untuk donatur besar dan program sosial perusahaan.', U.badge('Fase 4', 'gold'))}${banner}
      <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Kabupaten/kota</th><th>Kebutuhan stok terbuka</th><th class="r">Keluarga terlayani/bln</th><th class="r">Masjid berkontribusi</th></tr></thead><tbody>
      ${D.needs.map(([k, n, f, m]) => `<tr><td><b>${k}</b></td><td>${m >= 10 ? n : kGate(m, '')}</td><td class="r num">${kGate(m, fmt(f))}</td><td class="r num">${kGate(m, m)}</td></tr>`).join('')}
      </tbody></table></div></div>`;
    if (tab === 'tren') return `${U.pageHead('Tren nasional', 'Rata-rata infak Jumat, musim donasi, dan tema khutbah populer.', U.badge('Fase 4', 'gold'))}${banner}
      <div class="grid lg-2">
        <div class="card"><div class="card-head"><h3>Rata-rata infak Jumat per ukuran</h3></div><div class="stack" style="--gap:10px">${[['Musholla', 0.9], ['Masjid Jami', 3.8], ['Masjid Besar', 9.6], ['Masjid Raya/Agung', 28.4]].map(([l, v]) => `<div><div class="row between small"><span>${l}</span><b class="num">Rp${String(v).replace('.', ',')} jt</b></div>${U.progress((v / 28.4) * 100)}</div>`).join('')}</div></div>
        <div class="card"><div class="card-head"><h3>Tema khutbah populer</h3><span class="xs muted">dari tag arsip</span></div><div class="row wrap" style="--gap:8px">${[['Akhlak', 1], ['Keluarga', .8], ['Sedekah', .7], ['Muamalah', .55], ['Ibadah', .5], ['Sosial', .4], ['Lingkungan', .25]].map(([t, w]) => `<span class="tag-cloud" style="--w:${w}">${t}</span>`).join('')}</div></div>
      </div>`;
    return `${U.pageHead('Indeks Kemakmuran Masjid', 'Skor gabungan per kabupaten dari keaktifan kegiatan, transparansi, dan dampak sosial. Metodologi terbuka.', `${U.badge('Fase 4', 'gold')}<button class="btn" data-act="toastOnly" data-msg="Dokumen metodologi dibuka">${I('file', 18)} Metodologi</button>`)}${banner}
      ${listCard(D.indeks.map(([k, s, n], i) => `<div class="list-item"><span class="rank ${i < 3 && s ? 'top' : ''}">${s ? i + 1 : '–'}</span><div class="grow"><div class="title">${k}</div><div class="meta">${n} masjid aktif</div></div><div style="width:min(240px,45%)">${s ? `<div class="row between xs"><span>Indeks</span><b>${String(s).replace('.', ',')}</b></div>${U.progress(s)}` : kGate(n, '')}</div></div>`).join(''))}`;
  },
});

/* ---------------- 10. PRODUK & SUPPORT ---------------- */
CM.C.reg({
  id: 'produk', label: 'Bantuan & Fitur', icon: 'chat', badge: () => D.tickets.filter((t) => t.status !== 'selesai').length,
  tabs: [{ id: 'tiket', label: 'Tiket Bantuan' }, { id: 'flag', label: 'Uji Coba Fitur' }, { id: 'voting', label: 'Usulan Fitur' }],
  render(tab) {
    if (tab === 'flag') return `${U.pageHead('Uji coba fitur', 'Nyalakan fitur baru untuk masjid tertentu, wilayah tertentu, atau sebagian masjid dulu, sebelum dibuka untuk semua.')}
      ${listCard(D.flags.map((f, i) => `<div class="list-item" style="flex-wrap:wrap"><div class="grow" style="min-width:180px"><div class="title">${f.name} <span class="mono xs muted">${f.key}</span></div><div class="meta">${f.target} · ${f.phase}</div></div>${f.target === 'Sebagian masjid' ? `<div class="row" style="--gap:8px"><input type="range" class="range" min="0" max="100" step="5" value="${f.pct}" style="width:120px" data-flagpct="${i}" aria-label="Persen masjid untuk ${f.name}"><b class="num xs" data-flagv="${i}" style="width:34px">${f.pct}%</b></div>` : ''}${U.switch('', f.on, 'flagToggle', `data-i="${i}"`)}</div>`).join(''))}`;
    if (tab === 'voting') return `${U.pageHead('Usulan fitur', 'DKM mengusulkan dan memberi dukungan dari panelnya. Pemilik menandai statusnya.')}
      ${listCard(D.votes.sort((a, b) => b.v - a.v).map((v) => `<div class="list-item"><div class="vote">${I('down', 16).replace('m6 9 6 6 6-6', 'm6 15 6-6 6 6')}<b>${v.v}</b></div><div class="grow small" style="font-weight:600">${v.t}</div>${CM.C.role() === 'owner' ? `<select class="select" style="width:auto;min-height:36px;padding:4px 10px">${['dipertimbangkan', 'direncanakan', 'rilis'].map((s) => `<option ${s === v.s ? 'selected' : ''}>${s}</option>`).join('')}</select>` : U.badge(v.s, v.s === 'rilis' ? 'ok' : v.s === 'direncanakan' ? 'info' : '')}</div>`).join(''))}`;
    return `${U.pageHead('Tiket bantuan', 'Dikirim DKM dari panelnya. Target selesai kurang dari 48 jam.', U.badge('Median 31 jam', 'ok'))}
      <div class="stack">${D.tickets.map((t) => `<div class="card"><div class="row between wrap" style="--gap:8px"><div class="row" style="--gap:8px"><span class="kbd">${t.id}</span>${U.badge(t.pri, t.pri === 'Tinggi' ? 'bad' : t.pri === 'Sedang' ? 'warn' : '')}</div>${U.status(t.status)}</div>
        <div style="font-weight:700;margin-top:8px">${E(t.subject)}</div><div class="small muted">${E(t.tenant)} · ${t.age} lalu · ${t.who === '—' ? '<b style="color:var(--bad)">belum ditugaskan</b>' : 'ditangani ' + t.who}</div>
        ${t.status !== 'selesai' ? `<div style="margin-top:10px"><div class="row between xs"><span>Sisa waktu</span><b>${t.sla ? Math.round(t.sla * 0.48) + ' jam' : 'terlewat'}</b></div>${U.progress(t.sla, t.sla < 30 ? 'gold' : '')}</div>
        <div class="row wrap" style="--gap:8px;margin-top:12px">${t.who === '—' ? '<button class="btn sm" data-act="toastOnly" data-msg="Ditugaskan ke Anda">Ambil tiket</button>' : ''}<button class="btn sm" data-act="toastOnly" data-msg="Balasan terkirim ke panel & WA DKM">${I('send', 14)} Balas</button>${t.tenant === 'Masjid Al-Ikhlas' ? `<button class="btn sm primary" data-act="impRequest" data-t="${t.id}">${I('key', 14)} Minta akses bantuan</button>` : ''}<button class="btn sm ghost" data-act="toastOnly" data-msg="Tiket ditutup">Tutup</button></div>` : ''}
      </div>`).join('')}</div>`;
  },
});
CM.act.flagToggle = (el) => { D.flags[el.dataset.i].on = el.checked; U.toast(`${D.flags[el.dataset.i].name}: ${el.checked ? 'aktif' : 'nonaktif'}`, 'zap'); };
document.addEventListener('input', (e) => { if (e.target.matches('[data-flagpct]')) { const i = e.target.dataset.flagpct; D.flags[i].pct = Number(e.target.value); document.querySelector(`[data-flagv="${i}"]`).textContent = e.target.value + '%'; } });

/* ---------------- akses bantuan (impersonate) ---------------- */
CM.act.impRequest = (el) => U.sheet({
  title: 'Minta akses bantuan',
  body: `<div class="stack">
    <p class="small muted">Untuk tiket <b>${el.dataset.t}</b> · Masjid Al-Ikhlas. Akses hanya aktif setelah ketua atau bendahara menyetujui.</p>
    <div class="field"><label>Mode</label><div class="grid cols-2" style="--gap:8px">${[['read', 'Hanya lihat', 'Bawaan'], ['tulis', 'Boleh mengubah', 'Butuh persetujuan terpisah']].map(([v, l, d], i) => `<label class="option-card"><input type="radio" name="mode" value="${v}" ${i === 0 ? 'checked' : ''}><div><b class="small">${l}</b><div class="xs muted">${d}</div></div></label>`).join('')}</div></div>
    ${U.field('Durasi', U.select('dur', [['30', '30 menit'], ['60', '60 menit (maksimal)']], '60'))}
    ${U.field('Keperluan (dikirim ke DKM)', '<textarea class="textarea" name="reason">Memeriksa pengaturan publikasi laporan Oktober yang tidak tampil di situs.</textarea>')}
    <div class="notice">${I('info', 18)}<span>Panel DKM akan menampilkan pemberitahuan "Tim bantuan sedang membantu". Semua tindakan tercatat di Log Aktivitas masjid dan Catatan Aktivitas pengelola.</span></div>
  </div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="impSend" data-t="${el.dataset.t}">${I('send', 18)} Kirim permintaan</button>`,
});
CM.act.impSend = (el) => {
  const d = U.formData(document.querySelector('.sheet'));
  S().imp = { ticket: el.dataset.t, mode: d.mode === 'tulis' ? 'boleh mengubah' : 'hanya lihat', dur: Number(d.dur), state: 'menunggu', by: 'Nadia (Layanan)', reason: d.reason };
  D.audit.unshift({ who: 'Anda', act: `Meminta akses bantuan ${S().imp.mode} (tiket ${el.dataset.t})`, target: 'Masjid Al-Ikhlas', at: '2026-11-25 ' + nowHM(), ip: '103.28.xx.14' });
  CM.save(); U.close(); CM.render();
  U.sheet({ title: 'Permintaan terkirim', body: `<div class="stack" style="text-align:center"><span class="icon-tile lg gold" style="margin:0 auto">${I('clock', 26)}</span><p>Menunggu persetujuan ketua/bendahara Masjid Al-Ikhlas lewat WhatsApp dan panel DKM.</p></div>`, foot: `<button class="btn" data-act="close">Tutup</button><a class="btn primary" href="#/admin" data-act="close">Lihat dari sisi DKM ${I('right', 16)}</a>` });
};
CM.act.impApprove = () => {
  const imp = S().imp; const end = new Date(Date.now() + imp.dur * 60000);
  imp.state = 'aktif'; imp.until = end.toTimeString().slice(0, 5);
  CM.state.logs.unshift({ who: 'H. Sudirman', what: `Menyetujui akses bantuan ${imp.mode} ${imp.dur} menit untuk tim bantuan (tiket ${imp.ticket})`, mod: 'Pengurus', at: '2026-11-25 ' + nowHM() });
  CM.save(); CM.render(); U.toast('Akses bantuan disetujui · berakhir ' + imp.until, 'key');
};
CM.act.impDeny = () => { S().imp.state = 'selesai'; CM.save(); CM.render(); U.toast('Permintaan akses ditolak', 'x'); };
CM.act.impEnd = () => { S().imp.state = 'selesai'; CM.state.logs.unshift({ who: 'H. Sudirman', what: 'Mengakhiri sesi akses bantuan tim Cinta Masjid', mod: 'Pengurus', at: '2026-11-25 ' + nowHM() }); CM.save(); CM.render(); U.toast('Sesi bantuan diakhiri'); };

/* kartu & banner di panel DKM */
CM.C.dkmBanner = () => {
  const imp = S().imp;
  if (!imp || imp.state === 'selesai') return '';
  if (imp.state === 'menunggu') return `<div class="card imp-req" role="alert"><div class="row" style="--gap:12px;align-items:flex-start"><span class="icon-tile gold">${I('key')}</span><div class="grow"><b>Tim bantuan Cinta Masjid meminta akses bantuan</b><div class="small muted" style="margin-top:2px">${imp.mode} · ${imp.dur} menit · tiket ${imp.ticket} · oleh ${imp.by}</div><div class="small" style="margin-top:6px">“${E(imp.reason)}”</div></div></div><div class="row" style="--gap:8px;margin-top:12px;justify-content:flex-end"><button class="btn" data-act="impDeny">Tolak</button><button class="btn primary" data-act="impApprove">${I('check', 18)} Izinkan ${imp.dur} menit</button></div></div>`;
  return `<div class="imp-banner" role="status">${I('key', 16)}<span class="grow"><b>Tim bantuan sedang membantu</b> · ${imp.mode} · berakhir ${imp.until}</span><button class="btn sm on-dark" data-act="impEnd">Akhiri</button></div>`;
};

/* ---------------- 11. SISTEM ---------------- */
CM.C.reg({
  id: 'sistem', label: 'Pengaturan', icon: 'settings',
  tabs: [{ id: 'pengguna', label: 'Tim Pengelola' }, { id: 'audit', label: 'Catatan Aktivitas' }, { id: 'status', label: 'Status Layanan' }],
  render(tab) {
    const owner = CM.C.role() === 'owner';
    if (tab === 'audit') return `${U.pageHead('Catatan aktivitas', 'Siapa melakukan apa, kepada siapa, kapan, dan dari mana. Tidak bisa diubah; disimpan minimal 2 tahun.', owner ? `<button class="btn" data-act="exportX">${I('download', 18)} Ekspor (Pemilik)</button>` : U.badge('Ekspor hanya Pemilik', ''))}
      <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Waktu</th><th>Siapa</th><th>Tindakan</th><th>Sasaran</th><th>Alamat IP</th></tr></thead><tbody>${D.audit.map((a) => `<tr><td class="mono xs nowrap">${a.at}</td><td><b class="small">${E(a.who)}</b></td><td class="small">${E(a.act)}</td><td class="small muted">${E(a.target)}</td><td class="mono xs muted">${a.ip}</td></tr>`).join('')}</tbody></table></div></div>`;
    if (tab === 'status') return `${U.pageHead('Status layanan', 'Ditampilkan di halaman status publik status.cintamasjid.or.id.', `<button class="btn primary" data-act="toastOnly" data-msg="Pengumuman gangguan diterbitkan">${I('megaphone', 18)} Umumkan gangguan</button>`)}
      ${listCard(D.services.map(([n, s, u]) => `<div class="list-item"><span class="svc ${s}"></span><span class="grow title" style="font-weight:600">${n}</span><span class="xs muted">aktif 30 hari terakhir ${u}</span>${s === 'normal' ? U.badge('Normal', 'ok') : U.badge('Terganggu', 'warn')}</div>`).join(''))}
      <div class="notice warn" style="margin-top:14px">${I('alert', 18)}<span><b>Gangguan saat ini:</b> kode OTP WhatsApp terlambat terkirim sejak 05.40 WIB. Pengguna dialihkan masuk lewat tautan di email.</span></div>`;
    return `${U.pageHead('Tim pengelola', 'Semua akun wajib verifikasi 2 langkah. Peran menentukan menu yang bisa dibuka.', owner ? `<button class="btn primary" data-act="toastOnly" data-msg="Undangan terkirim · wajib aktifkan verifikasi 2 langkah saat masuk pertama kali">${I('plus', 18)} Undang</button>` : '')}
      ${listCard(D.users.map((u) => `<div class="list-item" style="flex-wrap:wrap">${U.avatar(u.name, 'sm')}<div class="grow" style="min-width:140px"><div class="title">${E(u.name)}</div><div class="meta">${u.last}</div></div>${U.badge(D.roles[u.role].label, u.role === 'owner' ? 'gold' : 'brand')}${u.twofa ? `<span class="small" style="color:var(--ok)">${I('lock', 14)} 2 langkah</span>` : `<span class="badge bad"><span class="dot"></span>Verifikasi 2 langkah belum aktif</span>`}${owner ? `<button class="btn sm ghost danger" data-act="toastOnly" data-msg="Akses dicabut · sesi aktif diakhiri">Cabut</button>` : ''}</div>`).join(''))}
      <div class="section-title" style="margin-top:22px">Keamanan</div>
      <div class="grid sm-3">${[['lock', 'Lama masuk', '8 jam, lalu masuk ulang'], ['shield', 'Batasi alamat IP', 'Opsional · nonaktif'], ['globe', 'Alamat khusus', 'pengelola.cintamasjid.or.id']].map(([ic, t, d]) => `<div class="card row" style="--gap:12px"><span class="icon-tile sm">${I(ic, 16)}</span><div><b class="small">${t}</b><div class="xs muted">${d}</div></div></div>`).join('')}</div>`;
  },
});

/* ================= HALAMAN PUBLIK: KLAIM MASJID ANDA ================= */
CM.claimPage = () => {
  const q = (CM.C.claimQ || '').toLowerCase();
  const step = CM.C.claimStep || 1;
  const sel = D.directory.find((d) => d.id === CM.C.claimSel);
  const res = D.directory.filter((d) => !q || (d.name + ' ' + d.kab).toLowerCase().includes(q)).sort((a, b) => (b.status === 'belum bergabung') - (a.status === 'belum bergabung')).slice(0, 6);
  const canClaim = (d) => d.status === 'belum bergabung';
  let body;
  if (step === 1) body = `
    <div class="adm-search" style="max-width:none">${I('search', 18)}<input class="input" id="claimQ" placeholder="Ketik nama masjid atau kota, mis. Baiturrahman Semarang" value="${E(CM.C.claimQ || '')}" aria-label="Cari masjid"></div>
    <div class="card pad-0" style="margin-top:12px"><div class="list">${res.map((d) => `<div class="list-item" style="flex-wrap:wrap"><span class="icon-tile sm">${I('mosque', 18)}</span><div class="grow" style="min-width:160px"><div class="title">${E(d.name)}</div><div class="meta">${d.type} · ${d.kab}, ${d.prov}</div></div>${canClaim(d) ? `<button class="btn sm primary" data-act="claimPick" data-id="${d.id}">Klaim</button>` : `<span class="xs muted">${d.status === 'aktif' || d.status === 'terverifikasi' ? 'Sudah dikelola DKM' : d.status === 'diklaim' ? 'Sedang diklaim' : 'Tidak tersedia'}</span>`}</div>`).join('') || U.empty('search', 'Masjid tidak ditemukan', 'Usulkan masjid baru agar masuk direktori.', '<button class="btn" data-act="toastOnly" data-msg="Usulan masjid baru dikirim untuk dimoderasi">Usulkan masjid</button>')}</div></div>
    <p class="xs muted" style="margin-top:10px">Data direktori bersumber dari SIMAS Kemenag, OpenStreetMap, dan usulan publik.</p>`;
  else if (step === 2) body = `
    <div class="card soft row" style="--gap:12px"><span class="icon-tile">${I('mosque')}</span><div><b>${E(sel.name)}</b><div class="small muted">${sel.kab}, ${sel.prov}</div></div></div>
    <form class="stack" onsubmit="return false" style="margin-top:14px">
      <div class="grid sm-2" style="--gap:12px">${U.field('Nama pemohon', '<input class="input" placeholder="Nama lengkap">')}${U.field('Jabatan di DKM', U.select('j', ['Ketua', 'Sekretaris', 'Bendahara', 'Pengurus lain']))}</div>
      ${U.field('Nomor WhatsApp', '<input class="input" inputmode="tel" placeholder="08xx xxxx xxxx">')}
      <div class="field"><label>Bukti (pilih minimal satu)</label>${['SK kepengurusan DKM', 'Foto papan nama masjid bersama pemohon', 'Surat keterangan RT/RW'].map((t) => `<label class="card dashed row" style="cursor:pointer;--gap:12px;padding:12px 14px"><input type="file" hidden data-act="toastFile"><span class="icon-tile sm">${I('upload', 16)}</span><span class="small grow">${t}</span><span class="xs muted">PDF/JPG</span></label>`).join('')}</div>
      <label class="check"><input type="checkbox" checked><span class="small">Saya menyatakan data yang diisi benar dan saya berwenang mewakili DKM.</span></label>
      <div class="row" style="--gap:10px"><button class="btn lg" data-act="claimBack">${I('left', 18)}</button><button class="btn primary lg grow" data-act="claimSubmit">Kirim klaim</button></div>
    </form>`;
  else body = `<div class="stack" style="text-align:center"><span class="icon-tile lg ok" style="margin:0 auto;width:72px;height:72px">${I('check', 34)}</span><h2 class="display" style="font-size:1.7rem">Klaim terkirim</h2><p class="muted">Nomor klaim <b class="mono">K-2292</b>. Tim kami atau Duta Wilayah setempat akan memverifikasi bukti, biasanya kurang dari 1×24 jam.</p>
    <div class="card" style="text-align:left"><div class="timeline"><div class="t done"><b>Klaim diterima</b><div class="xs muted">Baru saja</div></div><div class="t now"><b>Verifikasi bukti</b><div class="xs muted">Anda dikabari via WhatsApp</div></div><div class="t"><b>Situs masjid aktif</b><div class="xs muted">Nama & lokasi sudah terisi · lanjut pilih logo, kas awal, undang pengurus</div></div></div></div>
    <a class="btn" href="#/" data-act="claimReset">Kembali</a></div>`;
  return `<div class="claim">
    
    <section class="claim-hero ornament"><div class="in"><div class="eyebrow" style="color:var(--accent)">Gratis untuk DKM</div><h1>Klaim masjid Anda</h1><p>Lebih dari ${fmt(D.kpi.directory)} masjid dan musholla sudah ada di direktori kami. Temukan masjid Anda, kirim bukti, dan situsnya aktif tanpa mengetik ulang nama dan lokasi.</p></div></section>
    <main class="claim-main"><div class="steps" style="margin-bottom:18px">${[1, 2, 3].map((i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>${body}</main>
  </div>`;
};
CM.claimMount = () => { const i = document.getElementById('claimQ'); if (i) { i.addEventListener('input', () => { CM.C.claimQ = i.value; const pos = i.selectionStart; CM.render(); const n = document.getElementById('claimQ'); n.focus(); n.setSelectionRange(pos, pos); }); } };
CM.act.claimPick = (el) => { CM.C.claimSel = el.dataset.id; CM.C.claimStep = 2; CM.render(); };
CM.act.claimBack = () => { CM.C.claimStep = 1; CM.render(); };
CM.act.claimSubmit = () => { const d = D.directory.find((x) => x.id === CM.C.claimSel); d.status = 'diklaim'; D.claims.unshift({ id: 'K-2292', mosque: d.name, kab: d.kab, who: 'Pemohon baru (dari situs)', docs: ['SK DKM'], age: 'baru saja', status: 'menunggu', dispute: false }); CM.C.claimStep = 3; CM.render(); };
CM.act.claimReset = () => { CM.C.claimStep = 1; CM.C.claimQ = ''; location.hash = '#/'; };
})();

/* Cinta Masjid — Konsol Pemilik Platform: shell, peran, modul 1–6 */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const D = CM.CD;
const S = () => CM.state;

CM.C = { mods: {}, order: [] };
CM.C.reg = (m) => { CM.C.mods[m.id] = m; if (!CM.C.order.includes(m.id)) CM.C.order.push(m.id); };
CM.C.role = () => S().consoleRole || 'owner';
CM.C.can = (modId) => { const r = D.roles[CM.C.role()]; return r.mods === '*' || r.mods.includes(modId) || modId === 'command'; };
CM.C.readOnly = () => CM.C.role() === 'duta';
const fmt = (n) => CM.num(n);
const pctOf = (a, b) => (b ? (a / b) * 100 : 0);
const listCard = (rows) => `<div class="card pad-0"><div class="list">${rows}</div></div>`;
const kGate = (n, html) => (n >= 10 ? html : `<span class="badge" title="Disembunyikan: kurang dari 10, agar tidak bisa ditebak">${I('lock', 12)} &lt; 10</span>`);
CM.C.kGate = kGate;

/* ---------------- SHELL ---------------- */
CM.C.shell = (modId, tabId) => {
  const role = CM.C.role();
  let mod = CM.C.mods[modId] || CM.C.mods.command;
  const locked = !CM.C.can(mod.id);
  const tab = mod.tabs ? (mod.tabs.find((t) => t.id === tabId) || mod.tabs[0]) : null;
  const groups = { command: 'Operasional', konten: 'Konten & aturan', trust: 'Keamanan', insight: 'Pertumbuhan', produk: 'Layanan', sistem: '' };
  const nav = CM.C.order.map((id) => CM.C.mods[id]).map((m) => {
    const can = CM.C.can(m.id);
    const grp = groups[m.id] ? `<div class="grp">${groups[m.id]}</div>` : '';
    const badge = m.badge ? `<span class="count">${m.badge()}</span>` : '';
    return `${grp}<a href="#/console/${m.id}" class="${m.id === mod.id ? 'active' : ''} ${can ? '' : 'locked'}" ${can ? '' : 'aria-disabled="true" title="Tidak tersedia untuk peran ini"'}>${I(m.icon, 20)}<span>${m.label}</span>${can ? badge : `<span class="lock">${I('lock', 14)}</span>`}</a>`;
  }).join('');
  const content = locked
    ? `<div class="card" style="max-width:560px;margin:40px auto">${U.empty('lock', 'Tidak tersedia untuk peran ' + D.roles[role].label, 'Akses menu dibatasi sesuai peran tim. Ganti peran di kanan atas untuk mencoba.', '<a class="btn" href="#/console">Ke Beranda</a>')}</div>`
    : mod.render(tab ? tab.id : null);
  const bottom = [['command', 'grid', 'Beranda'], ['direktori', 'pin', 'Direktori'], ['tenant', 'building', 'Masjid'], ['trust', 'shield', 'Keamanan']];
  return `
  <div class="adm con" id="adm">
    <aside class="adm-side" aria-label="Navigasi panel pengelola">
      <div class="side-brand"><div><div class="wm">Cinta Masjid</div><div class="sub">Panel Pengelola · pengelola.cintamasjid.or.id</div></div></div>
      <div class="con-role">
        <label for="roleSel" class="xs" style="opacity:.6;display:block;margin-bottom:4px">Masuk sebagai</label>
        <select id="roleSel" class="select" data-act="setRole">${Object.entries(D.roles).map(([k, r]) => `<option value="${k}" ${k === role ? 'selected' : ''}>${r.label}</option>`).join('')}</select>
        <div class="xs" style="opacity:.6;margin-top:6px">${D.roles[role].desc}</div>
      </div>
      <nav class="side-nav">${nav}</nav>
      <div class="side-foot"><span class="avatar sm">HR</span><div class="grow"><div style="font-weight:600">Hafidz R.</div><div class="xs" style="opacity:.6">${I('lock', 11)} Verifikasi 2 langkah aktif</div></div><a class="icon-btn" href="#/" style="color:#fff" title="Keluar dari prototipe">${I('logout', 18)}</a></div>
    </aside>
    <div class="adm-scrim" data-act="drawer"></div>
    <div class="adm-body">
      <header class="adm-top">
        <button class="icon-btn menu-btn" data-act="drawer" aria-label="Buka menu">${I('menu')}</button>
        <div class="grow hide-desktop" style="min-width:0"><div class="title truncate">${mod.label}</div><div class="crumb truncate">Panel Pengelola · ${D.roles[role].label}</div></div>
        <div class="adm-search hide-mobile">${I('search', 18)}<input class="input" placeholder="Cari masjid, tiket, klaim…" aria-label="Cari"></div>
        <div class="grow hide-mobile"></div>
        <span class="badge gold hide-mobile">${I('shield', 12)} Tanpa akses data warga</span>
        <button class="icon-btn" data-act="conNotif" aria-label="Perlu perhatian">${I('bell')}<span class="pip"></span></button>
      </header>
      <main class="adm-main" id="main">
        ${CM.C.readOnly() ? `<div class="notice gold" style="margin-bottom:14px">${I('eye', 18)}<span>Mode Duta Wilayah: hanya <b>Kota Bandung</b>, dan hanya bisa melihat. Anda bisa membantu verifikasi klaim di wilayah ini.</span></div>` : ''}
        ${!locked && mod.tabs && mod.tabs.length > 1 ? U.tabs('/console/' + mod.id, mod.tabs, tab.id) : ''}
        ${content}
      </main>
    </div>
    <nav class="adm-bottom" aria-label="Navigasi cepat">
      ${bottom.map(([id, ic, l]) => `<a href="#/console/${id}" class="${mod.id === id ? 'active' : ''}">${I(ic, 22)}${l}</a>`).join('')}
      <button data-act="drawer">${I('menu', 22)}Menu</button>
    </nav>
  </div>`;
};
CM.act.setRole = (el) => { S().consoleRole = el.value; CM.save(); CM.render(); U.toast('Peran: ' + D.roles[el.value].label, 'user'); };
CM.act.conNotif = () => U.sheet({ title: 'Perlu perhatian', body: listCard(D.alerts.map((a) => `<a class="list-item" href="${a.h}" data-act="close"><span class="icon-tile sm ${a.tone}">${I(a.ic, 18)}</span><span class="grow"><span class="title" style="display:block;font-weight:600">${a.t}</span><span class="meta">${a.m}</span></span>${I('right', 16)}</a>`).join('')) });
CM.act.audit = (el) => U.toast((el && el.dataset.msg) || 'Tercatat di Catatan Aktivitas', 'check');
const needReason = (title, cta, msg, extra = '') => U.sheet({
  title, body: `<div class="stack">${extra}${U.field('Alasan (wajib, tercatat di Catatan Aktivitas)', '<textarea class="textarea" name="reason" placeholder="Tulis alasan keputusan"></textarea>')}</div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="reasonOk" data-msg="${E(msg)}">${cta}</button>`,
});
CM.C.needReason = needReason;
CM.act.reasonOk = (el) => { const r = document.querySelector('.sheet [name=reason]'); if (!r.value.trim()) { r.focus(); r.style.borderColor = 'var(--bad)'; return; } U.close(); U.toast(el.dataset.msg, 'check'); };

/* ---------------- 1. COMMAND CENTER ---------------- */
CM.C.reg({
  id: 'command', label: 'Beranda', icon: 'grid',
  render() {
    const k = D.kpi, max = Math.max(...D.growth);
    const f0 = D.funnel[0][1];
    return `${U.pageHead('Beranda pengelola', 'Kondisi Cinta Masjid secara nasional. Angka diperbarui setiap jam.', `<select class="select" style="width:auto;min-height:40px"><option>Seluruh Indonesia</option>${D.provinces.map((p) => `<option>${p.name}</option>`).join('')}</select><select class="select" style="width:auto;min-height:40px"><option>30 hari terakhir</option><option>Kuartal ini</option><option>Tahun 2026</option></select>`, 'Diperbarui 07.00 WIB')}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">
      ${[['Masjid di direktori', fmt(k.directory), 'SIMAS + OpenStreetMap + usulan', 'pin', '', 'direktori/daftar'], ['Terklaim', fmt(k.claimed), `${k.pending} klaim menunggu`, 'check', 'gold', 'direktori/klaim'], ['Aktif mingguan', fmt(k.active), `<span class="delta-up">▲ ${k.activeDelta}%</span> vs pekan lalu`, 'zap', 'ok', 'tenant/daftar'], ['Jamaah pengguna aplikasi', fmt(k.pwa), 'pengguna 30 hari', 'users', '', 'jamaah/statistik']]
        .map(([l, v, s, ic, t, h]) => `<a class="card stat" href="#/console/${h}"><div class="row between" style="align-items:flex-start"><div class="label">${l}</div><div class="icon-tile sm ${t}">${I(ic, 18)}</div></div><div class="value">${v}</div><div class="sub">${s}</div></a>`).join('')}
    </div>
    <div class="grid lg-2-1">
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>Tahapan masjid bergabung</h3><span class="small muted">dari klaim sampai laporan pertama</span></div>
          <div class="stack" style="--gap:12px">${D.funnel.map(([l, v], i) => `<div><div class="row between small"><span>${i + 1}. ${l}</span><b class="num">${fmt(v)} <span class="muted" style="font-weight:500">· ${Math.round(pctOf(v, f0))}%</span></b></div><div class="funnel-bar" style="width:${Math.max(18, pctOf(v, f0))}%"></div></div>`).join('')}</div>
          <div class="notice" style="margin-top:14px">${I('info', 18)}<span>Klaim yang berlanjut aktif <b>${Math.round(pctOf(D.funnel[2][1], f0))}%</b> (target ≥ 50%). Paling banyak berhenti di antara transaksi pertama dan laporan pertama.</span></div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Masjid baru per minggu</h3><span class="small muted">12 minggu</span></div>
          <div class="bars">${D.growth.map((g, i) => `<div class="bar"><i class="in" style="height:${(g / max) * 100}%;width:70%;max-width:26px" title="${g} masjid"></i><span>${i % 2 ? '' : 'M' + (i + 1)}</span></div>`).join('')}</div>
        </div>
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>Perlu perhatian</h3>${U.badge(D.alerts.length + ' baru', 'bad')}</div>
          <div class="list" style="margin:0 -18px -18px">${D.alerts.map((a) => `<a class="list-item" href="${a.h}"><span class="icon-tile sm ${a.tone}">${I(a.ic, 18)}</span><span class="grow" style="min-width:0"><span class="title" style="display:block;font-size:.9rem">${a.t}</span><span class="meta truncate" style="display:block">${a.m}</span></span>${I('right', 16, 'faint')}</a>`).join('')}</div>
        </div>
        <div class="grid cols-2">
          ${U.stat({ label: 'Transaksi tercatat', value: fmt(k.tx), sub: 'bulan ini', icon: 'receipt' })}
          ${U.stat({ label: 'Donasi online', value: CM.rpShort(k.donasi), sub: 'langsung ke rekening masjid', icon: 'heart', tone: 'gold' })}
        </div>
      </div>
    </div>`;
  },
});

/* ---------------- 2. DIREKTORI ---------------- */
const dirTone = { 'belum bergabung': '', diklaim: 'warn', aktif: 'ok', terverifikasi: 'brand', ditolak: 'bad', nonaktif: '' };
const dirColor = { 'belum bergabung': '#9AA29E', diklaim: 'var(--warn)', aktif: 'var(--ok)', terverifikasi: 'var(--brand)', ditolak: 'var(--bad)', nonaktif: '#555' };
const dirBadge = (s) => `<span class="badge ${dirTone[s]}">${s === 'terverifikasi' ? I('shield', 12) : '<span class="dot"></span>'}${s[0].toUpperCase() + s.slice(1)}</span>`;
CM.C.reg({
  id: 'direktori', label: 'Direktori Masjid', icon: 'pin', badge: () => D.claims.filter((c) => c.status === 'menunggu').length,
  tabs: [{ id: 'daftar', label: 'Daftar' }, { id: 'peta', label: 'Peta' }, { id: 'klaim', label: 'Klaim' }, { id: 'duplikat', label: 'Data Ganda' }, { id: 'impor', label: 'Impor Data' }],
  render(tab) { return DIR[tab](); },
});
const DIR = {
  daftar() {
    const f = CM.C.dirF || 'semua';
    const rows = D.directory.filter((d) => (f === 'semua' || d.status === f) && (!CM.C.readOnly() || d.kab === 'Kota Bandung'));
    return `${U.pageHead('Direktori masjid nasional', `${fmt(D.kpi.directory)} entri dari 3 sumber. DKM menemukan dan mengklaim masjidnya dari sini.`, CM.C.readOnly() ? '' : `<a class="btn" href="#/klaim" target="_blank">${I('external', 18)} Halaman klaim publik</a><button class="btn primary" data-act="toastOnly" data-msg="Form entri baru (simulasi)">${I('plus', 18)} Entri</button>`)}
    <div class="row wrap" style="--gap:8px;margin-bottom:12px"><div class="adm-search" style="flex:1;max-width:380px">${I('search', 18)}<input class="input" placeholder="Nama masjid, kelurahan, kabupaten…"></div><span class="xs muted">${I('zap', 12)} pencarian cepat · kurang dari 0,5 detik</span></div>
    <div class="chips" style="margin-bottom:12px">${['semua', 'belum bergabung', 'diklaim', 'aktif', 'terverifikasi', 'ditolak', 'nonaktif'].map((s) => `<button class="chip ${f === s ? 'active' : ''}" data-act="dirF" data-v="${s}">${s[0].toUpperCase() + s.slice(1)}</button>`).join('')}</div>
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Masjid</th><th>Jenis</th><th>Wilayah</th><th>Sumber</th><th>Status</th><th></th></tr></thead><tbody>
      ${rows.map((d) => `<tr><td><b>${E(d.name)}</b></td><td>${d.type}</td><td><div>${d.kab}</div><div class="xs muted">${d.prov}</div></td><td>${U.badge(d.src, d.src === 'SIMAS' ? '' : 'brand')}</td><td>${dirBadge(d.status)}</td><td class="r"><button class="btn sm ghost" data-act="toastOnly" data-msg="Detail entri ${E(d.name)}">${I('right', 16)}</button></td></tr>`).join('') || `<tr><td colspan="6">${U.empty('search', 'Tidak ada entri')}</td></tr>`}
    </tbody></table></div></div>`;
  },
  peta() {
    const ps = D.provinces.map((p) => ({ ...p, rate: pctOf(p.claimed, p.dir) }));
    const maxR = Math.max(...ps.map((p) => p.rate));
    const empty = [...ps].sort((a, b) => b.dir - b.claimed * 50 - (a.dir - a.claimed * 50)).slice(0, 4);
    return `${U.pageHead('Peta masjid', 'Titik per status, dikelompokkan saat peta diperkecil. Peta kepadatan menyorot wilayah yang masih sedikit bergabung.', `<div class="seg"><button class="active">Titik masjid</button><button>Peta kepadatan</button></div>`)}
    <div class="grid lg-2-1">
      <div class="card pad-0">
        <div class="map nusantara" role="img" aria-label="Peta sebaran masjid per status">
          <div class="isle" style="left:4%;top:14%;width:22%;height:30%;transform:rotate(-38deg)"></div>
          <div class="isle" style="left:26%;top:54%;width:38%;height:11%;transform:rotate(4deg)"></div>
          <div class="isle" style="left:40%;top:24%;width:20%;height:30%"></div>
          <div class="isle" style="left:62%;top:30%;width:10%;height:30%;transform:rotate(12deg)"></div>
          <div class="isle" style="left:58%;top:62%;width:16%;height:6%"></div>
          <div class="isle" style="left:80%;top:32%;width:18%;height:22%"></div>
          ${D.directory.map((d) => `<span class="dotp" style="left:${d.x}%;top:${d.y}%;background:${dirColor[d.status]}" title="${E(d.name)} · ${d.status}"></span>`).join('')}
          ${[[33, 57, 412], [47, 60, 288], [53, 61, 196], [16, 27, 74]].map(([x, y, n]) => `<span class="cluster" style="left:${x}%;top:${y}%">${n}</span>`).join('')}
        </div>
        <div class="row wrap" style="padding:12px 18px;--gap:14px">${Object.entries(dirColor).map(([k, c]) => `<span class="xs row" style="--gap:6px"><i style="width:10px;height:10px;border-radius:50%;background:${c}"></i>${k}</span>`).join('')}</div>
      </div>
      <div class="stack">
        <div class="card"><div class="card-head"><h3>Tingkat bergabung per provinsi</h3><span class="xs muted">terklaim / direktori</span></div>
          <div class="stack" style="--gap:8px">${ps.map((p) => `<div class="heat-row"><span class="small truncate">${p.name}</span><span class="heat" style="--h:${(p.rate / maxR).toFixed(2)}"></span><span class="xs num muted">${p.rate.toFixed(2).replace('.', ',')}%</span></div>`).join('')}</div>
        </div>
        <div class="card accent"><div class="eyebrow">Wilayah sepi · target perluasan</div><div class="stack" style="--gap:8px;margin-top:10px">${empty.map((p) => `<div class="row between small"><span>${p.name}</span><b class="num">${fmt(p.dir)} masjid · ${p.claimed} bergabung</b></div>`).join('')}</div></div>
      </div>
    </div>`;
  },
  klaim() {
    const ro = CM.C.readOnly();
    return `${U.pageHead('Klaim masjid', 'Verifikasi bukti pemohon. Klaim disetujui → akun masjid dibuat dengan nama & lokasi dari direktori; pengurus tinggal melanjutkan dari langkah 3.', `${U.badge('Median verifikasi 9 jam', 'ok')}`)}
    <div class="stack">${D.claims.map((c) => `<div class="card" ${c.dispute ? 'style="border-color:var(--warn)"' : ''}>
      <div class="row between wrap" style="--gap:8px"><div class="row" style="--gap:8px"><span class="kbd">${c.id}</span>${c.dispute ? U.badge('Sengketa klaim', 'warn') : ''}</div>${U.status(c.status === 'sengketa' ? 'menunggu' : c.status)}</div>
      <div style="font-weight:700;font-size:1.05rem;margin-top:8px">${E(c.mosque)} <span class="muted small" style="font-weight:500">· ${c.kab}</span></div>
      <div class="small muted">Pemohon: ${E(c.who)} · masuk ${c.age} lalu</div>
      <div class="row wrap" style="--gap:8px;margin-top:10px">${c.docs.length ? c.docs.map((d) => `<button class="btn sm" data-act="toastOnly" data-msg="Membuka dokumen: ${d}">${I('file', 16)} ${d}</button>`).join('') : '<span class="small" style="color:var(--bad)">Tidak ada dokumen bukti</span>'}</div>
      ${c.dispute ? `<div class="notice warn" style="margin-top:10px">${I('alert', 18)}<span>${E(c.other)}. Akun masjid dibekukan sementara; tangani manual dengan membandingkan SK terbaru.</span></div>` : ''}
      ${c.status === 'menunggu' || c.status === 'sengketa' ? `<div class="row wrap" style="--gap:8px;margin-top:12px">
        <button class="btn sm danger" data-act="claimReject" data-id="${c.id}">${I('x', 16)} Tolak</button>
        <button class="btn sm" data-act="toastOnly" data-msg="Permintaan dokumen tambahan dikirim via WA">Minta dokumen</button>
        ${c.dispute ? '<button class="btn sm" data-act="toastOnly" data-msg="Sengketa diteruskan ke Pemilik">Teruskan ke Pemilik</button>' : `<button class="btn sm primary" data-act="claimOk" data-id="${c.id}" ${ro && c.kab !== 'Kota Bandung' ? 'disabled' : ''}>${I('check', 16)} Setujui & aktifkan masjid</button>`}
      </div>` : ''}
    </div>`).join('')}</div>`;
  },
  duplikat() {
    return `${U.pageHead('Kemungkinan data ganda', 'Lokasinya berdekatan (< 100 m) dan namanya mirip. Pilih data yang dipertahankan, lalu gabungkan.')}
    <div class="stack">${D.dupes.map((d, i) => `<div class="card"><div class="grid sm-2" style="--gap:10px">${[d.a, d.b].map((x, j) => `<label class="option-card"><input type="radio" name="keep${i}" ${j === 0 ? 'checked' : ''}><div><div class="xs muted">${j === 0 ? 'Entri A' : 'Entri B'}</div><b class="small">${E(x)}</b></div></label>`).join('')}</div>
      <div class="row between wrap" style="margin-top:12px;--gap:8px"><span class="small muted">${d.kab} · jarak <b>${d.dist} m</b> · kemiripan nama <b>${d.sim}%</b></span><div class="row" style="--gap:8px"><button class="btn sm" data-act="toastOnly" data-msg="Ditandai bukan duplikat">Bukan duplikat</button><button class="btn sm primary" data-act="audit" data-msg="Data digabungkan · tercatat di Catatan Aktivitas">Gabungkan</button></div></div></div>`).join('')}</div>`;
  },
  impor() {
    return `${U.pageHead('Impor & sumber data', 'Izin penggunaan setiap sumber wajib dicek sebelum data dimasukkan. Asal data dicatat di setiap entri.', `<label class="btn primary" style="cursor:pointer"><input type="file" hidden accept=".csv" data-act="toastFile">${I('upload', 18)} Impor CSV</label>`)}
    <div class="stack">${D.sources.map((s) => `<div class="card"><div class="row between wrap" style="--gap:8px"><div class="row" style="--gap:12px"><span class="icon-tile">${I('layers')}</span><div><b>${s.name}</b><div class="small muted">${fmt(s.rows)} entri · diperbarui ${CM.tgl(s.updated, { short: true })}</div></div></div>${s.lic === 'terverifikasi' ? U.badge('Izin jelas', 'ok') : U.badge('Izin perlu dicek', 'warn')}</div><p class="small" style="margin-top:10px">${s.note}</p></div>`).join('')}</div>
    <div class="notice warn" style="margin-top:14px">${I('alert', 18)}<span>Impor dari sumber berstatus "perlu cek" diblokir sampai ketentuan penggunaannya dikonfirmasi.</span></div>`;
  },
};
CM.act.dirF = (el) => { CM.C.dirF = el.dataset.v; CM.render(); };
CM.act.claimOk = (el) => { const c = D.claims.find((x) => x.id === el.dataset.id); c.status = 'disetujui'; const d = D.directory.find((x) => x.name === c.mosque); if (d) d.status = 'aktif'; CM.render(); U.toast(`Akun ${c.mosque} dibuat · undangan melengkapi profil dikirim`, 'check'); };
CM.act.claimReject = (el) => needReason('Tolak klaim ' + el.dataset.id, 'Tolak klaim', 'Klaim ditolak · pemohon dikabari via WA');

/* ---------------- 3. TENANT ---------------- */
const scoreTone = (s) => (s >= 70 ? 'ok' : s >= 40 ? 'warn' : 'bad');
const scoreLabel = (s) => (s >= 70 ? 'Sehat' : s >= 40 ? 'Perlu perhatian' : 'Berisiko');
const scorePill = (s) => `<span class="score ${scoreTone(s)}"><b>${s}</b>${scoreLabel(s)}</span>`;
CM.C.reg({
  id: 'tenant', label: 'Masjid Terdaftar', icon: 'building',
  tabs: [{ id: 'daftar', label: 'Daftar' }, { id: 'detail', label: 'Detail' }, { id: 'kesehatan', label: 'Nilai Keaktifan' }, { id: 'domain', label: 'Domain' }],
  render(tab) { return TEN[tab](); },
});
const TEN = {
  daftar() {
    const rows = D.tenants.filter((t) => !CM.C.readOnly() || t.kab === 'Kota Bandung');
    return `${U.pageHead('Masjid terdaftar', `${fmt(D.kpi.claimed)} masjid sudah bergabung. Panel ini hanya menampilkan data umum masjid, bukan data warga atau transaksi.`)}
    <div class="row wrap" style="--gap:8px;margin-bottom:12px">${['Semua wilayah', 'Semua status', 'Semua skor'].map((o) => `<select class="select" style="width:auto;min-height:40px"><option>${o}</option></select>`).join('')}</div>
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Masjid</th><th>Wilayah</th><th>Modul</th><th>Bergabung</th><th>Nilai</th><th>Status</th></tr></thead><tbody>
      ${rows.map((t) => `<tr class="clickable" data-act="openTenant" data-id="${t.id}"><td><div class="row" style="--gap:10px">${U.avatar(t.name, 'sm')}<div><b>${E(t.name)}</b> ${t.verified ? `<span title="Terverifikasi" style="color:var(--brand)">${I('shield', 14)}</span>` : ''}<div class="xs muted">${t.domain || t.id + '.cintamasjid.or.id'}</div></div></div></td><td>${t.kab}</td><td>${t.mods}/10</td><td class="muted">${CM.tgl(t.since, { short: true })}</td><td>${scorePill(t.score)}</td><td>${U.status(t.status === 'suspend' ? 'dijeda' : t.status === 'ditinjau' ? 'menunggu' : 'aktif')}</td></tr>`).join('')}
    </tbody></table></div></div>`;
  },
  detail() {
    const t = D.tenants.find((x) => x.id === (CM.C.tenantSel || 'alikhlas'));
    const names = ['Aktivitas kas', 'Transparansi', 'Tim', 'Adopsi modul', 'Engagement'];
    const imp = S().imp;
    return `<div class="row wrap" style="--gap:8px;margin-bottom:14px"><select class="select" style="width:auto;min-height:40px" data-act="pickTenant">${D.tenants.map((x) => `<option value="${x.id}" ${x.id === t.id ? 'selected' : ''}>${x.name}</option>`).join('')}</select></div>
    ${U.pageHead(`${E(t.name)} ${t.verified ? `<span class="badge brand" style="vertical-align:6px">${I('shield', 12)} Terverifikasi</span>` : ''}`, `${t.kab}, ${t.prov} · bergabung ${CM.tgl(t.since)}`, CM.C.readOnly() ? '' : `<button class="btn" data-act="tenantAct" data-a="transfer">${I('users', 18)} Transfer kepemilikan</button><button class="btn danger" data-act="tenantAct" data-a="${t.status === 'suspend' ? 'aktifkan' : 'suspend'}">${t.status === 'suspend' ? 'Aktifkan kembali' : 'Bekukan'}</button>`)}
    ${t.id === 'alikhlas' && imp && imp.state !== 'selesai' ? `<div class="notice ${imp.state === 'aktif' ? 'ok' : 'gold'}" style="margin-bottom:14px">${I('key', 18)}<span>Akses bantuan ${imp.state === 'aktif' ? `<b>aktif</b> (${imp.mode}) · berakhir ${imp.until}` : '<b>menunggu persetujuan</b> ketua/bendahara'} · tiket ${imp.ticket}. ${imp.state === 'aktif' ? '<a href="#/admin" style="font-weight:700">Buka panel DKM</a>' : ''}</span></div>` : ''}
    <div class="grid lg-2-1">
      <div class="stack">
        <div class="grid sm-3">${U.stat({ label: 'Nilai keaktifan', value: `${t.score}`, sub: scoreLabel(t.score), icon: 'chart', tone: scoreTone(t.score) })}${U.stat({ label: 'Kuota WA bulan ini', value: `${fmt(t.wa)}`, sub: `dari ${fmt(t.waQ)} pesan`, icon: 'chat' })}${U.stat({ label: 'Penyimpanan', value: t.storage >= 1000 ? (t.storage / 1000).toFixed(1).replace('.', ',') + ' GB' : t.storage + ' MB', sub: 'nota & audio khutbah', icon: 'layers' })}</div>
        <div class="card"><div class="card-head"><h3>Rincian nilai</h3></div><div class="stack" style="--gap:10px">${names.map((n, i) => `<div><div class="row between small"><span>${n}</span><b class="num">${t.comps[i]}</b></div><div style="margin-top:4px">${U.progress(t.comps[i], t.comps[i] < 40 ? 'gold' : '')}</div></div>`).join('')}</div></div>
        <div class="card"><div class="card-head"><h3>Timeline aktivitas</h3><span class="xs muted">data umum saja</span></div><div class="timeline">${[['done', 'Hari ini', 'Laporan November disusun (belum dipublikasikan)'], ['done', '22 Nov', '2 pengeluaran diajukan untuk approval'], ['done', '12 Nov', 'Modul Kepedulian Umat dinyalakan'], ['done', '3 Nov', 'Laporan Oktober dipublikasikan'], ['', '2 Mar', 'Akun masjid dibuat dari klaim K-1022']].map(([c, d, x]) => `<div class="t ${c}"><b class="small">${d}</b><div class="small muted">${x}</div></div>`).join('')}</div></div>
      </div>
      <div class="stack">
        <div class="card"><div class="card-head"><h3>Pengurus</h3><span class="xs muted">nama & peran saja</span></div><div class="stack" style="--gap:8px">${[['H. Sudirman', 'Ketua'], ['Siti Aminah', 'Bendahara'], ['Dewi Lestari', 'Sekretaris']].slice(0, Math.min(3, t.pengurus)).map(([n, r]) => `<div class="row" style="--gap:10px">${U.avatar(n, 'sm')}<span class="grow small" style="font-weight:600">${n}</span>${U.badge(r, 'brand')}</div>`).join('')}${t.pengurus > 3 ? `<div class="xs muted">+${t.pengurus - 3} pengurus lain</div>` : ''}</div></div>
        <div class="card"><div class="card-head"><h3>Domain & modul</h3></div><div class="small"><div class="row between"><span class="muted">Domain</span><b class="mono">${t.domain || t.id + '.cintamasjid.or.id'}</b></div><div class="row between" style="margin-top:6px"><span class="muted">Modul aktif</span><b>${t.mods} dari 10</b></div></div></div>
        <div class="card"><div class="card-head"><h3>Tiket</h3><a class="small" href="#/console/produk/tiket" style="color:var(--brand);font-weight:600">Semua</a></div>${D.tickets.filter((x) => x.tenant === t.name).map((x) => `<div class="small"><span class="kbd">${x.id}</span> ${E(x.subject)}</div>`).join('') || '<div class="small muted">Tidak ada tiket terbuka</div>'}</div>
        <div class="notice">${I('lock', 18)}<span>Data warga, mustahik, penanya, dan penerima lumbung <b>tidak bisa dilihat</b> dari panel pengelola (UU PDP: masjid pemilik data, Cinta Masjid hanya memproses).</span></div>
      </div>
    </div>`;
  },
  kesehatan() {
    const W = S().healthW || D.healthWeights.map((w) => w[1]);
    const total = W.reduce((a, b) => a + b, 0);
    const risk = D.tenants.filter((t) => t.score < 40);
    const dist = [['Sehat (≥ 70)', 2104, 'ok'], ['Perlu perhatian (40–69)', 1486, 'warn'], ['Berisiko (< 40)', 628, 'bad']];
    return `${U.pageHead('Nilai keaktifan masjid', 'Nilai 0–100 dihitung setiap hari. Masjid yang turun ke "Berisiko" otomatis masuk antrean Tim Layanan untuk didampingi.')}
    <div class="grid sm-3" style="margin-bottom:16px">${dist.map(([l, n, t]) => U.stat({ label: l, value: fmt(n), sub: `${Math.round((n / D.kpi.claimed) * 100)}% dari masjid terdaftar`, icon: t === 'ok' ? 'check' : 'alert', tone: t })).join('')}</div>
    <div class="grid lg-2">
      <div class="card"><div class="card-head"><h3>Bobot penilaian</h3>${total === 100 ? U.badge('Total 100%', 'ok') : U.badge(`Total ${total}%`, 'bad')}</div>
        <div class="stack" style="--gap:14px" id="wForm">${D.healthWeights.map(([n, , d], i) => `<div><div class="row between small"><b>${n}</b><span class="num" data-wv="${i}">${W[i]}%</span></div><input type="range" min="0" max="60" step="5" value="${W[i]}" data-w="${i}" ${CM.C.role() !== 'owner' ? 'disabled' : ''} class="range" aria-label="Bobot ${n}"><div class="xs muted">${d}</div></div>`).join('')}</div>
        <div class="row" style="margin-top:14px;--gap:8px;justify-content:flex-end">${CM.C.role() === 'owner' ? `<button class="btn primary" data-act="saveW">Simpan bobot</button>` : '<span class="xs muted">Hanya Pemilik yang dapat mengubah bobot</span>'}</div>
      </div>
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Antrean Tim Layanan · berisiko</h3>${U.badge(risk.length + ' masjid', 'bad')}</div><div class="list" style="margin-top:6px">${risk.map((t) => `<div class="list-item">${U.avatar(t.name, 'sm')}<div class="grow" style="min-width:0"><div class="title truncate">${E(t.name)}</div><div class="meta">${t.kab} · ${t.pengurus} pengurus · ${t.mods} modul</div></div>${scorePill(t.score)}<button class="btn sm" data-act="toastOnly" data-msg="Ditugaskan ke Nadia (Layanan) · jadwal telepon dibuat">Tangani</button></div>`).join('')}</div></div>
    </div>`;
  },
  domain() {
    const ds = D.tenants.filter((t) => t.domain);
    return `${U.pageHead('Domain milik masjid', 'Masjid yang memakai domain sendiri dan dibantu atur gratis: status sambungan, gembok keamanan (SSL), dan pengingat perpanjangan di penyedianya.')}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Domain</th><th>Masjid</th><th>DNS</th><th>SSL</th><th>Kedaluwarsa</th><th></th></tr></thead><tbody>
      ${ds.map((t, i) => `<tr><td class="mono"><b>${t.domain}</b></td><td>${E(t.name)}</td><td>${U.badge('CNAME OK', 'ok')}</td><td>${U.badge('Aktif', 'ok')}</td><td>${['12 Okt 2027', '3 Des 2026'][i] || '20 Jan 2027'} ${i === 1 ? U.badge('8 hari lagi', 'warn') : ''}</td><td class="r"><button class="btn sm" data-act="toastOnly" data-msg="Pengingat perpanjangan di penyedia domain dikirim ke ketua via WA">${I('send', 14)} Ingatkan</button></td></tr>`).join('')}
      <tr><td class="mono"><b>masjidnurulhuda.com</b></td><td>Masjid Nurul Huda</td><td>${U.badge('CNAME belum terdeteksi', 'warn')}</td><td>${U.badge('Menunggu', '')}</td><td>—</td><td class="r"><button class="btn sm" data-act="toastOnly" data-msg="DNS diperiksa ulang">${I('refresh', 14)} Cek</button></td></tr>
    </tbody></table></div></div>`;
  },
};
CM.act.openTenant = (el) => { CM.C.tenantSel = el.dataset.id; location.hash = '#/console/tenant/detail'; };
CM.act.pickTenant = (el) => { CM.C.tenantSel = el.value; CM.render(); };
CM.act.tenantAct = (el) => {
  const a = el.dataset.a;
  if (a === 'transfer') return U.sheet({ title: 'Transfer kepemilikan', body: `<div class="stack"><p class="muted small">Dipakai saat ketua DKM berganti. Wajib melampirkan SK kepengurusan baru.</p>${U.field('Ketua baru (no. WhatsApp)', '<input class="input" inputmode="tel" placeholder="08xx">')}<label class="card dashed row" style="cursor:pointer;--gap:12px"><input type="file" hidden data-act="toastFile"><span class="icon-tile">${I('upload')}</span><span><b>Unggah SK DKM baru</b><br><span class="xs muted">PDF/JPG</span></span></label>${U.field('Alasan', '<textarea class="textarea" name="reason"></textarea>')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="reasonOk" data-msg="Kepemilikan dialihkan · ketua lama dinotifikasi">Alihkan</button>` });
  needReason(a === 'suspend' ? 'Bekukan akun masjid' : 'Aktifkan kembali', a === 'suspend' ? 'Bekukan' : 'Aktifkan', a === 'suspend' ? 'Masjid dibekukan · situs jamaah menampilkan halaman pemeliharaan' : 'Masjid aktif kembali', a === 'suspend' ? `<div class="notice bad">${I('alert', 18)}<span>Situs publik & panel DKM tidak dapat diakses selama dibekukan. Data tidak dihapus.</span></div>` : '');
};
CM.act.saveW = () => {
  const W = [...document.querySelectorAll('[data-w]')].map((i) => Number(i.value));
  if (W.reduce((a, b) => a + b, 0) !== 100) return U.toast('Total bobot harus 100%', 'alert');
  S().healthW = W; CM.save(); CM.render(); U.toast('Bobot disimpan · skor dihitung ulang malam ini');
};
document.addEventListener('input', (e) => {
  if (!e.target.matches('[data-w]')) return;
  document.querySelector(`[data-wv="${e.target.dataset.w}"]`).textContent = e.target.value + '%';
});

/* ---------------- 4. JAMAAH (AGREGAT) ---------------- */
CM.C.reg({
  id: 'jamaah', label: 'Statistik Jamaah', icon: 'users',
  tabs: [{ id: 'statistik', label: 'Statistik' }, { id: 'lintas', label: 'Akun Lintas Masjid' }],
  render(tab) {
    if (tab === 'lintas') return `${U.pageHead('Akun jamaah lintas masjid', 'Satu akun jamaah terhubung ke banyak masjid atas pilihan jamaah sendiri.', U.badge('Fase 4', 'gold'))}
      <div class="grid sm-3" style="margin-bottom:16px">${[['link', 'Donasi ke beberapa masjid', 'Satu akun, satu riwayat'], ['sunrise', 'Sedekah Subuh multi-masjid', 'Langganan di lebih dari satu masjid'], ['file', 'Rekap bukti zakat tahunan', 'Gabungan semua masjid']].map(([ic, t, d]) => `<div class="card"><span class="icon-tile gold" style="margin-bottom:10px">${I(ic)}</span><b>${t}</b><div class="small muted">${d}</div></div>`).join('')}</div>
      <div class="notice">${I('lock', 18)}<span>Setiap masjid hanya melihat data jamaah yang terhubung ke masjid tersebut. Panel ini hanya melihat jumlahnya, bukan identitas jamaah.</span></div>`;
    const rows = [['Jawa Barat', 182400, [18, 34, 31, 17], 9.8], ['Jawa Timur', 121080, [16, 33, 32, 19], 11.2], ['D.I. Yogyakarta', 40210, [21, 36, 28, 15], 7.4], ['Sulawesi Selatan', 9860, [19, 35, 30, 16], 12.1], ['Papua Barat Daya', 7, null, null]];
    return `${U.pageHead('Statistik jamaah gabungan', 'Tidak ada pencarian atau ekspor data perorangan. Angka dari kurang dari 10 orang/masjid disembunyikan agar tidak bisa ditebak siapa orangnya.')}
      <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Jamaah terdata', value: fmt(412860), sub: 'di 4.218 masjid', icon: 'users' })}${U.stat({ label: 'Pengguna aplikasi aktif', value: fmt(D.kpi.pwa), sub: '30 hari', icon: 'phone', tone: 'ok' })}${U.stat({ label: 'Berlabel mustahik', value: '10,6%', sub: 'rata-rata nasional', icon: 'hand', tone: 'gold' })}</div>
      <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Provinsi</th><th class="r">Jamaah</th><th>Usia &lt;18 · 18–40 · 41–60 · &gt;60</th><th class="r">Mustahik</th></tr></thead><tbody>
      ${rows.map(([p, n, ages, m]) => `<tr><td><b>${p}</b></td><td class="r num">${kGate(n, fmt(n))}</td><td>${ages ? `<div class="age-bar">${ages.map((a, i) => `<i style="flex:${a};opacity:${1 - i * 0.2}" title="${a}%"></i>`).join('')}</div>` : kGate(n, '')}</td><td class="r">${m ? String(m).replace('.', ',') + '%' : kGate(0, '')}</td></tr>`).join('')}
      </tbody></table></div></div>`;
  },
});

/* ---------------- 5. KEUANGAN PLATFORM ---------------- */
CM.C.reg({
  id: 'keuangan', label: 'Keuangan', icon: 'wallet',
  tabs: [{ id: 'dana', label: 'Dana Program' }, { id: 'biaya', label: 'Biaya per Masjid' }, { id: 'gateway', label: 'Cek Pembayaran Online' }],
  render(tab) {
    if (tab === 'biaya') {
      const rows = [...D.tenants].sort((a, b) => b.storage + b.wa - (a.storage + a.wa)).slice(0, 5);
      return `${U.pageHead('Biaya per masjid', 'Penyimpanan file, pesan WA, dan pemakaian server yang ditanggung program. Dipakai untuk merencanakan jatah gratis.', `<button class="btn" data-act="exportX">${I('download', 18)} Excel</button>`)}
      <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Biaya server November', value: 'Rp38,4 jt', icon: 'layers' })}${U.stat({ label: 'Rata-rata per masjid', value: 'Rp9.100', sub: 'per bulan', icon: 'building' })}${U.stat({ label: 'Ditanggung program', value: '100%', sub: 'masjid tidak dikenai biaya', icon: 'heart', tone: 'ok' })}</div>
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Masjid dengan biaya terbesar</h3></div><div class="table-wrap"><table class="table"><thead><tr><th>Masjid</th><th class="r">Pesan WA</th><th class="r">Penyimpanan</th><th class="r">Estimasi biaya</th></tr></thead><tbody>${rows.map((t) => `<tr><td><b>${E(t.name)}</b></td><td class="r num">${fmt(t.wa)}</td><td class="r num">${fmt(t.storage)} MB</td><td class="r num">${CM.rp(t.wa * 350 + t.storage * 2)}</td></tr>`).join('')}</tbody></table></div></div>`;
    }
    if (tab === 'gateway') return `${U.pageHead('Cek pembayaran online', 'Status notifikasi pembayaran dari bank/e-wallet per masjid. Cinta Masjid tidak menampung dana; uang langsung masuk ke rekening masjid.')}
      <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Masjid</th><th>Layanan bayar</th><th class="r">Berhasil</th><th class="r">Gagal</th><th>Terakhir</th><th></th></tr></thead><tbody>
      ${D.webhooks.map((w) => `<tr><td><b>${E(w.tenant)}</b></td><td>${w.gw}</td><td class="r num">${fmt(w.ok)}</td><td class="r num" style="color:${w.fail ? 'var(--bad)' : 'inherit'}">${w.fail}</td><td class="muted">${w.last}</td><td class="r">${w.fail ? `<button class="btn sm" data-act="audit" data-msg="${w.fail} transaksi dikirim ulang · aman, tidak tercatat dua kali">${I('refresh', 14)} Kirim ulang</button>` : U.badge('Sinkron', 'ok')}</td></tr>`).join('')}
      </tbody></table></div></div>`;
    const R = D.funds, max = Math.max(...R.map((r) => Math.max(r.yayasan + r.donatur + r.mitra, r.pakai)));
    const n = R[R.length - 1], masuk = n.yayasan + n.donatur + n.mitra;
    const jt = (v) => 'Rp' + String(v.toFixed(1)).replace('.', ',') + ' jt';
    return `${U.pageHead('Dana program', 'Cinta Masjid adalah program amal Cinta Sedekah: tanpa biaya bagi masjid, tanpa iklan. Halaman ini memantau sumber dan penggunaan dana program.', `<button class="btn" data-act="exportX">${I('download', 18)} Laporan bulanan</button>`)}
      <div class="grid sm-2 lg-4" style="margin-bottom:16px">${U.stat({ label: 'Dana masuk November', value: jt(masuk), sub: 'kontribusi yayasan, donatur, hibah', icon: 'heart', tone: 'ok' })}${U.stat({ label: 'Dana terpakai November', value: jt(n.pakai), sub: 'server, pesan WA, tim pendamping', icon: 'layers', tone: 'gold' })}${U.stat({ label: 'Cadangan dana', value: '± 14 bulan', sub: 'operasional tetap berjalan', icon: 'shield' })}${U.stat({ label: 'Donatur rutin', value: '386', sub: 'lewat cintasedekah.org', icon: 'users' })}</div>
      <div class="grid lg-2-1">
        <div class="card"><div class="card-head"><h3>Dana masuk vs terpakai (juta Rp)</h3><div class="legend"><span><i style="background:var(--brand)"></i>Yayasan</span><span><i style="background:var(--accent)"></i>Donatur</span><span><i style="background:#6B8F80"></i>Hibah mitra</span><span><i style="background:#C9CFCB"></i>Terpakai</span></div></div>
          <div class="bars" style="height:180px">${R.map((r) => `<div class="bar"><div class="row" style="--gap:3px;height:100%;align-items:flex-end;width:100%;justify-content:center"><div class="stack-b" style="height:${((r.yayasan + r.donatur + r.mitra) / max) * 100}%;width:45%"><i style="flex:${r.mitra || 0.0001};background:#6B8F80"></i><i style="flex:${r.donatur};background:var(--accent)"></i><i style="flex:${r.yayasan};background:var(--brand);border-radius:2px"></i></div><i style="height:${(r.pakai / max) * 100}%;width:35%;max-width:16px;background:#C9CFCB;border-radius:6px 6px 2px 2px"></i></div><span>${r.m}</span></div>`).join('')}</div>
        </div>
        <div class="card"><div class="card-head"><h3>Penggunaan November</h3></div>${[['Server & penyimpanan', 17.2], ['Pesan WhatsApp (jatah gratis masjid)', 11.6], ['Tim pendamping & bantuan', 7.4], ['Bantuan pengaturan domain', 2.2]].map(([l, v]) => `<div style="margin-bottom:12px"><div class="row between small"><span>${l}</span><b class="num">${jt(v)}</b></div>${U.progress((v / n.pakai) * 100)}</div>`).join('')}
          <div class="notice ok" style="margin-top:6px">${I('info', 18)}<span>Bantuan domain hanya berupa pendampingan. Biaya domain dibayar masjid langsung ke penyedia; program tidak menerima uang dari masjid.</span></div></div>
      </div>`;
  },
});

/* ---------------- 6. KONTEN GLOBAL ---------------- */
CM.C.reg({
  id: 'konten', label: 'Konten Bersama', icon: 'book',
  tabs: [{ id: 'hadits', label: 'Hadits' }, { id: 'template', label: 'Format Siap Pakai' }, { id: 'kalender', label: 'Kalender Hijriah' }, { id: 'umum', label: 'Pengumuman ke DKM' }],
  render(tab) {
    if (tab === 'template') return `${U.pageHead('Format siap pakai', 'Dipakai bersama oleh semua masjid. Perubahan berlaku untuk masjid yang belum mengubah formatnya sendiri.')}
      <div class="grid sm-2 lg-3">${D.templates.map(([ic, t, d]) => `<div class="card"><span class="icon-tile gold" style="margin-bottom:10px">${I(ic)}</span><b>${t}</b><div class="small muted">${d}</div><button class="btn sm" style="margin-top:12px" data-act="toastOnly" data-msg="Pengubah format (simulasi)">${I('edit', 14)} Ubah</button></div>`).join('')}</div>`;
    if (tab === 'kalender') return `${U.pageHead('Kalender Hijriah & momen', 'Tanggal ditetapkan admin mengikuti penetapan pemerintah (sidang isbat). Tanggal ini otomatis menyesuaikan fitur di semua masjid.')}
      ${listCard(D.hijri.map((h) => `<div class="list-item" style="flex-wrap:wrap"><span class="icon-tile ${h.status === 'ditetapkan' ? '' : 'gold'}">${I('moon')}</span><div class="grow" style="min-width:0"><div class="title">${h.name}</div><div class="meta">${CM.tgl(h.date, { day: true })} · memicu: ${h.trig}</div></div>${h.status === 'ditetapkan' ? U.badge('Ditetapkan', 'ok') : U.badge('Perkiraan hisab', 'warn')}<button class="btn sm" data-act="audit" data-msg="Tanggal ditetapkan · jadwal otomatis di semua masjid diperbarui">${h.status === 'ditetapkan' ? 'Ubah' : 'Tetapkan'}</button></div>`).join(''))}
      <div class="notice gold" style="margin-top:14px">${I('info', 18)}<span>Setelah sidang isbat, Tim Konten menetapkan tanggal resmi. Mode Ramadhan, periode zakat fitrah, dan periode qurban di semua masjid menyesuaikan otomatis.</span></div>`;
    if (tab === 'umum') return `${U.pageHead('Pengumuman ke DKM', 'Pesan dari tim Cinta Masjid ke semua atau sebagian DKM, lewat panel dan WhatsApp.')}
      <div class="grid lg-2-1"><div class="card"><div class="stack">
        ${U.field('Judul', '<input class="input" value="Modul Qurban 1448 H sudah tersedia">')}
        ${U.field('Pesan', '<textarea class="textarea">Assalamu\'alaikum pengurus DKM. Modul Qurban kini bisa dinyalakan dari Pengaturan → Modul, lengkap dengan tabungan qurban dan kupon QR.</textarea>')}
        ${U.field('Sasaran', `<div class="chips" style="flex-wrap:wrap">${['Semua DKM · 4.218', 'Wilayah: Jawa Barat', 'Modul ZIS aktif', 'Skor berisiko'].map((s, i) => `<button class="chip ${i === 0 ? 'active' : ''}" type="button">${s}</button>`).join('')}</div>`)}
        <div class="row" style="--gap:10px"><label class="check"><input type="checkbox" checked><span class="small">Banner di panel DKM</span></label><label class="check"><input type="checkbox"><span class="small">WhatsApp ke ketua</span></label></div>
        <button class="btn primary" data-act="audit" data-msg="Pengumuman terkirim ke 4.218 DKM">${I('send', 18)} Kirim</button>
      </div></div>
      ${listCard(['Fitur Laporan PDF baru (12 Nov)', 'Jadwal pemeliharaan server 2 Nov 01.00', 'Pelatihan online bendahara (28 Okt)'].map((t) => `<div class="list-item"><span class="icon-tile sm">${I('megaphone', 16)}</span><span class="grow small">${t}</span></div>`).join(''))}</div>`;
    return `${U.pageHead('Bank hadits', 'Dipakai fitur Hadits Harian di semua masjid. Hanya teks dengan izin terjemahan yang jelas yang boleh tayang.', `<button class="btn primary" data-act="addHadith">${I('plus', 18)} Hadits</button>`)}
      <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Total entri', value: '1.246', icon: 'book' })}${U.stat({ label: 'Lisensi jelas', value: '1.198', sub: '48 menunggu', icon: 'check', tone: 'ok' })}${U.stat({ label: 'Rotasi nasional', value: 'Harian', sub: 'dipakai 3.870 masjid', icon: 'refresh', tone: 'gold' })}</div>
      <div class="stack">${CM.state.hadith.map((h, i) => `<div class="card hadith"><div class="row between wrap" style="--gap:6px;margin-bottom:6px"><div class="row" style="--gap:6px">${U.badge(h.grade, 'ok')}${U.badge(['Ilmu', 'Akhlak', 'Sedekah', 'Istiqamah', 'Akhlak'][i], 'brand')}</div>${i === 4 ? U.badge('Izin terjemahan: menunggu', 'warn') : U.badge('Izin jelas', 'ok')}</div><div class="arab">${h.ar}</div><blockquote>“${E(h.id)}”</blockquote><cite>${h.src} · no. ${[5027, 2989, 2588, 6464, 1956][i]}</cite></div>`).join('')}</div>`;
  },
});
CM.act.addHadith = () => U.sheet({ title: 'Hadits baru', body: `<div class="stack">${U.field('Teks Arab', '<textarea class="textarea arab" dir="rtl"></textarea>')}${U.field('Terjemahan', '<textarea class="textarea"></textarea>')}<div class="grid cols-2" style="--gap:10px">${U.field('Kitab', '<input class="input" placeholder="HR. Bukhari">')}${U.field('Nomor', '<input class="input" inputmode="numeric">')}</div><div class="grid cols-2" style="--gap:10px">${U.field('Derajat', U.select('g', ['Shahih', 'Hasan', 'Dhaif (tidak ditayangkan)']))}${U.field('Status izin terjemahan', U.select('l', ['Jelas', 'Menunggu konfirmasi']))}</div>${U.field('Tag tema', '<input class="input" placeholder="Sedekah, Akhlak…">')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Hadits masuk antrean tinjau Tim Konten">Simpan</button>` });
})();

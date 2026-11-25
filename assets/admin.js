/* Cinta Masjid — Panel Admin DKM: shell, Beranda, Keuangan */
window.CM = window.CM || {};
(() => {
const { icon: I, ui: U, esc: E } = CM;

CM.A = { mods: {}, order: [] };
CM.A.reg = (mod) => { CM.A.mods[mod.id] = mod; if (!CM.A.order.includes(mod.id)) CM.A.order.push(mod.id); };
CM.act = CM.act || {};

/* ---------------- SHELL ---------------- */
CM.A.navItems = () => CM.A.order.map((id) => CM.A.mods[id]).filter((m) => !m.toggle || CM.state.modules[m.toggle]);

CM.A.shell = (modId, tabId) => {
  const mod = CM.A.mods[modId] || CM.A.mods.beranda;
  const tab = mod.tabs ? (mod.tabs.find((t) => t.id === tabId) || mod.tabs[0]) : null;
  const pend = CM.pending().length;
  const p = CM.state.profile;
  const nav = CM.A.navItems().map((m, i) => {
    const badge = m.id === 'keuangan' && pend ? `<span class="count">${pend}</span>` : (m.id === 'komunikasi' ? '<span class="count">2</span>' : '');
    const grp = i === 0 ? '<div class="grp">Utama</div>' : m.id === 'pengurus' ? '<div class="grp">Organisasi</div>' : m.id === 'kepedulian' ? '<div class="grp">Sosial</div>' : '';
    return `${grp}<a href="#/admin/${m.id}" class="${m.id === mod.id ? 'active' : ''}">${I(m.icon, 20)}<span>${m.label}</span>${badge}</a>`;
  }).join('');
  const content = mod.render(tab ? tab.id : null);
  const bottom = [['beranda', 'home', 'Beranda'], ['keuangan', 'wallet', 'Keuangan'], null, ['ibadah', 'moon', 'Ibadah']];
  return `
  <div class="adm" id="adm">
    <aside class="adm-side ornament" aria-label="Navigasi admin">
      <div class="side-brand">
        <div>
          <div class="wm">Cinta Masjid</div>
          <div class="sub">Panel DKM</div>
        </div>
      </div>
      <button class="mosque-switch" data-act="switchMosque">
        ${p.logoImg ? `<img src="${p.logoImg}" alt="" style="width:34px;height:34px;border-radius:9px;object-fit:cover">` : `<span class="avatar sm" style="background:var(--accent);color:var(--brand-deep)">${E(CM.initials(p.short))}</span>`}
        <span class="grow"><span class="truncate" style="display:block;font-weight:600;font-size:.9rem">${E(p.name)}</span><span class="xs" style="opacity:.6">${E(CM.siteUrl())}</span></span>
        ${I('down', 16)}
      </button>
      <nav class="side-nav">${nav}</nav>
      <div class="side-foot">
        <span class="avatar sm">HS</span>
        <div class="grow"><div style="font-weight:600">H. Sudirman</div><div class="xs" style="opacity:.6">Ketua DKM</div></div>
        <a class="icon-btn" href="#/" style="color:#fff" title="Keluar dari prototipe">${I('logout', 18)}</a>
      </div>
    </aside>
    <div class="adm-scrim" data-act="drawer"></div>
    <div class="adm-body">
      <header class="adm-top">
        <button class="icon-btn menu-btn" data-act="drawer" aria-label="Buka menu">${I('menu')}</button>
        <div class="grow hide-desktop" style="min-width:0">
          <div class="title truncate">${mod.label}</div>
          <div class="crumb truncate">${E(p.name)}</div>
        </div>
        <div class="adm-search hide-mobile">${I('search', 18)}<input class="input" placeholder="Cari transaksi, warga, agenda…" aria-label="Cari"></div>
        <div class="grow hide-mobile"></div>
        <button class="icon-btn" data-act="textSize" title="Ukuran teks" aria-label="Ubah ukuran teks">${I('type')}</button>
        <a class="icon-btn" href="#/situs" title="Lihat situs publik" aria-label="Lihat situs publik">${I('globe')}</a>
        <button class="icon-btn" data-act="notif" aria-label="Notifikasi">${I('bell')}<span class="pip"></span></button>
        <span class="avatar sm hide-mobile" style="margin-left:4px">HS</span>
      </header>
      <main class="adm-main" id="main">
        ${CM.C && CM.C.dkmBanner ? CM.C.dkmBanner() : ''}
        ${mod.tabs && mod.tabs.length > 1 ? U.tabs('/admin/' + mod.id, mod.tabs, tab.id) : ''}
        ${content}
      </main>
    </div>
    <nav class="adm-bottom" aria-label="Navigasi cepat">
      ${bottom.map((b) => b ? `<a href="#/admin/${b[0]}" class="${mod.id === b[0] ? 'active' : ''}">${I(b[1], 22)}${b[2]}</a>` : `<button data-act="quickAdd" aria-label="Catat transaksi"><span class="fab">${I('plus', 26)}</span></button>`).join('')}
      <button data-act="drawer">${I('grid', 22)}Menu</button>
    </nav>
  </div>`;
};

CM.act.drawer = () => document.getElementById('adm')?.classList.toggle('drawer-open');
CM.act.textSize = () => { CM.state.textSize = CM.state.textSize === 'besar' ? 'normal' : 'besar'; CM.applyTheme(); CM.save(); U.toast(CM.state.textSize === 'besar' ? 'Teks besar aktif' : 'Teks normal'); };
CM.act.switchMosque = () => U.sheet({
  title: 'Pilih masjid',
  body: `<p class="muted small" style="margin-bottom:12px">Satu akun bisa menjadi pengurus di beberapa masjid dengan peran berbeda.</p>
  <div class="card pad-0"><div class="list">
    <button class="list-item" data-act="close"><span class="avatar">${CM.initials(CM.state.profile.short)}</span><span class="grow"><span class="title">${E(CM.state.profile.name)}</span><br><span class="meta">Ketua DKM</span></span>${I('check', 18)}</button>
    <button class="list-item" data-act="close"><span class="avatar">AN</span><span class="grow"><span class="title">Musholla An-Nur</span><br><span class="meta">Penasihat · RW 08</span></span></button>
  </div></div>
  <div class="notice gold" style="margin-top:14px">${I('building', 20)}<div><b>Multi-masjid (yayasan)</b> — kelola beberapa masjid/musholla dari satu dasbor. Segera hadir.</div></div>`,
});
CM.act.notif = () => U.sheet({
  title: 'Notifikasi',
  body: `<div class="card pad-0"><div class="list">
    ${[['wallet', 'warn', '2 pengeluaran menunggu persetujuan Anda', '10 menit lalu', '#/admin/keuangan/approval'],
       ['chat', '', '2 pertanyaan baru di Tanya Ustadz', '1 jam lalu', '#/admin/komunikasi/tanya'],
       ['basket', 'bad', 'Stok gula & telur di bawah batas minimum', 'Hari ini', '#/admin/kepedulian/stok'],
       ['refresh', 'bad', '1 langganan Sedekah Subuh gagal ditagih', 'Kemarin', '#/admin/zis/subuh'],
       ['moon', 'ok', 'Bilal Jumat belum konfirmasi (Dimas Pratama)', 'Kemarin', '#/admin/ibadah/petugas']]
      .map(([ic, t, txt, w, h]) => `<a class="list-item" href="${h}" data-act="close"><span class="icon-tile sm ${t}">${I(ic, 18)}</span><span class="grow"><span class="title" style="font-weight:500">${txt}</span><br><span class="meta">${w}</span></span>${I('right', 16)}</a>`).join('')}
  </div></div>`,
});

/* ---------------- BERANDA ---------------- */
CM.A.reg({
  id: 'beranda', label: 'Beranda', icon: 'home',
  render() {
    const s = CM.state, pend = CM.pending();
    const inM = CM.monthSum('masuk'), outM = CM.monthSum('keluar');
    const now = new Date();
    const next = CM.nextPrayer();
    const j = s.jumat[0];
    const max = Math.max(...s.monthly.map((m) => Math.max(m.in, m.out)));
    const low = s.lumbung.items.filter((i) => i.stock < i.min);
    const tasks = [
      ...pend.map((t) => ({ ic: 'wallet', tone: 'warn', t: `Setujui pengeluaran ${CM.rp(t.amount)}`, m: `${t.note} · ${CM.kasName(t.kas)}`, h: '#/admin/keuangan/approval' })),
      { ic: 'chat', tone: '', t: '2 pertanyaan Tanya Ustadz baru', m: '1 ditandai perlu tindak lanjut', h: '#/admin/komunikasi/tanya' },
      low.length ? { ic: 'basket', tone: 'bad', t: `Stok lumbung menipis: ${low.map((l) => l.name.toLowerCase()).join(', ')}`, m: 'Di bawah ambang minimum', h: '#/admin/kepedulian/stok' } : null,
      { ic: 'refresh', tone: 'bad', t: 'Sedekah Subuh gagal ditagih', m: '1 jamaah · percobaan ke-2 dari 3', h: '#/admin/zis/subuh' },
      { ic: 'book', tone: 'gold', t: '2 santri belum bayar SPP November', m: 'TPQ Al-Ikhlas', h: '#/admin/ibadah/tpq' },
    ].filter(Boolean);
    return `
    <div class="page-head">
      <div>
        <div class="eyebrow" style="margin-bottom:6px">${CM.tgl(CM.todayISO(now), { day: true })} · ${CM.hijri(now)}</div>
        <h1>Assalamu'alaikum, Pak Sudirman</h1>
        <p>Berikut ringkasan ${E(s.profile.name)} hari ini.</p>
      </div>
      <div class="row wrap" style="--gap:8px">
        <a class="btn" href="#/tv" target="_blank">${I('tv', 18)} Mode TV</a>
        <button class="btn primary" data-act="quickAdd">${I('plus', 18)} Catat transaksi</button>
      </div>
    </div>

    <div class="card soft" style="margin-bottom:16px">
      <div class="row between wrap" style="--gap:12px">
        <div class="row" style="--gap:14px"><div class="icon-tile gold">${I('sparkle')}</div>
          <div><div style="font-weight:700">Lengkapi profil masjid — 3 dari 5 langkah</div><div class="small muted">Undang pengurus dan unggah logo agar situs terasa milik sendiri.</div></div></div>
        <div class="row" style="--gap:8px"><div style="width:120px">${U.progress(60)}</div><a class="btn sm" href="#/admin/pengaturan/tampilan">Lanjutkan</a></div>
      </div>
    </div>

    <div class="grid lg-2-1">
      <div class="stack">
        <div class="card brand lift ornament" style="--orn-color:#fff;--orn-opacity:.06;padding:22px">
          <div class="row between"><span class="muted small" style="font-weight:600">Total saldo semua kas</span><a href="#/admin/keuangan/kas" class="btn sm on-dark">Rincian ${I('right', 14)}</a></div>
          <div class="display num" style="font-size:2.4rem;margin:6px 0 14px">${CM.rp(CM.totalSaldo())}</div>
          <div class="chips" style="--gap:8px">
            ${s.kas.map((k) => `<div style="flex:none;background:rgb(255 255 255 / .1);border:1px solid rgb(255 255 255 / .14);border-radius:var(--r-sm);padding:8px 12px"><div class="xs" style="opacity:.7">${k.name}</div><div class="num" style="font-weight:700">${CM.rpShort(CM.saldo(k.id))}</div></div>`).join('')}
          </div>
        </div>
        <div class="grid cols-2">
          ${U.stat({ label: 'Pemasukan November', value: CM.rpShort(inM), sub: '<span class="delta-up">▲ 8%</span> dari Oktober', icon: 'in', tone: 'ok' })}
          ${U.stat({ label: 'Pengeluaran November', value: CM.rpShort(outM), sub: `${pend.length} menunggu persetujuan`, icon: 'out', tone: 'gold' })}
        </div>
        <div class="card">
          <div class="card-head"><h3>Arus kas 6 bulan</h3><div class="legend"><span><i style="background:var(--brand)"></i>Masuk</span><span><i style="background:var(--accent)"></i>Keluar</span></div></div>
          <div class="bars">${s.monthly.map((m) => `<div class="bar"><div class="row" style="--gap:3px;height:100%;align-items:flex-end;width:100%;justify-content:center"><i class="in" style="height:${(m.in / max) * 100}%;width:40%;max-width:18px" title="Masuk Rp${m.in} jt"></i><i class="out" style="height:${(m.out / max) * 100}%;width:40%;max-width:18px" title="Keluar Rp${m.out} jt"></i></div><span>${m.m}</span></div>`).join('')}</div>
        </div>
      </div>

      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>Tugas menunggu</h3>${U.badge(tasks.length + ' tugas', 'warn')}</div>
          <div class="list" style="margin:0 -18px -18px">
            ${tasks.map((t) => `<a class="list-item" href="${t.h}"><span class="icon-tile sm ${t.tone}">${I(t.ic, 18)}</span><span class="grow" style="min-width:0"><span class="title" style="display:block;font-size:.92rem">${t.t}</span><span class="meta truncate" style="display:block">${t.m}</span></span>${I('right', 16, 'faint')}</a>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h3>Shalat berikutnya</h3><a class="small" href="#/admin/ibadah/jadwal" style="color:var(--brand);font-weight:600">Atur</a></div>
          <div class="row between"><div><div class="display" style="font-size:1.6rem">${next.name} · ${next.shown}</div><div class="small muted">dalam <b class="num" data-countdown>${CM.fmtCountdown(next.diffSec)}</b> · iqamah +${next.iq} menit</div></div><div class="icon-tile lg gold">${I('moon', 24)}</div></div>
        </div>
      </div>
    </div>

    <div class="grid lg-2" style="margin-top:16px">
      <div class="card">
        <div class="card-head"><h3>Agenda 7 hari ke depan</h3><a class="small" href="#/admin/ibadah/kajian" style="color:var(--brand);font-weight:600">Semua</a></div>
        <div class="list" style="margin:0 -18px -18px">
          ${s.agenda.slice(0, 5).map((a) => { const d = new Date(a.date + 'T00:00'); return `<div class="list-item"><div style="width:46px;text-align:center;flex:none"><div class="xs muted" style="font-weight:700;text-transform:uppercase">${CM.HARI[d.getDay()].slice(0, 3)}</div><div class="display" style="font-size:1.35rem;line-height:1">${d.getDate()}</div></div><div class="grow" style="min-width:0"><div class="title truncate">${E(a.title)}</div><div class="meta truncate">${a.time} · ${E(a.who)}</div></div>${U.badge(a.type, a.type === 'Kajian' ? 'brand' : a.type === 'Sosial' ? 'gold' : '')}</div>`; }).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Petugas Jumat · ${CM.tgl(j.date, { year: false })}</h3><a class="small" href="#/admin/ibadah/petugas" style="color:var(--brand);font-weight:600">Jadwal petugas</a></div>
        <div class="grid cols-2" style="--gap:10px">
          ${[['Imam', j.imam], ['Khatib', j.khatib], ['Muadzin', j.muadzin], ['Bilal', j.bilal]].map(([r, n], i) => `<div class="row" style="--gap:10px;padding:10px;border:1px solid var(--line);border-radius:var(--r-sm)">${U.avatar(n, 'sm')}<div class="grow" style="min-width:0"><div class="xs muted">${r}</div><div class="truncate small" style="font-weight:600">${E(n)}</div></div>${j.confirmed[i] ? `<span title="Sudah konfirmasi" style="color:var(--ok)">${I('check', 18)}</span>` : `<span title="Belum konfirmasi" style="color:var(--warn)">${I('clock', 18)}</span>`}</div>`).join('')}
        </div>
        <div class="notice ok" style="margin-top:12px">${I('chat', 18)}<span>Pengingat WhatsApp H-1 dikirim otomatis Kamis pukul 16.00.</span></div>
      </div>
    </div>`;
  },
  mount() { CM.every(() => { const el = document.querySelector('[data-countdown]'); if (el) el.textContent = CM.fmtCountdown(CM.nextPrayer().diffSec); }, 1000); },
});

/* ---------------- KEUANGAN ---------------- */
CM.A.txRow = (t) => `
  <button class="list-item" data-act="txDetail" data-id="${t.id}">
    <span class="icon-tile sm ${t.type === 'masuk' ? 'ok' : 'ink'}">${I(t.type === 'masuk' ? 'in' : 'out', 18)}</span>
    <span class="grow" style="min-width:0"><span class="title truncate" style="display:block">${E(t.cat)}${t.nota ? ` <span class="faint" title="Ada nota">${I('receipt', 14)}</span>` : ''}</span><span class="meta truncate" style="display:block">${E(t.note)} · ${CM.kasName(t.kas)}</span></span>
    <span style="text-align:right"><span class="amount ${t.type === 'masuk' ? 'in' : 'out'}" style="display:block">${t.type === 'masuk' ? '+' : '−'}${CM.rp(t.amount).replace('−', '')}</span>${t.status !== 'disetujui' ? U.status(t.status) : ''}</span>
  </button>`;

CM.A.reg({
  id: 'keuangan', label: 'Keuangan', icon: 'wallet',
  tabs: [{ id: 'transaksi', label: 'Transaksi' }, { id: 'kas', label: 'Kas' }, { id: 'kategori', label: 'Kategori' }, { id: 'approval', label: 'Persetujuan' }, { id: 'laporan', label: 'Laporan' }],
  render(tab) { return CM.A.keu[tab](); },
});
CM.A.keu = {
  transaksi() {
    const f = CM.A.txFilter || 'semua';
    const list = CM.state.tx.filter((t) => f === 'semua' || (f === 'menunggu' ? t.status === 'menunggu' : t.type === f)).sort((a, b) => b.date.localeCompare(a.date));
    const groups = {};
    list.forEach((t) => (groups[t.date] = groups[t.date] || []).push(t));
    return `
    ${U.pageHead('Transaksi', 'Transaksi yang sudah dicatat tidak bisa dihapus. Kesalahan dikoreksi dengan transaksi pembalik.', `<button class="btn" data-act="exportX">${I('download', 18)} Ekspor</button><button class="btn primary" data-act="quickAdd">${I('plus', 18)} Catat</button>`)}
    <div class="grid sm-3" style="margin-bottom:16px">
      ${U.stat({ label: 'Masuk bulan ini', value: CM.rp(CM.monthSum('masuk')), icon: 'in', tone: 'ok' })}
      ${U.stat({ label: 'Keluar bulan ini', value: CM.rp(CM.monthSum('keluar')), icon: 'out', tone: 'ink' })}
      ${U.stat({ label: 'Menunggu persetujuan', value: CM.rp(CM.pending().reduce((s, t) => s + t.amount, 0)), sub: `${CM.pending().length} transaksi · tidak mengurangi saldo`, icon: 'clock', tone: 'warn' })}
    </div>
    <div class="row between wrap" style="margin-bottom:12px">
      <div class="chips">${[['semua', 'Semua'], ['masuk', 'Pemasukan'], ['keluar', 'Pengeluaran'], ['menunggu', 'Menunggu']].map(([v, l]) => `<button class="chip ${f === v ? 'active' : ''}" data-act="txFilter" data-v="${v}">${l}</button>`).join('')}</div>
      <span class="small muted">${list.length} transaksi · November 2026</span>
    </div>
    <div class="stack" style="--gap:14px">
      ${Object.keys(groups).map((d) => `<div><div class="section-title">${CM.tgl(d, { day: true })}</div><div class="card pad-0"><div class="list">${groups[d].map(CM.A.txRow).join('')}</div></div></div>`).join('') || U.empty('wallet', 'Belum ada transaksi')}
    </div>`;
  },
  kas() {
    return `
    ${U.pageHead('Kas', 'Dana terikat tidak tercampur: pengeluaran kas terikat hanya boleh memakai kategori yang diizinkan.', `<button class="btn" data-act="transfer">${I('refresh', 18)} Transfer antar kas</button><button class="btn primary" data-act="addKas">${I('plus', 18)} Kas baru</button>`)}
    <div class="grid sm-2 lg-3">
      ${CM.state.kas.map((k) => {
        const inn = CM.monthSum('masuk', k.id), out = CM.monthSum('keluar', k.id);
        return `<div class="card">
          <div class="row between" style="margin-bottom:12px"><div class="row" style="--gap:10px"><span style="width:10px;height:36px;border-radius:6px;background:${k.color}"></span><div><div style="font-weight:700">${k.name}</div>${k.terikat ? U.badge('Dana terikat', 'gold') : U.badge('Bebas', '')}</div></div><button class="icon-btn" aria-label="Opsi">${I('dots')}</button></div>
          <div class="display num" style="font-size:1.6rem">${CM.rp(CM.saldo(k.id))}</div>
          <div class="row small muted" style="margin-top:6px;--gap:14px"><span class="delta-up">+${CM.rpShort(inn)}</span><span>−${CM.rpShort(out)}</span><span>bulan ini</span></div>
          ${k.terikat ? `<hr class="hairline" style="margin:14px 0"><div class="xs muted" style="font-weight:600;margin-bottom:6px">Kategori pengeluaran diizinkan</div><div class="row wrap" style="--gap:6px">${k.allowed.map((a) => U.badge(a, 'brand')).join('')}</div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },
  kategori() {
    const k = CM.state.kategori;
    const col = (type, title, tone) => `<div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>${title}</h3><button class="btn sm" data-act="addCat" data-type="${type}">${I('plus', 16)} Tambah</button></div><div class="list" style="margin-top:8px">${k[type].map((c) => `<div class="list-item"><span class="icon-tile sm ${tone}">${I('tag', 16)}</span><span class="grow title" style="font-weight:500">${c}</span><span class="xs muted">${CM.state.tx.filter((t) => t.cat === c).length} transaksi</span></div>`).join('')}</div></div>`;
    return `${U.pageHead('Kategori', 'Kategori siap pakai untuk masjid. Bisa ditambah sesuai kebutuhan.')}
      <div class="grid lg-2">${col('masuk', 'Pemasukan', 'ok')}${col('keluar', 'Pengeluaran', 'ink')}</div>`;
  },
  approval() {
    const pend = CM.pending();
    const done = CM.state.tx.filter((t) => t.type === 'keluar' && t.amount >= CM.state.approvalThreshold && t.status !== 'menunggu').slice(0, 4);
    return `${U.pageHead('Persetujuan pengeluaran', `Pengeluaran ≥ ${CM.rp(CM.state.approvalThreshold)} perlu persetujuan Ketua sebelum dicairkan bendahara.`, `<button class="btn" data-act="threshold">${I('settings', 18)} Ambang ${CM.rpShort(CM.state.approvalThreshold)}</button>`)}
      <div class="section-title">Menunggu persetujuan (${pend.length})</div>
      <div class="grid lg-2">
        ${pend.map((t) => `<div class="card">
          <div class="row between" style="align-items:flex-start"><div><div class="xs muted">${CM.tgl(t.date, { day: true })} · diajukan ${E(t.by)}</div><div style="font-weight:700;font-size:1.05rem;margin-top:2px">${E(t.note)}</div></div>${U.status('menunggu')}</div>
          <div class="display num" style="font-size:1.8rem;margin:10px 0">${CM.rp(t.amount)}</div>
          <div class="row wrap small muted" style="--gap:8px">${U.badge(t.cat, 'brand')}${U.badge(CM.kasName(t.kas), CM.state.kas.find((k) => k.id === t.kas).terikat ? 'gold' : '')}<span>Saldo kas setelah cair: <b class="num" style="color:var(--ink)">${CM.rp(CM.saldo(t.kas) - t.amount)}</b></span></div>
          <div class="row" style="margin-top:12px;--gap:10px;padding:10px;border-radius:var(--r-sm);background:var(--surface-2);border:1px dashed var(--line-strong)"><div class="icon-tile sm ink">${I('receipt', 18)}</div><div class="grow small">nota-${t.id}.jpg <span class="muted">· 412 KB</span></div><button class="btn sm ghost" data-act="txDetail" data-id="${t.id}">Lihat</button></div>
          <div class="row" style="margin-top:14px;--gap:10px"><button class="btn danger grow" data-act="reject" data-id="${t.id}">${I('x', 18)} Tolak</button><button class="btn primary grow" data-act="approve" data-id="${t.id}">${I('check', 18)} Setujui</button></div>
        </div>`).join('') || `<div class="card span-all">${U.empty('check', 'Semua sudah diproses', 'Tidak ada pengeluaran yang menunggu persetujuan.')}</div>`}
      </div>
      <div class="section-title" style="margin-top:22px">Riwayat terakhir</div>
      <div class="card pad-0"><div class="list">${done.map((t) => `<div class="list-item"><span class="icon-tile sm ${t.status === 'ditolak' ? 'bad' : 'ok'}">${I(t.status === 'ditolak' ? 'x' : 'check', 18)}</span><span class="grow"><span class="title" style="display:block">${E(t.note)}</span><span class="meta">${CM.tgl(t.date)} · disetujui H. Sudirman</span></span><span class="amount">${CM.rp(t.amount)}</span></div>`).join('')}</div></div>`;
  },
  laporan() {
    const kasSel = CM.A.repKas || 'umum';
    const k = CM.state.kas.find((x) => x.id === kasSel);
    const tx = CM.state.tx.filter((t) => t.kas === kasSel && t.status === 'disetujui');
    const sum = (type) => { const o = {}; tx.filter((t) => t.type === type).forEach((t) => (o[t.cat] = (o[t.cat] || 0) + t.amount)); return o; };
    const masuk = sum('masuk'), keluar = sum('keluar');
    const tIn = Object.values(masuk).reduce((a, b) => a + b, 0), tOut = Object.values(keluar).reduce((a, b) => a + b, 0);
    const pub = CM.state.published?.[kasSel];
    return `${U.pageHead('Laporan bulanan', 'Laporan otomatis per kas, siap cetak untuk mading atau dibacakan saat pengumuman Jumat.', `<button class="btn" data-act="exportX">${I('download', 18)} Excel</button><button class="btn" data-act="printRep">${I('file', 18)} PDF A4</button><button class="btn ${pub ? 'soft' : 'primary'}" data-act="publish" data-kas="${kasSel}">${I(pub ? 'check' : 'globe', 18)} ${pub ? 'Terpublikasi' : 'Publikasikan'}</button>`)}
    <div class="row wrap" style="margin-bottom:16px;--gap:10px">
      <select class="select" style="width:auto;min-width:180px" data-act="repKas">${CM.state.kas.map((x) => `<option value="${x.id}" ${x.id === kasSel ? 'selected' : ''}>${x.name}</option>`).join('')}</select>
      <select class="select" style="width:auto"><option>November 2026</option><option>Oktober 2026</option><option>September 2026</option></select>
      ${pub ? `<span class="badge ok"><span class="dot"></span>Tampil di ${CM.siteUrl()}/laporan</span>` : ''}
    </div>
    <div class="card lift" style="max-width:820px;margin:0 auto;padding:clamp(18px,4vw,40px)">
      <div style="text-align:center">
        <div class="eyebrow">Laporan Kas · ${k.name}</div>
        <div class="display" style="font-size:1.6rem;margin-top:6px">${E(CM.state.profile.name)}</div>
        <div class="small muted">${E(CM.state.profile.address)}</div>
        <div style="margin:12px 0 4px;font-weight:600">Periode 1–30 November 2026</div>
      </div>
      <hr class="hairline" style="margin:18px 0">
      <div class="table-wrap"><table class="table">
        <tbody>
          <tr><td><b>Saldo awal</b></td><td class="r num"><b>${CM.rp(k.saldoAwal)}</b></td></tr>
          <tr><td colspan="2" class="xs muted" style="background:var(--surface-2);font-weight:700;letter-spacing:.06em;text-transform:uppercase">Pemasukan</td></tr>
          ${Object.entries(masuk).map(([c, v]) => `<tr><td style="padding-left:28px">${c}</td><td class="r num">${CM.rp(v)}</td></tr>`).join('') || '<tr><td class="muted" style="padding-left:28px">—</td><td></td></tr>'}
          <tr><td style="padding-left:28px"><b>Jumlah pemasukan</b></td><td class="r num" style="color:var(--ok)"><b>${CM.rp(tIn)}</b></td></tr>
          <tr><td colspan="2" class="xs muted" style="background:var(--surface-2);font-weight:700;letter-spacing:.06em;text-transform:uppercase">Pengeluaran</td></tr>
          ${Object.entries(keluar).map(([c, v]) => `<tr><td style="padding-left:28px">${c}</td><td class="r num">${CM.rp(v)}</td></tr>`).join('') || '<tr><td class="muted" style="padding-left:28px">—</td><td></td></tr>'}
          <tr><td style="padding-left:28px"><b>Jumlah pengeluaran</b></td><td class="r num"><b>${CM.rp(tOut)}</b></td></tr>
        </tbody>
        <tfoot><tr><td>Saldo akhir</td><td class="r num" style="font-size:1.1rem">${CM.rp(k.saldoAwal + tIn - tOut)}</td></tr></tfoot>
      </table></div>
      <div class="grid cols-2" style="margin-top:28px;text-align:center;font-size:.85rem">
        <div><div class="muted">Mengetahui, Ketua DKM</div><div style="height:48px"></div><b>H. Sudirman</b></div>
        <div><div class="muted">Bendahara</div><div style="height:48px"></div><b>Siti Aminah</b></div>
      </div>
      <p class="xs muted" style="text-align:center;margin-top:18px">Laporan publik tidak menampilkan nama donatur. Dibuat otomatis oleh Cinta Masjid.</p>
    </div>`;
  },
};

CM.act.txFilter = (el) => { CM.A.txFilter = el.dataset.v; CM.render(); };
CM.act.repKas = (el) => { CM.A.repKas = el.value; CM.render(); };
CM.act.publish = (el) => { CM.state.published = CM.state.published || {}; CM.state.published[el.dataset.kas] = !CM.state.published[el.dataset.kas]; CM.save(); CM.render(); U.toast(CM.state.published[el.dataset.kas] ? 'Laporan tampil di situs publik' : 'Laporan ditarik dari situs'); };
CM.act.printRep = () => U.toast('PDF A4 siap diunduh (simulasi)', 'download');
CM.act.exportX = () => U.toast('File Excel disiapkan (simulasi)', 'download');

CM.act.quickAdd = (el) => {
  const type = (el && el.dataset.type) || 'keluar';
  const kasOpts = CM.state.kas.map((k) => [k.id, k.name + (k.terikat ? ' (terikat)' : '')]);
  const cats = (t) => CM.state.kategori[t].map((c, i) => `<label class="option-card" style="display:inline-block"><input type="radio" name="cat" value="${c}" ${i === 0 ? 'checked' : ''}><div style="padding:8px 12px;font-size:.88rem;font-weight:600">${c}</div></label>`).join(' ');
  U.sheet({
    title: 'Catat transaksi',
    body: `<form class="stack" id="txForm" onsubmit="return false">
      <div class="seg block" role="tablist">${['keluar', 'masuk'].map((t) => `<button type="button" class="${t === type ? 'active' : ''}" data-act="txType" data-v="${t}">${t === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}</button>`).join('')}</div>
      <input type="hidden" name="type" value="${type}">
      ${U.field('Nominal', U.money('amount', '', true))}
      <div class="grid cols-2" style="--gap:12px">
        ${U.field('Kas', U.select('kas', kasOpts, 'umum'))}
        ${U.field('Tanggal', `<input class="input" type="date" name="date" value="2026-11-25">`)}
      </div>
      <div class="field"><label>Kategori</label><div id="catBox" style="display:flex;flex-wrap:wrap;gap:8px">${cats(type)}</div></div>
      ${U.field('Keterangan', `<input class="input" name="note" placeholder="mis. Token listrik Desember">`)}
      <label class="card dashed row" style="cursor:pointer;--gap:14px">
        <input type="file" accept="image/*" capture="environment" hidden data-act="nota">
        <span class="icon-tile">${I('camera')}</span><span class="grow"><b>Foto nota</b><br><span class="small muted" id="notaLbl">Kamera atau galeri · dikompres otomatis ≤ 500 KB</span></span>
      </label>
      <div id="txWarn"></div>
    </form>`,
    foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveTx">${I('check', 18)} Simpan</button>`,
  });
};
CM.act.txType = (el) => {
  const f = document.getElementById('txForm');
  f.querySelectorAll('.seg button').forEach((b) => b.classList.toggle('active', b === el));
  f.querySelector('[name=type]').value = el.dataset.v;
  document.getElementById('catBox').innerHTML = CM.state.kategori[el.dataset.v].map((c, i) => `<label class="option-card" style="display:inline-block"><input type="radio" name="cat" value="${c}" ${i === 0 ? 'checked' : ''}><div style="padding:8px 12px;font-size:.88rem;font-weight:600">${c}</div></label>`).join(' ');
};
CM.act.nota = (el) => { if (el.files[0]) document.getElementById('notaLbl').textContent = el.files[0].name + ' · terkompres ✓'; };
CM.act.saveTx = () => {
  const d = U.formData(document.getElementById('txForm'));
  const warn = document.getElementById('txWarn');
  if (!d.amount) { warn.innerHTML = `<div class="notice bad">${I('alert', 18)}<span>Isi nominal terlebih dahulu.</span></div>`; return; }
  const kas = CM.state.kas.find((k) => k.id === d.kas);
  if (d.type === 'keluar' && kas.terikat && !kas.allowed.includes(d.cat)) {
    warn.innerHTML = `<div class="notice bad">${I('lock', 18)}<span><b>${kas.name}</b> adalah dana terikat. Pengeluaran hanya untuk: ${kas.allowed.join(', ')}.</span></div>`; return;
  }
  const needs = d.type === 'keluar' && d.amount >= CM.state.approvalThreshold;
  CM.state.tx.unshift({ id: 't' + CM.uid(), date: d.date, type: d.type, kas: d.kas, cat: d.cat, amount: d.amount, note: d.note || d.cat, status: needs ? 'menunggu' : 'disetujui', by: 'H. Sudirman', nota: !!document.querySelector('[data-act=nota]')?.files?.length });
  CM.state.logs.unshift({ who: 'H. Sudirman', what: `Mencatat ${d.type === 'masuk' ? 'pemasukan' : 'pengeluaran'} ${CM.rp(d.amount)} (${d.cat})`, mod: 'Keuangan', at: '2026-11-25 ' + new Date().toTimeString().slice(0, 5) });
  CM.save(); U.close(); CM.render();
  U.toast(needs ? 'Tersimpan · menunggu persetujuan Ketua' : 'Transaksi tercatat');
};
CM.act.txDetail = (el) => {
  const t = CM.state.tx.find((x) => x.id === el.dataset.id);
  U.sheet({
    title: t.type === 'masuk' ? 'Detail pemasukan' : 'Detail pengeluaran',
    body: `<div class="stack">
      <div style="text-align:center;padding:8px 0">${U.status(t.status)}<div class="display num" style="font-size:2.2rem;margin-top:8px">${CM.rp(t.amount)}</div><div class="muted">${E(t.note)}</div></div>
      <div class="card pad-0"><div class="list">
        ${[['Kategori', t.cat], ['Kas', CM.kasName(t.kas)], ['Tanggal', CM.tgl(t.date, { day: true })], ['Dicatat oleh', t.by], ['Nomor catatan', t.id.toUpperCase()]].map(([a, b]) => `<div class="list-item"><span class="grow muted small">${a}</span><b class="small">${E(b)}</b></div>`).join('')}
      </div></div>
      ${t.nota ? `<div class="media" style="aspect-ratio:3/4;max-height:280px;background:repeating-linear-gradient(0deg,#fff,#fff 22px,#eee 23px);border:1px solid var(--line)"><div style="position:absolute;inset:18px;font-family:ui-monospace,monospace;font-size:.75rem;color:#555;line-height:1.9">TOKO BANGUNAN MAKMUR<br>Jl. Setiabudi 88<br>------------------------<br>${E(t.note)}<br>TOTAL&nbsp;&nbsp;${CM.rp(t.amount)}<br>------------------------<br>Terima kasih</div></div>` : ''}
      <div class="notice">${I('info', 18)}<span>Transaksi tidak bisa dihapus. Jika ada kesalahan, buat <b>transaksi pembalik</b> dengan alasan — tercatat di Log Aktivitas.</span></div>
    </div>`,
    foot: `<button class="btn" data-act="reverse" data-id="${t.id}">${I('refresh', 18)} Buat pembalik</button><button class="btn primary" data-act="close">Tutup</button>`,
  });
};
CM.act.reverse = (el) => {
  const t = CM.state.tx.find((x) => x.id === el.dataset.id);
  U.sheet({
    title: 'Transaksi pembalik',
    body: `<div class="stack"><p class="muted">Membalik <b>${E(t.note)}</b> sebesar <b>${CM.rp(t.amount)}</b>. Saldo akan dikoreksi otomatis.</p>${U.field('Alasan koreksi (wajib)', '<textarea class="textarea" name="reason" placeholder="mis. Salah input nominal"></textarea>')}</div>`,
    foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="doReverse" data-id="${t.id}">Simpan pembalik</button>`,
  });
};
CM.act.doReverse = (el) => {
  const t = CM.state.tx.find((x) => x.id === el.dataset.id);
  const reason = document.querySelector('[name=reason]').value || 'Koreksi';
  CM.state.tx.unshift({ ...t, id: 't' + CM.uid(), type: t.type === 'masuk' ? 'keluar' : 'masuk', note: `Pembalik: ${t.note} — ${reason}`, date: '2026-11-25', reversal_of: t.id, status: 'disetujui' });
  CM.state.logs.unshift({ who: 'H. Sudirman', what: `Transaksi pembalik ${t.id.toUpperCase()}: ${reason}`, mod: 'Keuangan', at: '2026-11-25 ' + new Date().toTimeString().slice(0, 5) });
  CM.save(); U.close(); CM.render(); U.toast('Transaksi pembalik tercatat');
};
CM.act.approve = (el) => { const t = CM.state.tx.find((x) => x.id === el.dataset.id); t.status = 'disetujui'; CM.state.logs.unshift({ who: 'H. Sudirman', what: `Menyetujui pengeluaran ${CM.rp(t.amount)} (${t.note})`, mod: 'Keuangan', at: '2026-11-25 ' + new Date().toTimeString().slice(0, 5) }); CM.save(); CM.render(); U.toast('Disetujui · bendahara bisa mencairkan'); };
CM.act.reject = (el) => { const t = CM.state.tx.find((x) => x.id === el.dataset.id); t.status = 'ditolak'; CM.save(); CM.render(); U.toast('Pengajuan ditolak', 'x'); };
CM.act.threshold = () => U.sheet({ title: 'Batas persetujuan', body: `<div class="stack">${U.field('Pengeluaran mulai nominal ini perlu persetujuan Ketua', U.money('th', CM.num(CM.state.approvalThreshold)))}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveTh">Simpan</button>` });
CM.act.saveTh = () => { const v = U.formData(document.querySelector('.sheet')).th; if (v) CM.state.approvalThreshold = v; CM.save(); U.close(); CM.render(); U.toast('Ambang diperbarui'); };
CM.act.transfer = () => {
  const o = CM.state.kas.map((k) => [k.id, k.name]);
  U.sheet({ title: 'Transfer antar kas', body: `<div class="stack">${U.field('Dari', U.select('from', o, 'umum'))}${U.field('Ke', U.select('to', o, 'ramadhan'))}${U.field('Nominal', U.money('amount'))}<div class="notice">${I('link', 18)}<span>Dicatat sebagai dua entri yang saling terhubung.</span></div></div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="doTransfer">Transfer</button>` });
};
CM.act.doTransfer = () => {
  const d = U.formData(document.querySelector('.sheet'));
  if (!d.amount || d.from === d.to) return U.toast('Periksa kas dan nominal', 'alert');
  const id = CM.uid();
  CM.state.tx.unshift({ id: 'tr' + id + 'a', date: '2026-11-25', type: 'keluar', kas: d.from, cat: 'Transfer antar kas', amount: d.amount, note: 'Transfer ke ' + CM.kasName(d.to), status: 'disetujui', by: 'H. Sudirman' });
  CM.state.tx.unshift({ id: 'tr' + id + 'b', date: '2026-11-25', type: 'masuk', kas: d.to, cat: 'Transfer antar kas', amount: d.amount, note: 'Transfer dari ' + CM.kasName(d.from), status: 'disetujui', by: 'H. Sudirman' });
  CM.save(); U.close(); CM.render(); U.toast('Transfer tercatat');
};
CM.act.addKas = () => U.sheet({ title: 'Kas baru', body: `<div class="stack">${U.field('Nama kas', '<input class="input" name="name" placeholder="mis. Kas Qurban">')}${U.field('Saldo awal', U.money('saldo'))}<label class="check"><input type="checkbox" name="terikat"><span><b>Dana terikat</b><br><span class="small muted">Hanya boleh dipakai untuk kategori tertentu</span></span></label></div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveKas">Simpan</button>` });
CM.act.saveKas = () => { const d = U.formData(document.querySelector('.sheet')); if (!d.name) return; CM.state.kas.push({ id: 'k' + CM.uid(), name: d.name, saldoAwal: d.saldo || 0, terikat: d.terikat, color: '#888', allowed: d.terikat ? ['Lainnya'] : [] }); CM.save(); U.close(); CM.render(); U.toast('Kas ditambahkan'); };
CM.act.addCat = (el) => { const n = prompt('Nama kategori baru'); if (n) { CM.state.kategori[el.dataset.type].push(n); CM.save(); CM.render(); } };

})();

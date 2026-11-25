/* Cinta Masjid — router, launcher prototipe, onboarding, dan event delegation */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;

/* ---------------- LAUNCHER ---------------- */
const launcher = () => `
  <div class="launch">
    <section class="launch-hero ornament"><div class="in">
      <div class="eyebrow" style="color:var(--accent)">Prototipe UI/UX · Fase 1</div>
      <h1 style="margin-top:14px">Cinta <em>Masjid</em></h1>
      <p>Satu platform untuk DKM: panel pengurus yang mudah dipakai dari HP, dan situs jamaah atas nama masjid sendiri. Gratis untuk DKM.</p>
      <div class="row wrap" style="--gap:10px;margin-top:24px"><a class="btn accent lg" href="#/admin">Buka panel DKM ${I('right', 18)}</a><a class="btn on-dark lg" href="#/onboarding">Coba daftar masjid</a></div>
    </div></section>
    <div class="launch-body">
      <div class="grid sm-2 lg-3">
        ${[['#/', 'globe', 'Situs utama cintamasjid.or.id', 'Halaman depan platform: fitur, cari & klaim masjid, biaya, panduan, tentang Yayasan Cinta Sedekah.'], ['#/admin', 'grid', 'Panel DKM', '10 modul: keuangan, ZIS & qurban, warga, ibadah, aset, komunikasi, kepedulian umat, pengurus, pengaturan.'],
           ['#/situs', 'globe', 'Situs Jamaah', 'Jadwal shalat, donasi & sedekah subuh, laporan transparansi, layanan, Tanya Ustadz, khutbah, akun.'],
           ['#/tv', 'tv', 'Mode TV', 'Layar jadwal shalat untuk TV masjid, hitung mundur iqamah, hadits, dan pengumuman bergulir.'],
           ['#/admin/pengaturan/tampilan', 'palette', 'Atur Tampilan', 'Tiap DKM bisa mengganti logo, warna, jenis huruf, tata letak, dan alamat situsnya sendiri.'],
           ['#/onboarding', 'sparkle', 'Daftar masjid 5 menit', 'Nama masjid, lokasi, logo & warna, kas awal, undang pengurus → situs langsung aktif.'],
           ['#/admin/kepedulian/salur', 'scan', 'Lumbung Pangan', 'Penyaluran sembako bermartabat dengan kode QR, tanpa antre dan tanpa data ganda.'],
           ['#/console', 'shield', 'Panel Pengelola', 'Untuk tim Cinta Masjid: data masjid nasional, masjid terdaftar, nilai keaktifan, keamanan & moderasi, konten bersama, dan statistik.'],
           ['#/klaim', 'search', 'Klaim Masjid Anda', 'Halaman publik: cari masjid di direktori, kirim bukti, situs aktif tanpa input ulang.']]
          .map(([h, ic, t, d]) => `<a class="card launch-card lift" href="${h}"><span class="icon-tile gold lg">${I(ic, 24)}</span><h3>${t}</h3><p class="small muted">${d}</p><span class="go">Buka ${I('right', 16)}</span></a>`).join('')}
      </div>
      <div class="card soft row between wrap" style="margin-top:20px;--gap:12px">
        <div class="row" style="--gap:12px"><span class="icon-tile">${I('palette')}</span><div><b>Coba ganti tema</b><div class="small muted">Tema tersimpan di browser dan berlaku di semua layar prototipe.</div></div></div>
        <div class="row wrap" style="--gap:8px">${CM.presets.slice(0, 4).map((p) => `<button class="btn sm" data-act="quickPreset" data-id="${p.id}"><span style="width:14px;height:14px;border-radius:50%;background:${p.brand};box-shadow:inset 0 0 0 3px ${p.accent}"></span>${p.name}</button>`).join('')}<button class="btn sm ghost" data-act="resetAll">${I('refresh', 16)} Reset data</button></div>
      </div>
      <p class="xs muted" style="text-align:center;margin-top:24px">Semua data adalah contoh fiktif. Backend menyusul di tahap berikutnya.</p>
    </div>
  </div>`;
CM.act.quickPreset = (el) => { const p = CM.presets.find((x) => x.id === el.dataset.id); CM.setTheme({ preset: p.id, brand: p.brand, accent: p.accent, bg: p.bg, ink: p.ink }); U.toast('Tema: ' + p.name, 'palette'); };
CM.act.resetAll = () => { CM.reset(); CM.applyTheme(); CM.render(); U.toast('Data prototipe direset'); };

/* ---------------- ONBOARDING ---------------- */
const OB = { step: 1, d: { name: 'Masjid Al-Ikhlas', slug: 'alikhlas', preset: 'zamrud', kas: 'Kas Umum', saldo: '18.450.000' } };
const obSteps = ['Nama masjid', 'Lokasi', 'Logo & warna', 'Kas awal', 'Undang pengurus'];
const onboarding = () => {
  const s = OB.step, d = OB.d;
  const body = {
    1: `<h1 class="display" style="font-size:1.9rem">Assalamu'alaikum! Mari mulai dengan nama masjid.</h1>
        ${U.field('Nama masjid atau musholla', `<input class="input" value="${E(d.name)}" data-ob="name">`)}
        ${U.field('Alamat situs', `<div class="row" style="--gap:0"><input class="input mono" value="${E(d.slug)}" data-ob="slug" style="border-radius:var(--r-sm) 0 0 var(--r-sm)"><span class="input" style="width:auto;border-left:0;border-radius:0 var(--r-sm) var(--r-sm) 0;background:var(--surface-2);color:var(--muted);display:flex;align-items:center;white-space:nowrap">.cintamasjid.or.id</span></div>`, '✓ Tersedia · gratis selamanya')}`,
    2: `<h1 class="display" style="font-size:1.9rem">Di mana lokasi masjid?</h1><p class="muted">Dipakai untuk menghitung jadwal shalat secara otomatis.</p>
        <div class="adm-search" style="max-width:none">${I('search', 18)}<input class="input" value="Jl. Cempaka Raya, Sukajadi, Bandung"></div>
        <div class="map" style="min-height:240px"><span class="pin" style="left:50%;top:52%">${I('pin', 42)}</span></div>
        <div class="card soft"><div class="small muted" style="margin-bottom:8px">Jadwal shalat hari ini</div><div class="prayers">${CM.prayerTimes().map((p) => `<div class="prayer"><div class="n">${p.name}</div><div class="t">${p.shown}</div></div>`).join('')}</div></div>`,
    3: `<h1 class="display" style="font-size:1.9rem">Logo & warna masjid</h1><p class="muted">Opsional. Bisa diubah kapan saja di Studio Tampilan.</p>
        <label class="card dashed row" style="cursor:pointer;--gap:14px"><input type="file" hidden accept="image/*" data-act="logo"><span class="icon-tile lg">${I('upload', 24)}</span><span><b>Unggah logo</b><br><span class="small muted">Tanpa logo, nama masjid tampil sebagai teks yang elegan</span></span></label>
        <div class="grid cols-2 sm-3" style="--gap:10px">${CM.presets.map((p) => `<label class="option-card"><input type="radio" name="obp" ${S().theme.preset === p.id ? 'checked' : ''} data-act="obPreset" data-id="${p.id}"><div><div class="swatch"><i style="background:${p.brand}"></i><i style="background:${p.accent}"></i><i style="background:${p.bg}"></i></div><div class="small" style="font-weight:600;margin-top:6px">${p.name}</div></div></label>`).join('')}</div>`,
    4: `<h1 class="display" style="font-size:1.9rem">Kas awal</h1><p class="muted">Masukkan saldo kas saat ini. Kategori kas default sudah disiapkan.</p>
        ${U.field('Nama kas', `<input class="input" value="${E(d.kas)}">`)}
        ${U.field('Saldo awal', U.money('s', d.saldo, true))}
        <button class="btn ghost" style="align-self:flex-start">${I('plus', 18)} Tambah kas lain (Pembangunan, Anak Yatim…)</button>
        <div class="row wrap" style="--gap:6px">${S().kategori.masuk.slice(0, 5).map((c) => U.badge(c, 'brand')).join('')}${S().kategori.keluar.slice(0, 4).map((c) => U.badge(c, '')).join('')}</div>`,
    5: `<h1 class="display" style="font-size:1.9rem">Undang pengurus</h1><p class="muted">Mereka cukup masuk dengan kode OTP WhatsApp.</p>
        ${[['Bendahara', '0812 xxxx 4410'], ['Sekretaris', '']].map(([r, v]) => `<div class="grid cols-2" style="--gap:10px;grid-template-columns:1fr 1.4fr">${U.select('r', ['Bendahara', 'Sekretaris', 'Pengurus Bidang', 'Ustadz'], r)}<input class="input" inputmode="tel" placeholder="Nomor WhatsApp" value="${v}"></div>`).join('')}
        <button class="btn ghost" style="align-self:flex-start">${I('plus', 18)} Tambah orang</button>`,
    6: `<div style="text-align:center" class="stack"><span class="icon-tile lg ok" style="margin:0 auto;width:72px;height:72px">${I('check', 34)}</span>
        <h1 class="display" style="font-size:2.1rem">Situs masjid sudah aktif</h1>
        <p class="muted">Alhamdulillah. Jamaah sudah bisa membuka jadwal shalat dan berdonasi.</p>
        <div class="card soft mono" style="font-weight:700">${E(d.slug)}.cintamasjid.or.id</div>
        <div class="grid cols-2" style="--gap:10px"><a class="btn lg" href="#/situs">${I('globe', 18)} Lihat situs</a><a class="btn primary lg" href="#/admin">Ke panel DKM</a></div>
        <a class="btn ghost" href="#/tv" target="_blank">${I('tv', 18)} Pasang Mode TV di masjid</a></div>`,
  }[s];
  return `
  <div class="ob">
    <aside class="ob-aside ornament">
      <div><div class="display" style="font-size:1.4rem">Cinta Masjid</div><div class="small" style="opacity:.7">Gratis untuk DKM</div></div>
      <div><div class="display" style="font-size:2.6rem;line-height:1.1">Situs masjid aktif<br>dalam 5 menit.</div>
        <div class="stack" style="--gap:10px;margin-top:28px">${obSteps.map((t, i) => `<div class="row" style="--gap:12px;opacity:${i + 1 <= s ? 1 : .5}"><span class="avatar sm" style="background:${i + 1 < s ? 'var(--accent)' : 'rgb(255 255 255 / .15)'};color:${i + 1 < s ? 'var(--brand-deep)' : '#fff'}">${i + 1 < s ? I('check', 14) : i + 1}</span><span style="font-weight:${i + 1 === s ? 700 : 500}">${t}</span></div>`).join('')}</div></div>
      <div class="small" style="opacity:.6">Data Anda aman: dana tidak pernah melewati platform.</div>
    </aside>
    <div class="ob-main">
      <div class="row between"><a href="#/" class="small muted" style="text-decoration:none">${I('left', 16)} Keluar</a>${s <= 5 ? `<span class="small muted">Langkah ${s} dari 5</span>` : ''}</div>
      ${s <= 5 ? `<div class="steps">${obSteps.map((_, i) => `<i class="${i < s ? 'on' : ''}"></i>`).join('')}</div>` : ''}
      ${s === 3 ? `<div class="notice ok">${I('globe', 18)}<span><b>${E(d.slug)}.cintamasjid.or.id</b> sudah aktif dan menampilkan jadwal shalat.</span></div>` : ''}
      <div class="stack">${body}</div>
      ${s <= 5 ? `<div class="row" style="--gap:10px;margin-top:8px">${s > 1 ? `<button class="btn lg" data-act="obPrev">${I('left', 18)}</button>` : ''}${s >= 3 ? `<button class="btn lg ghost" data-act="obNext">Lewati</button>` : ''}<button class="btn primary lg grow" data-act="obNext">${s === 5 ? 'Selesai & aktifkan' : 'Lanjut'} ${I('right', 18)}</button></div>${s >= 3 ? '<p class="xs muted" style="text-align:center">Langkah 3–5 bisa dilanjutkan nanti dari daftar langkah di Beranda.</p>' : ''}` : ''}
    </div>
  </div>`;
};
CM.act.obNext = () => { document.querySelectorAll('[data-ob]').forEach((i) => (OB.d[i.dataset.ob] = i.value)); OB.step = Math.min(6, OB.step + 1); CM.render(); window.scrollTo(0, 0); };
CM.act.obPrev = () => { OB.step = Math.max(1, OB.step - 1); CM.render(); };
CM.act.obPreset = (el) => { const p = CM.presets.find((x) => x.id === el.dataset.id); CM.setTheme({ preset: p.id, brand: p.brand, accent: p.accent, bg: p.bg, ink: p.ink }); };

/* ---------------- ROUTER ---------------- */
CM.route = () => (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
CM.render = () => {
  CM.clearTimers();
  const [area, a, b] = CM.route();
  const app = document.getElementById('app');
  const scrollY = CM._lastRoute === location.hash ? window.scrollY : 0;
  let mount = null;
  const WEB = ['', 'beranda', 'fitur', 'cari', 'biaya', 'panduan', 'tentang', 'kebijakan', 'klaim'];
  const isWeb = WEB.includes(area || '');
  CM.applyTheme(area === 'console' ? CM.platformTheme : isWeb ? CM.webTheme : S().theme);
  if (area === 'console') {
    const m = CM.C.mods[a] || CM.C.mods.command;
    const tab = m.tabs ? (m.tabs.find((t) => t.id === b) || m.tabs[0]).id : null;
    app.innerHTML = CM.C.shell(m.id, tab);
    document.title = `${m.label} · Panel Pengelola · Cinta Masjid`;
  } else if (isWeb) {
    const pg = area || 'beranda';
    app.innerHTML = CM.W.render(pg, a);
    const T = { beranda: 'Cinta Masjid — Memakmurkan masjid, menguatkan jamaah', fitur: 'Fitur', cari: 'Cari masjid', biaya: 'Tanpa biaya', panduan: 'Panduan & bantuan', tentang: 'Tentang kami', kebijakan: 'Kebijakan', klaim: 'Klaim masjid Anda' };
    document.title = pg === 'beranda' ? T.beranda : `${T[pg]} · Cinta Masjid`;
    mount = pg === 'klaim' ? CM.claimMount : pg === 'cari' ? CM.W.mountCari : pg === 'fitur' ? CM.W.mountFitur : null;
  } else if (area === 'admin') {
    const mod = CM.A.mods[a] && (!CM.A.mods[a].toggle || S().modules[CM.A.mods[a].toggle]) ? a : 'beranda';
    const m = CM.A.mods[mod];
    const tab = m.tabs ? (m.tabs.find((t) => t.id === b) || m.tabs[0]).id : null;
    app.innerHTML = CM.A.shell(mod, tab);
    document.title = `${m.label} · Panel DKM · Cinta Masjid`;
    mount = () => m.mount && m.mount(tab);
  } else if (area === 'situs') {
    CM.P.sub = b;
    app.innerHTML = CM.P.shell(a || 'beranda');
    document.title = `${S().profile.name}`;
    mount = CM.P.mount;
  } else if (area === 'tv') {
    app.innerHTML = CM.TV.html();
    document.title = `Mode TV · ${S().profile.name}`;
    mount = CM.TV.mount;
  } else if (area === 'onboarding') {
    app.innerHTML = onboarding();
    document.title = 'Daftarkan masjid · Cinta Masjid';
  } else {
    app.innerHTML = launcher();
    document.title = 'Menu prototipe · Cinta Masjid';
  }
  mount && mount();
  window.scrollTo(0, scrollY);
  CM._lastRoute = location.hash;
};

/* ---------------- EVENTS ---------------- */
const FORM_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || FORM_TAGS.includes(el.tagName)) return;
  const fn = CM.act[el.dataset.act];
  if (el.dataset.act === 'close') { U.close(); return; }
  if (fn) { e.preventDefault(); fn(el, e); }
});
document.addEventListener('change', (e) => {
  const el = e.target;
  if (!FORM_TAGS.includes(el.tagName) || !el.dataset.act) return;
  const fn = CM.act[el.dataset.act];
  fn && fn(el, e);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { U.close(); document.getElementById('adm')?.classList.remove('drawer-open'); } });
window.addEventListener('hashchange', () => { U.close(); CM.render(); });

CM.applyTheme();
CM.render();
})();

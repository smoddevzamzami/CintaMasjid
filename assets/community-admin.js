/* Cinta Masjid — Ruang Jamaah: modul Komunitas di Panel DKM + tambahan Konsol Platform */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;
const C = () => (S().comm = S().comm || CM.commSeed());
const listCard = (rows) => `<div class="card pad-0"><div class="list">${rows}</div></div>`;
const rerender = () => { CM.save(); CM.render(); };

/* ================= PANEL DKM: KOMUNITAS ================= */
CM.A.reg({
  id: 'komunitas', label: 'Komunitas', icon: 'chat', toggle: 'komunitas',
  tabs: [{ id: 'ringkasan', label: 'Ringkasan' }, { id: 'moderasi', label: 'Moderasi' }, { id: 'anggota', label: 'Anggota' }, { id: 'grup', label: 'Grup' }, { id: 'pasar', label: 'Pasar' }, { id: 'pengaturan', label: 'Pengaturan' }, { id: 'pedoman', label: 'Pedoman' }],
  render(tab) { return K[tab](); },
});
// letakkan setelah Kepedulian Umat di sidebar
CM.A.order.splice(CM.A.order.indexOf('komunitas'), 1);
CM.A.order.splice(CM.A.order.indexOf('kepedulian') + 1, 0, 'komunitas');

const ACTIONS = [['Setujui', 'primary'], ['Sembunyikan', ''], ['Hapus', ''], ['Beri peringatan', ''], ['Bisukan', ''], ['Keluarkan', 'danger']];
const K = {
  ringkasan() {
    const c = C();
    const top = [...c.posts].filter((p) => !p.official).sort((a, b) => Object.values(b.react || {}).reduce((x, y) => x + y, 0) - Object.values(a.react || {}).reduce((x, y) => x + y, 0)).slice(0, 3);
    return `${U.pageHead('Ruang Jamaah', 'Media sosial khusus jamaah masjid: nama asli, kabar urut waktu, tanpa pesan pribadi, dijaga oleh DKM.', `<a class="btn" href="#/situs/komunitas" target="_blank">${I('external', 18)} Lihat sebagai jamaah</a>`)}
    ${c.settings.pemilu ? `<div class="notice gold" style="margin-bottom:14px">${I('shield', 18)}<span><b>Mode Pemilu aktif.</b> Postingan berisi kata kunci politik masuk pra-tayang, dan akun masjid tidak bisa memposting dukungan kepada peserta pemilu.</span></div>` : ''}
    <div class="grid sm-2 lg-4" style="margin-bottom:16px">
      ${U.stat({ label: 'Anggota aktif mingguan', value: '128', sub: 'dari 312 anggota (41%)', icon: 'users', tone: 'ok' })}
      ${U.stat({ label: 'Postingan baru', value: '46', sub: 'pekan ini', icon: 'edit' })}
      ${U.stat({ label: 'Titipan doa aktif', value: String(c.posts.filter((p) => p.type === 'doa').length + 4), sub: `${c.posts.filter((p) => p.type === 'doa').reduce((a, p) => a + p.prays, 0) + 61} kali didoakan`, icon: 'hand', tone: 'gold' })}
      ${U.stat({ label: 'Menunggu moderasi', value: String(c.queue.length), sub: `${c.members.pending.length} permintaan bergabung`, icon: 'alert', tone: 'warn' })}
    </div>
    <div class="grid lg-2">
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Paling banyak direaksi</h3><span class="xs muted">bahan pengumuman, bukan ranking</span></div><div class="list" style="margin-top:6px">${top.map((p) => `<div class="list-item" style="align-items:flex-start">${p.anon ? `<span class="avatar sm">${I('hand', 14)}</span>` : U.avatar(p.author, 'sm')}<div class="grow" style="min-width:0"><div class="small"><b>${E(p.author)}</b> · ${CM.POST_TYPES[p.type].label}</div><div class="small muted teaser-body">${E(p.body)}</div></div><b class="small">${Object.values(p.react || {}).reduce((x, y) => x + y, 0)}</b></div>`).join('')}</div></div>
      <div class="card"><div class="card-head"><h3>Konfirmasi hadir & relawan pekan ini</h3></div><div class="stack" style="--gap:12px">${c.events.slice(0, 3).map((e) => `<div><div class="row between small"><b>${E(e.title)}</b><span class="muted">${e.hadir} hadir</span></div>${e.slots ? `<div class="xs muted" style="margin:4px 0">Relawan ${e.slots.taken}/${e.slots.need}</div>${U.progress((e.slots.taken / e.slots.need) * 100)}` : ''}</div>`).join('')}</div></div>
    </div>`;
  },
  moderasi() {
    const q = C().queue;
    return `${U.pageHead('Antrean moderasi', 'Sumber: laporan jamaah, postingan pra-tayang, dan deteksi otomatis. Setiap aksi wajib beralasan; pemosting bisa banding satu kali.')}
    <div class="notice" style="margin-bottom:14px">${I('info', 18)}<span>Laporan yang tidak ditangani dalam 48 jam, atau kategori berat (penipuan, ancaman, konten seksual), otomatis diteruskan ke Tim Keamanan Cinta Masjid.</span></div>
    <div class="stack">${q.map((m) => `<div class="card" ${m.heavy ? 'style="border-color:var(--bad)"' : ''}>
      <div class="row between wrap" style="--gap:8px"><div class="row wrap" style="--gap:6px">${U.badge(m.kind, m.appeal ? 'info' : m.kind.includes('Pasar') ? 'gold' : '')}${m.heavy ? U.badge('Kategori berat', 'bad') : ''}${m.escalated ? `<span class="badge info">${I('shield', 12)} Diteruskan ke Cinta Masjid</span>` : ''}</div><span class="xs muted">${m.age} lalu</span></div>
      <div class="small muted" style="margin-top:8px">${I('filter', 13)} ${E(m.why)}</div>
      <blockquote class="mod-body">${E(m.body)}</blockquote>
      <div class="row wrap small muted" style="--gap:14px">${I('user', 14)} ${E(m.who)}<span>${m.reports} laporan</span><span>${m.strikes ? `<b style="color:var(--warn)">${m.strikes} pelanggaran sebelumnya</b>` : 'tanpa riwayat pelanggaran'}</span></div>
      <div class="row wrap" style="--gap:8px;margin-top:12px">${m.appeal ? `<button class="btn sm primary" data-act="modAct" data-id="${m.id}" data-a="Kabulkan banding">Kabulkan banding</button><button class="btn sm" data-act="modAct" data-id="${m.id}" data-a="Tolak banding">Tolak banding</button>` : ACTIONS.map(([a, c]) => `<button class="btn sm ${c}" data-act="modAct" data-id="${m.id}" data-a="${a}">${a}</button>`).join('')}${!m.escalated && !m.appeal ? `<button class="btn sm ghost" data-act="escalate" data-id="${m.id}">${I('shield', 14)} Teruskan ke Cinta Masjid</button>` : ''}</div>
    </div>`).join('') || `<div class="card">${U.empty('check', 'Antrean kosong', 'Semua laporan sudah ditangani.')}</div>`}</div>`;
  },
  anggota() {
    const m = C().members;
    const seg = CM.A.memSeg || 'menunggu';
    const segs = [['menunggu', `Menunggu (${m.pending.length})`], ['anggota', 'Anggota (312)'], ['bisu', `Dibisukan (${m.muted.length})`], ['keluar', `Dikeluarkan (${m.removed.length})`]];
    let body;
    if (seg === 'menunggu') body = listCard(m.pending.map((p, i) => `<div class="list-item" style="flex-wrap:wrap">${U.avatar(p.name)}<div class="grow" style="min-width:160px"><div class="title">${E(p.name)}</div><div class="meta">${E(p.note)} · ${p.days ? p.days + ' hari lalu' : 'hari ini'}</div>${p.match ? `<span class="badge ok" style="margin-top:4px">${I('check', 12)} Cocok dengan data warga</span>` : ''}</div><button class="btn sm" data-act="memDecide" data-i="${i}" data-ok="0">Tolak</button><button class="btn sm primary" data-act="memDecide" data-i="${i}" data-ok="1">Setujui</button></div>`).join('') || `<div style="padding:18px">${U.empty('users', 'Tidak ada permintaan')}</div>`);
    else if (seg === 'anggota') body = listCard(m.list.map((p) => `<div class="list-item" style="flex-wrap:wrap">${U.avatar(p.name)}<div class="grow" style="min-width:160px"><div class="title">${E(p.name)}</div><div class="meta">Sejak ${p.since} · ${p.strikes} pelanggaran</div></div>${U.badge(p.role, p.role.startsWith('Moderator') ? 'gold' : p.role.startsWith('Pengelola') ? 'brand' : '')}<button class="btn sm" data-act="memRole" data-n="${E(p.name)}">Atur peran</button></div>`).join(''));
    else if (seg === 'bisu') body = listCard(m.muted.map((p) => `<div class="list-item">${U.avatar(p.name)}<div class="grow"><div class="title">${E(p.name)}</div><div class="meta">${E(p.why)} · sampai ${p.until}</div></div><button class="btn sm" data-act="toastOnly" data-msg="Bisukan dicabut">Cabut</button></div>`).join(''));
    else body = listCard(m.removed.map((p) => `<div class="list-item">${I('x', 18)}<div class="grow"><div class="title">${E(p.name)}</div><div class="meta">${E(p.why)}</div></div></div>`).join(''));
    return `${U.pageHead('Anggota', 'Jamaah yang disetujui bisa memposting. Riwayat pelanggaran hanya terlihat oleh moderator.', `<label class="row card" style="padding:8px 14px;--gap:10px;box-shadow:none"><span class="small">Setujui otomatis warga terdata</span>${U.switch('', C().settings.join === 'otomatis', 'autoJoin')}</label>`)}
      <div class="chips" style="margin-bottom:12px">${segs.map(([v, l]) => `<button class="chip ${seg === v ? 'active' : ''}" data-act="memSeg" data-v="${v}">${l}</button>`).join('')}</div>${body}`;
  },
  grup() {
    return `${U.pageHead('Grup / halaqah', 'Grup terbuka, tertutup, atau ruang akhwat. Bisa ditautkan ke modul lain.', `<button class="btn primary" data-act="newGroup">${I('plus', 18)} Grup</button>`)}
      <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Grup</th><th>Jenis</th><th class="r">Anggota</th><th>Tautan</th><th></th></tr></thead><tbody>${C().groups.map((g) => `<tr><td><b>${E(g.name)}</b><div class="xs muted">${g.meet}</div></td><td>${U.badge(g.type === 'akhwat' ? 'Akhwat' : g.type, g.type === 'akhwat' ? 'gold' : g.type === 'tertutup' ? 'warn' : '')}</td><td class="r num">${g.members}</td><td class="small">${g.linked || '—'}</td><td class="r"><button class="btn sm ghost" data-act="toastOnly" data-msg="Pengelola grup diatur">Pengelola</button><button class="btn sm ghost" data-act="toastOnly" data-msg="Grup diarsipkan">Arsip</button></td></tr>`).join('')}</tbody></table></div></div>`;
  },
  pasar() {
    const cats = [['Makanan', true], ['Jasa', true], ['Barang bekas', true], ['Lowongan', true]];
    return `${U.pageHead('Pasar Jamaah', 'Iklan baris usaha jamaah. Kategori terlarang ditolak otomatis dengan penyaring kata.', `<label class="row card" style="padding:8px 14px;--gap:10px;box-shadow:none"><span class="small">Pra-tayang iklan</span>${U.switch('', true, 'toastSwitch')}</label>`)}
      <div class="grid lg-2">
        ${listCard(C().listings.map((l) => `<div class="list-item"><div class="media ${l.color}" style="width:52px;aspect-ratio:1;flex:none;border-radius:var(--r-xs)"></div><div class="grow" style="min-width:0"><div class="title truncate">${E(l.title)}</div><div class="meta">${l.cat} · ${E(l.who)} · ${l.exp} hari lagi</div></div><button class="btn sm ghost" data-act="toastOnly" data-msg="Iklan diturunkan">Turunkan</button></div>`).join(''))}
        <div class="stack"><div class="card"><div class="card-head"><h3>Kategori diizinkan</h3></div>${cats.map(([c, on]) => `<label class="row between" style="padding:6px 0"><span class="small">${c}</span>${U.switch('', on, 'toastSwitch')}</label>`).join('')}</div>
        <div class="card"><div class="card-head"><h3>Selalu terlarang</h3></div><div class="row wrap" style="--gap:6px">${['Barang haram', 'Pinjol / pinjaman berbunga', 'Investasi', 'MLM', 'Obat-obatan'].map((c) => U.badge(c, 'bad')).join('')}</div></div></div>
      </div>`;
  },
  pengaturan() {
    const st = C().settings;
    const row = (label, name, opts, val, hint) => `<div class="set-row"><div><b class="small">${label}</b>${hint ? `<div class="xs muted">${hint}</div>` : ''}</div>${U.select(name, opts, val).replace('<select', `<select data-act="commSet" data-k="${name}"`)}</div>`;
    const tog = (label, k, on, act = 'commTog') => `<label class="row between" style="padding:8px 0;gap:12px"><span class="small">${label}</span>${U.switch('', on, act, `data-k="${k}"`)}</label>`;
    return `${U.pageHead('Pengaturan komunitas', 'Pengaturan awal yang aman untuk DKM kecil. Semua bisa diubah.')}
      <div class="grid lg-2" style="align-items:start">
        <div class="card stack" style="--gap:0">
          ${row('Siapa bisa bergabung', 'join', [['manual', 'Disetujui manual'], ['otomatis', 'Otomatis untuk warga terdata'], ['terbuka', 'Terbuka']], st.join)}
          ${row('Siapa bisa memposting', 'post', [['semua', 'Semua anggota'], ['7hari', 'Anggota > 7 hari'], ['pengurus', 'Hanya pengurus']], st.post)}
          ${row('Mode moderasi', 'mod', [['pasca', 'Pasca-tayang'], ['pra', 'Pra-tayang'], ['campuran', 'Pra-tayang 7 hari pertama, lalu pasca-tayang']], st.mod)}
          ${row('Foto', 'foto', [['semua', 'Diizinkan'], ['pengurus', 'Hanya pengurus']], st.foto)}
          <div class="set-row"><div><b class="small">Ruang akhwat</b><div class="xs muted">Grup khusus anggota perempuan</div></div>${U.switch('', st.akhwat, 'commTog', 'data-k="akhwat"')}</div>
          <div class="set-row"><div><b class="small">Mode Pemilu</b><div class="xs muted">Otomatis aktif saat masa kampanye nasional/daerah</div></div>${U.switch('', st.pemilu, 'commTog', 'data-k="pemilu"')}</div>
          <div class="set-row"><div><b class="small">Tampilkan titipan doa di Mode TV</b><div class="xs muted">Doa pilihan DKM tampil di layar masjid</div></div>${U.switch('', st.tvDoa, 'commTog', 'data-k="tvDoa"')}</div>
          <div class="set-row"><div><b class="small">Dibacakan setelah shalat berjamaah</b><div class="xs muted">Masalah khilafiyah. Sesuaikan dengan kebiasaan masjid, atau pilih membacakannya di sela kajian/khutbah.</div></div>${U.switch('', st.bacaDoa, 'commTog', 'data-k="bacaDoa"')}</div>
        </div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Jenis postingan aktif</h3></div>${Object.entries(CM.POST_TYPES).filter(([k]) => k !== 'resmi').map(([k, t]) => tog(t.label, k, st.types[k] !== false, 'commType')).join('')}${tog('Pasar Jamaah', 'pasar', st.types.pasar, 'commType')}</div>
          <div class="card"><div class="card-head"><h3>Postingan resmi otomatis</h3><span class="xs muted">mengisi kabar sejak hari pertama</span></div>${[['pengumuman', 'Pengumuman'], ['duka', 'Berita duka'], ['kajian', 'Kajian baru'], ['khutbah', 'Khutbah baru'], ['kampanye', 'Kampanye donasi'], ['laporan', 'Laporan bulanan'], ['lumbung', 'Kebutuhan lumbung']].map(([k, l]) => tog(l, k, st.integr[k], 'commInt')).join('')}</div>
        </div>
      </div>`;
  },
  pedoman() {
    return `${U.pageHead('Pedoman komunitas', 'Contoh dari Cinta Masjid yang bisa diedit. Tampil saat jamaah bergabung dan sebelum posting pertama.', `<button class="btn" data-act="resetGuide">${I('refresh', 18)} Contoh dari Cinta Masjid</button>`)}
      <div class="grid lg-2-1" style="align-items:start">
        <div class="card"><textarea class="textarea" id="guideIn" style="min-height:340px;font-size:.95rem">${E(C().guideline)}</textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" data-act="saveGuide">Simpan pedoman</button></div></div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Kata kunci lokal</h3><span class="xs muted">+ daftar kata dari Cinta Masjid</span></div><div class="row wrap" style="--gap:6px">${C().keywords.map((k, i) => `<span class="badge">${E(k)} <button class="link-btn" data-act="rmKw" data-i="${i}" aria-label="Hapus ${E(k)}">×</button></span>`).join('')}</div><div class="row" style="--gap:8px;margin-top:12px"><input class="input" id="kwIn" placeholder="Tambah kata" style="min-height:40px"><button class="btn sm" data-act="addKw">Tambah</button></div></div>
          <div class="card ${C().settings.pemilu ? 'accent' : ''}"><div class="row between"><b>Mode Pemilu</b>${U.switch('', C().settings.pemilu, 'commTog', 'data-k="pemilu"')}</div><p class="small muted" style="margin-top:6px">Menjaga masjid tetap netral: postingan bermuatan politik masuk pra-tayang; akun resmi masjid diblokir dari postingan dukungan.</p></div>
        </div>
      </div>`;
  },
};
CM.act.memSeg = (el) => { CM.A.memSeg = el.dataset.v; CM.render(); };
CM.act.memDecide = (el) => { const p = C().members.pending.splice(el.dataset.i, 1)[0]; if (el.dataset.ok === '1') C().members.list.push({ name: p.name, role: 'Anggota', since: 'Nov 2026', strikes: 0 }); rerender(); U.toast(el.dataset.ok === '1' ? p.name + ' kini anggota' : 'Permintaan ditolak'); };
CM.act.memRole = (el) => U.sheet({ title: 'Peran · ' + el.dataset.n, body: `<div class="stack" style="--gap:8px">${[['Anggota', 'Posting, komentar, reaksi, ikut grup'], ['Moderator Komunitas', 'Moderasi & kelola anggota, tanpa akses keuangan'], ['Pengelola Grup', 'Mengelola satu grup']].map(([r, d], i) => `<label class="option-card"><input type="radio" name="role" ${i === 0 ? 'checked' : ''}><div><b class="small">${r}</b><div class="xs muted">${d}</div></div></label>`).join('')}<p class="xs muted">Ketua dan Sekretaris otomatis memiliki hak Moderator.</p></div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Peran diperbarui · tercatat di Log Aktivitas">Simpan</button>` });
CM.act.modAct = (el) => {
  const a = el.dataset.a;
  const opts = { Bisukan: `${U.field('Durasi', U.select('dur', ['1 hari', '7 hari', '30 hari'], '7 hari'))}` };
  U.sheet({ title: a, body: `<div class="stack">${opts[a] || ''}${a !== 'Setujui' && a !== 'Kabulkan banding' ? U.field('Alasan', U.select('why', ['Ghibah / fitnah', 'SARA', 'Politik praktis', 'Hoaks', 'Penipuan', 'Jualan di luar Pasar', 'Lainnya'])) : ''}${U.field('Catatan', '<textarea class="textarea" style="min-height:70px" placeholder="Dikirim ke pemosting bersama alasan"></textarea>')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="modDone" data-id="${el.dataset.id}" data-a="${a}">${a}</button>` });
};
CM.act.modDone = (el) => {
  const q = C().queue, i = q.findIndex((x) => x.id === el.dataset.id); const it = q.splice(i, 1)[0];
  const post = C().posts.find((p) => p.pending && p.body === it.body);
  if (post) { if (el.dataset.a === 'Setujui') post.pending = false; else C().posts.splice(C().posts.indexOf(post), 1); }
  S().logs.unshift({ who: 'H. Sudirman', what: `Moderasi Ruang Jamaah: ${el.dataset.a} (${it.kind})`, mod: 'Komunitas', at: '2026-11-25 ' + new Date().toTimeString().slice(0, 5) });
  U.close(); rerender(); U.toast(`${el.dataset.a} · pemosting dinotifikasi${el.dataset.a === 'Setujui' || el.dataset.a.includes('banding') ? '' : ' & bisa banding sekali'}`);
};
CM.act.escalate = (el) => { const m = C().queue.find((x) => x.id === el.dataset.id); m.escalated = true; rerender(); U.toast('Diteruskan ke Tim Keamanan Cinta Masjid', 'shield'); };
CM.act.autoJoin = (el) => { C().settings.join = el.checked ? 'otomatis' : 'manual'; CM.save(); U.toast(el.checked ? 'Warga terdata disetujui otomatis' : 'Persetujuan manual'); };
CM.act.commSet = (el) => { C().settings[el.dataset.k] = el.value; CM.save(); U.toast('Pengaturan disimpan'); };
CM.act.commTog = (el) => { C().settings[el.dataset.k] = el.checked; rerender(); };
CM.act.commType = (el) => { C().settings.types[el.dataset.k] = el.checked; CM.save(); };
CM.act.commInt = (el) => { C().settings.integr[el.dataset.k] = el.checked; CM.save(); };
CM.act.saveGuide = () => { C().guideline = document.getElementById('guideIn').value; CM.save(); U.toast('Pedoman disimpan'); };
CM.act.resetGuide = () => { C().guideline = CM.commSeed().guideline; rerender(); };
CM.act.addKw = () => { const v = document.getElementById('kwIn').value.trim().toLowerCase(); if (v) { C().keywords.push(v); rerender(); } };
CM.act.rmKw = (el) => { C().keywords.splice(el.dataset.i, 1); rerender(); };
CM.act.newGroup = () => U.sheet({ title: 'Grup baru', body: `<div class="stack">${U.field('Nama grup', '<input class="input" placeholder="mis. Halaqah Bapak-Bapak">')}<div class="field"><label>Jenis</label><div class="grid cols-2" style="--gap:8px;grid-template-columns:repeat(3,1fr)">${['Terbuka', 'Tertutup', 'Akhwat'].map((t, i) => `<label class="option-card"><input type="radio" name="t" ${i === 0 ? 'checked' : ''}><div class="small" style="font-weight:600;text-align:center">${t}</div></label>`).join('')}</div></div>${U.field('Pengelola grup', U.select('a', C().members.list.map((m) => m.name)))}${U.field('Tautkan ke modul (opsional)', U.select('l', ['—', 'TPA/TPQ', 'Kajian', 'Mode Ramadhan']))}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Grup dibuat">Buat grup</button>` });

/* ================= MODE TV: doa terpilih ================= */
CM.R = CM.R || {};
CM.R.tvDoa = () => {
  const c = S().comm; if (!c || !c.settings.tvDoa || S().modules.komunitas === false) return '';
  const d = c.posts.find((p) => p.type === 'doa'); if (!d) return '';
  return `<div class="tv-card"><div class="lbl">Titipan doa jamaah</div><div class="tr">“${E(d.body)}”</div><div class="src">${d.prays} jamaah ikut mendoakan · Ruang Jamaah</div></div>`;
};

/* ================= KONSOL PLATFORM ================= */
const D = CM.CD;
D.moderation.unshift({ id: 'M-884', src: 'Diteruskan dari Ruang Jamaah · kategori berat', tenant: 'Masjid Al-Ikhlas', what: 'Iklan pinjol berulang di Pasar Jamaah (4 laporan) — akun baru 3 hari', age: '2 jam' });
const T = CM.C.mods.trust;
T.tabs.push({ id: 'takedown', label: 'Penurunan Konten' });
const trustRender = T.render;
T.render = (tab) => tab !== 'takedown' ? trustRender(tab) : `${U.pageHead('Permintaan penurunan konten', 'Dari pihak berwenang atas konten Ruang Jamaah. Ditangani dalam batas waktu dan dicatat.', U.badge('Batas 1×24 jam', 'warn'))}
  <div class="notice warn" style="margin-bottom:14px">${I('alert', 18)}<span>Sebelum Ruang Jamaah dibuka umum: cek kewajiban sebagai Penyelenggara Sistem Elektronik (PSE) lingkup privat, termasuk pendaftaran dan kewajiban menurunkan konten.</span></div>
  <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Pemohon</th><th>Konten</th><th>Diterima</th><th>Sisa waktu</th><th>Status</th></tr></thead><tbody>
  ${[['TD-007', 'Instansi berwenang (surat resmi)', 'Postingan hoaks kesehatan · Masjid Al-Falah', '25 Nov 06:10', '18 jam', 'menunggu'], ['TD-006', 'Pengadilan Negeri', 'Komentar pencemaran nama baik · Masjid Nurul Huda', '20 Nov', '—', 'selesai']].map(([id, p, c, r, s, st]) => `<tr><td class="mono">${id}</td><td class="small">${p}</td><td class="small">${c}</td><td class="small muted">${r}</td><td class="small">${s}</td><td>${U.status(st)}</td></tr>`).join('')}
  </tbody></table></div></div>`;
const KT = CM.C.mods.konten;
KT.tabs.push({ id: 'filter', label: 'Filter Kata' });
const kontenRender = KT.render;
KT.render = (tab) => tab !== 'filter' ? kontenRender(tab) : `${U.pageHead('Daftar kata terlarang & aturan deteksi', 'Berlaku untuk Ruang Jamaah di semua masjid. DKM bisa menambah kata lokal.', `<button class="btn primary" data-act="toastOnly" data-msg="Aturan baru (simulasi)">${I('plus', 18)} Aturan</button>`)}
  <div class="grid sm-2 lg-3">${[['Politik praktis', 'Pra-tayang saat Mode Pemilu', 84], ['Penipuan & pinjol', 'Blokir di Pasar, teruskan ke Tim Keamanan', 126], ['SARA & ujaran kebencian', 'Pra-tayang + laporan', 211], ['Konten seksual', 'Blokir + otomatis diteruskan', 97], ['Tautan mencurigakan', 'Anggota baru tidak boleh menautkan', 38], ['Hoaks kesehatan', 'Label "perlu tabayyun"', 52]].map(([t, a, n]) => `<div class="card"><div class="row between"><b class="small">${t}</b>${U.badge(n + ' kata', '')}</div><div class="xs muted" style="margin-top:4px">${a}</div><button class="btn sm" style="margin-top:12px" data-act="toastOnly" data-msg="Editor daftar kata (simulasi)">${I('edit', 14)} Ubah</button></div>`).join('')}</div>
  <p class="xs muted" style="margin-top:12px">Diperbarui berkala oleh Tim Konten & Tim Keamanan. Pembaruan terakhir: 22 Nov 2026.</p>`;
const CC = CM.C.mods.command;
const ccRender = CC.render;
CC.render = (tab) => ccRender(tab) + `
  <div class="card" style="margin-top:16px"><div class="card-head"><h3>Ruang Jamaah (gabungan)</h3>${U.badge('Uji coba · 9 masjid', 'gold')}</div>
    <div class="grid sm-2 lg-4">${[['Masjid dengan Ruang aktif', '9'], ['Postingan 30 hari', '3.412'], ['Rasio laporan', '0,6%', 'target < 1%'], ['Laporan ditangani < 24 jam', '93%']].map(([l, v, s]) => `<div><div class="xs muted">${l}</div><div style="font-size:1.4rem;font-weight:700">${v}</div>${s ? `<div class="xs muted">${s}</div>` : ''}</div>`).join('')}</div></div>`;
})();

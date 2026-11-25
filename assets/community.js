/* Cinta Masjid — Ruang Jamaah: sisi jamaah (tab Komunitas di situs/PWA) */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;
const C = () => (S().comm = S().comm || CM.commSeed());
if (S().modules.komunitas === undefined) S().modules.komunitas = true;
if (S().comm && S().comm.v !== 2) { Object.assign(S().comm.settings, { tvDoa: false, bacaDoa: false }); S().comm.v = 2; CM.save(); }
/* migrasi istilah pada data yang sudah tersimpan di browser */
if (!S().diksiV3) {
  (S().logs || []).forEach((l) => { l.what = l.what.replace('Override kuota penyaluran', 'Memberi pengecualian kuota penyaluran'); });
  if (S().comm) {
    S().comm.posts.forEach((p) => { if (p.badges) p.badges = p.badges.map((b) => (b === 'Admin Grup' ? 'Pengelola Grup' : b)); });
    S().comm.members.list.forEach((m) => { m.role = m.role.replace('Admin Grup', 'Pengelola Grup'); });
  }
  S().diksiV3 = true; CM.save();
}

CM.R = {};
const TABS = [['feed', 'Kabar Terbaru'], ['doa', 'Saling Mendoakan'], ['grup', 'Grup'], ['kegiatan', 'Kegiatan'], ['pasar', 'Pasar Jamaah'], ['jelajah', 'Jelajah Masjid']];
const isMember = () => C().member === 'anggota';
const href = (embed, t) => (embed ? 'javascript:void(0)' : '#/situs/komunitas/' + t);
const totalReact = (p) => Object.values(p.react || {}).reduce((a, b) => a + b, 0);
const find = (id) => C().posts.find((p) => p.id === id);
const avatarOf = (p) => (p.official ? `<span class="avatar" style="background:var(--brand);color:var(--brand-ink)">${I('mosque', 18)}</span>` : p.anon ? `<span class="avatar" style="background:var(--accent-soft);color:var(--accent-deep)">${I('hand', 18)}</span>` : U.avatar(p.author));

/* ---------------- komponen postingan ---------------- */
const prayBtn = (p) => `<button class="btn sm ${p.prayed ? 'soft' : 'primary'}" data-act="pray" data-id="${p.id}" ${isMember() ? '' : 'disabled'} aria-pressed="${!!p.prayed}">${p.prayed ? I('check', 16) + ' Sudah didoakan' : 'Aamiin, saya doakan'}</button>`;
CM.R.post = (p, embed = false) => {
  const T = CM.POST_TYPES[p.type];
  const canReact = isMember() || p.official;
  const photos = p.photos ? `<div class="post-photos n${Math.min(p.photos.length, 4)}">${p.photos.map((c, i) => `<div class="media ${i % 2 ? 'gold' : ''}"><span class="cap">${E(c)}</span></div>`).join('')}</div>` : '';
  let extra = '';
  if (p.type === 'doa') extra = `<div class="doa-strip"><span>${I('hand', 16)} <b>${p.prays}</b> jamaah ikut mendoakan</span>${prayBtn(p)}</div>${p.followUp ? `<div class="follow-up">${I('refresh', 14)} <b>Kabar lanjutan:</b> ${E(p.followUp)}</div>` : ''}`;
  if (p.slots) { const s = p.slots; extra = `<div class="slot-box"><div class="row between small"><span>${I('users', 16)} Relawan · ${s.when}</span><b>${s.taken}/${s.need}</b></div>${U.progress((s.taken / s.need) * 100)}<button class="btn sm ${s.mine ? 'soft' : 'primary'} block" style="margin-top:10px" data-act="takeSlot" data-id="${p.id}" ${isMember() ? '' : 'disabled'}>${s.mine ? I('check', 16) + ' Anda terdaftar · pengingat WA H-1' : s.taken >= s.need ? 'Relawan sudah cukup' : 'Daftar jadi relawan'}</button></div>`; }
  if (p.rsvp) extra = `<div class="rsvp"><span class="small muted">${p.rsvp.hadir} hadir · ${p.rsvp.mungkin} mungkin</span><div class="seg">${['hadir', 'mungkin'].map((v) => `<button class="${p.rsvp.mine === v ? 'active' : ''}" data-act="rsvpPost" data-id="${p.id}" data-v="${v}">${v === 'hadir' ? 'Hadir' : 'Mungkin'}</button>`).join('')}</div></div>`;
  if (p.type === 'hilang') extra = `<div class="xs muted" style="margin-top:8px">${I('clock', 12)} ${p.status === 'selesai' ? 'Sudah selesai' : `Diarsip otomatis dalam ${p.archiveIn} hari`}</div>`;
  const reacts = CM.REACTIONS.filter(([k]) => p.type === 'gembira' || k !== 'barakallah' || (p.react || {})[k]).map(([k, l, em]) => {
    const n = (p.react || {})[k] || 0;
    const featured = p.type === 'gembira' && k === 'barakallah';
    return `<button class="react ${p.myReact === k ? 'on' : ''} ${featured ? 'featured' : ''}" data-act="react" data-id="${p.id}" data-k="${k}" ${canReact ? '' : 'disabled'} aria-pressed="${p.myReact === k}"><span aria-hidden="true">${em}</span>${l}${n && !p.hideCounts ? ` <b>${n}</b>` : ''}</button>`;
  }).join('');
  const nC = (p.comments || []).reduce((a, c) => a + 1 + (c.replies || []).length, 0);
  return `
  <article class="card post ${p.pinned ? 'pinned' : ''} ${p.pending ? 'pending' : ''}">
    <header class="post-head">
      ${avatarOf(p)}
      <div class="grow" style="min-width:0">
        <div class="row wrap" style="--gap:6px"><b class="truncate">${E(p.author)}</b>${(p.badges || []).map((b) => `<span class="badge ${b.includes('Ustadz') ? 'brand' : b === 'Relawan' ? 'ok' : 'gold'}">${b}</span>`).join('')}</div>
        <div class="xs muted">${p.time} · <span class="badge ${T.tone}" style="padding:0 7px">${p.official ? I('shield', 11) + ' ' : ''}${p.pinned ? 'Disematkan · ' : ''}${T.label}</span></div>
      </div>
      <button class="icon-btn" data-act="postMenu" data-id="${p.id}" aria-label="Opsi postingan">${I('dots')}</button>
    </header>
    ${p.pending ? `<div class="notice warn" style="margin-bottom:10px">${I('clock', 16)}<span class="small">Menunggu persetujuan moderator sebelum tampil.</span></div>` : ''}
    <p class="post-body">${E(p.body)}</p>
    ${photos}${extra}
    ${p.src ? `<a class="src-link" href="${embed ? 'javascript:void(0)' : p.src[2]}">${I('link', 14)} Dari modul ${p.src[0]} · ${p.src[1]} ${I('right', 14)}</a>` : ''}
    <div class="reacts">${reacts}</div>
    <footer class="post-foot">
      <button class="btn sm ghost" data-act="comments" data-id="${p.id}">${I('chat', 16)} ${p.closed ? 'Komentar ditutup' : nC ? nC + ' komentar' : 'Komentar'}</button>
      ${p.official ? `<button class="btn sm ghost" data-act="share">${I('share', 16)} Bagikan ke WA</button>` : ''}
      <span class="grow"></span>
      <button class="btn sm ghost" data-act="report" data-id="${p.id}" aria-label="Laporkan">${I('alert', 16)}<span class="hide-xs">Laporkan</span></button>
    </footer>
  </article>`;
};

/* ---------------- halaman ---------------- */
const header = (embed) => {
  const c = C();
  const st = c.member;
  return `<div class="comm-head ornament">
    <div class="row" style="--gap:12px"><span class="icon-tile lg" style="background:rgb(255 255 255 / .14);color:var(--accent)">${I('users', 24)}</span>
    <div class="grow" style="min-width:0"><div class="eyebrow" style="color:var(--accent)">Ruang Jamaah</div><div class="display" style="font-size:1.35rem;line-height:1.2">${E(S().profile.name)}</div><div class="small" style="opacity:.8">312 anggota · moderasi oleh DKM</div></div>
    ${st === 'anggota' ? `<button class="avatar-btn" data-act="myProfile" aria-label="Profil saya">${U.avatar(S().me.name)}</button>` : ''}</div>
    ${st === 'anggota' ? `<button class="composer" data-act="compose">${I('edit', 18)}<span>Bagikan kabar, titip doa, atau ajak kebaikan…</span></button>` : ''}
  </div>
  ${st === 'tamu' ? `<div class="card join-cta"><div class="row" style="--gap:12px;align-items:flex-start"><span class="icon-tile gold">${I('lock')}</span><div class="grow"><b>Gabung untuk ikut berbagi</b><div class="small muted">Anda melihat postingan resmi saja. Anggota yang disetujui DKM bisa memposting, berkomentar, dan mendoakan.</div></div></div><button class="btn primary block" style="margin-top:12px" data-act="joinFlow">Minta bergabung</button></div>` : ''}
  ${st === 'menunggu' ? `<div class="notice gold" style="margin-bottom:14px">${I('clock', 18)}<span class="grow">Permintaan bergabung sedang ditinjau moderator. Biasanya kurang dari 1 hari.</span><button class="btn sm" data-act="joinApproveDemo">Simulasi disetujui</button></div>` : ''}
  <nav class="chips comm-tabs" aria-label="Menu komunitas">${TABS.map(([t, l]) => `<a class="chip brand ${t === (CM.P.sub || 'feed') ? 'active' : ''}" href="${href(embed, t)}">${l}</a>`).join('')}</nav>`;
};

const PAGES = {
  feed(embed) {
    const f = CM.R.f || 'semua';
    const pinned = C().posts.filter((p) => p.pinned);
    let list = C().posts.filter((p) => !p.pinned);
    if (!isMember()) list = list.filter((p) => p.official);
    if (f === 'resmi') list = list.filter((p) => p.official);
    if (f === 'jamaah') list = list.filter((p) => !p.official);
    if (f === 'doa') list = list.filter((p) => p.type === 'doa');
    if (f === 'gembira') list = list.filter((p) => p.type === 'gembira');
    if (f === 'ajakan') list = list.filter((p) => p.type === 'ajakan' || p.rsvp);
    const filters = [['semua', 'Semua'], ['resmi', 'Resmi'], ['jamaah', 'Jamaah'], ['doa', 'Doa'], ['gembira', 'Kabar gembira'], ['ajakan', 'Ajakan']];
    return `<div class="chips" style="margin-bottom:12px">${filters.map(([v, l]) => `<button class="chip ${f === v ? 'active' : ''}" data-act="feedF" data-v="${v}">${l}</button>`).join('')}</div>
      <div class="feed">${(f === 'semua' || f === 'resmi' ? pinned : []).concat(list).map((p) => CM.R.post(p, embed)).join('') || U.empty('chat', 'Belum ada postingan')}</div>
      <p class="xs muted" style="text-align:center;margin-top:16px">Kabar diurutkan berdasarkan waktu, tanpa algoritma yang mengejar viral. Postingan anggota hanya terlihat oleh anggota masjid ini.</p>`;
  },
  doa() {
    const list = C().posts.filter((p) => p.type === 'doa');
    const st = C().settings;
    const where = [st.tvDoa ? 'ditampilkan di Mode TV' : '', st.bacaDoa ? 'dibacakan setelah shalat berjamaah' : ''].filter(Boolean).join(' dan ');
    return `<div class="card hadith doa-hadith">
        <div class="eyebrow">Saling mendoakan</div>
        <div class="arab" style="margin-top:6px">دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ، عِنْدَ رَأْسِهِ مَلَكٌ مُوَكَّلٌ، كُلَّمَا دَعَا لِأَخِيهِ بِخَيْرٍ قَالَ الْمَلَكُ: آمِينَ وَلَكَ بِمِثْلٍ</div>
        <blockquote>“Doa seorang muslim untuk saudaranya tanpa sepengetahuan saudaranya itu mustajab. Di sisinya ada malaikat yang setiap kali ia mendoakan kebaikan berkata: Aamiin, dan bagimu semisalnya.”</blockquote>
        <cite>HR. Muslim no. 2733</cite>
      </div>
      <p class="xs muted" style="margin:10px 2px 14px">Nama yang mendoakan tidak ditampilkan kepada pemosting, agar doa tetap “tanpa sepengetahuannya”.${where ? ` Doa yang dipilih DKM ${where}.` : ''}</p>
      <div class="stack">${list.map((p) => `<div class="card doa-card"><div class="row" style="--gap:12px;align-items:flex-start">${avatarOf(p)}<div class="grow" style="min-width:0"><div class="row between"><b>${E(p.author)}</b><span class="xs muted">${p.time}</span></div><p style="margin-top:6px">${E(p.body)}</p>${p.followUp ? `<div class="follow-up">${I('refresh', 14)} <b>Kabar lanjutan:</b> ${E(p.followUp)}</div>` : ''}</div></div>
        <div class="doa-strip"><span>${I('hand', 16)} <b>${p.prays}</b> jamaah ikut mendoakan</span><div class="row" style="--gap:6px">${p.mine ? `<button class="btn sm" data-act="followUp" data-id="${p.id}">Kabar lanjutan</button>` : ''}${prayBtn(p)}</div></div></div>`).join('') || U.empty('hand', 'Belum ada titipan doa')}</div>
      ${isMember() ? `<button class="btn primary block lg" style="margin-top:14px" data-act="compose" data-type="doa">${I('hand', 18)} Titip doa</button>` : ''}`;
  },
  grup() {
    const tl = { terbuka: ['Terbuka', ''], tertutup: ['Tertutup', 'warn'], akhwat: ['Ruang akhwat', 'gold'] };
    return `<div class="grid lg-2">${C().groups.map((g) => `<div class="card group-card"><div class="row" style="--gap:12px;align-items:flex-start"><span class="icon-tile ${g.type === 'akhwat' ? 'gold' : ''}">${I(g.type === 'akhwat' ? 'heart' : g.type === 'tertutup' ? 'lock' : 'users')}</span><div class="grow" style="min-width:0"><b>${E(g.name)}</b><div class="row wrap" style="--gap:6px;margin-top:4px">${U.badge(tl[g.type][0], tl[g.type][1])}<span class="xs muted">${g.members} anggota</span>${g.linked ? U.badge('Terhubung: ' + g.linked, 'brand') : ''}</div><div class="small muted" style="margin-top:6px">${E(g.desc)}</div></div></div>
      <div class="row" style="--gap:8px;margin-top:12px"><button class="btn sm grow" data-act="groupOpen" data-id="${g.id}">Lihat grup</button>${g.joined ? `<span class="badge ok"><span class="dot"></span>Anggota</span>` : `<button class="btn sm primary" data-act="groupJoin" data-id="${g.id}" ${isMember() ? '' : 'disabled'}>${g.type === 'terbuka' ? 'Gabung' : 'Minta gabung'}</button>`}</div></div>`).join('')}</div>
      <p class="xs muted" style="margin-top:12px">Ruang akhwat hanya bisa diikuti anggota perempuan, sesuai pengaturan DKM.</p>`;
  },
  kegiatan() {
    return `<div class="stack">${C().events.map((e) => `<div class="card"><div class="row between wrap" style="--gap:8px"><div><b>${E(e.title)}</b>${e.akhwat ? ` ${U.badge('Akhwat', 'gold')}` : ''}<div class="small muted">${e.when} · ${E(e.who)}</div></div><div class="seg">${['hadir', 'mungkin'].map((v) => `<button class="${e.mine === v ? 'active' : ''}" data-act="rsvp" data-id="${e.id}" data-v="${v}" ${isMember() ? '' : 'disabled'}>${v === 'hadir' ? 'Hadir' : 'Mungkin'}</button>`).join('')}</div></div>
      <div class="xs muted" style="margin-top:8px">${e.hadir} hadir · ${e.mungkin} mungkin</div>
      ${e.slots ? `<div class="slot-box"><div class="row between small"><span>${I('users', 16)} Relawan</span><b>${e.slots.taken}/${e.slots.need}</b></div>${U.progress((e.slots.taken / e.slots.need) * 100)}<button class="btn sm ${e.slots.mine ? 'soft' : ''} block" style="margin-top:10px" data-act="evSlot" data-id="${e.id}" ${isMember() ? '' : 'disabled'}>${e.slots.mine ? I('check', 16) + ' Terdaftar · pengingat WA H-1' : 'Daftar jadi relawan'}</button></div>` : ''}</div>`).join('')}</div>
      <div class="card accent row" style="--gap:12px;margin-top:14px"><span class="icon-tile ok">${I('star')}</span><div class="small">Sering menjadi relawan? Anda bisa mendapat tanda <b>Relawan</b> di profil (atas persetujuan Anda).</div></div>`;
  },
  pasar() {
    const cat = CM.R.cat || 'Semua';
    const list = C().listings.filter((l) => cat === 'Semua' || l.cat === cat);
    return `<div class="notice warn" style="margin-bottom:12px">${I('info', 18)}<span class="small">Iklan baris usaha jamaah. Tidak ada transaksi di aplikasi; masjid dan platform tidak menjamin transaksi. Dilarang: barang haram, pinjol, investasi, MLM, obat-obatan.</span></div>
      <div class="row between wrap" style="--gap:8px;margin-bottom:12px"><div class="chips">${['Semua', 'Makanan', 'Jasa', 'Barang bekas', 'Lowongan'].map((c) => `<button class="chip ${c === cat ? 'active' : ''}" data-act="pasarCat" data-v="${c}">${c}</button>`).join('')}</div>${isMember() ? `<button class="btn sm primary" data-act="newListing">${I('plus', 16)} Pasang iklan</button>` : ''}</div>
      <div class="grid cols-2 lg-3" style="--gap:12px">${list.map((l) => `<div class="card pad-0 listing"><div class="media ${l.color}" style="aspect-ratio:4/3;border-radius:0"><span class="cap">${l.cat}</span></div><div style="padding:12px"><b class="small listing-title">${E(l.title)}</b><div class="num" style="font-weight:700;color:var(--brand);margin-top:4px">${l.price}</div><div class="xs muted">${E(l.who)} · ${l.exp} hari lagi</div><button class="btn sm block" style="margin-top:10px" data-act="contactSeller" data-id="${l.id}" ${isMember() ? '' : 'disabled'}>${I('chat', 14)} Hubungi via WA</button></div></div>`).join('')}</div>`;
  },
  jelajah() {
    const fol = C().mosques.filter((m) => m.follow);
    return `<div class="section-title">Masjid terdekat dengan Ruang Jamaah</div>
      <div class="card pad-0"><div class="list">${C().mosques.map((m, i) => `<div class="list-item"><span class="icon-tile sm">${I('mosque', 18)}</span><div class="grow" style="min-width:0"><div class="title">${m.name}</div><div class="meta">${m.dist} · ${m.active ? m.members + ' anggota' : 'Ruang Jamaah belum aktif'}</div></div>${m.active ? `<button class="btn sm ${m.follow ? 'soft' : ''}" data-act="followMosque" data-i="${i}">${m.follow ? I('check', 14) + ' Diikuti' : 'Ikuti'}</button>` : `<span class="xs muted">—</span>`}</div>`).join('')}</div></div>
      <p class="xs muted" style="margin-top:8px">Pengikut hanya melihat postingan resmi & kajian, dan bisa memberi reaksi. Untuk memposting, bergabunglah sebagai anggota masjid tersebut.</p>
      <div class="section-title" style="margin-top:20px">Kabar dari masjid yang diikuti</div>
      <div class="feed">${fol.length ? fol.map((m) => `<article class="card post"><header class="post-head"><span class="avatar" style="background:var(--brand);color:var(--brand-ink)">${I('mosque', 18)}</span><div class="grow"><b>${m.name}</b><div class="xs muted">Kemarin · <span class="badge brand" style="padding:0 7px">${I('shield', 11)} Resmi</span></div></div></header><p class="post-body">Kajian Ahad pagi bersama Ust. Ahmad Zaki pekan ini membahas adab bertetangga. Jamaah dari masjid sekitar dipersilakan hadir.</p><div class="reacts"><button class="react" data-act="toastOnly" data-msg="Reaksi terkirim">🤲 Aamiin</button><button class="react" data-act="toastOnly" data-msg="Reaksi terkirim">✨ MasyaAllah <b>12</b></button></div></article>`).join('') : U.empty('mosque', 'Belum mengikuti masjid lain')}</div>`;
  },
};

CM.R.page = (tab, embed) => `<div class="comm">${header(embed)}${(PAGES[tab] || PAGES.feed)(embed)}</div>`;
CM.P.pages.komunitas = (embed) => CM.R.page(embed ? 'feed' : (CM.P.sub || 'feed'), embed);

/* teaser di beranda publik */
CM.R.teaser = (embed) => {
  const doa = C().posts.filter((p) => p.type === 'doa');
  const latest = C().posts.filter((p) => !p.official && p.type !== 'doa').slice(0, 2);
  const go = (t) => (embed ? 'javascript:void(0)' : '#/situs/komunitas/' + t);
  return `<div class="sec-head"><div><h2>Ruang Jamaah</h2><p>Kabar, doa, dan gotong royong warga masjid</p></div><a href="${go('feed')}">Buka komunitas ${I('right', 14)}</a></div>
    <div class="grid lg-2-1">
      <div class="card pad-0"><div class="list">${latest.map((p) => `<a class="list-item" href="${go('feed')}" style="align-items:flex-start">${U.avatar(p.author, 'sm')}<div class="grow" style="min-width:0"><div class="small"><b>${E(p.author)}</b> <span class="badge ${CM.POST_TYPES[p.type].tone}" style="padding:0 7px">${CM.POST_TYPES[p.type].label}</span></div><div class="small muted teaser-body">${E(p.body)}</div><div class="xs muted" style="margin-top:4px">${totalReact(p)} reaksi · ${p.time}</div></div></a>`).join('')}</div></div>
      <a class="card doa-teaser" href="${go('doa')}"><div class="eyebrow">Saling mendoakan</div><div class="display" style="font-size:2rem;margin:4px 0">${doa.reduce((a, p) => a + p.prays, 0)}</div><div class="small muted">doa terkirim untuk ${doa.length} titipan doa aktif</div><span class="btn sm primary" style="margin-top:12px">${I('hand', 16)} Ikut mendoakan</span></a>
    </div>`;
};

/* ---------------- aksi ---------------- */
const rerender = () => { CM.save(); CM.render(); };
CM.act.feedF = (el) => { CM.R.f = el.dataset.v; CM.render(); };
CM.act.pasarCat = (el) => { CM.R.cat = el.dataset.v; CM.render(); };
CM.act.react = (el) => {
  const p = find(el.dataset.id), k = el.dataset.k; p.react = p.react || {};
  if (p.myReact) p.react[p.myReact] = Math.max(0, (p.react[p.myReact] || 1) - 1);
  if (p.myReact === k) p.myReact = null; else { p.myReact = k; p.react[k] = (p.react[k] || 0) + 1; }
  rerender();
};
CM.act.pray = (el) => { const p = find(el.dataset.id); p.prayed = !p.prayed; p.prays += p.prayed ? 1 : -1; rerender(); if (p.prayed) U.toast('Aamiin. Malaikat pun mendoakan untukmu semisalnya', 'hand'); };
CM.act.takeSlot = (el) => { const s = find(el.dataset.id).slots; if (s.mine) { s.mine = false; s.taken--; } else if (s.taken < s.need) { s.mine = true; s.taken++; U.toast('Terdaftar sebagai relawan · pengingat WA H-1 dijadwalkan', 'check'); } rerender(); };
CM.act.rsvpPost = (el) => { const r = find(el.dataset.id).rsvp; if (r.mine) r[r.mine]--; r.mine = r.mine === el.dataset.v ? null : el.dataset.v; if (r.mine) r[r.mine]++; rerender(); };
CM.act.rsvp = (el) => { const e = C().events.find((x) => x.id === el.dataset.id); if (e.mine) e[e.mine]--; e.mine = e.mine === el.dataset.v ? null : el.dataset.v; if (e.mine) e[e.mine]++; rerender(); };
CM.act.evSlot = (el) => { const s = C().events.find((x) => x.id === el.dataset.id).slots; if (s.mine) { s.mine = false; s.taken--; } else if (s.taken < s.need) { s.mine = true; s.taken++; U.toast('Terdaftar sebagai relawan · pengingat WA H-1', 'check'); } rerender(); };
CM.act.followMosque = (el) => { const m = C().mosques[el.dataset.i]; m.follow = !m.follow; rerender(); };
CM.act.groupJoin = (el) => { const g = C().groups.find((x) => x.id === el.dataset.id); if (g.type === 'terbuka') { g.joined = true; g.members++; U.toast('Bergabung dengan ' + g.name); } else U.toast(g.type === 'akhwat' ? 'Permintaan dikirim · khusus anggota perempuan' : 'Permintaan dikirim ke Pengelola Grup', 'send'); rerender(); };
CM.act.groupOpen = (el) => {
  const g = C().groups.find((x) => x.id === el.dataset.id);
  U.sheet({ title: g.name, body: `<div class="stack">
    <div class="row wrap" style="--gap:6px">${U.badge(g.type === 'akhwat' ? 'Ruang akhwat' : g.type[0].toUpperCase() + g.type.slice(1), g.type === 'akhwat' ? 'gold' : '')}<span class="small muted">${g.members} anggota</span></div>
    <p>${E(g.desc)}</p>
    <div class="card soft row" style="--gap:10px"><span class="icon-tile sm">${I('calendar', 16)}</span><div><div class="xs muted">Jadwal pertemuan</div><b class="small">${g.meet}</b></div></div>
    ${g.absen ? `<div class="card row" style="--gap:10px"><span class="icon-tile sm ok">${I('check', 16)}</span><div><div class="xs muted">Absensi halaqah</div><b class="small">${g.absen}</b></div></div>` : ''}
    <div class="section-title">Pengumuman grup</div>
    <div class="card"><b class="small">Pengelola Grup</b><p class="small" style="margin-top:4px">${g.id === 'g1' ? 'Rapat panitia Maulid Sabtu malam. Yang berhalangan mohon kabari.' : 'Pertemuan pekan ini tetap sesuai jadwal. Jazakumullah khairan.'}</p></div>
  </div>` });
};
CM.act.contactSeller = (el) => { const l = C().listings.find((x) => x.id === el.dataset.id); U.sheet({ title: 'Hubungi penjual', body: `<div class="stack"><b>${E(l.title)}</b><div class="card soft row between"><span class="small">${E(l.who)}</span><b class="mono">0812-xxxx-${(4100 + l.title.length * 7) % 10000}</b></div><p class="xs muted">Nomor ditampilkan karena penjual memilih membukanya dan Anda menekan tombol ini. Masjid dan platform tidak menjamin transaksi.</p></div>`, foot: `<button class="btn" data-act="close">Tutup</button><button class="btn primary" data-act="closeToast" data-msg="Membuka WhatsApp…">${I('chat', 18)} Buka WhatsApp</button>` }); };
CM.act.newListing = () => U.sheet({ title: 'Pasang iklan', body: `<div class="stack" id="lsForm">${U.field('Judul', '<input class="input" name="title" placeholder="mis. Kue kering lebaran">')}<div class="grid cols-2" style="--gap:10px">${U.field('Kategori', U.select('cat', ['Makanan', 'Jasa', 'Barang bekas', 'Lowongan']))}${U.field('Harga', '<input class="input" name="price" placeholder="Rp…">')}</div>${U.field('Deskripsi', '<textarea class="textarea" name="desc"></textarea>')}<label class="check"><input type="checkbox" name="showWa" checked><span class="small">Tampilkan nomor WA saat pembeli menekan "Hubungi"</span></label><div id="lsWarn"></div><p class="xs muted">Iklan kedaluwarsa otomatis setelah 30 hari.</p></div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveListing">Kirim</button>` });
CM.act.saveListing = () => {
  const d = U.formData(document.getElementById('lsForm'));
  const txt = (d.title + ' ' + d.desc).toLowerCase();
  if (/pinjam|pinjol|investasi|mlm|bunga|obat/.test(txt)) { document.getElementById('lsWarn').innerHTML = `<div class="notice bad">${I('x', 18)}<span>Iklan ditolak otomatis: termasuk kategori terlarang (pinjaman, investasi, MLM, obat-obatan).</span></div>`; return; }
  if (!d.title) return;
  C().listings.unshift({ id: 'l' + CM.uid(), title: d.title, cat: d.cat, price: d.price || '—', who: S().me.name, exp: 30, color: 'brand' });
  U.close(); rerender(); U.toast('Iklan tayang · berlaku 30 hari');
};

/* tulis postingan */
CM.act.compose = (el) => {
  const types = Object.entries(CM.POST_TYPES).filter(([k]) => k !== 'resmi' && C().settings.types[k] !== false);
  const sel = (el && el.dataset.type) || 'kabar';
  U.sheet({
    title: 'Tulis postingan',
    body: `<div class="stack" id="cmpForm">
      <div class="field"><label>Jenis</label><div class="type-pick">${types.map(([k, t]) => `<label class="option-card"><input type="radio" name="type" value="${k}" ${k === sel ? 'checked' : ''}><div class="row" style="--gap:8px">${I(t.icon, 16)}<span class="small" style="font-weight:600">${t.label}</span></div></label>`).join('')}</div></div>
      ${U.field('Isi', '<textarea class="textarea" name="body" placeholder="Tulis dengan santun. Ingat tabayyun sebelum membagikan berita."></textarea>')}
      <div class="row wrap" style="--gap:8px"><button type="button" class="btn sm" data-act="addPhoto">${I('camera', 16)} Foto <span id="phN">0</span>/4</button><span class="xs muted">dikompres ≤ 300 KB · tanpa video</span></div>
      <div id="cmpExtra"></div>
      <div id="cmpWarn"></div>
    </div>`,
    foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="publishPost">${I('send', 18)} Posting</button>`,
    onMount: (sh) => { const f = () => { const t = U.formData(sh).type; document.getElementById('cmpExtra').innerHTML = t === 'doa' ? `<div class="notice gold">${I('hand', 18)}<div class="small"><b>Adab titip doa</b><ul class="adab"><li>Iringi dengan doamu sendiri; jangan hanya bergantung pada doa orang lain.</li><li>Ceritakan seperlunya, sebagai kabar, bukan keluh kesah.</li><li>Jaga aib dan privasi orang yang kamu mintakan doa.</li></ul></div></div><label class="check"><input type="checkbox" name="anon" checked><span class="small"><b>Kirim anonim</b> · nama Anda hanya terlihat oleh moderator</span></label>` : t === 'ajakan' ? `<div class="grid cols-2" style="--gap:10px">${U.field('Slot relawan', '<input class="input" type="number" name="need" value="10" min="1">')}${U.field('Waktu', '<input class="input" name="when" value="Sabtu · 07.00">')}</div>` : t === 'hilang' ? '<p class="xs muted">Diarsip otomatis setelah 14 hari atau saat ditandai selesai.</p>' : t === 'tanya' ? '<p class="xs muted">Pertanyaan hukum agama akan diarahkan ke Tanya Ustadz.</p>' : ''; }; sh.addEventListener('change', f); f(); },
  });
};
CM.act.addPhoto = () => { const n = document.getElementById('phN'); n.textContent = Math.min(4, Number(n.textContent) + 1); };
CM.act.publishPost = (el, ev, force) => {
  const d = U.formData(document.getElementById('cmpForm'));
  const warn = document.getElementById('cmpWarn');
  if (!d.body.trim()) { warn.innerHTML = `<div class="notice bad">${I('alert', 18)}<span>Tulis isi postingan terlebih dahulu.</span></div>`; return; }
  const low = d.body.toLowerCase();
  if (d.type === 'tanya' && !force && /hukum|halal|haram|boleh(kah)? .*(shalat|puasa|zakat)|fiqih|najis|wudhu/.test(low)) {
    warn.innerHTML = `<div class="notice">${I('info', 18)}<div class="grow small">Sepertinya ini pertanyaan agama. Agar dijawab ustadz terverifikasi, ajukan lewat <b>Tanya Ustadz</b> (bisa anonim).<div class="row" style="--gap:8px;margin-top:8px"><a class="btn sm primary" href="#/situs/tanya" data-act="close">Ke Tanya Ustadz</a><button class="btn sm" data-act="publishForce">Tetap posting</button></div></div></div>`; return;
  }
  const hit = C().keywords.find((k) => low.includes(k));
  const photos = Number(document.getElementById('phN').textContent);
  const post = { id: 'p' + CM.uid(), type: d.type, author: d.type === 'doa' && d.anon ? 'Hamba Allah' : S().me.name, anon: d.type === 'doa' && d.anon, mine: true, time: 'Baru saja', body: d.body, react: {}, comments: [], photos: photos ? Array.from({ length: photos }, (_, i) => 'Foto ' + (i + 1)) : null };
  if (d.type === 'doa') Object.assign(post, { prays: 0, prayed: false, followUp: null });
  if (d.type === 'ajakan') post.slots = { need: Number(d.need) || 10, taken: 0, mine: false, when: d.when };
  if (d.type === 'hilang') Object.assign(post, { status: 'aktif', archiveIn: 14 });
  if (hit) { post.pending = true; C().queue.unshift({ id: 'q' + CM.uid(), why: `Deteksi otomatis · kata kunci "${hit}"${C().settings.pemilu ? ' (Mode Pemilu)' : ''}`, kind: 'Postingan pra-tayang', who: S().me.name, strikes: 0, reports: 0, body: d.body, age: 'baru saja', heavy: false }); }
  C().posts.splice(C().posts.filter((p) => p.pinned).length, 0, post);
  U.close(); CM.R.f = 'semua'; rerender();
  U.toast(hit ? 'Masuk antrean moderasi sebelum tampil' : 'Postingan tayang di Ruang Jamaah', hit ? 'clock' : 'check');
};
CM.act.publishForce = (el, ev) => CM.act.publishPost(el, ev, true);

/* komentar, laporan, menu */
CM.act.comments = (el) => {
  const p = find(el.dataset.id);
  const list = (p.comments || []).map((c, i) => `<div class="comment">${U.avatar(c.who, 'sm')}<div class="grow"><div class="bubble"><b class="small">${E(c.who)}</b><div class="small">${E(c.t)}</div></div><div class="xs muted" style="margin:3px 10px">${c.time || 'Baru saja'} · ${p.closed || !isMember() ? '' : `<button class="link-btn" data-act="replyTo" data-i="${i}">Balas</button> · `}<button class="link-btn" data-act="reportComment">Laporkan</button></div>
    ${(c.replies || []).map((r) => `<div class="comment reply">${U.avatar(r.who, 'sm')}<div class="grow"><div class="bubble"><b class="small">${E(r.who)}</b><div class="small">${E(r.t)}</div></div></div></div>`).join('')}</div></div>`).join('');
  U.sheet({
    title: 'Komentar',
    body: `<div class="stack" style="--gap:10px">${list || '<p class="muted small">Belum ada komentar.</p>'}</div>`,
    foot: p.closed ? `<span class="small muted grow" style="align-self:center">${I('lock', 14)} Pemosting menutup komentar.</span>` : isMember() ? `<input class="input" id="cmtIn" placeholder="Tulis komentar yang santun…" style="flex:1" data-reply=""><button class="btn primary" data-act="sendComment" data-id="${p.id}">${I('send', 18)}</button>` : '<span class="small muted grow">Gabung sebagai anggota untuk berkomentar.</span>',
  });
};
CM.act.replyTo = (el) => { const i = document.getElementById('cmtIn'); i.dataset.reply = el.dataset.i; i.placeholder = 'Membalas komentar…'; i.focus(); };
CM.act.sendComment = (el) => {
  const i = document.getElementById('cmtIn'); const t = i.value.trim(); if (!t) return;
  const p = find(el.dataset.id); p.comments = p.comments || [];
  if (i.dataset.reply !== '') { const c = p.comments[i.dataset.reply]; c.replies = c.replies || []; c.replies.push({ who: S().me.name, t }); } else p.comments.push({ who: S().me.name, t, time: 'Baru saja' });
  CM.save(); CM.render(); CM.act.comments(el);
};
const reasons = ['Hoaks / belum jelas kebenarannya', 'Ghibah atau fitnah', 'SARA / ujaran kebencian', 'Politik praktis', 'Penipuan / pinjol', 'Konten tidak pantas', 'Lainnya'];
CM.act.report = () => U.sheet({ title: 'Laporkan', body: `<div class="stack" style="--gap:8px">${reasons.map((r, i) => `<label class="option-card"><input type="radio" name="r" ${i === 0 ? 'checked' : ''}><div class="small" style="font-weight:600">${r}</div></label>`).join('')}${U.field('Catatan (opsional)', '<textarea class="textarea" style="min-height:70px"></textarea>')}<p class="xs muted">Laporan bersifat rahasia dan ditangani moderator DKM. Kategori berat diteruskan ke tim platform.</p></div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Laporan terkirim ke moderator DKM">Kirim laporan</button>` });
CM.act.reportComment = () => { U.close(); CM.act.report(); };
CM.act.postMenu = (el) => {
  const p = find(el.dataset.id);
  U.sheet({ title: 'Opsi postingan', body: `<div class="card pad-0"><div class="list">
    ${p.mine ? `<button class="list-item" data-act="toggleClose" data-id="${p.id}">${I('lock', 18)}<span class="grow">${p.closed ? 'Buka komentar' : 'Tutup komentar'}</span></button>
    <button class="list-item" data-act="toggleCounts" data-id="${p.id}">${I('eye', 18)}<span class="grow">${p.hideCounts ? 'Tampilkan jumlah reaksi' : 'Sembunyikan jumlah reaksi'}</span></button>
    ${p.type === 'doa' ? `<button class="list-item" data-act="followUp" data-id="${p.id}">${I('refresh', 18)}<span class="grow">Tulis kabar lanjutan</span></button>` : ''}
    ${p.type === 'hilang' ? `<button class="list-item" data-act="markDone" data-id="${p.id}">${I('check', 18)}<span class="grow">Tandai selesai</span></button>` : ''}` : ''}
    <button class="list-item" data-act="report" data-id="${p.id}">${I('alert', 18)}<span class="grow">Laporkan</span></button>
  </div></div><p class="xs muted" style="margin-top:10px">Tidak ada fitur repost di Ruang Jamaah untuk mengurangi penyebaran hoaks.</p>` });
};
CM.act.toggleClose = (el) => { const p = find(el.dataset.id); p.closed = !p.closed; U.close(); rerender(); };
CM.act.toggleCounts = (el) => { const p = find(el.dataset.id); p.hideCounts = !p.hideCounts; U.close(); rerender(); };
CM.act.markDone = (el) => { find(el.dataset.id).status = 'selesai'; U.close(); rerender(); };
CM.act.followUp = (el) => U.sheet({ title: 'Kabar lanjutan', body: U.field('Kabar terbaru', '<textarea class="textarea" id="fuIn">Alhamdulillah, ibu sudah dipindah ke ruang rawat biasa. Terima kasih atas doanya.</textarea>'), foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="saveFollowUp" data-id="${el.dataset.id}">Simpan</button>` });
CM.act.saveFollowUp = (el) => { find(el.dataset.id).followUp = document.getElementById('fuIn').value; U.close(); rerender(); U.toast('Kabar lanjutan tampil untuk jamaah yang mendoakan', 'hand'); };

/* bergabung & profil */
CM.act.joinFlow = () => U.sheet({
  title: 'Gabung Ruang Jamaah',
  body: `<div class="stack">
    <div class="grid cols-2" style="--gap:10px">${U.field('RT/RW (opsional)', '<input class="input" value="05/07">')}${U.field('Keterangan', '<input class="input" placeholder="warga Jl. Melati">')}</div>
    <label class="check"><input type="checkbox" checked><span class="small">Hubungkan akun ke data KK saya di masjid (bisa dicabut kapan saja)</span></label>
    <div class="field"><label>Pedoman Komunitas</label><pre class="guideline">${E(C().guideline)}</pre></div>
    <label class="check"><input type="checkbox" id="agree"><span class="small"><b>Saya setuju</b> mengikuti pedoman komunitas</span></label>
    <p class="xs muted">Akun minimal 17 tahun. Tidak ada pesan pribadi antar-jamaah. Nomor WA tidak pernah ditampilkan.</p>
  </div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="joinSend">Minta bergabung</button>`,
});
CM.act.joinSend = () => { if (!document.getElementById('agree').checked) return U.toast('Setujui pedoman komunitas dulu', 'alert'); C().member = 'menunggu'; U.close(); rerender(); U.toast('Permintaan terkirim ke moderator', 'send'); };
CM.act.joinApproveDemo = () => { C().member = 'anggota'; C().joinedDays = 0; rerender(); U.toast('Selamat datang di Ruang Jamaah!'); };
CM.act.myProfile = () => {
  const pr = C().prefs, me = S().me;
  const sw = (k, l) => `<label class="list-item" style="cursor:pointer"><span class="grow small">${l}</span>${U.switch('', pr[k], 'pref', `data-k="${k}"`)}</label>`;
  U.sheet({
    title: 'Profil saya',
    body: `<div class="stack">
      <div class="row" style="--gap:14px">${U.avatar(me.name, 'lg')}<div><b style="font-size:1.1rem">${E(me.name)}</b><div class="small muted">${E(S().profile.name)} · bergabung ${C().joinedDays} hari lalu</div><div class="row" style="--gap:6px;margin-top:6px">${U.badge('Anggota', 'brand')}${U.badge('Relawan', 'ok')}</div></div></div>
      <div class="section-title">Privasi</div>
      <div class="card pad-0"><div class="list">${sw('hidePhoto', 'Sembunyikan foto profil')}${sw('hideHistory', 'Sembunyikan riwayat postingan')}${sw('notifReaksi', 'Notifikasi reaksi')}</div></div>
      <div class="section-title">Notifikasi</div>
      <div class="card pad-0"><div class="list">${sw('nResmi', 'Postingan resmi masjid')}${sw('nBalasan', 'Balasan komentar')}${sw('nGrup', 'Grup')}${sw('nKegiatan', 'Kegiatan & ajakan relawan')}${sw('quiet', 'Jam tenang 22.00–04.00 (kecuali berita duka)')}${sw('weekly', 'Ringkasan WA mingguan')}</div></div>
      <div class="card pad-0"><div class="list"><button class="list-item" data-act="leaveDemo">${I('logout', 18)}<span class="grow small">Keluar dari Ruang Jamaah (demo alur gabung)</span></button><button class="list-item" data-act="deleteAcc">${I('trash', 18)}<span class="grow small" style="color:var(--bad)">Hapus akun</span></button></div></div>
    </div>`,
  });
};
CM.act.pref = (el) => { C().prefs[el.dataset.k] = el.checked; CM.save(); };
CM.act.leaveDemo = () => { C().member = 'tamu'; U.close(); rerender(); };
CM.act.deleteAcc = () => U.sheet({ title: 'Hapus akun', body: `<div class="stack"><p class="small">Pilih apa yang terjadi pada postingan Anda:</p>${[['anon', 'Anonimkan postingan', 'Isi tetap ada, nama diganti "Mantan anggota"'], ['hapus', 'Hapus semua postingan', 'Termasuk komentar dan reaksi']].map(([v, l, d], i) => `<label class="option-card"><input type="radio" name="del" ${i === 0 ? 'checked' : ''}><div><b class="small">${l}</b><div class="xs muted">${d}</div></div></label>`).join('')}</div>`, foot: `<button class="btn" data-act="close">Batal</button><button class="btn danger" data-act="closeToast" data-msg="Permintaan hapus akun diproses (simulasi)">Hapus akun</button>` });
})();

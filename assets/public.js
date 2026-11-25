/* Cinta Masjid — Situs publik jamaah (web + PWA) */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;

CM.P = {};
const NAV = [['beranda', 'home', 'Beranda'], ['komunitas', 'users', 'Komunitas'], ['donasi', 'heart', 'Donasi'], ['layanan', 'grid', 'Layanan'], ['akun', 'user', 'Akun']];
const NAV_DESK = [['beranda', 'Beranda'], ['komunitas', 'Komunitas'], ['agenda', 'Agenda'], ['donasi', 'Donasi'], ['laporan', 'Laporan'], ['layanan', 'Layanan'], ['tanya', 'Tanya Ustadz'], ['khutbah', 'Khutbah'], ['profil', 'Profil']];

CM.P.shell = (page, embed = false) => {
  const body = (CM.P.pages[page] || CM.P.pages.beranda)(embed);
  const href = (pg) => embed ? 'javascript:void(0)' : '#/situs/' + pg;
  const p = S().profile;
  return `
  <div class="pub ${embed ? 'embed' : ''}" data-page="${page}">
    <header class="pub-top">
      ${CM.wordmark({ href: href('beranda'), sub: 'city' })}${p.verified !== false ? `<span class="verified" title="Diverifikasi tim Cinta Masjid">${I('shield', 13)}<span>Terverifikasi</span></span>` : ''}
      <nav class="pub-nav" aria-label="Menu situs">${NAV_DESK.map(([pg, l]) => `<a href="${href(pg)}" class="${pg === page ? 'active' : ''}" ${pg === page ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
      <span class="grow"></span>
      <a class="btn sm accent pub-donate" href="${href('donasi')}">${I('heart', 16)}<span>Donasi</span></a>
      <a class="icon-btn pub-acc" href="${href('akun')}" aria-label="Akun saya">${I('user')}</a>
    </header>
    <main class="pub-main">${body}</main>
    <footer class="pub-foot">
      <div class="in">
        <div class="foot-brand">
          <div class="display" style="font-size:1.25rem;color:var(--brand-deep)">${E(p.name)}</div>
          <p class="small" style="margin-top:6px;max-width:320px">${E(p.tagline)}.</p>
          <div class="stack small" style="--gap:8px;margin-top:14px">
            <span class="row" style="--gap:8px;align-items:flex-start">${I('pin', 16)}<span>${E(p.address)}</span></span>
            <span class="row" style="--gap:8px">${I('phone', 16)}<span>Sekretariat 0812-xxxx-0707 (WhatsApp)</span></span>
            <span class="row" style="--gap:8px">${I('clock', 16)}<span>Senin–Sabtu, 08.00–16.00</span></span>
          </div>
        </div>
        <div class="foot-links">
          <div><div class="foot-h">Jamaah</div>${[['agenda', 'Jadwal kajian', 'kajian'], ['agenda', 'Kegiatan masjid', 'kegiatan'], ['khutbah', 'Arsip khutbah'], ['tanya', 'Tanya Ustadz'], ['profil', 'Profil masjid']].map(([pg, l, t]) => `<a href="${href(pg)}" ${t && !embed ? `data-act="agTabGo" data-v="${t}"` : ''}>${l}</a>`).join('')}</div>
          <div><div class="foot-h">Berbagi</div>${[['donasi', 'Infak & donasi'], ['donasi', 'Sedekah Subuh'], ['layanan', 'Qurban & zakat'], ['laporan', 'Laporan kas']].map(([pg, l]) => `<a href="${href(pg)}">${l}</a>`).join('')}</div>
        </div>
      </div>
      <div class="in foot-bottom">
        <span>© ${new Date().getFullYear()} DKM ${E(p.name)}</span>
        <span>Didukung <b>Cinta Masjid</b>${embed ? '' : ' · <a href="#/admin">Masuk pengurus</a>'}</span>
      </div>
    </footer>
    <nav class="pub-bottom" aria-label="Navigasi utama">${NAV.map(([pg, ic, l]) => `<a href="${href(pg)}" class="${pg === page ? 'active' : ''}" ${pg === page ? 'aria-current="page"' : ''}><span class="nav-ic">${I(ic, 22)}</span>${l}</a>`).join('')}</nav>
  </div>`;
};
CM.P.embed = (page) => CM.P.shell(page, true);

const sectionHead = (t, sub, link, label, embed) => `<div class="sec-head"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${link ? `<a href="${embed ? 'javascript:void(0)' : '#/situs/' + link}" data-act="${link === 'agenda' && !embed ? 'agTabGo' : ''}" data-v="${label === 'Semua kegiatan' ? 'kegiatan' : 'kajian'}">${label} ${I('right', 14)}</a>` : ''}</div>`;

/* ---------- kajian vs kegiatan ---------- */
const KAJIAN_META = {
  a1: { rutin: 'Setiap Kamis', tema: 'Tafsir', kitab: "Tafsir Ibnu Katsir · Juz 'Amma" },
  a4: { rutin: 'Setiap Ahad', tema: 'Adab', kitab: 'Riyadhush Shalihin · Bab Tetangga' },
  a7: { rutin: 'Sabtu pekan pertama', tema: 'Fiqih Muslimah', kitab: 'Fiqih Wanita · Thaharah', muslimah: true },
};
const kajianList = () => S().agenda.filter((a) => a.type === 'Kajian').map((a) => ({ ...a, ...(KAJIAN_META[a.id] || { rutin: 'Sekali', tema: 'Umum', kitab: '' }) }));
const kegiatanList = () => S().agenda.filter((a) => a.type !== 'Kajian');
const ustadzName = (who) => who.replace(/^Khatib:\s*/, '');
const dateBox = (iso) => { const d = new Date(iso + 'T00:00'); return `<div class="date-box"><span>${CM.HARI[d.getDay()].slice(0, 3)}</span><b>${d.getDate()}</b><span>${CM.BULAN[d.getMonth()].slice(0, 3)}</span></div>`; };

CM.P.kajianCard = (k) => `
  <article class="card kajian-card">
    <div class="row" style="--gap:12px;align-items:flex-start">
      ${dateBox(k.date)}
      <div class="grow" style="min-width:0">
        <div class="row wrap" style="--gap:6px;margin-bottom:6px">${U.badge(k.tema, 'brand')}${U.badge(k.rutin, 'gold')}${k.muslimah ? U.badge('Muslimah', '') : ''}</div>
        <h3 class="kajian-title"><a href="#/situs/kajian/${k.id}" class="stretch">${E(k.title)}</a></h3>
        ${k.kitab ? `<div class="xs muted" style="margin-top:2px">${E(k.kitab)}</div>` : ''}
      </div>
    </div>
    <div class="kajian-foot">
      <div class="row" style="--gap:8px;min-width:0">${U.avatar(ustadzName(k.who), 'sm')}<div style="min-width:0"><div class="small truncate" style="font-weight:700">${E(ustadzName(k.who))}</div><div class="xs muted truncate">${k.time} · ${E(k.place)}</div></div></div>
      <button class="btn sm soft" data-act="remindKajian" aria-label="Ingatkan saya untuk ${E(k.title)}">${I('bell', 16)}<span class="hide-xs">Ingatkan</span></button>
    </div>
  </article>`;
CM.P.agendaCard = (a) => `
  <article class="card agenda-card row" style="--gap:12px;align-items:flex-start">
    ${dateBox(a.date)}
    <div class="grow" style="min-width:0">
      <div style="font-weight:700">${E(a.title)}</div>
      <div class="small muted">${a.time} · ${E(a.who)}</div>
      <div class="row" style="--gap:6px;margin-top:8px">${U.badge(a.type, a.type === 'Sosial' ? 'gold' : a.type === 'Ibadah' ? 'brand' : '')}<span class="xs muted">${I('pin', 12)} ${E(a.place)}</span></div>
    </div>
  </article>`;

CM.P.pages = {
  beranda(embed) {
    const nx = CM.nextPrayer(), pt = CM.prayerTimes(), h = CM.hadithToday(), p = S().profile;
    const c = S().campaigns[0], pct = (c.raised / c.target) * 100;
    const go = (pg) => embed ? 'javascript:void(0)' : '#/situs/' + pg;
    const anns = [...S().announcements].sort((x, y) => (y.pinned ? 1 : 0) - (x.pinned ? 1 : 0)).slice(0, 3);
    const days = Math.max(0, Math.ceil((new Date(c.deadline) - new Date()) / 864e5));
    return `
    <section class="hero">
      <div class="hero-bg ornament"></div><div class="arch"></div>
      <div class="hero-in">
        <div class="hero-head">
          <div class="greet"><span class="nowrap">${CM.tgl(CM.todayISO(), { day: true })}</span> · <span class="nowrap">${CM.hijri()}</span></div>
          <h1>${E(p.name)}</h1>
          <div class="tagline">${E(p.tagline)}</div>
        </div>
        <div class="hero-count">
          <div class="next-label">Menuju <b>${nx.name}</b> pukul ${nx.shown}</div>
          <div class="count" data-pub-count>${CM.fmtCountdown(nx.diffSec)}</div>
          <div class="next-sub">Iqamah ${nx.iq} menit setelah adzan</div>
        </div>
        <div class="hero-prayers" role="list" aria-label="Jadwal shalat hari ini">${pt.map((x) => `<div role="listitem" class="${x.id === nx.id ? 'on' : ''}"><div class="n">${x.name}</div><div class="t">${x.shown}</div></div>`).join('')}</div>
        <div class="hero-cta"><a class="btn accent" href="${go('donasi')}">${I('heart', 18)} Infak sekarang</a><button class="btn on-dark" data-act="pushOn">${I('bell', 18)} Pengingat</button></div>
      </div>
    </section>

    <nav class="quick" aria-label="Pintasan layanan">
      ${[['heart', 'Infak', 'donasi'], ['sunrise', 'Sedekah Subuh', 'donasi'], ['cow', 'Qurban', 'layanan'], ['wallet', 'Zakat', 'layanan'], ['chat', 'Tanya Ustadz', 'tanya'], ['mic', 'Khutbah', 'khutbah'], ['hand', 'Titip Doa', 'komunitas/doa'], ['chart', 'Laporan', 'laporan']].map(([ic, l, pg]) => `<a href="${go(pg)}"><span class="q-ic">${I(ic, 22)}</span><span>${l}</span></a>`).join('')}
    </nav>

    ${sectionHead('Jadwal kajian', 'Majelis ilmu rutin bersama para asatidz', 'agenda', 'Semua kajian', embed)}
    <div class="scroller">${kajianList().map(CM.P.kajianCard).join('')}</div>

    <div class="grid lg-2-1" style="margin-top:24px">
      <article class="card hadith">
        <div class="row between"><div class="eyebrow">Hadits hari ini</div><button class="icon-btn" data-act="share" aria-label="Bagikan hadits">${I('share', 18)}</button></div>
        <div class="arab" style="margin-top:6px">${h.ar}</div>
        <blockquote>“${E(h.id)}”</blockquote>
        <cite>${h.src} · ${h.grade}</cite>
      </article>
      <a class="card camp-card" href="${go('donasi')}">
        <div class="row between"><div class="eyebrow">Kampanye utama</div><span class="xs muted">${days} hari lagi</span></div>
        <div class="camp-title">${E(c.title)}</div>
        <div class="small muted">${E(c.desc)}</div>
        <div class="camp-amt"><b class="num">${CM.rpShort(c.raised)}</b><span class="muted small"> dari ${CM.rpShort(c.target)}</span></div>
        ${U.progress(pct, 'lg')}
        <div class="row between xs muted" style="margin-top:8px"><span>${Math.round(pct)}% tercapai</span><span>${CM.num(c.donors)} donatur</span></div>
        <span class="btn primary block" style="margin-top:14px">Ikut berdonasi</span>
      </a>
    </div>

    ${sectionHead('Kegiatan masjid', 'Acara, kerja bakti, dan kegiatan sosial', 'agenda', 'Semua kegiatan', embed)}
    <div class="scroller">${kegiatanList().slice(0, 4).map(CM.P.agendaCard).join('')}</div>

    ${CM.R && CM.R.teaser && S().modules.komunitas !== false ? CM.R.teaser(embed) : ''}

    ${sectionHead('Pengumuman', '', null, '', embed)}
    <div class="card pad-0"><div class="list">${anns.map((a) => { const d = new Date(a.date + 'T00:00'); return `<article class="list-item ann"><div class="ann-date"><b>${d.getDate()}</b><span>${CM.BULAN[d.getMonth()].slice(0, 3)}</span></div><div class="grow" style="min-width:0"><div class="title">${a.pinned ? '<span class="badge gold" style="margin-right:6px;vertical-align:2px">Penting</span>' : ''}${E(a.title)}</div><div class="meta">${E(a.body)}</div></div></article>`; }).join('')}</div></div>

    <section class="card report-cta">
      <div class="grow">
        <div class="eyebrow">Transparansi</div>
        <div class="display" style="font-size:1.35rem;margin:4px 0 2px">Laporan kas November</div>
        <div class="small muted">Dipublikasikan DKM setiap bulan, tanpa nama donatur.</div>
      </div>
      <div class="report-stats">
        <div><span class="xs muted">Masuk</span><b class="num" style="color:var(--ok)">${CM.rpShort(CM.monthSum('masuk'))}</b></div>
        <div><span class="xs muted">Keluar</span><b class="num">${CM.rpShort(CM.monthSum('keluar'))}</b></div>
        <div><span class="xs muted">Saldo</span><b class="num">${CM.rpShort(CM.totalSaldo())}</b></div>
      </div>
      <a class="btn" href="${go('laporan')}">Lihat laporan ${I('right', 16)}</a>
    </section>`;
  },
  agenda() {
    const tab = CM.P.agTab || 'kajian';
    const tabs = `<div class="seg block ag-seg" role="tablist" style="max-width:420px;margin-bottom:18px">${[['kajian', 'Jadwal kajian', kajianList().length], ['kegiatan', 'Kegiatan masjid', kegiatanList().length]].map(([v, l, n]) => `<button role="tab" aria-selected="${v === tab}" class="${v === tab ? 'active' : ''}" data-act="agTab" data-v="${v}">${l} <span class="faint">${n}</span></button>`).join('')}</div>`;
    if (tab === 'kajian') {
      const list = kajianList();
      const week = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Ahad'];
      const rutin = { Kamis: list.find((k) => k.id === 'a1'), Ahad: list.find((k) => k.id === 'a4'), Sabtu: list.find((k) => k.id === 'a7'), Jumat: { title: 'Khutbah Jumat', who: 'Khatib bergilir', time: '11.45' } };
      return `${U.pageHead('Agenda', 'Jadwal kajian dan kegiatan masjid, dipisah agar mudah dicari.')}
      ${tabs}
      <div class="section-title">Kajian rutin pekanan</div>
      <div class="card pad-0 week">${week.map((d) => { const k = rutin[d]; return `<div class="week-row ${k ? '' : 'empty'}"><div class="week-day">${d}</div>${k ? `<div class="grow" style="min-width:0"><div class="small truncate" style="font-weight:700">${E(k.title)}</div><div class="xs muted truncate">${E(ustadzName(k.who))} · ${k.time}</div></div>` : '<div class="xs faint">—</div>'}</div>`; }).join('')}</div>
      <div class="section-title" style="margin-top:22px">Kajian terdekat</div>
      <div class="grid lg-2">${list.map(CM.P.kajianCard).join('')}</div>
      ${CM.KJ ? (() => { const r = CM.KJ.get('k0'); return `<div class="section-title" style="margin-top:22px">Rekaman & rangkuman terbaru</div><a class="card row recent-kj" href="#/situs/kajian/k0" style="--gap:14px"><span class="icon-tile lg">${I('mic', 24)}</span><span class="grow" style="min-width:0"><b>${E(r.title)}</b><span class="small muted" style="display:block">${E(r.ustadz)} · ${CM.tgl(r.date, { short: true })} · ${r.rec.dur}</span><span class="badge info" style="margin-top:6px">${I('list', 12)} ${r.summary.points.length} poin rangkuman</span></span>${I('right', 18)}</a>`; })() : ''}
      <div class="notice" style="margin-top:16px">${I('mic', 18)}<span>Rekaman kajian & khutbah bisa didengar ulang di <a href="#/situs/khutbah" style="font-weight:700">Arsip khutbah</a>.</span></div>`;
    }
    const groups = {}; kegiatanList().forEach((a) => (groups[a.date] = groups[a.date] || []).push(a));
    return `${U.pageHead('Agenda', 'Jadwal kajian dan kegiatan masjid, dipisah agar mudah dicari.')}
    ${tabs}
    <div class="chips" style="margin-bottom:16px">${['Semua', 'Ibadah', 'Kegiatan', 'Sosial', 'Rapat'].map((c, i) => `<button class="chip brand ${i === 0 ? 'active' : ''}">${c}</button>`).join('')}</div>
    <div class="stack">${Object.entries(groups).map(([d, list]) => `<div><div class="section-title">${CM.tgl(d, { day: true })}</div><div class="grid lg-2">${list.map(CM.P.agendaCard).join('')}</div></div>`).join('')}</div>`;
  },
  donasi() {
    const p = S().profile;
    return `${U.pageHead('Donasi', 'Dana masuk langsung ke rekening masjid. Laporan penggunaannya terbuka setiap bulan.')}
    <div class="grid lg-2-1 donasi-grid">
      <div class="stack">
        <div class="card brand ornament" style="--orn-color:#fff;--orn-opacity:.07;padding:22px">
          <div class="row" style="--gap:14px;align-items:flex-start"><span class="icon-tile lg" style="background:rgb(255 255 255 / .14);color:var(--accent)">${I('sunrise', 26)}</span><div class="grow"><div class="eyebrow" style="color:var(--accent)">Baru</div><div class="display" style="font-size:1.5rem">Sedekah Subuh Otomatis</div><div class="muted small" style="margin-top:4px">Mulai Rp2.000 per hari, tercatat otomatis tanpa harus ingat. Bisa jeda atau berhenti kapan saja.</div></div></div>
          <button class="btn accent block lg" style="margin-top:16px" data-act="subuhFlow">Mulai sedekah subuh</button>
        </div>
        <div class="section-title" style="margin-top:6px">Kampanye</div>
        ${S().campaigns.map((c) => { const pct = (c.raised / c.target) * 100; return `<div class="card"><div class="row" style="--gap:14px;align-items:flex-start"><div class="media ${c.color === 'gold' ? 'gold' : ''}" style="width:76px;aspect-ratio:1;flex:none"></div><div class="grow"><div style="font-weight:700">${E(c.title)}</div><div class="small muted" style="margin:2px 0 10px">${E(c.desc)}</div>${U.progress(pct)}<div class="row between small" style="margin-top:8px"><span><b class="num">${CM.rpShort(c.raised)}</b> <span class="muted">/ ${CM.rpShort(c.target)}</span></span><span class="muted">${c.donors} donatur</span></div></div></div><button class="btn primary block" style="margin-top:14px" data-act="donate" data-id="${c.id}">Donasi untuk kampanye ini</button></div>`; }).join('')}
      </div>
      <div class="stack donasi-side">
        <div class="card" style="text-align:center">
          <div class="eyebrow">Infak via QRIS</div>
          <div class="qr" style="margin:12px auto;border:1px solid var(--line)">${U.qr('qris-' + p.subdomain, 180)}</div>
          <div style="font-weight:700">${E(p.name)}</div><div class="xs muted">Scan dengan aplikasi bank atau e-wallet apa pun</div>
          <button class="btn sm block" style="margin-top:12px">${I('download', 16)} Simpan gambar QRIS</button>
        </div>
        <div class="card"><div class="eyebrow">Transfer bank</div><div class="row between" style="margin-top:10px"><div><div class="small muted">${p.bank.name}</div><div class="mono" style="font-weight:700;font-size:1.1rem">${p.bank.no}</div><div class="xs muted">a.n. ${E(p.bank.holder)}</div></div><button class="btn sm" data-act="copy">${I('copy', 16)} Salin</button></div></div>
        <div class="notice">${I('shield', 18)}<span>Cinta Masjid tidak menampung dana. Seluruh donasi langsung diterima rekening resmi DKM.</span></div>
      </div>
    </div>`;
  },
  laporan() {
    const kas = S().kas;
    return `${U.pageHead('Laporan transparansi', 'Laporan kas bulanan yang dipublikasikan DKM. Nama donatur tidak ditampilkan.')}
    <div class="row wrap" style="--gap:8px;margin-bottom:16px"><select class="select" style="width:auto"><option>November 2026</option><option>Oktober 2026</option></select></div>
    <div class="grid sm-3" style="margin-bottom:16px">${U.stat({ label: 'Total saldo', value: CM.rpShort(CM.totalSaldo()), icon: 'wallet' })}${U.stat({ label: 'Pemasukan bulan ini', value: CM.rpShort(CM.monthSum('masuk')), icon: 'in', tone: 'ok' })}${U.stat({ label: 'Pengeluaran bulan ini', value: CM.rpShort(CM.monthSum('keluar')), icon: 'out', tone: 'gold' })}</div>
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr><th>Kas</th><th class="r">Masuk</th><th class="r">Keluar</th><th class="r">Saldo</th></tr></thead><tbody>
      ${kas.map((k) => `<tr><td><div class="row" style="--gap:10px"><span style="width:8px;height:24px;border-radius:4px;background:${k.color}"></span><b>${k.name}</b>${k.terikat ? U.badge('terikat', 'gold') : ''}</div></td><td class="r num" style="color:var(--ok)">${CM.rp(CM.monthSum('masuk', k.id))}</td><td class="r num">${CM.rp(CM.monthSum('keluar', k.id))}</td><td class="r num"><b>${CM.rp(CM.saldo(k.id))}</b></td></tr>`).join('')}
    </tbody><tfoot><tr><td>Total</td><td class="r num">${CM.rp(CM.monthSum('masuk'))}</td><td class="r num">${CM.rp(CM.monthSum('keluar'))}</td><td class="r num">${CM.rp(CM.totalSaldo())}</td></tr></tfoot></table></div></div>
    <div class="row wrap" style="--gap:8px;margin-top:14px"><button class="btn">${I('download', 18)} Unduh PDF</button><span class="small muted">Dipublikasikan oleh Ketua DKM · 3 Nov 2026</span></div>`;
  },
  layanan() {
    const L = S().lumbung;
    return `${U.pageHead('Layanan jamaah', 'Daftar, bayar, dan ajukan langsung dari HP.')}
    <div class="grid sm-2 lg-3">
      ${[['cow', 'Daftar qurban 1448 H', `Sapi ${CM.rpShort(S().qurban.hargaBagian)}/bagian · kambing ${CM.rpShort(S().qurban.hargaKambing)} · bisa cicil`, 'qurbanFlow'],
         ['wallet', 'Bayar zakat', 'Kalkulator zakat mal & fitrah, tanda terima digital via WA', 'zakatPub'],
         ['basket', 'Donasi lumbung pangan', 'Sumbang uang atau barang untuk keluarga dhuafa', 'lumbungPub'],
         ['box', 'Pinjam alat', 'Keranda, tenda, kursi, sound system', 'pinjamPub'],
         ['building', 'Pesan aula', 'Akad nikah, walimah, rapat · cek tanggal kosong', 'bookPub'],
         ['chat', 'Tanya ustadz', 'Kirim pertanyaan tanpa perlu masuk, tanpa nama', 'goTanya']].map(([ic, t, d, a]) => `<button class="card" data-act="${a}" style="display:flex;flex-direction:column;gap:10px;align-items:flex-start"><span class="icon-tile gold lg">${I(ic, 24)}</span><b>${t}</b><span class="small muted">${d}</span><span class="small" style="color:var(--brand);font-weight:700;margin-top:auto">Buka ${I('right', 14)}</span></button>`).join('')}
    </div>
    ${sectionHead('Kebutuhan lumbung pangan', null)}
    <div class="card"><div class="grid sm-2 lg-3" style="--gap:18px">${L.items.map((i) => `<div><div class="row between small"><b>${i.name}</b><span class="num">${i.stock}/${i.need} ${i.unit}</span></div><div style="margin-top:6px">${U.progress((i.stock / i.need) * 100, 'gold')}</div></div>`).join('')}</div><p class="xs muted" style="margin-top:14px">Data penerima tidak ditampilkan. Bulan ini 29 keluarga terlayani.</p></div>`;
  },
  tanya() {
    return `${U.pageHead('Tanya Ustadz', 'Bertanya masalah agama tanpa malu. Identitas Anda tidak ditampilkan kepada ustadz.')}
    <div class="grid lg-2" style="align-items:start">
      <div class="card"><form class="stack" onsubmit="return false" id="askForm">
        ${U.field('Pertanyaan', '<textarea class="textarea" name="q" placeholder="Tulis pertanyaan Anda…" style="min-height:140px"></textarea>')}
        ${U.field('Kategori', `<div class="chips" style="flex-wrap:wrap">${['Shalat', 'Zakat', 'Muamalah', 'Keluarga', 'Lainnya'].map((c, i) => `<label class="option-card"><input type="radio" name="cat" value="${c}" ${i === 0 ? 'checked' : ''}><div style="padding:8px 14px;border-radius:999px;font-weight:600;font-size:.88rem">${c}</div></label>`).join('')}</div>`)}
        ${U.field('No. WhatsApp (opsional)', '<input class="input" inputmode="tel" placeholder="Untuk notifikasi saat dijawab">')}
        <label class="check"><input type="checkbox" name="faq" checked><span class="small">Boleh dipublikasikan sebagai FAQ setelah identitas dihapus</span></label>
        <button class="btn primary lg" data-act="ask">${I('send', 18)} Kirim pertanyaan</button>
      </form></div>
      <div class="stack">
        <div class="card soft"><div class="label">Sudah bertanya?</div><div class="row" style="--gap:8px;margin-top:8px"><input class="input mono" placeholder="TU-XXXX" value="TU-7K3Q" id="tiket"><button class="btn primary" data-act="cekTiket">Cek</button></div><div id="tiketRes"></div></div>
        <div class="section-title" style="margin-top:6px">FAQ fiqih lokal</div>
        <div class="chips">${['Semua', 'Shalat', 'Zakat', 'Muamalah', 'Keluarga'].map((c, i) => `<button class="chip brand ${i === 0 ? 'active' : ''}">${c}</button>`).join('')}</div>
        ${S().faq.map((f) => `<details class="card"><summary style="cursor:pointer;font-weight:700;list-style:none" class="row between"><span>${E(f.q)}</span>${I('down', 18, 'faint')}</summary><div style="margin-top:10px">${U.badge(f.cat, 'brand')}<p style="margin-top:8px">${E(f.a)}</p><div class="xs muted" style="margin-top:8px">Dijawab ${f.by} · bersifat edukatif, bukan fatwa resmi</div></div></details>`).join('')}
      </div>
    </div>`;
  },
  khutbah() {
    const list = S().sermons.filter((s) => s.status === 'terbit');
    return `${U.pageHead('Arsip khutbah', 'Dengarkan ulang khutbah Jumat yang terlewat, atau baca ringkasannya.')}
    <div class="row wrap" style="--gap:8px;margin-bottom:16px"><div class="adm-search" style="flex:1;max-width:420px">${I('search', 18)}<input class="input" placeholder="Cari judul, tema, atau khatib"></div></div>
    <div class="chips" style="margin-bottom:16px">${['Semua', 'Akhlak', 'Muamalah', 'Keluarga', 'Ibadah', 'Sosial'].map((c, i) => `<button class="chip brand ${i === 0 ? 'active' : ''}">${c}</button>`).join('')}</div>
    <div class="grid lg-2">${list.map((s) => `<article class="card"><div class="row" style="--gap:6px;margin-bottom:8px">${s.tags.map((t) => U.badge(t, 'brand')).join('')}</div><div class="display" style="font-size:1.2rem">${E(s.title)}</div><div class="small muted" style="margin:2px 0 10px">${E(s.khatib)} · ${CM.tgl(s.date)}</div><p class="small">${E(s.summary)}</p>
      <div class="audio" style="margin-top:14px"><button class="play" data-act="play" aria-label="Putar">${I('play', 18)}</button><div class="track"><i></i></div><span class="xs muted num">${s.dur}</span><button class="btn sm ghost" data-act="speed">1×</button><a class="icon-btn" href="javascript:void(0)" data-act="share" aria-label="Bagikan ke WhatsApp">${I('share', 18)}</a></div></article>`).join('')}</div>`;
  },
  profil() {
    const p = S().profile;
    return `<section class="hero" style="margin-bottom:18px"><div class="hero-bg ornament"></div><div class="arch"></div><div class="hero-in"><div class="hero-head"><div class="greet">Berdiri sejak ${p.founded}</div><h1 style="margin-top:6px">${E(p.name)}</h1><div class="tagline" style="opacity:.85">${E(p.address)}</div></div></div></section>
    <div class="grid lg-2-1">
      <div class="stack">
        <div class="card"><h2 class="display" style="font-size:1.3rem;margin-bottom:8px">Sejarah</h2><p>Masjid Al-Ikhlas dibangun secara swadaya oleh warga RW 07 pada tahun ${p.founded} di atas tanah wakaf. Renovasi besar dilakukan pada 2009, dan kini sedang dibangun lantai 2 untuk menambah daya tampung jamaah.</p></div>
        <div class="card"><h2 class="display" style="font-size:1.3rem;margin-bottom:12px">Galeri</h2><div class="grid cols-2 sm-3" style="--gap:8px">${['Ruang utama', 'Kajian Kamis', 'TPQ', 'Idul Adha 1447', 'Lantai 2', 'Kerja bakti'].map((c, i) => `<div class="media ${i % 3 === 1 ? 'gold' : ''}"><span class="cap">${c}</span></div>`).join('')}</div></div>
      </div>
      <div class="stack">
        <div class="card"><h2 class="display" style="font-size:1.3rem;margin-bottom:12px">Pengurus ${S().pengurus.periode}</h2><div class="stack" style="--gap:10px">${S().pengurus.struktur.slice(0, 5).map((s) => `<div class="row" style="--gap:10px">${U.avatar(s.name, 'sm')}<div><div class="small" style="font-weight:700">${E(s.name)}</div><div class="xs muted">${s.jabatan}</div></div></div>`).join('')}</div></div>
        <div class="card pad-0"><div class="map" style="border-radius:0"><span class="pin" style="left:50%;top:55%">${I('mosque', 40)}</span></div><div style="padding:14px 18px" class="row between"><span class="small">${E(p.city)}</span><button class="btn sm">${I('pin', 16)} Petunjuk arah</button></div></div>
        <div class="grid cols-2" style="--gap:10px">${U.stat({ label: 'Kapasitas', value: CM.num(p.capacity) })}${U.stat({ label: 'Luas tanah', value: '1.240 m²' })}</div>
      </div>
    </div>`;
  },
  akun() {
    const me = S().me;
    if (!me.loggedIn) return `<div style="max-width:420px;margin:24px auto" class="card lift"><div style="text-align:center"><span class="icon-tile lg" style="margin:0 auto 12px">${I('user', 24)}</span><h1 class="display" style="font-size:1.5rem">Akun jamaah</h1><p class="muted small" style="margin:6px 0 18px">Masuk dengan kode OTP WhatsApp. Tanpa kata sandi.</p></div>
      <div class="stack">${U.field('Nomor WhatsApp', '<input class="input" inputmode="tel" value="0812 3456 3321">')}<button class="btn primary lg" data-act="otp">Kirim kode OTP</button><div id="otpBox"></div></div></div>`;
    const t = me.tabungan;
    return `${U.pageHead('Assalamu\'alaikum, ' + me.name.split(' ')[0], 'Riwayat ibadah sosial Anda di ' + E(S().profile.name) + '.', `<button class="btn" data-act="logout">${I('logout', 18)} Keluar</button>`)}
    <div class="grid lg-2">
      <div class="card brand ornament" style="--orn-color:#fff;--orn-opacity:.07"><div class="row between"><div><div class="eyebrow" style="color:var(--accent)">Sedekah Subuh</div><div class="display" style="font-size:1.6rem;margin-top:4px">Hari ke-${me.sub.day}</div><div class="muted small">${CM.rp(me.sub.amount)} · ${me.sub.freq} · ditagih setiap Jumat</div></div>${U.status(me.sub.status)}</div>
        <div class="row" style="--gap:8px;margin-top:16px"><button class="btn on-dark grow" data-act="toastOnly" data-msg="Langganan dijeda">Jeda</button><button class="btn on-dark grow" data-act="toastOnly" data-msg="Langganan dihentikan · tagihan berikutnya dibatalkan">Berhenti</button></div></div>
      <div class="card"><div class="eyebrow">Tabungan qurban 1448 H</div><div class="display num" style="font-size:1.6rem;margin:6px 0">${CM.rp(t.paid)} <span class="small muted" style="font-family:var(--font-body)">/ ${CM.rpShort(t.target)}</span></div>${U.progress((t.paid / t.target) * 100, 'gold')}<div class="small muted" style="margin-top:8px">Cicilan ${CM.rp(t.cicilan)}/bulan · 7 bulan lagi</div></div>
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Riwayat donasi</h3></div><div class="list" style="margin-top:6px">${me.donations.map((d) => `<div class="list-item"><span class="icon-tile sm">${I('heart', 16)}</span><div class="grow"><div class="title small">${d.what}</div><div class="meta">${CM.tgl(d.date)}</div></div><b class="num">${CM.rp(d.amount)}</b></div>`).join('')}</div></div>
      <div class="card pad-0"><div class="card-head" style="padding:16px 18px 0"><h3>Bukti zakat</h3></div><div class="list" style="margin-top:6px">${me.zakat.map((z) => `<div class="list-item"><span class="icon-tile sm gold">${I('file', 16)}</span><div class="grow"><div class="title small">${z.what}</div><div class="meta">${z.year} · ${CM.rp(z.amount)}</div></div><button class="btn sm">${I('download', 16)} PDF</button></div>`).join('')}</div></div>
    </div>`;
  },
};


CM.P.mount = () => CM.every(() => { const el = document.querySelector('[data-pub-count]'); if (el) el.textContent = CM.fmtCountdown(CM.nextPrayer().diffSec); }, 1000);

/* ---------- aksi publik ---------- */
CM.act.pushOn = () => U.toast('Pengingat waktu shalat aktif', 'bell');
CM.act.copy = () => { navigator.clipboard?.writeText(S().profile.bank.no.replace(/\s/g, '')); U.toast('Nomor rekening disalin', 'copy'); };
CM.act.goTanya = () => { location.hash = '#/situs/tanya'; };
CM.act.share = () => U.toast('Membuka WhatsApp untuk berbagi', 'share');
CM.act.speed = (el) => { el.textContent = el.textContent === '1×' ? '1,5×' : '1×'; };
CM.act.play = (el) => {
  const tr = el.parentElement.querySelector('.track i');
  const on = el.dataset.on === '1';
  el.dataset.on = on ? '0' : '1';
  el.innerHTML = I(on ? 'play' : 'pause', 18);
  if (!on) { el._t = setInterval(() => { const w = parseFloat(tr.style.width || 0) + 1; tr.style.width = Math.min(w, 100) + '%'; }, 300); CM.timers.push(el._t); } else clearInterval(el._t);
};
CM.act.donate = (el) => {
  const c = S().campaigns.find((x) => x.id === el.dataset.id);
  U.sheet({
    title: c.title,
    body: `<div class="stack">
      <div class="grid cols-2 sm-3" style="--gap:8px">${[25000, 50000, 100000, 250000, 500000, 1000000].map((v, i) => `<label class="option-card"><input type="radio" name="amt" ${i === 2 ? 'checked' : ''}><div style="text-align:center;font-weight:700">${CM.rpShort(v)}</div></label>`).join('')}</div>
      ${U.field('Nominal lain', U.money('other'))}
      ${U.field('Nama (opsional)', '<input class="input" placeholder="Kosongkan untuk Hamba Allah">')}
      <label class="check"><input type="checkbox" checked><span class="small">Tampilkan sebagai <b>Hamba Allah</b></span></label>
      <div class="card soft" style="text-align:center"><div class="small muted">Scan QRIS masjid lalu konfirmasi</div><div class="qr" style="margin:10px auto">${U.qr('dn' + c.id, 140)}</div></div>
    </div>`,
    foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Jazakallahu khairan! Donasi Anda tercatat">Saya sudah transfer</button>`,
  });
};
CM.act.subuhFlow = () => {
  U.sheet({
    title: 'Sedekah Subuh',
    body: `<div class="stack" id="sbForm">
      <div class="field"><label>Nominal per hari</label><div class="grid cols-2 sm-4" style="--gap:8px;grid-template-columns:repeat(4,1fr)">${[2000, 5000, 10000, 20000].map((v, i) => `<label class="option-card"><input type="radio" name="amt" value="${v}" ${i === 0 ? 'checked' : ''}><div style="text-align:center;font-weight:700">${CM.rpShort(v)}</div></label>`).join('')}</div></div>
      <div class="field"><label>Frekuensi</label><div class="grid cols-2" style="--gap:8px;grid-template-columns:repeat(3,1fr)">${[['7', 'Harian'], ['1', 'Jumat saja'], ['1w', 'Mingguan']].map(([v, l], i) => `<label class="option-card"><input type="radio" name="freq" value="${v}" ${i === 0 ? 'checked' : ''}><div style="text-align:center;font-weight:600;font-size:.9rem">${l}</div></label>`).join('')}</div></div>
      <div class="field"><label>Metode pembayaran berulang</label>${['E-wallet tertaut (GoPay/OVO/DANA)', 'Kartu debit/kredit'].map((m, i) => `<label class="option-card"><input type="radio" name="pm" ${i === 0 ? 'checked' : ''}><div class="row" style="--gap:10px">${I(i ? 'wallet' : 'phone', 18)}<span class="small" style="font-weight:600">${m}</span></div></label>`).join('')}</div>
      <div class="card soft" id="sbSum"></div>
      <label class="check"><input type="checkbox" checked><span class="small">Kirimi saya pesan singkat setiap subuh pukul 04.30</span></label>
    </div>`,
    onMount: (el) => { const f = () => { const d = U.formData(el); const a = Number(d.amt); const wk = d.freq === '7' ? a * 7 : a; document.getElementById('sbSum').innerHTML = `<div class="row between"><span class="small">Ditagih setiap Jumat</span><b class="display num" style="font-size:1.3rem">${CM.rp(wk)}</b></div><div class="xs muted" style="margin-top:4px">${d.freq === '7' ? `7 × ${CM.rp(a)} diakumulasi agar biaya transaksi tetap hemat. Tetap tercatat sebagai sedekah harian.` : 'Ditagih sekali per pekan.'}</div>`; }; el.addEventListener('change', f); f(); },
    foot: `<button class="btn" data-act="close">Nanti</button><button class="btn primary" data-act="closeToast" data-msg="Bismillah! Sedekah subuh Anda dimulai besok">Mulai berlangganan</button>`,
  });
};
CM.act.qurbanFlow = () => U.sheet({
  title: 'Daftar qurban 1448 H',
  body: `<div class="stack">
    <div class="grid cols-2" style="--gap:10px">${[['Sapi (1/7 bagian)', S().qurban.hargaBagian, 'Masuk kelompok otomatis'], ['Kambing / domba', S().qurban.hargaKambing, '1 ekor per orang']].map(([t, h, d], i) => `<label class="option-card"><input type="radio" name="h" ${i === 0 ? 'checked' : ''}><div><span class="icon-tile sm gold" style="margin-bottom:8px">${I('cow', 18)}</span><b class="small">${t}</b><div class="display num" style="font-size:1.15rem">${CM.rp(h)}</div><div class="xs muted">${d}</div></div></label>`).join('')}</div>
    <div class="field"><label>Cara bayar</label><div class="seg block"><button class="active" type="button">Lunas</button><button type="button">Tabungan qurban</button></div><div class="hint">Tabungan: cicilan bulanan dengan pengingat WA tanggal 1.</div></div>
    ${U.field('Nama shohibul qurban', '<input class="input" placeholder="Nama sesuai niat qurban">')}
    ${U.field('No. WhatsApp', '<input class="input" inputmode="tel">')}
  </div>`,
  foot: `<button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="closeToast" data-msg="Pendaftaran qurban diterima · cek WhatsApp">Daftar</button>`,
});
CM.act.zakatPub = () => CM.act.zakatCalc();
CM.act.lumbungPub = () => U.sheet({ title: 'Donasi lumbung pangan', body: `<div class="stack"><div class="seg block"><button class="active" type="button">Uang</button><button type="button">Barang</button></div>${U.field('Nominal', U.money('a', '100.000'))}<p class="small muted">Donasi uang masuk ke Kas Lumbung lalu dibelanjakan sembako oleh bidang sosial. Donasi barang dapat diantar ke sekretariat.</p></div>`, foot: `<button class="btn primary block" data-act="closeToast" data-msg="Jazakallahu khairan">Lanjut bayar</button>` });
CM.act.pinjamPub = () => U.sheet({ title: 'Pinjam alat', body: `<div class="stack">${S().assets.filter((a) => a.loanable).map((a) => `<label class="option-card"><input type="radio" name="a"><div class="row between"><b class="small">${a.name}</b><span class="xs muted">${a.avail} tersedia</span></div></label>`).join('')}<div class="grid cols-2" style="--gap:10px">${U.field('Dari', '<input class="input" type="date" value="2026-11-29">')}${U.field('Sampai', '<input class="input" type="date" value="2026-11-30">')}</div>${U.field('Keperluan', '<input class="input" placeholder="mis. Aqiqah">')}</div>`, foot: `<button class="btn primary block" data-act="closeToast" data-msg="Pengajuan terkirim · menunggu persetujuan DKM">Ajukan</button>` });
CM.act.bookPub = () => U.sheet({ title: 'Pesan aula', body: `<div class="stack"><div class="cal">${['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d) => `<div class="dow">${d}</div>`).join('')}${Array.from({ length: new Date(2026, 11, 1).getDay() }, () => '<div></div>').join('')}${Array.from({ length: 31 }, (_, i) => `<div class="d ${[2, 5].includes(i + 1) ? 'booked full' : ''} ${i + 1 === 12 ? 'sel' : ''}">${i + 1}</div>`).join('')}</div><div class="legend"><span><i style="background:var(--accent)"></i>Terisi</span></div>${U.field('Acara', '<input class="input" value="Akad nikah">')}${U.field('Jam', U.select('j', ['08.00–11.00', '13.00–16.00', '19.30–21.30']))}<div class="card soft row between"><span class="small">Infak sewa aula</span><b>${CM.rp(750000)}</b></div></div>`, foot: `<button class="btn primary block" data-act="closeToast" data-msg="Pemesanan 12 Desember diajukan">Ajukan pemesanan</button>` });
CM.act.ask = () => {
  const code = 'TU-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  U.sheet({ title: 'Pertanyaan terkirim', body: `<div class="stack" style="text-align:center"><span class="icon-tile lg ok" style="margin:0 auto">${I('check', 28)}</span><p>Simpan kode tiket ini untuk mengecek jawaban:</p><div class="display mono" style="font-size:2rem;letter-spacing:.08em">${code}</div><p class="small muted">Pertanyaan bersifat pribadi. Identitas Anda tidak ditampilkan kepada ustadz.</p></div>`, foot: `<button class="btn primary block" data-act="close">Selesai</button>` });
};
CM.act.cekTiket = () => {
  document.getElementById('tiketRes').innerHTML = `<div class="timeline" style="margin-top:14px"><div class="t done"><b>Diterima</b><div class="xs muted">23 Nov · dimoderasi sekretariat</div></div><div class="t now"><b>Diteruskan ke ustadz</b><div class="xs muted">24 Nov · KH. Abdul Malik</div></div><div class="t"><b>Dijawab</b><div class="xs muted">Anda akan dikabari via WA</div></div></div>`;
};
CM.act.otp = () => {
  document.getElementById('otpBox').innerHTML = `<div class="stack" style="--gap:10px"><div class="notice ok">${I('chat', 18)}<span>Kode dikirim ke WhatsApp Anda (gunakan 1234 untuk demo)</span></div><div class="row" style="--gap:8px;justify-content:center">${[1, 2, 3, 4].map((n) => `<input class="input" maxlength="1" value="${n}" style="width:56px;text-align:center;font-size:1.4rem;font-weight:700">`).join('')}</div><button class="btn primary lg" data-act="login">Masuk</button></div>`;
};
CM.act.login = () => { S().me.loggedIn = true; CM.save(); CM.render(); };
CM.act.logout = () => { S().me.loggedIn = false; CM.save(); CM.render(); };
})();

/* aksi agenda (kajian vs kegiatan) */
CM.act.agTab = (el) => { CM.P.agTab = el.dataset.v; CM.render(); };
CM.act.agTabGo = (el) => { CM.P.agTab = el.dataset.v; if (location.hash === '#/situs/agenda') CM.render(); else location.hash = '#/situs/agenda'; };
CM.act.remindKajian = () => CM.ui.toast('Pengingat kajian aktif · H-1 via WhatsApp', 'bell');

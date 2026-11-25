/* Cinta Masjid — Detail Kajian: halaman jamaah, editor DKM, flyer template, dan bagikan */
(() => {
const { icon: I, ui: U, esc: E } = CM;
const S = () => CM.state;

/* ================= DATA ================= */
const BASE = {
  k0: {
    id: 'k0', title: "Surat An-Naba' (bagian 1)", seri: { id: 'tafsir', name: "Tafsir Juz 'Amma", ke: 1 }, date: '2026-11-19', time: "Ba'da Maghrib · 18.05–19.00",
    ustadz: 'Ust. Hasan Basri', tema: 'Tafsir', kitab: "Tafsir Ibnu Katsir · QS. An-Naba' ayat 1–16", place: 'Ruang utama · area akhwat di lantai 2', status: 'selesai', hadir: 61,
    desc: "Pertemuan pembuka seri Tafsir Juz 'Amma. Membahas makna “berita besar” yang diperselisihkan manusia, serta tanda-tanda kekuasaan Allah di alam sekitar sebagai bukti kebangkitan.",
    rec: { dur: '42:18', plays: 186, src: 'Unggahan audio · dikompres 64 kbps' },
    chapters: [['00:00', 'Pembukaan & muqaddimah'], ['03:20', 'Ayat 1–5: berita besar'], ['14:05', 'Ayat 6–11: bumi, gunung, tidur, malam & siang'], ['27:40', 'Ayat 12–16: langit, pelita, dan hujan'], ['38:15', 'Tanya jawab']],
    summary: {
      source: 'ai', status: 'terbit', reviewer: 'Ust. Hasan Basri',
      points: [
        "Surat An-Naba' dibuka dengan pertanyaan tentang “berita besar” yang diperselisihkan manusia, yaitu hari kebangkitan (ayat 1–5).",
        'Allah menunjukkan bukti kekuasaan-Nya lewat ciptaan yang dekat: bumi sebagai hamparan, gunung sebagai pasak, dan manusia diciptakan berpasangan (ayat 6–8).',
        'Tidur dijadikan istirahat, malam sebagai pakaian, dan siang untuk mencari penghidupan. Waktu adalah nikmat yang perlu diatur (ayat 9–11).',
        'Langit yang kokoh, matahari sebagai pelita, dan hujan yang menumbuhkan biji-bijian serta kebun lebat (ayat 12–16).',
        'Dzat yang mampu menciptakan semua itu tentu mampu membangkitkan manusia kembali. Bekal terbaik adalah amal shalih.',
      ],
      dalil: ["QS. An-Naba' 78: 1–16"],
      amalan: 'Renungkan satu nikmat Allah setiap malam sebelum tidur.',
    },
    materi: [['Slide An-Naba bagian 1.pdf', '1,2 MB'], ['Teks ayat & terjemah.pdf', '340 KB']],
    qna: [{ q: "Apakah “an-naba' al-'azhim” hanya bermakna hari kiamat?", a: 'Banyak mufassir menafsirkannya sebagai hari kebangkitan; sebagian lain menyebut Al-Qur’an. Keduanya saling berkaitan.' }],
    flyer: { tpl: 'klasik', src: 'template', headline: 'Berita Besar yang Diperselisihkan' },
  },
  a1: {
    id: 'a1', title: "Surat An-Naba' (bagian 2)", seri: { id: 'tafsir', name: "Tafsir Juz 'Amma", ke: 2 }, date: '2026-11-26', time: "Ba'da Maghrib · 18.05–19.00",
    ustadz: 'Ust. Hasan Basri', tema: 'Tafsir', kitab: "Tafsir Ibnu Katsir · QS. An-Naba' ayat 17–40", place: 'Ruang utama · area akhwat di lantai 2', status: 'akan datang', capacity: 150, hadir: 54, mungkin: 12,
    desc: 'Melanjutkan Surat An-Naba’: Hari Keputusan (Yaumul Fashl), tiupan sangkakala, balasan bagi yang melampaui batas, dan kemenangan bagi orang bertakwa. Terbuka untuk umum, ikhwan dan akhwat.',
    materi: [['Teks ayat & terjemah (ayat 17–40).pdf', '360 KB']],
    incoming: [{ q: 'Bagaimana menyikapi rasa takut berlebihan saat membaca ayat-ayat tentang neraka?', st: 'diteruskan' }, { q: 'Apa beda Yaumul Fashl dan Yaumul Qiyamah?', st: 'diterima' }],
    flyer: { tpl: 'klasik', src: 'ai', headline: 'Bersiap Menuju Hari Keputusan' },
  },
  a4: {
    id: 'a4', title: 'Adab Bertetangga', seri: { id: 'riyadh', name: 'Kuliah Subuh · Riyadhush Shalihin', ke: 7 }, date: '2026-11-29', time: "Ba'da Subuh · 04.15–05.00",
    ustadz: 'Ust. Ahmad Zaki', tema: 'Adab', kitab: 'Riyadhush Shalihin · Bab Hak Tetangga', place: 'Ruang utama', status: 'akan datang', capacity: 120, hadir: 23, mungkin: 8,
    desc: 'Membahas hak-hak tetangga dalam Islam dan praktik sederhana menjadi tetangga yang baik di lingkungan RW 07.', materi: [], incoming: [], flyer: { tpl: 'modern', src: 'template', headline: '' },
  },
  a7: {
    id: 'a7', title: 'Fiqih Thaharah untuk Muslimah', seri: { id: 'muslimah', name: 'Kajian Muslimah', ke: 3 }, date: '2026-12-06', time: '09.00–11.00',
    ustadz: 'Ustadzah Fatimah Az-Zahra', tema: 'Fiqih Muslimah', kitab: 'Fiqih Wanita · Bab Thaharah', place: 'Aula (khusus akhwat)', status: 'akan datang', capacity: 80, hadir: 38, mungkin: 6, akhwat: true,
    desc: 'Kajian khusus akhwat tentang bersuci: wudhu, mandi wajib, dan hal-hal yang sering ditanyakan. Disediakan ruang bermain anak.', materi: [], incoming: [], flyer: { tpl: 'story', src: 'template', headline: '' },
  },
};
const SERIES = {
  tafsir: [['k0', "1 · An-Naba' bagian 1", 'selesai'], ['a1', "2 · An-Naba' bagian 2", 'akan datang'], [null, "3 · An-Nazi'at", 'terjadwal']],
  riyadh: [[null, '6 · Hak Tamu', 'selesai'], ['a4', '7 · Adab Bertetangga', 'akan datang']],
  muslimah: [[null, '2 · Fiqih Haid', 'selesai'], ['a7', '3 · Fiqih Thaharah', 'akan datang']],
};
const AI_POINTS_A1 = [
  'Hari Keputusan (Yaumul Fashl) adalah waktu yang telah ditetapkan; tidak maju dan tidak mundur (ayat 17).',
  'Sangkakala ditiup dan manusia datang berbondong-bondong, langit terbuka dan gunung-gunung dijalankan (ayat 18–20).',
  'Jahannam disiapkan bagi orang yang melampaui batas, sebagai balasan yang setimpal (ayat 21–30).',
  'Orang bertakwa mendapat kemenangan dan karunia yang besar dari Allah (ayat 31–36).',
  'Penutup surat: penyesalan orang kafir, “Alangkah baiknya aku dahulu menjadi tanah” (ayat 40). Ajakan untuk bersiap sejak sekarang.',
];
const AI_HEADLINES = ['Bersiap Menuju Hari Keputusan', 'Berita Besar yang Pasti Datang', 'Tanda Kekuasaan-Nya di Sekitar Kita', 'Mengenal Hari Yaumul Fashl'];

{ const r = S().comm && S().comm.posts.find((p) => p.id === 'r3'); if (r && r.src && r.src[2] === '#/situs/agenda') r.src[2] = '#/situs/kajian/a1'; }
const KS = () => (S().kj = S().kj || {});
CM.KJ = {};
CM.KJ.get = (id) => {
  const base = BASE[id] || (() => { const a = S().agenda.find((x) => x.id === id) || S().agenda[0]; return { id: a.id, title: a.title, seri: null, date: a.date, time: a.time, ustadz: a.who, tema: a.type, kitab: '', place: a.place, status: 'akan datang', desc: '', materi: [], incoming: [], flyer: { tpl: 'klasik', src: 'template', headline: '' } }; })();
  const o = KS()[id] || {};
  return { ...base, ...o, summary: o.summary || base.summary, flyer: { ...base.flyer, ...(o.flyer || {}) }, rsvp: o.rsvp || null };
};
const save = (id, patch) => { KS()[id] = { ...(KS()[id] || {}), ...patch }; CM.save(); };
CM.KJ.url = (k) => `${CM.siteUrl()}/kajian/${k.id}`;
const dayLong = (k) => CM.tgl(k.date, { day: true });

/* ================= FLYER (template Cinta Masjid) ================= */
CM.KJ.flyer = (k, tpl = k.flyer.tpl) => {
  const p = S().profile, head = k.flyer.headline;
  const logo = p.logoImg ? `<img src="${p.logoImg}" alt="" class="fl-logo">` : '';
  const seri = k.seri ? `${E(k.seri.name)} · pertemuan ${k.seri.ke}` : E(k.tema);
  if (tpl === 'modern') return `<div class="flyer fl-modern" role="img" aria-label="Flyer ${E(k.title)}">
    <div class="fl-side"><span class="fl-day">${CM.HARI[new Date(k.date + 'T00:00').getDay()]}</span><span class="fl-date">${new Date(k.date + 'T00:00').getDate()}</span><span class="fl-mon">${CM.BULAN[new Date(k.date + 'T00:00').getMonth()]}</span></div>
    <div class="fl-main"><div class="fl-eye">Kajian rutin · ${seri}</div><div class="fl-title">${E(k.title)}</div>${head ? `<div class="fl-head">${E(head)}</div>` : ''}<div class="fl-who">${E(k.ustadz)}</div><div class="fl-meta">${E(k.time.split('·')[0])} · ${E(p.name)}</div><div class="fl-foot">${logo}<span>${E(CM.KJ.url(k))}</span></div></div></div>`;
  return `<div class="flyer fl-${tpl === 'story' ? 'story' : 'klasik'} ornament" role="img" aria-label="Flyer ${E(k.title)}">
    <div class="fl-top">${logo}<span>${E(p.name)}</span></div>
    <div class="fl-arch"><div class="fl-eye">${k.akhwat ? 'Kajian khusus akhwat' : 'Kajian rutin'}</div><div class="fl-seri">${seri}</div><div class="fl-title">${E(k.title)}</div>${head ? `<div class="fl-head">“${E(head)}”</div>` : ''}</div>
    <div class="fl-who"><small>bersama</small>${E(k.ustadz)}</div>
    <div class="fl-when"><b>${dayLong(k)}</b><span>${E(k.time.split('·')[0])} · ${E(k.place.split('·')[0])}</span></div>
    <div class="fl-foot"><span>${k.akhwat ? 'Khusus akhwat · ada ruang bermain anak' : 'Terbuka untuk umum · ikhwan & akhwat'}</span><span class="fl-qr">${U.qr('kajian-' + k.id, 44)}</span></div></div>`;
};

/* ================= BAGIKAN ================= */
CM.KJ.captions = (k) => {
  const p = S().profile, url = 'https://' + CM.KJ.url(k);
  const seri = k.seri ? `${k.seri.name} (pertemuan ${k.seri.ke})` : k.tema;
  if (k.status === 'selesai' && k.summary && k.summary.status === 'terbit') return {
    wa: `Assalamu'alaikum warahmatullah.\n\nRangkuman kajian ${seri}: ${k.title}\nbersama ${k.ustadz}\n\n${k.summary.points.slice(0, 3).map((x, i) => `${i + 1}. ${x}`).join('\n')}\n\nDengarkan rekaman & rangkuman lengkap:\n${url}\n\nSemoga bermanfaat. Barakallahu fiikum.`,
    ig: `Rangkuman kajian: ${k.title} 📖\n\n${k.summary.points.slice(0, 2).join('\n\n')}\n\nRekaman lengkap di tautan bio.\n\n#KajianIslam #${seri.replace(/[^A-Za-z]/g, '')} #${p.short.replace(/[^A-Za-z]/g, '')}`,
    status: `📖 ${k.title} — rekaman & rangkuman sudah bisa didengar: ${url}`,
  };
  return {
    wa: `Assalamu'alaikum warahmatullah.\n\nHadirilah kajian ${seri}\n*${k.title}*\n\n🗓 ${dayLong(k)}\n🕌 ${k.time}\n📍 ${p.name}, ${k.place}\n🎙 ${k.ustadz}\n\nDetail, pengingat & titip pertanyaan:\n${url}\n\nAjak keluarga dan tetangga. Jazakumullah khairan.`,
    ig: `${k.flyer.headline || k.title} ✨\n\nKajian ${seri} bersama ${k.ustadz}\n${dayLong(k)} · ${k.time.split('·')[0].trim()}\n${p.name}\n\n${k.akhwat ? 'Khusus akhwat.' : 'Terbuka untuk umum, ikhwan & akhwat.'}\n\n#KajianIslam #Kajian${p.city.replace(/\s/g, '')} #${p.short.replace(/[^A-Za-z]/g, '')}`,
    status: `🕌 ${k.title} · ${dayLong(k)}, ${k.time.split('·')[0].trim()} di ${p.name}. Yuk hadir! ${url}`,
  };
};
CM.act.kjShare = (el) => {
  const k = CM.KJ.get(el.dataset.id), caps = CM.KJ.captions(k);
  CM.KJ._cap = caps; CM.KJ._capK = 'wa';
  U.sheet({
    title: 'Bagikan kajian', wide: true,
    body: `<div class="share-grid">
      <div class="stack">
        <div class="share-btns">
          ${[['chat', 'WhatsApp', 'kjShareWa'], ['link', 'Salin link', 'kjCopyLink'], ['download', 'Unduh flyer', 'kjFlyerDl'], ['calendar', 'Kalender', 'kjIcs'], ['qr', 'QR cetak', 'kjQr'], ['share', 'Lainnya', 'kjNative']].map(([ic, l, a]) => `<button class="share-btn" data-act="${a}" data-id="${k.id}"><span>${I(ic, 22)}</span>${l}</button>`).join('')}
        </div>
        <div class="field"><label>Link</label><div class="row" style="--gap:8px"><input class="input mono" readonly value="https://${E(CM.KJ.url(k))}" style="font-size:.85rem"><button class="btn" data-act="kjCopyLink" data-id="${k.id}">${I('copy', 18)}</button></div></div>
        <div class="field"><label>Teks siap kirim</label>
          <div class="seg block" id="capSeg">${[['wa', 'WhatsApp'], ['ig', 'Instagram'], ['status', 'Status']].map(([v, l], i) => `<button class="${i === 0 ? 'active' : ''}" data-act="kjCap" data-v="${v}">${l}</button>`).join('')}</div>
          <textarea class="textarea" id="capTxt" style="min-height:220px;font-size:.88rem">${E(caps.wa)}</textarea>
          <div class="row between"><span class="xs muted">Bisa diedit sebelum disalin</span><button class="btn sm" data-act="kjCopyCap">${I('copy', 16)} Salin teks</button></div>
        </div>
      </div>
      <div class="share-preview">${CM.KJ.flyer(k)}</div>
    </div>`,
  });
};
CM.act.kjCap = (el) => { document.querySelectorAll('#capSeg button').forEach((b) => b.classList.toggle('active', b === el)); document.getElementById('capTxt').value = CM.KJ._cap[el.dataset.v]; };
CM.act.kjCopyCap = () => { navigator.clipboard?.writeText(document.getElementById('capTxt').value); U.toast('Teks disalin', 'copy'); };
CM.act.kjCopyLink = (el) => { navigator.clipboard?.writeText('https://' + CM.KJ.url(CM.KJ.get(el.dataset.id))); U.toast('Link disalin', 'link'); };
CM.act.kjShareWa = () => U.toast('Membuka WhatsApp dengan teks terisi…', 'chat');
CM.act.kjFlyerDl = () => U.toast('Flyer PNG diunduh (1080×1350 & 1080×1920)', 'download');
CM.act.kjIcs = () => U.toast('File kalender (.ics) diunduh · pengingat 1 jam sebelumnya', 'calendar');
CM.act.kjNative = () => (navigator.share ? navigator.share({ title: 'Kajian', url: location.href }).catch(() => {}) : U.toast('Gunakan Salin link', 'info'));
CM.act.kjQr = (el) => { const k = CM.KJ.get(el.dataset.id); U.sheet({ title: 'QR untuk dicetak', body: `<div style="text-align:center" class="stack"><div class="qr" style="margin:0 auto;border:1px solid var(--line)">${U.qr('kajian-' + k.id, 200)}</div><b>${E(k.title)}</b><span class="mono small">${E(CM.KJ.url(k))}</span><p class="xs muted">Tempel di mading masjid. Jamaah memindai untuk konfirmasi hadir, pengingat, dan rekaman setelah kajian.</p></div>`, foot: `<button class="btn primary block" data-act="closeToast" data-msg="QR A5 siap dicetak (PDF)">${I('download', 18)} Unduh PDF A5</button>` }); };

/* ================= HALAMAN JAMAAH ================= */
const statusBadge = (k) => k.status === 'selesai' ? U.badge('Selesai · rekaman tersedia', 'ok') : U.badge('Akan datang', 'brand');
CM.P.pages.kajian = (embed) => {
  const k = CM.KJ.get(CM.P.sub || 'a1');
  const nav = (id) => (embed || !id ? 'javascript:void(0)' : '#/situs/kajian/' + id);
  const upcoming = k.status !== 'selesai';
  const rs = k.rsvp;
  const series = k.seri ? SERIES[k.seri.id] || [] : [];
  const sum = k.summary && k.summary.status === 'terbit' ? k.summary : null;
  return `<div class="kj">
    <a class="back-link" href="${embed ? 'javascript:void(0)' : '#/situs/agenda'}">${I('left', 16)} Agenda kajian</a>
    <section class="kj-hero">
      <div class="kj-flyer">${CM.KJ.flyer(k)}</div>
      <div class="kj-info">
        <div class="row wrap" style="--gap:6px">${statusBadge(k)}${k.seri ? U.badge(`${k.seri.name} · pertemuan ${k.seri.ke}`, 'gold') : ''}${k.akhwat ? U.badge('Khusus akhwat', '') : ''}</div>
        <h1 class="kj-title">${E(k.title)}</h1>
        <div class="kj-ustadz">${U.avatar(k.ustadz)}<div><b>${E(k.ustadz)}</b><div class="xs muted">${E(k.tema)}${k.kitab ? ' · ' + E(k.kitab) : ''}</div></div></div>
        <div class="kj-facts">
          <div>${I('calendar', 18)}<span><b>${dayLong(k)}</b><br><span class="muted small">${E(k.time)}</span></span></div>
          <div>${I('pin', 18)}<span><b>${E(S().profile.name)}</b><br><span class="muted small">${E(k.place)}</span></span></div>
          ${upcoming && k.capacity ? `<div>${I('users', 18)}<span><b>${k.hadir + (rs === 'hadir' ? 1 : 0)} akan hadir</b><br><span class="muted small">kapasitas ${k.capacity} · ${k.mungkin + (rs === 'mungkin' ? 1 : 0)} mungkin</span></span></div>` : `<div>${I('users', 18)}<span><b>${k.hadir} jamaah hadir</b><br><span class="muted small">${k.rec ? k.rec.plays + '× rekaman diputar' : ''}</span></span></div>`}
        </div>
        ${upcoming ? `<div class="kj-actions">
          <div class="seg">${['hadir', 'mungkin'].map((v) => `<button class="${rs === v ? 'active' : ''}" data-act="kjRsvp" data-id="${k.id}" data-v="${v}">${v === 'hadir' ? 'Saya hadir' : 'Mungkin'}</button>`).join('')}</div>
          <button class="btn" data-act="kjRemind">${I('bell', 18)} Ingatkan H-1</button>
          <button class="btn" data-act="kjIcs">${I('calendar', 18)} Kalender</button>
          <button class="btn primary" data-act="kjShare" data-id="${k.id}">${I('share', 18)} Bagikan</button>
        </div>` : `<div class="kj-actions"><a class="btn primary" href="#kj-rec" data-act="kjPlayTop">${I('play', 18)} Putar rekaman</a><button class="btn" data-act="kjShare" data-id="${k.id}">${I('share', 18)} Bagikan rangkuman</button></div>`}
      </div>
    </section>

    <div class="grid lg-2-1" style="margin-top:20px;align-items:start">
      <div class="stack" style="--gap:16px">
        ${k.desc ? `<section class="card"><h2 class="kj-h">Tentang kajian</h2><p>${E(k.desc)}</p></section>` : ''}
        ${k.rec ? `<section class="card" id="kj-rec"><div class="row between"><h2 class="kj-h">Rekaman kajian</h2><span class="xs muted">${k.rec.dur} · ${k.rec.plays}× diputar</span></div>
          <div class="audio" style="margin-top:6px"><button class="play" data-act="play" aria-label="Putar rekaman">${I('play', 18)}</button><div class="track"><i></i></div><button class="btn sm ghost" data-act="speed">1×</button><button class="btn sm ghost" data-act="toastOnly" data-msg="Audio disimpan untuk diputar tanpa internet">${I('download', 16)}</button></div>
          <div class="chapters">${(k.chapters || []).map(([t, l]) => `<button class="chapter" data-act="toastOnly" data-msg="Lompat ke ${t}"><span class="mono">${t}</span>${E(l)}</button>`).join('')}</div>
        </section>` : upcoming ? `<section class="card dashed"><div class="row" style="--gap:12px">${I('mic', 22)}<div><b>Rekaman & rangkuman</b><div class="small muted">Tersedia di halaman ini setelah kajian selesai. Aktifkan pengingat agar dikabari.</div></div></div></section>` : ''}
        ${sum ? `<section class="card"><div class="row between wrap" style="--gap:8px"><h2 class="kj-h">Poin-poin kajian</h2>${sum.source === 'ai' ? `<span class="badge info">${I('sparkle', 12)} Dibantu AI · ditinjau ${E(sum.reviewer)}</span>` : `<span class="badge">Ditulis oleh ${E(sum.reviewer)}</span>`}</div>
          <ol class="kj-points">${sum.points.map((x) => `<li>${E(x)}</li>`).join('')}</ol>
          ${sum.amalan ? `<div class="notice ok" style="margin-top:12px">${I('star', 18)}<span><b>Amalan pekan ini:</b> ${E(sum.amalan)}</span></div>` : ''}
          ${sum.dalil && sum.dalil.length ? `<div class="row wrap" style="--gap:6px;margin-top:12px"><span class="xs muted">Rujukan:</span>${sum.dalil.map((d) => U.badge(d, 'brand')).join('')}</div>` : ''}
        </section>` : ''}
        ${k.qna && k.qna.length ? `<section class="card"><h2 class="kj-h">Tanya jawab</h2>${k.qna.map((x) => `<details class="qa" open><summary>${E(x.q)}</summary><p class="small">${E(x.a)}</p></details>`).join('')}</section>` : ''}
        ${upcoming ? `<section class="card"><h2 class="kj-h">Titip pertanyaan untuk ustadz</h2><p class="small muted">Dikirim tanpa nama. Pertanyaan terpilih dijawab saat sesi tanya jawab.</p><textarea class="textarea" id="kjQ" placeholder="Tulis pertanyaan Anda…" style="margin-top:10px;min-height:90px"></textarea><div class="row between" style="margin-top:10px"><span class="xs muted">${(k.incoming || []).length} pertanyaan sudah masuk</span><button class="btn primary" data-act="kjAsk" data-id="${k.id}">${I('send', 18)} Kirim</button></div></section>` : ''}
      </div>
      <aside class="stack" style="--gap:16px">
        ${series.length ? `<section class="card"><h2 class="kj-h">Seri ${E(k.seri.name)}</h2><div class="series">${series.map(([id, l, st]) => `<a class="series-item ${id === k.id ? 'on' : ''} ${id ? '' : 'disabled'}" href="${nav(id)}"><span class="dotst ${st === 'selesai' ? 'ok' : st === 'akan datang' ? 'brand' : ''}"></span><span class="grow small">${E(l)}</span><span class="xs muted">${st === 'selesai' ? I('mic', 13) : ''}</span></a>`).join('')}</div></section>` : ''}
        ${k.materi && k.materi.length ? `<section class="card"><h2 class="kj-h">Materi</h2>${k.materi.map(([n, s]) => `<button class="list-item" style="padding:10px 0;border:0" data-act="toastOnly" data-msg="Mengunduh ${E(n)}"><span class="icon-tile sm">${I('file', 16)}</span><span class="grow small" style="text-align:left">${E(n)}<br><span class="xs muted">${s}</span></span>${I('download', 16)}</button>`).join('')}</section>` : ''}
        <section class="card"><h2 class="kj-h">Lokasi</h2><div class="map" style="min-height:140px"><span class="pin" style="left:50%;top:58%">${I('mosque', 34)}</span></div><div class="small" style="margin-top:10px">${E(S().profile.address)}</div>${k.place.includes('akhwat') ? `<div class="xs muted" style="margin-top:4px">${I('info', 12)} ${E(k.place.split('·').slice(1).join('·') || k.place)}</div>` : ''}</section>
        <section class="card accent"><div class="row" style="--gap:12px"><span class="icon-tile gold">${I('heart')}</span><div class="grow"><b class="small">Infak kajian</b><div class="xs muted">Untuk konsumsi & operasional majelis ilmu</div></div><a class="btn sm" href="${embed ? 'javascript:void(0)' : '#/situs/donasi'}">Infak</a></div></section>
        <section class="card"><div class="row" style="--gap:12px"><span class="icon-tile">${I('users')}</span><div class="grow"><b class="small">Diskusi di Ruang Jamaah</b><div class="xs muted">Berbagi faedah dengan jamaah lain</div></div><a class="btn sm" href="${embed ? 'javascript:void(0)' : '#/situs/komunitas/feed'}">Buka</a></div></section>
      </aside>
    </div>
  </div>`;
};
CM.act.kjRsvp = (el) => { const k = CM.KJ.get(el.dataset.id); save(k.id, { rsvp: k.rsvp === el.dataset.v ? null : el.dataset.v }); CM.render(); };
CM.act.kjRemind = () => U.toast('Pengingat WA H-1 & push 1 jam sebelumnya aktif', 'bell');
CM.act.kjPlayTop = () => { document.getElementById('kj-rec')?.scrollIntoView({ behavior: 'smooth' }); };
CM.act.kjAsk = (el) => { const t = document.getElementById('kjQ'); if (!t.value.trim()) return t.focus(); const k = CM.KJ.get(el.dataset.id); save(k.id, { incoming: [...(k.incoming || []), { q: t.value.trim(), st: 'diterima' }] }); CM.render(); U.toast('Pertanyaan terkirim tanpa nama', 'send'); };

/* ================= EDITOR DI PANEL DKM ================= */
const ib = CM.A.mods.ibadah, ibRender = ib.render;
ib.render = (tab) => (tab === 'kajian' ? (CM.A.kjSel ? editor(CM.A.kjSel) : kajianList()) : ibRender(tab));
const kajianList = () => {
  const ids = ['k0', 'a1', 'a4', 'a7'];
  return `${U.pageHead('Kajian', 'Kelola detail, rekaman, rangkuman, flyer, dan cara membagikan setiap kajian.', `<button class="btn primary" data-act="toastOnly" data-msg="Form kajian baru (simulasi)">${I('plus', 18)} Kajian</button>`)}
  <div class="stack" style="--gap:12px">${ids.map((id) => { const k = CM.KJ.get(id); const sum = k.summary; return `<div class="card kj-row">
    <div class="kj-thumb">${CM.KJ.flyer(k)}</div>
    <div class="grow" style="min-width:0"><div class="row wrap" style="--gap:6px">${statusBadge(k)}${k.seri ? U.badge(k.seri.name + ' · ' + k.seri.ke, 'gold') : ''}</div>
      <div style="font-weight:700;margin-top:6px">${E(k.title)}</div><div class="small muted">${dayLong(k)} · ${E(k.ustadz)}</div>
      <div class="row wrap xs" style="--gap:10px;margin-top:8px">${[['mic', k.rec ? 'Rekaman ✓' : 'Belum ada rekaman', !!k.rec], ['list', sum ? (sum.status === 'terbit' ? 'Rangkuman terbit' : 'Rangkuman draf') : 'Belum ada rangkuman', sum && sum.status === 'terbit'], ['palette', 'Flyer ' + (k.flyer.src === 'upload' ? 'unggahan' : 'desain Cinta Masjid'), true], ['chat', (k.incoming || []).length + ' pertanyaan', true]].map(([ic, t, ok]) => `<span class="row" style="--gap:4px;color:${ok ? 'var(--ink)' : 'var(--faint)'}">${I(ic, 13)} ${t}</span>`).join('')}</div>
    </div>
    <div class="row" style="--gap:6px"><a class="btn sm ghost" href="#/situs/kajian/${id}" target="_blank" title="Lihat halaman jamaah">${I('eye', 16)}</a><button class="btn sm primary" data-act="kjEdit" data-id="${id}">Kelola</button></div>
  </div>`; }).join('')}</div>`;
};
const ETABS = [['info', 'Info'], ['rekaman', 'Rekaman'], ['rangkuman', 'Rangkuman'], ['flyer', 'Flyer'], ['tanya', 'Pertanyaan'], ['bagikan', 'Bagikan']];
const editor = (id) => {
  const k = CM.KJ.get(id), t = CM.A.kjTab || 'info';
  return `<button class="back-link" data-act="kjBack">${I('left', 16)} Semua kajian</button>
  ${U.pageHead(E(k.title), `${dayLong(k)} · ${E(k.ustadz)}`, `<a class="btn" href="#/situs/kajian/${id}" target="_blank">${I('external', 18)} Halaman jamaah</a>`)}
  <nav class="chips" style="margin-bottom:16px">${ETABS.map(([v, l]) => `<button class="chip ${t === v ? 'active' : ''}" data-act="kjTab" data-v="${v}">${l}</button>`).join('')}</nav>
  ${ED[t](k)}`;
};
const ED = {
  info: (k) => `<div class="card" style="max-width:820px"><div class="stack">
    <div class="grid sm-2" style="--gap:12px">${U.field('Judul', U.input('t', k.title))}${U.field('Ustadz', U.select('u', S().ustadz.map((x) => x.name), k.ustadz))}</div>
    <div class="grid sm-3" style="--gap:12px">${U.field('Seri', U.input('s', k.seri ? k.seri.name : '', 'placeholder="(tidak berseri)"'))}${U.field('Pertemuan ke', U.input('n', k.seri ? k.seri.ke : '', 'inputmode="numeric"'))}${U.field('Tema', U.input('tm', k.tema))}</div>
    ${U.field('Kitab / rujukan', U.input('kb', k.kitab))}
    ${U.field('Deskripsi', `<textarea class="textarea">${E(k.desc)}</textarea>`, 'Tampil di halaman jamaah dan dipakai AI untuk menyusun teks ajakan.')}
    <div class="grid sm-3" style="--gap:12px">${U.field('Tanggal', `<input class="input" type="date" value="${k.date}">`)}${U.field('Waktu', U.input('w', k.time))}${U.field('Kapasitas', U.input('c', k.capacity || '', 'inputmode="numeric"'))}</div>
    ${U.field('Tempat', U.input('p', k.place))}
    <div class="row wrap" style="--gap:16px"><label class="check"><input type="checkbox" ${k.akhwat ? 'checked' : ''}><span class="small">Khusus akhwat</span></label><label class="check"><input type="checkbox" checked><span class="small">Konfirmasi hadir & pengingat WA</span></label><label class="check"><input type="checkbox" checked><span class="small">Titip pertanyaan</span></label><label class="check"><input type="checkbox" checked><span class="small">Posting otomatis ke Ruang Jamaah</span></label></div>
    <label class="card dashed row" style="cursor:pointer;--gap:12px"><input type="file" hidden data-act="toastFile"><span class="icon-tile">${I('file')}</span><span class="grow"><b class="small">Materi (PDF/slide)</b><br><span class="xs muted">${(k.materi || []).length} file terlampir</span></span></label>
    <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="closeToast" data-msg="Info kajian disimpan">Simpan</button></div>
  </div></div>`,
  rekaman: (k) => `<div class="grid lg-2" style="align-items:start">
    <div class="card"><div class="card-head"><h3>Rekaman</h3>${k.rec ? U.badge('Terbit', 'ok') : U.badge('Belum ada', '')}</div>
      ${k.rec ? `<div class="audio"><button class="play" data-act="play" aria-label="Putar">${I('play', 18)}</button><div class="track"><i></i></div><span class="xs muted">${k.rec.dur}</span></div><div class="xs muted" style="margin-top:8px">${k.rec.src}</div>` : ''}
      <label class="card dashed" style="cursor:pointer;text-align:center;margin-top:12px"><input type="file" hidden accept="audio/*,video/*" data-act="kjUpload" data-id="${k.id}"><span class="icon-tile" style="margin:0 auto 8px">${I('upload')}</span><b class="small">${k.rec ? 'Ganti rekaman' : 'Unggah audio/video'}</b><div class="xs muted">mp3/m4a/wav/mp4 · maks. 100 MB · dikompres ±64 kbps</div></label>
      ${U.field('atau tautan YouTube/siaran', '<input class="input" placeholder="https://youtube.com/…">')}
    </div>
    <div class="card"><div class="card-head"><h3>Bab & penanda waktu</h3><button class="btn sm" data-act="kjAiChapters" data-id="${k.id}">${I('sparkle', 14)} Buat dengan AI</button></div>
      ${(k.chapters || []).length ? `<div class="stack" style="--gap:8px">${k.chapters.map(([t, l]) => `<div class="row" style="--gap:8px"><input class="input mono" value="${t}" style="width:84px;min-height:40px"><input class="input" value="${E(l)}" style="min-height:40px"></div>`).join('')}</div>` : '<p class="small muted">Belum ada bab. AI bisa membuatnya dari transkrip setelah rekaman diunggah.</p>'}
    </div>
  </div>`,
  rangkuman: (k) => {
    const s = k.summary;
    const loading = CM.KJ._loading === k.id;
    return `<div class="grid lg-2-1" style="align-items:start">
      <div class="card">
        <div class="row between wrap" style="--gap:8px;margin-bottom:12px"><div class="seg"><button class="${!s || s.source === 'manual' ? 'active' : ''}" data-act="kjSumManual" data-id="${k.id}">Tulis manual</button><button class="${s && s.source === 'ai' ? 'active' : ''}" data-act="kjAiSum" data-id="${k.id}">${I('sparkle', 14)} Dibantu AI</button></div>${s ? (s.status === 'terbit' ? U.badge('Terbit', 'ok') : U.badge('Draf · belum terbit', 'warn')) : ''}</div>
        ${loading ? `<div class="ai-loading">${I('sparkle', 20)}<div><b>Menyusun draf dari rekaman…</b><div class="xs muted">Transkripsi audio → ringkasan poin → cek rujukan ayat</div></div></div>`
          : s ? `${s.source === 'ai' && s.status !== 'terbit' ? `<div class="notice warn" style="margin-bottom:12px">${I('alert', 18)}<span>Draf dari AI. Periksa setiap poin, terutama ayat, hadits, dan istilah. AI bisa keliru; jangan terbitkan tanpa ditinjau ustadz.</span></div>` : ''}
            <div class="stack" style="--gap:8px" id="sumPts">${s.points.map((x, i) => `<div class="row" style="--gap:8px;align-items:flex-start"><span class="pt-n">${i + 1}</span><textarea class="textarea" style="min-height:64px">${E(x)}</textarea></div>`).join('')}</div>
            <button class="btn sm ghost" style="margin-top:8px" data-act="kjAddPt">${I('plus', 14)} Tambah poin</button>
            <div class="grid sm-2" style="--gap:12px;margin-top:12px">${U.field('Rujukan (ayat/hadits)', `<input class="input" value="${E((s.dalil || []).join('; '))}">`)}${U.field('Amalan pekan ini (opsional)', `<input class="input" value="${E(s.amalan || '')}">`)}</div>
            ${U.field('Ditinjau oleh', U.select('rv', S().ustadz.map((x) => x.name), s.reviewer || k.ustadz))}
            <label class="check" style="margin-top:12px"><input type="checkbox" id="reviewed" ${s.status === 'terbit' ? 'checked' : ''}><span class="small">Saya sudah meninjau isi dan rujukannya sesuai penyampaian ustadz</span></label>
            <div class="row" style="justify-content:flex-end;--gap:8px;margin-top:12px"><button class="btn" data-act="kjSumSave" data-id="${k.id}" data-pub="0">Simpan draf</button><button class="btn primary" data-act="kjSumSave" data-id="${k.id}" data-pub="1">Terbitkan</button></div>`
          : `<div class="empty">${I('list', 28)}<div style="margin-top:8px"><b>Belum ada rangkuman</b></div><div class="small">${k.rec ? 'Tulis manual, atau minta AI menyusun draf dari rekaman.' : 'Unggah rekaman agar AI bisa menyusun draf, atau tulis manual.'}</div></div>`}
      </div>
      <div class="card soft"><b class="small">Prinsip ringkasan AI</b><ul class="adab small" style="margin-top:8px"><li>Selalu berupa draf, tidak pernah terbit otomatis.</li><li>Wajib ditinjau ustadz atau pengurus yang ditunjuk.</li><li>Label “Dibantu AI · ditinjau …” tampil untuk jamaah.</li><li>Rujukan ayat & hadits dicek ulang secara manual.</li></ul></div>
    </div>`;
  },
  flyer: (k) => {
    const tpl = k.flyer.tpl;
    return `<div class="grid lg-2" style="align-items:start">
      <div class="stack">
        <div class="card"><div class="card-head"><h3>Desain Cinta Masjid</h3><span class="xs muted">warna & logo mengikuti identitas masjid</span></div>
          <div class="grid cols-2" style="--gap:10px;grid-template-columns:repeat(3,1fr)">${[['klasik', 'Klasik 4:5'], ['modern', 'Modern 4:5'], ['story', 'Status 9:16']].map(([v, l]) => `<button class="tpl-pick ${tpl === v ? 'on' : ''}" data-act="kjTpl" data-id="${k.id}" data-v="${v}"><div class="tpl-mini">${CM.KJ.flyer(k, v)}</div><span class="xs">${l}</span></button>`).join('')}</div>
        </div>
        <div class="card"><div class="card-head"><h3>${I('sparkle', 16)} Judul menarik dengan AI</h3></div>
          <p class="small muted">AI mengusulkan judul pendek dari deskripsi & kitab. Desain tetap memakai pola Cinta Masjid; tanpa gambar wajah atau makhluk bernyawa.</p>
          <div class="stack" style="--gap:6px;margin-top:10px">${AI_HEADLINES.map((h) => `<label class="option-card"><input type="radio" name="hl" ${k.flyer.headline === h ? 'checked' : ''} data-act="kjHeadline" data-id="${k.id}" value="${E(h)}"><div class="small" style="font-weight:600">${E(h)}</div></label>`).join('')}<label class="option-card"><input type="radio" name="hl" ${!k.flyer.headline ? 'checked' : ''} data-act="kjHeadline" data-id="${k.id}" value=""><div class="small muted">Tanpa judul tambahan</div></label></div>
        </div>
        <label class="card dashed row" style="cursor:pointer;--gap:12px"><input type="file" hidden accept="image/*" data-act="kjFlyerUp" data-id="${k.id}"><span class="icon-tile">${I('upload')}</span><span><b class="small">Unggah flyer sendiri</b><br><span class="xs muted">JPG/PNG · menggantikan desain bawaan</span></span></label>
      </div>
      <div class="stack"><div class="flyer-stage ${tpl === 'story' ? 'story' : ''}">${CM.KJ.flyer(k)}</div><div class="row" style="--gap:8px;justify-content:center"><button class="btn" data-act="kjFlyerDl">${I('download', 18)} Unduh PNG</button><button class="btn primary" data-act="kjShare" data-id="${k.id}">${I('share', 18)} Bagikan</button></div></div>
    </div>`;
  },
  tanya: (k) => `<div class="card" style="max-width:820px"><div class="card-head"><h3>Pertanyaan dari jamaah</h3><span class="xs muted">anonim · dimoderasi sekretaris</span></div>
    ${(k.incoming || []).length ? listCard((k.incoming || []).map((q) => `<div class="list-item" style="flex-wrap:wrap"><span class="icon-tile sm">${I('chat', 16)}</span><span class="grow small" style="min-width:200px">${E(q.q)}</span>${U.status(q.st)}<button class="btn sm" data-act="toastOnly" data-msg="Diteruskan ke ustadz">Teruskan</button></div>`).join('')) : (k.qna || []).length ? listCard(k.qna.map((x) => `<div class="list-item" style="align-items:flex-start"><span class="icon-tile sm ok">${I('check', 16)}</span><div class="small"><b>${E(x.q)}</b><div class="muted">${E(x.a)}</div></div></div>`).join('')) : '<p class="small muted">Belum ada pertanyaan.</p>'}
    <p class="xs muted" style="margin-top:10px">Pertanyaan menyangkut keselamatan (mis. KDRT) otomatis diarahkan ke penanganan khusus, seperti di Tanya Ustadz.</p></div>`,
  bagikan: (k) => { const c = CM.KJ.captions(k); return `<div class="grid lg-2" style="align-items:start">
    <div class="card"><div class="card-head"><h3>Teks siap kirim</h3>${U.badge(k.status === 'selesai' ? 'Versi rangkuman' : 'Versi undangan', 'brand')}</div><textarea class="textarea" style="min-height:260px;font-size:.88rem">${E(c.wa)}</textarea><div class="row" style="--gap:8px;margin-top:10px"><button class="btn" data-act="toastOnly" data-msg="Teks disalin">${I('copy', 16)} Salin</button><button class="btn primary" data-act="kjShare" data-id="${k.id}">${I('share', 16)} Semua opsi bagikan</button></div></div>
    <div class="card"><div class="card-head"><h3>Jadwal kirim otomatis</h3></div>${[['Postingan resmi di Ruang Jamaah', 'Saat diterbitkan', true], ['Pesan WA ke jamaah', 'H-1, 16.00', true], ['Pengingat ke yang konfirmasi hadir', 'H-1 & 1 jam sebelum', true], ['Tampil di Mode TV', 'H-3 s.d. hari H', true], ['Kabar rekaman & rangkuman', 'Setelah rangkuman terbit', true]].map(([t, w, on]) => `<label class="row between" style="padding:8px 0;border-top:1px solid var(--line);gap:12px"><span><b class="small">${t}</b><br><span class="xs muted">${w}</span></span>${U.switch('', on, 'toastSwitch')}</label>`).join('')}</div>
  </div>`; },
};
const listCard = (rows) => `<div class="card pad-0" style="box-shadow:none"><div class="list">${rows}</div></div>`;
CM.act.kjEdit = (el) => { CM.A.kjSel = el.dataset.id; CM.A.kjTab = 'info'; CM.render(); window.scrollTo(0, 0); };
CM.act.kjBack = () => { CM.A.kjSel = null; CM.render(); };
CM.act.kjTab = (el) => { CM.A.kjTab = el.dataset.v; CM.render(); };
CM.act.kjTpl = (el) => { const k = CM.KJ.get(el.dataset.id); save(k.id, { flyer: { ...k.flyer, tpl: el.dataset.v, src: 'template' } }); CM.render(); };
CM.act.kjHeadline = (el) => { const k = CM.KJ.get(el.dataset.id); save(k.id, { flyer: { ...k.flyer, headline: el.value, src: el.value ? 'ai' : 'template' } }); CM.render(); };
CM.act.kjFlyerUp = () => U.toast('Flyer unggahan dipakai (simulasi)', 'upload');
CM.act.kjUpload = () => U.toast('Rekaman diunggah · mengompres & membuat transkrip…', 'upload');
CM.act.kjAiChapters = () => U.toast('Bab dibuat dari transkrip · silakan periksa', 'sparkle');
CM.act.kjSumManual = (el) => { const k = CM.KJ.get(el.dataset.id); if (!k.summary) save(k.id, { summary: { source: 'manual', status: 'draf', reviewer: k.ustadz, points: [''], dalil: [], amalan: '' } }); else save(k.id, { summary: { ...k.summary, source: 'manual' } }); CM.render(); };
CM.act.kjAiSum = (el) => {
  const k = CM.KJ.get(el.dataset.id);
  if (k.summary && k.summary.source === 'ai') return;
  CM.KJ._loading = k.id; CM.render();
  setTimeout(() => {
    CM.KJ._loading = null;
    const pts = k.id === 'a1' ? AI_POINTS_A1 : (BASE.k0.summary.points);
    save(k.id, { summary: { source: 'ai', status: 'draf', reviewer: k.ustadz, points: pts.slice(), dalil: [k.kitab.split('·').pop().trim()], amalan: '' } });
    if (location.hash.includes('/admin/ibadah')) CM.render();
    U.toast('Draf rangkuman siap ditinjau', 'sparkle');
  }, 1400);
};
CM.act.kjAddPt = () => { const box = document.getElementById('sumPts'); const n = box.children.length + 1; box.insertAdjacentHTML('beforeend', `<div class="row" style="--gap:8px;align-items:flex-start"><span class="pt-n">${n}</span><textarea class="textarea" style="min-height:64px"></textarea></div>`); };
CM.act.kjSumSave = (el) => {
  const k = CM.KJ.get(el.dataset.id); const pub = el.dataset.pub === '1';
  if (pub && !document.getElementById('reviewed').checked) return U.toast('Centang konfirmasi peninjauan dulu', 'alert');
  const pts = [...document.querySelectorAll('#sumPts textarea')].map((t) => t.value.trim()).filter(Boolean);
  if (pub && !pts.length) return U.toast('Isi minimal satu poin', 'alert');
  save(k.id, { summary: { ...k.summary, points: pts, status: pub ? 'terbit' : 'draf', reviewer: document.querySelector('[name=rv]').value } });
  S().logs.unshift({ who: 'Dewi Lestari', what: `${pub ? 'Menerbitkan' : 'Menyimpan draf'} rangkuman kajian "${k.title}"`, mod: 'Ibadah', at: '2026-11-25 ' + new Date().toTimeString().slice(0, 5) });
  CM.save(); CM.render(); U.toast(pub ? 'Rangkuman terbit di halaman kajian' : 'Draf disimpan');
};
})();

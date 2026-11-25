/* Cinta Masjid — Mode TV (layar masjid, tanpa login, tetap jalan offline) */
(() => {
const { icon: I, esc: E } = CM;
const S = () => CM.state;
CM.TV = { demo: null };

CM.TV.html = (preview = false) => {
  const p = S().profile, pt = CM.prayerTimes(), nx = CM.nextPrayer(), h = CM.hadithToday();
  const now = new Date();
  const ann = S().announcements.map((a) => `<span>${E(a.title)}</span>`).join('') + `<span>Saldo Kas Umum ${CM.rp(CM.saldo('umum'))}</span><span>Infak via QRIS: scan kode di papan pengumuman</span>`;
  return `
  <div class="tv ornament" ${preview ? 'style="position:absolute"' : ''}>
    <div class="tv-top">
      <div class="row" style="--gap:1.4vw">${p.logoImg ? `<img src="${p.logoImg}" alt="" style="height:6vh;width:6vh;border-radius:1vh;object-fit:cover">` : ''}<div><div class="name">${E(p.name)}</div><div class="addr">${E(p.address)}</div></div></div>
      <div class="dates"><div>${CM.tgl(CM.todayISO(now), { day: true })}</div><div class="h">${CM.hijri(now)}</div></div>
    </div>
    <div class="tv-mid">
      <div>
        <div class="tv-clock" data-tv-clock>${now.toTimeString().slice(0, 5)}<small>${String(now.getSeconds()).padStart(2, '0')}</small></div>
        <div class="tv-next">Menuju <b>${nx.name}</b> dalam <b data-tv-cd>${CM.fmtCountdown(nx.diffSec)}</b></div>
      </div>
      <div class="tv-side">
        <div class="tv-card"><div class="lbl">Hadits hari ini</div><div class="arab">${h.ar}</div><div class="tr">“${E(h.id)}”</div><div class="src">${h.src}</div></div>
        ${(CM.R && CM.R.tvDoa && CM.R.tvDoa()) || `<div class="tv-card"><div class="lbl">Pengumuman</div><div class="tr" style="font-family:var(--font-body);font-weight:600">${E(S().announcements[0].title)}</div><div class="src">${E(S().announcements[0].body)}</div></div>`}
      </div>
    </div>
    <div>
      <div class="tv-prayers">${pt.map((x) => `<div class="tv-p ${x.id === nx.id ? 'on' : ''}"><div class="n">${x.name}</div><div class="t">${x.shown}</div><div class="iq">${x.iq ? 'iqamah +' + x.iq + "'" : '&nbsp;'}</div></div>`).join('')}</div>
      <div class="tv-ticker"><div class="track">${ann}</div></div>
    </div>
    ${preview ? '' : `<div id="tvOverlay"></div>
    <div class="tv-ctrl"><button class="btn sm on-dark" data-act="tvDemo">${I('play', 14)} Simulasi iqamah</button><button class="btn sm on-dark" data-act="tvFull">${I('tv', 14)} Layar penuh</button><a class="btn sm on-dark" href="#/admin/ibadah/jadwal">${I('settings', 14)}</a></div>`}
  </div>`;
};

CM.TV.mount = () => {
  CM.every(() => {
    const now = new Date();
    const c = document.querySelector('[data-tv-clock]'); if (!c) return;
    c.innerHTML = `${now.toTimeString().slice(0, 5)}<small>${String(now.getSeconds()).padStart(2, '0')}</small>`;
    const nx = CM.nextPrayer(now);
    const cd = document.querySelector('[data-tv-cd]'); if (cd) cd.textContent = CM.fmtCountdown(nx.diffSec);
    // status iqamah: setelah adzan berjalan hitung mundur iqamah, lalu ajakan merapatkan shaf
    const cur = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    let state = null;
    if (CM.TV.demo) {
      const el = (Date.now() - CM.TV.demo.start) / 1000;
      state = el < 12 ? { mode: 'iq', name: CM.TV.demo.name, sec: Math.ceil(12 - el) } : el < 22 ? { mode: 'shaf' } : (CM.TV.demo = null);
    } else {
      for (const p of CM.prayerTimes().filter((x) => x.iq)) {
        const d = cur - p.min;
        if (d >= 0 && d < p.iq) { state = { mode: 'iq', name: p.name, sec: Math.ceil((p.iq - d) * 60) }; break; }
        if (d >= p.iq && d < p.iq + 8) { state = { mode: 'shaf' }; break; }
      }
    }
    const ov = document.getElementById('tvOverlay'); if (!ov) return;
    if (!state) { ov.innerHTML = ''; return; }
    if (state.mode === 'iq') ov.innerHTML = `<div class="tv-overlay"><div><div class="big">Iqamah ${state.name}</div><div class="cd">${CM.fmtCountdown(state.sec)}</div><div style="font-size:clamp(14px,1.6vw,28px);opacity:.7;margin-top:2vh">Mohon matikan atau senyapkan ponsel Anda</div></div></div>`;
    else ov.innerHTML = `<div class="tv-overlay dim"><div><div class="arab" style="font-size:clamp(30px,4.5vw,84px);color:var(--accent)">سَوُّوا صُفُوفَكُمْ</div><div class="big">Luruskan dan rapatkan shaf</div></div></div>`;
  }, 1000);
};
CM.act.tvDemo = () => { const nx = CM.nextPrayer(); CM.TV.demo = { start: Date.now(), name: nx.name }; };
CM.act.tvFull = () => { document.documentElement.requestFullscreen?.(); };
})();

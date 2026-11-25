/* Cinta Masjid — Theme engine (white-label per masjid)
   Setiap DKM bisa mengganti: palet, font, sudut, gaya layout situs, ornamen, logo, domain.
   Semua komponen membaca CSS variables, jadi satu perubahan berlaku untuk
   panel admin, situs publik, dan Mode TV sekaligus. */
window.CM = window.CM || {};

CM.presets = [
  { id: 'zamrud', name: 'Zamrud & Emas', brand: '#0B5D4B', accent: '#C2A15A', bg: '#FAF7F0', ink: '#17231F' },
  { id: 'malam', name: 'Biru Malam', brand: '#1F2D55', accent: '#D3AE62', bg: '#F6F5F1', ink: '#161B2B' },
  { id: 'teal', name: 'Teal Minimal', brand: '#0E7470', accent: '#E59A3C', bg: '#FFFFFF', ink: '#142322' },
  { id: 'marun', name: 'Marun Klasik', brand: '#7A1F2E', accent: '#C9A24A', bg: '#FBF7F3', ink: '#2A1517' },
  { id: 'zaitun', name: 'Hijau Zaitun', brand: '#4E5B2A', accent: '#B9803A', bg: '#F8F6EE', ink: '#20241A' },
  { id: 'pasir', name: 'Pasir & Kopi', brand: '#6B4A2F', accent: '#2F7A62', bg: '#FAF6F0', ink: '#251C15' },
];

CM.fonts = {
  elegan: { label: 'Elegan', desc: 'Huruf berkait untuk judul', display: "'Fraunces', Georgia, serif", body: "'Plus Jakarta Sans', system-ui, sans-serif" },
  modern: { label: 'Modern', desc: 'Huruf polos dan bersih', display: "'Plus Jakarta Sans', system-ui, sans-serif", body: "'Plus Jakarta Sans', system-ui, sans-serif" },
  klasik: { label: 'Klasik', desc: 'Huruf bernuansa naskah', display: "'Amiri', Georgia, serif", body: "'Plus Jakarta Sans', system-ui, sans-serif" },
};
CM.radii = { lembut: { label: 'Lembut', v: '20px' }, sedang: { label: 'Sedang', v: '12px' }, tegas: { label: 'Tegas', v: '4px' } };
CM.layouts = {
  klasik: { label: 'Klasik', desc: 'Hero tengah, lengkungan mihrab, ornamen' },
  modern: { label: 'Modern', desc: 'Kartu terang dengan panel warna di sisi' },
  ringkas: { label: 'Ringkas', desc: 'Padat, cocok untuk musholla kecil' },
};

/* kontras: pilih teks putih/gelap di atas warna brand */
CM.lum = (hex) => {
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
CM.contrast = (a, b) => { const [x, y] = [CM.lum(a), CM.lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

CM.applyTheme = (t = CM.state.theme) => {
  const r = document.documentElement;
  r.style.setProperty('--brand', t.brand);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--bg', t.bg);
  r.style.setProperty('--ink', t.ink);
  r.style.setProperty('--brand-ink', CM.contrast(t.brand, '#ffffff') >= 3.2 ? '#FFFFFF' : t.ink);
  r.style.setProperty('--radius', CM.radii[t.radius]?.v || '20px');
  const f = CM.fonts[t.font] || CM.fonts.elegan;
  r.style.setProperty('--font-display', f.display);
  r.style.setProperty('--font-body', f.body);
  r.dataset.layout = t.layout;
  r.dataset.ornament = t.ornament ? 'on' : 'off';
  r.dataset.textsize = CM.state.textSize;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = t.brand;
};

CM.setTheme = (patch) => {
  Object.assign(CM.state.theme, patch);
  CM.applyTheme();
  CM.save();
};

/* wordmark masjid: logo unggahan atau teks */
CM.wordmark = (opt = {}) => {
  const p = CM.state.profile;
  const logo = p.logoImg ? `<img class="logo-img" src="${p.logoImg}" alt="">` : '';
  return `<a class="wordmark" href="${opt.href || '#/situs'}">${logo}<span class="wm">${CM.esc(p.name)}${opt.sub === 'city' ? `<small>${CM.esc(p.city)}</small>` : opt.sub !== false ? `<small>${CM.esc(p.city)} · ${CM.esc(p.subdomain)}.cintamasjid.or.id</small>` : ''}</span></a>`;
};
CM.siteUrl = () => (CM.state.profile.domainStatus === 'aktif' && CM.state.profile.customDomain) ? CM.state.profile.customDomain : `${CM.state.profile.subdomain}.cintamasjid.or.id`;

/* ---------- jadwal shalat ---------- */
CM.toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
CM.fmtMin = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
CM.prayerTimes = () => CM.state.prayer.map((p) => ({ ...p, min: CM.toMin(p.time) + (p.adj || 0), shown: CM.fmtMin(CM.toMin(p.time) + (p.adj || 0)) }));
CM.nextPrayer = (now = new Date()) => {
  const list = CM.prayerTimes().filter((p) => p.id !== 'terbit');
  const cur = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  let next = list.find((p) => p.min > cur);
  let diff;
  if (!next) { next = list[0]; diff = (24 * 60 - cur + next.min); } else diff = next.min - cur;
  return { ...next, diffSec: Math.round(diff * 60) };
};
CM.fmtCountdown = (sec) => {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
};
CM.hadithToday = () => CM.state.hadith[new Date().getDate() % CM.state.hadith.length];

/* timer yang dibersihkan setiap pindah halaman */
CM.timers = [];
CM.every = (fn, ms) => { fn(); CM.timers.push(setInterval(fn, ms)); };
CM.clearTimers = () => { CM.timers.forEach(clearInterval); CM.timers = []; };

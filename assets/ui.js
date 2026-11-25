/* Cinta Masjid — util & komponen UI */
window.CM = window.CM || {};

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  wallet: '<path d="M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-4a2 2 0 0 0 0 4h4v2a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6"/><path d="M21 13v4"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.4-9.3C1.4 7.6 3.5 4.5 6.8 4.5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.3 0 5.4 3.1 4.2 6.2C19.5 15.4 12 20 12 20z"/>',
  users: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7.5" r="3.5"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.85M16 4.15a3.5 3.5 0 0 1 0 6.7"/>',
  moon: '<path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7z"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  megaphone: '<path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z"/><path d="M16.5 9a3.5 3.5 0 0 1 0 6M19 6a7.5 7.5 0 0 1 0 12"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  basket: '<path d="M4 10h16l-1.6 8.4a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6z"/><path d="m8.5 10 3.5-6 3.5 6M9.5 14v2.5M14.5 14v2.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  left: '<path d="m15 6-6 6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6.5 2.5 8 2.5 8h-17S6 15.5 6 9z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  menu: '<path d="M4 6.5h16M4 12h16M4 17.5h10"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  qr: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2.5v2.5H14zM18 14h2M14 19.5h2M18.5 18v2.5H20"/>',
  tv: '<rect x="2.5" y="4.5" width="19" height="12.5" rx="2"/><path d="M8 21h8M12 17v4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" stroke="none"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  file: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M4 20h16"/>',
  upload: '<path d="M12 16V5M7 9.5l5-5 5 5M4 20h16"/>',
  in: '<path d="M17 7 7 17M16 17H7V8"/>',
  out: '<path d="M7 17 17 7M8 7h9v9"/>',
  pin: '<path d="M12 21s-7-6-7-11.5a7 7 0 0 1 14 0C19 15 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.8 1.8-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
  book: '<path d="M4 4.5h5.5A2.5 2.5 0 0 1 12 7v13a2 2 0 0 0-2-2H4zM20 4.5h-5.5A2.5 2.5 0 0 0 12 7v13a2 2 0 0 1 2-2h6z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  sunrise: '<path d="M12 3v5M8 6l4-3 4 3M3 19h18M5.5 15.5 4 14M18.5 15.5 20 14M7 19a5 5 0 0 1 10 0"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
  logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.8-4M4 4v4h4M4 13a8 8 0 0 0 14.8 4M20 20v-4h-4"/>',
  phone: '<path d="M5 3.5h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  filter: '<path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/>',
  gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.5 9 8 12 8zM12 8s1.5-4.5 4-3.5S15 8 12 8z"/>',
  cow: '<path d="M6 6 4 3.5M18 6l2-2.5"/><path d="M6.5 7h11a2 2 0 0 1 2 2v3.5a7.5 7.5 0 0 1-15 0V9a2 2 0 0 1 2-2z"/><circle cx="9.5" cy="11" r=".8" fill="currentColor"/><circle cx="14.5" cy="11" r=".8" fill="currentColor"/><path d="M9.5 15.5h5"/>',
  building: '<path d="M3 21h18M5 21V10l7-6 7 6v11"/><path d="M12 4V2M9.5 21v-5a2.5 2.5 0 0 1 5 0v5"/>',
  mosque: '<path d="M12 2v2M7 11a5 5 0 0 1 10 0"/><path d="M5 21V11h14v10M3 21h18M9.5 21v-4a2.5 2.5 0 0 1 5 0v4M2.5 21V9.5M21.5 21V9.5M2.5 9.5 2.5 7M21.5 9.5V7"/>',
  receipt: '<path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21z"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  hand: '<path d="M7 11.5V6.5a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 11V8.5a1.5 1.5 0 0 1 3 0v5.5a7 7 0 0 1-7 7h-.5a6.5 6.5 0 0 1-5.2-2.6L3.6 14.8a1.6 1.6 0 0 1 2.4-2.1L7 13.5"/>',
  send: '<path d="m21 3-9.5 9.5M21 3l-6 18-3.5-8.5L3 9z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5"/>',
  share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
  alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
  type: '<path d="M4 7V5h16v2M12 5v14M9 19h6"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  quote: '<path d="M9 7H5.5A1.5 1.5 0 0 0 4 8.5V12h5V7zM9 12c0 3-1.5 5-4.5 5.5M20 7h-3.5A1.5 1.5 0 0 0 15 8.5V12h5V7zM20 12c0 3-1.5 5-4.5 5.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  tag: '<path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9z"/><circle cx="8" cy="8" r="1.4"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l2.5 2.5M14.5 8.5l2 2"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  dots: '<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',
  wifi: '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0M12 19h.01"/>',
};

CM.icon = (name, size = 20, cls = '') =>
  `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

CM.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
CM.rp = (n) => (n < 0 ? '−' : '') + 'Rp' + Math.abs(Math.round(n)).toLocaleString('id-ID');
CM.rpShort = (n) => {
  const a = Math.abs(n);
  if (a >= 1e9) return 'Rp' + (n / 1e9).toFixed(1).replace('.', ',') + ' M';
  if (a >= 1e6) return 'Rp' + (n / 1e6).toFixed(a >= 1e8 ? 0 : 1).replace('.', ',').replace(',0', '') + ' jt';
  if (a >= 1e3) return 'Rp' + Math.round(n / 1e3) + ' rb';
  return CM.rp(n);
};
CM.num = (n) => Number(n).toLocaleString('id-ID');
CM.initials = (name) => String(name).replace(/^(H\.|Hj\.|Ust\.|Ustadz|Ustadzah|KH\.|Dr\.|Ir\.)\s*/i, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
CM.BULAN = BULAN; CM.HARI = HARI;
CM.tgl = (iso, opt = {}) => {
  const d = new Date(iso + (iso.length <= 10 ? 'T00:00:00' : ''));
  const s = `${d.getDate()} ${opt.short ? BULAN[d.getMonth()].slice(0, 3) : BULAN[d.getMonth()]}${opt.year === false ? '' : ' ' + d.getFullYear()}`;
  return opt.day ? `${HARI[d.getDay()]}, ${s}` : s;
};
CM.hijri = (date = new Date()) => {
  try {
    return new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(date).replace(/\s?H$/, '') + ' H';
  } catch (e) { return '15 Jumadilakhir 1448 H'; }
};
CM.todayISO = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
CM.uid = () => Math.random().toString(36).slice(2, 8);

/* ---------- komponen ---------- */
CM.ui = {
  badge: (t, tone = '') => `<span class="badge ${tone}">${tone && tone !== 'gold' && tone !== 'brand' ? '<span class="dot"></span>' : ''}${CM.esc(t)}</span>`,
  status: (s) => {
    const map = {
      disetujui: 'ok', lunas: 'ok', aktif: 'ok', dijawab: 'ok', terbit: 'ok', kembali: 'ok', selesai: 'ok', tersalur: 'ok', terverifikasi: 'ok', hadir: 'ok', baik: 'ok', terkirim: 'ok',
      menunggu: 'warn', diteruskan: 'info', diterima: '', draf: '', dipinjam: 'info', dijeda: 'warn', cicil: 'info', terjadwal: 'info', 'perlu cek': 'warn', izin: 'warn', 'rusak ringan': 'warn',
      ditolak: 'bad', gagal: 'bad', terlambat: 'bad', alpa: 'bad', rusak: 'bad', 'belum bayar': 'bad', menipis: 'bad', berhenti: '',
    };
    return CM.ui.badge(s[0].toUpperCase() + s.slice(1), map[s] ?? '');
  },
  progress: (pct, cls = '') => `<div class="progress ${cls}" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.min(100, Math.max(0, pct))}%"></i></div>`,
  pageHead: (title, desc = '', actions = '', eyebrow = '') => `
    <div class="page-head">
      <div>${eyebrow ? `<div class="eyebrow" style="margin-bottom:6px">${eyebrow}</div>` : ''}<h1>${title}</h1>${desc ? `<p>${desc}</p>` : ''}</div>
      ${actions ? `<div class="row wrap" style="--gap:8px">${actions}</div>` : ''}
    </div>`,
  tabs: (base, tabs, active) => `<nav class="chips adm-tabs" aria-label="Sub menu">${tabs.map((t) => `<a class="chip ${t.id === active ? 'active' : ''}" href="#${base}/${t.id}">${t.label}</a>`).join('')}</nav>`,
  stat: ({ label, value, sub = '', icon, tone = '', display = false }) => `
    <div class="card stat">
      <div class="row between" style="align-items:flex-start">
        <div class="label">${label}</div>
        ${icon ? `<div class="icon-tile sm ${tone}">${CM.icon(icon, 18)}</div>` : ''}
      </div>
      <div class="value ${display ? 'display' : ''}">${value}</div>
      ${sub ? `<div class="sub">${sub}</div>` : ''}
    </div>`,
  avatar: (name, cls = '') => `<span class="avatar ${cls}">${CM.esc(CM.initials(name))}</span>`,
  empty: (icon, title, desc = '', action = '') => `<div class="empty"><div class="icon-tile lg">${CM.icon(icon, 24)}</div><div style="font-weight:700;color:var(--ink)">${title}</div><div class="small" style="margin-top:4px">${desc}</div>${action ? `<div style="margin-top:14px">${action}</div>` : ''}</div>`,
  switch: (name, checked, act = '', extra = '') => `<label class="switch"><input type="checkbox" ${checked ? 'checked' : ''} ${name ? `name="${name}"` : ''} ${act ? `data-act="${act}"` : ''} ${extra}><span></span></label>`,
  field: (label, input, hint = '') => `<div class="field"><label>${label}</label>${input}${hint ? `<div class="hint">${hint}</div>` : ''}</div>`,
  input: (name, value = '', attrs = '') => `<input class="input" name="${name}" value="${CM.esc(value)}" ${attrs}>`,
  select: (name, opts, val = '') => `<select class="select" name="${name}">${opts.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${CM.esc(v)}" ${v === val ? 'selected' : ''}>${CM.esc(l)}</option>`; }).join('')}</select>`,
  money: (name, value = '', big = false) => `<div class="input-group"><span class="prefix ${big ? 'big' : ''}">Rp</span><input class="input ${big ? 'big' : ''}" name="${name}" inputmode="numeric" value="${value}" placeholder="0" data-money></div>`,

  /* QR palsu yang deterministik dari teks seed */
  qr: (seed = 'cinta', size = 160, fg = '#111') => {
    let h = 2166136261;
    for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    const n = 25, cell = size / n;
    const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
    let r = '';
    const finder = (x, y) => `<rect x="${x * cell}" y="${y * cell}" width="${7 * cell}" height="${7 * cell}" fill="${fg}"/><rect x="${(x + 1) * cell}" y="${(y + 1) * cell}" width="${5 * cell}" height="${5 * cell}" fill="#fff"/><rect x="${(x + 2) * cell}" y="${(y + 2) * cell}" width="${3 * cell}" height="${3 * cell}" fill="${fg}"/>`;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const inF = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      if (!inF && rnd() > 0.52) r += `<rect x="${(x * cell).toFixed(2)}" y="${(y * cell).toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" fill="${fg}"/>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Kode QR">${r}${finder(0, 0)}${finder(n - 7, 0)}${finder(0, n - 7)}</svg>`;
  },

  sheet({ title, body, foot = '', wide = false, onMount }) {
    const root = document.getElementById('overlay-root');
    root.innerHTML = `
      <div class="ov" role="dialog" aria-modal="true" aria-label="${CM.esc(title)}">
        <div class="ov-scrim" data-act="close"></div>
        <div class="sheet ${wide ? 'wide' : ''}">
          <div class="sheet-head"><h2>${title}</h2><button class="icon-btn" data-act="close" aria-label="Tutup">${CM.icon('x')}</button></div>
          <div class="sheet-body">${body}</div>
          ${foot ? `<div class="sheet-foot">${foot}</div>` : ''}
        </div>
      </div>`;
    document.body.style.overflow = 'hidden';
    const first = root.querySelector('.sheet-body input, .sheet-body select, .sheet-body textarea');
    if (first && window.innerWidth > 720) setTimeout(() => first.focus(), 50);
    onMount && onMount(root.querySelector('.sheet'));
  },
  close() { document.getElementById('overlay-root').innerHTML = ''; document.body.style.overflow = ''; },
  toast(msg, icon = 'check') {
    let wrap = document.querySelector('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.getElementById('toast-root').appendChild(wrap); }
    const t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status');
    t.innerHTML = CM.icon(icon, 18) + '<span>' + CM.esc(msg) + '</span>';
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  },
  formData(el) {
    const form = el.closest('form') || el.closest('.sheet') || el;
    const o = {};
    form.querySelectorAll('input[name], select[name], textarea[name]').forEach((i) => {
      if (i.type === 'radio') { if (i.checked) o[i.name] = i.value; }
      else if (i.type === 'checkbox') o[i.name] = i.checked;
      else o[i.name] = i.hasAttribute('data-money') ? Number(i.value.replace(/\D/g, '')) : i.value;
    });
    return o;
  },
};

/* format angka rupiah saat diketik */
document.addEventListener('input', (e) => {
  if (e.target.matches('[data-money]')) {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v ? Number(v).toLocaleString('id-ID') : '';
  }
});

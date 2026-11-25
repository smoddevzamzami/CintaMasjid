# Cinta Masjid — Prototipe UI/UX (Fase 1)

Prototipe klik-able untuk SaaS manajemen masjid sesuai PRD. Hanya frontend dengan data contoh fiktif; backend dikerjakan di tahap berikutnya.

## Menjalankan

```powershell
python -m http.server 5173
```

Buka http://localhost:5173. Tidak perlu build. Data dan tema tersimpan di `localStorage` (bisa direset dari halaman depan).

## Rute

| Rute | Isi |
|---|---|
| `#/` | **Situs utama cintamasjid.or.id** (Yayasan Cinta Sedekah): beranda, `#/fitur`, `#/cari` (+ `#/cari/kota-bandung`), `#/biaya`, `#/panduan`, `#/tentang`, `#/kebijakan/<privasi\|syarat\|pedoman>` |
| `#/prototipe` | Menu prototipe (semua layar) |
| `#/onboarding` | Wizard 5 langkah daftar masjid |
| `#/admin/<modul>/<tab>` | Panel DKM: beranda, keuangan, zis, warga, ibadah, aset, komunikasi, kepedulian, pengurus, pengaturan |
| `#/situs/<halaman>` | Situs jamaah: beranda, agenda, donasi, laporan, layanan, tanya, khutbah, profil, akun |
| `#/tv` | Mode TV (tombol "Simulasi iqamah" muncul saat kursor di pojok kanan bawah) |
| `#/console/<modul>/<tab>` | Panel Pengelola (tim Cinta Masjid): beranda, direktori, masjid terdaftar, statistik jamaah, keuangan, konten bersama, keamanan & moderasi, mitra, wawasan data, bantuan & fitur, pengaturan. Ganti peran tim di sidebar |
| `#/situs/komunitas/<tab>` | Ruang Jamaah (sisi jamaah): feed, doa, grup, kegiatan, pasar, jelajah. Admin: `#/admin/komunitas/<tab>` |
| `#/situs/kajian/<id>` | Detail kajian (`a1` akan datang, `k0` selesai dengan rekaman & rangkuman). Editor: Panel DKM → Ibadah & Kegiatan → Kajian → Kelola |
| `#/klaim` | Halaman publik "Klaim Masjid Anda" (cari di direktori → kirim bukti → masuk antrean klaim Panel Pengelola) |

Alur lintas sisi: Panel Pengelola → Bantuan & Fitur → Tiket T-1042 → **Minta akses bantuan** → buka `#/admin` untuk menyetujui sebagai DKM → banner "Tim bantuan sedang membantu" muncul di panel DKM.

## White-label (kustom per masjid)

`Pengaturan → Tampilan & Brand` mengatur logo, nama, palet (6 preset + warna kustom dengan cek kontras), font, sudut, gaya layout situs (Klasik / Modern / Ringkas), dan ornamen. Semua komponen membaca CSS variables yang disetel di `assets/theme.js`, jadi satu perubahan berlaku di admin, situs jamaah, dan Mode TV. Default: Zamrud & Emas.

## Struktur

```
index.html
assets/styles.css        design system (token, komponen, layout admin/publik/TV)
assets/ui.js             ikon, format rupiah/tanggal, komponen (sheet, toast, QR contoh)
assets/data.js           data contoh + state localStorage
assets/theme.js          theme engine, preset, jadwal shalat
assets/admin.js          shell admin, Beranda, Keuangan
assets/admin-modules.js  ZIS & Qurban, Jamaah & Warga, Ibadah & Kegiatan
assets/admin-more.js     Aset, Komunikasi, Kepedulian, Pengurus, Pengaturan
assets/public.js         situs jamaah
assets/tv.js             Mode TV
assets/web.js            situs utama cintamasjid.or.id
assets/app.js            router, menu prototipe, onboarding, event
```

Jadwal shalat masih angka tetap untuk Bandung. Di tahap backend, hitung dari koordinat (mis. library `adhan`) lalu verifikasi terhadap jadwal Kemenag.

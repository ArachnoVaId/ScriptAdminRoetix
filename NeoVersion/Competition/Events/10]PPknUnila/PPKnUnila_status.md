# PPKn Unila (Olimpiade PPKn Universitas Lampung XIII 2026) — Status

Dibuat dari `_chat.txt` (WhatsApp Chat - PPKn Unila Muhammad Fallahan.zip) + `RAW_PPKnUnila.txt` +
`00000136-MoU Olimpiade PPKN 2026 x..docx` (MoU final terakhir dikirim panitia, 26/08 20:53), tanggal 2026-08-27.
Referensi proses: `../NewAdminUI/RAW_TO_CHECKLIST_GUIDE.md`, `../NewAdminUI/CLIENT_INTAKE_CHECKLIST.md`.

## Ringkasan negosiasi (kronologis, `_chat.txt`)

- **11/08** — Kickoff. Muhammad Hafidz Fallahan (ketua pelaksana Olimpiade PPKn ke-13) jadi kontak utama.
- **12/08** — Roetix ajukan 2 skema sponsorship berdasarkan estimasi 169 pendaftar total:
  - Skema A: fresh money Rp3.5jt, fee ditanggung dengan skema "Base Price (A)"
  - Skema B: fresh money Rp3jt, fee ditanggung dengan skema "Offering (B)"
  - DP sponsor 70% di awal, 30% pelunasan saat registrasi capai 70% dari estimasi (≈85 pendaftar).
  - Kontraprestasi: UGC testimoni + logo Roetix di poster/QR pendaftaran.
- **18/08** — Panitia awalnya pilih **Skema B**.
- **20/08** — Panitia **ralat** balik pilih **Skema A**. Sekaligus 2 koreksi harga masuk di titik ini:
  - Portofolio SMA: rekap awal (12/08) sempat tertulis Rp25.000 → dikoreksi jadi **Rp50.000**.
  - Fee schema disepakati dibebankan **50:50** ke panitia & peserta (bukan salah satu pihak saja).
- **20/08 13:43** — Poster Digital sempat disebut "banyak perubahan", dikonfirmasi ulang tetap **Rp20.000**.
- **21/08** — MoU (Google Doc) dikirim, minta akses edit email panitia.
- **24/08** — Pembahasan pembulatan porsi fee 50% peserta (harga asli + fee penuh, mis. LCT Rp250rb + Rp11.875 = Rp261.875 kalau fee 50% tidak digenapkan). Beberapa putaran tawar-menawar pembulatan (panitia minta Rp11rb, Roetix counter Rp11.500/fee total Rp23.000 "karena perhitungan biaya operasional") — disepakati **Rp23.000 fee total → porsi Rp11.500/Rp11.500**, awalnya dikira cuma berlaku untuk LCT.
- **26/08 11:29–20:36** — Sempat bolak-balik LCT vs Debat yang mana yang digenapkan ke Rp23.000. **Closing statement panitia (20:08–20:13), dikonfirmasi Roetix (20:36): KEDUANYA — LCT (SMP & SMA) DAN Debat — digenapkan ke fee total Rp23.000 (porsi 11.500/11.500)**, karena sama-sama berharga dasar Rp250.000. Timeline dikonfirmasi flat **1–30 September 2026 untuk semua lomba**, tanpa gelombang.
- **26/08 20:53** — Panitia kirim MoU docx final (`00000136-...docx`) + link gform asli.
- **26/08 22:06** — Panitia share link gform "harga awal" (https://forms.gle/qpfTGSqcsDjDWQz88) ke internal PJ lomba, eksplisit bilang **belum diubah** ke harga hasil kesepakatan.

## ⚠️ ALERT — hal yang belum/berpotensi konflik

1. **SMA – Debat, fee masih Rp23.750 di `RAW_PPKnUnila.txt` DAN di MoU docx final (`00000136-...docx`, baris 753)** —
   padahal closing statement chat 26/08 (lihat di atas) eksplisit bilang Debat ikut digenapkan ke Rp23.000
   (porsi 11.500/11.500) sama seperti LCT. Kemungkinan koreksi verbal ini tidak sempat masuk balik ke draft
   MoU sebelum dikirim final. **Script `Create_PPKnUnila_SMA_Debat.js` di folder ini memakai angka hasil
   chat (fee 11.500), BUKAN angka MoU (11.875)** — WAJIB dikonfirmasi ulang ke panitia sebelum klik
   "Create event" di admin. Kalau ternyata MoU yang benar, ganti `fee: 11500` → `11875` di script itu.
2. **Organizer Name** (checklist A3) tidak pernah diberikan eksplisit sebagai jawaban terpisah oleh panitia.
   Dipakai teks dari promo ("Pendidikan Pancasila dan Kewarganegaraan Universitas Lampung") sebagai
   placeholder — ditandai TODO di tiap script, perlu dikonfirmasi sebelum submit final.
3. **Gform asli** (https://forms.gle/qpfTGSqcsDjDWQz88) berisi field gabungan untuk 9 kategori sekaligus
   (termasuk "Kategori Lomba yang Diikuti", "Bukti Transfer Pembayaran", "Upload Formulir Pendaftaran").
   Sesuai instruksi build kali ini, event dipecah jadi **9 event terpisah** (1 kategori = 1 event) dan
   ketiga field itu **dihapus** dari tiap script (lihat bagian Field di bawah) — bukan salah transkrip,
   ini keputusan struktur eksplisit untuk build ini.
4. **DP sponsor 70%/30% (Skema A)** adalah kewajiban administrasi finansial Roetix↔panitia (pencairan dana
   sponsorship), bukan bagian dari wizard event pendaftaran — tidak direpresentasikan di script manapun.
5. **Estimasi peserta** (mis. "18 tim", "21 peserta" di RAW) murni basis proyeksi sponsorship tahun lalu,
   bukan quota/limit pendaftaran tahun ini — tidak di-set sebagai limit di wizard manapun.
6. **NPWP** yang dibahas di chat (24/08, 12:10) itu data pajak MoU sponsorship (NPWP perwakilan panitia),
   BUKAN field form pendaftaran peserta — tidak termasuk field di script manapun.

## Field pendaftaran dipakai di 9 script (RAW gform dikurangi 3 field sesuai instruksi)

Dipertahankan (semua kategori kecuali disebutkan lain):
- Email (type `email`, required)
- Nama Peserta (type `text`, required)
- Nama Guru Pendamping (type `text`, required) — **hanya SMP & SMA**, sesuai label asli RAW
  "(Khusus SMP & SMA)"; **dihapus** di 2 event Mahasiswa (Essay, Microteaching)
- No. Telp/WhatsApp (type `phone`, required)
- Asal Sekolah / Instansi (type `text`, required)
- Bukti Screenshoot Subscribe YouTube Fordika [Fordika FKIP Unila] (type `file`, required)
- Bukti Follow Instagram Fordika [Fordika_Unila] (type `file`, required)
- Bukti Follow Instagram [Olimpiadeppknunila_2026] (type `file`, required)

Dihapus (instruksi eksplisit untuk build ini):
- Kategori Lomba yang Diikuti — tidak relevan lagi karena sudah 1 event = 1 kategori
- Bukti Transfer Pembayaran
- Upload Formulir Pendaftaran

## 9 sub-event & pricing final dipakai di script

Timeline sama untuk semua: Registration, 2026-09-01T00:00 – 2026-09-30T23:59 (Fase & Timeline digabung 1×1,
sesuai instruksi RAW "hiraukan timeline, semua 1 September - 30 September 2026" & konfirmasi chat 26/08).

| Event ID | Kategori | Format | Price | Fee (flat) | Total ke registrant | File |
|---|---|---|---|---|---|---|
| PPKNUNILA2026SMPLCT | SMP – LCT PPKn | Offline | 250.000 | 11.500 | 261.500 | `Create_PPKnUnila_SMP_LCT.js` |
| PPKNUNILA2026SMPPIDATO | SMP – Pidato | Offline | 80.000 | 5.000 | 85.000 | `Create_PPKnUnila_SMP_Pidato.js` |
| PPKNUNILA2026SMALCT | SMA – LCT PPKn | Offline | 250.000 | 11.500 | 261.500 | `Create_PPKnUnila_SMA_LCT.js` |
| PPKNUNILA2026SMADEBAT | SMA – Debat | Offline | 250.000 | 11.500 ⚠️ | 261.500 ⚠️ | `Create_PPKnUnila_SMA_Debat.js` |
| PPKNUNILA2026SMAESSAY | SMA – Essay | Online | 50.000 | 4.000 | 54.000 | `Create_PPKnUnila_SMA_Essay.js` |
| PPKNUNILA2026SMAPOSTER | SMA – Poster Digital | Online | 20.000 | 2.500 | 22.500 | `Create_PPKnUnila_SMA_PosterDigital.js` |
| PPKNUNILA2026SMAPORTO | SMA – Portofolio | Offline | 50.000 | 4.000 | 54.000 | `Create_PPKnUnila_SMA_Portofolio.js` |
| PPKNUNILA2026MHSESSAY | Mahasiswa – Essay | Online | 50.000 | 4.000 | 54.000 | `Create_PPKnUnila_Mahasiswa_Essay.js` |
| PPKNUNILA2026MHSMICRO | Mahasiswa – Microteaching | Online | 50.000 | 4.000 | 54.000 | `Create_PPKnUnila_Mahasiswa_Microteaching.js` |

⚠️ = lihat poin ALERT #1 di atas, belum dikonfirmasi ulang ke panitia.

## File terkait

```
10]PPknUnila/RAW_PPKnUnila.txt                              — raw pricing table + gform asli
10]PPknUnila/PPKnUnila_status.md                             — dokumen ini
10]PPknUnila/JSON/Create_PPKnUnila_*.js                      — 9 script event terpisah (engine dari
                                                                 ../8]SRD2026/JSON/Create_SRD2026_Mahasiswa_Normal.js,
                                                                 versi wizard 7-tab terkini)
```

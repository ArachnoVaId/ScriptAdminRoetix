# Checklist Informasi Setup Event (dari Client)

Daftar semua informasi yang perlu diminta ke client/panitia sebelum tim internal bisa build event di
`admin.roetix.com`. Dikelompokkan persis mengikuti urutan Step wizard (`1 Identity` s/d `7 Review`) supaya
1 baris di sini = 1 hal yang harus ada sebelum step itu bisa diisi.

**Cara pakai**: pindahkan tabel di bawah ke spreadsheet, tambah kolom `Status` (Sudah Ada / Belum / Tidak
Relevan) dan `Diisi oleh` per event. Kolom `Grup` & `No` dipertahankan sebagai ID baris supaya konsisten
antar-event. Baris yang `Wajib` semua harus "Sudah Ada" sebelum event mulai di-build; baris `Kondisional`
cuma wajib kalau kondisinya kena (lihat kolom Catatan).

Referensi teknis (bukan buat dikirim ke client, ini catatan internal): `README.md` (DOM/mekanisme wizard),
`../StudentPreneur26/JSON/RECAP_UISP2026BMCC_live.md` (contoh recap 1 event nyata yang sudah dipetakan ke
checklist ini).

---

## A. Identitas Event (Step 1 — Identity)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| A1 | Nama Event | Wajib | Teks, ini judul yang tampil ke publik | "The 16th UI Studentpreneurs - Early Bird BMCC Registration" |
| A2 | Event ID | Wajib | Slug pendek unik, tanpa spasi. **Immutable** setelah event dibuat — konfirmasi final ke client/panitia dulu sebelum submit, jangan asal generate | "UISP2026BMCC" |
| A3 | Nama Organizer/Penyelenggara | Wajib | Nama panitia/lembaga, tampil di halaman pendaftaran | "BEM FEB UI" |
| A4 | Deskripsi Event | Wajib | Copy promosi lengkap (rich text — boleh emoji, bold, link). Biasanya diambil dari poster/pamflet/Instagram client, bukan ditulis ulang dari nol | lihat contoh di `RECAP_UISP2026BMCC_live.md` |
| A5 | Email Notes (opsional) | Kondisional | Info tambahan yang ikut terkirim di email registrasi/pembayaran (mis. link grup WhatsApp). Ada opsi "1 pesan untuk email registrasi & pembayaran" atau dipisah — tanyakan preferensinya | link grup WA peserta |
| A6 | Banner Event | Kondisional | Gambar, disarankan tapi tidak wajib. Diupload terpisah setelah wizard selesai (Step 3 Media) | — |
| A7 | Logo Organizer | Kondisional | Gambar, sama seperti banner | — |

## B. Pengaturan Visibilitas & Tipe Pendaftaran (Step 2 — States)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| B1 | Event langsung aktif/tampil ke publik saat dibuat? | Wajib | Yes/No — kalau No, event tersimpan sebagai draft tidak publik | Yes |
| B2 | Event di-highlight/Featured di halaman utama? | Wajib dikonfirmasi | Yes/No | No |
| B3 | Pendaftaran perorangan atau tim? | Wajib | Kalau tim: sebutkan **Min** dan **Max** jumlah anggota per tim | Tim, 1–3 orang |
| B4 | Kode referral dipakai? | Wajib dikonfirmasi | Yes/No — kalau Yes, siapkan juga daftar kode referral yang berlaku (dikelola terpisah di menu Referral Codes) | Yes |
| B5 | Rincian harga ditampilkan lengkap ke pendaftar (harga dasar + biaya layanan + pajak) atau cuma harga total? | Wajib dikonfirmasi | "Detailed pricing" ON/OFF | ON |

## C. Tahapan/Fase Acara (Step 4 — Phase)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| C1 | Ada berapa tahapan pendaftaran/acara? | Wajib | 1 fase saja, atau berjenjang (mis. Pendaftaran Awal → Registrasi Ulang/Semifinal) | 2 fase |
| C2 | Nama tiap fase | Wajib | Teks singkat & jelas, ini yang tampil sebagai label tahapan | "Registrasi Preliminary", "Registrasi Ulang Semifinal" |
| C3 | Tanggal mulai & selesai tiap fase | Wajib | **Wajib sertakan tahun** — sumber data client sering cuma tulis tanggal/bulan tanpa tahun, jangan diasumsikan sendiri, tanyakan balik | 19 Sep 2026 – 29 Sep 2026 |
| C4 | Kalau >1 fase: fase berikutnya cuma bisa diakses kalau sudah submit/lolos fase sebelumnya (qualification gate)? | Wajib dikonfirmasi kalau C1 > 1 | Yes/No — kalau Yes ini pola BARU & belum pernah diverifikasi live di sistem (per 2026-08-25), rencanakan waktu ekstra buat testing | Yes |

## D. Gelombang Pendaftaran / Timeline (Step 4 — Timeline)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| D1 | Ada gelombang harga bertingkat (Early Bird/Normal/Late Bird dst)? | Wajib dikonfirmasi | Yes/No | Yes, 3 gelombang |
| D2 | Nama tiap gelombang | Wajib kalau D1 = Yes | Teks | "Early Bird", "Normal Price", "Late Bird" |
| D3 | Tanggal mulai & selesai tiap gelombang | Wajib kalau D1 = Yes | **Wajib sertakan tahun**, sama seperti C3. Cek juga tidak ada tanggal yang bentrok/tumpang tindih antar gelombang | 19–29 Sep 2026 |

## E. Harga & Biaya (Step 4 — Time-Price)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| E1 | Harga pendaftaran per kombinasi Fase × Gelombang | Wajib | Kalau cuma 1 Fase & 1 Gelombang berarti cuma 1 harga; kalau berjenjang, minta harga LENGKAP tiap kombinasi, jangan diasumsikan sama rata | Fase Prelim: Rp0, Fase Semifinal (Early Bird): Rp185.000 |
| E2 | Event ini gratis atau berbayar? | Wajib | **Cek konsistensi**: kadang deskripsi promosi bilang "FREE" tapi tabel harga yang dikirim client beda sendiri — kalau ketemu bentrok begini, WAJIB konfirmasi balik ke client, jangan pilih salah satu sepihak | — |
| E3 | Biaya layanan (service fee) | Wajib | Nominal & tipenya flat (Rp tetap) atau persentase | Rp11.000 flat/transaksi |
| E4 | Pajak (tax) | Wajib dikonfirmasi | Ada/tidak, kalau ada: nominal & flat/persentase | 0 |
| E5 | Metode pembayaran (kalau ada instruksi transfer manual/tidak lewat payment gateway) | Kondisional | Nama bank, no. rekening, atas nama — biasanya perlu utk fase berbayar tahap lanjut (bukan pembayaran online otomatis) | BCA 6802069860 a.n. ... |

## F. Form Pendaftaran — Section & Field (Step 4 — Sections & Fields, per Fase)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| F1 | Daftar bagian/section form & urutannya | Wajib | Nama tiap section | "General Information", "Team Leader Data" |
| F2 | Deskripsi/instruksi tiap section | Kondisional | Teks pengantar di atas field-field section itu (opsional tapi sering dipakai utk instruksi khusus) | "Please combine all files into a single PDF..." |
| F3 | Daftar field tiap section | Wajib | Per field: **label**, **tipe jawaban** (teks singkat/email/no. telp/angka/tanggal/upload file/link/pilihan ganda), **wajib diisi atau tidak**, placeholder/contoh isian, deskripsi/hint tambahan | "Team Name" (teks, wajib, contoh "Blue Entrepreneur") |
| F4 | Pilihan jawaban (options) untuk tiap field bertipe pilihan ganda | Wajib kalau ada field tsb | List LENGKAP semua opsi — field pilihan ganda yang opsinya kurang/salah ketik gampang lolos tanpa ketahuan, cross-check ke sumber data client | Individual / 2 Members / 3 Members |
| F5 | Field upload file: format diterima, ukuran maks, digabung jadi 1 file atau terpisah per dokumen | Wajib kalau ada field upload | | PDF saja, maks 10 MB, digabung jadi 1 file |
| F6 | Link-link pendukung yang disebut di form (guidebook, syarat pendaftaran, twibbon, poster, dsb) | Kondisional | Pastikan link aktif & benar sebelum dipakai | bit.ly/Guidebook... |

## G. Pesan Setelah Submit / Completion (Step 5, per Fase)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| G1 | Pesan terima kasih/instruksi lanjutan setelah submit | Wajib | Per fase (kalau >1 fase, minta pesan terpisah tiap fase — jangan asumsikan sama) | "Thank you for registering..." |
| G2 | Link lanjutan yang disertakan di pesan (grup WA, guidebook, dsb) | Kondisional | | chat.whatsapp.com/... |

## H. Integrasi Spreadsheet (Step 6, opsional)

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| H1 | Data registrasi perlu di-mirror otomatis ke Google Sheet client? | Kondisional | Yes/No | Yes |
| H2 | Kalau Yes: Sheet sudah di-share (role Editor) ke `roetix-sheets-mirror@av-novatix-v1.iam.gserviceaccount.com`? | Wajib kalau H1 = Yes | Yes/No — kalau belum, minta client share dulu | — |
| H3 | Spreadsheet ID (dari URL sheet) | Wajib kalau H1 = Yes | Bagian ID di `docs.google.com/spreadsheets/d/<ID>/edit`, bukan link penuh | — |

## I. Kontak & Konteks Tambahan

| No | Informasi | Wajib/Kondisional | Format & Catatan | Contoh |
|---|---|---|---|---|
| I1 | Contact person panitia (nama, channel, nomor) | Wajib | Ditampilkan di deskripsi event dan/atau pesan completion | "Nadia — Line: @xxx \| WA: +62..." |
| I2 | Apakah acara ini perlu dipecah jadi beberapa event terpisah (link beda-beda per gelombang/kategori) karena keterbatasan sistem? | Wajib dikonfirmasi di awal | Terjadi kalau ada logika "cuma pendaftar gelombang X yang boleh lanjut ke tahap berbayar harga X" — sistem belum bisa gating otomatis lintas-event, solusinya 1 event per gelombang. Kalau ini kena, jumlah baris checklist F & G di atas perlu dikali jumlah event | Ya, 3 event (Early Bird/Normal/Late Bird) |
| I3 | Ada dokumen/pamflet/RAW sumber data resmi dari client? | Wajib disimpan | Simpan apa adanya sebagai referensi mentah (`RAW_<NamaEvent>.txt` di folder event) sebelum ditranskrip ke field-field di atas — supaya ada jejak kalau ada ambiguitas/typo di sumber aslinya | — |

---

## Catatan pengisian (pelajaran dari event-event sebelumnya)

- **Tanggal wajib pakai tahun eksplisit.** Sumber data client sering cuma tulis "19 September" tanpa tahun —
  jangan diasumsikan sendiri (event yang lintas tahun/lintas semester gampang salah tahun), tanyakan balik.
- **Kalau ada 2 sumber data yang bentrok** (mis. deskripsi promosi bilang gratis tapi tabel harga beda,
  atau ada 2 versi tanggal berbeda) — **catat konfliknya dan konfirmasi ke client**, jangan pilih sepihak.
- **Field pilihan ganda (multiple_choice) rawan opsi hilang/salah ketik** saat ditranskrip manual — selalu
  cross-check jumlah & isi opsi persis dengan sumber data asli sebelum dianggap final.
- **Placeholder/data belum lengkap dari client** (mis. "nama partner (....)")  harus ditandai jelas sebagai
  TODO di draft, bukan dibiarkan kosong diam-diam atau ditebak.
- **Kalau ada kebutuhan gating antar-tahap** (I2) — ini butuh keputusan arsitektur (1 event multi-Phase vs
  event terpisah per gelombang) sebelum mulai build, bukan diputuskan di tengah jalan.

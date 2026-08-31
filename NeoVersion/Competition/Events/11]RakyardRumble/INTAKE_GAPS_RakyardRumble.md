# Gap Report — Rakyard Rumble - Boxing Amateur Championship (RakyardRumble)

Dibuat dari `RAW_RakyardRumbe.txt` vs `../NewAdminUI/CLIENT_INTAKE_CHECKLIST.md`, tanggal 2026-08-27.

Belum ada `Create_*.js` maupun checklist row-per-row untuk event ini — RAW-nya jauh lebih mentah
(banyak data inti hilang) dibanding StudentPreneur26/ICGS/SRD2026, jadi tahap ini berhenti di intake
dulu, belum lanjut ke build script.

## Belum ada / perlu konfirmasi ke client

| Grup | No | Informasi | Kenapa gap |
|---|---|---|---|
| A | A1 | Nama Event final | RAW pakai 3 variasi berbeda: judul form "RAKYARD RUMBLE - Boxing Amateur Championship" (baris 2), "Rakyard Rumble by SADA Sport" (baris 5), "Rakyard Rumble by SADA Sports" (baris 8) — mana yang jadi nama tampil publik? |
| A | A2 | Event ID | Tidak disebutkan sama sekali di RAW. Wajib dikonfirmasi ke client sebelum build (immutable setelah dibuat) |
| A | A3 | Nama Organizer final | Ejaan tidak konsisten: "SADA Sport" (baris 5) vs "SADA Sports" (baris 8) |
| A | A5 | Email Notes | Tidak disebutkan — tanya apakah perlu info tambahan di email registrasi/pembayaran |
| A | A6/A7 | Banner Event / Logo Organizer | Tidak ada file/gambar terlampir di RAW |
| B | B1–B5 | Semua pengaturan States (Active, Featured, Referral codes, Detailed pricing) | Tidak disebutkan eksplisit di RAW, tidak bisa diasumsikan default platform begitu saja |
| B | B3 | Individual vs Tim | RAW berbentuk form pendaftaran perorangan (1 fighter per submission, dengan 2 data cornerman sebagai field tambahan — BUKAN anggota tim terpisah). Asumsi sementara: **Individual**, tapi wajib dikonfirmasi karena menentukan setup Step 2 States |
| C | C1 | Jumlah fase pendaftaran | Tidak disebutkan; asumsi sementara 1 fase "Registration" — perlu konfirmasi apakah ada fase lain (mis. weigh-in/technical meeting terpisah dari pendaftaran form) |
| C | C3 | **Tanggal buka & tutup pendaftaran** | **Gap paling kritis** — RAW cuma menyebutkan tanggal ACARA (3–4 Oktober 2026), sama sekali tidak ada tanggal mulai/selesai pendaftaran. Tidak bisa dibuild Phase tanpa ini |
| D | D1 | Ada gelombang harga (Early Bird/Normal/dst)? | Tidak disebutkan — RAW cuma punya 1 harga flat Rp350.000, asumsi sementara tidak ada gelombang, tapi perlu dikonfirmasi |
| E | E3 | Biaya layanan (service fee) | Tidak disebutkan di RAW |
| E | E4 | Pajak (tax) | Tidak disebutkan di RAW |
| E | E5 | Metode pembayaran | RAW cuma bilang "dapat melakukan pembayaran biaya registrasi" (baris 152) tanpa detail — tidak ada nomor rekening/nama bank/info payment gateway. Wajib ditanya, apalagi kalau ini transfer manual (bukan gateway otomatis) |
| F | — | **Section 6 hilang** | Penomoran section di RAW: 1, 2, 3, 4, 5, lalu baris liar "Section" tanpa nomor/judul (baris 99) sebelum header "-Section 5" (baris 100, judul "Data Cornerman"), langsung lompat ke "Section 7" (baris 111). **Tidak ada Section 6 sama sekali di RAW ini.** Perlu dicek ke Google Form asli — section-nya memang tidak ada, atau kelewatan pas transkrip |
| F | — | Field "Jenis Kelamin" (Section 2, baris 52–54) cuma 1 opsi | Cuma tercantum "Laki - laki" — apakah kompetisi ini memang khusus laki-laki, atau opsi lain (mis. "Perempuan") kelewatan pas transkrip dari form asli? |
| F | F5 | Field "Foto KTP/KK" (Section 7) | RAW cuma tulis "Upload 1 supported file. Max 100 MB. Image" (baris 134–136) — perlu konfirmasi format file spesifik yang diterima (JPG/PNG saja, atau image apapun) |
| F | — | Field "Surat Pernyataan Kesediaan Bertanding [link]" (baris 161–162, paling akhir RAW) | Posisinya SETELAH teks Section 8/Penutup, tidak jelas ini field di section mana. Kemungkinan besar harusnya masuk Section 7 "Dokumen Pendukung" bareng KTP/KK & video (sama-sama dokumen upload), tapi RAW menaruhnya terpisah di paling bawah. Juga belum jelas tipe field-nya: upload dokumen bertanda-tangan (`file`) atau link ke Drive (`link`, sama pola seperti Foto KTP/Video) |
| H | H1 | Integrasi spreadsheet | Tidak disebutkan sama sekali — tanya apakah dibutuhkan |
| I | I2 | Perlu pemilihan hari tanding (3 vs 4 Oktober) sebagai field form? | Lihat bagian Konflik di bawah |

## Konflik data (butuh keputusan client, bukan diasumsikan sepihak)

- **Nama event 3 variasi**: "RAKYARD RUMBLE - Boxing Amateur Championship" (judul form) vs "Rakyard Rumble
  by SADA Sport" (baris 5) vs "Rakyard Rumble by SADA Sports" (baris 8).
- **Ejaan organizer beda**: "SADA Sport" vs "SADA Sports".
- **Hari tanding vs tanggal acara**: baris 8 bilang event berlangsung "3-4 Oktober 2026" (2 hari), tapi
  T&C di Section 1 (baris 35) cuma menyatakan kesiapan tanding "pada salah satu hari pelaksanaan, yaitu
  Minggu, tanggal 4" — cuma menyebut 1 hari (Minggu/4 Okt) secara eksplisit. Form pendaftaran sendiri TIDAK
  punya field pemilihan hari tanding. Kemungkinan: semua fighter tanding hari Minggu (4 Okt) dan Sabtu (3
  Okt) dipakai untuk kegiatan lain (technical meeting/weigh-in) — tapi ini asumsi, WAJIB dikonfirmasi
  karena kalau ternyata fighter bisa pilih hari, form perlu field tambahan yang belum ada di RAW.

## Placeholder belum diisi client

- Event ID (A2) — kosong total, belum ada draft sama sekali.
- Tanggal buka/tutup pendaftaran (C3) — kosong total.
- Detail pembayaran: service fee (E3), tax (E4), metode/rekening pembayaran (E5) — kosong total.
- Section yang benar untuk field "Surat Pernyataan Kesediaan Bertanding" (lihat baris F di atas).

## Yang sudah cukup jelas (tidak masuk gap)

- Deskripsi event, benefit peserta (Group A4) — lengkap di paragraf pembuka RAW.
- Contact person (I1): DM Instagram @sadasport.id, WhatsApp Admin 081295999300 (Section 8, baris 154–155).
- Section 4 "Pemilihan Golongan Kelas Tinju" — 12 opsi kelas berat lengkap dengan rentang kg, tidak ada
  yang perlu ditanyakan lagi.
- Section 7 field ukuran baju (S/M/L/XL/XXL) — lengkap.
- Harga registrasi pokok: Rp350.000 (baris 12), jelas walau biaya layanan/pajak belum ada (lihat E3/E4).

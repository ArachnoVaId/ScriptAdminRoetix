# RAW — Silver Essay Competition XII (Silver Parade XII) — Pengumpulan Full Paper

Source: Google Form `1FAIpQLSdhJhZ3ul0hj0ard_4G8AQpylM32ksgKYn7-9ZXgdpIPMn5-g` (diekstrak `Tools/Extract_GForm.js`, 2026-08-22). Timeline & harga diambil dari **deskripsi form itu sendiri** — tidak ada tabel harga terpisah dari panitia.

> **Notes:**
> - Tipe `phone` / `email` adalah tebakan extractor dari kata kunci judul (Google Form tidak menyimpannya kecuali validasi diaktifkan). Keduanya masuk akal di sini, tapi lihat catatan `LeaderWhatsApp` di bawah.
> - Form aslinya punya **2 section berjudul sama persis** ("PENGUMPULAN PAPER SILVER ESSAY COMPETITION"). Di sini di-rename jadi `Data Tim` dan `Pengumpulan Berkas` — judul duplikat tidak berguna sebagai header di form builder Roetix.
> - Section 3 "Terimakasih" **bukan section** — isinya dipetakan ke **Completion message** Roetix (pola sama seperti `StudentPreneur26` Section 7 "Thank You!").
> - Struktur: 1 Phase × 3 Timeline (Gelombang 1/2/3), Time-Price matrix 3 sel.

## Keputusan yang perlu konfirmasi panitia

| # | Isu | Rekomendasi |
|---|-----|-------------|
| 1 | Field `PaymentProof` (Unggah Bukti Pembayaran) + instruksi transfer BCA/BNI di deskripsi | **Hapus.** Roetix punya payment gateway QRIS sendiri — peserta bayar lewat Roetix, jadi tidak ada bukti transfer manual untuk diunggah. Instruksi rekening di deskripsi juga akan menyesatkan pembeli. Precedent: `RAINING/RAW/Tabled_Registration_RAINING.md`. **Masih di-generate di script** supaya keputusan tetap di tanganmu — hapus 1 baris kalau setuju. |
| 2 | Field `TahapPengumpulanPaper` (Gelombang 1/2/3) | **SUDAH DIHAPUS** (2026-08-22, keputusan user): penentuan gelombang otomatis dari Timeline pembelian di sistem Roetix, jadi pertanyaan manual ini redundan. Tidak lagi di-generate script. |
| 3 | `LeaderWhatsApp` bertipe `phone` tapi contoh di form `wa.me/62xx` | Kalau validasi `phone` Roetix menolak format URL, ganti ke `text` atau minta peserta isi angka saja. Deskripsi field sudah diubah agar meminta nomor, bukan link. |
| 4 | Organizer Name | Tidak ada di form — **wajib diisi manual** sebelum Create event. |
| 5 | Service fee Roetix | **Terjawab** oleh tabel "Harga dan Estimasi Peserta": Rp10.000 flat, **dipotong dari panitia**. Lihat skema di bawah. |
| 6 | Tabel harga menulis SEC = Rp80.000 flat (Gel 1–3), deskripsi form merinci 55rb/70rb/80rb | Per instruksi: **harga ikut deskripsi form**, **skema fee ikut tabel harga**. Kalau panitia sebenarnya memang menetapkan 80rb flat, harga di script perlu diubah. |

## Timeline & harga

Harga peserta dari deskripsi Google Form; skema fee dari tabel "Harga dan Estimasi Peserta" (fee dipotong dari panitia). Gelombang 1 memakai fee Rp8.000 — tarif yang sama dengan baris "Silver Talks" di tabel harga (Rp50.000 → Rp8.000), jadi tier harga terendah memang ber-fee lebih rendah.

| Timeline | Window | Peserta bayar | Fee Roetix | Diterima panitia (kolom Price di wizard) |
|---|---|---|---|---|
| Gelombang 1 | 13–22 Agustus 2026 | Rp55.000 | Rp8.000 | Rp47.000 |
| Gelombang 2 | 23 Agustus – 1 September 2026 | Rp70.000 | Rp10.000 | Rp60.000 |
| Gelombang 3 | 2–13 September 2026 | Rp80.000 | Rp10.000 | Rp70.000 |

Fee **tidak** ditambahkan di atas harga promosi — peserta membayar persis angka yang dipromosikan, panitia yang menanggung fee. Karena kolom Price di wizard Roetix adalah basis yang diterima panitia dan Service fee ditumpuk di atasnya (harga web = price + fee), maka **Price = harga peserta − fee**.

Cross-check dengan baris SEC di tabel: Rp80.000 − Rp10.000 = Rp70.000 = kolom "Diterima Panitia". Cocok.

Phase tunggal `Pengumpulan Full Paper` membentang 13 Agustus – 13 September 2026.

## Section 1: Data Tim

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | Nama Tim | text | true | |
| 2 | LeaderFullName | Nama Ketua Tim | text | true | Ex: Razaqa Syafaat Qinthara Wildan |
| 3 | MemberNames | Nama Anggota Tim | text | true | Ex : 1. Neyna Putri Nabila 2. Ahmad Rezky |
| 4 | UniversityName | Asal Perguruan Tinggi | text | true | Ex: Institut Teknologi Sepuluh Nopember |
| 5 | LeaderWhatsApp | Nomor WhatsApp Ketua Tim | phone (?) | true | Ex: 6283831381091 (lihat keputusan #3) |
| 6 | LeaderEmail | Email Ketua Tim | email (?) | true | Ex: xxx@gmail.com |

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 7 | Subtema | Subtema | multiple_choice | true | | Inovasi Material Hijau untuk Kesehatan dan Lingkungan, Penanggulangan Limbah Ekstraksi Logam, Nanomaterial untuk Konstruksi Berkelanjutan, Rekayasa Material Pereduksi Emisi Karbon |

## Section 2: Pengumpulan Berkas

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | PaymentProof | Unggah Bukti Pembayaran (Nominal sesuai ketentuan gelombang) | file | true | **Kandidat dihapus — lihat keputusan #1.** Pembayaran via rekening 004590411436 Blu BCA Digital / 251992746 BNI (a.n Muhammad Zesar Ferdiansyah) |
| 2 | StatementOfOriginality | Pengumpulan Surat Pernyataan Orisinalitas | file | true | Format wajib .pdf |
| 3 | FullPaper | Pengumpulan Full Paper | file | true | Format wajib .pdf |

~~`TahapPengumpulanPaper` (multiple_choice: Gelombang 1/2/3)~~ — **dihapus**, lihat keputusan #2.

## Completion message (dari Section 3 "Terimakasih")

> Terima kasih telah melakukan pengumpulan Full Paper Silver Essay Competition (SEC) Silver Parade XII. Untuk memperoleh informasi selanjutnya, peserta diharapkan bergabung ke grup WhatsApp melalui tautan yang telah disediakan berikut.
> https://chat.whatsapp.com/IABLJ5paXinDAHGZPTvwiD?s=cl&p=a&ilr=1

## Contact person (dari deskripsi form)

- Neyna: wa.me/6283831381091
- Rezky: wa.me/6285143960373

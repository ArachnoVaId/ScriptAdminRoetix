# RAW — The 20th IMOTION Marketing Plan (Marketing Plan / Mini Marketing Case)

> **Notes:**
> - Sumber RAW adalah hasil export teks dari Google Form, sehingga beberapa header section terpotong (mis. "nformasi..." → "Informasi...", "agaimana..." → "Bagaimana...", "MOTION SUPPORT..." → "IMOTION SUPPORT...") — sudah dikoreksi di tabel ini.
> - `TeamName` tidak diikuti tanda `*` eksplisit di RAW (baris berikutnya langsung section header), namun tetap ditandai `required: true` karena nama tim lazimnya wajib di semua pendaftaran. **Mohon konfirmasi ke client.**
> - `Jurusan dan Angkatan` adalah 1 field gabungan (bukan 2 field terpisah seperti di contoh IGNITE Major/Batch), sehingga dipetakan ke key `MajorBatch`.
> - Section **Anggota Keempat** eksplisit ditandai "bersifat opsional" di RAW dan tidak ada tanda `*` pada field-fieldnya → seluruh field Member3 di bawah `required: false`, dan semua label diberi suffix `(opsional)`.
> - Section **IMOTION Support Package** bersifat conditional/branching di Google Form asli (tergantung jawaban "Ya/Tidak" dan tim/individu), tapi export teks meratakan alurnya jadi linear. Pemetaan di bawah adalah interpretasi terbaik — **wajib diverifikasi manual terhadap form asli** sebelum dipakai ke JS.
> - **REVISI (2026-08-03):** Judul form pendaftaran (nama fase/timeline) diubah jadi "Marketing Plan Competition Normal Registration" (dan "...Extend Registration" untuk timeline Extend). Beberapa label field diterjemahkan ke Inggris dengan format "(First/Second/Third/Fourth Member)". Section "How did you find out" dipisah dari Attachments jadi section tersendiri — total section sekarang 7 (bukan 6). Tidak ada mekanisme teknis untuk membatasi upload ke PDF-only di FIELDS schema kita — ditulis sebagai instruksi di Keterangan saja.

## Section 1: Team Data

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | Nama Tim | text | true | |

### Team Leader (Ketua Tim / Anggota Pertama)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | LeaderFullName | Nama Ketua Tim (Anggota Pertama) | text | true | |
| 2 | LeaderInstitution | Team Leader Institution (First Member) | text | true | Contoh: Universitas Indonesia |
| 3 | LeaderMajorBatch | Team Leader Major and Batch (First Member) | text | true | Contoh: Manajemen 2025 |
| 4 | LeaderEmail | Email Ketua Tim (Anggota Pertama) | email | true | |
| 5 | LeaderPhoneNumber | Team Leader Whatsapp Number (First Member) | phone | true | |
| 6 | LeaderLineID | Team Leader LINE ID (First Member) | text | true | |

## Section 2: Second Member (Anggota Kedua)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member1FullName | Nama Anggota Kedua | text | true | |
| 2 | Member1Institution | Second Member Institution | text | true | Contoh: Universitas Indonesia |
| 3 | Member1MajorBatch | Second Member Major and Batch | text | true | Contoh: Manajemen 2025 |
| 4 | Member1Email | Email Anggota Kedua | email | true | |
| 5 | Member1PhoneNumber | Nomor WhatsApp Anggota Kedua | phone | true | |
| 6 | Member1LineID | Second Member LINE ID | text | true | |

## Section 3: Third Member (Anggota Ketiga)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member2FullName | Nama Anggota Ketiga | text | true | |
| 2 | Member2Institution | Third Member Institution | text | true | Contoh: Universitas Indonesia |
| 3 | Member2MajorBatch | Third Member Major and Batch | text | true | Contoh: Manajemen 2025 |
| 4 | Member2Email | Email Anggota Ketiga | email | true | |
| 5 | Member2PhoneNumber | Nomor WhatsApp Anggota Ketiga | phone | true | |
| 6 | Member2LineID | Third Member LINE ID | text | true | |

## Section 4: Fourth Member (Anggota Keempat — Optional)

> **Notes:** Anggota Keempat bersifat opsional.

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member3FullName | Nama Anggota Keempat (opsional) | text | false | |
| 2 | Member3Institution | Fourth Member Institution (opsional) | text | false | Contoh: Universitas Indonesia |
| 3 | Member3MajorBatch | Fourth Member Major and Batch (opsional) | text | false | Contoh: Manajemen 2025 |
| 4 | Member3Email | Email Anggota Keempat (opsional) | email | false | |
| 5 | Member3PhoneNumber | Nomor WhatsApp Anggota Keempat (opsional) | phone | false | |
| 6 | Member3LineID | Fourth Member LINE ID (opsional) | text | false | |

## Section 5: Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | AdminProof | Bukti Kelengkapan Administrasi | file | true | Please upload one file using the provided template. Make sure the file contains the following documents: 1. Student Identity Card (KTM) of all team members. 2. Proof of following the Instagram account @imotionfebui. 3. Proof of following the TikTok account @imotionfebui. 4. Proof of following the X (Twitter) account @imotionfebui. 5. Proof of uploading The 20th IMOTION poster to Instagram Story and tagging the account @imotionfebui. 6. Proof of uploading The 20th IMOTION Twibbon to Instagram Feed. Download the registration proof template through the following link: https://bit.ly/CompiledProof20thIMOTION. Please make a copy of the template first before filling it out. File name: (Team Name)_Registration The 20th IMOTION_Compiled Proof. The file must be in PDF format only. |

## Section 6: Additional Info

_(dipisah dari Attachments per revisi — sebelumnya tergabung di Section 5)_

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | InfoIMOTIONFrom | Bagaimana Anda mengetahui The 20th IMOTION? | multiple_choice | true | | Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn), Website IMOTION, Media Partner, KOL/Content Creator, Teman, Other |

## Section 7: IMOTION Support Package & Payment

### IMOTION Support Package (REVISI 2026-08-04 — disederhanakan jadi 1 pertanyaan + 1 kolom bukti)

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | OutsideJabodetabek | Apakah domisili tim anda atau salah satu anggota dari tim anda berasal dari LUAR JABODETABEK? | multiple_choice | true | | Ya/Mau Mendaftar, Tidak |
| 2 | SupportPackageProof | Pengumpulan Bukti Formulir IMOTION Support Package | file | **true** | Jika Ya atau ingin mendaftar untuk mendukung kebutuhan akomodasi selama pelaksanaan Final Round The 20th IMOTION, mohon membaca Terms & Conditions lalu mengisi form registrasi IMOTION Support Package yang keduanya ada pada link berikut: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar, gambar, atau berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Format penamaan file — Tim: (Team Name)_IMOTIONSupportPackage; Individu: (Team Name)_(Team Member)_IMOTIONSupportPackage. Jika Tidak, isi kolom ini dengan file/foto kosong (blank) dengan format nama file: TidakMendaftar. Disclaimer: IMOTION Support Package wajib diikuti oleh semua peserta yang berdomisili di luar wilayah Jabodetabek (kondisi tertentu dapat menyebabkan instruksi ini tidak berlaku). Info lebih lanjut/konfirmasi: Azwa - WhatsApp 081806294294 / LINE ae062512. | |

### Payment

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | PaymentProof | Bukti Pembayaran | file | false | Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment |
